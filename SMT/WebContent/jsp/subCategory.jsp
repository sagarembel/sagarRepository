<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.helper.SubCategoryHelper"%>
<%@page import="java.util.List"%>
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
 <link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
	    <script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script> 
		<script src="/SMT/staticContent/y_js/uppercase.js"></script>
	<script src="/SMT/staticContent/y_js/subcategory.js"></script>
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

function subCatList()
{
	window.location="subCategoryList.jsp";
}

		function cheakForSubCat()
		{
			<%
			SubCategoryDao catHelper1 = new SubCategoryDao();
	   		List catList1 = catHelper1.getAllSubCategories();
			%>
			var subCategoryName = $('#subcategoryName').val();
    		var UpSubCatName = subCategoryName.toUpperCase();
    		var duplicate;
			<%
			for(int i=0;i< catList1.size();i++){
				SubCategory subcategory = (SubCategory)catList1.get(i);
			%>
			var subCat = "<%=subcategory.getSubcatName()%>";
			var cat = "<%=subcategory.getCatName()%>";
			var subcatName=document.getElementById("subcategoryName").value;
			var catName=document.getElementById("fkRootcatId").value;
			var UpValue = subCat.toUpperCase();
			if(UpSubCatName == UpValue && cat == catName)
			{
					duplicate = "found";
			}
			if(subcatName == subCat && cat == catName){
				alert("subcategory already exist...Duplicate Not allowed");
				location.reload();
				return false;
			}
			<%
			}
			%>
			if(duplicate == "found"){
    			document.subCat.btn1.disabled = true;	
				alert("Sub Category Name Already Exist..!!!");
				location.reload();
				document.subCat.btn1.disabled = false;
    			return false;
    		}
		}

	</script>
	<script type="text/javascript">
	    function cheakForAvailableCat(){
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
    		if(duplicate == "found"){
    			document.cat.btn.disabled = true;	
				alert("Category Name Already Exist..!!!");
 				document.cat.reset();
				document.cat.btn.disabled = false;
    			return false;
    		}
		}
	    </script>
<body class="vColor">
	<div class="container-fluid">  
  <div class="row" style="margin-top: 90px; margin-bottom: 45px;" align="right">
			<div class="form-group" >
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
          <h2 align="center" class="form-heading" style="margin-top: 10px; margin-bottom: 40px;">Add Sub Category</h2>
		<!-- <div class="row"  style="margin-top: 100px; margin-bottom: 45px;">
			<div class="col-sm-10 col-sm-offset-1">	
				<div class="row margin-t-13">
					<div class="">			
						<ul class="nav nav-tabs">
						    <li class="active"><a data-toggle="tab" href="#home">Add Category</a></li>
						   		   				    
					    </ul>
					</div>
				</div>
			</div>
		</div> -->
	<!-- 	 <ul class="nav nav-tabs">
	  		<li class="active"><a data-toggle="tab" href="#home"><h4 style="color:blue">Add Category</h4></a></li>
	  		<li ><a data-toggle="tab" href="#subCategory"><h4 style="color:blue">Add Sub Category</h4></a></li>
	  </ul> -->
				<!-- <div class="tab-content margin-t-13">
				
				    <div id="home" class="tab-pane fade in active">
				 -->    
				 <!-- SubCategory -->
     <div  class="tab-pane">
		<form method="post" name="subCat" class="form-horizontal">
						      	<div class="row">
						      	<div class="row">
											<div class="form-group">
											    <div class="col-sm-2 col-sm-offset-3" align="right">
											    	  <label class="control-label">Category:<sup>*</sup></label>
												</div>
												<div class="col-sm-3" style="width: 341px;margin-left: 5px;">
												 			<div class="input-group">
																	<span class="input-group-addon">
																		<i class="glyphicon glyphicon-plus"></i>
																	</span>
																<!-- <input type="text" name="categoryName" id="categoryName" class="form-control" data-toggle="tooltip" title="Enter Alphabets Only...!!!" placeholder="Category Name" onkeyup="cheakForAvailableCat()" onblur="cheakForAvailableCat()" > -->
																<input list="fkRootcatId_drop" id="fkRootcatId" name="categoryName" class="form-control" placeholder="Category Name" >
						                                            <datalist id="fkRootcatId_drop">
						                                            <%
							                                            for(int i =0 ;i<catList.size();i++)
								                                        {
							                                            	Category cat = (Category)catList.get(i);
						                                            %>
							                                        <option data-value="<%=cat.getPkCategoryId()%>" value="<%=cat.getCategoryName()%>"> 
						                                            <%   	
								                                        }	
						                                            %>
						                                            </datalist>
													  		</div>
												</div>
									        </div>
									     </div>
											
											    <div class="col-sm-2 col-sm-offset-3" align="right">
											    	  <label class="control-label">Sub Category:<sup>*</sup></label>
												</div>
												<div class="col-sm-3">
												 			<div class="input-group">
																	<span class="input-group-addon">
																		<i class="glyphicon glyphicon-minus"></i>
																	</span>
																<!-- <input type="text" name="categoryName" id="categoryName" class="form-control" data-toggle="tooltip" title="Enter Alphabets Only...!!!" placeholder="Category Name" onkeyup="cheakForAvailableCat()" onblur="cheakForAvailableCat()" > -->
																<input list="catId_drop1" id="subcategoryName" name="subcategoryName" class="form-control" placeholder="Sub Category Name" onchange="cheakForSubCat()" style="text-transform: uppercase;">
						                                            <datalist id="catId_drop1">
						                                            <%
							                                            for(int i =0 ;i<catList1.size();i++)
								                                        {
							                                            	SubCategory cat1 = (SubCategory)catList1.get(i);
						                                            %>
							                                        <option data-value="<%=cat1.getPkSubcatId()%>" value="<%=cat1.getSubcatName()%>"> 
						                                            <%   	
								                                        }	
						                                            %>
						                                            </datalist>
													  		</div>
													  		    <p style="font-size:15;color:#ff8000;">*Enter Alphabets only.</p>
												</div>
									        </div>
									  	<div class="row buttons_margin_top">
											<div align="center">
											    <input type="button" name="btn1" onclick="valsubCat();" value="Save"  class="btn btn-success btn-md button_hw"/> 
												<input type="reset" value="Cancel" class="btn btn-danger btn-md button_hw"/>
										  		<!-- <input type="button" style="width: 125;"style="width:230;" name="btn" onclick="subCatList();" value="List" class="btn btn-lg btn-primary btn-md button_hw"/> -->
										  		
										  		<input style="width: 125;" type="button" style="width:230;" name="btn" onclick="subCatList();" value="List"  class="btn btn-lg btn-info btn-md button_hw"/>
										  		
										  		<input style="width: 125;" type="button" style="width:230;" name="btn" onclick="goEditSubCatagoryFrom();" value="Edit"  class="btn btn-primary btn-md button_hw"/><a href="EditSubcategory.jsp"></a>
										  </div>
									</div>		
						</form>
         
       </div>
       </div>
			 <div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>  
     </body>
  </html>

</body>
</html>