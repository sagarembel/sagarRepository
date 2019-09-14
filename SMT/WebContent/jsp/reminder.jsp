
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Reminder</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/cash_bank_book.jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="cashBankBook" method="post" class="form-horizontal">
	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Company Name:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<input type="text" id="companyName" name="companyName"
					class="form-control" placeholder="Company Name">
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Account No:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<input type="text" id="accNo" name="accNo" class="form-control"
					placeholder="Account No">
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Cr/Dr Amount:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<input type="text" id="cdAmount" name="cdAmount"
					class="form-control" placeholder="Cr/Dr Amount">
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Contact Person:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<input type="text" id="contactPerson" name="contactPerson"
					class="form-control" placeholder="Contact Person">
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-2">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Next Reminder Date:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<input type="date" id="reminderDate" name="reminderDate"
					class="form-control"> Set For Every Year
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Narration:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 ">
				<input type="text" id="narration" name="narration"
					class="form-control" placeholder="Narration">
			</div>
		</div>
	</div>

	<div class="wrapper">
		<input type="button" class="btn btn-md btn-lg btn-success"
			value="Save" /> <input type="button"
			class="btn btn-md btn-lg btn-danger" value="Cancel" />
	</div>

	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-2">
				<strong>Company Name</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Account No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Cr/Dr Amount</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Contact Person</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Next Date</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Narration</strong>
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

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>