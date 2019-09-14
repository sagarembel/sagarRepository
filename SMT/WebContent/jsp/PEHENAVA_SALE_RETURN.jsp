<%@page import="com.smt.hibernate.Stock"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="com.smt.hibernate.OtherBill"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="java.util.List"%>
<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>


<%-- <!-- user id for cashiar accountant use -->

<% 
					 String type2= "";
                     String name2 = "";
		             if (session != null) {
			         if (session.getAttribute("user") != null) {
				     name2 = (String) session.getAttribute("user");
				     System.out.println(" hi this sis vikas Please Login +++++++++++++++++++++++++++++++"+name2);
		              HibernateUtility hbu1=HibernateUtility.getInstance();
		              Session session2=hbu1.getHibernateSession();
		   
		              org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
		              query1.setParameter("name2", name2);
		              UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
		              type2 = userDetail1.getTypeId();
		              System.out.println(" hi this sis vikas Please Login +++++++++++++++++++++++++++++++"+type2);
		              session.setAttribute("uType", type2);
					  Long uid = userDetail1.getPkUserId();
					  session.setAttribute("uId", uid);
					  System.out.println(" hi this sis vikas Please Login +++++++++++++++++++++++++++++++"+uid);
			         } 
			         else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
		           }
		             else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
 %> --%>
<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.OtherBillHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.OtherBillDao"%>
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
     <script src="/SMT/staticContent/js/otherOrder.js"></script>         
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
		alert("Discount % must be less than 100");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
		return false;
	}
	if(discount == "")
	{
		document.getElementById("discount").value = "";
		document.getElementById("discount").value = "";
		document.getElementById("grossTotal").value = total;
	}
	else
	{
	if(discount != "")
	{
		var gross1 = (+total * +discount)/ 100;
		var gross = +total - +gross1;
		
		document.getElementById("discount").value = gross1.toFixed(2);
		if(discount != "0")
		{
			document.getElementById("grossTotal").value = gross.toFixed(2);
		}
		else
		{
			document.getElementById("grossTotal").value = total;
		}
	}
	else
	{
		var gross = +total - +discountt;
		//var gross = +total - +gross1;
		
		//document.getElementById("discount").value = gross1;
		if(discount != "0")
		{
			document.getElementById("grossTotal").value = gross.toFixed(2);
		}else{
			document.getElementById("grossTotal").value = total;//.toFixed(2);
		}
		}
	}
} */

function taxAmountCalc()
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
	
	if(Number(discountt) >= Number(total))
	{
		alert("Discount Amount must be less Than Total Amount");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
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
}
</script>

     <%
        Long BillNo = 1l;
	 %>
	 <%
	    OtherBillDao data = new OtherBillDao();
		List stkList  = data.getLastBillNo();
		for(int i=0;i<stkList.size();i++)
		{
			BillBean st = (BillBean)stkList.get(i);
			BillNo = st.getBillNo();
			BillNo++;
		}      
     %>
      
</head>
   <body class="purchase_form_img vColor" onload="getEmpName()">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div class="col-md-2 col-md-offset-5 align" align="center">
				<span class="form-name style_heading" style="font-size: 27px;">Tax Invoice</span>
			</div>
			<div  class="col-md-2 col-md-offset-3 align">	
					<span align="right" style="color: red;margin-right: 130px;font-size: 27px;">Bill No :: <%out.println(BillNo); %></span>
					<input type="hidden" readonly="readonly" id="billNo" name="billNo" value=<%=BillNo%>>
			</div>
		</div>

		<div class="row">
		
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

