<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
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
<script src="/SMT/staticContent/js/report.js"></script>
<body class="vColor">
	<div class="container-fluid">
		<div class="row">
			<div align="center" style="margin-top: 75px">
				<h2 class="form-name style_heading">Employee Report</h2>
			</div>
			<div class="row">
				<div class="col-sm-offset-1 col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>
		<form class="form-horizontal" method="post" action="" name="fertiBill">
			<fieldset>
				<div class="row form-group">
					<label class="col-md-2 control-label" for="supplier">Employee
						Name</label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="	glyphicon glyphicon-hand-right"></i>
							</span>
							<%
							EmployeeDetailsDao sdd88 = new EmployeeDetailsDao();
           						List sList88 =sdd88.getAllMainEmployeeForEmpReport();
							%>
							<input list="sup_drop7" id="supplier7" class="form-control">
							<datalist id="sup_drop7">
								<%
					           for(int i=0;i<sList88.size();i++){
					        	   EmployeeDetailsBean sup88 =(EmployeeDetailsBean)sList88.get(i);
							%>
								<option data-value="<%=sup88.getEmpId()%>" value="<%=sup88.getFirstName() %> <%=sup88.getLastName() %>">
									<%
				      			}
				    		%>
								
							</datalist>
						</div>
					</div>
				</div>
				<div class="row form-group" style="margin-top: 20px">
					<label class="col-md-2 control-label" for=""> First Date:<sup>*</sup></label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id="firstDate" placeholder="Start Date"
								class="form-control input-md" type="text">
						</div>
					</div>
					<label class="col-md-2 control-label" for="">Last Date:<sup>*</sup></label>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id="secondDate" placeholder="End Date"
								class="form-control input-md ac_district" type="text">
						</div>
					</div>
				</div>
				<div class="row form-group buttons_margin_top ">
					<div align="center">
						<input type="button" id="btn" name="save"
							class="btn btn-lg btn-success btn-md button_hw button_margin_right"
							onclick="employeeNameWiseAndBetweenTwoDates()" value="Search" />
					</div>
				</div>
				<div class="table-responsive">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example4" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Sr No</th>
								<th>Sale Date</th>
								<th>Employee Name</th>
								<th>Bill No</th>
								<th>Barcode No</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Quantity</th>
								<th>Sale Price</th>
								<th>Total Amount</th>
								<!-- <th>Discount</th>
								<th>Gross Amount</th> -->
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="8" style="text-align: right">Total:</th>
								<th></th>
								<th></th>
								<!-- <th></th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
				</div>
			</fieldset>
		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>