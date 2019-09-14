



function getAllSaleReturn()
{
	/*var checkBy = $('#checkBy').val();
	var contactNo=$('#contactNo').val();
   var returnPeriod=$('#returnPeriod').val(); 
   var person_shop_name=$('#person_shop_name').val();*/

	var params= {};

	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');

	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {





		var temporaryStockBill = allRowsInGrid[i].temporaryStockBill;
		params["temporaryStockBill"+i] = temporaryStockBill;




		var person_shop_name = allRowsInGrid[i].person_shop_name;
		params["person_shop_name"+i] = person_shop_name;


		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;


		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;

		var color = allRowsInGrid[i].color;
		params["color"+i] = color;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;


		var SalePrice = allRowsInGrid[i].SalePrice;
		params["SalePrice"+i] = SalePrice;


		var soldDate = allRowsInGrid[i].soldDate;
		params["soldDate"+i] = soldDate;



		var totalAmount = allRowsInGrid[i].totalAmount;
		params["totalAmount"+i] = totalAmount;



		var fk_item_id = allRowsInGrid[i].fk_item_id;
		params["fk_item_id"+i] = fk_item_id;

		var returnPeriod=allRowsInGrid[i].returnPeriod;
		params["returnPeriod"+i] = returnPeriod;


		var total = allRowsInGrid[i].total;
		params["total"+i] = total;


		//var totals=((quantity) * (SalePrice));

		//sum= sum + totals;

	}


	/*params ["checkBy"] = checkBy;
	params ["contactNo"] = contactNo;
	params ["returnPeriod"] = returnPeriod;
	params ["person_shop_name"] = person_shop_name;*/

	params["count"] = count;
	params["methodName"] = "regTempStockReturn";

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









function getItemDetails()

{

	this.getitems = getitems;

	//var items="";

	/********************************** code for GET ITEM DETAILS BY CATEGORY*******************************************/

	function sumFmatter(cellvalue, options, rowObject) {
		return options.rowData.quantity * options.rowData.unitPrice;

	}

	function getitems() {

		$("#jqGrid").jqGrid("clearGridData");
		//$("#jqGrid").jqGrid("clearGridData");
		var tempBill = $('#tempBill').val();

		var params = {};
		params["methodName"] = "getItemsByTemporaryStock";
		params["tempBill"] = tempBill;
		$.post(
				'/SMT/jsp/utility/controller.jsp',
				params,
				function(data) {

					var jsonData = $.parseJSON(data);
					var catmap = jsonData.list;
					$.each(jsonData, function(i, v) {

						$("#jqGrid").jqGrid(
								{

									datatype : "local",

									colNames : ["TempStock Bill","Person Shop Name", "Item Name","Color",
									            "Quantity", "Price",
									            "Sale DAte", "totalAmount","ReturnPeriod","BarcodeNo","fk_item_id" ],

									            colModel : [ 

									                        {
									                        	name : "temporaryStockBill",
									                        	width:150,
									                        },

									                        {
									                        	name:"person_shop_name",
									                        },
									                        {
									                        	name : "itemName",
									                        	width : 100,
									                        	//resizable: true,

									                        },

									                        {
									                        	name:"color" ,
									                        	width : 100,
									                        },

									                        {
									                        	name : "quantity",
									                        	width : 140,
									                        	editable : true
									                        	// must set editable to true if you want to make the field editable
									                        },

									                        {
									                        	name : 'SalePrice',
									                        	width : 200,
									                        	editable : true
									                        }, 



									                        {
									                        	name : 'soldDate',
									                        	width : 200,
									                        	editable : true
									                        },

									                        {
									                        	label : 'Total',
									                        	name : "totalAmount",
									                        	width : 150,

									                        },

									                        {
									                        	name:"returnPeriod",
									                        },
									                        {
									                        	name:"barcodeNo",
									                        },
									                        {
									                        	name:"fk_item_id",
									                        	hidden:true,
									                        },

									                        ],

									                        sortorder : 'desc',

									                        loadonce : true,
									                        viewrecords : true,
									                        width : 1200,
									                        height : 200,
									                        //rowNum : 10,

									                        pager : "#jqGridPager",
									                        'cellEdit':true
								});

						$("#jqGrid").addRowData(i, jsonData[i]);

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

				}).error(function(jqXHR, textStatus, errorThrown) { 
					if (textStatus === "timeout") {

					}
				});

	}

}

var items = new getItemDetails();