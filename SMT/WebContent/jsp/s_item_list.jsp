<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.bean.ItemList"%>
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
<script type="text/javascript">
  			function Back()
  			{
  				window.location = "y_product_detail.jsp" ;
  			}
  		</script>
<body id="dt_example" class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Product List</h2>
			</div>
		</div>
		<%
		ProductDetailDao dao=new ProductDetailDao();
	List list12=dao.getAllMAinItem();
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
							<th>Sr No</th>
							<th>Category Name</th>
							<th>Sub Category Name</th>
							<th>Item Name</th>
							<th>Size</th>
							<th>HSN/SAC No</th>
						</tr>
					</thead>
					<tbody>
						<%
					for(int i=0;i<list12.size();i++){
						ItemList sr=(ItemList)list12.get(i);
				%>
						<tr>
							<td class="align"><%=sr.getSerialnumber()%></td>
							<td class="align"><%=sr.getCategoryName()%></td>
							<td class="align"><%=sr.getSubCatName()%></td>
							<td class="align"><%=sr.getItem_name()%></td>
							<td class="align"><%=sr.getSize()%></td>
							<td class="align"><%=sr.getHsnsacno()%></td>
						</tr>
						<%
					}
				%>
					</tbody>
				</table>
			</div>
		</div>
		<div class="wrapper" align="center">
			<input type="button" value="Back" id="listBtn"
				class="btn btn-primary" onclick="Back()" />
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
