<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">


<% boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>

<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/customerbillreport.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/y_js/jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/1.10.12_jquery.dataTables.min.js"></script>
<link rel="stylesheet"
	href="/SMT/staticContent/y_css/1.10.12_jquery.dataTables.min.css">

<body class="report_form_img">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Day Closing Payment Between
					Two Dates</h2>
			</div>
		</div>

		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							var date = new Date();
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>


		<form action="goodsReturn" method="post" class="form-horizontal">

			<div class="row">

				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Start
							Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-calendar"></i>
							</span> <input type="date" id="fisDate" class="form-control">
						</div>
					</div>


					<div class="col-sm-2" align="center">
						<label class="control-label" style="font-family: Times New Roman;">End
							Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-calendar"></i>
							</span><input type="date" id="endDate" class="form-control">
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button" value="Search"
						onclick="sale.getDayClosingBetweenTwoDates()"
						class="btn btn-lg btn-success btn-md button_margin_right" />
				</div>
			</div>

			<br>
			<br>
			<div class="row">
				<div class="table-responsive">
					<table id="example" class="display" onmousemove="test1()">
						<thead>
							<tr>
								<th>Customer Bill</th>
								<th>Cash Amount</th>
								<th>Card Amount</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="1" style="text-align: right">Total:</th>
								<th id="c"></th>
								<th id="d"></th>
								<th id="e"></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>


		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>

	</div>
</body>
</html>

