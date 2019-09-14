<%@page import="com.smt.bean.GetCreditCustomerDetails"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
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
<html>
<head>
<title>Credit Customer List</title>
<script type="text/javascript">
  			function Back()
  			{
  				window.location = "customer_detail.jsp" ;
  			}
  		</script>
</head>
<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#list").dataTable({

	 			dom: 'Bfrtip',
	 			 buttons: [
	 		          	{
	 		                extend: 'copyHtml5',
	 		                title: 'Credit Customer List'
	 		            },
	 		            {
	 		                extend: 'csvHtml5',
	 		               title: 'Credit Customer List'
	 		            },
	 		            {
	 		                extend: 'excelHtml5',
	 		               title: 'Credit Customer List'
	 		            },
	 		            {
	 		                extend: 'pdfHtml5',
	 		               title: 'Credit Customer List'
	 		            }, /*'print',*/				          
	 		            {
	 		                extend: 'print',
	 		               title: 'Credit Customer List'
	 		            },
	 		          ],


	 			});
			 var tableTools = new $.fn.dataTable.TableTools(table, {
				  'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
				 	'aButtons':['copy','print','csv',
					{
					 'sExtends':'xls',
					 'sFileName':'Data.xls',
					 'sButtonText': 'Save to Excel'
					}
					],
					 /* dom: 'Bfrtip',
					 buttons: [
				          	{
				                extend: 'copyHtml5',
				                title: 'Supplier List'
				            },
				            {
				                extend: 'csvHtml5',
				                title: 'Supplier List'
				            },
				            {
				                extend: 'excelHtml5',
				                title: 'Supplier List'
				            },
				            {
				                extend: 'pdfHtml5',
				                title: 'Supplier List',
				            }, /*'print',*/				          
				            /*{
				                extend: 'print',
				                title: 'Supplier List',
				            },
				          ], */
				});
					$(tableTools.fnContainer()).insertBefore('#list_wrapper');
			});
	</script>

<body id="dt_example" style="min-height: 300px;" class="vColor">
	<div class="row" style="margin-top: 70">
		<div align="center">
			<h2 class="form-name style_heading">Credit Customer List</h2>
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
	</div>
	<%
	CustomerDetailsDao dao=new CustomerDetailsDao();
	List list12=dao.getCreditCustomerList();
	%>
	<div id="date">
		<label id="demo"></label>
		<script>
			var date = new Date();
			document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>

	<div id="demo_jui">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>Fist Name</th>
					<th>Middle Name</th>
					<th>Last Name</th>
<!-- 					<th>GSTTIN/UIN No</th> -->
					<th>Contact No</th>
					<th>Email Id</th>
					<th>Address</th>
					<th>Pin Code</th>
				</tr>
			</thead>

			<tbody>
				<%
					for(int i=0;i<list12.size();i++){
						GetCreditCustomerDetails sr=(GetCreditCustomerDetails)list12.get(i);
				%>
				<tr>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					<%-- <td class="align"><%=sr.getAadhar()%></td> --%>
					<td class="align"><%=sr.getContactNo()%></td>
					<td class="align"><%=sr.getEmail()%></td>
					<td class="align"><%=sr.getAddress()%></td>
					<td class="align"><%=sr.getZipCode()%></td>
				</tr>
				<%
					}
				%>
			</tbody>
		</table>
	</div>
	<div class="wrapper" align="center">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary"
			onclick="Back()" />
	</div>
</body>
</html>
