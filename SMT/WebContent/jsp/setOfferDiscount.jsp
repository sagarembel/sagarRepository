<%@page import="java.util.List"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.hibernate.GoodReceive"%>

<%boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Set Offer Discount</title>
</head>

<script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/newgoodsreceived.js"></script>
<script>

</script>
<body>
<div class="row header_margin_top">
	<div align="center">
		<h2 class="form-name style_heading">Set Discount Offer</h2>
	</div>
</div>
<div class="row">
	<div class="col-sm-offset-1 col-md-10">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>
<div class="container col-sm-offset-2">
	<form class="form-horizontal" method="post" action="" name="setDisOffer">
		<!-- Value of 'name' attribute is used in employeeDetails.js  -->
		<fieldset>
			<div class="row form-group">
				<label class="col-md-2 control-label" for="employeename">Discount (%)</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
						<input id="disPercentage" name="disPercentage" placeholder="Discount (%)" class="form-control input-md" type="text">
						</datalist>
					</div>
				</div>
			</div>
			<div class="row form-group">
				<label class="col-md-2 control-label" for="firstName">From<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span> <input id="fromBarC" name="fromBarC" placeholder="From Barcode"	class="form-control input-md" type="text">
					</div>
				</div>

				<label class="col-md-2 control-label" for="middleName">To<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span> <input id="toBarC" name="toBarC" placeholder="To Barcode" class="form-control input-md"	type="text">
					</div>
				</div>
			</div>
			
			<div class="form-group row">
				<div class="col-md-10 text-center">
						
						<input type="button" id="save" name="btn" style="font-size: 18px; padding-top: 4px; height: 40px;"
						class="btn btn-large btn-success   button-height-width"
						onclick="setOfferDiscount()" value="Submit">
						
						<input id="save"
						name="btn" style="font-size: 18px; padding-top: 4px; height: 40px;"
						class="btn btn-large btn-danger  button-height-width"
						type="reset" onclick="reset()" value="Cancel">						
				</div>
			</div>
			
			</fieldset>
			</form>
			</div>
</body>
</html>