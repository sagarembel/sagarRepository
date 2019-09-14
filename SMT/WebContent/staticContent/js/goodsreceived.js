var sum=0;

function registerGOOD(){

	document.good.btn.disabled = true;

	var params= {};
	var namePresent;
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var action = new Array();
	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var idVal = "";
		if(i != 0)
		{
			idVal = i ;
		}
		var itemName = allRowsInGrid[i].itemID;
		params["itemName"+i] = itemName;

		var model = allRowsInGrid[i].model;
		params["model"+i] = model;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;

		var buyPrice = allRowsInGrid[i].buyPriceForItemNAme;
		params["buyPrice"+i] = buyPrice;

		var totals=((quantity) * (buyPrice));

		sum= sum + totals;
	}

	var pDate=$('#pDate').val();
	var expence=$('#expence').val();
	var billNo=$('#billNo').val();

	var contactPerson=$('#contactPerson').val();

	var input = document.getElementById('supplierId'),
	list = document.getElementById('supplierId_drop'),
	i,supplierId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplierId = list.options[i].getAttribute('data-value');
		}
	}

	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');
			alert(catId)
		}

		var catId=catId;
	}
	params["pDate"] = pDate;
	params["billNo"] = billNo;
	params["catId"] = catId;
	params["supplierId"] = supplierId;
	params["contactPerson"] = contactPerson;
	params["expence"] = expence;
	params["count"] = count;

	params["methodName"] = "reggoodsReceipt";

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
	var tableVals= {};
	this.getItemNameByCategory=getItemNameByCategory;
	this.getDate = getDate;
	this.fillItemList = fillItemList;

	function fillItemList()
	{
		var mainCat = $("#catId").val();
		var subcat = $("#subCat").val();
	}
	function getDate()
	{
		var params= {};
		params["methodName"] = "getAllDueDateReport";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$(document).ready(function() {
				$('#example').DataTable( {
					destroy: true,
					searching: false,
					columns: [
					          {"data": "billNo", "width": "5%"},
					          {"data": "supplierName" , "width": "5%"},
					          {"data": "insertDate" , "width": "5%"},
					          {"data": "dueDate", "width": "5%"},
					          {"data": "totalAmount" , "width": "5%"}
					          ]
				} );
			});
			var mydata = catmap;
			$('#example').dataTable().fnAddData(mydata);
				});
	}

	/********************************** code for GET ITEM DETAILS BY CATEGORY*******************************************/

	function getItemNameByCategory(){
		var input = document.getElementById('catId'),
		list = document.getElementById('catId_drop'),
		i,catId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catId = list.options[i].getAttribute('data-value');
			}
			var catId=catId;
		}
		$("#itemId").empty();
		$("#itemId").append($("<option></option>").attr("value","").text("Select Item Name"));
		var params= {};
		params["catId"]= catId;
		params["methodName"] = "getItemNameByCategory";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#itemId").append($("<option></option>").attr("value",v.itemID).text(v.itemName)); 
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}
}

