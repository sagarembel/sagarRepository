function categoryd(){
	category();
}
function category(){
	document.cat.btn.disabled = true;
	var categoryName= $('#categoryName').val();
	var activeYn = $('#activeYn').val();
	var isleafCat=$('#isleafCat').val();
	var isrootCat=$('#isrootCat').val();

	var params= {};

	params ["categoryName"] = categoryName;
	params ["activeYn"] = activeYn;
	params ["isleafCat"] = isleafCat;
	params ["isrootCat"] = isrootCat;

	params["methodName"] = "regCategory";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);
		window.location.reload();
		document.cat.btn.disabled = false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function catkHelper()
{
	var offerList="";
	this.getAllCategory = getAllCategory;
	this.fillCategoryList = fillCategoryList;
	function fillCategoryList()
	{
		var categoryName = $("#categoryName").val();
	}
	function getAllCategory()
	{
		var params= {};
		params["methodName"] = "getAllCategoryReport";
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			alert(data)
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				var categoryName =v.categoryName;
				jsonData[jsonData]={categoryName:""};
				$("#list4").jqGrid({
					datatype: "local",
					height: 100,
					colNames:['categoryName', ],
					colModel:[
					          {name:'categoryName',
					        	  width:140  
					          }
					          ],
					          sortname: 'ID',
					          sortorder : 'desc',
					          loadonce: true,
					          viewrecords: true,
					          caption: "Category table",
				});
				$("#list4").addRowData(i,jsonData[i]);
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
						$(loaderObj).hide();
						$(loaderObj).find('#errorDiv').show();
					}
				});
	}
}
var category11 = new catkHelper();
