<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Supplier Balance</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/supplier_balance.jsp" rel="stylesheet" />
<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>
<form action="supplierBalance" method="post" class="form-horizontal">
	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Sr No</strong>
			</div>
			<div class="rTableHead col-md-3">
				<strong>Supplier Name</strong>
			</div>
			<div class="rTableHead col-md-3">
				<strong>Address</strong>
			</div>
			<div class="rTableHead col-md-3">
				<strong>Last Payment Date</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Balance Amount</strong>
			</div>
		</div>
		<div class="rTableRow">
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-3">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-3">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-3">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
		</div>
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>