function getAuthority()
{
	var params= {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	
	
	var fff=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
        
        var color = allRowsInGrid[i].color;
      params["color"+i]=color;
       var size = allRowsInGrid[i].size;
       params["size"+i]=size;
        var itemID = allRowsInGrid[i].itemID;
        params["itemID"+i]=itemID;
        var quantity = allRowsInGrid[i].quantity;
       params["quantity"+i]=quantity;
       var model = allRowsInGrid[i].model;
       params["model"+i]=model;
       
       
	}
	
	
	var smcc= $('#smcc').val();
	var sendBy= $('#sendBy').val();

	var location= $('#location').val();
	
	var goodsreceived= $('#goodsreceived').val();

	
		
		params["smcc"] = smcc;
		params["sendBy"] = sendBy;
		params["location"] = location;
		params["goodsreceived"] = goodsreceived;
		params["count"] = count;

/*alert(allRowsInGrid)

params["Grid"] =""+allRowsInGrid;*/

params["methodName"] = "doauthoritySlip";

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


function sumFmatter (cellvalue, options, rowObject) {
	return options.rowData.quantity * options.rowData.buyPriceForItemNAme;


}


function authorityHelper()
{
	
	//$("#jqGrid").jqGrid("clearGridData");
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
					var buyPrice =v.buyPrice;
					var size = v.size;
					
					$("#jqGrid").jqGrid({
						
					
					
						datatype:"local",

						colNames: ["itemID","Item Name","Model","Color", "Size","Quantity","Buy Price","Total" ],

						colModel: [
						           { 	
						        	   name: "itemID",
						        	   hidden:true
						        	   //resizable: true,


						           },
						           { 	
						        	   name: "itemName",
						        	   width:100,
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
						        	   label : 'Total',
						        	   name: "total",
						        	   formatter: sumFmatter,
						        	   width: 150,
						        	  
						           }
						           ],


						           sortorder : 'desc',
						           
						           loadonce: true,
						           viewrecords: true,
						           width: 1000,
						           height: 200,
						           rowNum: 10,

						           pager: "#jqGridPager",
						           'cellEdit':true
					});
					
					$("#jqGrid").addRowData(i,jsonData[i]);
				
					
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

					}); 

				
		}
		
		var itemId= $('#itemId').val('');
	}
var author = new authorityHelper();