
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>

<div class="container">
	<h2 class="form-name">Loyalty Program</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<script src="/SMT/staticContent/js/loyaltyProgram.js"></script>

<div id="date">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();;
		</script>
</div>

<form action="loyaltyProgram" method="post" class="form-horizontal">
	<div class="container">
		<h2 align="left">Personal Details</h2>
	</div>

	<div class="form-group-1">
		<div class="col-lg-12">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Name:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="firstName"
					id="firstName" placeholder="First Name" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<input class="form-control" type="text" name="middleName"
					id="middleName" placeholder="Middle Name" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<input class="form-control" type="text" name="lastName"
					id="lastName" placeholder="Last Name" />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Gender:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="gender" id="gender">
					<option value="selected">-Select Gender--</option>
					<option value="M">Male</option>
					<option value="F">Female</option>
					<option value="O">Other</option>
				</select>
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Marital Status:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="maritalStatus" id="maritalStatus">
					<option value="selected">-Select Status--</option>
					<option value="M">Married</option>
					<option value="U">Unmarried</option>
				</select>
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> DOB:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input type="date" name="dob" id="dob" class="form-control">
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Anniversary:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input type="date" name="anniversary" id="anniversary"
					class="form-control">
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Address:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="address" id="address"
					placeholder="Address" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Landmark:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="landmark"
					id="landmark" placeholder="Landmark" />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>State:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="state" id="state">
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
				<select class="form-control" name="district" id="district">
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
				<select class="form-control" name="city" id="city">
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
				<input class="form-control" type="text" name="pinCode" id="pinCode"
					placeholder="Pin Code" />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Mobile No.:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="mobileNo"
					id="mobileNo" placeholder="Mobile No." />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Email Id:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="emailID" id="emailID"
					placeholder="Email Id " />
			</div>
		</div>
	</div>

	<div class="container">
		<h2 align="left">Card Details</h2>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label>Card Type:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="cardType" id="cardType">
					<option value="selected">-Select Card-</option>
					<option value="gold">Gold</option>
					<option value="silver">Silver</option>
					<option value="na">NA</option>
				</select>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Card Number:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="cardNumber"
					id="cardNumber" placeholder="Card Number " />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Card Points:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="cardPoints"
					id="cardPoints" placeholder="Card Points " />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Voucher:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="voucher" id="voucher"
					placeholder="Voucher" />
			</div>
		</div>
	</div>


	<div class="wrapper">
		<input type="button" value="Save" onclick="lolp()"
			class="btn btn-lg btn-success btn-md" /> <input type="button"
			value="Reset" class="btn btn-lg btn-danger btn-md" />
	</div>

</form>


<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>