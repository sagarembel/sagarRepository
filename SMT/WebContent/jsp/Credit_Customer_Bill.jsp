<%@page import="com.smt.dao.StockDao"%>
<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.OtherBillHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.CreditCustBillDao"%>
<%@page import="java.util.List"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Order Bill</title>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/js/creditCustBill.js"></script>
<style type="text/css">
</style>
<script type="text/javascript">
/* function grasstotal()
{
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount1").value;
	var discountt = document.getElementById("discount").value;
	var regex = /^[0-9\b]+$/;
	
	if(discount.match(regex))
	{}
	else
	{
		myAlert("Enter valid Discount");
		document.getElementById("discount").value = "";
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;
		return false;
	}
	
	if(Number(discount) >= 100)
	{
		myAlert("Discount % must be less than 100");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
		return false;
	}

	if(discount == "")
	{
		document.getElementById("discount").value = "";
		document.getElementById("grossTotal").value = total;
	}
	else{
	
	if(discount!="")
		{
		var gross1 = (+total * +discount)/ 100;
		var gross = +total - +gross1;
		
		document.getElementById("discount").value = gross1;
		if(discount != "0"){
			document.getElementById("grossTotal").value = gross;
		}else{
			document.getElementById("grossTotal").value = total;
		}
		}
	else
		{
		var gross = +total - +discountt;
		//var gross = +total - +gross1;
		
		//document.getElementById("discount").value = gross1;
		if(discount != "0"){
			document.getElementById("grossTotal").value = gross;
		}else{
			document.getElementById("grossTotal").value = total;
		}
		}
	}
} */

/* function taxAmountCalc()
{
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount1").value;
	var discountt = document.getElementById("discount").value;
	var regex = /^[0-9\b]+$/;
	
	if(discountt.match(regex))
	{}
	else
	{
		myAlert("Enter valid Discount");
		document.getElementById("discount").value = "";
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;
		return false;
	}
	
	if(discountt != "")
	{
		var disPer = ((discountt/total)*100);
		document.getElementById("discount1").value = disPer.toFixed(2);
		var gTotal = total - discountt;
		document.getElementById("grossTotal").value = gTotal;		
	}
	if(discountt == "")
	{
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;		
	}
} */

