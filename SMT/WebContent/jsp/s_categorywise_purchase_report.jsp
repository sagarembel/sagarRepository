
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_css/adi.css"></script>
<link href="/SMT/jsp/categorywise_purchase_report.jsp" rel="stylesheet" />
<body class="report_form_img">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Category Wise Purchase
					Report</h2>
			</div>
		</div>
		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
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
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<form action="categorywisePurchaseReport" method="post"
			class="form-horizontal">
			<div class="rTable">
				<div class="rTableRow">
					<div class="rTableHead col-md-2">
						<strong>Order No</strong>
					</div>
					<div class="rTableHead col-md-2">
						<strong>Supplier Name</strong>
					</div>
					<div class="rTableHead col-md-2">
						<strong>Item Name</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Category</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Color</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Size</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Quantity</strong>
					</div>
					<div class="rTableHead col-md-2">
						<strong>Total Amount</strong>
					</div>
				</div>

				<div class="rTableRow">
					<div class="rTableCell col-md-2">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-2">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-2">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-2">
						<input type="text" class="form-control">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group" style="margin-top: 75px">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Approved By</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" name="approvedBy"
								placeholder="Approved By" />
						</div>
					</div>
					<div class="col-sm-2" align="center">
						<label class="control-label">Check By</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" name="checkBy"
								placeholder="Check By" />
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button"
						onclick="window.location.href ='http://localhost:8080/SMT/jsp/y_customer_bill1.jsp'"
						value="Print"
						class="btn btn-lg btn-link btn-md button_margin_right" /> <input
						type="button" value="Graph Format" name="btn" id="btn"
						onclick="customerOrder();"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
					<input type="button" value="Export"
						class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />
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
