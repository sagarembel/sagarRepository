<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/customerbillreport.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/selectjj.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/buttom.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/y_js/jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jqueryUi.js"></script>
<link href="/SMT/WebContent/staticContent/y_css/dataTa.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/css/y_select.css" rel="stylesheet"
	type="text/css" media="all">
<link href="/SMT/staticContent/css/y_button.css" rel="stylesheet"
	type="text/css" media="all">
<body class="account_form_img">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Date Wise Sale Report</h2>
			</div>
		</div>
		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							   var date = new Date();
							   document.getElementById("demo").innerHTML = date.toDateString();
							</script>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="goodsReturn" method="post" class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Enter
							Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id="fDate" class="form-control">
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button" value="Search" id="btn"
						onclick="  saleforDate.saleHelperForsingleDate() ; "
						class="btn btn-lg btn-success btn-md button_margin_right" />
				</div>
			</div>
			<br>
			<br>

			<div class="row">
				<div class="table-responsive">
					<table id="example" class="display" onmousemove="test()">
						<thead>
							<tr>
								<th>Customer Bill</th>
								<th>Sold Date</th>
								<th>Sale Price</th>
								<th>Quantity</th>
								<th>Total Amount</th>
								<th>New Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="4" style="text-align: right">Total:</th>
								<th id="a"></th>
								<th id="b"></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</form>

		<div class="row margin_shortcut">
			<div class="col-sm-12">
				<%@include file="y_commons/shortcut.jsp"%>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
