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
<script src="/SMT/staticContent/js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<link href="/SMT/WebContent/staticContent/css/dataTa.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">



<div class="container">
	<h2 align="center">Sale report between two dates</h2>
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
						onclick="getCashBankBookother();"
						class="btn btn-lg btn-Success btn-md">

				</div>
			</div>
		</div>
	</div>

	<br> <br> <br> <br> <br> <br> <br> <br>
	<table id="example" class="display">
		<thead>
			<tr>
				<th>sold Date</th>

				<th>quantity</th>
				<th>customerBill</th>
				<th>cash Amount</th>
				<th>Card Amount</th>
				<th>totalAmount</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<th colspan="3" style="text-align: right">Total:</th>
				<th></th>
				<th></th>
				<th></th>



			</tr>
		</tfoot>
	</table>

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>