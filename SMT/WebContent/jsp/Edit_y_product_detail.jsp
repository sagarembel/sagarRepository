<%@page import="com.smt.bean.ItemList"%>
<%@page import="com.smt.bean.ProductDetailBean"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.ProductRegister"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<% boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/productDetail.js"></script>
<script type="text/javascript">
function backToProductDetails()
{
	window.location = "y_product_detail.jsp";
}
</script>
<body>
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Edit Product Detail</h2>
			</div>
		</div>

		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
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
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="pro" method="post" name="UpdateProd"
			class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-3 " align="right">
						<label class="control-label">Product Name:<sup
							style="color: red">*</sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span>
							<%
								ProductDetailDao sdd = new ProductDetailDao();
								List sList =sdd.getProductNames();
							%>
							<input list="sup_drop" id="product" onchange="getProductDetails()" class="form-control">
							<datalist id="sup_drop">
								<%
								      for(int i=0;i<sList.size();i++)
								      {
								      	   ProductRegister sup =(ProductRegister)sList.get(i);
								%>
								<option data-value="<%=sup.getPkProductId()%>"
									value="<%=sup.getItemName() %>, <%=sup.getSize() %>" value1="<%=sup.getHsnsacno()%>"
									value2="<%=sup.getModelName() %>">
								<%
									  }
								%>
							</datalist>
						</div>
					</div>
					<div class="col-sm-2 "align="right">
						<label class="control-label">New Product Name:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='itemName'
								name="itemName" placeholder="Product Name">
						</div>
							<input type="hidden" class="form-control  input-sm" id='hiddenItemName' name="hiddenItemName" readonly="readonly"/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-3 "align="right">
						<label class="control-label">Category :<sup
							style="color: red"></sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='catName'
								name="catName" readonly="readonly">
						</div>
					</div>
					<div class="col-sm-2 "align="right">
						<label class="control-label">Sub Category:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='subCatName'
								name="subCatName" readonly="readonly">
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-3 "align="right">
						<label class="control-label">HSN/SAC No :<sup
							style="color: red"></sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='hsnsacno'
								name="hsnsacno" placeholder="HSN/SAC No">
						</div>
					</div>
					<div class="col-sm-2 "align="right">
						<label class="control-label">Model Name:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='modelName'
								name="modelName" placeholder="Model Name">
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<!-- <div class="col-sm-3 "align="right">
						<label class="control-label">GST % :<sup
							style="color: red">*</sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='vat'
								name="vat" placeholder="GST %" onchange="return ChooseItem();">
						</div>
					</div> -->
					
					<div class="col-sm-3 "align="right">
						<label class="control-label">Size :<sup
							style="color: red">*</sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='size'
								name="size" placeholder="size">
						</div>
					</div>
					
				</div>
			</div>
			
			<div class="row buttons_margin_top">
				<div align="center">
					<div align="center">
					<div style="padding-top: 10px">
					<input type="button" onclick="valEditProductDetail()" id="btn"
						value="Update"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
					<input type="reset" value="Reset"
						class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
						<input type="button" onclick="backToProductDetails()" id="btn"
						value="Back"
						class="btn btn-lg btn-primary btn-md button_hw button_margin_right"/>
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