<form class="form-horizontal" action="" method="post" name  ="custord">
				<div class="row">
			        <div class="form-group">
						<label class="col-md-3 control-label" for="customerName" style="font-size:22px;">Customer Name<!-- <sup>*</sup> --></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
							<%
								System.out.println("LOGIN TYPE ===> "+type1);
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList =cdd.getAllMiscellaneousCustomer();
							%>
						<input list="cust_drop" id="creditCustomer1"  class="form-control">
				         <datalist id="cust_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   OtherBill cust =(OtherBill)cList.get(i);
							%>
						<option data-value="<%=cust.getPkBillId()%>" value="<%=cust.getCreditCustomer1()%>">
							<%
				      			}
				    		%>
						</datalist> 
				    </div>
           			</div>
					     
					     <div class="col-sm-2" align="center">
							<label class="control-label" style="font-size:22px; margin-left: 70px;">Mobile No:</label>
						</div>
						<div class="col-md-2">
						  <div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
						    <input type="text" id="mobileNo" class="form-control text-border" placeholder="Enter Mobile No" maxlength="10"/>
					     </div>	
					     </div>
					 </div> 
				</div>
	
			      <div class="row">
			        <div class="form-group">
						<div class="col-sm-2 col-sm-offset-1" align="center">
							<label class="control-label" style="font-size:22px; margin-left: 71px;">Bill No</label>
						</div>
						
						<div class="col-md-2">
						  <div class="input-group">
							<span class="input-group-addon">
							<i	class="glyphicon glyphicon-hand-right"></i>
							</span> 
						    <input type="text" id="key" class="form-control text-border"  autofocus="key" placeholder="Enter Item Barcode" onchange="getEmpName(),getitemData1();"/>
					     </div>	
					     </div>
					     <%-- <div class="col-sm-2" align="center">
					     <label class=" control-label" style="font-size:22px;">Employee Name<sup>*</sup></label> 
					     </div>
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
							<%
							EmployeeDetailsDao edd = new EmployeeDetailsDao();
           						List eList =edd.getAllMainEmployee();
							%>
						<input list="emp_drop" id="employee1"  class="form-control" >
				         <datalist id="emp_drop">
							<%
					           for(int i=0;i<eList.size();i++){
					        	   EmployeeDetailsBean emp =(EmployeeDetailsBean)eList.get(i);
							%>
						<option data-value="<%=emp.getEmpId()%>" value="<%=emp.getFirstName() %> <%=emp.getLastName() %>">
							<%
				      			}
				    		%>
						</datalist> 
				    </div>
           			</div> --%>
					 </div> 
				</div>	
				
				
		
				<div class="row" style="margin-top: 10px; margin-left: 20px;">
				    <div class="form-group">
					<div class="col-md-12">
						<div class="row">
							<div class="table-responsive">
								<table id="list4"></table>
								<div id="jqGridPager"></div>
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
						
						<div class="row" style="margin-top:10px;">
						
							<div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px;" > Discount: </label>
							</div>
							<!-- <div class=" row col-md-1" >
							 <div class="input-group" style="margin-left: 15px;width: 100px;">
							   <span class="input-group-addon">
							     %
						       </span>
								<input type="text" class="form-control" id="discount1" style="font-size:20px;height:30px; " onchange="grasstotal(); callAfterSave()" style="font-size: 22px;"/>
							 </div> 							
							</div>  -->
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
							<div class="col-md-offset-5 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px; for="paymentMode"> Payment Mode:</label> 
							</div> 
	           				<div class=" col-md-2" align="right">
							<div class="input-group">
								<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
	           					<select class="form-control" id="paymentMode">
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
										<option value="card">Card</option>
										<option value="neft">NEFT</option>
								</select>	
	           				</div>
						</div>
	 
	<script>
		$(document).ready(function(){
	  		 $("#paymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque")
		        {
		           	$("#cheque_no").show(); 
		           	$("#neft_acc_no").hide(); 
		           	$("#card_no").hide();
	           	}
	          	 else if($(this).attr("value")=="card")
		        {
	          		$("#card_no").show(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	            }
	          	else if($(this).attr("value")=="neft")
		        {
	           		$("#neft_acc_no").show(); 	
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
	            }
	          	else if($(this).attr("value")=="cash")
		        {
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
				</div>
						<div class="row" style="margin-top:10px;">
							<div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px;" > Gross Total: </label>
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
						<button type='button' class="btn btn-success btn-lg bottomButtons" id="btnSubmit" onclick="resotherbill();" style="width:150px;">Print Bill</button>
						<!-- <button type='button' class="btn btn-primary btn-lg bottomButtons" id="newBill"  onclick="window.open('newBillTaxInvoice.jsp')" style="width:150px;">New Bill</button> -->
						<input type="reset" value="Cancel" onclick="window.location.reload()" class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/>
					</div>
				  </div>	
				</div> 
		</form>		
		</div>
  </body>
        <div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> 
</html>
