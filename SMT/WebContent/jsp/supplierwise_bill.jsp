<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Supplier Wise Bill</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/sipplierwise_bill.jsp" rel="stylesheet" />
<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>
<form action="supplierwiseBill" method="post" class="form-horizontal">
	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<label>Supplier:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<select class="form-control" name="supplier">
					<option value="selected">Select Supplier</option>
				</select>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<label>Total Pay:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<input type="text" id="total" name="total" class="form-control"
					placeholder="Total Pay" style="background-color: black;">
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
				<strong>Credit Amount</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Debit Amount</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>VAT</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Discount</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Total</strong>
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
		<div class="rTableRow">
			<div class="col-md-10 col-lg-10 col-sm-10 col-xs-12"></div>
			<div class="rTableLabel col-md-1">
				<strong>Total</strong>
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control" />
			</div>
		</div>
	</div>
	<div class="wrapper">
		<input type="button" value="Export"
			class="btn btn-md btn-lg btn-warning" />
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>