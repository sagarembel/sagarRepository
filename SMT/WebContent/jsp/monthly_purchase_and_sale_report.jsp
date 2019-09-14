
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Monthly Purchase & Sale Report</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/monthly_purchase_and_sale_report.jsp"
	rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="monthlyPurchase&SaleReport" method="post"
	class="form-horizontal">
	<div class="date-field col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<strong>From:</strong> <input type="date" name="date" /> <strong>To:</strong>
		<input type="date" name="date" /> <input class="btn btn-success"
			type="submit" value="Search">
	</div>

	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-2">
				<strong>Item Name</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Mfg.company</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Op.Stock</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Purchase Quantity</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Party Name</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Batch No</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Expiry Date</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Total Stock</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Sold Quantity</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Close Stock</strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
		</div>
	</div>

	<div class="wrapper">
		<input type="button" value="Print"
			class="btn btn-lg btn-primary btn-md" /> <input type="button"
			value="Graph Format" class="btn btn-lg btn-info btn-md" />
	</div>

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>