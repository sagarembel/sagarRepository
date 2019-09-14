
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Purchase Bill Register(Supplier)</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/purchase_bill_register(supplier).jsp"
	rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="purchaseBillRegister(Supplier)" method="post"
	class="form-horizontal">
	<div class="col-lg-12">
		<div class="form-group">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Shop Name:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 nine">
				<select class="form-control" name="shopName">
					<option value="selected">--Select Shop--</option>
				</select>
			</div>
		</div>
	</div>
	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Sr No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Date</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Bill No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Supplier Name</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Amount</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Paid</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Due</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Period</strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
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
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
		</div>
	</div>

	<div class="wrapper">
		<input type="button" value="Print"
			class="btn btn-lg btn-primary btn-md" />
	</div>

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>