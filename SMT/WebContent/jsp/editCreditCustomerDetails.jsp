<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/customerDetails.js"></script>
<script type="text/javascript">
	function Back()
	{
		window.location = "customer_detail.jsp" ;
	}
</script>
</head>
<body class="vColor">
<div class="row header_margin_top">
	<div align="center">
		<h2 class="form-name style_heading">Customer Details</h2>
	</div>
</div>
<div class="row">
	<div class="col-sm-offset-1 col-md-10">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>
<div class="container col-sm-offset-1">
	<form class="form-horizontal" method="post" action="" name="cstd1">
		<!-- Value of 'name' attribute is used in customerDetails.js  -->
		<fieldset>
			<div class="row form-group">
			<div class="col-md-2" align="right">
				<label class="control-label" for="customerName" style="margin: 0px 10px;">Customer
					Name:</label>
					</div>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
						<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList =cdd.getAllCustomerForBilling();
							%>
						<input list="cust_drop" id="creditCustomer"
							onchange="getCustomerDetails()" class="form-control">
						<datalist id="cust_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>
							<option data-value="<%=cust.getCustId()%>"><%=cust.getFirstName() %>
								<%=cust.getLastName() %>
							</option>
							<%
				      			}
				    		%>
						</datalist>
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-2 control-label" for="firstName">First
					Name:<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span> <input id="firstName" name="firstName" placeholder="First Name"
							class="form-control input-md" type="text">
					</div>
				</div>
				<label class="col-md-2 control-label" for="middleName">Middle
					Name:<sup>*</sup>
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
					Name:<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span> <input id="lastName" name="lastName" placeholder="Last Name"
							class="form-control input-md" type="text">
					</div>
				</div>
				<label class="col-md-2 control-label" for="address">Address:<sup>*</sup></label>
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-map-marker"></i>
						</span> <input id="address" name="address " placeholder="Address"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-2 control-label" for="contactNo">Contact
					No:<sup>*</sup>
				</label>
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-earphone"></i>
						</span> <input id="contactNo" name="contactNo" placeholder="Contact No."
							class="form-control input-md" type="text">
					</div>
				</div>
				<div class="col-md-2" align="right">
				<label class="control-label" for="aadharNo" style="margin:0px 10px">GSTTIN/UIN
					No:</label>
					</div>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> No. </span> <input id="aadharNo"
							name="aadharNo" placeholder="GSTTIN/UIN No:."
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>

			<div class="row form-group">
			<div class="col-md-2" align="right">
				<label class="control-label" for="emailId" style="margin: 0px 10px">Email ID:
				</label>
				</div>
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-envelope"></i>
						</span> <input id="emailId" name="emailId " placeholder="Email ID"
							class="form-control input-md" type="text">
					</div>
				</div>
				<div class="col-md-2" align="right">
				<label class="control-label" for="zipCode" style="margin: 0px 10px">Zip code:</label>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-envelope"></i>
						</span> <input id="zipCode" name="zipCode" placeholder="Zip code"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>
			<div class="form-group row">
				<div class="col-md-7 col-md-offset-2 text-center">
					<button id="update" name="btn" class="btn btn-large btn-success  button-height-width" onclick="editcustomerDetails()" style="height: 40px;"><h4>Update</h4></button>
					<button	class="btn btn-large btn-danger  button-height-width" type="reset" onclick="reset()" style="height: 40px;"><h4>Cancel</h4></button>
					<button value="Back" id="listBtn" class="btn btn-large btn-primary button-height-width"	formaction="customer_detail.jsp" style="height: 40px;">	<h4>Back</h4></button>
				</div>
			</div>
		</fieldset>
	</form>
</div>
</body>