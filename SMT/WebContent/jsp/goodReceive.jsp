<%@page import="com.smt.bean.GoodreciveBillBean"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.hibernate.VatEntry"%>
<%@page import="com.smt.dao.VatEntryDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.bean.ProductNameBean"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

	 <%
        Long voucherNo = 1l;
	 %>
	 <%
	    GoodReciveDao data = new GoodReciveDao();
		List voucherList  = data.getLastVoucherNo();
		for(int i=0;i<voucherList.size();i++)
		{
			GoodreciveBillBean st = (GoodreciveBillBean)voucherList.get(i);
			voucherNo = st.getVoucherNo();
			voucherNo++;
		}      
     %>

<script type="text/javascript">
    function mypopup(url)
    {
        /* width = window.screen.width;
        height = window.screen.height; */
        width ='1050px';
        height = '600px';
        mywindow = window.open(url, "Title",
            "location=0,status=1,scrollbars=1,resizable=1,menubar=0,toolbar=no,width="
                        + width + ",height=" + height);
        mywindow.moveTo(140, 50);
        mywindow.focus();
    }
</script>
<script type="text/javascript">
	function grasstotal1() {
		var total = document.getElementById("resolution1").value;
		var extraDiscount = document.getElementById("extraDiscount").value;
		extraDiscount = 0;
		var disAmount = (extraDiscount / 100) * total;
		var gross = +total - +disAmount;
		document.getElementById("resolution").value = gross.toFixed(2);
	}
	function grasstotal() {
		var extraDiscount = document.getElementById("extraDiscount").value;
		extraDiscount = 0;
		var total = document.getElementById("resolution1").value;
		if (extraDiscount != "") {
			var disAmount = (extraDiscount / 100) * total;
			var gross = +total - +disAmount;
			var total = gross.toFixed(2);;
			var expence = document.getElementById("expence").value;
			var gross = +total + +expence;
			document.getElementById("resolution").value = gross;
		} else {
			var expence = document.getElementById("expence").value;
			var gross = +total + +expence;
			document.getElementById("resolution").value = gross;
		}
	}
</script>
<script type="text/javascript">
	var profiles = {
		windowCenter : {
			height : 550,
			width : 660,
			status : 1,
			center : 1
		},
	};
	$(function() {
		$(".popupwindow").popupwindow(profiles);
	});
	function productDetail()
	{
		window.location = "y_product_detail.jsp";
	}
</script>

<script>
	function getValidateRegGoodReceive()
	{
		document.good.btnSubmit.disabled = true;
		validateRegGoodReceive();
	}
	
	function getValidateRegGoodReceive1()
	{
		document.good.btnSubmit1.disabled = true;
		validateRegGoodReceive1();
	}	
</script>

<script type="text/javascript">
	function suppDetailsDivAction(a)
	{	
		if(a==1)
	    {
	       	document.getElementById("suppDetailsDiv").style.display="block";
	    }
	    else
	    {
	       	document.getElementById("suppDetailsDiv").style.display="none";
	    }
		
		$('#suppListDiv').load(document.URL +  ' #suppListDiv');
	}
	
	function formActionsSH(a)
	{
	    if(a==1)
	    {
	       	document.getElementById("good").style.display="none";
	    }
	    else
	    {
	       	document.getElementById("good").style.display="block";
	    }
	}
	
	function isNumber(evt)
	{
	    evt = (evt) ? evt : window.event;
	    var charCode = (evt.which) ? evt.which : evt.keyCode;
	    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	        return false;
	    }
	    return true;
	}
</script>

<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<!--  -->
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/bootstrap.min.js"></script> -->
<script src="/SMT/staticContent/y_js/newgoodsreceived.js"></script>
<script src="/SMT/staticContent/y_js/supplier.js"></script>

