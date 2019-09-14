<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="commons/header.jsp"%>
<div class="container">
	<h2 class="form-name">Add Shop</h2>
</div>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<script src="/SMT/staticContent/js/shopdetail.js"></script>
<div class="custDate">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();;
		</script>
</div>

<form action="shop" method="post" class="form-horizontal">
	<div class="container">
		<div class="row">
			<div class="form-group">
				<div class="col-lg-2 col-md-3 col-sm-6">
					<label>Shop Name:</label>
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<input class="form-control" type="text" name="shopName"
						id="shopName" placeholder="Shop Name" />
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<label>TIN No:</label>
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<input class="form-control" type="text" name="tinNo" id="tinNo"
						placeholder="TIN No " />
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<label>Owner Name:</label>
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<input class="form-control" type="text" name="ownerName"
						id="ownerName" placeholder="Owner Name" />
				</div>
			</div>

			<div class="form-group">
				<div class="col-lg-2 col-md-3 col-sm-6">
					<label>Address:</label>
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<input class="form-control" type="text" name="address" id="address"
						placeholder="Address" />
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<label>Contact Person:</label>
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<input class="form-control" type="text" name="contactPersonName"
						id="contactPersonName" placeholder="Contact Person" />
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<label>Contact No:</label>
				</div>
				<div class="col-lg-2 col-md-3 col-sm-6">
					<input class="form-control" type="text" name="contactNo"
						id="contactNo" placeholder="Contact No " />
				</div>
			</div>
			<div class="wrapper">
				<input type="button" value="Save" onclick="shopdetail1()"
					class="cust btn-lg btn-success btn-md" />
			</div>
		</div>
	</div>
</form>
<%@include file="commons/shortcut.jsp"%>
<%@include file="commons/footer.jsp"%>
