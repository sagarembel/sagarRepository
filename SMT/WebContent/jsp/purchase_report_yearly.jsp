


<% boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/themes/redmond/jquery-ui.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.13.3/css/ui.jqgrid.min.css">
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.13.3/js/jquery.jqgrid.min.js"></script>
<link href="/SMT/staticContent/css/style.css" rel="stylesheet" />

<script src="/SMT/staticContent/js/goodsreceived.js"></script>

<div class="container">
	<h2 class="form-name-report">Purchase Report Yearly</h2>
</div>

<form>
	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-12">
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>Start Year:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="fDate" class="form-control">
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>End Year:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="tDate" class="form-control">
				</div>
			</div>
		</div>
		<div style='position: absolute; top: 100px; left: 459px;'>
			<input type="button" value="Search"
				onclick="purchaseyear.getPurchaseDetailsBetweenTwoYear()"
				class="btn btn-lg btn-Success btn-md">
		</div>
	</div>

	<div style='position: absolute; top: 300px; left: 108px;'>
		<table id="jqGrid"></table>
		<div id="jqGridPager"></div>
	</div>

</form>