<script>
</script>
<body class="purchase_form_img vColor">
	<div class="container-fluid">
		<!-- 	<div align="center">
				<h2 class="form-name style_heading">Fabric Purchase</h2>
				<h2 class="form-name style_heading">ReadyMade Purchase</h2>
			</div> -->
			<%-- <div class="row header_margin_top">
				<div class="col-md-3 col-sm-offset-5 align" align="center">
					<span class="form-name style_heading" style="font-size: 27px;">ReadyMade Purchase</span>
				</div>
				<div  class="col-md-2 col-md-offset-1 align">	
						<span align="right" style="color: red;margin-right: 80px;font-size: 27px;">Voucher No :: <%out.println(voucherNo); %></span>
						<input type="hidden" readonly="readonly" id="voucherNo" name="voucherNo" value=<%=voucherNo%>>
				</div>
			</div> --%>
			
			
			<div class="row header_margin_top">
			<div class="col-sm-3 col-md-offset-5 align" align="center">
				<span class="form-name style_heading" style="font-size: 25px">Purchase</span>
			</div>
			<div class="col-sm-4" align="right">	
					<span style="color: red; font-size: 25px">Voucher No :: <%out.println(voucherNo);%></span>
					<input type="hidden" readonly="readonly" id="voucherNo" name="voucherNo" value=<%=voucherNo%>>
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

		<div id="myDialogBox" title="My Dialog Box">
			<div id="myContentLayer">
				<p></p>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="goods" method="post" name="good" class="form-horizontal" id="good">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Bill No:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="billNo" id="jander" name="billNo"
								autofocus="autofocus" class="form-control" placeholder="Bill No" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Supplier Name:<sup
							style="color: red;">*</sup>
						</label>
					</div>
					
					<div id="suppListDiv">
						<div class="col-sm-3">
							<%
								SupplierDetailHelper poHelper = new SupplierDetailHelper();
								List supplierList = poHelper.getAllSuppliers();
							%>
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-user"></i>
								</span> <input list="supplierId_drop" id="supplierId" class="form-control" onchange="getTaxType()">
								<datalist id="supplierId_drop">
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
								
								<span class="input-group-addon">
									<!-- <button type="button" id="popup1" onclick="mypopup('popUp_s_supplier_detail.jsp')">
										<span class="glyphicon glyphicon-plus" style="color: #0078ae;"></span>
									</button> -->
									
									<button type="button" onclick="suppDetailsDivAction(1);">
										 <span class="glyphicon glyphicon-plus"  style="color: #0078ae;"></span>
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
								
			<!-- ==================================================================== SUPPLIER DETAILS ================================================================ -->
					
	<div class="container-fluid" style="border: 3px solid; padding-bottom: 20px; display: none" id="suppDetailsDiv">
		<div class="row" style="padding-top: 10px">
			<div align="center">
				<h2 class="form-name style_heading">Supplier Details</h2>
			</div>
		</div>
		
		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #000000;">
			</div>
		</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">Supplier Name:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon glyphicon-user"></i>
							</span> <input type="text" class="form-control" name="supplierName" id="supplierName" placeholder="Supplier Name" />
						</div>
					</div>
					<div class="col-sm-2 " align="right">
						<label class="control-label">Address:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="address"
								name="address" placeholder="Address" />
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">Supplier Code:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon glyphicon-user"></i>
							</span> <input type="text" class="form-control" name="supplierCode" id="supplierCode" placeholder="Supplier Code" />
						</div>
					</div>
					
				</div>
			</div>
			
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">City:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="city" name="city"
								placeholder="City" />
						</div>
					</div>

					<div class="col-sm-2" align="right">
						<label class="control-label">Pin Code:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="pin" name="pin" class="form-control"
								placeholder="Pin Code" />
						</div>
					</div>

				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label" style="margin: 0px 10px;">Contact Person:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> <input type="text" id="contactPerson" name="contactPerson"
								class="form-control" placeholder="Contact Person" />
						</div>
					</div>

					<div class="col-sm-2" align="right">
						<label class="control-label">E-mail:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="email" name="email" class="form-control"
								placeholder="E-mail" />
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">Mobile No:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> <input type="text" id="mobileno" name="mobileno"
								class="form-control" placeholder="Mobile No" onkeypress="return isNumber(event)" maxlength="10"/>
						</div>
					</div>

					<div class="col-sm-2" align="right">
						<label class="control-label">GST/TIN/UIN No:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="panNo" name="panNo" class="form-control"
								placeholder="GSTTIN/UIN No" />
						</div>
					</div>
				</div>
			</div>
			<input type="hidden" value="POPUPSUPPDATAILS" id="popJspId" />

			<div class="row buttons_margin_top" style="padding-bottom: 10px">
				<div align="center">
					<input type="button" value="Save" name="saveSuppDBtn" id="saveSuppDBtn" onclick="validateSupplierDetails();" class="btn btn-lg btn-success btn-md button_hw button_margin_right"/>
					<input type="button" value="Cancel" name="cancelSuppDBtn" id="cancelSuppDBtn" onclick="suppDetailsDivAction(0); emptyFields();" class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/>
				</div>
			</div>
		</div>
					
		<!-- ============================================================== /SUPPLIER DETAILS ======================================================================= -->					

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Contact Person:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> <input type="text" id='contactPerson' name="contactPerson"
								class="form-control" placeholder="Contact Person" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Purchase Date:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id='pDate' name="pDate" class="form-control"
								id="jander" placeholder="Purchase Date" />
						</div>
					</div>
				</div>
			</div>
			
