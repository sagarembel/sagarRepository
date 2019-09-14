<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/taxCreation.js"></script>
<link href="/SMT/staticContent/css/adi.css" rel="stylesheet" />
<div class="container">
	<h2 align="center">Tax Creation</h2>
</div>
<div id="date">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();;
		</script>
</div>
<form action="tax" method="post" class="form-horizontal">
	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label>Tax Type:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<input type="text" name="taxType" id="taxType" class="form-control"
				placeholder="Tax Name">
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label>Tax Percentage:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<input type="text" name="taxPercentage" id="taxPercentage"
				class="form-control" placeholder="Tax Percentage">
		</div>
	</div>
	<div class="wrapper">
		<input type="button" onclick="taxCreation()" value="Save"
			class="btn btn-lg btn-success btn-md">
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>