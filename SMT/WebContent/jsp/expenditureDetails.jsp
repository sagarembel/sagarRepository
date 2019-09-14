<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.ExpenditureDetailsBean"%>
<%@page import="com.smt.dao.ExpenditureDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta charset="utf-8">
<script type="text/javascript"
	src="/SMT/staticContent/js/expenditureDetails.js"></script>
<script type="text/javascript">	
		function cheakForExpenditure()
		{
			<%
				ExpenditureDetailsDao exp = new ExpenditureDetailsDao();
				List cList1 =exp.getAllExpenseNames();
			%>
			var expenditureName = $('#expenseName').val();
    		var upExpenditureName = expenditureName.toUpperCase();
    		var duplicate;
			<%
			for(int i=0;i< cList1.size();i++)
			{
				ExpenditureDetailsBean cat=(ExpenditureDetailsBean)cList1.get(i);
			%>
			var subCat = "<%=cat.getExpenseName()%>";
			var subcatName=document.getElementById("expenseName").value;
			var UpValue = subCat.toUpperCase();
			if(upExpenditureName == UpValue)
			{
					duplicate = "found";
			}
			if(subcatName == subCat){
				alert("Expenditure already exist...Duplicate Not allowed");
				location.reload();
				return false;
			}
			<%
			}
			%>
			if(duplicate == "found"){
    			document.expenseDetails.btn.disabled = true;	
				alert("Expenditure Name Already Exist..!!!");
				location.reload();
				document.expenseDetails.btn.disabled = false;
    			return false;
    		}
		}
	</script>
	
	
<script type="text/javascript">
	function getAllExpenditure()
	{	
		window.location = "expenditureList.jsp";
	}
</script>	
	
</head>
<body class="vColor">
<div class="row header_margin_top">
	<div align="center">
		<h2 class="form-name style_heading">Expenditure Management</h2>
	</div>
</div>
<div class="row">
	<div class="col-sm-offset-1 col-md-10">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>
<div class="container col-sm-offset-2">
	<form class="form-horizontal" method="post" action=""
		name="expenseDetails">
		<!-- Value of 'name' attribute is used in customerDetails.js  -->
		<fieldset>
			<div class="row form-group">
				<label class="col-md-3 control-label" for="expenseName">Expenditure
					Name<sup>*</sup>
				</label>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-hand-right"></i>
						</span>
						<%
							ExpenditureDetailsDao cdd = new ExpenditureDetailsDao();
           						List cList =cdd.getAllExpenseNames();
							%>
						<input list="cat_drop" id="expenseName" class="form-control"
							onchange="cheakForExpenditure()">
						<datalist id="cat_drop">
							<%
					           for(int i=0;i<cList.size();i++)
					           {
					        	   ExpenditureDetailsBean cat=(ExpenditureDetailsBean)cList.get(i);
							%>
							<option data-value="<%=cat.getPkExpenseDetailsId()%>"
								value="<%=cat.getExpenseName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
			</div>
			<div class="form-group row">
				<div class="col-md-10 text-center">
					<input type="button" id="save" name="btn" style="font-size:19px; height: 40px; padding-top: 4px;" class="btn btn-large btn-success glyphicon glyphicon-save  button-height-width" onclick="addExpenseDetails()" value="Submit">
					<input id="save" name="btn" style=" font-size: 19px; height: 40px; padding-top: 4px;" class="btn btn-large btn-danger glyphicon glyphicon-remove-circle  button-height-width" type="reset" onclick="reset()" value="Cancel">
					<input id="list" name="btn" style=" font-size: 19px; height: 40px; padding-top: 4px;" class="btn btn-lg btn-info glyphicon glyphicon-remove-circle  button-height-width" type="button" onclick="getAllExpenditure()" value="List">
				</div>
			</div>
		</fieldset>
	</form>
</div>

<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</body>