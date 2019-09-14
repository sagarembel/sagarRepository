
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.CustomerOrderHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.CustomerOrderDao"%>
<%@page import="java.util.List"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Order Bill</title>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/customerOrder.js"></script>
<style type="text/css">
</style>
<script>
	     $(document).ready(function(){
		<%CarEntryHelper catHelper = new CarEntryHelper();
			List catList = catHelper.getAllCarNo();%>
	  <%for (int i = 0; i < catList.size(); i++) {
				CarEntry category = (CarEntry) catList.get(i);%>
           var abc = "<%=category.getCarNo()%>";
           var id = "<%=category.getCarNo()%>";
           var name = "<%=category.getCarNo()%>";
    	    var btn = document.createElement("BUTTON");
    	    btn.setAttribute("id", id);
    	    btn.setAttribute("name", name);
    	    btn.setAttribute("value", name);
    	    btn.style.color = "black";
    	    btn.style.background = "red";
    	    btn.style.width = "100px";
    	    btn.style.height = "70px";
    	    btn.style.fontSize= "150%";
    	    var t = document.createTextNode(abc);
    	    btn.appendChild(t);
    	    var foo = document.getElementById("fooBar");
      	    foo.appendChild(btn);
    	      btn.onclick = function() { 
    	    	  var xyz = this.id;
    	    	  <%for (int j = 0; j < catList.size(); j++) {
					CarEntry category1 = (CarEntry) catList.get(j);%>
    		      var ab = "<%=category1.getCarNo()%>";
    	    	  if(xyz == ab){
    	    	  var onerName = "<%=category1.getOwnerName()%>";
    	    	  var contactNo = "<%=category1.getContactNo()%>"; 
    	    	  var carpkID = "<%=category.getPkCarEntryId()%>
	"
								document.getElementById("ownerName").value = onerName;
								document.getElementById("contactNo").value = contactNo;
								document.getElementById("carNo").value = ab;
								document.getElementById("carID").value = carpkID;
								document.getElementById(ab).style.backgroundColor = "green";
								getitemDataByCarNo();
							} else {
								document.getElementById(ab).style.backgroundColor = "red";
							}
<%}%>
	return false;
						};
<%}%>
	return false;
					});
</script>
<script type="text/javascript">
	function grasstotal() {
		var total = document.getElementById("totalAmount").value;
		var discount = document.getElementById("discount").value;
		var gross = +total - +discount;
		document.getElementById("grossTotal").value = gross;
	}

	function grasstotal11() {
		var total = document.getElementById("totalAmount").value;
		var discount = document.getElementById("discount").value;
		var laber = document.getElementById("laberCharges").value;
		if (discount != "") {
			var gross1 = +total - +discount;
			var gross = +gross1 + +laber;
			document.getElementById("grossTotal").value = gross;
		} else {
			var gross = +total + +laber;
			document.getElementById("grossTotal").value = gross;
		}
	}
</script>
<%
	Long BillNo = 1l;
%>
<%
	CustomerOrderDao data = new CustomerOrderDao();
	List stkList = data.getLastBillNo();
	for (int i = 0; i < stkList.size(); i++) {
		BillBean st = (BillBean) stkList.get(i);
		BillNo = st.getBillNo();
		BillNo++;
	}
%>
</head>
<body>
	<form class="form-horizontal" action="" method="post" name="custord">
		<div class="container-fluid">
			<h2 align="center" class="form-heading style_heading"
				style="margin-top: 50px;">Customer Bill</h2>
			<h3 align="right" style="color: red; margin-right: 20px;">
				Bill No ::
				<%
				out.println(BillNo);
			%>
			</h3>
			<div class="row">
				<div class="col-md-2" align="right">
					<label class="control-label" style="font-size: 22px;">Barcode
						No:</label>
				</div>

				<div class="col-md-2">
					<input type="text" id="key" class="form-control text-border"
						onchange="return getitemData(); return false;" autofocus="key"
						placeholder="Enter Item Barcode" />
				</div>

				<div class="col-md-2" align="right">
					<label class="control-label" style="font-size: 22px;">Contact
						No:</label>
				</div>
				<div class="col-md-2">
					<input type="number" class="form-control" id="contactNo"
						placeholder="Contact Number" required
						onchange="return getItemDetailByTable1(); return Activechange(); return false;"
						readonly="readonly" />
				</div>

				<div class="col-md-2" align="right">
					<label class="control-label" style="font-size: 22px;">Owner
						Name:</label>
				</div>
				<div class="col-md-2">
					<input type="text" class="form-control" id="ownerName"
						name="ownerName" placeholder="Owner Name" readonly="readonly" />
				</div>
			</div>

			<div class="row" style="margin-top: 10px;">
				<div class="col-md-2" align="right">
					<label class="control-label" style="font-size: 22px;">Car
						No:</label>
				</div>
				<div class="col-md-2">
					<input type="text" class="form-control" id="carNo" name="carNo"
						placeholder="Car No" readonly="readonly" />
				</div>
			</div>

			<div class="row" style="margin-top: 15px;">
				<div class="col-md-8">
					<div class="row">
						<div class="table-responsive">
							<table id="list4"></table>
							<div id="jqGridPager"></div>
						</div>
					</div>
					<div class="row" style="margin-top: 10px;">
						<div class="col-md-offset-6 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px;">Total
								Amount: </label>
						</div>
						<div class="col-md-3">
							<input type="text" class="form-control" id="totalAmount"
								style="font-size: 22px; height: 35px;" placeholder="Total Amout"
								style="font-size: 22px;" readonly="readonly" />
						</div>
					</div>

					<div class="row" style="margin-top: 10px;">
						<div class="col-md-offset-6 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px;">
								Discount: </label>
						</div>
						<div class="col-md-3">
							<input type="text" class="form-control" id="discount"
								style="font-size: 22px; height: 35px;"
								placeholder="Discount In Rs" autofocus
								onkeyup="return grasstotal(); return false;"
								style="font-size: 22px;" />
						</div>
					</div>

					<div class="row" style="margin-top: 10px;">
						<div class="col-md-offset-6 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px;">
								Laber Charges: </label>
						</div>
						<div class="col-md-3">
							<input type="text" class="form-control" id="laberCharges"
								style="font-size: 22px; height: 35px;"
								placeholder="Charges In Rs" autofocus
								onkeyup="return grasstotal11(); return false;"
								style="font-size: 22px;" />
						</div>
					</div>

					<div class="row" style="margin-top: 10px;">
						<div class="col-md-offset-6 col-md-3" align="right">
							<label class="control-label" style="font-size: 22px;">
								Gross Total: </label>
						</div>
						<div class="col-md-3">
							<input type="text" class="form-control" id="grossTotal"
								style="font-size: 25px; height: 55px;" placeholder="Gross Total"
								readonly="readonly" />
						</div>
					</div>
				</div>

				<div class="col-md-4">
					<span id="fooBar"></span>
				</div>
			</div>
			<input type="hidden" class="form-control" id="carID" name="carID" />
			<div class="row" style="margin-top: 20px;">
				<div align="center" class="margin-top-10">
					<button type='button' class="btn btn-success btn-lg bottomButtons"
						id="btnSubmit" autofocus onclick="return resBill();"
						style="width: 150px;">Print Bill</button>
					<button type='button' class="btn btn-danger btn-lg bottomButtons">Cancel</button>
				</div>
			</div>
		</div>
	</form>
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>