<!-- 		
			<div class="row" hidden="true">
			
			<%/* 
				VatEntryDao tax = new VatEntryDao();
				List taxList = tax.getTaxDetailsList();
				VatEntry taxRange = null;
					for (int i = 0; i < taxList.size(); i++)
					{
						if(i > 0)
						{
							break;
						}
						else
						{
							taxRange = (VatEntry) taxList.get(i);
						}
						System.out.println("taxRange.getVatPercentage() =====> "+taxRange.getVatPercentage());
						System.out.println("taxRange.getStartPrice() =====> "+taxRange.getStartPrice());
						System.out.println("taxRange.getEndPrice() =====> "+taxRange.getEndPrice());
						
					} */
			%>
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Bill No:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="billNo" id="jander" name="billNo"
								autofocus="autofocus" class="form-control" placeholder="Bill No" />
						</div>
					</div>
				</div>
				<div></div>
			</div>
					
			
			
				<div class="form-group">
				
				<div class="col-sm-1 col-sm-offset-2" align="center">
						<label class="control-label">GST%:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='gstRangePer' name="gstRangePer" readonly="readonly" value="" class="form-control"/>
						</div>
					</div>
				
					<div class="col-sm-1" align="center">
						<label class="control-label">StartPrice:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							 <input type="text" id='startPrice' name="startPrice" readonly="readonly" value="" class="form-control"/>
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">EndPrice</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='endPrice' name="endPrice" readonly="readonly" value="" class="form-control"/>
						</div>
					</div>
				</div>
			</div>
			
