<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<link href="/SMT/staticContent/y_js/bootstrap-select.min.css" />
<script src="/SMT/staticContent/y_css/1.11.4-jquery-ui.min.css">
    <script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/1.12.4-jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<link href="/SMT/staticContent/y_css/adi.css" rel="stylesheet" />
<link href="/SMT/staticContent/y_css/4.13.3-ui.jqgrid.min.css" />
<script src="/SMT/staticContent/y_js/uppercase.js"></script>
<script src="/SMT/staticContent/y_js/category.js"></script>
<script type="text/javascript">

function Back()
{
	window.location="y_category_subcategory.jsp";
}

   		function isEmplty()
   		{
			var categoryName= $('#reNameCat').val();
			var categoryName1= $('#catId').val();
	    	var patt = /^[a-zA-Z ]+$/;
	    	var t = patt.test(categoryName);
	    	if(categoryName1 != null && categoryName1 != "" && categoryName1 != " ")
    		{	
	    	if(categoryName != null && categoryName != "" && categoryName != " ")
	    		{
	    		 if(categoryName.match(patt))
		    	 {
	    			 ChooseContact();
	    		 }
	    		 else{
	    			 alert("Enter only Alphabets.");
	    			 //document.getElementById("eoalfa").style.display = "initial";
	    		 }
	    		}
	    	else{
	    		alert("Please Enter ReName Category name");
	    	}
   		}
	    	else{
	    		alert("Please Select Category name");
	    	}
   		}
   		
	    function ChooseContact(){
	        <%
				CategoryHelper catReName = new CategoryHelper();
		   		List catName = catReName.getAllMainCategories();
			%>
			var categoryName= $('#reNameCat').val();
			var UpCaseCategoryName= categoryName.toUpperCase();
			<%
				for(int i=0;i<catName.size();i++){
				Category categName = (Category)catName.get(i);
    		%>
    		    var value ="<%=categName.getCategoryName()%>";
    		    var UpValue =  value.toUpperCase();
				if(UpCaseCategoryName == UpValue)
					{
					    document.getElementById("btn").disabled = true;	
						alert("Category Name Already Exist..!!!");
						location.reload();
				        return false;
					}
		    <%
				}
    		%>
    		reNamecategory();
		}
	</script>


<body>
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
			style="margin-top: 10px; margin-bottom: 40px;">Edit Category</h2>
		<div class="tab-content margin-t-13">
			<div id="home" class="tab-pane fade in active">
				<form action="cate" method="post" name="cat" class="form-horizontal">
					<div class="row">
						<div class="form-group">
							<div class="col-sm-2 col-sm-offset-3" align="right">
								<label class="control-label">Category:</label>
							</div>
							<div class="col-sm-3">
								<%
				                                    CategoryHelper catHelper = new CategoryHelper();
		   		                                    List catList = catHelper.getAllMainCategories();
			                                     %>
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-user"></i>
									</span> <input list="catId_drop" id="catId" class="form-control">
									<datalist id="catId_drop">
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
							</div>
						</div>

						<div class="form-group">
							<div class="col-sm-2 col-sm-offset-3" align="right">
								<label class="control-label">Rename Category:</label>
							</div>
							<div class="col-sm-3">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-user"></i>
									</span> <input list="catId_drop" name="reNameCat" id="reNameCat"
										class="form-control" placeholder="New Category Name">
									<datalist id="catId_drop">
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
								<p style="font-size: 15; color: #ff8000;">*Enter Alphabets only.</p>
							</div>
						</div>
					</div>
					<div class="row buttons_margin_top">
						<div align="center">
							<input type="button" name="btn" id="btn" onclick="isEmplty();" value="Save" class="btn btn-success btn-md button_hw" /> 
							<input type="reset" value="Cancel" class="btn btn-danger btn-md button_hw" />
							<input type="button" value="Back" id="listBtn" class="btn btn-lg btn-primary btn-md button_hw button_margin_right" onclick="Back()" />
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