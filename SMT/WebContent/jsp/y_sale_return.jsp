<%@page import="com.smt.bean.allTransactionId"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.CreditCustomerBill"%>
<%@page import="com.smt.hibernate.OtherBill"%>
<%@page import="com.smt.helper.CustomerOrderHelper"%>
<%@page import="com.smt.hibernate.CustomerBill"%>
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/sale_return.js"></script>
<style>
form{
PADDING-BOTTOM: 100px;
}
</style>
  <%
        Long transactionId = 1l;
	 %>
	 <%
	    CustomerDetailsDao data = new CustomerDetailsDao();
		List trIdList  = data.getLastTransactionIdForSaleReturn();
		for(int i=0;i<trIdList.size();i++)
		{
			allTransactionId st = (allTransactionId)trIdList.get(i);
			transactionId = st.getSaleReturnTransactoinId();
			transactionId++;
		}      
     %>


<body class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div class="col-md-3 col-md-offset-4 align" align="center">
				<span class="form-name style_heading" style="font-size: 27px;">Sale Return</span>
				<h3 style="color: red; font-size: 12px;">"Enter '00' in other Product Return Quantity"</h3>
			</div>
			<div  class="col-md-3 col-md-offset-2 align">	
					<span align="right" style="color: red;margin-right: 130px;font-size: 27px;">Transaction ID :: <%out.println(transactionId); %></span>
					<input type="hidden" id="transactionIdSr" name="transactionIdSr" value="<%=transactionId%>">
			</div>
			
			
		</div>
		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
				<!-- 	<div id="date" hidden="true">
						<label id="demoSr"></label>
						<script>
							var date = new Date();
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div> -->
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home2"><h4 style="color: blue">Bill No Wise</h4></a></li>
			<li><a data-toggle="tab" href="#home"><h4 style="color: blue">Tax Invoice</h4></a></li>			
			<li><a data-toggle="tab" href="#customerBill"><h4 style="color: blue">Credit Customer Bill</h4></a></li>
		</ul>

		<div class="tab-content" style="float: left; padding-top: 20px;">

			<!-------- Miscellaneous Bill ---------->

			<div id="home" class="tab-pane">
				<div class="row"></div>
				<form action="supplier" name="supd" method="post"
					class="form-horizontal">
					<div class="row">
						<div class="form-group">
						<!-- <h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get Bill Information"</h3> -->
							<label class="col-sm-2 control-label" for="creditCustomer5">Customer Name</label>
							<div class="col-sm-3">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-user"></i>
									</span>
									<%
										CustomerDetailsDao sdd88 = new CustomerDetailsDao();
										List sList88 = sdd88.getAllMiscellaneousCustomer();
									%>
									<input list="cust_drop5" id="creditCustomer5"
										class="form-control"
										onchange="getBillByMiscellaneousCustomer1()">
									<datalist id="cust_drop5">
										<%
											for (int i = 0; i < sList88.size(); i++) {
												OtherBill sup88 = (OtherBill) sList88.get(i);
										%>
										<option data-value="<%=sup88.getPkBillId()%>>"
											value="<%=sup88.getCreditCustomer1()%>"></option>
										<%
											}
										%>
									</datalist>		
								</div>
								<input type="text" disabled="disabled" hidden="true"/>
							</div>
							
						<div class="row">
							<div class="form-group">
								<label class="col-md-3 control-label" for="bill_no"> Bill No: </label>
								<div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon"> <i
										class="glyphicon glyphicon-hand-right"></i>
									</span>
										<select
											class="form-control input-md" id='billNo' name="billNo"	onchange="getSaleItems()">
										</select>
									</div>
									<h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get Bill Information"</h3>
								</div>
							</div>
						</div>						
							
						<label class="col-md-2 control-label" for="reasonForSReturn1">Reason </label>
							<div class="col-md-3">
								<div class="input-group">
									<textarea rows="3" cols="30" placeholder="Reason" id="reasonForSReturn1" name="reasonForSReturn1"></textarea>
								</div>
							</div>
							
						</div>
					</div>
					<div class="container-fluid" style="margin-left: 0px;">
						<div class="row">
							<div class="col-sm-12">
								<div class="table-responsive">
									<table id="jqGrid"></table>
									<div id="jqGridPager"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row buttons_margin_top">
						<div align="center">
							<input type="button" value="Submit" id="btn"
								onclick="valSaleReturn()"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
							<!-- <input type="reset" value="Reset"   class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/> -->
						</div>
					</div>
				</form>
			</div>
			<!-- tax invoice bill no wise sale return  -->

			<div id="home2" class="tab-pane fade in active">
			<div class="row"></div>
				<form action="supplier" name="supbwsr" method="post"
					class="form-horizontal">
					<div class="row">
						<div class="form-group">
							<!-- <h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get data"</h3> -->
							<label class="col-md-2 control-label" for="billnowsr"> Bill No </label>
							<div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon"> No </span> <!-- <select
										class="form-control input-md" id='billNo' name="billNo"
										onchange="getSaleItems2()">
									</select> -->
									<input type="text" id="billNoBW" class="form-control" onfocusout="getSaleItems2()">
								</div>
								<h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get Bill Information"</h3>
								<input type="text" disabled="disabled" hidden="true"/>
								</div>
								
						<div class="row">
							<div class="form-group">
								<label class="col-md-2 col-sm-offset-1 control-label" for="reasonForSReturn2"> Reason </label>
							<div class="col-md-3">
								<div class="input-group">
									<textarea rows="3" cols="30" placeholder="Reason" id="reasonForSReturn2" name="reasonForSReturn2"></textarea>
								</div>
							</div>
							</div>
						</div>		
							
					</div>
					</div>
					<div class="container-fluid" style="margin-left: 0px;">
						<div class="row">
							<div class="col-sm-12">
								<div class="table-responsive">
									<table id="jqGrid2"></table>
									<div id="jqGridPager2"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row buttons_margin_top">
						<div align="center">
							<input type="button" value="Submit" id="btn"
								onclick="valSaleReturn2()"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
							<!-- <input type="reset" value="Reset"   class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/> -->
						</div>
					</div>
				</form>
				</div>
		<!-- </div> -->
		
			<!-- ---	Credit Customer Bill	---- -->
			<div id="customerBill" class="tab-pane ">
				<div class="row"></div>
				<form action="supplier" name="supd1" method="post"
					class="form-horizontal">
					<div class="row">
						<div class="form-group">
						<!-- <h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get data"</h3> -->
							<label class="col-md-2 control-label" for="customerName">Customer Name</label>
							<div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-user"></i>
									</span>
									<%
										CustomerDetailsDao cdd = new CustomerDetailsDao();
										List cList = cdd.getAllCustomerForBilling();
									%>
									<input list="cust_drop" id="creditCustomer"
										class="form-control" onchange="getBillByCustomer1()">
									<datalist id="cust_drop">
										<%
											for (int i = 0; i < cList.size(); i++) {
												CustomerDetailsBean cust = (CustomerDetailsBean) cList.get(i);
										%>
										<option data-value="<%=cust.getCustId()%>"
											value="<%=cust.getFirstName()%> <%=cust.getLastName()%>">
										</option>
										<%
											}
										%>
									</datalist>
								</div>
								<input type="text" disabled="disabled" hidden="true"/>
							</div>
							<label class="col-md-2 col-sm-offset-1 control-label" for="bill_no"> Bill No:</label>
							<div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon"> No </span> <select
										class="form-control input-md" id='billNo2' name="billNo2" onchange="getSaleItems1()">
									</select>
								</div>
								<h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get Bill Information"</h3>
							</div>
						</div>
						<div class="row">
						<label class="col-md-2 control-label" for="reasonForSReturn3">Reason </label>
							<div class="col-md-3">
								<div class="input-group">
									<textarea rows="3" cols="30" placeholder="Reason" id="reasonForSReturn3" name="reasonForSReturn3"></textarea>
								</div>
							</div>
							</div>						
					</div>
					<div class="container-fluid" style="margin-left: 0px; padding-top: 10px">
						<div class="row">
							<div class="col-sm-12">
								<div class="table-responsive">
									<table id="jqGrid1"></table>
									<div id="jqGridPager1"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row buttons_margin_top">
						<div align="center">
							<input type="button" value="Submit" id="btn"
								onclick="valSaleReturn1()"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
