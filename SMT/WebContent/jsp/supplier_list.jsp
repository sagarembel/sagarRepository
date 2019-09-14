<%@page import="java.util.List"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.bean.SupplierListBean"%>

<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name-report">Supplier Detail List</h2>
</div>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="/SMT/staticContent/css/jquery.dataTables.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/css/jquery.dataTables.tableTools.css"
	rel="stylesheet" type="text/css" media="all" />
<script src="/SMT/staticContent/js/jquery.js" type="text/javascript"></script>
<script src="/SMT/staticContent/js/jquery.dataTables.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/js/jquery.dataTables.tableTools.min.js"
	type="text/javascript"></script>
<link href="/SMT/staticContent/css/style.css" rel="stylesheet" />
</head>
<div id="report">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();;
		</script>
</div>
<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#list").dataTable();
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
	    SupplierDetailDao dao=new SupplierDetailDao();
		List lis2=dao.getAllSupplierList();
	%>
	<div id="demo_jui">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>Supplier ID</th>
					<th>Supplier Name</th>
					<th>Address</th>
					<th>Tin No</th>
					<th>City</th>
				</tr>
			</thead>

			<tbody>
				<%
					for(int i=0;i<lis2.size();i++){
				    SupplierListBean empB=(SupplierListBean)lis2.get(i);
				%>
				<tr>
					<td class="align"><%=empB.getSupplierId()%></td>
					<td class="align"><%=empB.getSupplierName()%></td>
					<td class="align"><%=empB.getAddress()%></td>
					<td class="align"><%=empB.getTinNo()%></td>
					<td class="align"><%=empB.getCity()%></td>
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
