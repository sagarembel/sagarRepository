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
				out.print("Hello, " + name );
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
<div class="container">
	<h2 class="form-name-report">Create User</h2>
</div>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/userlogin.js"></script>
<!-- Bootstrap Core CSS -->
<link href="/SMT/staticContent/y_css/bootstrap.min.css" rel="stylesheet">
<!-- MetisMenu CSS -->
<link href="/SMT/staticContent/y_css/metisMenu.min.css" rel="stylesheet">
<!-- Custom CSS -->
<link href="/SMT/staticContent/y_css/sb-admin-2.css" rel="stylesheet">
<!-- Custom Fonts -->
<link href="/SMT/staticContent/y_css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<!-- jQuery -->
<script src="/SMT/staticContent/y_js/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<!-- Metis Menu Plugin JavaScript -->
<script src="/SMT/staticContent/y_js/metisMenu.min.js"></script>
<!-- Custom Theme JavaScript -->
<script src="/SMT/staticContent/y_js/sb-admin-2.js"></script>
<script type="text/javascript">
	    function ChooseContact(){
	        <%
	        UserDetailHelper usrHelper = new UserDetailHelper();
		   		List usrList = usrHelper.getAlluserName();
			%>
			<%
				for(int i=0;i<usrList.size();i++){
					UserDetail usr = (UserDetail)usrList.get(i);
    		%>
    		var value ="<%=usr.getUserName()%>";
				if(document.getElementById("userName").value == value)
					{
						document.createusr.btn.disabled = true;	
						alert("User Name Not Available..!!!");
				if(document.createusr) 
					{
	  					document.createusr.reset();
    				}
						document.createusr.btn.disabled = false;
						return false;
					}
   			<%
				}
    		%>
		}
	</script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
				<div class="login-panel panel panel-default">

					<div class="panel-body">
						<form action="" method="post" name="createusr" name="createuser">
							<div class="form-group-2">
								<label>Type:</label> <select class="form-control" id="typeId">
									<option value="selected">--Select Type--</option>
									<option value="admin">Admin</option>
									<option value="account">Account</option>
									<option value="salesman">Salesman</option>
								</select>
							</div>
							<div class="form-group-2">
								<label>Username:</label> <input type="text" class="form-control"
									id="userName" placeholder="Username" autofocus
									onchange="return ChooseContact();">
							</div>
							<div class="form-group-2">
								<label>Password:</label> <input type="password"
									class="form-control" id="password" placeholder="Password">
							</div>
							<div class="form-group-2">
								<label>Re-Password:</label> <input type="password"
									class="form-control" id="repassword" placeholder="Re-Password"
									autofocus="autofocus" onchange="check()">
							</div>
							<div class="wrapper">
								<input type="button" name="btn" value="Submit"
									class="btn btn-md btn-lg btn-success" onclick=" userLogin()" />
								<input type="reset" value="Reset"
									class="btn btn-md btn-lg btn-danger" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
<%
      }else
            {
    	  out.println("<span class=\"myspan\">You Can Not view This Page</span>");
          }
    	%>
