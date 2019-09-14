<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.helper.SubCategoryHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<!-- <script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<!-- <script src="/SMT/staticContent/js/jquery.min.js"></script> -->
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/uppercase.js"></script>
<script src="/SMT/staticContent/y_js/category.js"></script>
<style>
a:link {
	text-decoration: none;
}

a:visited {
	text-decoration: none;
}

a:hover {
	text-decoration: none;
}

a:active {
	text-decoration: none;
}
</style>
<script type="text/javascript">

	function catList()
	{
		window.location="s_category_list.jsp";
	}

	    function cheakForAvailableCategory()
	    {		    
	        <%
				CategoryHelper catHelper = new CategoryHelper();
		   		List catList = catHelper.getAllMainCategories();
			%>
			var catName = $('#categoryName').val();
    		var UpCatName = catName.toUpperCase();
    		var duplicate;
			<%
				for(int i=0;i<catList.size();i++){
				Category category = (Category)catList.get(i);
    		%>
    		
    		    var value ="<%=category.getCategoryName()%>";
    		    var UpValue = value.toUpperCase();
				if(UpCatName == UpValue)
				{
					duplicate = "found";
				}
		    <%
				}
    		%>
    		if(duplicate == "found")
        	{
    			document.cat.btn.disabled = true;	
				alert("Category Name Already Exist..!!!");
 				document.cat.reset();
				document.cat.btn.disabled = false;
    			return false;
    		}
    		else
        	{
    			valAddMainCat();
    		}
		}
		
	    </script>
<body class="vColor">
	<div class="container-fluid">

		<div class="row" style="margin-top: 90px; margin-bottom: 45px;"
			align="right">
			<div class="form-group">
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
		<h2 align="center" class="form-heading"
			style="margin-top: 10px; margin-bottom: 40px;">Add Category</h2>
		<!-- <ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home"><h4
						style="color: blue">Add Category</h4></a></li>
		</ul> -->
		<div class="tab-content margin-t-13">
			<div id="home" class="tab-pane fade in active">
				<form action="cate" method="post" name="cat" class="form-horizontal">
					<div class="row">
						<div class="form-group">
							<div class="col-sm-2 col-sm-offset-3" align="center">
								<label style="font-size: 19px;">Category:<sup>*</sup></label>
							</div>
							<div class="col-sm-3">
								<div class="input-group" style="width: 250px;">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-plus"></i>
									</span> <input list="catId_drop" id="categoryName" name="categoryName"
										class="form-control" placeholder="Category Name">
									<datalist id="catId_drop">
									<input type="text" style="background: #f0f0f0; border: 2px;" id="testField" readonly="readonly"/>
										<%
                                        	for(int i =0 ;i<catList.size();i++)
	                                        {
                                            	Category cat = (Category)catList.get(i);
                                        %>
											<option data-value="<%=cat.getPkCategoryId()%>"
											value="<%=cat.getCategoryName()%>">
										<%
											}
										%>
										
									</datalist>
								</div>
								<p style="font-size: 15; color: #ff8000;">*Enter Alphabets
									only.</p>
							</div>
						</div>
					</div>

					<div class="row buttons_margin_top">
						<div align="center">
							<input type="button" name="btn" onclick="cheakForAvailableCategory();" value="Save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
							<input type="reset" value="Cancel" class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/>
							<input type="button" style="width: 125px;" name="btn" onclick="catList();" value="List" class="btn btn-lg btn-info btn-md button_hw button_margin_right"/>
							<input type="button" style="width: 125px;" name="btn" onclick="goEditCatagoryFrom();" value="Edit" class="btn btn-lg btn-primary btn-md button_hw button_margin_right"/>
							
							<a href="EditCategory.jsp"></a>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
</body>
</html>