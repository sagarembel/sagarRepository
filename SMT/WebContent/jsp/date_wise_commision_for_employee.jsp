
<% boolean isHome = false;%>
<%@include file="commons/header.jsp"%>
<script src="/SMT/staticContent/js/newReport.js"></script>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>


<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>


<div class="container">
	<h2 class="form-name-report">Between Two Days Employee Commision</h2>
</div>

<form>
	<div class="col-lg-12">

		<div class="form-group-2">
			<div class="col-lg-12">
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>Start Date:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="fDate" class="form-control">
				</div>

				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>End Date:</label>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<input type="date" id="eDate" class="form-control">
				</div>


				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
					<label>Enter Employee Id:</label>
				</div>
				<div class="col-lg-1 col-md-1 col-sm-1 col-xs-3">
					<input type="text" id="empId" class="form-control">
				</div>
				<div class="col-lg-1 col-md-1 col-sm-1 col-xs-3">
					<input type="button" value="Search" id="btn"
						onclick="  offer.getDayWiseSalesmanCommisionForEmps(); "
						class="btn btn-lg btn-Success ">
				</div>
			</div>

		</div>
	</div>


	<div style='position: absolute; top: 300px; left: 108px;'>
		<table id="list4"></table>
		<div id="list4"></div>
	</div>

</form>





