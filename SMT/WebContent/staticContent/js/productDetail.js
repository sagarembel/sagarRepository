function productdel(){
	document.getElementById("btn").disabled = true;
	var params= {};
	var itemName= $('#itemName').val();
	var isVat=$('#isVat').val();
	var vatPercentage=$('#vatPercentage').val();
	var fkSubCatId=$('#fkSubCatId').val();
	var model= $('#model').val();
	var MMCC= $('#MMCC').val();

	var input = document.getElementById('fkShopId1'),
	list = document.getElementById('fkShopId1_drop'),
	i,fkShopId1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkShopId1 = list.options[i].getAttribute('data-value');
		}
	}
	var input = document.getElementById('fkSupplierId'),
	list = document.getElementById('fkSupplierId_drop'),
	i,fkSupplierId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkSupplierId = list.options[i].getAttribute('data-value');
		}
	}
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');
		}
		var catId=catId;
	}
	var namePresent;
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var fff=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var color = allRowsInGrid[i].color;
		params["color"+i]=color;
		var size = allRowsInGrid[i].size;
		params["size"+i]=size;
		var buyPrice = allRowsInGrid[i].buy_Price;
		params["buyPrice"+i]=buyPrice;
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice"+i]=salePrice;
		var discount = allRowsInGrid[i].discount;
		params["discount"+i]=discount;
		var comission = allRowsInGrid[i].comission;
		params["comission"+i]=comission;
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i]=quantity;
	}

	params["itemName"] = itemName;
	params["isVat"] = isVat;
	params["vatPercentage"] = vatPercentage;
	params["fkSupplierId"] =fkSupplierId;
	params["catId"] =catId;
	params["fkSubCatId"] =fkSubCatId;
	params["fkShopId1"] =fkShopId1;
	params["model"] = model;
	params["MMCC"] = MMCC;
	params["count"] = count;
	params["methodName"] = "doProductDetail";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		location.reload();
		document.getElementById("btn").disabled = false;
		document.prod.reset();
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function modifypRODUCT(){

	var pkProductId= $('#pkProductId').val();
	var itemName= $('#itemName').val();
	var commision=$('#commision').val();
	var isVat=$('#isVat').val();
	var vatPercentage=$('#vatPercentage').val();
	var isalternateprod=$('#isalternateprod').val();
	var isItem=$('#isItem').val();
	var params= {};
	params["pkProductId"] = pkProductId;
	params["itemName"] = itemName;
	params["isVat"] = isVat;
	params["vatPercentage"] = vatPercentage;
	params["isalternateprod"] = isalternateprod;
	params["commision"] = commision;
	params["isItem"] = isItem;

	params["methodName"] = "modifyProductDetail";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function POHelper()
{

	this.getSubCategories = getSubCategories;
	this.fillItemList = fillItemList;

	function fillItemList()
	{
		var mainCat = $("#catId").val();
		var subcat = $("#fkSubCatId").val();
	}
	function getSubCategories()
	{
		var input = document.getElementById('catId'),
		list = document.getElementById('catId_drop'),
		i,catId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catId = list.options[i].getAttribute('data-value');
			}

			var mainCat = catId;
		}
		$("#subCat").empty();
		$("#fkSubCatId").append($("<option></option>").attr("value","").text("Select subcategory"));
		var params= {};
		params["methodName"] = "getSubCategoriesByRootcategory";
		params["catId"]= mainCat;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				$("#fkSubCatId").append($("<option></option>").attr("value",i).text(v.subCatName)); 

					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}
}

$(document).ready(function () {
	var lastsel;
	rownumbers: true,

	$("#jqGrid").jqGrid({
		editurl: 'clientArray',
		colNames:["Color","Size","BuyPrice","SalePrice","Discount","Comssion","Quantity"],

		colModel: [
		           {
		        	   label: 'Color',
		        	   name:  "color",
		        	   width: 150,
		        	   editable: true
		           },

		           {
		        	   label: 'Size',
		        	   name: "size",
		        	   idth: 150,
		        	   editable: true 
		           },

		           {
		        	   label : 'BuyPrice',
		        	   name: "buy_Price",
		        	   editable: true,
		        	   width: 150,

		           },

		           {
		        	   label: 'SalePrice',	
		        	   name:'salePrice',
		        	   width: 150,
		        	   editable: true

		           },

		           {
		        	   label: 'Discount',	
		        	   name:'discount',
		        	   width: 150,
		        	   editable: true

		           },

		           {
		        	   label: 'Comission',	
		        	   name:'comission',
		        	   width: 170,
		        	   editable: true

		           },

		           {
		        	   label: 'Quantity',	
		        	   name:'quantity',
		        	   width: 150,
		        	   editable: true

		           }
		           ],

		           data:[],
		           sortorder : 'desc',
		           loadonce: true,
		           viewrecords: true,
		           width: 1200,
		           height: 500,
		           rowNum: 10,
		           pager: "#jqGridPager"
	});

	$('#jqGrid').navGrid('#jqGridPager',
			// the buttons to appear on the toolbar of the grid
			{ edit: true, add: true, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
			// options for the Edit Dialog
			{
				editCaption: "The Edit Dialog",
				recreateForm: true,
				checkOnUpdate : true,
				checkOnSubmit : true,
				closeAfterEdit: true,
				errorTextFormat: function (data) {
					return 'Error: ' + data.responseText
				}
			},
			// options for the Add Dialog
			{
				closeAfterAdd: true,
				recreateForm: true,
				errorTextFormat: function (data) {
					return 'Error: ' + data.responseText
				}
			},
			// options for the Delete Dailog
			{
				closeAfterdel:true,
				recreateForm: true,

				errorTextFormat: function (data) {
					return 'Error: ' + data.responseText
				},
				onSelectRow: function(id) {
					if (id && id !== lastSel) {
						jQuery("#jqGrid").saveRow(lastSel, true, 'clientArray');
						jQuery("#jqGrid").editRow(id, true);
						lastSel = id;
						console.log(id);
					}
				}
			});

});

function disable(){

	if(document.itemdel.itemName.value !== "")
	{
		document.itemdel.itemName.disabled = true;
		return false;
	}	

}

function reset()
{
	window.location.reload();
}
var pohelper = new POHelper();