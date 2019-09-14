
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Salary Adjustments</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/salary_adjustment.jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="salaryAdjustment" method="post" class="form-horizontal">
	<div class="date-field col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<strong>From:</strong> <input type="date" name="date" /> <strong>To:</strong>
		<input type="date" name="date" /> <input class="btn btn-success"
			type="submit" value="Search">
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Id:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="id" placeholder="Id" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Name:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6"
			style="margin-left: -50px">
			<input class="form-control" type="text" name="name"
				placeholder="Name" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Salary Amount:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="salaryAmount"
				placeholder="Salary Amount" />
		</div>
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Advance Salary:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<select class="form-control" name="advanceSalary" id="advanceSalary">
				<option value="selected">--Select--</option>
				<option value="current">Current</option>
				<option value="longTerm">Long Term</option>
			</select>
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Amount Remaining:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6"
			style="margin-left: -50px">
			<input class="form-control" type="text" name="amountGiven"
				placeholder="Amount Remaining" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Reason:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="reason"
				placeholder="Reason" />
		</div>
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Employee Name:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
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
			<div class="rTableHead col-md-2">
				<strong>Id</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Name</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Salary Amount</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Advance Salary </strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Amount Remaining</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Reason</strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
			<div class="rTableCell col-md-2">
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