<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.ExpenditureDetailsDao"%>
<%@page import="com.smt.hibernate.ExpenditureDetailsBean"%>
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
<script src="/SMT/staticContent/js/cashbankbook.js"></script>
	<style>
.left-tab-new{
    width: 192px;
    background: #ba0707;
    color:  white;
    border-radius: 0px;

}
</style>
<body class="vColor">
<div class="row" style="min-height: 300px;">
	<div class="col-md-12">
		<h3>Left Tabs</h3>
		<hr />
		<div class="col-md-2">
			<ul class="nav nav-tabs tabs-left">
				<li class="active"><a href="#home" data-toggle="tab"  class="left-tab-new">Supplier	Transaction Reports</a></li>
				<li><a href="#profile" data-toggle="tab"  class="left-tab-new">Customer Transaction	Reports</a></li>
				<li><a href="#messages" data-toggle="tab"  class="left-tab-new">Employee Transaction Reports</a></li>
				<li><a href="#settings" data-toggle="tab"  class="left-tab-new">Expenditure Transaction Reports</a></li>
				<li><a href="#creditAndDebitReport" data-toggle="tab"  class="left-tab-new">Credit And Debit Reports</a></li>
			</ul>
		</div>
		<div class="col-xs-9">
			<!-- Tab panes -->
			<div class="tab-content">

				<!---------- 	supplier Payment reports -------------->

				<div class="tab-pane active" id="home">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Supplier Transaction Reports</h2>
						</div>
						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#supplierNAme"><h4
									style="color: blue">Supplier Name Wise</h4></a></li>
						<!-- <li><a data-toggle="tab" href="#supplierBillWise"><h4
									style="color: blue">Bill Number Wise</h4></a></li> -->
						<li><a data-toggle="tab" href="#supplierSingleDate"><h4
									style="color: blue">Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#supplierBetweenTwoDate"><h4
									style="color: blue">Range</h4></a></li>

					</ul>

					<div class="tab-content" style="float: left">

						<!-- Supplier Name Wise -->
						<div id="supplierNAme" class="tab-pane fade in active">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="supplier">Supplier
											Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-hand-right"></i>
												</span>
												<%
													SupplierDetailDao sdd88 = new SupplierDetailDao();
													List sList88 = sdd88.getAllSupplier();
												%>
												<input list="sup_drop7" id="supplier7" class="form-control">
												<datalist id="sup_drop7">
													<%
														for (int i = 0; i < sList88.size(); i++) {
															SupplierDetail sup88 = (SupplierDetail) sList88.get(i);
													%>
													<option data-value="<%=sup88.getSupplierId()%>"
														value="<%=sup88.getSupplierName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
										<div class="col-md-3 ">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="getSupNameWiseReport()" value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierNameWiseTable" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Date</th>
													<th>Supplier Name</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account No</th>
													<th>Bank Name</th>
													<th>Accountant Name</th>
												</tr>
											</thead>
										</table>
									</div>
								</fieldset>
							</form>
						</div>
						<!-- Bill number wise -->
						<div id="supplierBillWise" class="tab-pane ">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="supplier">Supplier
											Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-hand-right"></i>
												</span>
												<%
													SupplierDetailDao sdd = new SupplierDetailDao();
													List sList = sdd.getAllSupplier();
												%>
												<input list="sup_drop" id="supplier"
													onchange="getAllBills1()" class="form-control">
												<datalist id="sup_drop">
													<%
														for (int i = 0; i < sList.size(); i++) {
															SupplierDetail sup = (SupplierDetail) sList.get(i);
													%>
													<option data-value="<%=sup.getSupplierId()%>"
														value="<%=sup.getSupplierName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
										<label class="col-md-2 control-label" for="bill_no">
											Bill No </label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> No </span> <select
													class="form-control input-md" id='billNo' name="billNo">
												</select>
											</div>
										</div>
									</div>
									<div class="row form-group">
										<div class="col-md-3 col-md-offset-4">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="getBillWiseReport()" value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierBillWiseData" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Date</th>
													<th>Supplier Name</th>
													<th>Bill Number</th>
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Balance Amount</th>
													<th>Account No</th>
													<th>Bank Name</th>
													<th>Accountant Name</th>
												</tr>
											</thead>
										</table>
									</div>
								</fieldset>
							</form>
						</div>

						<!--    for single date -->
						<div id="supplierSingleDate" class="tab-pane">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="supReport">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-3 control-label" for=""> Enter
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate11" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
										<div class="col-md-3">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="supplierReportForSingleDate()" value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierSingleDatetable" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Supplier Name</th>
													<th>Date</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>													
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account No</th>
													<th>Bank Name</th>
													<th>Accountant Name</th>
												</tr>
											</thead>											
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</fieldset>
							</form>
						</div>

						<!------ 	Between Two Dates  ----->
						<div id="supplierBetweenTwoDate" class="tab-pane fade">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="supReport1">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-2 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fisDate1" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="endDate">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDate1" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">
											<input type="button" id="btn" name="save"
												class="btn btn-lg btn-success btn-md button_hw button_margin_right"
												onclick="getSupplierDetailsBetweenTwoDates()" value="Search" />
										</div>
									</div>

									<table
										class="table table-bordered table-striped table-condensed cf"
										id="supplierBetweenTwoDatestable" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
										<thead>
											<tr>
												<th>Date</th>
												<th>Supplier Name</th>
												<!-- <th>Bill Number</th> -->
												<th>Payment Type</th>
												<th>Payment Mode</th>
												<th>Total Amount</th>
												<th>Payment Amount</th>
												<th>Return Amount</th>
												<th>Balance Amount</th>												
												<th>Description</th>
												<th>Account No</th>
												<th>Bank Name</th>
												<th>Accountant Name</th>
											</tr>
										</thead>
									</table>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				<!---------   Customer Payment Reports--------->

				<div class="tab-pane" id="profile">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Credit Customer Transaction
								Reports</h2>
						</div>
						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"
							href="#customerNameWise"><h4 style="color: blue">Customer
									Name wise</h4></a></li>
						<!-- <li><a data-toggle="tab" href="#customerBillWise"><h4
									style="color: blue">Bill Number Wise</h4></a></li> -->
						<li><a data-toggle="tab" href="#customerSingleDate"><h4
									style="color: blue">Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#customerBetweenTwoDate"><h4
									style="color: blue">Range</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">

						<!-- 	Customer Name wise -->
						<div id="customerNameWise" class="tab-pane fade in active">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-3 control-label" for="customerName">Customer
											Name</label>
										<div class="col-md-4">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>
												<%
													CustomerDetailsDao dao = new CustomerDetailsDao();
													List custList = dao.getAllCustomer();
												%>
												<input list="cust_drop5" id="creditCustomer5"
													class="form-control">
												<datalist id="cust_drop5">
													<%
														for (int i = 0; i < custList.size(); i++) {
															CustomerDetailsBean cust2 = (CustomerDetailsBean) custList
																	.get(i);
													%>
													<option data-value="<%=cust2.getCustId()%>"><%=cust2.getFirstName()%>
														<%=cust2.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
											</div>
										</div>
										<div class="col-md-3 ">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="getCreditCustomerReportNameWise()" value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="customerNameWiseData2" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Date</th>
													<th>Customer Name</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account Number</th>
													<th>Bank Name</th>
												</tr>
											</thead>
											 <tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</fieldset>
							</form>
						</div>

						<!-- Customer Bill number wise -->
						<div id="customerBillWise" class="tab-pane">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-2 control-label" for="customerName">Customer
											Name</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span>
												<%
													CustomerDetailsDao cdd = new CustomerDetailsDao();
													List cList = cdd.getAllCustomer();
												%>
												<input list="cust_drop" id="creditCustomer"
													class="form-control" onchange="getBillByCustomer1()">
												<datalist id="cust_drop">
													<%
														for (int i = 0; i < cList.size(); i++) {
															CustomerDetailsBean cust = (CustomerDetailsBean) cList.get(i);
													%>
													<option data-value="<%=cust.getCustId()%>"><%=cust.getFirstName()%>
														<%=cust.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
											</div>
										</div>
									</div>
									<div class="row form-group">
										<label class="col-md-2 control-label" for="bill_no">
											Bill No </label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> No </span> <select
													class="form-control input-md" id='billNo1' name="billNo1">
												</select>
											</div>
										</div>
										<div class="col-md-3 ">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="getBillWiseCreditReport()" value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="customerNameWiseData" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Date</th>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Bill Number</th>
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<!-- <tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot> -->
										</table>
									</div>
								</fieldset>
							</form>
						</div>

						<!--    for single date -->
						<div id="customerSingleDate" class="tab-pane">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="custReport">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-3 control-label" for=""> Enter
											Date:<sup>*</sup>
										</label>
										<div class="col-md-4">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate1" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
										<div class="col-md-3">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="creditCustReportForSingleDate()" value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="customerSingleDatetable" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Date</th>
													<th>Customer Name</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account Number</th>
													<th>Bank Name</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</fieldset>
							</form>
						</div>

						<!------ 	Between Two Dates  ----->
						<div id="customerBetweenTwoDate" class="tab-pane fade">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>

							<form class="form-horizontal" method="post" action=""
								name="custReport1">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-2 control-label" for="startDate">
											Start Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fisDate" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-2 control-label" for="village">End
											Date:<sup>*</sup>
										</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDate" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">
											<input type="button" id="btn" name="save"
												class="btn btn-lg btn-success btn-md button_hw button_margin_right"
												onclick="getCreditCustomerDetailsBetweenTwoDates()"
												value="Search" />
										</div>
									</div>
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="customerBetweenTwoDates" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
										<thead>
											<tr>
												<th>Date</th>
												<th>First Name</th>
												<th>Last Name</th>
												<!-- <th>Bill Number</th> -->
												<th>Payment Type</th>
												<th>Payment Mode</th>
												<th>Total Amount</th>
												<th>Payment Amount</th>
												<th>Return Amount</th>												
												<th>Balance Amount</th>
												<th>Description</th>
												<th>Account Number</th>
												<th>Bank Name</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="6" style="text-align: right">Total:</th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
											</tr>
										</tfoot>
									</table>
								</fieldset>
							</form>
						</div>
					</div>
				</div>

				<!----- 	Employee Payment reports ------>
				<div class="tab-pane" id="messages">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Employee Transaction Reports</h2>
						</div>
						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"
							href="#employeeSingleDate"><h4 style="color: blue">Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#empBetweenTwoDate"><h4
									style="color: blue">Range</h4></a></li>
					</ul>
					<div class="tab-content" style="float: left">

						<!--    for single date -->
						<div id="employeeSingleDate" class="tab-pane fade in active">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="empReport">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-3 control-label" for=""> Enter
											Date:<sup>*</sup>
										</label>
										<div class="col-md-4">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fDate2" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
										<div class="col-md-3">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="employeePaymentReportForSingleDate()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="employeeSingleDatetable" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Payment Date</th>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Payment Amount</th>
													<th>Cheque Number</th>
													<th>Accountant Name</th>
													<th>Reason</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</fieldset>
							</form>
						</div>

						<!-------- 	Between Two Days	 -------->
						<div id="empBetweenTwoDate" class="tab-pane">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>

							<form class="form-horizontal" method="post" action=""
								name="empReport1">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-1 control-label" for="employeename">Employee
											Name:</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span>
												<%
													EmployeeDetailsDao eedd = new EmployeeDetailsDao();
													List mList = eedd.getAllMainEmployee();
												%>
												<input list="emp_drop" id="employee" class="form-control">
												<datalist id="emp_drop">
													<%
														for (int i = 0; i < mList.size(); i++) {
															EmployeeDetailsBean detailsBean = (EmployeeDetailsBean) mList
																	.get(i);
													%>
													<option data-value="<%=detailsBean.getEmpId()%>"><%=detailsBean.getFirstName()%>
														<%=detailsBean.getLastName()%></option>
													<%
														}
													%>
												</datalist>
											</div>
										</div>

										<label class="col-md-1 control-label" for="startDate">
											Start Date:</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="fisDate2" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-1 control-label" for="village">End
											Date:</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-calendar"></i>
												</span> <input type="date" id="endDate2" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">
											<input type="button" id="btn" name="save"
												class="btn btn-lg btn-success btn-md button_hw button_margin_right"
												onclick="getEmpPaymentDetailsBetTwoDays()" value="Search" />
										</div>
									</div>

									<table
										class="table table-bordered table-striped table-condensed cf"
										id="empBetweenTwoDates" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
										<thead>
											<tr>
												<th>Payment Date</th>
												<th>First Name</th>
												<th>Last Name</th>
												<th>Payment Type</th>
												<th>Payment Mode</th>
												<th>Payment Amount</th>
												<th>Cheque Number</th>
												<th>Accountant Name</th>
												<th>Reason</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="5" style="text-align: right">Total:</th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
											</tr>
										</tfoot>
									</table>
								</fieldset>
							</form>
						</div>
					</div>
				</div>


				<!---------- Expenditure Payment Reports ------->

				<div class="tab-pane" id="settings">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Expenditure Transaction
								Reports</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"
							href="#expenseSingleDate"><h4 style="color: blue">Datewise</h4></a></li>
						<li><a data-toggle="tab" href="#expenseBetweenTwoDate"><h4
									style="color: blue">Range</h4></a></li>
					</ul>

					<div class="tab-content" style="float: left">
						<!--    for single date -->
						<div id="expenseSingleDate" class="tab-pane fade in active">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="expnsReport">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-3 control-label" for=""> Enter
											Date:<sup>*</sup>
										</label>
										<div class="col-md-4">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span> <input type="date" id="fDate4" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
										<div class="col-md-3">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="expensePaymentReportForSingleDate()"
													value="Search" />
											</div>
										</div>
									</div>
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="expenseSingleDatetable" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Payment Date</th>
													<th>Expense Name</th>
													<th>Service Provider</th>
													<th>Payment Mode</th>
													<th>payment</th>
													<th>Accountant Name</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="4" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</fieldset>
							</form>
						</div>

						<!------- between Two dates ------->

						<div id="expenseBetweenTwoDate" class="tab-pane">
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
							<form class="form-horizontal" method="post" action=""
								name="expReport1">
								<fieldset>
									<div class="row form-group">
										<label class="col-md-1 control-label" for="expenditureName">Expenditure
											Name:</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="	glyphicon glyphicon-hand-right"></i>
												</span>
												<%
													ExpenditureDetailsDao exdd = new ExpenditureDetailsDao();
													List exList = exdd.getAllExpenseName();
												%>
												<input list="exp_drop" id="expenseName" class="form-control">
												<datalist id="exp_drop">
													<%
														for (int i = 0; i < exList.size(); i++) {
															ExpenditureDetailsBean expbean = (ExpenditureDetailsBean) exList
																	.get(i);
													%>
													<option data-value="<%=expbean.getPkExpenseDetailsId()%>"
														value="<%=expbean.getExpenseName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
										</div>
										<label class="col-md-1 control-label" for="startDate">
											Start Date:</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span> <input type="date" id="fisDate4" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>

										<label class="col-md-1 control-label" for="endDate">End
											Date:</label>
										<div class="col-md-3">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-map-marker"></i>
												</span> <input type="date" id="endDate4" placeholder="End Date"
													class="form-control input-md ac_district" type="text">
											</div>
										</div>
									</div>

									<div class="row form-group buttons_margin_top ">
										<div align="center">
											<input type="button" id="btn" name="save"
												class="btn btn-lg btn-success btn-md button_hw button_margin_right"
												onclick="getExpensePaymentDetailsBetTwoDays()"
												value="Search" />
										</div>
									</div>

									<table
										class="table table-bordered table-striped table-condensed cf"
										id="expenseBetweenTwoDates" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
										<thead>
											<tr>
												<th>Payment Date</th>
												<th>Expense Name</th>
												<th>Service Provider</th>
												<th>payment Mode</th>
												<th>payment</th>
												<th>Accountant Name</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="4" style="text-align: right">Total:</th>
												<th></th>
												<th></th>
											</tr>
										</tfoot>
									</table>
								</fieldset>
							</form>
						</div>
						
						</div>
							</div>
						
						<!-------------------------------------------- CREDIT AND DEBIT REPORT -------------------------->
						

				<div class="tab-pane" id="creditAndDebitReport">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Credit Debit Report</h2>
						</div>

						<div class="row">
							<div class="col-sm-offset-1 col-md-10">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<!-- <ul class="nav nav-tabs">
						<li><a data-toggle="tab" href="#creditDebitRange"><h4 style="color: blue">Range</h4></a></li>
					</ul>
 -->
					<div class="tab-content" style="float: left">
						<!--    for single date -->
						<div id="creditDebitRange" class="tab-pane fade in active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							<form class="form-horizontal" method="post" action=""
								name="expnsReport">
								<fieldset>
									<div class="row form-group">
										<label class="col-sm-1 col-sm-offset-1 control-label" for="startDateCD">Start Date: <sup>*</sup></label>
										<div class="col-md-2">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span> <input type="date" id="startDateCD" placeholder="Start Date"
													class="form-control input-md" type="text">
											</div>
										</div>
										
										<label class="col-sm-1 col-sm-offset-1 control-label" for="endDateCD">End Date: <sup>*</sup></label>
										<div class="col-md-2">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span> <input type="date" id="endDateCD" placeholder="End Date"
													class="form-control input-md" type="text">
											</div>
										</div>
										
										<div class="col-md-1 col-sm-offset-1">
											<div class="input-group">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="creditDebitReportRangeWise()"
													value="Search" />
											</div>
										</div>
									</div>
									<!-- <div class="table-responsive"> -->
									<div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditDebitReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Transaction Id/Bill No</th>
													<th>Discription</th>
													<th>Date</th>
													<th>Credit</th>
													<th>Debit</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</fieldset>
							</form>
						</div>		
					</div>
				</div>
		
			</div>
		</div>
	</div>
</div>

<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</body>