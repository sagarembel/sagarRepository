
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/themes/redmond/jquery-ui.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.13.3/css/ui.jqgrid.min.css">
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.13.3/js/jquery.jqgrid.min.js"></script>
<link href="/SMT/staticContent/y_css/style.css" rel="stylesheet" />
<script src="/SMT/staticContent/js/goodsreceived.js"></script>
<body class="master_form_img">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Purchase Report Yearly</h2>
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
						<label class="control-label">Start Year:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id="fDate" class="form-control">
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">End Year:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-calendar"></i>
							</span> <input type="date" id="tDate" class="form-control">
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right"
						name="btn" value="Search"
						onclick="purchaseyear.getPurchaseDetailsBetweenTwoYear()" />
				</div>
			</div>

			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="table-responsive">
						<table id="jqGrid"></table>
						<div id="jqGridPager"></div>
					</div>
				</div>
			</div>
		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>