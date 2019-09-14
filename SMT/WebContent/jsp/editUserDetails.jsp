<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.UserDetailHelper"%>
<%@page import="com.smt.hibernate.UserDetail"%>
<!DOCTYPE html>
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
	    
	    function gpToEditUserDetails()
	    {
	    	window.location = "editUserDetails.jsp";
	    }
	    
	    function gpToCreateUser()
	    {
	    	window.location = "create_user.jsp";
	    }
	</script>
</head>
<body class="vColor">
	<div class="container-fluid">
		<h2 align="center" class="form-name form-heading"
			style="margin-top: 40px; margin-bottom: 45px;padding-top: 40px;">Update User</h2>
		<div class="row">
			<div class="col-md-4 col-md-offset-4" align="center">
				<div class="login-panel panel panel-default">
					<div class="panel-body">
						<form action="" method="post" name="createusr" name="createuser">
							<div class="form-group-2" style="margin-top: 10px;">
								<label style="margin-left: 55px;">Type:</label> 
								<select class="form" id="updateTypeId" style="height: 31px;width: 208px;" onchange="getAllUsersToEdit()">
									<option value="select">SELECT</option>
									<option value="admin">Admin</option>
									<option value="cashier">Cashier</option>
									<option value="salesman">Salesman</option>
								</select>
							</div>
							<div class="form-group-2" style="margin-top: 10px;">
								<label style=" margin-left: 20px;">Username:</label> 
								<select class="form" style="height: 31px;width: 208px;" id="userNameList"></select>
							</div>
							<div class="form-group-2" style="margin-top: 10px;">
								<label style="margin-left: 22px;">Password:</label> 
								<input type="password" class="form" style="height: 31px;width: 208px;" id="updatePassword" placeholder="Password">
							</div>
							<div class="form-group-2" style="margin-top: 10px;"><label>Re-Password:</label> 
								<input type="password" class="form" style="height: 31px;width: 208px;" id="UpdateRePassword" placeholder="Re-Password" autofocus="autofocus">
							</div>
							<div class="wrapper" style="margin-top: 20px;text-align: center;">
								<input type="button" name="btn" value="Update" class="btn btn-md btn-lg btn-success" onclick="updateUserDetails()" />
								<input type="reset" value="Reset" class="btn btn-md btn-lg btn-danger" />
								<input type="button" style="width: 125px;" name="btn" onclick="gpToCreateUser();" value="Back" class="btn btn-lg btn-primary btn-md button_hw button_margin_right">
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
<%-- <%
      }else
            {
    	  out.println("<span class=\"myspan\">You Can Not view This Page</span>");
          }
    	%> --%>
