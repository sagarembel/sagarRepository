<%@page import="com.smt.bean.BillCopy"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.CreditCustBillDao"%>
<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Car Entry</title>
<script src="/SMT/staticContent/js/billCopy.js"></script>
</head>
<body class="vColor">
	<div class="container" style="float: left">
		<div class="row">
			<div align="center" class="col-md-6 col-md-offset-4" style="margin-top: 75px">
				<h2 class="form-name style_heading">Credit Customer Copy</h2>
			</div>
		</div>
		<form action="" method="post" name="genIn">
			<%
 						    CreditCustBillDao fd = new CreditCustBillDao();
							List list = fd.getBillNo();
						%>
			<div class="row" style="margin-top: 25px;">
				<div class="col-md-offset-2">
					<div class="col-md-3 col-md-offset-2" style="
    text-align: right;
">
						<label class="control-label"> Bill Number:</label>
					</div>
					<div class="col-md-3">
						<input list="seedBillNo" id="BillNo" class="form-control">
						<datalist id="seedBillNo"> <%
					               		for(int i=0;i<list.size();i++){
					               			BillCopy billList=(BillCopy)list.get(i);
									%>
						<option data-value="<%=billList.getBillNo()%>"
							value="<%=billList.getBillNo()%>                   <%=billList.getCustName()%> <%=billList.getLastName()%>"
							value1="<%=billList.getCustName()%>"
							value2="<%=billList.getLastName()%>"
							myvalue="<%=billList.getGstNo()%>">
							<%
										}
									%>
						
						</datalist>
					</div>
					<div class="col-md-4 col-md-offset-4" style="margin-top: 25px;"
						align="center">
						<button type="button"
							onclick="validateGenerateBillCOPYForCreditBill()" name="btn"
							class="btn btn-success" style="width: 125px; height: 45px;">Print
						</button>
					</div>
				</div>
			</div>
		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>