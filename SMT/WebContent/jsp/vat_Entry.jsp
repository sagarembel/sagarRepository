
<%@page import="com.smt.hibernate.VatEntry"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.VatEntryDao"%>
<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Car Entry</title>
<!-- <link href="/SMT/staticContent/css/bootstrap.min.css" rel="stylesheet">
<script src="/SMT/staticContent/y_js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/bootstrap.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
-->
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
     <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
     <link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
     <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
     <script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
     <script src="/SMT/staticContent/js/jquery-ui.js"></script>
     <script src="/SMT/staticContent/js/jqueryUi.js"></script>
     <script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
     <script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
	 <script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
     <script src="/SMT/staticContent/y_js/vat_entry.js"></script>    
     
     <script>
     
     function taxList()
 	{
 		window.location="taxList.jsp";
 	}
     
     function taxEdit()
 	{
 		window.location="taxEdit.jsp";
 	}
     
     
     function checkForGst()
     { 
    	 <%
         		VatEntryDao ved = new VatEntryDao();
        		List vatList = ved.getTaxDetailsList();
     	 %>
     	var taxPer = $('#vatPer').val();
     	var vatName = $('#vatName').val();
     	var upVatName = vatName.toUpperCase();
     	if(taxPer == null || taxPer == "" || taxPer == undefined || Number(taxPer) < 0)
     	{vatValidation();}
     	else
     	{
     		var duplicate;
     		<%
     			for(int i=0;i<vatList.size();i++){
     			VatEntry ve = (VatEntry)vatList.get(i);
     		%>		
     		    var availTaxPer ="<%=ve.getVatPercentage()%>";
     		    var availTaxName = "<%=ve.getVatName()%>"
     		    var upavailTaxName = availTaxName.toUpperCase();
     		   
     			if(Number(taxPer) == Number(availTaxPer) && upVatName == upavailTaxName)
     			{
     				duplicate = "found";
     			}
     	    <%
     			}
     		%>
     		if(duplicate == "found")
     		{
     			document.taxForm.btnSubmit.disabled = true;	
     			alert(taxPer+"% Tax Is Already Available");			   
     			document.taxForm.btnSubmit.disabled = false;
     			return false;
     		}
     		else
     		{
     			vatValidation();
     		}
     	}
     }
     </script>
     
           
</head>
<body>
	<div class="container-fluid">
		<!-- <h2 align="center" class="form-heading"
			style="margin-top: 75px; margin-bottom: 25px; font-size: 27px;">Vat Entry</h2> -->
			<div class="row header_margin_top">
				<div class="col-md-2 col-md-offset-5 align" align="center">
					<span class="form-name style_heading" style="font-size: 27px;">Tax Details</span>
				</div>
			</div>
			<form class="form-horizontal" action="" method="post" name="taxForm" id="taxForm">
			<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		
		<div class="row margin-top-50">
				<div class="col-md-offset-2 col-sm-2">
					<label class="control-label" style="margin-left: 70px;">From Price :<sup style="color: red;">*</sup></label>
				</div>
				<div class="col-sm-2">
					<input type="text" class="form-control" id="fromPrice" name="fromPrice" placeholder="From Price" autofocus />
				</div>

				<div class="col-sm-2">
					<label class="control-label" style="margin-left: 40px;">To Price :<sup style="color: red;">*</sup></label>
				</div>
				<div class="col-sm-2"> <input type="text" class="form-control" id="toPrice" name="toPrice" placeholder="To Price" />
				</div>
			</div>
		
		<br/><br/>
			<div class="row margin-top-50">
				<div class="col-md-offset-2 col-sm-2">
					<label class="control-label" style="margin-left: 70px;">Tax Name :<sup style="color: red;">*</sup></label>
				</div>
				<div class="col-sm-2">
				<!-- <input type="text" class="form-control" id="vatName" name="vatName" placeholder="Tax Name" /> -->
						<select class="form-control" id="vatName" name="vatName">
							<option value="GST">GST</option>
							<option value="IGST">IGST</option>
						</select>
				</div>

				<div class="col-sm-2">
					<label class="control-label" style="margin-left: 40px;">Tax Percentage :<sup style="color: red;">*</sup></label>
				</div>
				<div class="col-sm-2">
					<input type="text" class="form-control" id="vatPer" name="vatPer" placeholder="Tax Percentage" />
				</div>
			</div>
			</div>
			<div align="center" class="margin-top-50" style="margin-top: 25px;">
			
			<input type="button" id="btnSubmit" name="btnSubmit" onclick="checkForGst();" value="Save" class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
			<input type="reset" value="Cancel" class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/>
			<input type="button" style="width: 125px;" name="btn" onclick="taxList();" value="List" class="btn btn-lg btn-info btn-md button_hw button_margin_right"/>
			<input type="button" style="width: 125px;" name="btn" onclick="taxEdit();" value="Edit" class="btn btn-lg btn-primary btn-md button_hw button_margin_right"/>
				
			</div>
		</form>
	</div>
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>
