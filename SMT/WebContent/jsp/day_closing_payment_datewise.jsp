<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/customerbillreport.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script
	src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
<link rel="stylesheet"
	href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css">
<div class="container">
	<h2 align="center">Day Closing Payment Between Two Dates</h2>
</div>
<br>
<br>
<form>
	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-12">
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>Start Date:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="fisDate" class="form-control">
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>End Date:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="endDate" class="form-control">
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="button" value="Search"
						onclick="sale.getDayClosingBetweenTwoDates()"
						class="btn btn-lg btn-Success btn-md">

				</div>
			</div>
		</div>
	</div>

	<br>
	<br> <br>
	<br> <br>
	<br> <br>
	<br>
	<table id="example" class="display" onmousemove="test1()">
		<thead>
			<tr>
				<th>Customer Bill</th>
				<th>Cash Amount</th>
				<th>Card Amount</th>
				<th>Total Amount</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<th colspan="1" style="text-align: right">Total:</th>
				<th id="c"></th>
				<th id="d"></th>
				<th id="e"></th>
			</tr>
		</tfoot>
	</table>


</form>

<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>

</div>
</body>
</html>
