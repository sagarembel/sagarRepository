<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Stock Inward Register</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/stock_inward_register.jsp" rel="stylesheet" />
<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>
<form action="stockInwardRegister" method="post" class="form-horizontal">
	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Sr No</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Date Of Receipt</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Inward From(Location)</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Voucher No./LR No.</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Goods Description</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Voucher Quantity(No.pcs)</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Quantity Received(No.pcs)</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Delivery Person(Name)</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Received by(Name)</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Remarks</strong>
			</div>
		</div>
		<div class="rTableRow">
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
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
		</div>
	</div>
	<div class="wrapper">
		<input type="button" value="Print"
			class="btn btn-lg btn-primary btn-md" /> <input type="button"
			value="Graph Format" class="btn btn-lg btn-info btn-md" /> <input
			type="button" value="Export" class="btn btn-lg btn-warning btn-md" />
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>