function cheakForCustomer()
{
    <%
    	CustomerDetailsDao custCdo = new CustomerDetailsDao();
   		List custList = custCdo.getAllCustomerForBilling();
	%>
	var creditCustomer = $('#creditCustomer').val();
	if(creditCustomer == null || creditCustomer == "")
	{regcreditcustomerbill();}
	else
	{
		var UpCreditCustomer = creditCustomer.toUpperCase();
		var duplicate;
		<%
			for(int i=0;i<custList.size();i++){
			CustomerDetailsBean cdb = (CustomerDetailsBean)custList.get(i);
		%>		
		    var fName ="<%=cdb.getFirstName()%>";
		    var lName ="<%=cdb.getLastName()%>";
		    var name = fName+" "+lName;
		    var UpName = name.toUpperCase();
			if(UpCreditCustomer == UpName)
			{
				duplicate = "found";
			}
	    <%
			}
		%>
		if(duplicate == "found")
		{regcreditcustomerbill();}
		else
		{
			document.custord.btnSubmit.disabled = true;	
			myAlert("Customer Is Not Registered");			   
			document.custord.btnSubmit.disabled = false;
			return false;
		}
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
<%
    Long BillNo = 1l;
%>
<%
    CreditCustBillDao data = new CreditCustBillDao();
	List stkList  = data.getLastBillNo();
	
	for(int i=0;i<stkList.size();i++){
		BillBean st = (BillBean)stkList.get(i);
		BillNo = st.getBillNo();
		BillNo++;
	}
%>
         
</head>
<body onload="getEmpName(); <!-- getCustomers(); -->" class="vColor">
	<form class="form-horizontal" action="" method="post" name="custord">
		<div class="container-fluid">
			<%-- <h2 align="center" class="form-heading style_heading"
				style="margin-top: 50px;">Credit Customer Bill</h2>
			<h3 align="right" style="color: red; margin-right: 50px;">
				Bill No ::
				<%out.println(BillNo); %>
			</h3> --%>
			
			<div class="row header_margin_top">
			<div class="col-md-3 col-md-offset-4 align" align="center" style="margin-left: 36.333333%;">
				<span class="form-name style_heading" style="font-size: 25px;">Credit Customer Invoice</span>
			</div>
			<div  class="col-md-2 col-md-offset-2 align"    style=" margin-left: 21.666667%;">	
					<span align="right" style="color: red;font-size: 27px;">Bill No :: <%out.println(BillNo); %></span>
					<input type="hidden" readonly="readonly" id="billNo" name="billNo" value=<%=BillNo%>>
			</div>
		</div>
			
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
			
			<div class="row">
				<div class="col-md-2" align="center">
					<label class="control-label" style="font-size: 22px; margin-left: 66px;">Barcode
						no</label>
				</div>

				<div class="col-md-2">
					<input type="text" id="key" class="form-control text-border" onchange="getEmpName(),getitemData1();" autofocus="key" placeholder="Enter Item Barcode" />
				</div>

				<label class="col-md-3 control-label" style="margin-left: 114px;" for="customerName">Customer Name<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
							<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList = cdd.getAllCustomerForBilling();
							%>
						<input list="cust_drop" id="creditCustomer" class="form-control">
						<datalist id="cust_drop"> <%
					           for(int i=0;i<cList.size();i++){
					        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>

						<option data-value="<%=cust.getCustId()%>"
							value="<%=cust.getFirstName() %> <%=cust.getLastName() %>"
							myvalue="<%=cust.getAadhar()%>">
							<%
				      			}
				    		%>
						</datalist>
					</div>
				</div>
			</div>
			<div class="row" style="margin-top: 10px; margin-left: 3px; margin-right: 3px;">
				<div class="col-md-12">
					<div class="row">
						<div class="table-responsive">
							<table id="list4"></table>
							<div id="jqGridPager"></div>
						</div>
					</div>
					<div class="row" style="margin-top: 15px">
						 <div class="form-group">
							<label class="col-md-2 control-label" for="totalQuantity" style="font-size:22px;margin-left: -5px;">Total Quantity<!-- <sup>*</sup> --></label>  
	          					  <div class="col-md-3">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-hand-right"></i>
										</span>
								
							<input type="text" class="form-control" id="totalQtyCredit" style="font-size:22px;height:35px;width:70px;" readonly="readonly"/>
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
							<input type="text" class="form-control" id="totalAmount"
								style="font-size: 22px; height: 35px;" placeholder="Total Amt"
								style="font-size: 22px;" readonly="readonly" />
						</div>
						</div>
					</div>
					</div>
				</div>
				
				
					<div class="row">
					 <div class="form-group">					
						<label class="col-md-3 control-label" style="font-size: 22px; margin-left: -125px;" for="srTransactionId">SR Transaction Id </label>
							
							<div class="col-md-3" style="margin-left: 10px;">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-hand-right"></i>
									</span>
									<input type="text" class="form-control" id="srTransactionId" style="font-size:22px;width:70px;" onkeypress="return isNumber(event)" onchange="getSrCreditAmountForCredit()" style="font-size: 22px;"/>
								 </div> 							
								</div> 
								<div class="row">
							<div class="col-md-2" align="right" style="margin-left: 110px;">
								<label class="control-label" style="font-size: 22px;" >Discount: </label>
							</div>
					
					
						<!-- <div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px;" > Discount: </label>
							</div> -->
							<!-- <div class=" row col-md-1" >
							  <div class="input-group" style="margin-left: 15px;width: 100px;">
							    <span class="input-group-addon">
							     %
						       </span>
								<input type="text" class="form-control" id="discount1" style="font-size:20px;height:30px; " onchange="grasstotal()" style="font-size: 22px;"/>
							 </div> 							
							</div> -->
							<div class=" row col-md-2">
							 <div class="input-group" style="margin-left: 10px;padding-left: 8px;" align="center">
							   <span class="input-group-addon">
							     Rs
						       </span>
								<input type="text" readonly="readonly" class="form-control" id="discount" style="font-size:20px;height:30px;" onchange="taxAmountCalc()" style="font-size: 22px;"/>
							 </div> 
							
							</div> 
					</div>
					</div>
				

				<div class="row">
				
					<div class="col-md-offset-5 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px; margin-left: -5px;" for="totalCreditAmt">Total Credit Amount: </label>
						</div>
					
						 <div class="col-md-2">
						 <div class="input-group">
						   <span class="input-group-addon">
						     Rs
					       </span>
							<input type="text" readonly="readonly" class="form-control" id="totalCreditAmt" style="font-size:20px;" style="font-size: 22px;"/>
						 </div> 
				</div>
			</div>
			
				
					<div class="row">
						<div class="form-group">
							<div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px; padding-top:25px">Gross Total: </label>
							</div>
							<div class="col-md-2">
								<div class="input-group" style="margin-top:10px">
									<span class="input-group-addon">Rs</span>
										<input type="text" class="form-control" id="grossTotal" style="font-size: 25px; height: 55px; background-color: #fab787;" readonly="readonly"/>
								</div>
							</div>
						</div>
					</div>
			
			<div class="row" style="margin-top:10px">
						<div class="col-md-offset-5 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px;">Net Paid Amount: </label>
						</div>
						<div class="col-md-2">
							<div class="input-group">
								<span class="input-group-addon">Rs</span>
								<input type="text" class="form-control" id="paidAmt" style="font-size: 22px; height: 35px;" placeholder="Paid Amt" />
							</div>
						</div>
					</div>				
			

					<div class="row" style="margin-top:10px;">
						<div class="col-md-offset-5 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px; for="creditPaymentMode">Payment Mode:</label> 
						</div> 
           			<div class=" col-md-2" align="right">
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-hand-right"></i></span> 
           					<select class="form-control" id="creditPaymentMode">
								<option value="cash">Cash</option>
								<option value="card">Card</option>
								<option value="cashAndCard">Cash And Card</option>
							</select>	
           				</div>
					</div>	 
	<script>
		$(document).ready(function(){
	  		 $("#creditPaymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           		$("#cash_and_card").hide();
	           	$("#cheque_no").hide(); 
	           	$("#neft_acc_no").hide(); 
	           	$("#card_no").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	          		$("#cash_and_card").hide();
	          		$("#card_no").hide(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	          		$("#cash_and_card").hide();
	           		$("#neft_acc_no").hide(); 	
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	          		$("#cash_and_card").hide();
	            		$("#neft_acc_no").hide(); 
	            		$("#cheque_no").hide();
	            		$("#card_no").hide(); 
	             }
	         	else if($(this).attr("value")=="cashAndCard")
		        {
	          		$("#cash_and_card").show();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
	             }
	       });
	   }).change();
		});	
		</script>
	 </div> 
	 
	 <div class="row " style="margin-top:10px;">

       		<div id="cheque_no" >
				<div class="col-md-3 col-md-offset-5 first">	
					<input class="form-control" type="text" name="chequeNum" id="chequeNum" placeholder="Cheque No." />  
				</div>
				<div class="col-md-3  first">	
					<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck" placeholder="Name On Cheque" />  
				</div>
			</div>
						
			<div id="card_no" class="form-group">
				<div class="col-md-3 col-md-offset-8 first">	
					<input class="form-control" type="text" name="cardNum" id="cardNum" placeholder="Card No." />  
				</div>
			</div>
				
			<div id="neft_acc_no" class="form-group">
				<div class="col-md-3 col-md-offset-5 first">	
					<input class="form-control" type="text" name="accNum" id="accNum" placeholder="Account No." />  
				</div>
				<div class="col-md-3 first">	
					<input class="form-control" type="text" name="bankName" id="bankName" placeholder="Name Of Bank" />  
				</div>
			</div>
				
			<div id="cash_and_card" class="form-group">
				<div class="col-md-2 col-md-offset-6  first">	
						<label class="control-label" style="font-size: 22px; margin-left:40px; padding-bottom:12px">Cash Amount: </label>  
				</div>
				
				<div class="col-md-2 first">	
					<input class="form-control" type="text" name="cashCard_cashAmount" id="cashCard_cashAmount" placeholder="Cash Amount" />  
				</div>
				 	
				<div class="col-md-2 col-md-offset-6 first">	
					<label class="control-label" style="font-size: 22px; margin-left:40px">Card Amount: </label>  
				</div>
			
				<div class="col-md-2 first">	
					<input class="form-control" type="text" name="cashCard_cardAmount" id="cashCard_cardAmount" placeholder="Card Amount" />  
				</div>																								
			</div>		
		</div>

					
					
					<div class="row">					
					<div class="col-md-6">
						 <div class="form-group">
				    <div class="row" style="margin-left: 168px;">
					
							<div class="table-responsive"style="width:50%; height: 100px">
								<table id="srCreditAmtGrid"></table>
								<div id="srJqGridPager"></div>
							</div>
						</div>
					</div>
				</div>		
					
						
					
					</div>	
					</div>
				</div>
			</div>
			<div class="row" style="margin-top: 20px;">
				<div align="center" class="margin-top-50">
					<button type='button' class="btn btn-success btn-lg bottomButtons" id="btnSubmit" onclick="cheakForCustomer();" style="width: 150px;">Print Bill</button>
					<input type="reset" value="Cancel" onclick="window.location.reload()" class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
				</div>
			</div>
		</div>
	</form>
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>
