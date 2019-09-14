<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.helper.GoodReceiveHelper"%>
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
<script src="/SMT/staticContent/js/currentStock.js"></script>
<body class="stock_form_img vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Invoice Based Inventory</h2>
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

		<form method="post" class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-3" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Select
							Bill No:</label>
					</div>
					<%
						GoodReceiveHelper helper = new GoodReceiveHelper();
						List mainCategoryList = helper.getBillNo();
					%>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input list="catId_drop" id="catId" class="form-control">
							<datalist id="catId_drop">
								<%
									for (int i = 0; i < mainCategoryList.size(); i++) {
										GoodReceive category = (GoodReceive) mainCategoryList.get(i);
								%>
								<option data-value="<%=category.getBillNo()%>"
									value="<%=category.getBillNo()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>
					
					
					<div align="center">
						<input type="button" value="Search" id="btn"
							onclick="billwisestock();"
							class="btn btn-lg btn-success btn-md button_hw button_margin_right"  style="margin-right: 350px;"/>
					</div>
				
					
				</div>
				
			</div>
			<br> <br> <br> <br>

			<div class="row">
				<div class="table-responsive">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Bill No</th>
								<th>Supplier Name</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Available Quantity</th>
								<th>Buy Price</th>
								<th>Tax Percentage</th>
								<th>Barcode No</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="4" style="text-align: right">Total:</th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
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