<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name-report">Sub-Category Wise Purchase Report</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/style.css"></script>
<link href="/SMT/jsp/subcategorywise_purchase_report.jsp"
	rel="stylesheet" />
<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="subcategorywisePurchaseReport" method="post"
	class="form-horizontal">
	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-2">
				<strong>Order No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Supplier Name</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Item Name</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Category</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>SubCategory</strong>
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
			<div class="rTableHead col-md-1">
				<strong>Total Amount</strong>
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
		</div>
	</div>
	<div class="col-lg-12">
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<label>Approved By</label> <input class="form-control" type="text"
				name="approvedBy" placeholder="Approved By" />
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<label>Check By</label> <input class="form-control" type="text"
				name="checkBy" placeholder="Check By" />
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