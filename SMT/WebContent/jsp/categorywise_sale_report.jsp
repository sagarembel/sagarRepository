<%@page import="java.util.List"%>
<%@page import="com.smt.bean.CategoryWiseSaleReport"%>
<%@page import="com.smt.dao.CategoryDao"%>
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name-report">Category Wise Sale Report</h2>
</div>
<html>
<head>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<link href="/SMT/WebContent/staticContent/css/dataTa.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/css/jquery.dataTables.tableTools.css"
	rel="stylesheet" type="text/css" media="all" />
<script src="/SMT/staticContent/js/jquery.dataTables.tableTools.min.js"
	type="text/javascript"></script>
</head>
<div id="report">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();
		</script>
</div>
<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#list").dataTable({
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
		                .column( 5 )
		                .data()
		                .reduce( function (a, b) {
		                    return intVal(a) + intVal(b);
		                }, 0 );
		 
		            // Update footer
		            $( api.column( 5 ).footer() ).html(
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

<body id="dt_example">
	<%
		CategoryDao dao=new CategoryDao();
		List lis2=dao.getCategoryWiseSaleReport();
	%>
	<div id="demo_jui">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>Order No</th>
					<th>Item Name</th>
					<th>Category</th>
					<th>Sold Quantity</th>
					<th>MRP</th>
					<th>Sale Total Amount</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th colspan="5" style="text-align: right">Total:</th>
					<th></th>
				</tr>
			</tfoot>
			<tbody>
				<%
					for(int i=0;i<lis2.size();i++){
					CategoryWiseSaleReport catB=(CategoryWiseSaleReport)lis2.get(i);
				%>
				<tr>
					<td class="align"><%=catB.getOrderId()%></td>
					<td class="align"><%=catB.getItemName()%></td>
					<td class="align"><%=catB.getCategoryName()%></td>
					<td class="align"><%=catB.getQuantity()%></td>
					<td class="align"><%=catB.getSalePrice()%></td>
					<td class="align"><%=catB.getTotalAmount()%></td>
				</tr>
				<%
					}
				%>
			</tbody>
		</table>
	</div>
</body>
</html>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>