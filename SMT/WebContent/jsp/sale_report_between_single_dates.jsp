<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/customerbillreport.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/buttom.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<link href="/SMT/WebContent/staticContent/css/dataTa.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/css/select.css" rel="stylesheet"
	type="text/css" media="all">
<link href="/SMT/staticContent/css/button.css" rel="stylesheet"
	type="text/css" media="all">
<form>
	<div class="container">
		<h2 align="center">Date Wise Sale Report</h2>
	</div>
	<br>
	<br>
	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-12">
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>Enter Date:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="fDate" class="form-control">
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="button" value="Search" id="btn"
						onclick="  saleforDate.saleHelperForsingleDate() ; "
						class="btn btn-lg btn-Success ">
				</div>
			</div>
		</div>
	</div>
	<br>
	<br> <br>
	<br> <br>
	<br>
	<table id="example" class="display" onmousemove="test()">
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
		<tfoot>
			<tr>
				<th colspan="4" style="text-align: right">Total:</th>
				<th id="a"></th>
				<th id="b"></th>
			</tr>
		</tfoot>
	</table>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>
