function updateItems()
{
	var params = {};

	var namePresent;
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');

	var action = new Array();

	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var idVal = "";
		if (i != 0) {
			idVal = i;
		}
		var color = allRowsInGrid[i].color;
		params["color" + i] = color;

		var size = allRowsInGrid[i].size;
		params["size"+i] = size;

		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var buyPrice = allRowsInGrid[i].buyPrice;
		params["buyPrice" + i] = buyPrice;

		var itemName = $('#itemName').val();
		params["itemName"] = itemName;

		var mmcc = $('#mmcc').val();
		params["mmcc"] = mmcc;

		var input = document.getElementById('fk_product_id'),
		list = document.getElementById('fk_productId_drop'),
		i,fk_product_id;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				fk_product_id = list.options[i].getAttribute('data-value');

			}
		}

		params["fk_product_id"] = fk_product_id; 

		params["count"] = count;

		params["methodName"] = "updateRegisteritemDetail";
		$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
			alert(data);
		}).error(function(jqXHR, textStatus, errorThrown) {
			if (textStatus === "timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}
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
		itemparams["methodName"] = "getUpdateItemDetail";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,
				function(data)
				{ 
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				document.getElementById("itemName").value = v.itemName;
				document.getElementById("mmcc").value = v.mmcc;
				var itemName =  v.itemName;
				var mmcc =  v.mmcc;
				$("#jqGrid").jqGrid(
						{
							datatype : "local",

							colNames : ["Color","size","Sale Price","buy Price",

							            ],

							            colModel : [ 
							                        {
							                        	name : "color",
							                        	width : 140,
							                        	editable : true
							                        },

							                        {
							                        	name : "size",
							                        	width : 140,
							                        	editable : true
							                        	// must set editable to true if you want to make the field editable
							                        },

							                        {
							                        	name : 'salePrice',
							                        	width : 140,
							                        	editable : true
							                        }, 

							                        {
							                        	name : 'buyPrice',
							                        	width : 140,
							                        	editable : true
							                        }


							                        ],

							                        sortorder : 'desc',

							                        loadonce : true,
							                        viewrecords : true,
							                        width : 1000,
							                        height : 100,
							                        rowNum : 10,

							                        pager : "#jqGridPager",
							                        'cellEdit':true
						});

				$("#jqGrid").addRowData(i, jsonData[i]);

				$('#jqGrid')
				.navGrid(
						'#jqGridPager',
						// the buttons to appear on the toolbar of the grid
						{
							edit : true,
							add : true,
							del : true,
							search : true,
							refresh : true,
							view : true,
							position : "left",
							cloneToTop : false
						},
						// options for the Edit Dialog
						{
							editCaption : "The Edit Dialog",
							recreateForm : true,
							checkOnUpdate : true,
							checkOnSubmit : true,
							closeAfteredit : true,
							errorTextFormat : function(data) {
								return 'Error: '
								+ data.responseText
							}
						},

						// options for the Delete Dailog
						{
							closeAfterdel : true,
							recreateForm : true,
							errorTextFormat : function(data) {
								return 'Error: '
								+ data.responseText
							},
							onSelectRow : function(id) {
								if (id && id !== lastSel) {
									jQuery("#jqGrid").saveRow(
											lastSel, true,
											'clientArray');
									jQuery("#jqGrid").editRow(
											id, true);
									lastSel = id;
									console.log(id);
								}
							}
						});
					});
				}); 
	}
}

var itemby = new getProduct();