
<% boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/payment.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<form>
	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-12">
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>Enter Date:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="fDate" class="form-control">
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="button" value="Search" id="btn"
						onclick="  payment.paymentHelperForsingleDate() ; "
						class="btn btn-lg btn-Success ">
				</div>
			</div>
		</div>
	</div>
	<br>
	<br>
	<div style='position: absolute; top: 252px; left: 600px;'>
		<input type="button" value="get Total" id="btn" onclick=" getTotal()"
			class="btn btn-lg btn-Success">
	</div>
	<div class="form-group-2">
		<div class="col-lg-12">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label style="margin-top: 18px;">Card Amount:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<input type="text" id="saleitem" class="form-control"
					style="font-size: 30px; width: 180px; height: 60px;">
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label style="margin-top: 18px;">Cash Amount:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<input type="text" id="resolution2" class="form-control"
					style="font-size: 30px; width: 180px; height: 60px;">
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label style="margin-top: 18px;">Total Amount:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<input type="text" id="resolution" class="form-control"
					style="font-size: 30px; width: 180px; height: 60px;">
			</div>


		</div>
	</div>
	<div style='position: absolute; top: 300px; left: 108px;'>
		<table id="jqGrid"></table>
		<div id="jqGridPager"></div>
	</div>

</form>




