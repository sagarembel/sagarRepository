<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
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
<script src="/SMT/staticContent/js/currentStock.js"></script>

<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#example").dataTable();
			 var tableTools = new $.fn.dataTable.TableTools(table, {
				 'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
				 	'aButtons':['copy','print','csv',{
					 'sExtends':'xls',
					 'sFileName':'Data.xls',
					 'sButtonText': 'Save to Excel'
						}
					],
					 dom: 'Bfrtip',
			         buttons: [
			             'copy', 'csv', 'excel', 'pdf', 'print'
			         ],
				});
					$(tableTools.fnContainer()).insertBefore('#itemName_wrapper');
			});
	</script>

<body class="stock_form_img vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Barcode Based Inventory</h2>
			</div>
		</div>
		<%
			GoodReciveDao barCWiseStock = new GoodReciveDao();
			List<GoodReceive> notificationProducts=barCWiseStock.getCategoryWiseStock();
		%>
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

		<form action="goodsReturn" method="post" class="form-horizontal">
			<!-- <div class="row">
				<div class="row form-group" style="margin-top: 20px">
					<label class="col-md-3 control-label col-md-offset-2" for=""> Barcode No:<sup>*</sup>
					</label>
					<div class="col-md-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-barcode"></i>
							</span> <input type="text" id="barcode" placeholder="Barcode No"
								class="form-control input-md" type="text">
						</div>
					</div>
					<div class="col-md-3">
						<div class="input-group">
							<input type="button" id="btn" name="save"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="barcodewisestock()" value="Search" />
						</div>
					</div>
				</div>
										<input type="text" style="background: #f0f0f0; border: 2px;" id="testField" readonly="readonly">
			</div> 
			<br> <br>
			--><br> <br>

			<div class="row">
				<div class="table-responsive">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Bill No</th>
								<th>Supplier<br>Name
								<th>Barcode No</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Available Quantity</th>
								<th>Buy Price</th>
								<th>Sale Price</th>
								<th>Tax Percentage</th>
								
							</tr>
						</thead>
						
						<tbody>
						<%
   			   for(int i=0;i<notificationProducts.size();i++){
   				GoodReceive barcodeStock =(GoodReceive)notificationProducts.get(i);
				%>
						<tr>
							<td><%=barcodeStock.getBillNo()%></td>
							<td><%=barcodeStock.getSuppName()%>
							<td><%=barcodeStock.getBarcodeNo()%></td>
							<td><%=barcodeStock.getCatName()%></td>
							<td><%=barcodeStock.getItemName() %></td>
							<td><%=barcodeStock.getQuantity()%></td>
							<td><%=barcodeStock.getBuyPrice()%></td>
							<td><%=barcodeStock.getSalePrice()%></td>
							<td><%=barcodeStock.getVat()%></td>
							
						</tr>
						<%
					}
				%>
					</tbody>
						
					</table>
				</div>
			</div>

		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>






