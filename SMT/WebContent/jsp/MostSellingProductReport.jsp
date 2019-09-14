<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.helper.CategoryHelper"%>
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
<script src="/SMT/staticContent/js/mostSellingProductReport.js"></script>
<body class="stock_form_img vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Most Selling Product</h2>
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
		<div class="row">
			<div class="form-group">
				<div class="col-sm-2 col-sm-offset-1" align="center">
					<label class="control-label" style="font-family: Times New Roman;">Category
						Name:</label>
				</div>
				<%
					CategoryHelper helper = new CategoryHelper();
					List mainCategoryList = helper.getAllMainCategories();
				%>
				<div class="col-sm-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span> <input list="catId_drop" id="catId" class="form-control"
							onchange="getCategoryWiseItemName()">
						<datalist id="catId_drop">
							<%
								for (int i = 0; i < mainCategoryList.size(); i++) {
									Category category = (Category) mainCategoryList.get(i);
							%>
							<option data-value="<%=category.getPkCategoryId()%>"
								value="<%=category.getCategoryName()%>">
								<%
									}
								%>
							
						</datalist>
					</div>
				</div>
			</div>
		</div>

		<div class="row buttons_margin_top">
			<div align="center">
				<input type="button" value="Search" id="btn"
					onclick="getMostSellingProduct();"
					class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
			</div>
		</div>
		<br> <br> <br> <br>

		<div class="row" align="center">
			<div class="table-responsive">
				<table id="example"
					class="table table-bordered table-striped table-condensed cf"
					class="display"
					style="border: 2px solid black; border-collapse: collapse;">
					<thead>
						<tr>
							<th>Category Name</th>
							<th>Item Name</th>
							<th>Total Sale</th>
							<th>Available Quantity</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
				</table>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>