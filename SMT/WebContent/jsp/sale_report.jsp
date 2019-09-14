<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Sale Report</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/sale_report.jsp" rel="stylesheet" />
<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>
<form action="saleReport" method="post" class="form-horizontal">
	<div class="date-field col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<strong>From:</strong> <input type="date" name="date" /> <strong>To:</strong>
		<input type="date" name="date" /> <input class="btn btn-success"
			type="submit" value="Search">
	</div>
	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-2">
				<strong>Date</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Quantity</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Total Amount</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Discount</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Tax</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Round Off</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Net Amount</strong>
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
			<div class="col-md-9 col-lg-9 col-sm-9 col-xs-12"></div>
			<div class="rTableLabel col-md-1">
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
			value="Graph Format" class="btn btn-lg btn-info btn-md" /> <input
			type="button" value="Export" class="btn btn-lg btn-warning btn-md" />
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>