var pohelper = new POHelper();
function getItem()
{
	var itemList = "";
	this.getItemList = getItemList;
	this.sumFmatter000 = sumFmatter000 ;
	function sumFmatter000 ()
	{
		var grid = jQuery("#jqGrid");
		grid.trigger("reloadGrid");
	}
	function getItemList()
	{
		itemparams={};
		itemId = $('#itemId').val();
		itemparams["itemId"]= itemId;
		itemparams["methodName"] = "getItemDetailsPO";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,
				function(data)
				{ 
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				function sumFmatter (cellvalue, options, rowObject)
				{
					var itemparams={};
					var jam=0;
					var tot= (options.rowData.quantity * options.rowData.buyPriceForItemNAme);
					var shree = document.good.resolution.value;
					var ex = document.good.expence.value;
					var dec_num = parseInt(ex);
					var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
					var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
					var AllRows=JSON.stringify(allRowsInGrid1);
					for (var i = 0; i < count; i++) {

						var quantity = allRowsInGrid1[i].quantity;
						itemparams["quantity"+i] = quantity;

						var buyPriceForItemNAme = allRowsInGrid1[i].buyPriceForItemNAme;
						itemparams["buyPriceForItemNAme"+i] = buyPriceForItemNAme;

						var totals1=((buyPriceForItemNAme)*(quantity));

						jam = jam + totals1;
					}
					var dd= jam+dec_num ;
					document.getElementById("resolution").value = dd;
					return tot;
				}
				$(document).ready(function () {
					var lastsel;
					rownumbers: true,

					$("#jqGrid").jqGrid({
						datatype:"local",
						editurl: 'clientArray',
						colNames: ["itemID","Item Name","Model","Quantity","Unit Price","Total" ],

						colModel: [
						           {
						        	   name:"itemID",
						        	   hidden:true
						           },
						           { 	
						        	   name: "itemName",
						        	   width:200,
						           },
						           {
						        	   name: "model",
						        	   width: 100,
						           },	

						           {
						        	   name: "quantity",
						        	   width: 140,
						        	   editable: true, // must set editable to true if you want to make the field editable

						           },

						           {
						        	   name:'buyPriceForItemNAme',
						        	   width: 140,
						        	   editable: true
						           },

						           {
						        	   label : 'Total',
						        	   formatter: sumFmatter,
						        	   width: 180,
						           }
						           ],

						           sortorder : 'desc',

						           loadonce: true,
						           viewrecords: true,
						           width: 1000,
						           height: 300,
						           rowNum: 10,
						           pager: "#jqGridPager",
						           'cellEdit':true

					});
					$("#jqGrid").jqGrid("navGrid", "#jqGridPager", {add: false});
					$("#jqGrid").addRowData(i+1,jsonData[i]);
					var grid = jQuery("#jqGrid");
					grid.trigger("reloadGrid");
					function calDiscount(cellvalue, options, rowObject){
						return ((options.rowData.buyPriceForItemNAme)*(options.rowData.quantity))+(((options.rowData.buyPriceForItemNAme)*(options.rowData.quantity))*((options.rowData.vatPec)/100));
					} 
					function reload(rowid, result) {
						$("#jqGrid").trigger("reloadGrid"); 
					}

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
				}); 
	}
}

var itemby = new getItem();

function PurchaseHelper()
{
	var offerList="";
	this.getPurchaseDetailsBetweenTwoDates = getPurchaseDetailsBetweenTwoDates;
	this.fillItemList = fillItemList;

	function fillItemList()
	{
		var startDate = $("#fDate").val();
		var endDate = $("#tDate").val();
		var OrderId = $("#OrderId").val();
		var insertDate = $("#insertDate").val();
		var supplierName = $("#supplierName").val();
		var quantity=$("#quantity").val();
		var unitPrice=$("#unitPrice").val();
		var totalAmount=$("#totalAmount").val();
		var expectedDate=$("#expectedDate").val();
	}

	function getPurchaseDetailsBetweenTwoDates()
	{
		var params= {};
		var startDate = $("#fDate").val();
		var endDate = $("#tDate").val();
		params["fDate"]= startDate;
		params["tDate"]= endDate;
		params["methodName"] = "getPurchaseReportBetweenTwoDates";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(catmap,function(i,v)
					{
				var OrderId =	v.OrderId;
				var insertDate =	v.insertDate;
				var expectedDate =	v.expectedDate;
				var supplierName =	v.supplierName;
				var quantity =	v.quantity;
				var unitPrice =	v.unitPrice;
				var totalAmount =	v.totalAmount;

				catmap[catmap]={OrderId:"",insertDate:"",expectedDate:"",supplierName:"",quantity:"",unitPrice:"",totalAmount:""};
				$("#list4").jqGrid({
					datatype: "local",
					height: 350,
					colNames:['OrderId','insertDate', 'expectedDate','supplierName', 'quantity', 'unitPrice', 'totalAmount'],
					colModel:[
					          {name:'OrderId'},
					          {name:'insertDate'},
					          {name:'expectedDate',
					        	  editoptions: 
					        	  {value:1} ,

					        	  editable: true
					          },
					          {name:'supplierName',
					        	  editable: true
					          },
					          {name:'quantity',
					        	  editable: true
					          },
					          {name:'unitPrice',
					        	  editable: true
					          },

					          {name:'totalAmount',
					        	  editable: true
					          },
					          ],
					          sortname: 'ID',
					          sortorder : 'desc',
					          loadonce: true,
					          viewrecords: true,
					          caption: "Local salary data added to salaries table",
				});
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
						$(loaderObj).hide();
						$(loaderObj).find('#errorDiv').show();
					}
				});
	}
}

var purchase = new PurchaseHelper();

function reset()
{
	document.good.reset();	
}

