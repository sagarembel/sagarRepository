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
<script src="/SMT/staticContent/y_js/editBill.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/y_js/editBill.js"></script>

<script type="text/javascript">
function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }
    return true;
}
</script>

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
		List trList  = data.getLastTransactionIdForSaleReturn();
		for(int i=0;i<trList.size();i++)
		{
			allTransactionId st = (allTransactionId)trList.get(i);
			transactionId = st.getSaleReturnTransactoinId();
			transactionId++;
		}      
     %>

<body class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div class="col-md-3 col-md-offset-4 align" align="center">
				<span class="form-name style_heading" style="font-size: 27px;">Edit Bill</span>
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

		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home2"><h4 style="color: blue">Invoice</h4></a></li>
			<li><a data-toggle="tab" href="#customerBill"><h4 style="color: blue">Credit Customer Invoice</h4></a></li>
		</ul>

		<div class="tab-content" style="float: left; padding-top: 20px;">

			<!-- tax invoice bill no wise sale return  -->

			<div id="home2" class="tab-pane fade in active">
			<div class="row"></div>
	<form class="form-horizontal" action="" method="post" name  ="custord">
	
	<div class="row">
				<div class="col-md-3 col-md-offset-4 align" align="center" style="margin-left: 33.333333%;">
					<span class="form-name style_heading" style="font-size: 25px;">Edit Invoice</span>
				</div>
			</div>
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
				<div class="row">
			        <div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
							<label class="control-label" style="font-size:22px; margin-left: 71px; padding-left:29px">Bill No</label>
						</div>
						
						<div class="col-md-2">
						  <div class="input-group">
							<span class="input-group-addon">
							<i	class="glyphicon glyphicon-hand-right"></i>
							</span> 
						    <input type="text" id="billNoBW" class="form-control text-border" autofocus="autofocus" placeholder="Enter Bill No." onchange="getEmpName(), getEmpName(), getSaleItems2();"/>
					     </div>	
					     </div>
					     
					     <div class="col-sm-2 col-sm-offset-1" align="center">
							<label class="control-label" style="font-size:22px; margin-left: 70px;">Mobile No:</label>
						</div>
						<div class="col-md-2">
						  <div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
						    <input type="text" id="mobileNo" class="form-control text-border" maxlength="10" onkeypress="return isNumber(event)"/>
					     </div>	
					     </div>
					 </div> 
				</div>
	
			      <div class="row">
			        <div class="form-group">
			        
			        <label class="col-md-3 control-label" for="customerName" style="font-size:22px;">Customer Name<!-- <sup>*</sup> --></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
						<input type="text" id="creditCustomer1"  class="form-control">
				    </div>
           			</div>
           			</div> 
				</div>		
		
				<div class="row" style="margin-top: 10px;" align="center">
				    <div class="form-group">
					<div class="col-md-12">
						<div class="row">
							<div class="table-responsive">
								<table id="jqGrid2"></table>
								<div id="jqGridPager2"></div>
							</div>
						</div>
					</div>
					</div>
				</div>		
				
				<div class="row">
			        <div class="form-group">
						<label class="col-md-3 control-label" for="totalQuantity" style="font-size:22px;margin-left:-10px;">Total Quantity<!-- <sup>*</sup> --></label>  
          					  <div class="col-md-3" style="margin-left: 10px;">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-hand-right"></i>
									</span>
							
						<input type="text" class="form-control" id="totalQuantity" style="font-size:22px;height:35px;width:70px;" readonly="readonly"/>
				    </div>
           			</div>
					     
					   <div class="row">
							<div class="col-md-2" align="right" style="margin-left: -10px;">
								<label class="control-label" style="font-size: 22px;" >Total Amount: </label>
							</div>
							<div class="col-md-2">
							  <div class="input-group">
							     <span class="input-group-addon">
							       Rs
						         </span>
								<input type="text" class="form-control" id="totalAmount" style="font-size:22px;height:35px;" placeholder="Total Amount"  style="font-size: 22px;" readonly="readonly"/>
							  </div> 
							</div>
						</div>
				</div>
				</div>		
						
				<div class="row">
					<div class="col-md-offset-5 col-md-3" align="right">
						<label class="control-label" style="font-size: 22px;">Discount: </label>
					</div>

					<div class=" row col-md-2">
						 <div class="input-group" style="margin-left: 10px;padding-left: 8px;">
						   <span class="input-group-addon">
						     Rs
					       </span>
							<input type="text" readonly="readonly" class="form-control" id="discount" style="font-size:20px;height:30px;" onchange="taxAmountCalc(); callAfterSave()" style="font-size: 22px;"/>
						 </div>
					</div>
				</div> 							
							
					<div class="row" style="margin-top:10px;">
			        <div class="form-group">
						
							<div class="col-md-3 control-label" align="right">
								<label class="control-label" style="font-size: 22px;">Payment Mode </label>
							</div>
							
							<div class=" row col-md-2">
							 <div class="input-group" style="margin-left: 10px;">
							   <span class="input-group-addon">
							     Rs
						       </span>
								<input type="text" readonly="readonly" class="form-control" id="lastPaymentMode" style="font-size:20px;height:30px; width: 160px;"/>
							 </div>
							</div> 
					 	
						<div class="row">
							<div class="col-md-2 col-sm-offset-1" align="right">
							<label class="control-label" style="font-size: 22px; margin-left: 50px;" for="paymentMode">Edit Payment Mode:</label> 
							</div> 
	           				<div class="col-md-2" align="right" style="margin-left: 5px;">
							<div class="input-group">
								<span class="input-group-addon"> <i	class="glyphicon glyphicon-hand-right"></i>
							</span> 
	           					<select class="form-control" id="paymentMode">
	           							<option value="none">Select</option>
										<option value="cash">Cash</option>
										<option value="card">Card</option>
										<option value="cashAndCard">Cash And Card</option>
								</select>	
	           				</div>
						</div>
						
	 
	<script>
		$(document).ready(function(){
	  		 $("#paymentMode").change(function(){
	       	$(this).find("option:selected").each(function()
	       	{
	       		
	       		if($(this).attr("value")=="none")
		        {
	          		$("#cash_and_card").hide();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
            	}
	       		else if($(this).attr("value")=="cash")
		        {
	          		$("#cash_and_card").hide();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
	            }
	       		else if($(this).attr("value")=="card")
		        {
	          		$("#cash_and_card").hide();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
	            } 
	          	else if($(this).attr("value")=="cashAndCard")
		        {
	          		//$("#cash_and_card").show();
	          		$("#cashAmountDiv").show();
	          		$("#cardAmountDiv").show();
	            }
	       });
	   }).change();
		});	
		</script>
	 </div> 
	 </div>
	 </div>
	 
	 
	<div class="row" style="margin-top:10px;">
        <div class="form-group">
			<div class="col-md-3" align="right">
					<label class="control-label" style="font-size: 22px;">Cash Amount </label>
			</div>
			<div class=" row col-md-2">
				 <div class="input-group" style="margin-left: 10px;">
				   <span class="input-group-addon">
				     Rs
			       </span>
					<input type="text" readonly="readonly" class="form-control" id="oldCashAmount" style="font-size:20px;height:30px; width: 160px;"/>
				 </div>
				</div> 
				
				<div class="row" id="cashAmountDiv">
				
				<div class="col-md-2 col-md-offset-6  first">	
						<label class="control-label" style="font-size: 22px; margin-left:40px; margin-top: -26px;">Cash Amount: </label>  
				</div>
						
						<div class="col-md-2 first">	
							<input class="form-control" type="text" name="cashCard_cashAmount" id="cashCard_cashAmount" placeholder="Cash Amount" style="margin-top: -26px;"/>  
						</div>
				</div>
				</div>
		
		 <div class="form-group">
			<div class="col-md-3" align="right">
					<label class="control-label" style="font-size: 22px;">Card Amount </label>
			</div>
			<div class=" row col-md-2">
				 <div class="input-group" style="margin-left: 10px;">
				   <span class="input-group-addon">
				     Rs
			       </span>
					<input type="text" readonly="readonly" class="form-control" id="oldCardAmount" style="font-size:20px;height:30px; width: 160px;"/>
				 </div>
				</div> 
				
				<div class="row" id="cardAmountDiv">
					<div class="col-md-2 col-md-offset-6  first">	
						<label class="control-label" style="font-size: 22px; margin-left:40px; padding-bottom:12px; margin-top: -26px;">Card Amount: </label>  
					</div>
							
					<div class="col-md-2 first">	
						<input class="form-control" type="text" name="cashCard_cardAmount" id="cashCard_cardAmount" placeholder="Card Amount" style="margin-top: -26px;"/>  
					</div>
				</div>
		</div>
		
		 <div class="form-group">
			<div class="col-md-3" align="right">
					<label class="control-label" style="font-size: 22px;">Credit Amount </label>
			</div>
			<div class=" row col-md-2">
				 <div class="input-group" style="margin-left: 10px;">
				   <span class="input-group-addon">
				     Rs
			       </span>
					<input type="text" readonly="readonly" class="form-control" id="finalCreditAmount" style="font-size:20px;height:30px; width: 160px;"/>
				 </div>
				</div> 
		</div>
		
	</div>
	 	 
	
		<div class="row">
			<div class="col-md-offset-5 col-md-3" align="right">
				<label class="control-label" style="font-size: 22px; padding-top:18px" > Gross Total: </label>
			</div>
			<div class="col-md-2">
			 <div class="input-group">
			    <span class="input-group-addon">
			      Rs
		        </span>
				<input type="text" class="form-control" id="grossTotal" style="font-size:25px;height:55px;background-color: #fab787;"
				readonly="readonly"/>
			 </div> 
			</div> 
		</div>
				
		<div class="row" style="margin-top:20px;">
		  <div class="form-group">
			<div align="center" class="margin-top-10">
				<input type="button" value="Submit" id="btn" onclick="editBill1();" class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
				<input type="reset" value="Cancel" onclick="window.location.reload()" class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
			</div>
		  </div>	
		</div> 
				
		</form>		
				</div>
				
		<!-- </div> -->
		
			<!------------------------------------------------	CREDIT CUSTOMER BILL EDIT	---------------------------------------------->
			
			<div id="customerBill" class="tab-pane ">
				<div class="row"></div>
				<form action="" name="ccEdit" method="post" class="form-horizontal">
		<div class="container-fluid">
			
			<div class="row">
				<div class="col-md-4 col-md-offset-3 align" align="center" style="margin-left: 28.333333%;">
					<span class="form-name style_heading" style="font-size: 25px;">Edit Credit Customer Invoice</span>
				</div>
			</div>
			
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
			
			<div class="row">				

				<label class="col-md-2 control-label" for="customerName">Customer Name<sup>*</sup></label>
				<div class="col-md-2">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
							<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList = cdd.getAllCustomerForBilling();
							%>
						<input list="creditcust_drop" id="creditcustCustomer" class="form-control" onchange="getBillByCustomer1()">
						<datalist id="creditcust_drop"> <%
					           for(int i=0;i<cList.size();i++){
					        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>

						<option data-value="<%=cust.getCustId()%>"
							value="<%=cust.getFirstName() %> <%=cust.getLastName() %>">
							<%
				      			}
				    		%>
						</datalist>
					</div>
				</div>
				
				<div class="col-md-2 col-md-offset-1" align="center">
					<label class="control-label" style="font-size: 22px; margin-left: 120px;">Bill No</label>
				</div>

				<div class="col-md-2">
					<select class="form-control input-md" id='creditCustBillNo' name="creditCustBillNo" onchange="getEmpName(); getEmpName(); getEmpName(); getCreditCustEditBill();"></select>
				</div>
			</div>
			
			
			<div class="row" style="margin-top: 10px; margin-left: 35px; margin-right: 10px;">
				<div class="col-md-12">
					<div class="row">
						<div class="table-responsive">
							<table id="jqGrid1"></table>
							<div id="jqGridPager1"></div>
						</div>
					</div>
					<div class="row" style="margin-top: 15px">
						 <div class="form-group">
							<label class="col-md-2 control-label col-md-offset-1" for="totalQuantity" style="font-size:22px;margin-left: -5px;">Total Quantity<!-- <sup>*</sup> --></label>  
	          					  <div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-hand-right"></i>
										</span>
								
							<input type="text" class="form-control" id="totalQuantityCC" style="font-size:22px;height:35px;width:70px;" readonly="readonly"/>
					    </div>
	           			</div>
	           			<div class="row">
							<div class="col-md-3" align="right">
							<label class="control-label" style="font-size: 22px;">Total Amount: </label>
						</div>
						<div class="col-md-2">
						<div class="input-group">
						<span class="input-group-addon">
							       Rs
						         </span>
							<input type="text" class="form-control" id="totalAmountCC"
								style="font-size: 22px; height: 35px;" placeholder="Total Amt"
								style="font-size: 22px;" readonly="readonly" />
						</div>
						</div>
					</div>
					</div>
				</div>				
				
					<div class="row">
					 <div class="form-group">					
						<div class="row col-md-offset-6" >
							<div class="col-md-2 col-md-offset-1" align="right">
								<label class="control-label" style="font-size: 22px;">Discount: </label>
							</div>
					
							<div class="row">
							 <div class="input-group col-md-3" style="margin-left: 10px;padding-left: 8px;padding-left: 32px;" align="center">
							   <span class="input-group-addon">Rs</span>
								<input type="text" readonly="readonly" class="form-control" id="discountCC" style="font-size:20px;height:30px;" onchange="taxAmountCalc()" style="font-size: 22px;"/>
							 </div>
						</div> 			
						
					</div>
					</div>
			</div>
			
			<div class="row">
					 <div class="form-group">					
						<div class="row col-md-offset-5" >
							<div class="col-md-3" align="right" style="margin-left: 110px;">
								<label class="control-label" style="font-size: 22px;margin-right: -25px;">Net Payment Amount: </label>
							</div>
					
							<div class="row">
							 <div class="input-group col-md-3" style="margin-left: 10px;padding-left: 8px;padding-left:35px;" align="center">
							   <span class="input-group-addon">Rs</span>
								<input type="text" class="form-control" id="netPaymentAmountCC" style="font-size: 22px; height: 35px;" placeholder="Paid Amt" readonly="readonly"/>
							 </div>
						</div> 			
						
					</div>
					</div>
			</div>

					<div class="row" style="margin-top:10px;">
			        <div class="form-group">
						
							<div class="col-md-2 control-label" align="right">
								<label class="control-label" style="font-size: 22px;">Payment Mode </label>
							</div>
							
							<div class=" row col-md-2">
							 <div class="input-group" style="margin-left: 10px;">
							   <span class="input-group-addon">
							     Rs
						       </span>
								<input type="text" readonly="readonly" class="form-control" id="oldPaymentModeCC" style="font-size:20px;height:30px; width: 160px;"/>
							 </div>
							</div> 
					 	
						<div class="row">
							<div class="col-md-3 col-sm-offset-1" align="right">
							<label class="control-label" style="font-size: 22px; margin-left: 50px;margin-right: -15px;" for="paymentModeCC">Edit Payment Mode:</label> 
							</div> 
	           				<div class="col-md-2" align="right" style="margin-left: 5px;">
							<div class="input-group">
								<span class="input-group-addon"> <i	class="glyphicon glyphicon-hand-right"></i>
							</span> 
	           					<select class="form-control" id="paymentModeCC">
	           							<option value="noneCC">Select</option>
										<option value="cashCC">Cash</option>
										<option value="cardCC">Card</option>
										<option value="cashAndCardCC">Cash And Card</option>
								</select>	
	           				</div>
						</div>
						
	 
	<script>
		$(document).ready(function(){
	  		 $("#paymentModeCC").change(function(){
	       	$(this).find("option:selected").each(function()
	       	{
	       		
	       		if($(this).attr("value")=="noneCC")
		        {
	          		$("#cash_and_cardCC").hide();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
            	}
	       		else if($(this).attr("value")=="cashCC")
		        {
	          		$("#cash_and_cardCC").hide();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
	            }
	       		else if($(this).attr("value")=="cardCC")
		        {
	          		$("#cash_and_cardCC").hide();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
	            } 
	          	else if($(this).attr("value")=="cashAndCardCC")
		        {
	          		//$("#cash_and_card").show();
	          		$("#cashAmountDivCC").show();
	          		$("#cardAmountDivCC").show();
	            }
	       });
	   }).change();
		});	
		</script>
	 </div> 
	 </div>
	 </div>
	 
	 
	<div class="row" style="margin-top:10px;">
        <div class="form-group">
			<div class="col-md-2" align="right">
					<label class="control-label" style="font-size: 22px;">Cash Amount </label>
			</div>
			<div class=" row col-md-2">
				 <div class="input-group" style="margin-left: 10px; margin-left: 10px;">
				   <span class="input-group-addon">
				     Rs
			       </span>
					<input type="text" readonly="readonly" class="form-control" id="oldCashAmountCC" style="font-size:20px;height:30px; width: 160px;"/>
				 </div>
				</div> 
				
				<div class="row" id="cashAmountDivCC">
				
				<div class="col-md-3 col-md-offset-6  first">	
						<label class="control-label" style="font-size: 22px; margin-left:40px; margin-top: -26px;">Cash Amount: </label>  
				</div>
						
						<div class="col-md-2 first">	
							<input class="form-control" type="text" name="cashCard_cashAmountCC" id="cashCard_cashAmountCC" placeholder="Cash Amount" style="margin-top:-26px;margin-left: -118px;"/>  
						</div>
				</div>
				</div>
	
		
		 <div class="form-group">
			<div class="col-md-2" align="right">
					<label class="control-label" style="font-size: 22px;">Card Amount </label>
			</div>
			<div class=" row col-md-2">
				 <div class="input-group" style="margin-left: 10px;margin-left: 10px;">
				   <span class="input-group-addon">
				     Rs
			       </span>
					<input type="text" readonly="readonly" class="form-control" id="oldCardAmountCC" style="font-size:20px;height:30px; width: 160px;"/>
				 </div>
				</div> 
				
				<div class="row" id="cardAmountDivCC">
					<div class="col-md-3 col-md-offset-6  first">	
						<label class="control-label" style="font-size: 22px; margin-left:40px; margin-top: -26px;">Card Amount: </label>  
					</div>
							
					<div class="col-md-2 first">	
						<input class="form-control" type="text" name="cashCard_cardAmountCC" id="cashCard_cardAmountCC" placeholder="Card Amount" style="margin-top: -26px;margin-left: -118px;"/>  
					</div>
				</div>
		</div>
		
		 <div class="form-group">
			<div class="col-md-2" align="right">
					<label class="control-label" style="font-size: 22px;">Credit Amount </label>
			</div>
			<div class="row col-md-2">
				 <div class="input-group" style="margin-left: 10px;">
				   <span class="input-group-addon">
				     Rs
			       </span>
					<input type="text" readonly="readonly" class="form-control" id="finalCreditAmountCC" style="font-size:20px;height:30px; width: 160px;"/>
				 </div>
				</div> 
		</div>
		
	</div>

					
		<div class="row">										
			<div class="col-md-offset-5 col-md-3" align="right">
				<label class="control-label" style="font-size: 22px; margin-right: -9px; padding-top: 18px;">Gross Total: </label>
			</div>
			<div class="col-md-2">
				<div class="input-group">
				<span class="input-group-addon">
					       Rs
				         </span>
					<input type="text" class="form-control" id="grossTotalCC" style="font-size:25px;height:55px;background-color: #fab787;" readonly="readonly" />
				</div>
			</div>					
		</div>	
		</div>
	</div>
</div>
			<div class="row" style="margin-top: 20px;">
				<div align="center" class="margin-top-50">
					<button type='button' class="btn btn-success btn-lg bottomButtons" id="creditBtn" onclick="editCreditCustBillValidate();" style="width: 150px;">Submit</button>
					<input type="reset" value="Cancel" onclick="window.location.reload()" class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
				</div>
			</div>
				</form>
			</div>
		</div>
	</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
</body>
<!--  --></html>
