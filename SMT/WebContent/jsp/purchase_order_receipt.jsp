<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Purchase Order Receipt</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/purchase_order_receipt.jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="purchaseOrderReceipt" method="post"
	class="form-horizontal">
	<div class="form-group-2">
		<div class="col-lg-12">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>PO No:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="poNo"
					placeholder="PO No" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>PO Date:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="date" name="poDate" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Expected Date:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="date" name="expectedDate" />
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
				<strong>Size</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Color</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Quantity</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>MRP</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>VAT</strong>
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

		<div class="rTableRow">
			<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12"></div>
			<div class="rTableLabel col-md-2">
				<strong>Total Amount</strong>
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control" />
			</div>
		</div>

		<div class="rTableRow">
			<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12"></div>
			<div class="rTableLabel col-md-2">
				<strong>Discount</strong>
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control" />
			</div>
		</div>

		<div class="rTableRow">
			<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12"></div>
			<div class="rTableLabel col-md-2">
				<strong>Total</strong>
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control" />
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