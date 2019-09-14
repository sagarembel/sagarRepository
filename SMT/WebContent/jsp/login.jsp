<!DOCTYPE html>
<%@page import="com.smt.hibernate.UserDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.LoginDetailsDao"%>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<title>Login Page</title>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/logout.js"></script>
<!-- Bootstrap Core CSS -->
<link href="/SMT/staticContent/css/bootstrap.min.css" rel="stylesheet">

<!-- MetisMenu CSS -->
<link href="/SMT/staticContent/css/metisMenu.min.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="/SMT/staticContent/css/sb-admin-2.css" rel="stylesheet">

<!-- Custom Fonts -->
<link href="/SMT/staticContent/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">

<!-- jQuery -->
<script src="/SMT/staticContent/js/jquery.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="/SMT/staticContent/js/bootstrap.min.js"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="/SMT/staticContent/js/metisMenu.min.js"></script>

<!-- Custom Theme JavaScript -->
<script src="/SMT/staticContent/js/sb-admin-2.js"></script>

<script type="text/javascript">
function checkUser()
{
	<%
		LoginDetailsDao loginUser = new LoginDetailsDao();
		List cList1 =loginUser.getAllExpenseNames();
	%>
	//var userName = $('#uname').val();
	//var upUserName = userName.toUpperCase();
	<%
	for(int i=0;i< cList1.size();i++)
	{
		UserDetail user=(UserDetail)cList1.get(i);
	%>
	var uName = "<%=user.getUserName()%>";
	var dBuName = uName.toUpperCase();
	var userName=document.getElementById("uname").value;
	var upUserName = userName.toUpperCase();
	if(dBuName == upUserName)
	{}
	else
	{
		alert("Please Enter Valid Username");
		return false;
	}
	<%
	}
	%>
}

function checkUserPassword()
{
	if(document.getElementById("uname").value != "")
	{
		<%
		LoginDetailsDao loginPassword = new LoginDetailsDao();
		List pList1 =loginPassword.getAllExpenseNames();
	%>
	//var userName = $('#uname').val();
	//var upUserName = userName.toUpperCase();
	<%
	for(int i=0;i< pList1.size();i++)
	{
		UserDetail user1=(UserDetail)pList1.get(i);
	%>
	var uPassword = "<%=user1.getPassword()%>";
	var dBuPassword = uPassword.toUpperCase();
	var userName=document.getElementById("pass").value;
	var upPassword = userName.toUpperCase();
	if(dBuPassword == upPassword)
	{}
	else
	{
		alert("Please Enter Valid Password");
		return false;
	}
	<%
	}
	%>
	}
}
</script>

</head>

<body
	background="/SMT/staticContent/images/68773232-clothes-wallpapers.jpg">
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
				<div class="login-panel panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Please Sign In</h3>
					</div>
					<div class="panel-body">
						<form action="Login" method="post">
							<div>
								<div class="col-md-6 col-md-offset-3 form-group">
									<label><span class="glyphicon glyphicon-user"></span>Username:</label>
									<input class="form-control" placeholder="Username" name="uname"
										id="uname" type="text" autofocus>
								</div>
								<div class="col-md-6 col-md-offset-3 form-group">
									<label><span class="glyphicon glyphicon-eye-open"></span>Password:</label>
									<input class="form-control" placeholder="Password" name="pass"
										id="pass" type="password" value="">
								</div>

								<!-- Change this to a button or input when using this as a form -->
								<div class="wrapper col-md-10 col-md-offset-2">
									<!-- <button type="button" onclick="login();allowPopup()"
										class="btn btn-md btn-lg btn-success">
										<span class="glyphicon glyphicon-ok-circle"></span> Login
									</button> -->
									<button type="button" onclick="login()"
										class="btn btn-md btn-lg btn-success">
										<span class="glyphicon glyphicon-ok-circle"></span> Login
									</button>
									<button type="reset" class="btn btn-md btn-lg btn-danger">
										<span class="glyphicon glyphicon-remove-circle"></span> Reset
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>