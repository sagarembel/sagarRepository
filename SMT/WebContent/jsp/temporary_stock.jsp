<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Temporary Stock</h2>
</div>
<script src="/SMT/staticContent/js/TemporaryStock.js"></script>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link href="/SMT/jsp/temporary_stock.jsp" rel="stylesheet" />
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<div id="date">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();
		</script>
</div>

<form action="temporaryStock" method="post" class="form-horizontal"
	name="tempstock">
	<div class="col-lg-12 form-group-1">
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<label>Person / Shop Name:</label>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<input class="form-control" type="text" name="person_shop_name"
				id="person_shop_name" placeholder="Person / Shop Name" />
		</div>

		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<label>Contact Number:</label>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<input class="form-control" type="text" name="contactNo"
				id="contactNo" placeholder="contact Number" />
		</div>
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<label>Barcode No:</label>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<input class="form-control" type="text" name="key" id="key"
				placeholder="Barcode No" onchange="offer.getitemData()" />
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<label>Return Period:</label>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<input class="form-control" type="text" name="returnPeriod"
				id="returnPeriod" placeholder="Return Period" />
		</div>
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<label>Check By:</label>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
			<input class="form-control" type="text" name="checkBy" id="checkBy"
				placeholder="Check By" />
		</div>
	</div>

	<div style="position: absolute; top: 300px; left: 200px">
		<table id="list4"></table>
		<div id="jqGridPager"></div>
	</div>
	<div class="wrapper"
		style="position: absolute; top: 510px; left: 300px;">
		<input type="button" value="save" onclick="temp()"
			class="btn btn-lg btn-success btn-md" />
	</div>
	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label style="position: absolute; top: 315px; left: 390px;">Total</label>
		</div>
		<div class="col-lg-1 col-md-1 col-sm-1 col-xs-3">
			<input type="text" class="form-control" name="resolution"
				id="resolution" placeholder="GrossTotal"
				style="position: absolute; top: 310px; left: 250px; font-size: 46px; width: 300px; height: 68px;">
		</div>
	</div>
</form>
