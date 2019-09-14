<!DOCTYPE html>
<%@page import="com.smt.hibernate.UserDetail"%>
<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@page import="com.smt.hibernate.Stock"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="java.util.List"%>
<html lang="en">
<% String type1= "";
                     String name1 = "";
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
<% String  contextPath=request.getContextPath(); %>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Comoatible" content="IE=edge">
<title>Embel Technologies Pvt Ltd</title>
<link rel="stylesheet" type="text/css"
	href="/SMT/staticContent/dashbaordcss/style.css">
<link rel="stylesheet" type="text/css"
	href="/SMT/staticContent/dashbaordcss/base.css">
<link rel="stylesheet" type="text/css"
	href="/SMT/staticContent/dashbaordcss/fonts.css">
<link rel="stylesheet" type="text/css"
	href="/SMT/staticContent/dashbaordcss/bootstrap.css">
<script src="/SMT/staticContent/dashboardjs/bootstrap.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/dashboardjs/jquery.js"
	type="text/javascript"></script>
<link
	href="https://www.cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css" />
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="https://code.jquery.com/jquery-1.8.2.min.js"></script>
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
<!-- Bootstrap Core CSS -->
<link href="/SMT/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link href="/SMT/staticContent/css/dashboard.css" rel="stylesheet">
<!-- Custom CSS -->
<link href="/SMT/staticContent/css/sb-admin-2.css" rel="stylesheet">
<!-- Morris Charts CSS -->
<link href="/SMT/staticContent/css/morris.css" rel="stylesheet">
<!-- MetisMenu CSS -->
<link href="/SMT/staticContent/css/metisMenu.min.css" rel="stylesheet">
<!-- Timeline CSS -->
<link href="/SMT/staticContent/css/timeline.css" rel="stylesheet">
<!-- Custom Fonts -->
<link href="/SMT/staticContent/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<!-- jQuery -->
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="/SMT/staticContent/js/bootstrap.min.js"></script>
<!-- Custom Theme JavaScript -->
<script src="/SMT/staticContent/js/sb-admin-2.js"></script>
<!-- Metis Menu Plugin JavaScript -->
<script src="/SMT/staticContent/js/metisMenu.min.js"></script>
<!-- Morris Charts JavaScript -->
<script src="/SMT/staticContent/js/raphael-min.js"></script>
<script src="/SMT/staticContent/js/morris.min.js"></script>
<script src="/SMT/staticContent/js/morris-data.js"></script>
<!-- Custom Theme JavaScript -->
<script src="/SMT/staticContent/js/sb-admin-2.js"></script>
<script src="/SMT/staticContent/js/logout.js"></script>
<script src="/SMT/staticContent/js/graph.js"></script>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/highcharts.js"></script>
<script src="/SMT/staticContent/js/exporting.js"></script>
<script src="/SMT/staticContent/js/cashbankbook.js"></script>
</head>
<!-- <body onload="getTodaySaleTotalAmountInDashboard(); getTodayPurchaseTotalAmountInDashboard(); salesGraph(); purchaseGraph(); salesGraph1(); purchaseGraph1();"> -->
<body onload="salesGraph(); purchaseGraph(); salesGraph1(); purchaseGraph1();">
	<div class="container-fluid display-table">
		<div class="row display-table-row">
			<!-- Side menu -->
			<div
				class="col-md-2 col-sm-2 hidden-xs display-table-cell valign-top border-bottom"
				id="side-menu">
				<h1 class="hidden-xs hidden-sm">Admin</h1>
				<ul>
				<%
    			  if(type1.equals("admin") || type1.equals("salesman") || type1.equals("cashier")){
            %>
				
					<li class="link"><a href="Miscellaneous.jsp"> <span
							class="glyphicon glyphicon-user" aria-hidden="true"></span> <span
							class="hidden-sm hidden-xs"> Profile</span>
					</a></li>
					<%} %>
					
					<%
    			  if(type1.equals("admin")){
            %>
					<li class="link"><a href="goodReceive.jsp"> <span
							class="glyphicon glyphicon-th" aria-hidden="true"></span> <span
							class="hidden-sm hidden-xs"> Purchase</span>
					</a></li>
<%} %>

