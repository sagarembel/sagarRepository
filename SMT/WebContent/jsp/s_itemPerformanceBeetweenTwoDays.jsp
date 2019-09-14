<%@page import="java.util.List"%>
<% boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/itemstock.js"></script>
<script data-require="jquery" data-semver="2.0.3"
	src="/SMT/staticContent/y_js/jquery-2.0.3.min.js"></script>
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="/SMT/staticContent/y_css/jquery.dataTables_themeroller.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="/SMT/staticContent/y_css/1.9.4_jquery.dataTables.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="/SMT/staticContent/y_css/demo_table_jui.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="/SMT/staticContent/y_css/demo_table.css" />
<link data-require="datatables@*" data-semver="1.9.4" rel="stylesheet"
	href="/SMT/staticContent/y_css/demo_page.css" />
<script data-require="datatables@*" data-semver="1.9.4"
	src="/SMT/staticContent/y_js/1.9.4_jquery.dataTables.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.min.css" />
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css" />
<script src="/SMT/staticContent/y_js/jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/1.10.12_jquery.dataTables.min.js"></script>
<link rel="stylesheet"
	href="/SMT/staticContent/y_css/1.10.12_jquery.dataTables.min.css" />
<body class="report_form_img">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Item Wise Performance
					between two dates</h2>
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
						onclick="itemperformance.getSaleDetailsBetweenTwoDates()"
						class="btn btn-lg btn-success btn-md button_margin_right" />
				</div>
			</div>

			<br>
			<br>
			<div class="row">
				<div class="table-responsive">
					<table id="example" class="display">
						<thead>
							<tr>
								<th>Category Name</th>
								<th>Supplier Name</th>
								<th>Item Name</th>
								<th>quantity</th>
							</tr>
						</thead>
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
