<%@page import="java.util.List"%>
<%@page import="com.smt.bean.GetEmployeeDetails"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
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
  				window.location = "employee_detail.jsp" ;
  			}
  		</script>
</head>
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
					],
					 dom: 'Bfrtip',
			         buttons: [
			             'copy', 'csv', 'excel', 'pdf', 'print'
			         ],
				});
					$(tableTools.fnContainer()).insertBefore('#list_wrapper');
			});
	</script>
<body id="dt_example" style="min-height: 300px;" class="vColor">
	<div class="row">
		<div align="center">
			<h2 class="form-name style_heading">Employee List</h2>
		</div>
		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
	</div>
	<%
		EmployeeDetailsDao dao=new EmployeeDetailsDao();
		List list12=dao.getEmployeeList();
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
					<th>Joining Date</th>
					<th>Email Id</th>
					<th>Salary</th>
					<th>Contact No</th>
					<th>Address</th>
					<th>Pin Code</th>
					<th>Resign Date</th>
				</tr>
			</thead>
			<tbody>
				<%
					for(int i=0;i<list12.size();i++)
					{
						GetEmployeeDetails sr=(GetEmployeeDetails)list12.get(i);
				%>
				<tr>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					<td class="align"><%=sr.getJoiningDate()%></td>
					<td class="align"><%=sr.getEmail()%></td>
					<td class="align"><%=sr.getSalary()%></td>
					<td class="align"><%=sr.getContactNo()%></td>
					<td class="align"><%=sr.getAddresst()%></td>
					<td class="align"><%=sr.getZipCode()%></td>
					<td class="align"><%=sr.getResignDateString()%></td>
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
