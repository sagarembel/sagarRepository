
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Purchase Bill Register Details(Customer)</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/purchase_bill_register_detail(customer).jsp"
	rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="purchaseBillRegisterDetail(Customer)" method="post"
	class="form-horizontal">
	<div class="col-lg-12">
		<div class="form-group">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Customer Name:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 nine">
				<input type="text" name="customerName" id="customerName"
					placeholder="Customer Name" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Bill No:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 nine">
				<input type="text" name="billNo" id="billNo" placeholder="Bill No" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Date:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 nine">
				<input type="date" name="date" class="form-control" />
			</div>
		</div>
	</div>

	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Sr No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Item Name</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Model No</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Color</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Size</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Quantity</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Amount</strong>
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
		</div>
	</div>

	<div class="rTableRow col-lg-12">
		<div class="col-md-6 col-lg-6 col-sm-6 col-xs-12"></div>
		<div class="rTableLabel col-md-1">
			<strong>Total</strong>
		</div>
		<div class="rTableCell col-md-2">
			<input type="text" class="form-control" />
		</div>
	</div>

	<div class="wrapper">
		<input type="button" value="Print"
			class="btn btn-lg btn-primary btn-md" />
	</div>

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>