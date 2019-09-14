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
 		function validateProductDetail(){
 			var catId= $('#catId').val();
 			var itemName= $('#itemName').val();
 			var vat= $('#vat').val();
 			var hsnsacno = $('#hsnsacno').val();
 			if(catId != null && catId != "" && catId != " "){
 				if(itemName != null && itemName != "" && itemName != " "){
 					if(vat != null && vat != "" && vat != " "){
 						if(hsnsacno != null && hsnsacno != "" && hsnsacno != " "){
 						ChooseContact();
 	 	 			}else{
 	 	 				alert("Please Enter HSN/SAC No ! ");
 	 	 			}
 					}
 	 	 			else{
 	 	 				alert("Please Enter Vat Percentage ! if Not than enter zero");
 	 	 			}
 	 			}
 	 			else{
 	 				alert("Please Enter Product name");
 	 			}
 			}
 			else{
 				alert("Please Select Category name");
 			}
 			
 		}
	    function editProduct()
	    {
	    	window.location = "Edit_y_product_detail.jsp";
	    }
	    function goodReceive()
	    {
	    	window.location = "goodReceive.jsp";
	    }
	    function productList()
	    {
	    	window.location = "s_item_list.jsp";
	    }
</script>
<script type="text/javascript">
 function editProduct()
 {
 	window.location = "Edit_y_product_detail.jsp";
 }

 function clearField()
 {
	   document.getElementById("catId_drop").value = "";
 }
 </script>

<body class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Product Detail</h2>
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

		<form action="pro" method="post" name="prod" class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">Category:<sup
							style="color: red">*</sup></label>
					</div>
					<%
						    CategoryHelper helper = new CategoryHelper();
						    List mainCategoryList = helper.getAllMainCategories();
					    %>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-triangle-right"></i>
							</span> <input list="catId_drop" id="catId" class="form-control"
								onchange="pohelper.getSubCategories();" onclick="clearField();">
							<datalist id="catId_drop">
								<%
										for(int i=0;i<mainCategoryList.size();i++){
										Category category = (Category)mainCategoryList.get(i);
									%>
								<option data-value="<%=category.getPkCategoryId()%>"
									value="<%=category.getCategoryName()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>
					<div class="col-sm-2 col-sm-offset-1 " align="right">
						<label class="control-label">Sub Category Name:<sup
							style="color: red">*</sup></label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <select class="form-control  input-sm" id='fkSubCatId'
								name="fkSubCatId" placeholder="Sub Category Name"></select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1 " align="right">
						<label class="control-label">Brand Name:<sup
							style="color: red">*</sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='itemName'
								name="itemName" placeholder="Product Name">
						</div>
					</div>
					<!-- <div class="col-sm-2 col-sm-offset-1 " align="right">
						<label class="control-label" style="margin: 0px 0px;">GST %:<sup
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
					
					<div class="col-sm-2 col-sm-offset-1 " align="right";>
						<label class="control-label" style="margin: 0px 10px;">HSN/SAC No :<sup
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
					
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1 " align="right">
						<label class="control-label" style="margin: 0px 10px;">Model Name:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon">
							<i class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='modelName'
								name="modelName" placeholder="Model Name">
						</div>
					</div>
					<!-- <div class="col-sm-2 col-sm-offset-1 " align="right";>
						<label class="control-label" style="margin: 0px 10px;">HSN/SAC No :<sup
							style="color: red"></sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='hsnsacno'
								name="hsnsacno" placeholder="HSN/SAC No">
						</div>
					</div> -->
				</div>
			</div>
			
			<div class="row buttons_margin_top">
					<h3 align="center" style="color: red; font-size: 17px;">Please Give Size 'mtr' for fabric Type of Products</h3>
				<div align="center">
					<table id="jqGrid">
					</table>
					<div id="jqGridPager">
					</div>
					<div style="padding-top: 10px">
						<input type="button" onclick="return valProductDetail()" name="btn" style="width: 140px;" id="btn" value="Save Product"	class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
						<input type="reset" value="Cancel" onclick="window.location.reload()" style="width: 140px;" class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
						<input type="button" onclick="editProduct()" id="btn" value="Edit Product" style="width: 140px;" class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />
						<input type="button" onclick="goodReceive()" id="btn" value="Good Receive" style="width: 140px;background:#585858;"	class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />
						<input type="button" onclick="productList()" id="btn" value="List" style="width: 140px;" class="btn btn-lg btn-info btn-md button_hw button_margin_right" />
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