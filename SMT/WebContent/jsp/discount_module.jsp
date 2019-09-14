

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<script type="text/javascript">
	function show() {
		document.getElementById('area').style.display = 'block';
	}
	function hide() {
		document.getElementById('area').style.display = 'none';
	}
</script>

<div class="container">
	<h2 class="form-name">Discount Module</h2>
</div>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/css/adi.css"></script>
<link href="/SMT/staticContent/js/discountModule.js">

<div id="date">
	<label id="demo"></label>
	<script>
		var date = new Date();
		document.getElementById("demo").innerHTML = date.toDateString();
		;
	</script>
</div>


<form action="diss" method="post" class="form-horizontal">
	<div class="col-lg-12">
		<div class="col-lg-12 form-group-1" style="padding-bottom: 0px;">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Search:</label>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 first">
				<input type="text" class="form-control" name="Search"
					placeholder="Search" style="padding-left: 123px;" />
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 form-button">
				<input type="button" value="Search"
					class="btn btn-lg btn-success btn-md" />
			</div>
		</div>

		<div class="col-lg-6 form-group-1">
			<div class="col-lg-1 col-md-1 col-sm-1 col-xs-6"
				style="margin-left: 227px;">
				<input type="radio" name="search item" value="Barcode"
					onclick="show();" checked /> Barcode
			</div>
			<div>
				<textarea id="area" style="display: none;" NAME="data" ROWS=1
					COLS=12></textarea>
			</div>
			<div class="col-lg-1 col-md-1 col-sm-1 col-xs-6"
				style="margin-left: 30px;">
				<input type="radio" name="search item" value="Category"
					onclick="hide();" /> Category
			</div>
			<div class="col-lg-1 col-md-1 col-sm-1 col-xs-6"
				style="margin-left: 41px;">
				<input type="radio" name="search item" value="Price"
					onclick="show();" /> Price
			</div>
			<div>
				<textarea id="area" style="display: none;" NAME="data" ROWS=1
					COLS=12></textarea>
			</div>
			<div class="col-lg-1 col-md-1 col-sm-1 col-xs-6"
				style="margin-left: 7px;">
				<input type="radio" name="search item" value="Name"
					onclick="hide();" /> Name
			</div>
		</div>
	</div>


	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Item Id:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="itemId"
					placeholder="Item Id" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Item Name:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name="itemName"
					placeholder="Item Name" />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Price/Quantity:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name=" priceQuantity"
					placeholder="Price/Quantity" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Discount Type:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<select class="form-control" name="discountType" id="discountType">
					<option value="selected">--Select--</option>
					<option value="Y">Y</option>
					<option value="N">N</option>
				</select>
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label class="first"> Discounted Price / Quantity:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text"
					name=" discountedPrice/Quantity"
					placeholder="Discounted Price/Quantity" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> New Price:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="text" name=" newPrice"
					placeholder="New Price" />
			</div>
		</div>
	</div>

	<div class="col-lg-12">
		<div class="form-group-1">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> Start Date:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="date" name=" startDate"
					placeholder=" Start Date" />
			</div>

			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
				<label> End Date:</label>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 first">
				<input class="form-control" type="date" name=" endDate"
					placeholder="End Date" />
			</div>
		</div>
	</div>

	<div class="rTable">
		<div class="rTableRow">
			<div class="rTableHead col-md-1">
				<strong>Item Id</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Item Name</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Purchase Qty/Price</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Discount Qty/Price</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>New Rate</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>Start Date</strong>
			</div>
			<div class="rTableHead col-md-1">
				<strong>End Date</strong>
			</div>
			<div class="rTableHead col-md-2">
				<strong>Delete/Edit Symbol(Action)</strong>
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
			<div class="rTableCell col-md-2">
				<input type="text" class="form-control">
			</div>
		</div>
	</div>


	<div class="wrapper">
		<input type="button" value="Submit"
			class="btn btn-lg btn-success btn-md" onclick="discountModule()" />
		<input type="button" value="Cancel"
			class="btn btn-lg btn-danger btn-md" />
	</div>

</form>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>