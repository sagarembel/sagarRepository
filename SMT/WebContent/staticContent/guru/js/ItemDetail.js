function itemDetails(){
	var params= {};
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
	} 
	var itemName= $('#itemName').val();
	var model= $('#model').val();
	var MMCC= $('#MMCC').val();

	var input = document.getElementById('fk_product_id'),
	list = document.getElementById('fk_productId_drop'),
	i,fk_product_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fk_product_id = list.options[i].getAttribute('data-value');
		}
	}
	params["fk_product_id"] = fk_product_id;
	params["itemName"] = itemName;
	params["model"] = model;
	params["MMCC"] = MMCC;
	params["count"] = count;

	params["methodName"] = "doItemDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.itemdel) 
		{
			document.itemdel.reset();
		}
		document.itemdel.btn.disabled = false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

$(document).ready(function () {
	var lastsel;
	rownumbers: true,
	$("#jqGrid").jqGrid({
		editurl: 'clientArray',
		colNames:["Item Name","Price","Quantity","Vat" , "Discount" ,"Total"],
		colModel: [
		           {
		        	   name:  "itemName",
		        	   width: 150,
		        	   editable: true
		           },

		           {
		        	   name: "price",
		        	   idth: 150,
		        	   editable: true 
		           },

		           {
		        	   name: "quantity",
		        	   editable: true,
		        	   width: 150,
		           },

		           {
		        	   name:'vat',
		        	   width: 150,
		        	   editable: true

		           },
		           {
		        	   name:'discount',
		        	   width: 150,
		        	   editable: true

		           },
		           {
		        	   name:'total',
		        	   width: 150,
		        	   editable: true

		           }
		           ],
		           data:[],
		           sortorder : 'desc',
		           loadonce: true,
		           viewrecords: true,
		           width: 800,
		           height: 150,
		           rowNum: 10,
		           pager: "#jqGridPager",
		           'cellEdit':true
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

function ChooseContact(data){
	document.getElementById("itemName").value=(data.options[data.selectedIndex].getAttribute("myid"));
}

function reset()
{
	document.itemdel.reset();
}

function getProduct()
{
	var itemList = "";
	this.getItemList = getItemList;

	function getItemList()
	{
		var input = document.getElementById('fk_product_id'),
		list = document.getElementById('fk_productId_drop'),
		i,fk_product_id;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				fk_product_id = list.options[i].getAttribute('data-value');
			}
		}

		itemparams={};
		productId = fk_product_id;
		itemparams["productId"]= productId;
		itemparams["methodName"] = "getProductNameForItem";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,
				function(data)
				{ 
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				document.getElementById("itemName").value = v.itemName;
				var itemName =  v.itemName;
					});
				}); 
	}
}

var itemby = new getProduct();
