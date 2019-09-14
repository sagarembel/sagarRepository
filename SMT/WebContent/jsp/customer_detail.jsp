<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>
<style>
.lablename{
    font-size: 18px;
    text-align: right;
}
</style>
<meta charset="utf-8">

<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/js/customerDetails.js"></script>

<!--

//-->
</script>
<script type="text/javascript">
          		 function Customerlist()
          		 {
          		 window.location = "creditCustomerList.jsp";
          		 }
          		 function editCustomer() {
          			 window.location = "editCreditCustomerDetails.jsp";
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
	<form class="form-horizontal" method="post" action="" name="cstd">
		<!-- Value of 'name' attribute is used in customerDetails.js  -->
		<fieldset>
			<div class="row form-group">
				<div class="col-md-6"></div>
			</div>
			<div class="row form-group">
				<label class="col-md-2 lablename"  for="firstName">First Name:<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
						<%
							CustomerDetailsDao dao1 = new CustomerDetailsDao();
           						List unitList =dao1.getAllCustomer();
							%>
						<input list="firstName_drop" id="firstName" placeholder="First Name" class="form-control">
						<datalist id="firstName_drop">
							<%
					           for(int i=0;i<unitList.size();i++){
					        	   CustomerDetailsBean bean1 =(CustomerDetailsBean)unitList.get(i);
							%>
							<option data-value="<%=bean1.getCustId()%>"
								value="<%=bean1.getFirstName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
				<label class="col-md-2 lablename" for="middleName">Middle
					Name:<!-- <sup>*</sup> -->
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i></span>
						<%
							CustomerDetailsDao dao2 = new CustomerDetailsDao();
           						List middleList =dao2.getAllCustomer();
							%>
						<input list="middleName_drop"  placeholder="Middle Name" id="middleName" class="form-control">
						<datalist id="middleName_drop">
							<%
					           for(int i=0;i<middleList.size();i++){
					        	   CustomerDetailsBean bean2 =(CustomerDetailsBean)middleList.get(i);
							%>
							<option data-value="<%=bean2.getCustId()%>"
								value="<%=bean2.getMiddleName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
			</div>

			<div class="row form-group">
				<label class="col-md-2 lablename" for="lastName">Last
					Name:<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i></span>
						<%
							CustomerDetailsDao dao3 = new CustomerDetailsDao();
           						List lastList =dao3.getAllCustomer();
							%>
						<input list="lastName_drop" id="lastName"  placeholder="Last Name" class="form-control">
						<datalist id="lastName_drop">
							<%
					           for(int i=0;i<lastList.size();i++){
					        	   CustomerDetailsBean bean3 =(CustomerDetailsBean)lastList.get(i);
							%>
							<option data-value="<%=bean3.getCustId()%>"
								value="<%=bean3.getLastName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
				<label class="col-md-2 lablename" for="address">Address:<sup>*</sup></label>
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
				<label class="col-md-2 lablename" for="contactNo">Contact
					No:<sup>*</sup>
				</label>
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-earphone"></i>
						</span> <input id="contactNo" name="contactNo" placeholder="10 Digit Contact No." maxlength="10" class="form-control input-md"
							type="text">
					</div>
				</div>
				<!-- <div class="col-md-2" align="right">
				<label class="lablename" for="aadharNo" style="margin: 0px 10px;">GSTTIN/UIN No:</label>
					</div>
				 <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> No. </span> <input id="aadharNo"
							name="aadharNo" placeholder="GSTTIN/UIN No:"
							class="form-control input-md" type="text">
					</div> 
				</div> -->
				
				<div class="col-sm-2" align="right">
			<label class="lablename" for="emailId" style="margin: 0px 10px;">Email ID:</label>
				</div>
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-envelope"></i>
						</span> <input id="emailId" name="emailId " placeholder="Email ID"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>

			<div class="row form-group">
			<!-- <div class="col-sm-2" align="right">
			<label class="lablename" for="emailId" style="margin: 0px 10px;">Email ID:</label>
				</div>
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-envelope"></i>
						</span> <input id="emailId" name="emailId " placeholder="Email ID"
							class="form-control input-md" type="text">
					</div>
				</div> -->
				<div class="col-md-2" align="right">
				<label class="lablename" for="zipCode" style="margin: 0px 10px;
				" >Zip Code:</label>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-envelope"></i>
						</span> <input id="zipCode" name="zipCode" placeholder="6 Digit Zip code" maxlength="6"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>

			<div class="form-group row">
				<div class="col-md-11 text-center">
					<input type="button" id="save" name="btn" style="font-size: 19px;height: 40px;" 
						class="btn btn-large btn-success btn-md button_hw button_margin_right"
						onclick="customerDetails()" value="Submit">
					<input type="button" id="save" name="btn" style="font-size: 19px;height: 40px;" 
						class="btn btn-large btn-danger btn-md button_hw button_margin_right" type="reset"
						onclick="reset()" value="Cancel"> 
					<input style="font-size: 19px;height: 40px;"  type="button" value="Edit"
						id="listBtn" class="btn btn-primary btn-md button_hw button_margin_right" onclick="editCustomer()" />
						<input
						style="font-size: 19px;height: 40px;" type="button" value="List"
						id="listBtn" class="btn btn-lg btn-info btn-md button_hw button_margin_right" onclick="Customerlist()" />
				</div>
			</div>
		</fieldset>
	</form>
</div>
<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</body>
