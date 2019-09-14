function POHelper()

{
	var tableVals= {};
	this.getSubCategories = getSubCategories;
	this.getItems=getItems;
	this.getCategoryBySupplier=getCategoryBySupplier;

	this.fillItemList = fillItemList;

	//var items="";

	function fillItemList()
	{
		var mainCat = $("#catId").val();
		var subcat = $("#subCat").val();
	}




	/********************************** code for GET ITEM DETAILS BY CATEGORY*******************************************/
	function getSubCategories()
	{

		var catId = $("#catId").val();
		$("#subCat").empty();
		$("#subCat").append($("<option></option>").attr("value","").text("Select subcategory"));
		var params= {};
		params["methodName"] = "getSubCategoriesByRootcategory";
		params["catId"]= catId;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				$("#subCat").append($("<option></option>").attr("value",i).text(v.subCatName)); 

					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	}



	function getItems()
	{

		var input = document.getElementById('supplierId'),
		list = document.getElementById('supplierId_drop'),
		i,supplierId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplierId = list.options[i].getAttribute('data-value');
			}

			var supplierId = supplierId;
		}

		var subCat = $("#subCat").val();
		//$("#subCat").empty();
		var catId = $("#catId").val();
		$("#itemId").empty();
		$("#itemId").autocomplete($("<option></option>").attr("value","").text("Select itemLists"));
		var params= {};
		params["subCatId"]= subCat;
		params["catId"]= catId;
		params["supplierId"]=supplierId;
		params["methodName"] = "getItemsBYCatandSubCategory";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData1 = $.parseJSON(data);

			//var itemMap = jsonData1.list;
			$.each(jsonData1,function(i,v)
					{
				$("#itemId").append($("<option></option>").attr("value",i).text(v.itemName)); 



					});


				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}


				});
	}




	function getCategoryBySupplier()
	{
		var input = document.getElementById('supplierId'),
		list = document.getElementById('supplierId_drop'),
		i,supplierId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplierId = list.options[i].getAttribute('data-value');
			}

			var supplierId = supplierId;
		}

		//$("#subCat").empty();
		$("#catId").empty();
		$("#catId").append($("<option></option>").attr("value","").text("Select category"));
		var params= {};
		params["methodName"] = "getCategoryBySupplier";
		params["supplierId"]= supplierId;

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData1 = $.parseJSON(data);

			//var itemMap = jsonData1.list;
			$.each(jsonData1,function(i,v)
					{
				$("#catId").append($("<option></option>").attr("value",i).text(v.cat_name)); 



					});


				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}


				});
	}




}

var pohelper = new POHelper();

function sumFmatter (cellvalue, options, rowObject) {
	return options.rowData.quantity * options.rowData.buyPriceForItemNAme;


}

function getItem()
{

	var itemList = "";
	this.getItemList = getItemList;

	function getItemList()
	{
		itemparams={};
		itemId = $('#itemId').val();
		itemparams["itemId"]= itemId;
		itemparams["methodName"] = "getItemDetails";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,
				function(data)
				{ 
			var jsonData = $.parseJSON(data);
			// 	var itemMap = jsonData.list;

			$.each(jsonData,function(i,v)
					{

				var itemName =  v.itemName;
				var  color =  v.color;  
				var buyPriceForItemNAme =v.buyPriceForItemNAme;
				var size = v.size;
				var vatPec=v.vatPec;
				$("#jqGrid").jqGrid({



					datatype:"local",

					colNames: ["itemID","Item Name","Model","Color", "Size/Length","Quantity","UnitPrice","Vat","Total" ],

					colModel: [
					           {

					        	   name:"itemID",
					        	   hidden:true
					           },
					           { 	
					        	   name: "itemName",
					        	   width:100,
					        	   editoptons:
					        	   {
					        		   value:itemId
					        	   }
					           //resizable: true,


					           },
					           {
					        	   name: "model",
					        	   width: 80,
					           },	

					           {
					        	   name:  "color",
					        	   width: 140,
					        	   editable: true
					           },

					           {
					        	   name: "size",
					        	   width: 140,
					        	   editable: true


					           },

					           {
					        	   name: "quantity",
					        	   width: 140,
					        	   editable: true // must set editable to true if you want to make the field editable
					           },

					           {
					        	   name:'buyPriceForItemNAme',
					        	   width: 140,
					        	   editable: true
					           },

					           {
					        	   name:'vatPec',
					        	   width: 140,
					        	   editable: true
					           },

					           {
					        	   label : 'Total',
					        	   name: "total",
					        	   formatter: sumFmatter,
					        	   width: 150,
					        	   loadComplete : function(){
					        		   var $grid = $('#jqGrid');
					        		   var colSum = $grid.jqGrid('getCol','sumFmatter',false,'sum');
					        		   $grid.jqGrid('footerData','set',{sumFmatter : colSum});
					        	   }
					           }
					           ],


					           sortorder : 'desc',

					           loadonce: true,
					           viewrecords: true,
					           width: 1000,
					           height: 150,
					           rowNum: 10,

					           pager: "#jqGridPager",
					           'cellEdit':true
				});

				$("#jqGrid").jqGrid("navGrid", "#jqGridPager", {add: false});
				$("#jqGrid").addRowData(i+1,jsonData[i]);


				$('#jqGrid').navGrid('#jqGridPager',
						// the buttons to appear on the toolbar of the grid
						{edit: true,  del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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

				}); 


	}
}

var itemby = new getItem();