<%
    			  /* if(type1.equals("admin") || type1.equals("cashier")){ */
    				  if(type1.equals("admin")){
            %>
            <!-- Purchase Report Tab -->
					<li class="link"><a href="#collapse-post"
						data-toggle="collapse" aria-controls="collapse-post"
						aria-expanded="false"> <span class="glyphicon glyphicon-file"
							aria-hidden="true"></span> <span class="hidden-sm hidden-xs">Purchase Reports</span> <span
							class="label label-success pull-right hidden-sm hidden-xs"></span>
					</a>
						<ul id="collapse-post" class="collapse collapseable">
							<li><a href="purchaseReports.jsp"> GST Wise Purchase Reports </a></li>
							<li><a href="NonGstWisePurchaseReport.jsp"> Non GST Wise Purchase Reports </a></li>
							<li><a href="CreditNote.jsp">Credit Note</a></li>
							<li><a href="UnPaidAmountReport.jsp">Supplier Balance Report</a></li>	
						</ul>
					</li>
		<!-- Sale Report Tab -->
					<li class="link"><a href="#collapse-sales"
						data-toggle="collapse" aria-controls="collapse-sales"
						aria-expanded="false"> <span class="glyphicon glyphicon-file"
							aria-hidden="true"></span> <span class="hidden-sm hidden-xs">Sales Reports</span> <span
							class="label label-success pull-right hidden-sm hidden-xs"></span>
					</a>
						<ul id="collapse-sales" class="collapse collapseable">
							<li><a href="gstSaleReport.jsp"> GST Wise Sales Reports	</a></li>
							<li><a href="DayClosingReport.jsp">Day Closure	Report</a></li>
							<li><a href="cashBookReports.jsp">Cash Book	Report</a></li>
							<li><a href="creditcustomerpaymentbalancelist.jsp">Customer	Balance Report</a></li>
							<li><a href="employeeWiseReport.jsp">Employe Report</a></li>
							<li><a href="allReports.jsp">ALL Reports</a></li>
							<li><a href="DebitNote.jsp">Debit Note</a></li>
							<li><a href="MostSellingProductReport.jsp">Most	Selling Product Report</a></li>
						</ul>
					</li>
					
		<!-- Billing Tab -->
		
		<li class="link"><a href="#collapse-bill"
						data-toggle="collapse" aria-controls="collapse-bill" aria-expanded="false"> <span class="glyphicon glyphicon-file"	aria-hidden="true"></span> 
						<span class="hidden-sm hidden-xs">Billing</span> 
						<span class="label label-success pull-right hidden-sm hidden-xs"></span>
					</a>
						<ul id="collapse-bill" class="collapse collapseable">
							<li><a href="Miscellaneous.jsp">Tax Invoice</a></li>
							<li><a href="Credit_Customer_Bill.jsp">Credit Customer Bill</a></li>
							<li><a href="y_sale_return.jsp">Sale Return</a></li>
		     			</ul>
					</li>
		
		
					
		<!-- Bill Copy Tab -->
					<li class="link"><a href="#collapse-billcopy"
						data-toggle="collapse" aria-controls="collapse-billcopy" aria-expanded="false"> <span class="glyphicon glyphicon-file"	aria-hidden="true"></span> 
						<span class="hidden-sm hidden-xs">Bill Copy</span> 
						<span class="label label-success pull-right hidden-sm hidden-xs"></span>
					</a>
						<ul id="collapse-billcopy" class="collapse collapseable">
							<li><a href="Other_Bill_Copy.jsp"> Tax Invoice Copy	</a></li>
							<li><a href="CreditCustCopy.jsp">Credit Customer Copy</a></li>
		     			</ul>
					</li>
		
						<%} %>
				</ul>
			</div>
			<!-- main content -->
			<div class="col-md-10 col-sm-11 display-table-cell valign-top box">
				<div class="row">
					<header id="nav-header" class="clearfix">
						<div class="col-md-5">
							<nav class="navbar-default pull-left">
								<button type="button" class="navbar-toggle collapsed"
									data-toggle="offcanvas" data-target="#side-menu">
									<span class="sr-only">Toggle Navigation</span> <span
										class="icon-bar"></span> <span class="icon-bar"></span> <span
										class="icon-bar"></span>
								</button>
							</nav>
							<h4 id="main-head" class="col-md-12" style="font-family:"ubantu;">
								<span class="sub-head"></span> <strong>PEHENAVA</strong>  <!-- <strong>Ghantalwar</strong> -->
							</h4>
							
							<!-- <span class="glyphicon glyphicon-stats" style="font-weight: 1000"> Today Sale Amount:       <input type="text" readonly="readonly"
										id="totsaleAmt" ></span> -->
						</div>
						<div class="col-md-7">
							<ul class="pull-right">
								<!-- <li id="welcome" class="hidden-xs"><input type="text"
									class="hidden-sm hidden-xs" id="header-feild-search"
									placeholder="search for something"></li> -->
								<li><a onclick="Logout()" class="logout"><span
										class="glyphicon glyphicon-log-out" area-hidden="true" />LogOut</a></li>
										
									</ul>
						</div>
					</header>
				</div>

				<div class="col-md-8">
					<div class="row">
						<section id="stats" class="clearfix">
							<div class="tab panel-header">
								<button class="tablinks active"
									onclick="openCity(event, 'Graph')">Graph</button>
								<button class="tablinks" href="#myChart1"
									onclick="openCity(event, 'Pie-Chart')">Bar-Graph</button>
							</div>

							<div class="panel-content">

								<div id="Graph" class="tabcontent">
									<div id="container"
										style="min-width: 310px; height: 400px; margin: 0 auto"></div>
								</div>

								<div id="Pie-Chart" class="tabcontent">

									<div id="container1"
										style=" width: 600; height: 400px;  margin: 0 auto"></div>
								</div>
								</div>
						</section>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row clearfix">
						<div class="panel list-search">
							<input type="text" id="myInput" onkeyup="myFunction()"
								placeholder="Search for names.." title="Type in a name">
							<ul id="myUL" class="clearfix">
								<li><a href="#">Adele</a></li>
								<li><a href="#">Agnes</a></li>
								<li><a href="#">Billy</a></li>
								<li><a href="#">Bob</a></li>
								<li><a href="#">Calvin</a></li>
								<li><a href="#">Christina</a></li>
								<li><a href="#">Cindy</a></li>
								<li><a href="#">Cavin</a></li>
							</ul>
						</div>
					</div>
				</div>
				
				<div class="col-md-12">
					<div class="row">
						<section id="stats1" class="clearfix">
							<div class="tab panel-header">
								<button class="tablinks1"
									onclick="openCity1(event, 'Graph1')">Graph</button>
								<button class="tablinks1 active" href="#myChart1"
									onclick="openCity1(event, 'Pie-Chart1')">Bar-Graph</button>
							</div>

							<div class="panel-content" >

								<div id="Graph1" class="tabcontent1">
									<div id="container2"
										style="min-width: 310px; height: 400px; margin: 0 auto"></div>
								</div>

								<div id="Pie-Chart1" class="tabcontent1">

									<div id="container3"
										style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
								</div>
								</div>
						</section>
					</div>
				</div>
				<div class="container-fluid">
					<div class="row header_margin_top">
						<div align="center">
							<h3 class="form-name style_heading">Products Whose Quantity
								Less Than 10</h3>
						</div>
					</div>
					<%
		StockDao productForNotification = new StockDao();
			List<Stock> notificationProducts =productForNotification.getAllProductForNotification();
	%>
					<div class="row" align="center">
						<div class="table-responsive" style="width: 900">
							<table
								class="table table-bordered table-striped table-condensed cf"
								id="itemName" class="display"
								style="border: 2px solid black; border-collapse: collapse;">
								<thead>
									<tr>
										<th>Category Name</th>
										<th>Item Name</th>
										<th>Quantity</th>
										<th>Update Date</th>
									</tr>
								</thead>
								<tbody>
									<%
   			   for(int i=0;i<notificationProducts.size();i++){
	        	   Stock goodsForNotification =(Stock)notificationProducts.get(i);
				%>
									<tr>
										<td><%=goodsForNotification.getCatName()%></td>
										<td><%=goodsForNotification.getItemName() %></td>
										<td><%=goodsForNotification.getQty2() %></td>
										<td><%=goodsForNotification.getDate() %></td>
									</tr>
									<%
					}
				%>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="col-md-6 ">
					<div class="row clearfix">
						<aside id="daily-stats">
							<div class="panel panel-left">
								<div class="panel-heading">
									<h4 class="panel-title">Today's Sale</h4>
								</div>
								<div class="panel-body">
									<span class="glyphicon glyphicon-stats"></span> <span><input type="text"
										id="totsaleAmt" ></span>
								</div>
							</div>
						</aside>
					</div>
				</div>
				<div class="col-md-6 ">
					<div class="row clearfix">
						<aside id="daily-stats">
							<div class="panel panel-right">
								<div class="panel-heading">
									<h4 class="panel-title">Today's Purchase</h4>
								</div>
								<div class="panel-body">
									<span class="glyphicon glyphicon-stats"></span> <span><input type="text"
										id="totpurchaseAmt" ></span>
								</div>
							</div>
						</aside>
					</div>
				</div>

				<!-- <div class="col-md-6">
					<div class="card ">
						<div class="header">
							<h4 class="title">Tasks</h4>
							<p class="category">Backend development</p>
						</div>
						<div class="content">
							<div class="table-full-width">
								<table class="table">
									<tbody>
										<tr>
											<td>
												<div class="checkbox">
													<input id="checkbox1" type="checkbox"> <label
														for="checkbox1"></label>
												</div>
											</td>
											<td>Sign contract for "What are conference organizers
												afraid of?"</td>
											<td class="td-actions text-right">
												<button type="button" rel="tooltip" title="Edit Task"
													class="btn btn-info btn-simple btn-xs">
													<i class="fa fa-edit"></i>
												</button>
												<button type="button" rel="tooltip" title="Remove"
													class="btn btn-danger btn-simple btn-xs">
													<i class="fa fa-times"></i>
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="checkbox">
													<input id="checkbox2" type="checkbox" checked> <label
														for="checkbox2"></label>
												</div>
											</td>
											<td>Lines From Great Russian Literature? Or E-mails From
												My Boss?</td>
											<td class="td-actions text-right">
												<button type="button" rel="tooltip" title="Edit Task"
													class="btn btn-info btn-simple btn-xs">
													<i class="fa fa-edit"></i>
												</button>
												<button type="button" rel="tooltip" title="Remove"
													class="btn btn-danger btn-simple btn-xs">
													<i class="fa fa-times"></i>
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="checkbox">
													<input id="checkbox3" type="checkbox"> <label
														for="checkbox3"></label>
												</div>
											</td>
											<td>Flooded: One year later, assessing what was lost and
												what was found when a ravaging rain swept through metro
												Detroit</td>
											<td class="td-actions text-right">
												<button type="button" rel="tooltip" title="Edit Task"
													class="btn btn-info btn-simple btn-xs">
													<i class="fa fa-edit"></i>
												</button>
												<button type="button" rel="tooltip" title="Remove"
													class="btn btn-danger btn-simple btn-xs">
													<i class="fa fa-times"></i>
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="checkbox">
													<input id="checkbox4" type="checkbox" checked> <label
														for="checkbox4"></label>
												</div>
											</td>
											<td>Create 4 Invisible User Experiences you Never Knew
												About</td>
											<td class="td-actions text-right">
												<button type="button" rel="tooltip" title="Edit Task"
													class="btn btn-info btn-simple btn-xs">
													<i class="fa fa-edit"></i>
												</button>
												<button type="button" rel="tooltip" title="Remove"
													class="btn btn-danger btn-simple btn-xs">
													<i class="fa fa-times"></i>
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="checkbox">
													<input id="checkbox5" type="checkbox"> <label
														for="checkbox5"></label>
												</div>
											</td>
											<td>Read "Following makes Medium better"</td>
											<td class="td-actions text-right">
												<button type="button" rel="tooltip" title="Edit Task"
													class="btn btn-info btn-simple btn-xs">
													<i class="fa fa-edit"></i>
												</button>
												<button type="button" rel="tooltip" title="Remove"
													class="btn btn-danger btn-simple btn-xs">
													<i class="fa fa-times"></i>
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="checkbox">
													<input id="checkbox6" type="checkbox" checked> <label
														for="checkbox6"></label>
												</div>
											</td>
											<td>Unfollow 5 enemies from twitter</td>
											<td class="td-actions text-right">
												<button type="button" rel="tooltip" title="Edit Task"
													class="btn btn-info btn-simple btn-xs">
													<i class="fa fa-edit"></i>
												</button>
												<button type="button" rel="tooltip" title="Remove"
													class="btn btn-danger btn-simple btn-xs">
													<i class="fa fa-times"></i>
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="footer">
								<hr>
								<div class="stats">
									<i class="fa fa-history"></i> Updated 3 minutes ago
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<div class="row">
					<footer id="admin-footer" class="clearfix col-md-12">
						<div class="pull-left">
							<b>copyright</b> &copy; 2017
						</div>
						<div class="pull-right">Admin system</div>
					</footer>
				</div>
			</div>
		</div>
	</div>
	
