<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta charset="utf-8">
<script type="text/javascript"	src="/SMT/staticContent/js/employeeDetails.js"></script>
<script type="text/javascript">
          		 function employeelist()
          		 {
          		 	window.location = "employeeList.jsp";
          		 }
          		 function editEmployee() {
          			 window.location = "editEmployeeDetails.jsp";
				}
          		</script>
<script type="text/javascript">	
		function cheakForEmployee(){
			<%
			EmployeeDetailsDao catHelper1 = new EmployeeDetailsDao();
	   		List catList1 = catHelper1.getAllMainEmployee();
			%>
			var subCategoryName = $('#firstName').val();
    		var UpSubCatName = subCategoryName.toUpperCase();
    		var duplicate;
			<%
			for(int i=0;i< catList1.size();i++){
				EmployeeDetailsBean subcategory = (EmployeeDetailsBean)catList1.get(i);
			%>
			var subCat = "<%=subcategory.getFirstName()%>";
			var cat = "<%=subcategory.getLastName()%>";
			var subcatName=document.getElementById("firstName").value;
			var catName=document.getElementById("lastName").value;
			var UpValue = subCat.toUpperCase();
			if(UpSubCatName == UpValue && cat == catName)
			{
					duplicate = "found";
			}
			if(subcatName == subCat && cat == catName){
				alert("Employee already exist...Duplicate Not allowed");
				location.reload();
				return false;
			}
			<%
			}
			%>
			if(duplicate == "found"){
    			document.empd.btn.disabled = true;	
				alert("Employee Name Already Exist..!!!");
				location.reload();
				document.empd.btn.disabled = false;
    			return false;
    		}
		}
	</script>
</head>
<body class="vColor">
<div class="row header_margin_top">
	<div align="center">
		<h2 class="form-name style_heading">Employee Details</h2>
	</div>
</div>
<div class="row">
	<div class="col-sm-offset-1 col-md-10">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>
<div class="container col-sm-offset-2">
	<form class="form-horizontal" method="post" action="" name="empd">
		<fieldset>
			<div class="row form-group">
				<label class="col-md-2 control-label" for="firstName">First
					Name<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
							<%
								EmployeeDetailsDao cdd = new EmployeeDetailsDao();
           						List cList =cdd.getAllMainEmployee();
							%>
						<input list="firstName_drop" id="firstName" class="form-control">
						<datalist id="firstName_drop">
							<%
					           for(int i=0;i<cList.size();i++)
					           {
					        	   EmployeeDetailsBean cat=(EmployeeDetailsBean)cList.get(i);
							%>
							<option data-value="<%=cat.getEmpId()%>"
								value="<%=cat.getFirstName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>

				<label class="col-md-2 control-label" for="middleName">
					Middle Name<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
						<%
							EmployeeDetailsDao cdd1 = new EmployeeDetailsDao();
           						List cList1 =cdd1.getAllMainEmployee();
							%>
						<input list="middleName_drop" id="middleName" class="form-control">
						<datalist id="middleName_drop">
							<%
					           for(int i=0;i<cList1.size();i++){
					        	   EmployeeDetailsBean cat1=(EmployeeDetailsBean)cList1.get(i);
							%>
							<option data-value="<%=cat1.getEmpId()%>"
								value="<%=cat1.getMiddleName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-2 control-label" for="lastName">Last
					Name<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
						<%
							EmployeeDetailsDao cdd11 = new EmployeeDetailsDao();
           						List cList11 =cdd11.getAllMainEmployee();
							%>
						<input list="lastName_drop" id="lastName" class="form-control"
							onchange="cheakForEmployee()">
						<datalist id="lastName_drop">
							<%
					           for(int i=0;i<cList11.size();i++){
					        	   EmployeeDetailsBean cat11=(EmployeeDetailsBean)cList11.get(i);
							%>
							<option data-value="<%=cat11.getEmpId()%>"
								value="<%=cat11.getLastName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>

				<label class="col-md-2 control-label" for="joiningDate">Joining
					Date<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-calendar"></i>
						</span> <input id="joiningDate" name="joiningDate"
							placeholder="Joining Date" class="form-control input-md"
							type="date">
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-2 control-label" for="emailId"> Email
					ID</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-envelope"></i>
						</span> <input id="emailId" name="emailId " placeholder="Email ID"
							class="form-control input-md" type="text">
					</div>
				</div>

				<label class="col-md-2 control-label" for="salary">Salary<sup>*</sup></label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> Rs </span> <input id="salary"
							name="salary" placeholder="Salary" class="form-control input-md"
							type="text">
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-2 control-label" for="contactNo">Contact
					No.<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-earphone"></i>
						</span> <input id="contactNo" name="contactNo" placeholder="Contact No." maxlength="10"
							class="form-control input-md" type="text">
					</div>
				</div>

				<label class="col-md-2 control-label" for="address">Address<sup>*</sup></label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-map-marker"></i>
						</span> <input id="address" name="address " placeholder="Address"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-2 control-label" for="zipCode">Pin code<sup>*</sup></label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-envelope"></i>
						</span> <input id="zipCode" name="zipCode" placeholder="Pin code"  maxlength="6" class="form-control input-md" type="text">
					</div>
				</div>
			</div>

			<div class="form-group row">
				<div class="col-md-11 text-center">
					<input type="button" id="save" name="btn" style="font-size: 18px; padding-top: 4px; height: 40px;" class="btn btn-large btn-success btn-md button_hw button_margin_right" onclick="employeedetails()" value="Submit">
					<input id="save" name="btn" style=" font-size: 18px;  padding-top: 4px; height: 40px;"	class="btn btn-large btn-danger btn-md button_hw button_margin_right" type="reset" onclick="reset()" value="Cancel">
					<input style=" font-size: 18px; padding-top: 4px; height: 40px;" type="button" value="Edit" id="listBtn" class="btn btn-primary btn-md button_hw button_margin_right" onclick="editEmployee()" />
					<input style="font-size: 18px; padding-top: 4px; height: 40px;" type="button" value="List" id="listBtn" class="btn btn-lg btn-info btn-md button_hw button_margin_right" onclick="employeelist()"/>
				</div>
			</div>
		</fieldset>
	</form>
</div>
<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</body>