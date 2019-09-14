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
					<li class="active"><a href="#sell" data-toggle="tab" class="left-tab-new">Sale Reports</a></li>
					<li><a href="#miscellaneous" data-toggle="tab" class="left-tab-new">Sale Return Reports</a></li>
					<li><a href="#stock" data-toggle="tab" class="left-tab-new">Stock Reports</a></li>
				</ul>
			</div>
			<div class="col-xs-9">
				<!-- Tab panes -->
				<div class="tab-content">
					
					<!---------   Sell Reports--------->
					
									<div class="tab-pane active" id="sell">
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

							<!-- 	Customer Name wise -->
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
													<option data-value="<%=itemL.getPkProductId()%>"
														value="<%=itemL.getItem_name()%>">
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
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>
							
							
						<!-- #paymentModeRangeWiseReport -->
						

							<div id="paymentModeRangeWiseReport" class="tab-pane fade" hidden="true">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-1 col-sm-offset-1 control-label" for="startDateRP">Start Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="startDateRP" placeholder="Start Date" class="form-control input-md" type="text">
												</div>
											</div>

											<label class="col-md-1 control-label" for="endDateRP">End Date:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="endDateRP" placeholder="End Date" class="form-control input-md" type="text">
												</div>
											</div>
										
										<!-- <div class="row form-group"> -->
											<div class="col-md-1" style="margin-left: 37%;">
												<div class="input-group">
													<input type="button" id="btn" name="save" style="height: 27px;padding: 0px;"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="paymentModeRangeWiseReport()" value="Search" />
												</div>
											</div>
											</div>
									<!-- 	</div>
									
									
 -->
										<div class="table-responsive" align="center">
											<table class="table table-bordered table-striped table-condensed cf"
												id="paymentModeRangeWiseReportTable" class="display"
												style="border: 2px solid black; border-collapse: collapse; width:400px">
												<thead>
													<tr>
														<th>Total Cash Amount</th>
														<th>Total Card Amount</th>
													</tr>
												</thead>
											</table>
										</div>
									</fieldset>
								</form>
							</div>







						</div>
					</div>
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					

<%-- 					<div class="tab-pane active" id="sell">
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
							<li><a data-toggle="tab" href="#singleDateSale"><h4 style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#twoDateSale"><h4 style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#userWise"><h4 style="color: blue">User Wise</h4></a></li>
							<li><a data-toggle="tab" href="#BillWise"><h4 style="color: blue">Bill Wise</h4></a></li>
							<li><a data-toggle="tab" href="#caReturns"><h4 style="color: blue">GST Return</h4></a></li>
							<li><a data-toggle="tab" href="#paymentModeWiseReport"><h4 style="color: blue">Payment Mode<br>Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!-- 	Customer Name wise -->
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
														<!-- <th>Discount<br>%</th> -->
														<th>Discount<br>Amount</th>
														<!-- <th>Tax Amount<br>After Discount</th> -->
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
													<!--<th></th> -->
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
														<!-- <th>Discount<br>%</th> -->
														<th>Discount<br>Amount</th>
														<!-- <th>Tax Amount<br>After Discount</th> -->
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
														<!-- <th></th>
														<th></th> -->
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
														<th>Category Name</th>
														<th>Quantity</th>
														<th>Buy Price<br>Excl. Tax</th>
														<th>SalePrice</th>
														<th>GST<br>%</th>
														<th>Sale Price<br>Excl. Tax</th>
														<!-- <th>Discount<br>%</th> -->
														<th>Discount<br>Amount</th>
														<!-- <th>Tax Amount<br>After Discount</th> -->
														<th>Total Amount</th>
														<th>Date</th>
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

											<label class="col-md-2 control-label" for="userName123">User Name </label>
											<div class="col-md-3">
												<select class="form-control input-md" id="userName123"
													name="userName123">
												</select>
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
														<th>Category Name</th>
														<th>Quantity</th>
														<th>SalePrice</th>
														<th>GST<br>%</th>
														<th>Sale Price<br>Without Tax</th>
														<!-- <th>Discount<br>%</th> -->
														<th>Discount<br>Amount</th>
														<!-- <th>Tax Amount<br>After Discount</th> -->
														<th>Total Amount</th>
														<th>Date</th>
													</tr>
												</thead>
												<tbody id="vikas">
												</tbody>
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
														<!-- <th></th>
														<th></th> -->
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

							
							<!-- GST Return Reports  -->
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
											<div class="col-md-1"
												style="margin-left: 37%; padding-bottom: 8px;">
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
														<th>Gross Amount</th>
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
													</tr>
												</tfoot>
											</table>
										</div>
									</fieldset>
								</form>
							</div>
							
							

						</div>
					</div>
					--%>
					
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
													<option data-value="<%=item2.getCatName()%>"
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
														<!--<th></th>-->
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
							<li class="active"><a data-toggle="tab"
								href="#categoryWiseStock"><h4 style="color: blue">Category
										Wise Stock</h4></a></li>
							<li><a data-toggle="tab" href="#currentStock"
								onclick="currentStock()"><h4 style="color: blue">Current
										Stock</h4></a></li>
							<li><a data-toggle="tab" href="#barcodeNoWiseStock"><h4
										style="color: blue">Barcode Wise Stock</h4></a></li>
							<li><a data-toggle="tab" href="#allWayReport"
								onclick="allWayReport()"><h4 style="color: blue">All
										way Reports</h4></a></li>
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
				</div>
			</div>
		</div>
	</div>
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>