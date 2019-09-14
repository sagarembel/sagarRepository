<%@page import="com.smt.hibernate.SaleReturn"%>
<%@page import="java.util.Date"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
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
<script src="/SMT/staticContent/js/report.js"></script>
<body class="vColor">
	<div class="container-fluid">

		<div class="row">
			<div align="center" style="margin-top: 75px">
				<h2 class="form-name style_heading">Debit Note</h2>
			</div>
			<div class="row">
				<div class="col-sm-offset-1 col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>
<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home"><h4
						style="color: blue">Customer Wise</h4></a></li>
			<li><a data-toggle="tab" href="#twoDates"><h4
						style="color: blue">Between Two Dates</h4></a></li>
		</ul>
		
		<div class="tab-content" style="float: left">
		<div id="home" class="tab-pane fade in active">
		<div class="row"></div>
		<form class="form-horizontal" method="post" action="" name="fertiBill">
			<fieldset>
				<div class="row form-group" style="padding-top: 10px;">
					<label class="col-md-2 control-label" for="supplier">Customer
						Name</label>
					<div class="col-md-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="	glyphicon glyphicon-hand-right"></i>
							</span>
							<%
							CustomerDetailsDao sdd88 = new CustomerDetailsDao();
           						List sList88 =sdd88.getAllCustomer1();
							
							%>
							<input list="cust_drop5" id="creditCustomer5"
								class="form-control">
							<datalist id="cust_drop5">
								<%
					           for(int i=0;i<sList88.size();i++){
					        	   SaleReturn sup88 =(SaleReturn)sList88.get(i);
							%>
								<option data-value="<%=sup88.getPkBillId()%>"
									value="<%=sup88.getCustomerName()%>"></option>
								<%
				      			}
				    		%>
							</datalist>
						</div>
					</div>

					<label class="col-md-2 control-label" for="supplier">Select
						Customer Type</label>
					<div class="col-md-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="	glyphicon glyphicon-hand-right"></i>
							</span> <select class="form-control" id="paymentMode">
								<option value="selected1">-Select Type--</option>
								<option value="Tax Invoice">Tax Invoice</option>
								<option value="Credit Customer">Credit Customer</option>
							</select>
						</div>
					</div>
					
					<div align="center">
						<input type="button" id="btn" name="save" style="margin-right: 206px;"
							class="btn btn-lg btn-success btn-md button_hw button_margin_right"
							onclick="debitNoteReportBetweenTwoDates()" value="Search" />
					</div>

				</div>


				<div class="table-responsive">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example4" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Sr No</th>
								<th>Return Date</th>
								<th>Customer Name</th>
								<th>Customer Type</th>
								<th>Bill No</th>
								<th>Barcode No</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Sale Price</th>
								<th>Return Quantity</th>
								<th>Return Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="9" style="text-align: right">Total:</th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</fieldset>
		</form>
		</div>
		
		<div id="twoDates" class="tab-pane ">
				<div class="row"></div>
				<form class="form-horizontal" method="post" action=""
					name="fertiBill">
					<fieldset>
						<div class="row form-group" style="margin-top: 20px">
							<label class="col-md-2 control-label" for=""> Start
								Date:<sup>*</sup>
							</label>
							<div class="col-md-2">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-user"></i>
									</span> <input type="date" id="fisDate" placeholder="Start Date"
										class="form-control input-md" type="text">
								</div>
							</div>

							<label class="col-md-2 control-label" for="">End
							Date:<sup>*</sup>
							</label>
							<div class="col-md-2">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-map-marker"></i>
									</span> <input type="date" id="endDate" placeholder="End Date"
										class="form-control input-md ac_district" type="text">
								</div>
							</div>
							<div align="center">

								<input type="button" id="btn" name="save" style="margin-right: 206px;"
									class="btn btn-lg btn-success btn-md button_hw button_margin_right"
									onclick="debitNoteReportBetweenTwoDates1()" value="Search" />

							</div>
						</div>

						
						<div class="table-responsive">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example5" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Sr No</th>
								<th>Return Date</th>
								<th>Customer Name</th>
								<th>Customer Type</th>
								<th>Bill No</th>
								<th>Barcode No</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Sale Price</th>
								<th>Return Quantity</th>
								<th>Return Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="9" style="text-align: right">Total:</th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
					</fieldset>
				</form>
</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>