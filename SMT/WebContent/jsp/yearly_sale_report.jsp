
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<%@page import="com.smt.dao.CustomerOrderDao"%>
<script src="/SMT/staticContent/js/customerbillreport.js"></script>
<% boolean isHome = false;%>
<%@include file="commons/header.jsp"%>

<script data-require="jquery" data-semver="2.0.3"
	src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/css/jquery.dataTables_themeroller.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/css/jquery.dataTables.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/css/demo_table_jui.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/css/demo_table.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/css/demo_page.css" />
<script data-require="datatables@*" data-semver="1.9.4"
	src="//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/jquery.dataTables.js"></script>

<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script
	src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
<link rel="stylesheet"
	href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css">



<form>


	<div class="container">
		<h2 align="center">Yearly Sale Report</h2>
	</div>
	<br>
	<br>



	<%
		CustomerOrderDao dao=new CustomerOrderDao();
		dao.getAllClosingReport();
	%>

	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-12">
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>Start Year:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="fisDate" class="form-control">
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>End Year:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="endDate" class="form-control">
				</div>
				<div style='position: absolute; top: 100px; left: 459px;'>
					<input type="button" value="Search"
						onclick="saleforyear.getSaleDetailsBetweenTwoYear()"
						class="btn btn-lg btn-Success btn-md"
						style="position: absolute; left: 420px; top: -102px;"> >
				</div>
			</div>
		</div>

	</div>

	<br>
	<br> <br>
	<br> <br>
	<br>

	<table id="example" class="display">
		<thead>
			<tr>
				<th>Customer Bill</th>
				<th>Sold Date</th>
				<th>Sale Price</th>
				<th>Quantity</th>
				<th>Total Amount</th>
				<th>New Total Amount</th>
			</tr>
		</thead>
	</table>

</form>