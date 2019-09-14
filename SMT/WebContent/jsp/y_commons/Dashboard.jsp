<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script
	src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!-- fa fa class -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
.shadow:hover {<!--
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0
		rgba(0, 0, 0, 0.19);
	font-family: 'Lobster', cursive;
	font-shadow: 0 0 3px;
	font-size: 30px;
	-->
}

a {
	font-size: 30px;
}

.font-shadow {
	color: #bdb7b7;
	text-shadow: 1px 1px 2px black, 0 0 25px red, 0 0 5px darkred;
	font-weight: bold;
}

.font-shadow:hover {
	color: #bdb7b7;
	text-shadow: 1px 1px 2px black, 0 0 25px red, 0 0 5px darkred;
	font-weight: bold;
}
</style>
<style>
.dummy {
	margin-top: 100%;
}

.thumbnail {
	background-color: #BDB76B;
	position: absolute;
	top: 15px;
	bottom: 0;
	left: 15px;
	right: 15;
	text-align: center;
	padding-top: calc(50% - 30px);
}

.thumbnail:hover {
	background-color: #dda488;
	position: absolute;
	top: 15px;
	bottom: 0;
	left: 15px;
	right: 15;
	text-align: center;
	padding-top: calc(50% - 30px);
}
</style>
</head>
<div style="background-image: url(6.jpg)">
	<body>
		<div class="container" style="background-color:;">
			<div class="row">
				<div class="col-md-3 col-sm-4 col-xs-6 shadow">
					<div class="dummy"></div>
					<a href="#" class="thumbnail purple font-shadow"
						data-transition="pop"> <i class="fa fa-home"> </i> Home
					</a>

				</div>
				<div class="col-md-3 col-sm-4 col-xs-6 shadow pop2">
					<div class="dummy"></div>
					<a href="#popupNested2" data-rel="popup"
						class="thumbnail purple font-shadow autoview"
						data-transition="pop"> <i class="fa fa-sitemap"></i> Master
					</a>
				</div>

				<!------------------------------------------------------------------------------------------------->

				<div data-role="popup" id="popupNested2" data-theme="none">
					<div data-role="collapsibleset" data-theme="b"
						data-content-theme="a" data-collapsed-icon="arrow-r"
						data-expanded-icon="arrow-d" style="margin: 0; width: 250px;">
						<div data-role="collapsible" data-inset="false">
							<h2>Category</h2>
							<ul data-role="listview">
								<li><a
									href="http://localhost:8080/SMT/jsp/y_category_subcategory.jsp"
									data-rel="dialog">Add Category</a></li>
								<li><a href="#" data-rel="dialog">Category List</a></li>
							</ul>
						</div>
						<!-- /collapsible -->
						<div data-role="collapsible" data-inset="false">
							<h2>Add Products</h2>
							<ul data-role="listview">
								<li><a href="#" data-rel="dialog">Product Details</a></li>
								<li><a href="#" data-rel="dialog">Item List</a></li>
								<li><a href="#" data-rel="dialog">Special Offer</a></li>
								<li><a href="#" data-rel="dialog">Add Shop</a></li>
							</ul>
						</div>
						<!-- /collapsible -->
						<div data-role="collapsible" data-inset="false">
							<h2>Supplier</h2>
							<ul data-role="listview">
								<li><a href="#" data-rel="dialog">Supplier Details</a></li>
								<li><a href="#" data-rel="dialog">Supplier List</a></li>
								<li><a href="#" data-rel="dialog">Edit Supplier</a></li>
								<li><a href="#" data-rel="dialog">Broker Details</a></li>
								<li><a href="#" data-rel="dialog">Broker List</a></li>
							</ul>
						</div>
						<!-- /collapsible -->
						<div data-role="collapsible" data-inset="false">
							<h2>Stock Movement</h2>
							<ul data-role="listview">
								<li><a href="#" data-rel="dialog">Authority Slip</a></li>
								<li><a href="#" data-rel="dialog">Authority Slip Shop
										To Godown</a></li>
								<li><a href="#" data-rel="dialog">Fast Moving Item</a></li>
							</ul>
						</div>
						<!-- /collapsible -->
					</div>
					<!-- /collapsible set -->
				</div>
				<!-- /popup -->
				<!-------------------------------------------------------------------------------------------------->
			</div>
		</div>
	</body>

</div>
</html>