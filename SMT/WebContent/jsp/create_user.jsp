<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.UserDetailHelper"%>
<%@page import="com.smt.hibernate.UserDetail"%>
<!DOCTYPE html>
<%
         String name = "";
		if (session != null) {
			if (session.getAttribute("user") != null) {
			    name = (String) session.getAttribute("user");
				//out.print("Hello, " + name );
			} else {
				response.sendRedirect("/SMT/jsp/login.jsp");
				out.println("Please Login ");
			}
		}
	%>
<%
	   HibernateUtility hbu=HibernateUtility.getInstance();
	   Session session1=hbu.getHibernateSession();
	   org.hibernate.Query query = session1.createQuery("from UserDetail where userName =:name");
	   query.setParameter("name", name);
	   UserDetail userDetail = (UserDetail) query.uniqueResult();
	   String type = userDetail.getTypeId();
	%>
<%
      if(type.equals("admin")){
     %>
<html lang="en">

<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<script src="/SMT/staticContent/js/userlogin.js"></script>
<style>
.form{
    padding: 1px 12px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    } 
</style>
<script type="text/javascript">
	    function checkUser()
	    {
	    	<%
		        UserDetailHelper usrHelper = new UserDetailHelper();
			   	List usrList = usrHelper.getAlluserName();
			%>
			
    		var userName = document.getElementById("userName123").value;
			var userType = document.getElementById("typeId").value;
			
			if(userType == null || userType == "")
    		{
    			alert("Please Select User Type");
    			return false;
    		}
    		else if(userName == null || userName == "")
    		{
    			alert("Please Enter User Name");
    			return false;
    		}
    		else
    		{
    			var UpUserName = userName.toUpperCase();
    			var UpUserType = userType.toUpperCase();    			
    			var duplicate;
    			<%
    				for(int i=0;i<usrList.size();i++){
    				UserDetail ud = (UserDetail)usrList.get(i);
    			%>		
    			    var typeIdDb ="<%=ud.getTypeId()%>";
    			    var userNameDb ="<%=ud.getUserName()%>";

    			    var UpTypeIdDb = typeIdDb.toUpperCase();
        			var UpUserNameDb = userNameDb.toUpperCase(); 
    			    
    			    if(UpUserName == UpUserNameDb)
    				{
    					duplicate = "found";
    				}
    		    <%
    				}
    			%>
    			if(duplicate == "found")
    			{
    				alert(userName+" UserName Is Taken");
    				return false;
    			}
    			else
    			{
    				validataionUserLogin();
    			}
    		}
		}
	    
	    
	    function getUserlist()
 		 {
 		 	window.location = "allUserList.jsp";
 		 }
	    
	    function gpToEditUserDetails()
	    {
	    	window.location = "editUserDetails.jsp";
	    }
	</script>
</head>
<body class="vColor" onload="ClearForm()">
	<div class="container-fluid">
		<h2 align="center" class="form-name form-heading"
			style="margin-top: 40px; margin-bottom: 45px;padding-top: 40px;">Create User</h2>
		<div class="row">
				<div class="col-sm-5 col-sm-offset-3" align="center" style="margin-left: 390px">
				<div class="login-panel panel panel-default">
					<div class="panel-body">
						<form action="" method="post" name="createusr" id="createuser">
							<div class="form-group-2" style="margin-top: 10px;">
							<p style="color: red; margin-left: 30px; padding-bottom: 10px" >NOTE: IN FUTURE YOU CAN'T CHANGE THE USERNAME<br>SO CHOOSE IT WISELY.</p>
								<label style=" margin-left: 55px;">Type:</label> 
								<select class="form" id="typeId" style="height: 31px;width: 208px;">
									<option value="">--Select Type--</option>
									<option value="admin">Admin</option>
									<option value="cashier">Cashier</option>
									<option value="salesman">Salesman</option>
								</select>
							</div>
							<div class="form-group-2" style="margin-top: 10px;">
								<label style=" margin-left: 20px;">Username:</label> 
								<input type="text" class="form" style="height: 31px;width: 208px;"	id="userName123" placeholder="Username" autofocus>
							</div>
							<div class="form-group-2" style="margin-top: 10px;">
								<label style=" margin-left: 22px;">Password:</label> 
								<input type="password" class="form" style="height: 31px;width: 208px;" id="password" placeholder="Password">
							</div>
							<div class="form-group-2" style="margin-top: 10px;">
								<label>Re-Password:</label> 
								<input type="password" class="form" style="height: 31px;width: 208px;" id="repassword" placeholder="Re-Password" autofocus="autofocus">
							</div>
							<div class="wrapper" style="margin-top: 20px;text-align: center;">
								<input type="button" name="btn" value="Submit" class="btn btn-md btn-lg btn-success" onclick="checkUser();" /> 
								<input type="reset" value="Reset" class="btn btn-md btn-lg btn-danger" />
								<input type="button" name="btn" value="List" id="listBtnUser" class="btn btn-md btn-lg btn-info" onclick="getUserlist()" />
								<input type="button" style="width: 125px;" name="btn" onclick="gpToEditUserDetails();" value="Edit" class="btn btn-lg btn-primary btn-md button_hw button_margin_right">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>
<%
      }else
            {
    	  out.println("<span class=\"myspan\">You Can Not view This Page</span>");
          }
    	%>
