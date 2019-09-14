<%@page import="java.util.List"%>
<%@page import="com.smt.bean.SupplierWiseSaleReport"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/y_js/jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jqueryUi.js"></script>
<link href="/SMT/WebContent/staticContent/y_css/dataTa.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/y_css/jquery.dataTables.tableTools.css"
	rel="stylesheet" type="text/css" media="all" />
<script
	src="/SMT/staticContent/y_js/jquery.dataTables.tableTools.min.js"
	type="text/javascript"></script>
<body id="dt_example" class="master_form_img">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Supplier Wise Sale Report</h2>
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
		<script type="text/javascript"> 
		$(document).ready(function () {
 	var table=$("#list").dataTable(
		 {
	        	 fnRowCallback : function(nRow, aData, iDisplayIndex){
		                $("th:first", nRow).html(iDisplayIndex +1);
		               return nRow;
		            },
				
				 "footerCallback": function ( row, data, start, end, display ) {
			            var api = this.api(), data;
			 
			            // Remove the formatting to get integer data for summation
			            var intVal = function ( i ) {
			                return typeof i === 'string' ?
			                    i.replace(/[\$,]/g, '')*1 :
			                    typeof i === 'number' ?
			                        i : 0;
			            };
			            // Total over this page       
			            pageTotal1 = api
		                .column( 6 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 6 ).footer() ).html(
		                'Rs'+' '+pageTotal1
		            );
		            console.log( pageTotal1);
			        }
	         });
 
		 	var tableTools = new $.fn.dataTable.TableTools(table, {
				'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
				'aButtons':['copy','print','csv',{
				'sExtends':'xls',
				'sFileName':'Data.xls',
				'sButtonText': 'Save to Excel'
					}
	        	]
	     	});
				 $(tableTools.fnContainer()).insertBefore('#list_wrapper');
			});
	 </script>
		<%
		SupplierDetailDao dao=new SupplierDetailDao();
		List lis1=dao.getSupplierWiseSaleReport();
	%>
		<div class="row">
			<div class="table-responsive">
				<table id="list" class="display" border="1">
					<thead>
						<tr>
							<th>Order No</th>
							<th>Supplier Name</th>
							<th>Item Name</th>
							<th>Category</th>
							<th>Sold Quantity</th>
							<th>MRP</th>
							<th>Total Sale Amount</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="5" style="text-align: right">Total:</th>
							<th></th>
							<th></th>

						</tr>
					</tfoot>
					<tbody>
						<%
					for(int i=0;i<lis1.size();i++){
					SupplierWiseSaleReport supp1=(SupplierWiseSaleReport)lis1.get(i);
				%>
						<tr>
							<td><%=supp1.getOrderId()%></td>
							<td><%=supp1.getSupplierName()%></td>
							<td><%=supp1.getItemName()%></td>
							<td><%=supp1.getCategoryName()%></td>
							<td><%=supp1.getQuantity()%></td>
							<td><%=supp1.getSalePrice()%></td>
							<td><%=supp1.getTotalAmount()%></td>
						</tr>
						<%
					}
				 %>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row margin_shortcut">
			<div class="col-sm-12">
				<%@include file="y_commons/shortcut.jsp"%>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>