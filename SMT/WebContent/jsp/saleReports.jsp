<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.helper.GoodReceiveHelper"%>
<%@page import="com.smt.bean.CategoryDetails"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.CategoryDao"%>
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

<div class="container" style="float: left">
	<div class="row">
		<div align="center" style="margin-top: 75px">
			<h2 class="form-name style_heading">Sale Reports</h2>
		</div>
		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
	</div>
	<ul class="nav nav-tabs">
		<li class="active"><a data-toggle="tab" href="#home"><h4
					style="color: blue">Single Date</h4></a></li>
		<li><a data-toggle="tab" href="#twoDates"><h4
					style="color: blue">Between Two Dates</h4></a></li>
		<li><a data-toggle="tab" href="#CatWise"><h4
					style="color: blue">Category Wise</h4></a></li>
		<li><a data-toggle="tab" href="#gstWise"><h4
					style="color: blue">GST Wise</h4></a></li>
		<li><a data-toggle="tab" href="#BarcodeWise"><h4
					style="color: blue">Barcode Wise</h4></a></li>
	</ul>

	<div class="tab-content" style="float: left">

		<!-------- Single Date ---------->
		<div id="home" class="tab-pane fade in active">
			<div class="row"></div>
			<form class="form-horizontal" method="post" action="" name="">
				<fieldset>
					<div class="row form-group" style="margin-top: 20px">
						<label class="col-md-3 control-label" for=""> Enter Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span> <input type="date" id="fDate" placeholder="Start Date"
									class="form-control input-md" type="text">
							</div>
						</div>
						<div class="col-md-3">
							<div class="input-group">
								<input type="button" id="btn" name="save"
									class="btn btn-lg btn-success btn-md button_hw button_margin_right"
									onclick="singleDateSale()" value="Search" />
							</div>
						</div>
					</div>
					<div class="table-responsive">
						<table
							class="table table-bordered table-striped table-condensed cf"
							style="border: 2px solid black; border-collapse: collapse;"
							id="example" class="display	" style="width: 1300px;">
							<thead>
								<tr>
									<th>Bill No</th>
									<th>Car No</th>
									<th>Barcode No</th>
									<th>ItemName</th>
									<th>CategoryName</th>
									<th>SalePrice</th>
									<th>Owner Name</th>
									<th>Contact No</th>
									<th>Total Amount</th>
									<th>Discount</th>
								</tr>
							</thead>
							<tfoot>
								<tr>
									<th colspan="8" style="text-align: right">Total Rs:</th>
									<th></th>
									<th></th>
								</tr>
							</tfoot>
						</table>
					</div>
				</fieldset>
			</form>
		</div>

		<!-- ---	Between Two Dates	---- -->
		<div id="twoDates" class="tab-pane ">
			<div class="row"></div>
			<form class="form-horizontal" method="post" action=""
				name="fertiBill">
				<fieldset>
					<div class="row form-group" style="margin-top: 20px">
						<label class="col-md-2 control-label" for="customerName">
							Start Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
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
									class="glyphicon glyphicon-map-marker"></i>
								</span> <input type="date" id="endDate" placeholder="End Date"
									class="form-control input-md ac_district" type="text">
							</div>
						</div>
					</div>

					<div class="row form-group buttons_margin_top ">
						<div align="center">
							<input type="button" id="btn" name="save"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="getSaleDetailsBetweenTwoDates()" value="Search" />
						</div>
					</div>
					<table
						class="table table-bordered table-striped table-condensed cf"
						style="border: 2px solid black; border-collapse: collapse;"
						id="example1" class="display" style="width: 1300px;">
						<thead>
							<tr>
								<th>Bill No</th>
								<th>Car No</th>
								<th>Barcode No</th>
								<th>ItemName</th>
								<th>CategoryName</th>
								<th>SalePrice</th>
								<th>Owner Name</th>
								<th>Contact No</th>
								<th>Total Amount</th>
								<th>Discount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="8" style="text-align: right">Total Rs:</th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</fieldset>
			</form>
		</div>

		<!--  <!------ Category Wise ------>
		<div id="CatWise" class="tab-pane ">
			<div class="row"></div>
			<form class="form-horizontal" method="post" action=""
				name="fertiBill">
				<fieldset>
					<div class="row" style="margin-top: 25px;">
						<div class="form-group">
							<div class="col-sm-2 col-sm-offset-2" align="center">
								<label class="control-label">Select Category:</label>
							</div>
							<%	
										CategoryHelper ch = new CategoryHelper();
										List list = ch.getCategorys();
									%>
							<div class="col-sm-3">
								<input list="empId_drop" id="catId" class="form-control">
								<datalist id="empId_drop">
									<%
												for(int i=0;i<list.size();i++){
													CategoryDetails item = (CategoryDetails)list.get(i);
											%>
									<option data-value="<%=item.getCatId()%>"
										value="<%=item.getCatName()%>">
										<%
												}
											%>
									
								</datalist>
							</div>
						</div>
					</div>

					<div class="row form-group buttons_margin_top ">
						<div align="center">
							<input type="button" id="btn" name="save"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="CategoryWiseSale()" value="Search" />
						</div>
					</div>
					<table
						class="table table-bordered table-striped table-condensed cf"
						style="border: 2px solid black; border-collapse: collapse;"
						id="example3" class="display" style="width: 1300px;">
						<thead>
							<tr>
								<th>Bill No</th>
								<th>Car No</th>
								<th>Barcode No</th>
								<th>ItemName</th>
								<th>CategoryName</th>
								<th>SalePrice</th>
								<th>Owner Name</th>
								<th>Contact No</th>
								<th>Total Amount</th>
								<th>Discount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="8" style="text-align: right">Total Rs:</th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</fieldset>
			</form>
		</div>

		<!-- ---	GST Report Between Two Dates	---- -->
		<div id="gstWise" class="tab-pane ">
			<div class="row"></div>
			<form class="form-horizontal" method="post" action=""
				name="fertiBill">
				<fieldset>
					<div class="row form-group" style="margin-top: 20px">
						<label class="col-md-2 control-label" for=""> Start Sale
							Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span> <input type="date" id="firstDate" placeholder="Start Date"
									class="form-control input-md" type="text">
							</div>
						</div>

						<label class="col-md-2 control-label" for="">End Sale
							Date:<sup>*</sup>
						</label>
						<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-map-marker"></i>
								</span> <input type="date" id="secondDate" placeholder="End Date"
									class="form-control input-md ac_district" type="text">
							</div>
						</div>
					</div>

					<div class="row form-group buttons_margin_top ">
						<div align="center">
							<input type="button" id="btn" name="save"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="gstsaleReportBetweenTwoDates()" value="Search" />
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
									<th>Date</th>
									<th>Bill No</th>
									<th>Item Name</th>
									<th>Hsn/Sac No</th>
									<th>Item Rate</th>
									<th>Quantity</th>
									<th>Amount</th>
									<th>CGST& SGST 5% Amount</th>
									<th>CGST& SGST 12% Amount</th>
									<th>CGST& SGST 18% Amount</th>
									<th>CGST& SGST 28% Amount</th>
									<th>IGST 5% Amount</th>
									<th>IGST 12% Amount</th>
									<th>IGST 18% Amount</th>
									<th>IGST 28% Amount</th>
									<th>Total Tax Amount</th>
									<th>Total Bill Amount</th>
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

		<!--  <!------ Barcode Wise ------>
		<div id="BarcodeWise" class="tab-pane ">
			<div class="row"></div>
			<form class="form-horizontal" method="post" action=""
				name="fertiBill">
				<fieldset>
					<div class="row" style="margin-top: 25px;">
						<div class="form-group">
							<div class="col-sm-2 col-sm-offset-2" align="center">
								<label class="control-label">Select Barcode:</label>
							</div>
							<%
						 GoodReceiveHelper helper = new GoodReceiveHelper();
						    List mainCategoryList = helper.getAllMainBarcodeNo();
					    %>
							<div class="col-sm-2">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-hand-right"></i>
									</span> <input list="barcodeId_drop" id="barcodeId"
										class="form-control">
									<datalist id="barcodeId_drop">
										<%
												for(int i=0;i<mainCategoryList.size();i++){
													GoodReceive category = (GoodReceive)mainCategoryList.get(i);
											%>
										<option data-value="<%=category.getBarcodeNo()%>"
											value="<%=category.getBarcodeNo()%>">
											<%
												}
											%>
										
									</datalist>
								</div>
							</div>
						</div>
					</div>

					<div class="row form-group buttons_margin_top ">
						<div align="center">
							<input type="button" id="btn" name="save"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="BarcodeWiseReport()" value="Search" />
						</div>
					</div>
					<table
						class="table table-bordered table-striped table-condensed cf"
						style="border: 2px solid black; border-collapse: collapse;"
						id="example5" class="display" style="width: 1300px;">
						<thead>
							<tr>
								<th>Date</th>
								<th>Item Name</th>
								<th>Category Name</th>
								<th>HsnSac No</th>
								<th>Quantity</th>
								<th>BuyPrice</th>
								<th>SalePrice</th>
								<th>GST</th>
								<th>IGST</th>
								<th>Total</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="9" style="text-align: right">Total Rs:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</fieldset>
			</form>
		</div>
	</div>
</div>
