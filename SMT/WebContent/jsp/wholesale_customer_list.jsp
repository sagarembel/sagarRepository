
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Whole Sale Customer List</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/jsp/wholesale_customer_list.jsp" rel="stylesheet" />

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>

<form action="wholesaleCustomerList" method="post"
	class="form-horizontal">
	<div class="form-group-1">
		<div class="col-lg-12">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Name:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="firstName"
					placeholder="First Name" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<input class="form-control" type="text" name="middleName"
					placeholder="Middle Name" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<input class="form-control" type="text" name="lastName"
					placeholder="Last Name" />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Gender:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="gender">
					<option value="selected">-Select Gender--</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Mobile No.:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="mobileNo."
					placeholder="Mobile No." />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Address:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="address"
					placeholder="Address" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Landmark:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="landmark"
					placeholder="Landmark" />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>State:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="state">
					<option value="selected">-Select State--</option>
					<option value="maharashtra">Maharashtra</option>
					<option value="andhrapradesh">Andhra Pradesh</option>
					<option value="arunachalpradesh">Arunachal Pradesh</option>
					<option value="assam">Assam</option>
					<option value="bihar">Bihar</option>
					<option value="patna">Patna</option>
				</select>
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>District:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="District">
					<option value="selected">-Select District-</option>
					<option value="pune">Pune</option>
					<option value="mumbai">Mumbai</option>
					<option value="nanded">Nanded</option>
					<option value="parbhani">Parbhani</option>
					<option value="aurangabad">Aurangabad</option>
					<option value="latur">Latur</option>
				</select>
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>City/Town:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="cityTown">
					<option value="selected">-Select City/Town-</option>
					<option value="pune">Pune</option>
					<option value="mumbai">Mumbai</option>
					<option value="nanded">Nanded</option>
					<option value="parbhani">Parbhani</option>
					<option value="aurangabad">Aurangabad</option>
					<option value="latur">Latur</option>
				</select>
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Pin Code:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="pCode"
					placeholder="Pin Code" />
			</div>
		</div>
	</div>

	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Sr No</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Customer Name</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Address</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>City</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Contact No</strong>
			</div>
		</div>

		<div class="rTableRow">
			<div class="rTableCell col-md-1">
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
			value="Reset" class="btn btn-lg btn-danger btn-md" />
	</div>

</form>
<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>