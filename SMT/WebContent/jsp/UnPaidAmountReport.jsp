<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<% boolean isHome=false;%>
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
<script src="/SMT/staticContent/js/cashbankbook.js"></script>
<body class="stock_form_img vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Supplier Balance Report</h2>
			</div>
		</div>
		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
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
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<form action="cashAmount" method="post" class="form-horizontal">
			<div class="row">
				<div class="row form-group" style="margin-top: 20px;margin-left: 300px;">
					<label class="col-md-3 control-label" for="supplier">Supplier
						Name</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="	glyphicon glyphicon-hand-right"></i>
							</span>
							<%
								SupplierDetailDao sdd88 = new SupplierDetailDao();
           						List sList88 =sdd88.getAllSupplier();
							%>
							<input list="sup_drop" id="supplier" class="form-control">
							<datalist id="sup_drop">
								<%
					           for(int i=0;i<sList88.size();i++){
					        	   SupplierDetail sup88 =(SupplierDetail)sList88.get(i);
							%>
								<option data-value="<%=sup88.getSupplierId()%>"
									value="<%=sup88.getSupplierName() %>">
									<%
				      			}
				    		%>
								
							</datalist>
						</div>
					</div>
					<div class="col-md-3">
						<div class="input-group">
							<input type="button" id="btn" name="save"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="getUnBillnoTotalAmount()" value="Search" />
						</div>
					</div>
				</div>
			</div>
			<br>
			<div class="row" align="center">
				<div class="table-responsive" style="width: 500">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="unPaidAmt" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Supplier Name</th>
								<th>UnPaid Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="1" style="text-align: right">Total:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
</body>
</html>
