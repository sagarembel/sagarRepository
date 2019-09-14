<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Sale Register (Day Wise)</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/sale_register(Daywise).jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="saleRegister(Daywise)" method="post"
	class="form-horizontal">
	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label>Bill No:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 eight">
			<input type="text" name="bill" class="form-control"
				placeholder="Bill No" />
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 form-button">
			<input type="button" value="Search"
				class="btn btn-lg btn-success btn-md" />
		</div>
	</div>

	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-2">
				<strong>Date</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Bill No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Customer Name</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Debit</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Credit</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Total Sale</strong>
			</div>
		</div>

		<div class="rTableRow">
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
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
		</div>
	</div>

	<div class="wrapper">
		<input type="button" value="Graph Format"
			class="btn btn-lg btn-info btn-md" />
	</div>
</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>