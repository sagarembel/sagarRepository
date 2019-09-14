
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Salary Generation</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/salary_genertaion.jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="salaryGeneration" method="post" class="form-horizontal">
	<div class="date-field col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<strong>From:</strong> <input type="date" name="date" /> <strong>To:</strong>
		<input type="date" name="date" /> <input class="btn btn-success"
			type="submit" value="Search">
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6"
			style="margin-right: -80px;">
			<label> Employee Name:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<input type="text" name="employeeName" class="form-control"
				placeholder="Search Employee" />
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 form-button">
			<input type="button" value="Search"
				class="btn btn-lg btn-success btn-md" />
		</div>
	</div>

	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Id</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Name</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Basic Salary</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Attended Days</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Incentives</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Non-Working Days</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Tax</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>PF</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Deduction</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Net Salary</strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-1">
				<input type="text" class="form-control">
			</div>
		</div>
	</div>

	<div class="wrapper">
		<input type="button" value="Save"
			class="btn btn-lg btn-success btn-md" /> <input type="button"
			value="Edit" class="btn btn-lg btn-primary btn-md" />
	</div>

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>