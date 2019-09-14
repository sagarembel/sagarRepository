
<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.UserDetail"%>
<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="com.smt.hibernate.Stock"%>
<%
   response.setHeader( "Pragma", "no-cache" );
   response.setHeader( "Cache-Control", "no-cache" );
   response.setDateHeader( "Expires", 0 );
%>
<% String type2= "";
                     String name2 = "";
		             if (session != null) {
			         if (session.getAttribute("user") != null) {
				     name1 = (String) session.getAttribute("user");
		              HibernateUtility hbu1=HibernateUtility.getInstance();
		              Session session2=hbu1.getHibernateSession();
		              org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:usr");
		              query1.setParameter("usr", name1);
		              UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
		              type1 = userDetail1.getTypeId();
			         } 
			         else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
		           }
		             else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
	           %>
<html>
<head>
<title>Embel Technologies Pvt Ltd</title>
<link href="/SMT/staticContent/css/bootstrap.min.css" rel="stylesheet">
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"> </script>
<script type="text/javascript"
	src="/SMT/staticContent/js/bootstrap.min.js"> </script>
<link rel="stylesheet" href="/SMT/staticContent/css/notofication.css">
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"
	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all">
</head>
<body>
	<div class="row header_margin_top">
		<div align="center">
			<h2 style="color: red;" class="form-name style_heading"></h2>
		</div>
		<div class="col-md-offset-9" id="report">
			<label style="color: #bdd633; font-size: 20" id="demo"></label>
			<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();;
		</script>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-offset-1 col-md-10">
			<hr style="border-top-color: #green;">
		</div>
	</div>
	<div class="container col-sm-offset-2">
		<div class="row form-group col-md-offset-1 ">
			<button style="height: 175px; width: 350px" id="blinker"
				class="btn btn-primary btn-lg" onclick="goToHome3()">
				Low Stock Item Name<br>click to view
			</button>
			<button style="height: 175px; width: 350px"
				class="btn btn-primary btn-lg" onclick="goToHome1()">Credit
				Customer Payment Balance List</button>
		</div>

		<div class="row form-group col-md-offset-1 ">
			<button style="height: 175px; width: 350px"
				class="btn btn-primary btn-lg" onclick="goToHome()">Supplier
				Payment Balance List</button>
			<button style="height: 175px; width: 350px"
				class="btn btn-primary btn-lg" onclick="goToDashBoard()">DashBoard</button>
		</div>

		<script type="text/javascript">
					function goToHome(){
					    window.location = 'supplierwisebalancelist.jsp';
					}
					function goToHome1(){
					    window.location = 'creditcustomerpaymentbalancelist.jsp';
					}
					function goToDashBoard(){
					    window.location = '/SMT/jsp/index.jsp';
					}
					function goToHome3(){
					    window.location = 'lowstockalert.jsp';
					}
				
				</script>
	</div>
</body>