-->
	
			<div class="row" hidden="true">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Tax Type:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='taxType' name="taxType" class="form-control" readonly="readonly" placeholder="Select Supplier"/>
						</div>
					</div>
					<div>
					</div>
				</div>
			</div>


			<div class="row"></div>
				<!-- <div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label" for="billType">Type:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-4">
						<div class="col-md-4 col-xs-6 ">
							<label class="radio-inline"> <input type="radio"
								name="car" value="Gst" id="gst" checked>
							<h4 style="margin-top: 0px;">GST</h4>
							</label>
						</div>
						<div class="col-md-6 col-xs-6 col-md-ffset-1 ">
							<label class="radio-inline"> <input type="radio"
								name="car" value="noGst" id="nogst">
							<h4 style="margin-top: 0px;">No GST</h4>
							</label>
						</div>
					</div>
				</div> -->
				
				
				

				<div class="row">
					<div class="form-group">
						<div class="col-sm-2 col-sm-offset-1" align="center">
							<label class="control-label">Item List:<sup
								style="color: red;">*</sup></label>
						</div>
						<div class="col-sm-5">
							<%
								ProductDetailHelper item = new ProductDetailHelper();
								List itemList = item.getAllItemName();
							%>
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input list="itemId_drop" id="itemName" class="form-control" onchange="getProductList1()">
								
								<datalist id="itemId_drop">
									<%
										for (int j = 0; j < itemList.size(); j++) {
											ProductNameBean itm = (ProductNameBean) itemList.get(j);
									%>
									<option data-value="<%=itm.getCaregoryName()%>"
										value="<%=itm.getItemName()%> :::>>> <%=itm.getCaregoryName()%> :::>>> <%=itm.getSubCat()%>"
										myvalue="<%=itm.getItemName()%>"
										myvalue1="<%=itm.getSubCatid()%>"
										myvalue2="<%=itm.getProductid()%>"
										myvalue3="<%=itm.getColor()%>" 
										myvalue4="<%=itm.getSize()%>"
										myvalue5="<%=itm.getFkCatId()%>"									
										>										
										<%
											}
										%>
									
								</datalist>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12">
						<div class="table-responsive">
							<table id="jqGrid"></table>
							<div id="jqGridPager"></div>
						</div>
					</div>
				</div>

				<div class="row row_margin " style="padding-left:268px">
				<div class="col-sm-12">
					<div class="form-group">
						<div class="col-sm-1 " align="center">
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

						<div class="col-sm-1" align="center">
							<label class="control-label">Total GST:</label>
						</div>

						<div class="col-sm-2">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input type="text" id='totalGst' name="totalGst"
									class="text-border form-control" placeholder="Total Gst"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" readonly="readonly" />
							</div>
						</div>

						<div class="col-sm-1" align="center">
							<label class="control-label">Total IGST:</label>
						</div>
						<div class="col-sm-2">
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
				</div>

				<div class="row row_margin">
					<div class="form-group">
						<div class="col-sm-1 col-sm-offset-1" align="center">
							<!-- <label class="control-label">Total Discount (%):</label> -->
						</div>

						<div class="col-sm-2">
							<div class="input-group">
								<!-- <span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> -->
								<input type="hidden" id='extraDiscount' name="extraDiscount"
									class="text-border form-control" placeholder="In %" autofocus
									onkeyup="grasstotal1(); return false;"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" />
							</div>
						</div>

						<div class="col-sm-1" align="center">
							<!-- <label class="control-label">Expenses:</label> -->
						</div>

						<div class="col-sm-2">
							<div class="input-group">
								<!-- <span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> -->
								 <input type="hidden" id='expence' name="expence"
									class="text-border form-control" placeholder="Expenses"
									autofocus onchange="grasstotal(); return false;"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" />
							</div>
						</div>

						<div class="col-sm-2" align="center">
							<label class="control-label" style="font-size: 30px;padding-top:12px">Total:</label>
						</div>
						<div class="col-sm-2">
							<div class="input-group">
								<input type="text" name="resolution" id="resolution"
									readonly="readonly" class="form-group"
									style="font-size: 30px; float: right; width: 200px; height: 50px; background-color: rgba(251, 243, 0, 0.27);"
									value="0" /> <input type="hidden" id='resolution1'
									name="resolution1" class="form-control" />
							</div>
						</div>

					</div>
				</div>

				<div class="row buttons_margin_top">
					<div align="center">
							<input type="button"
							class="btn btn-lg btn-md button_hw button_margin_right"
							name="btn" id="btnSubmit" onclick="getValidateRegGoodReceive()" style="width: 140px; background-color: #74DAA0;"
							value="Save & Print" />
							
							<input type="button"
							class="btn btn-lg btn-success btn-md button_hw button_margin_right"
							name="btn1" id="btnSubmit1" onclick="getValidateRegGoodReceive1()"
							value="Save" />
						 
							<input type="reset" value="Cancel"
							onclick="window.location.reload()" name="btn1"
							class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
							
							<input type="button" onclick="productDetail()" id="btn"
							value="Product Detail" style="width: 140px; background-color: blue;"
							class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />
					</div>
				</div>
		</form>
		
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
