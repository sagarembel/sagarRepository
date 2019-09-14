<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"
	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all">
<script src="/SMT/staticContent/y_js/newReport.js"></script>
<body class="account_form_img vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Supplier Based Inventory</h2>
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

		<form action="goodsReturn" method="post" class="form-horizontal">
			<div class="row">
				<div class="form-group" align="center">
					<div class="col-sm-2 col-sm-offset-1">
						<label class="control-label">Supplier Name:<sup>*</sup></label>
					</div>
					<%
						SupplierDetailHelper suppHelper = new SupplierDetailHelper();
						List suppList = suppHelper.getAllSuppliers();
					%>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-user"></i>
							</span> <input list="fkSupplierId_drop" id="key" class="form-control">
							<datalist id="fkSupplierId_drop">
								<%
									for (int i = 0; i < suppList.size(); i++) {
										SupplierDetail supplier = (SupplierDetail) suppList.get(i);
								%>
								<option data-value="<%=supplier.getSupplierId()%>"
									value="<%=supplier.getSupplierName()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Start
							Date:<sup>*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon   glyphicon-calendar"></i>
							</span> <input type="Date" id="fDate" class="form-control">
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label" style="font-family: Times New Roman;">End
							Date:<sup>*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-calendar"></i>
							</span> <input type="Date" id="eDate" class="form-control">
						</div>
					</div>
					<div class="col-sm-2" align="center">
						<input type="button"
							class="btn btn-lg btn-success btn-md button_hw button_margin_right"
							name="btn" value="Search"
							onclick="valSupplierWiseStockBetweenTwoDate();" />
					</div>
				</div>
			</div>
			<br>

			<div class="row">
				<div class="table-responsive">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Barcode No</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Purchased<br>Quantity</th>
								<th>Sold Quantity</th>
								<th>Available<br>Quantity</th>
								<th>Buy Price</th>
								<th>Total<br>Buy Price</th>
								<th>Sale Price</th>
								<th>Total<br>Sale Price</th>
								<th>Tax Percentage</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="3" style="text-align: right">Total:</th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
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
