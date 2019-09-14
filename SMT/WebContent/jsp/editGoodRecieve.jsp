<%-- <%@page import="com.smt.bean.getLastTransactionNo"%> --%>
<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.bean.GoodreciveBillBean"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.bean.SupplierEditBean"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.VatEntry"%>
<%@page import="com.smt.dao.VatEntryDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.bean.ProductNameBean"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<!--
	<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
	<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
	<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
	<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
	<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
	<script src="/SMT/staticContent/js/jquery-ui.js"></script>
	<script src="/SMT/staticContent/js/jqueryUi.js"></script>
	<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
-->
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/editGoodReceive.js"></script>
<style type="text/css">
</style>
<body class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div class="col-md-3 col-md-offset-5 align" align="center">
				<span class="form-name style_heading" style="font-size: 27px;">Edit Purchase</span>
			</div>
			<div  class="col-md-3 col-md-offset-2 align">	
					<span align="right" style="color: red;margin-right: 180px;font-size: 27px;"><%-- Transaction ID :: <%out.println(transactionId); %> --%></span>
			</div>
		</div>

		<div class="row">
			<div class="form-group" align="right">
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

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="supplier" name="supd" method="post" class="form-horizontal">
		
		<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Voucher No:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
				<div class="input-group">
							<span class="input-group-addon"> No </span> <input class="form-control input-md" id='voucherNo' autofocus="autofocus" name="voucherNo" onchange="getItemsFromVoucherNo()"/>
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Supplier Name:<sup
							style="color: red;">*</sup>
						</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> <input type="text" id="supplierId" class="form-control" readonly="readonly">
						</div>
					</div>
				</div>
			</div>
		
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Bill No<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="billNo" name="billNo" class="form-control" placeholder="Bill No" />
						</div>
					</div>
					
					<div class="col-sm-2" align="center" hidden="true">
						<label class="control-label" style="padding-right:31px">Update Supplier Name:<sup
							style="color: red;">*</sup>
						</label>
					</div>
					<div class="col-sm-3" hidden="true">
						<%
							SupplierDetailHelper poHelper = new SupplierDetailHelper();
							List supplierList = poHelper.getAllSuppliers();
						%>
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> <input list="updateSupplierId_drop" id="updateSupplierId" class="form-control" placeholder="Update Supplier Name" onchange="getCurrentNewSupplierData()">
							<datalist id="updateSupplierId_drop">
								<%
									for (int i = 0; i < supplierList.size(); i++)
									{
										SupplierDetail supplier = (SupplierDetail) supplierList.get(i);
								%>
								<option data-value="<%=supplier.getSupplierId()%>" value="<%=supplier.getSupplierName()%>,<%=supplier.getSuppCode()%>">
								<%
									}
								%>
								
							</datalist>
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">contact Person:</label>
					</div>
					<div class="col-sm-3">
				<div class="input-group">
							<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input class="form-control input-md" id='contactPerson' name="contactPerson"/>
						</div>
						</div>
						
					<div class="col-sm-2" align="center">
						<label class="control-label">Purchase Date:<sup
							style="color: red;">*</sup>
						</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i	class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id='pEDate' name="pEDate" class="form-control"
								id="jander" placeholder="Purchase Date" />
						</div>
					</div>
						
					</div>
				</div>
			</div>			
		</form>
	</div>
	
	<div class="container-fluid" style="margin-left: 5px;">
		<div class="row">
			<div class="col-sm-12">
				<div class="table-responsive">
					<table id="jqGrid"></table>
					<div id="jqGridPager"></div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row row_margin">
					<div class="form-group">
						<div class="col-sm-1 col-sm-offset-1" align="center">
							<label class="control-label">Total Quantity:</label>
						</div>

						<div class="col-sm-2">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input type="text" id='totalQuantity' name="totalQuantity"
									class="text-border form-control" placeholder="Total Quantity"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" readonly="readonly" />
							</div>
						</div>

						 <div class="col-sm-1" align="center" hidden="true">
							<label class="control-label">Total GST:</label>
						</div>

						<div class="col-sm-2" hidden="true">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input type="text" id='totalGst' name="totalGst"
									class="text-border form-control" placeholder="Total Gst"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" readonly="readonly" />
							</div>
						</div>

						<div class="col-sm-2" align="center" hidden="true">
							<label class="control-label">Total IGST:</label>
						</div>
						<div class="col-sm-2" hidden="true">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input type="text" id='totalIgst' name="totalIgst"
									class="text-border form-control" placeholder="Total Igst"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" readonly="readonly" />
							</div>
						</div>
					</div>
				</div>


	<div class="row row_margin" hidden="true">
		<div class="form-group">
			<div class="col-sm-1 col-sm-offset-1" align="center">
				<label class="control-label">new supp pendingAmount:</label>
			</div>

			<div class="col-sm-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="glyphicon glyphicon-hand-right"></i>
					</span> <input type="text" id='newSuppPendingAmount' name="newSuppPendingAmount" class="text-border form-control" style="background-color: rgba(251, 243, 0, 0.27)" id="jander" value="0" readonly="readonly"/>
				</div>
			</div>
		</div>
	</div>


	<div class="row" style="margin-top:10px;">
							<div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px;padding-top:18px">Gross Total: </label>
							</div>
							<div class="col-md-2">
							 <div class="input-group">
							    <span class="input-group-addon">
							      Rs
						        </span>
								<input type="text" class="form-control" id="editGrossTotal" style="font-size:25px;height:55px;background-color: #fab787;" readonly="readonly">
								<input type="hidden" class="form-control" id="finalGrossTotalHidden" style="font-size:25px;height:55px;background-color: #fab787;" readonly="readonly">
								<input type="hidden" class="form-control" id="pendingBillpaymentHidden" style="font-size:25px;height:55px;background-color: #fab787;" readonly="readonly">
							 </div> 
							</div> 
						</div>
	
	<div>
		<div align="center">
			<input type="button" value="Submit" id="btn" onclick="validateEditPurchaseGrid()" class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
		</div>
	</div>
											
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>
