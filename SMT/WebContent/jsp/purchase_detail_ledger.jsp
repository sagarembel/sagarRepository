
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Purchase Details</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/purchase_detail_ledger.jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="purchaseDetail" method="post" class="form-horizontal">
	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Sr No</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Tax Period</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Input Tax Credit From Previous Month</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Exempt On Creditable Purchase</strong>
			</div>
			<div class="rTableHead col-md-2" colspan="2"
				style="text-align: center;">
				<strong>5% Vat Sale</strong>
			</div>
			<div class="rTableHead col-md-2" colspan="2"
				style="text-align: center;">
				<strong>12.5% Vat Sale</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Special Rate Purchase</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Total</strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableHead col-md-1" colspan="4">
				<strong></strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong></strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong></strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong></strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Value Exclude Vat </strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Vat Claim</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Value Exclude Vat</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Vat Claim</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong></strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong></strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
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
		</div>
	</div>

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>