<script type="text/javascript">
function openCity(evt, statsType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(statsType).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>
<script type="text/javascript">
function openCity1(evt, statsType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(statsType).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>
	<script type="text/javascript">
  var $length1 = $('#sales');
  var lengthMax1 = parseInt($length1.attr('data-max'), 10);
  var current1 = 0;
 var updateLength1 = function() {
  current1 += 100;
  $length1.html(current1 );
  updateTick1();
 };
 var updateTick1 = function(){
  if (current1 < lengthMax1){
   requestAnimationFrame(updateLength1);
  } 
  else{
    $length1.html('<i class="fa">&#xf156;</i>' +lengthMax1)
  }
 };
 updateLength1();
</script>
	<script type="text/javascript">
  var $length = $('#purchase');
  var lengthMax = parseInt($length.attr('data-max'), 10);
  var current = 0;
 var updateLength = function() {
  current += 100;
  $length.html(current );
  updateTick();
 };
 var updateTick = function(){
  if (current < lengthMax){
   requestAnimationFrame(updateLength);
  } 
  else{
    $length.html('<i class="fa">&#xf156;</i>' +lengthMax)
  }
 };
 updateLength();
</script>
	

	<script>
function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
</script>
<%
	int ListSize = 0;
%>
   <script type="text/javascript">
<%
	StockDao productForNotificationDao = new StockDao();
	List notificationProductsList=productForNotification.getAllProductForNotification();
	ListSize = notificationProductsList.size();
	System.out.println("notificationProducts ============> "+ListSize);
	if(ListSize > 0)
	{
		System.out.println("notificationProducts ============> "+ListSize);
%>			
		//alert("notificationProducts.size() === "+ListSize);
		  if (Notification.permission !== "granted")
		    notification.requestPermission();
		  else {
		    var notification = new Notification('Low Stock', {
		      icon: '/SMT/staticContent/images/notification.jpeg', 
		      body: "Some Product Running on Low Stock!",
		    });
		
		    notification.onclick = function ()
		    {
		      window.open("lowstockalert.jsp");      
		    };
		}
<%}%> 
</script>

</body>
</html>