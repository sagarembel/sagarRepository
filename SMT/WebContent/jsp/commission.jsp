
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Commission</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/commission.jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="commission" method="post" class="form-horizontal">
	<div class="date-field col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<strong>From:</strong> <input type="date" name="date" /> <strong>To:</strong>
		<input type="date" name="date" /> <input class="btn btn-success"
			type="submit" value="Search">
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Name:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="name"
				placeholder="Name" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Id:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6"
			style="margin-left: -50px;">
			<input class="form-control" type="text" name="id" placeholder="Id" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Target Given:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="targetGiven"
				placeholder="Target Given" />
		</div>
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Target Achieved:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="targetAchieved"
				placeholder="Target Achieved" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Productwise Target:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6"
			style="margin-left: -50px;">
			<input class="form-control" type="text" name="productwiseTarget"
				placeholder="Productwise Target" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Period Of Target:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="periodOfTarget"
				placeholder="Period Of Target" />
		</div>
	</div>

	<div class="col-lg-12 form-group-1">
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Total Points:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
			<input class="form-control" type="text" name="totalPoints"
				placeholder="Total Points" />
		</div>

		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
			<label> Incentive Amount:</label>
		</div>
		<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6"
			style="margin-left: -50px;">
			<input class="form-control" type="text" name="incentiveAmount"
				placeholder="Incentive Amount" />
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
				<strong>Name</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Id</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Target Given</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Target Achieved</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Productwise Target</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Period Of Target</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Total Points</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Incentive Amount</strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableCell col-md-2">
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
			<div class="rTableCell col-md-2">
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