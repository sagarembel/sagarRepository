<%@page import="com.smt.helper.CreditCustomerBillHelper"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.bean.ItemList"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.bean.userDetaile"%>
<%@page import="com.smt.helper.EmployeeDetailsHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.bean.CategoryDetails"%>
<%@page import="com.smt.bean.BillCopy"%>
<%@page import="com.smt.dao.CarEntryDao"%>
<%@page import="com.smt.dao.OtherBillDao"%>
<%@page import="com.smt.dao.CreditCustBillDao"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
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
<script data-main="scripts/main" src="/SMT/staticContent/js/r.js"></script>
<script src="/SMT/staticContent/js/json2xml.js"></script>
<script src="/SMT/staticContent/js/allReport.js"></script>
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
					<li class="active"><a href="#purchase" data-toggle="tab" class="left-tab-new">Purchase Reports</a></li>
					<li><a href="#purchaseReturn" data-toggle="tab" class="left-tab-new">Purchase Return Reports</a></li>
					<li><a href="#sell" data-toggle="tab" class="left-tab-new">Sale Reports</a></li>
					<li><a href="#miscellaneous" data-toggle="tab" class="left-tab-new">Sale Return	Reports</a></li>
					<li><a href="#stock" data-toggle="tab" class="left-tab-new">Stock Reports</a></li>
					<li><a href="#credit" data-toggle="tab" class="left-tab-new">Credit Customer Sale Reports</a></li>
					<li><a href="#creditSaleReturn" data-toggle="tab" class="left-tab-new">Credit Customer Sale Return Reports</a></li>
				</ul>
			</div>
			<div class="col-xs-9">
				<!-- Tab panes -->
				<div class="tab-content">

					<!---------- 	supplier Payment reports -------------->

					<div class="tab-pane active" id="purchase">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Purchase Reports</h2>
							</div>
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#supplierName"><h4 style="color: blue">Supplier Name Wise</h4></a></li>
							<li><a data-toggle="tab" href="#singleDatePurchase"><h4 style="color: blue">Single Date</h4></a></li>
							<li><a data-toggle="tab" href="#twoDatePurchase"><h4 style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#categoryWise"><h4 style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#productWise"><h4 style="color: blue">Product Wise</h4></a></li>
							<li><a data-toggle="tab" href="#voucherWise"><h4 style="color: blue">Voucher Wise</h4></a></li>
							<li><a data-toggle="tab" href="#supplierBillWise"><h4 style="color: blue">Bill Number Wise</h4></a></li>
							<li><a data-toggle="tab" href="#barcodeNoWise"><h4 style="color: blue">Barcode No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#PurchasegstReturn"><h4 style="color: blue">Gst Return</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!-- Supplier Name Wise -->
							<div id="supplierName" class="tab-pane fade in active">
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
													<input list="sup_drop7" id="supplier7"
														style="width: 250px;" class="form-control">
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
											<div class="col-md-2">
												<div class="input-group">
													<input type="button"
														style="height: 26px; font-size: 15px; padding: 0px;"
														id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="supplierAllPurchase()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="supplierNameWiseTable1" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Date</th>
														<th>Bill No</th>
														<th>Voucher No</th>
														<th>Contact Person</th>
														<th>Supplier Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Item Name</th>
														<th>Style</th>
														<th>HsnSac No</th>
														<th>Quantity</th>
														<th>Roll Size</th>
														<th>Qty (Mtr)</th>
														<th>Buy Price</th>
														<th>Discount<br>(%)</th>
														<th>Discount<br>Amt</th>
														<th>GST<br>(%)</th>
														<th>IGST<br>(%)</th>
														<th>Tax<br>Amount</th>
														<th>Total<br>Amount</th>
														<!-- <th>Total<br>Discount(%)</th>
														<th>Expenses</th> -->
														<th>Gross Amount</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="16" style="text-align: right">Total:</th>
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
											<label class="col-md-2 control-label" for="supplier">Supplier
												Name</label>
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="	glyphicon glyphicon-hand-right"></i>
													</span>
													<%
														SupplierDetailDao sdd = new SupplierDetailDao();
														List sList = sdd.getAllSupplier();
													%>
													<input list="sup_drop" id="supplier"
														onchange="getAllBills();" class="form-control">
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
											<label class="col-md-1 control-label" for="bill_no">
												Bill No </label>
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> No </span> <select
														class="form-control input-md" id='billNo' name="billNo">
													</select>
												</div>
											</div>

											<div class="col-md-2">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="supplierBillWisePurchaseReport()" value="Search" />
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
														<th>Sr No</th>
														<th>Date</th>
														<th>Bill No</th>
														<th>Voucher No</th>
														<th>Contact Person</th>
														<th>Supplier Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Item Name</th>
														<th>HsnSac No</th>
														<th>Quantity</th>
														<th>Roll Size</th>
														<th>Qty In Meter</th>
														<th>Buy Price</th>
														<th>Discount(%)</th>
														<th>Discount<br>Amt</th>
														<th>GST (%)</th>
														<th>IGST (%)</th>
														<th>Tax Amount</th>
														<th>Sale Price</th>
														<th>Total Amount</th>
														<!-- <th>Total Discount(%)</th>
														<th>Expenses</th>
														<th>Expenses Tax</th>
														<th>Total Expenses</th> -->
														<th>Gross Amount</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="15" style="text-align: right">Total:</th>
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

							<!--    Category Wise Purchase -->
							<div id="categoryWise" class="tab-pane">
								<div class="row">
									<div class="col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action=""
									name="supReport">
									<fieldset>
										<div class="form-group">
											<label class="col-md-2 col-md-offset-1" for=""> Select
												Category:<sup>*</sup>
											</label>
											<%
												CategoryHelper ch45 = new CategoryHelper();
												List list45 = ch45.getCategorys();
											%>
											<div class="col-sm-2">
												<input list="catId_drop45" id="catId45" class="form-control">
												<datalist id="catId_drop45">
													<%
														for (int i = 0; i < list45.size(); i++) {
															CategoryDetails item45 = (CategoryDetails) list45.get(i);
													%>
													<option data-value="<%=item45.getCatId()%>" value="<%=item45.getCatName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
											<div class="col-md-2">
												<div class="input-group">
													<input type="button" id="btn45" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="categoryWisePurchaseReport()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="supplierCategoryWise" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Date</th>
														<th>Bill No</th>
														<th>Voucher No</th>
														<th>Supplier Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Item Name</th>
														<th>HsnSac No</th>
														<th>Quantity</th>
														<th>Roll Size</th>
														<th>Qty In Meter</th>
														<th>Buy Price</th>
														<th>Dis<br>(%)</th>
														<th>Discount<br>Amt</th>
														<th>GST (%)</th>
														<th>IGST (%)</th>
														<th>Tax Amount</th>
														<th>Sale Price</th>
														<th>Total Amount</th>
														<!-- <th>Total Discount(%)</th> -->
														<th>Barcode No</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="14" style="text-align: right">Total:</th>
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
							
							
							<!-- PRODUCT WISE PURCHASE REPORT -->
							
							
							<div id="productWise" class="tab-pane">
								<div class="row">
									<div class="col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action=""
									name="supReport">
									<fieldset>
										<div class="form-group">
											<label class="col-md-2 col-md-offset-1 " for=""> Select
												Product:<sup>*</sup>
											</label>
											<%
												GoodReciveDao proIdAndName = new GoodReciveDao();
												List proList = proIdAndName.getProductListGoodReceiveDao();
											%>
											<div class="col-sm-2">
												<input list="productId_drop" id="prodIdDrop" class="form-control">
												<datalist id="productId_drop">
													<%
														for (int i = 0; i < proList.size(); i++)
														{
															ItemList itemList = (ItemList) proList.get(i);
													%>
													<option data-value="<%=itemList.getPkProductId()%>" value="<%=itemList.getPkProductId()%> <%=itemList.getItem_name()%>">
													<%												
														}
													%>													
												</datalist>
											</div>
											<div class="col-md-2">
												<div class="input-group">
													<input type="button" id="btn45" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="productWisePurchaseReport()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="supplierProductWise" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Date</th>
														<th>Bill No</th>
														<th>Voucher No</th>
														<th>Supplier Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Item Name</th>
														<th>HsnSac No</th>
														<th>Quantity</th>
														<th>Roll Size</th>
														<th>Qty In Meter</th>
														<th>Buy Price</th>
														<th>Discount(%)</th>
														<th>Discount<br>Amt</th>
														<th>GST (%)</th>
														<th>IGST (%)</th>
														<th>Tax Amount</th>
														<th>Sale Price</th>
														<th>Total Amount</th>
														<!-- <th>Total Discount(%)</th> -->
														<th>Barcode No</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="14" style="text-align: right">Total:</th>
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

			<!----------------------------------- VOUCHER NUMBER WISE ------------------------------------->
							
							<div id="voucherWise" class="tab-pane ">
								<div class="row">
									<div class="col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="" name="voucherNoWise">
									<fieldset>
										<div class="form-group">
											<label class="col-md-2 col-md-offset-1" for="voucherDrop">Voucher No:<sup>*</sup></label>
											<%
												GoodReciveDao grd12 = new GoodReciveDao();
												List vNoList = grd12.getAllVoucherNumber();
											%>
											<div class="col-sm-2">
												<input list="voucherNo_drop" id="voucherDrop" class="form-control">
												<datalist id="voucherNo_drop">
													<%
														for (int i = 0; i < vNoList.size(); i++)
														{
															ItemList itemVList = (ItemList) vNoList.get(i);
													%>
													<option data-value="<%=itemVList.getVoucherNo()%>" value="<%=itemVList.getVoucherNo()%> <%=itemVList.getSuppName()%>">
													<%
														}
													%>
													
												</datalist>
											</div>
												
											<div class="col-md-2">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="VoucherNoWisePurchaseReport()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="voucherNoWiseData" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Date</th>
														<th>Bill No</th>
														<th>Contact Person</th>
														<th>Supplier Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Item Name</th>
														<th>HsnSac No</th>
														<th>Quantity</th>
														<th>Roll Size</th>
														<th>Qty In Meter</th>
														<th>Buy Price</th>
														<th>Discount(%)</th>
														<th>Discount<br>Amt</th>
														<th>GST (%)</th>
														<th>IGST (%)</th>
														<th>Tax Amount</th>
														<th>Sale Price</th>
														<th>Total Amount</th>
														<!-- <th>Total Discount(%)</th>
														<th>Expenses</th>
														<th>Expenses Tax</th>
														<th>Total Expenses</th> -->
														<th>Gross Amount</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="14" style="text-align: right">Total:</th>
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

							<!------ 	Barcode No wise Purchase  ----->
							
							<div id="barcodeNoWise" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="" name="supReport1">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-3 control-label" for="startDate">
												Enter Barcode No:<sup>*</sup>
											</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-barcode"></i>
													</span> <input type="text" id="barcodeNoOurchase"
														placeholder="Barcode No" class="form-control input-md"
														type="text">
												</div>
											</div>

											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="barcodeWisePurchaseReport()" value="Search" />
												</div>
											</div>
										</div>

										<table class="table table-bordered table-striped table-condensed cf"
											id="barcodeWisePurchaseReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<!-- <th>Total Discount(%)</th> -->
													<th>Barcode No</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="14" style="text-align: right">Total:</th>
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
									</fieldset>
								</form>
							</div>

							<!------ 	Single Date Purchase  ----->
							<div id="singleDatePurchase" class="tab-pane fade">
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
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="purDate" placeholder="Start Date"
														class="form-control input-md" type="text">
												</div>
											</div>

											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="singleDatePurchase45()" value="Search" />
												</div>
											</div>
										</div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="singleDatePurchase50" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Contact Person</th>
													<th>Supplier Name</th>
													<th>Category Name</th>
													<th>Sub Category Name</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<!--<th>Total Discount(%)</th>
													<th>Expenses</th>
													<th>Expenses Tax</th>
													<th>Total Expenses</th> -->
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="15" style="text-align: right">Total:</th>
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
									</fieldset>
								</form>
							</div>

							<!------ 	Between Two Dates Purchase ----->
							<div id="twoDatePurchase" class="tab-pane fade">
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
												Start Date:</label>
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pFisDate" placeholder="Start Date"
														class="form-control input-md" type="text">
												</div>
											</div>

											<label class="col-md-1 control-label" for="endDate">End
												Date:</label>
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pEndDate" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>

											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="twoDatePurchase45()" value="Search" />
												</div>
											</div>
										</div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="twoDatePurchase50" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Contact Person</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<!-- <th>Total Discount(%)</th>
													<th>Expenses</th>
													<th>Expenses Tax</th>
													<th>Total Expenses</th> -->
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="15" style="text-align: right">Total:</th>
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
									</fieldset>
								</form>
							</div>

							<!--  purchase gst return report -->

							<div id="PurchasegstReturn" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="startDatepgst"
														placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="village">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="lastDatepgst"
														placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>

											<div class="input-group">
												<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="purchasegstReturn(); gstIgstReturnAmt()" value="Search" />
											</div>


										</div>

										<!-- 		<div class="row form-group">
										<div class="col-md-2"
											style="margin-left: 37%; padding-bottom: 8px;">
											
										</div>

									</div> -->


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="twoDateGstReturnPurchase" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>GST Taxable</th>
														<th>IGST Taxable</th>
														<th>Taxable Value</th>
														<th>Central Tax Amount</th>
														<th>State Tax Amount</th>
														<th>Total GST Amount</th>
														<th>Total IGST Amount</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="2" style="text-align: right">Total:</th>
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

						</div>
					</div>
					
					
										<!---------- PURCHASE RETURN REPORT ------->

					<div class="tab-pane" id="purchaseReturn">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Purchase Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#purchaseReturnSingleDate"><h4
										style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#purchaseReturnRangeWise"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#purchaseReturnBillNoWise"><h4
										style="color: blue">Bill No Wise</h4></a></li>
							</ul>

						<div class="tab-content" style="float: left">

							<!--  Miscellaneos Sale for single date -->
							<div id="purchaseReturnSingleDate" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-3 control-label" for=""> Select
												Date:<sup>*</sup>
											</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pRDate" placeholder="Select Date"
														class="form-control input-md" type="text">
												</div>
											</div>
											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="purchaseReturnSingleDate()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="purchaseReturnSingleDateReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Purchase<br>Return Date</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<!-- <th>RollSize</th> -->
														<th>Buy Price</th>
														<th>Discount %</th>
														<th>Discount<br>Amount</th>
														<th>Tax %</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
														<!-- <th></th> -->
													</tr> 
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!---------- PURCHASE RETURN REPORT between Two dates ------->

							<div id="purchaseReturnRangeWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-1 col-sm-offset-1 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pRFisDate" placeholder="Start Date"
														class="form-control input-md" type="text">
												</div>
											</div>

											<label class="col-md-1 control-label" for="endDate">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pREndDate" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>

											<div class="col-md-2">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="purchaseReturnTwoDate()" value="Search" />
												</div>
											</div>
										</div>

										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="purchaseReturnRangeReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Purchase<br>Return Date</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<!-- <th>RollSize</th> -->
														<th>Buy Price</th>
														<th>Discount %</th>
														<th>Discount Amount</th>
														<th>Tax %</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
														<!-- <th></th> -->
													</tr> 
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-- Bill No wise PURCHASE RETURN REPORT ------->
							
							
							<div id="purchaseReturnBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="row form-group">
												<!-- <label class="col-md-3 control-label" for="">
													Bill No:<sup>*</sup>
												</label> -->
												
												
										<div class="row form-group">
											<label class="col-md-2 col-sm-offset-1 control-label" for="supplierpR">Supplier	Name</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="	glyphicon glyphicon-hand-right"></i>
													</span>
													<%
														SupplierDetailDao sdd22 = new SupplierDetailDao();
														List sList2 = sdd22.getAllSupplier();
													%>
													<input list="sup_drop" id="supplierpR" onchange="getAllBillsforPurchaseReturn();" class="form-control">
													<datalist id="sup_drop2">
														<%
															for (int i = 0; i < sList2.size(); i++) {
																SupplierDetail sup2 = (SupplierDetail) sList2.get(i);
														%>
														<option data-value="<%=sup2.getSupplierId()%>"
															value="<%=sup2.getSupplierName()%>">
															<%
																}
															%>														
													</datalist>
												</div>
											</div>
											<label class="col-md-1 control-label" for="pRBillNo">
												Bill No </label>
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> No </span> <select
														class="form-control input-md" id='pRBillNo' name="pRBillNo">
													</select>
												</div>
											</div>
											
											<div class="col-md-2">
													<div class="input-group">
														<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="purchaseReturnBillNoWise()" value="Search" />
													</div>
												</div>
										</div>
												
												
												<!-- <div class="col-md-3">
													<div class="input-group">
														<span class="input-group-addon"> <i
															class="glyphicon glyphicon-barcode"></i>
														</span> <input type="text" id="pRBillNo"
															placeholder="Bill No" class="form-control input-md"
															type="text">
													</div>
												</div> -->
												
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="billNoWisePurRetReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Purchase<br>Return Date</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<!-- <th>RollSize</th> -->
														<th>Buy Price</th>
														<th>Discount %</th>
														<th>Discount Amount</th>
														<th>Tax %</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
													 	<!-- <th></th> -->
													</tr> 
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
					
					
					<!---------   Sell Reports--------->

					<div class="tab-pane" id="sell">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Sale Reports</h2>
							</div>
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"	href="#categorySaleWise"><h4 style="color: blue">Category wise</h4></a></li>
							<li><a data-toggle="tab" href="#productSaleWise"><h4 style="color: blue">Product wise</h4></a></li>
							<li><a data-toggle="tab" href="#singleDateSale"><h4	style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#twoDateSale"><h4 style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#userWise"><h4 style="color: blue">User Wise</h4></a></li>
							<li><a data-toggle="tab" href="#BillWise"><h4 style="color: blue">Bill Wise</h4></a></li>
							<li><a data-toggle="tab" href="#caReturns"><h4 style="color: blue">GST Return</h4></a></li>
							<li><a data-toggle="tab" href="#paymentModeWiseReport"><h4 style="color: blue">Payment Mode<br>Wise</h4></a></li>
							<!-- <li><a data-toggle="tab" href="#paymentModeRangeWiseReport"><h4 style="color: blue">Payment Mode<br>Range Wise</h4></a></li> -->
						</ul>

						<div class="tab-content" style="float: left">

							<!-- 	CATEGORY Name wise -->
							<div id="categorySaleWise" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action=""
									name="supReportBill">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												Category:<sup>*</sup>
											</label>
											<%
												CategoryHelper ch = new CategoryHelper();
												List list = ch.getCategorys();
											%>
											<div class="col-sm-3">
												<input list="catId_drop" id="catId" class="form-control">
												<datalist id="catId_drop">
													<%
														for (int i = 0; i < list.size(); i++) {
															CategoryDetails item = (CategoryDetails) list.get(i);
													%>
													<option data-value="<%=item.getCatId()%>"
														value="<%=item.getCatName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="categorySaleWise()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="saleCategoryWise" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Item Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Quantity</th>
														<th>Buy Price<br>Excl. Tax</th>
														<th>Sale Price</th>
														<th>GST<br>%</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount<br>%</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Amount</th>
														<th>Date</th>
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
							
							
							<!-- PRODUCT WISE SALE REPORT -->
							
							
							<!-- 	Customer Name wise -->
							<div id="productSaleWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action=""
									name="supReportBill">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												Product:<sup>*</sup>
											</label>
											<%
												ProductDetailHelper pdh = new ProductDetailHelper();
												List pList = pdh.getProductListHelper();
											%>
											<div class="col-sm-3">
												<input list="productId_dropTinv" id="productIdTinv" class="form-control">
												<datalist id="productId_dropTinv">
													<%
														for (int i = 0; i < pList.size(); i++) {
															ItemList itemL = (ItemList) pList.get(i);
													%>
													<option data-value="<%=itemL.getPkProductId()%>" value="<%=itemL.getItem_name()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="productSaleWise()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="saleProductWise" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Item Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Quantity</th>
														<th>Buy Price<br>Excl. Tax</th>
														<th>Sale Price</th>
														<th>GST<br>%</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount<br>%</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Amount</th>
														<th>Date</th>
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
							
							
							
							

							<!--    for single date sale -->
							<div id="singleDateSale" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-3 control-label" for=""> Enter
												Date:<sup>*</sup>
											</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="fDate1" placeholder="Select Date"
														class="form-control input-md" type="text">
												</div>
											</div>
											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="singleDateSaleReport()" value="Search" />
												</div>
											</div>
										</div>

										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="saleSingleDate" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Item Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Quantity</th>
														<th>Buy Price<br>Excl. Tax</th>
														<th>SalePrice</th>
													  	<th>GST<br>%</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount<br>%</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Amount</th>
														<!-- <th>Gross Amount</th> -->
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

							<!------ 	Between Two Dates Sale  ----->
							<div id="twoDateSale" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="fisDate" placeholder="Start Date"
														class="form-control input-md" type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="village">End
												Date:</label>
											<div class="col-md-2">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="endDate" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>

											<div class="col-md-2 col-md-offset-1">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="twoDateSaleReport()" value="Search" />
												</div>
											</div>
										</div>

										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="saleTwoDate" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Item Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Quantity</th>
														<th>Buy Price<br>Excl. Tax</th>
														<th>SalePrice</th>
														<th>GST<br>%</th>
														<th>Sale Price<br>Excl. Tax</th>
														<th>Discount<br>%</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Amount</th>
														<th>Date</th>
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

							<!-- User Wise Report -->

							<div id="userWise" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for=""> User
												Type:<sup>*</sup>
											</label>
											<%
												EmployeeDetailsHelper edh = new EmployeeDetailsHelper();
												List edhlist = edh.getUserTypes();
											%>
											<div class="col-sm-3">
												<input list="utype_drop" id="utype" class="form-control"
													onchange="getAlluser();" placeholder="Select User Type">
												<datalist id="utype_drop">
													<%
														for (int i = 0; i < edhlist.size(); i++) {
															userDetaile ud = (userDetaile) edhlist.get(i);
													%>
													<option data-value="<%=ud.getPkUserId()%>"
														value="<%=ud.getTypeId()%>">
														<%
															}
														%>
													
												</datalist>
											</div>

											<label class="col-md-2 control-label" for="userName123">User Name</label>
											<div class="col-md-3">
												<select class="form-control input-md" id="userName123" name="userName123"></select>
											</div>

										</div>

										<div class="row form-group">
											<label class="col-md-2 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="startDate" placeholder="Start Date"
														class="form-control input-md" type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="village">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="lastDate" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>


										</div>
										<div class="row form-group">
											<div class="col-md-2"
												style="margin-left: 37%; padding-bottom: 8px;">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="twoDate_UserSaleReport()" value="Search" />
												</div>
											</div>

										</div>


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="saleTwoDate_userWise" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Item Name</th>
														<th>Category</th>
														<th>Sub Category</th>
														<th>Quantity</th>
														<th>SalePrice</th>
														<th>GST<br>%</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount<br>%</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Amount</th>
														<th>Date</th>
													</tr>
												</thead>
												<tbody id="tBId">
												</tbody>
												<tfoot>
													<tr>
														<th colspan="6" style="text-align: right">Total:</th>
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

							<!-- Bill No Wise And Between Two Date Report -->

							<div id="BillWise" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="startDate1"
														placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="village">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="lastDate1" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>


										</div>

										<div class="row form-group">
											<div class="col-md-2"
												style="margin-left: 37%; padding-bottom: 8px;">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="twoDateAndBillNo()" value="Search" />
												</div>
											</div>

										</div>


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="saleTwoDateBillNo" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Contact</th>
														<th>Amount</th>
														<th>Date</th>
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



							<!-- GST Return Reports  -->
							<div id="caReturns" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="startDategst"
														placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="village">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="lastDategst" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>


										</div>

										<div class="row form-group">
											<div class="col-md-2"
												style="margin-left: 37%; padding-bottom: 8px;">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="gstReturn()" value="Search" />
												</div>
											</div>

										</div>


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="twoDateGstReturn" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sales Taxable</th>
														<th>Taxable Value</th>
														<th>Central Tax Amount</th>
														<th>State Tax Amount</th>
														<th>Total Tax Amount</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="1" style="text-align: right">Total:</th>
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
							
							<!-- payment Mode Wise Reports  -->
							<div id="paymentModeWiseReport" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="pmDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pmDate" placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="pmDate">
												End Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pmDate22" placeholder="End Date" class="form-control input-md"
														type="text">
												</div>
											</div>
										</div>
										
										
										
										<div class="row form-group">
											

											<label class="col-md-2 control-label" for="paymentMode">Payment Mode:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span>
											<select class="form-control" id="paymentMode">
													<option value="cash">Cash</option>
													<option value="card">Card</option>
													<option value="cashAndCard">Cash And Card</option>
											</select>	
												</div>
											</div>
											
												<div class="row form-group">
											<div class="col-md-1 col-sm-offset-1">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="paymentModeWiseReport()" value="Search" />
												</div>
											</div>
										</div>
										</div>									


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="paymentModeWiseReportTable" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Cash Amount</th>
														<th>Card Amount</th>
														<th>Credit Amount</th>
														<th>Total</th>
														<th>Payment Mode</th>			
														<th>Date</th>														
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="2" style="text-align: right">Total:</th>
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
							
							
						







						</div>
					</div>

					<!----- 	Currnt Stock reports ------>
					<div class="tab-pane" id="stock">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Stock Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#categoryWiseStock"><h4 style="color: blue">Category Wise Stock</h4></a></li>
							<li><a data-toggle="tab" href="#currentStock" onclick="currentStock()"><h4 style="color: blue">Current Stock</h4></a></li>
							<li><a data-toggle="tab" href="#barcodeNoWiseStock"><h4 style="color: blue">Barcode Wise Stock</h4></a></li>
							<li><a data-toggle="tab" href="#allWayReport" onclick="allWayReport()"><h4 style="color: blue">All way Reports</h4></a></li>
						</ul>
						<div class="tab-content" style="float: left">

							<!--    for Current Stock -->
							<div id="currentStock" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="table-responsive">
												<table
													class="table table-bordered table-striped table-condensed cf"
													id="currStock" class="display"
													style="border: 2px solid black; border-collapse: collapse;">
													<thead>
														<tr>
															<th>Barcode No.</th>
															<th>Category Name</th>
															<th>Sub Category<br>Name</th>
															<th>Item Name</th>
															<th>Size</th>
															<th>Roll Size</th>
															<th>Quantity</th>
															<!-- <th>Update Date</th> -->	
														</tr>
													</thead>
												</table>
											</div>
										</div>
									</fieldset>
								</form>
							</div>

							<!-------- 	Category Wise Stock	 -------->
							<div id="categoryWiseStock" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>

								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="form-group">
												<div class="col-sm-2 col-sm-offset-1" align="center">
													<label class="control-label"
														style="font-family: Times New Roman;">Category
														Name:</label>
												</div>
												<%
													CategoryHelper helper = new CategoryHelper();
													List mainCategoryList = helper.getAllMainCategories();
												%>
												<div class="col-sm-3">
													<div class="input-group">
														<span class="input-group-addon"> <i
															class="glyphicon glyphicon-user"></i>
														</span> <input list="catId_drop123" id="catId123"
															class="form-control">
														<datalist id="catId_drop123">
															<%
																for (int i = 0; i < mainCategoryList.size(); i++) {
																	Category category = (Category) mainCategoryList.get(i);
															%>
															<option data-value="<%=category.getPkCategoryId()%>"
																value="<%=category.getCategoryName()%>">
																<%
																	}
																%>
															
														</datalist>
													</div>
												</div>

												<div class="col-md-3 ">
													<div class="input-group">
														<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="getCategoryWiseStock();" value="Search" />
													</div>
												</div>
											</div>
										</div>
										<table id="catWiseStock"
											class="table table-bordered table-striped table-condensed cf"
											class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Available Quantity</th>
													<th>Update Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
										</table>
									</fieldset>
								</form>
							</div>

							<!--    Barcode Wise Current Stock -->
							<div id="barcodeNoWiseStock" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="row form-group">
												<label class="col-md-3 control-label" for="">
													Barcode No:<sup>*</sup>
												</label>
												<div class="col-md-3">
													<div class="input-group">
														<span class="input-group-addon"> <i
															class="glyphicon glyphicon-barcode"></i>
														</span> <input type="text" id="barcode" placeholder="Barcode No"
															class="form-control input-md" type="text">
													</div>
												</div>
												<div class="col-md-3">
													<div class="input-group">
														<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="barcodewisestock()" value="Search" />
													</div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="table-responsive">
												<table
													class="table table-bordered table-striped table-condensed cf"
													id="barcodeWiseCurrentStock" class="display"
													style="border: 2px solid black; border-collapse: collapse;">
													<thead>
														<tr>
															<th>Category Name</th>
															<th>Item Name</th>
															<th>Available Quantity</th>
															<th>Buy Price</th>
															<th>Tax (%)</th>
															<th>Bill No</th>
															<th>Barcode No</th>
														</tr>
													</thead>
												</table>
											</div>
										</div>
									</fieldset>
								</form>
							</div>

							<!-- All way Reports -->

							<div id="allWayReport" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="table table-responsive" style="overflow: hidden">


												<table
													class="table table-bordered table-striped table-condensed cf"
													id="currStock1" class="display"
													style="border: 2px solid black; border-collapse: collapse;">

													<thead style="background-color: orange;">
														<tr>
															<th>Barcode No</th>
															<th>Item Name</th>
															<th>Category</th>
															<th>Quantity</th>
															<th>Rollsize</th>
															<th>Quantity<br>In<br>Meter</th>
															<th>Size</th>
															<th>Color</th>
														</tr>
													</thead>



												</table>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>

					<!---------- Miscellaneous Bill Reports ------->

					<div class="tab-pane" id="miscellaneous">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Sale Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#SingleDate"><h4
										style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousTwoDate"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousCategoryWise"><h4
										style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousBillNoWise"><h4
										style="color: blue">Bill No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousBarcodeNoWise"><h4
										style="color: blue">Barcode No Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!--  Miscellaneos Sale for single date -->
							<!-- <div id="miscellaneousSingleDate" class="tab-pane fade in active"> -->
							<div id="SingleDate" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-3 control-label" for=""> Select
												Date:<sup>*</sup>
											</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="msDate" placeholder="Select Date"
														class="form-control input-md" type="text">
												</div>
											</div>
											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="miscellaneousSingleDate()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="miscellaneousSingleDateReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>SalePrice</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
													<!-- <th></th>-->
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-------Miscellaneos Sale between Two dates ------->

							<div id="miscellaneousTwoDate" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-1 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="msfisDate" placeholder="Start Date"
														class="form-control input-md" type="text">
												</div>
											</div>

											<label class="col-md-1 control-label" for="endDate">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="msendDate" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>

											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="miscellaneousTwoDate()" value="Search" />
												</div>
											</div>
										</div>

										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="miscellaneousTwoDateReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<th>Return Date</th>
													<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-- 	Category Name wise Miscellaneos Sale Reports -->
							<div id="miscellaneousCategoryWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												Category:<sup>*</sup>
											</label>
											<%
												CategoryHelper ch2 = new CategoryHelper();
												List lis = ch2.getCategorys();
											%>
											<div class="col-sm-3">
												<input list="mscatId_drop" id="mscatId" class="form-control">
												<datalist id="mscatId_drop">
													<%
														for (int i = 0; i < lis.size(); i++) {
															CategoryDetails item2 = (CategoryDetails) lis.get(i);
													%>
													<option data-value="<%=item2.getCatId()%>"
														value="<%=item2.getCatName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="miscellaneousSaleWiseCustomer()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="miscellaneousSaleWiseCustomerReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<th>Return Date</th>
													<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-- 	Bill No wise Miscellaneos Sale Reports -->
							<div id="miscellaneousBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												BillNo:<sup>*</sup>
											</label>
											<%
												OtherBillDao ms1 = new OtherBillDao();
												List lisms = ms1.getBillNo();
											%>
											<div class="col-sm-3">
												<input list="msBillNocust_id" id="msBillNocust"
													class="form-control">
												<datalist id="msBillNocust_id">
													<%
														for (int i = 0; i < lisms.size(); i++) {
															BillCopy billList1 = (BillCopy) lisms.get(i);
													%>
													<option data-value="<%=billList1.getBillNo()%>"
														value="<%=billList1.getBillNo()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="billnowiseMiscellaneoussell()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="billnowiseMiscellaneous" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<th>Return Date</th>
													<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
													<!--<th></th>-->
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-- Barcode No wise Miscellaneos Sale Reports -->
							<div id="miscellaneousBarcodeNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="row form-group">
												<label class="col-md-3 control-label" for="">
													Barcode No:<sup>*</sup>
												</label>
												<div class="col-md-3">
													<div class="input-group">
														<span class="input-group-addon"> <i
															class="glyphicon glyphicon-barcode"></i>
														</span> <input type="text" id="barcodeMiscellaneous"
															placeholder="Barcode No" class="form-control input-md"
															type="text">
													</div>
												</div>
												<div class="col-md-3">
													<div class="input-group">
														<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="barcodenowiseMiscellaneoussell()" value="Search" />
													</div>
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="barcodewiseMiscellaneous" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>SalePrice</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<th>Return Date</th>
													<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>

					<!---------- Credit Customer Bill Reports ------->

					<div class="tab-pane" id="credit">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Credit Customer Sale Reports</h2>
							</div>
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#creditSingleDate"><h4 style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#creditTwoDate"><h4 style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#creditCategoryWise"><h4 style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#creditProductWise"><h4 style="color: blue">Product Wise</h4></a></li>
							<li><a data-toggle="tab" href="#creditBillNoWise"><h4 style="color: blue">Bill No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#creditBarcodeNoWise"><h4 style="color: blue">Barcode No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#paymentModeWiseReportForCC"><h4 style="color: blue">Payment Mode Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!--  Credit Customer Sale for single date -->

							<div id="creditSingleDate" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-3 control-label" for=""> Select
												Date:<sup>*</sup>
											</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="csDate" placeholder="Select Date"
														class="form-control input-md" type="text">
												</div>
											</div>
											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="creditSingleDate()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="creditSingleDateReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Quantity</th>
														<th>Sale Price</th>
														<th>Tax (%)</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount (%)</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Price</th>
														<!-- <th>Tax (%)</th>
														<th>Tax Amount</th> 
														<th>Gross Total</th>
														-->
														
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
														<th></th>
														<th></th>
														<!-- <th></th> -->
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-------Credit Customer Sale between Two dates ------->

							<div id="creditTwoDate" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-1 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="csfisDate" placeholder="Start Date"
														class="form-control input-md" type="text">
												</div>
											</div>

											<label class="col-md-1 control-label" for="endDate">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="csendDate" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>

											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="creditTwoDate()" value="Search" />
												</div>
											</div>
										</div>

										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="creditTwoDateReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Barcode No</th>
														<th>CategoryName</th>
														<th>Item Name</th>
														<th>Quantity</th>
														<th>SalePrice</th>
														<th>Tax (%)</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount (%)</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Price</th>
														<th>Date</th>
														
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

							<!-- 	Category Name wise Credit Customer Sale Reports -->
							<div id="creditCategoryWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												Category:<sup>*</sup>
											</label>
											<%
												CategoryHelper ch3 = new CategoryHelper();
												List lis3 = ch3.getCategorys();
											%>
											<div class="col-sm-3">
												<input list="cscatId_drop" id="cscatId" class="form-control">
												<datalist id="cscatId_drop">
													<%
														for (int i = 0; i < lis3.size(); i++) {
															CategoryDetails item3 = (CategoryDetails) lis3.get(i);
													%>
													<option data-value="<%=item3.getCatId()%>"
														value="<%=item3.getCatName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>

											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="creditSaleWiseCustomer()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="creditSaleWiseCustomerReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Quantity</th>
														<th>Sale Price</th>
														<th>Tax (%)</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount (%)</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Price</th>
														<th>Sale Date</th>
														
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
							
							
			<!----------------------------------------- 	PAYMENT MODE WISE Credit Customer Sale Reports --------------------------------------------------->
							
							<div id="paymentModeWiseReportForCC" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="startDateForCC">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="startDateForCC" placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="endDateForCC">
												End Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="endDateForCC" placeholder="End Date" class="form-control input-md"
														type="text">
												</div>
											</div>
										</div>
										
										<div class="row form-group">
											<label class="col-md-2 control-label" for="paymentModeForCC">Payment Mode:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span>
											<select class="form-control" id="paymentModeForCC">
													<option value="cash">Cash</option>
													<option value="card">Card</option>
													<option value="cashAndCard">Cash And Card</option>
											</select>	
												</div>
											</div>
											
												<div class="row form-group">
											<div class="col-md-1 col-sm-offset-1">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="paymentModeWiseReportForCC()" value="Search" />
												</div>
											</div>
										</div>
										</div>									


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="paymentModeWiseReportTableForCC" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Cash Amount</th>
														<th>Card Amount</th>
														<th>Credit Amount</th>
														<th>Total</th>
														<th>Payment Mode</th>			
														<th>Date</th>														
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="2" style="text-align: right">Total:</th>
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
							
							
							
			<!----------------------------------------- 	PRODUCT Name wise Credit Customer Sale Reports --------------------------------------------------->
	
							<div id="creditProductWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select Product:<sup>*</sup>
											</label>
											<%
												CreditCustomerBillHelper ccbh = new CreditCustomerBillHelper();
												List ccbhList = ccbh.getCcbProductListHelper();
											%>
											<div class="col-sm-3">
												<input list="csproductId_drop" id="csproductId" class="form-control">
												<datalist id="csproductId_drop">
													<%
														for (int i = 0; i < ccbhList.size(); i++)
														{
															ItemList ccbProductList = (ItemList) ccbhList.get(i);
													%>
													<option data-value="<%=ccbProductList.getPkProductId()%>" value="<%=ccbProductList.getItem_name()%>">
													<%
														}
													%>													
												</datalist>
											</div>

											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="prtoductWiserCreditCustomerSaleReport()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="creditSaleProductWiseReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Quantity</th>
														<th>Sale Price</th>
														<th>Tax (%)</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount (%)</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Price</th>
														<th>Sale Date</th>
														
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
	<!-- ==============================================- 	Bill No wise Credit Customer Sale Reports =============================================================-->
							<div id="creditBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												BillNo:<sup>*</sup>
											</label>
											<%
												CreditCustBillDao cs1 = new CreditCustBillDao();
												List lrst4 = cs1.getBillNo();
											%>
											<div class="col-sm-3">
												<input list="csBillNocust_id" id="csBillNocust"
													class="form-control">
												<datalist id="csBillNocust_id">
													<%
														for (int i = 0; i < lrst4.size(); i++) {
															BillCopy bli = (BillCopy) lrst4.get(i);
													%>
													<option data-value="<%=bli.getBillNo()%>"
														value="<%=bli.getBillNo()%>    <%=bli.getCustName()%> <%=bli.getLastName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>

											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="billnowiseCreditsell()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="billnowiseCredit" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Quantity</th>
														<th>Sale Price</th>
														<th>Tax (%)</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount (%)</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Price</th>
														<th>Sale Date</th>
														
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

		<!------------------------------------------------------ Barcode No wise Credit Customer Sale Reports -------------------------------------------------------------->
							
							<div id="creditBarcodeNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="row form-group">
												<label class="col-md-3 control-label" for="">
													Barcode No:<sup>*</sup>
												</label>
												<div class="col-md-3">
													<div class="input-group">
														<span class="input-group-addon"> <i
															class="glyphicon glyphicon-barcode"></i>
														</span> <input type="text" id="barcodeCredit"
															placeholder="Barcode No" class="form-control input-md"
															type="text">
													</div>
												</div>
												<div class="col-md-3">
													<div class="input-group">
														<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="barcodenowiseCredit()" value="Search" />
													</div>
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="barcodewiseCredit" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Quantity</th>
														<th>Sale Price</th>
														<th>Tax (%)</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount (%)</th>
														<th>Discount<br>Amount</th>
														<th>Tax Amount<br>After Discount</th>
														<th>Total Price</th>
														<th>Date</th>

														
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
							
							
	<!----------------------------------------------------------------- payment Mode Wise Reports FOR CC ------------------------------------------------------>


	
							<div id="paymentModeWiseReportForCC" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="pmDateForCC">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pmDateForCC" placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="pmDate22ForCC">
												End Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pmDate22ForCC" placeholder="End Date" class="form-control input-md"
														type="text">
												</div>
											</div>
										</div>
																				
										<div class="row form-group">
											

											<label class="col-md-2 control-label" for="paymentMode">Payment Mode:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span>
											<select class="form-control" id="paymentModeForCC">
													<option value="cash">Cash</option>
													<option value="card">Card</option>
													<option value="cashAndCard">Cash And Card</option>
											</select>	
												</div>
											</div>
											
												<div class="row form-group">
											<div class="col-md-1 col-sm-offset-1">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="paymentModeRangeWiseReport()" value="Search" />
												</div>
											</div>
										</div>
										</div>									


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="paymentModeWiseReportTable" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Cash Amount</th>
														<th>Card Amount</th>
														<th>Credit Amount</th>
														<th>Total</th>
														<th>Payment Mode</th>			
														<th>Date</th>														
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="2" style="text-align: right">Total:</th>
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
							
							
							
							
							
							
							
							
							
						</div>
					</div>


					<!--  Credit Customer Sale Return Report -->

					<div class="tab-pane" id="creditSaleReturn">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Credit Customer Sale Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"
								href="#SingleDateCCSR"><h4 style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRTwoDate"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRCategoryWise"><h4
										style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRBillNoWise"><h4
										style="color: blue">Bill No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRBarcodeNoWise"><h4
										style="color: blue">Barcode No Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!--  Credit customer Sale Return Report for single date -->
							<div id="SingleDateCCSR" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-3 control-label" for=""> Select
												Date:<sup>*</sup>
											</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="crdDate" placeholder="Select Date"
														class="form-control input-md" type="text">
												</div>
											</div>
											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="CSRSingleDate()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="CSR1SingleDateReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

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
													<!-- <th></th> -->
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-------Credit customer Sale Return Report between Two dates ------->

							<div id="CCSRTwoDate" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-1 control-label" for="startDate">
												Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="csrfisDate"
														placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-1 control-label" for="endDate">End
												Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="csrendDate" placeholder="End Date"
														class="form-control input-md ac_district" type="text">
												</div>
											</div>

											<div class="col-md-3">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="CSRTwoDate()" value="Search" />
												</div>
											</div>
										</div>

										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="CSR2TwoDateReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
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

							<!-- 	Category Name wise Credit customer Sale return Reports -->
							<div id="CCSRCategoryWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												Category:<sup>*</sup>
											</label>
											<%
												CategoryHelper chsaleReturn = new CategoryHelper();
												List lisaleReturn = chsaleReturn.getCategorys();
											%>
											<div class="col-sm-3">
												<input list="csrcatId_drop" id="csrcatId"
													class="form-control">
												<datalist id="csrcatId_drop">
													<%
														for (int i = 0; i < lisaleReturn.size(); i++) {
															CategoryDetails item2 = (CategoryDetails) lisaleReturn.get(i);
													%>
													<option data-value="<%=item2.getCatId()%>"
														value="<%=item2.getCatName()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="CSRSaleWiseCustomer()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="CSR3SaleWiseCustomerReport" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<th>Return Date</th>
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
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-- 	Bill No wise Credit customer Sale Return Reports -->
							<div id="CCSRBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="form-group">
											<label class="col-md-3 control-label" for=""> Select
												BillNo:<sup>*</sup>
											</label>
											<%
												CreditCustBillDao ms12 = new CreditCustBillDao();
												List lisms2 = ms12.getBillNo();
											%>
											<div class="col-sm-3">
												<input list="csrBillNocust_id" id="csrBillNocust"
													class="form-control">
												<datalist id="csrBillNocust_id">
													<%
														for (int i = 0; i < lisms2.size(); i++) {
															BillCopy billList1 = (BillCopy) lisms2.get(i);
													%>
													<option data-value="<%=billList1.getBillNo()%>"
														value="<%=billList1.getBillNo()%>">
														<%
															}
														%>
													
												</datalist>
											</div>
											<div class="col-md-3 ">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="billnowiseCCSR()" value="Search" />
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="billnowiseCCSR" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<th>Return Date</th>

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
														<th></th>
														<th></th>		
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>

							<!-- Barcode No wise Credot Customer Sale Return Reports -->
							<div id="CCSRBarcodeNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="row form-group">
												<label class="col-md-3 control-label" for="">
													Barcode No:<sup>*</sup>
												</label>
												<div class="col-md-3">
													<div class="input-group">
														<span class="input-group-addon"> <i
															class="glyphicon glyphicon-barcode"></i>
														</span> <input type="text" id="barcodecsr"
															placeholder="Barcode No" class="form-control input-md"
															type="text">
													</div>
												</div>
												<div class="col-md-3">
													<div class="input-group">
														<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="barcodenowiseCSR()" value="Search" />
													</div>
												</div>
											</div>
										</div>
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="barcodewiseCCSR" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
												<thead>
													<tr>
														<th>Sr No</th>
														<th>Bill No</th>
														<th>Barcode No</th>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Return Quantity</th>
														<th>Sale Price</th>
														<th>GST</th>
														<th>Sale Price<br>Without Tax</th>
														<th>Discount</th>
														<th>Tax Amount</th>
														<th>Return Amount</th>
														<th>Return Date</th>

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