<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta charset="utf-8">
<script type="text/javascript"
	src="/SMT/staticContent/js/employeeDetails.js"></script>
<script type="text/javascript">
  			function Back()
  			{
  				window.location = "employee_detail.jsp";
  			}
  		</script>
</head>
<body class="vColor">
<div class="row header_margin_top">
	<div align="center">
		<h2 class="form-name style_heading">Edit Employee Details</h2>
	</div>
</div>
<div class="row">
	<div class="col-sm-offset-1 col-md-10">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>
<div class="container col-sm-offset-2">
	<form class="form-horizontal" method="post" action="" name="empd1">
		<!-- Value of 'name' attribute is used in employeeDetails.js  -->
		<fieldset>
			<div class="row form-group">
				<label class="col-md-2 control-label" for="employeename">Employee
					Name</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
						<%
								EmployeeDetailsDao eedd = new EmployeeDetailsDao();
           						List mList =eedd.getAllMainEmployee();
							%>
						<input list="emp_drop" id="employee" class="form-control"
							onchange="getEmployeeDetails()">
						<datalist id="emp_drop">
							<%
					           for(int i=0;i<mList.size();i++){
					        	   EmployeeDetailsBean detailsBean =(EmployeeDetailsBean)mList.get(i);
							%>
							<option data-value="<%=detailsBean.getEmpId()%>"><%=detailsBean.getFirstName()%> <%=detailsBean.getLastName()%></option>
							<%
				      			}
				    		%>
						</datalist>
					</div>
				</div>
			</div>
			<div class="row form-group">
				<label class="col-md-2 control-label" for="firstName">First
					Name<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span> <input id="firstName" name="firstName" placeholder="First Name"
							class="form-control input-md" type="text">
					</div>
				</div>

				<label class="col-md-2 control-label" for="middleName">
					Middle Name<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span> <input id="middleName" name="middleName"
							placeholder="Middle Name" class="form-control input-md"
							type="text">
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
						</span> <input id="lastName" name="lastName" placeholder="Last Name"
							class="form-control input-md" type="text">
					</div>
				</div>

				<label class="col-md-2 control-label" for="joiningDate">Joining
					Date<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-calendar"></i>
						</span> <input id="joiningDate" readonly="readonly" name="joiningDate"
							placeholder="yyyy-mm-dd" class="form-control input-md"
							type="text">
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
							class="form-control input-md" type="email"
							onkeyup="employeedetails(this)">
					</div>
				</div>

				<label class="col-md-2 control-label" for="joiningDate">New
					Joining Date</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-calendar"></i>
						</span> <input id="newJoiningDate" name="joiningDate"
							placeholder="Joining Date" class="form-control input-md"
							type="date">
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
						</span> <input id="contactNo" name="contactNo" placeholder="Contact No."
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
				<label class="col-md-2 control-label" for="zipCode">Pin code<sup>*</sup></label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-envelope"></i>
						</span> <input id="zipCode" name="zipCode" placeholder="Pin code"
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
				<label class="col-md-2 control-label" for="joiningDate">Resign Date<sup>*</sup></label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i class="glyphicon glyphicon-calendar"></i> </span>
						<input id="resignDate" name="resignDate" class="form-control input-md"	type="date">
					</div>
				</div>			
			</div>

			<div class="form-group row">
				<div class="col-md-10 text-center">
						
						<input type="button" id="save" name="btn" style="font-size: 18px; padding-top: 4px; height: 40px;"
						class="btn btn-large btn-success   button-height-width"
						onclick="editEmployee()" value="Submit">
						
						<input id="save"
						name="btn" style="font-size: 18px; padding-top: 4px; height: 40px;"
						class="btn btn-large btn-danger  button-height-width"
						type="reset" onclick="reset()" value="Cancel">
						
						<input type="button" value="Back" style="font-size: 18px; padding-top: 4px; height: 40px;" id="listBtn"
						class="btn btn-primary" onclick="Back()" />
						
				</div>
</body>