<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Stock Outward Register</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/stock_outward_register.jsp" rel="stylesheet" />
<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="stockOutwardRegister" method="post"
	class="form-horizontal">
	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Sr No</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Date Of Dispatch</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Outward to Branch</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Voucher No</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Goods Description</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>No Of Parcels</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Quantity</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Vehicle No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Delivery Person</strong>
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
		</div>
	</div>
	<div align="center">
		<input type="button" value="Save"
			class="btn btn-lg btn-success btn-md" /> <input type="button"
			value="Cancel" class="btn btn-lg btn-danger btn-md" /> <input
			type="button" value="Graph Format" class="btn btn-lg btn-info btn-md" />
		<input type="button" value="Export"
			class="btn btn-lg btn-warning btn-md" />
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>