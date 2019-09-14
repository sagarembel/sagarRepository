<%@page import="com.smt.hibernate.Stock"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="java.util.List"%>
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

<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#itemName").dataTable();
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
<body id="dt_example" class="vColor">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Low Inventory Items</h2>
			</div>
		</div>
		<%
		StockDao productForNotification = new StockDao();
			List<Stock> notificationProducts =productForNotification.getAllProductForNotification();
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

		<div class="row" align="center">
			<div class="table-responsive" style="width: 900">
				<table class="table table-bordered table-striped table-condensed cf"
					id="itemName" class="display"
					style="border: 2px solid black; border-collapse: collapse;">
					<thead>
						<tr>
							<th>Category Name</th>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Size</th>
							<th>Update Date</th>
						</tr>
					</thead>
					<tbody>
						<%
   			   for(int i=0;i<notificationProducts.size();i++){
	        	   Stock goodsForNotification =(Stock)notificationProducts.get(i);
				%>
						<tr>
							<td><%=goodsForNotification.getCatName()%></td>
							<td><%=goodsForNotification.getItemName() %></td>
							<td><%=goodsForNotification.getQty2()%></td>
							<td><%=goodsForNotification.getSize()%></td>
							<td><%=goodsForNotification.getDate()%></td>
						</tr>
						<%
					}
				%>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
