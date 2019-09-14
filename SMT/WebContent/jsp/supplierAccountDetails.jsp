<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Cash Bank Book Supplier</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/cashbankbook.js"></script>
<script src="/SMT/staticContent/js/supplierpayments.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<div id="date">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();;
		</script>
</div>
<form action="cashBankBook" name="cashboook" method="post"
	class="form-horizontal">
	<div class="col-lg-12">
		<div class="form-group-2">
			<%
			SupplierDetailDao dao = new SupplierDetailDao();
	     	List supList = dao.getAllSupplier();
		%>
			<div class="col-lg-12">
				<div class="form-group-2">
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
						<label>Supplier:</label>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
						<input list="sup_drop" id="supplier"
							onchange="bill.getAllBills();" class="form-control">
						<datalist id="sup_drop">
							<%
				               			for(int i=0;i<supList.size();i++){
										SupplierDetail supD=(SupplierDetail)supList.get(i);
									%>
							<option data-value="<%=supD.getSupplierId()%>"
								value="<%=supD.getSupplierName() %>">
								<%
					}
				%>
							
						</datalist>
					</div>
				</div>
			</div>
			<div class="col-lg-12">
				<div class="form-group-2">
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
						<label> Bill No:</label>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
						<select class="form-control" id='billNo' name="billNo">
							<option value="">Select Bill</option>
						</select>
					</div>
				</div>
			</div>

			<div class="col-lg-12">
				<div class="form-group-2">
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
						<label>Total Amount:</label>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
						<input type="text" id="totalAmount" name="totalAmount"
							class="form-control" placeholder="Total Amount">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="wrapper" style="">
		<input type="button" class="btn btn-md btn-lg btn-success" name="btn"
			value="Save" onclick="supllierPayment()" /> <input type="button"
			class="btn btn-md btn-lg btn-danger" onclick="reset()" value="Cancel" />
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>