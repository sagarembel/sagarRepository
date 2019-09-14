<%-- <%@page import="com.smt.bean.GetTransactionId"%> --%>
<%@page import="com.smt.bean.allTransactionId"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.bean.SupplierEditBean"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
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
<script src="/SMT/staticContent/js/goodsReturn.js"></script>
<style type="text/css">
</style>
	 <%	 
		Long transactionId = 1l;
	    
	 	GoodReciveDao data = new GoodReciveDao();
		List trList  = data.getLastTransactionNo();

		for(int i=0;i<trList.size();i++)
		{
			allTransactionId st = (allTransactionId)trList.get(i);
			transactionId = st.getPurchaseReturnTransactoinId();
			transactionId++;
		}      
			System.out.println("transactionId =========> "+transactionId);
     %>


<body class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div class="col-md-3 col-md-offset-4 align" align="center">
				<span class="form-name style_heading" style="font-size: 27px;">Purchase Return</span>
			</div>
			<div  class="col-md-3 col-md-offset-2 align">	
					<span align="right" style="color: red;margin-right: 130px;font-size: 27px;">Transaction ID :: <%out.println(transactionId); %></span>
					<input type="hidden" id="transactionId" name="transactionId" value="<%=transactionId%>">
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

		<form action="supplier" name="supd" method="post"
			class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Product:</label>
					</div>
					<%
							/* SupplierDetailHelper poHelper = new SupplierDetailHelper();
							List supplierList = poHelper.getAllSuppliers(); */
							
							SupplierDetailDao sdo = new SupplierDetailDao();
							List supplierList = sdo.getSuppAndItemToPReturnDao();
							System.out.println(supplierList.size());
					%>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input list="supplierId_drop" id="supplierId"
								class="form-control" onchange="getAllBills();getitems()">
							<datalist id="supplierId_drop">
								<%
									 for (int i = 0; i < supplierList.size(); i++)
									 {
										/* SupplierDetail supplier = (SupplierDetail) supplierList.get(i);*/
										SupplierEditBean supplier = (SupplierEditBean) supplierList.get(i);
								%>
									<%-- <option data-value="<%=supplier.getSuppCode()%>" --%>
									<option data-value="<%=supplier.getgRBarcode()%>"
									value="<%=supplier.getSupplierName()%>=><%=supplier.getgRItemName()%>=><%=supplier.getgRSize()%>=><%=supplier.getgRBarcode()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>
					
					<div class="col-sm-2" align="center">
						<label class="control-label">Reason:</label>
					</div>
					<div class="col-sm-3">

						<div class="input-group">
							<textarea rows="3" cols="30" placeholder="Reason" id="reasonForPReturn" name="reasonForPReturn"></textarea>
						</div>
					</div>
					
					<!-- <div class="col-sm-2" align="center">
						<label class="control-label"> Bill No:</label>
					</div>
					<div class="col-sm-3">

						<div class="input-group">
							<span class="input-group-addon"> No </span> <select
								class="form-control input-md" id='billNo' name="billNo"
								onchange="getitems()">
							</select>
						</div>
					</div> -->
				</div>
				<!-- <div class="row" style="margin-top:10px;padding-bottom: 10px;">
							<div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px;"> Gross Total: </label>
							</div>
							<div class="col-md-2">
							 <div class="input-group">
							    <span class="input-group-addon">
							      Rs
						        </span>
								<input type="text" class="form-control" id="returnGrossTotal" style="font-size:25px;height:55px;background-color: #fab787;" readonly="readonly">
							 </div> 
							</div> 
						</div> -->
			</div>
		</form>
	</div>
	
	<div class="container-fluid">
		<div class="row" style="margin-left: 10px;" align="center">
			<div class="col-sm-12">
				<div class="table-responsive">
					<table id="jqGrid"></table>
					<div id="jqGridPager"></div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row" style="margin-top:10px;">
							<div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px; padding-top:18px"> Gross Total: </label>
							</div>
							<div class="col-md-2">
							 <div class="input-group">
							    <span class="input-group-addon">
							      Rs
						        </span>
								<input type="text" class="form-control" id="returnGrossTotal" style="font-size:25px;height:55px;background-color: #fab787;" readonly="readonly">
							 </div> 
							</div> 
						</div>
	
	<div>
		<div align="center">
			<input type="button" value="Submit" id="btn" onclick="purchasereturn()"	class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
		</div>
	</div>		
										
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>
