function valAddMainCat()
{
	var categoryName= $('#categoryName').val();
	var patt = /^[ a-zA-Z0-9]+$/;
	var t = patt.test(categoryName);

	if(categoryName != null && categoryName != "" && categoryName != " ")
	{
		if(t){
			categoryd();
		}
		else{
			alert("Enter only Alfabets & Number.");
			document.getElementById("eoalfa").style.display = "initial";
		}
	}
	else{
		alert("Please Enter Category name");
	}
}

/********************************** code for GET ADD TABLE DATA IN DATABASE*******************************************/

function categoryd(){
	if ( document.pod.approved.value == "" )
	{
		alert("Please Select Approved By.");
		return false;
	}
	var letterNumber = /^[a-zA-Z]+$/; 
	if(document.pod.approved.value.match(letterNumber))   
	{  
		pode();
	}  
	else  
	{   
		alert( "Enter Alphabets only.");
		return false;   
	}  
}
var sum = 0 ;
function pode(){

	var params= {};
	var totals=0;
	var approveVal;
	var namePresent;
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var action = new Array();

	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var itemName = allRowsInGrid[i].itemID;
		params["itemName"+i] = itemName;

		var model = allRowsInGrid[i].model;
		params["model"+i] = model;

		var color = allRowsInGrid[i].color;
		params["color"+i] = color;

		var size = allRowsInGrid[i].size;
		params["size"+i] = size;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;


		var buyPrice = allRowsInGrid[i].buyPriceForItemNAme;
		params["buyPrice"+i] = buyPrice;


		var totalIt = (quantity) * (buyPrice);
		sum = sum + totalIt;
	}
	var subCat=$('#subCat').val();
	var email=$('#email').val();
	var approved=$('#approved').val();
	var typeOfPo=$('#typeOfPo').val();
	var supplierId=$('#supplierId').val();
	var paymentType=$('#paymentType').val();
	var contactPerson=$('#contactPerson').val();
	var expectedDate=$('#expectedDate').val();
	var billType=$('#billType').val();
	var mobNumber=$('#mobNumber').val();

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
		}
		var catId=catId;
	}
	params["typeOfPo"] = typeOfPo;
	params["subCat"] = subCat;
	params["catId"] = catId;
	params["supplierId"] = supplierId;
	params["paymentType"] = paymentType;
	params["contactPerson"] = contactPerson;
	params["expectedDate"] = expectedDate;
	params["mobNumber"] = mobNumber;
	params["billType"] = billType;
	params["email"] = email;
	params["approved"] = approved;
	params["count"] = count;
	params["methodName"] = "regPODetails";
	var dd = Object.keys(params).length;
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
function clacRes() {
	// when this function is called at client side you get the resolution
	document.getElementById("resolution").value = sum;
}
function changeAmount ()
{
	var amount=$('#amount').val();
	amount = sum-amount ;
	document.getElementById("changeAmt").value = amount;
}
function POHelper()
{
	var tableVals= {};
	this.getSubCategories = getSubCategories;
	this.getItems=getItems;
	this.fillItemList = fillItemList;
	this.sumFmatter000=sumFmatter000;
	function fillItemList()
	{
		var mainCat = $("#catId").val();
		var subcat = $("#subCat").val();
	}

	/********************************** code for GET ITEM DETAILS BY CATEGORY*******************************************/
	function sumFmatter000 ()
	{
		var grid = jQuery("#jqGrid");
		grid.trigger("reloadGrid");
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
		$("#subCat").append($("<option></option>").attr("value","").text("Select subcategory"));
		var params= {};
		params["methodName"] = "getSubCategoriesByRootcategory";
		params["catId"]= mainCat;
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
			var 	supplierId = supplierId;
		}
		var input = document.getElementById('catId'),
		list = document.getElementById('catId_drop'),
		i,catId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catId = list.options[i].getAttribute('data-value');
			}
			var mainCat = catId;
		}
		var subCat = $("#subCat").val();
		$("#itemId").empty();
		$("#itemId").append($("<option></option>").attr("value","").text("Select itemLists"));
		var params= {};
		params["methodName"] = "getItemsBYCatandSubCategory";
		params["catId"]= mainCat;
		params["supplierId"]=supplierId;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData1 = $.parseJSON(data);
			$.each(jsonData1,function(i,v)
					{
				$("#itemId").append($("<option></option>").attr("value",i).text(v.itemName)); 
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}
	/********************************** code for GET Sub CATEGORIES BY CATEGORY*******************************************/	
}

var pohelper = new POHelper();

function getItem()
{
	var itemList = "";
	this.getItemList = getItemList;
	function getItemList()
	{
		var params= {};
		itemparams={};
		itemId = $('#itemId').val();
		function reload(result) {
			$("#jqGrid").trigger("reloadGrid"); 
		} 
		itemparams["itemId"]= itemId;
		itemparams["methodName"] = "getItemDetailsPO";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,
				function(data)
				{ 
			var jsonData = $.parseJSON(data);
			function sumFmatter (cellvalue, options, rowObject)
			{
				var jam=0;
				var jam1="";
				var tot= (options.rowData.quantity * options.rowData.buyPriceForItemNAme);
				var shree = document.pod.resolution.value;

				var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
				var AllRows=JSON.stringify(allRowsInGrid1);
				for (var i = 0; i < count; i++) {

					var quantity = allRowsInGrid1[i].quantity;
					params["quantity"+i] = quantity;

					var buyPriceForItemNAme = allRowsInGrid1[i].buyPriceForItemNAme;
					params["buyPriceForItemNAme"+i] = buyPriceForItemNAme;

					var totals1=((buyPriceForItemNAme)*(quantity));

					jam = jam + totals1;

				}
				jam1= jam;
				document.getElementById("resolution").value = jam1;
				return tot;
			}
			$.each(jsonData,function(i,v)
					{

				var itemName =  v.itemName;
				var  color =  v.color;  
				var buyPrice =v.buyPrice;
				var size = v.size;
				$("#jqGrid").jqGrid({

					datatype:"local",
					colNames: ["itemID","Item Name","Model","Color","Quantity","Size","Price","Total" ],
					colModel: [
					           { 	
					        	   name: "itemID",
					        	   hidden:true
					           },
					           { 	
					        	   name: "itemName",
					        	   width:100,
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
					        	   name: "quantity",
					        	   width: 140,
					        	   editable: true,
					           },

					           {
					        	   name: "size",
					        	   width: 140,
					        	   editable: true
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
					           height: 100,
					           rowNum: 10,

					           pager: "#jqGridPager",
					           'cellEdit':true
				});

				$('#jqGrid').navGrid('#jqGridPager',
						// the buttons to appear on the toolbar of the grid
						{edit: true, add: false,del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
						// options for the Edit Dialog
						{
							afterSaveCell: function () {
								$(this).trigger('reloadGrid');
							},
							editCaption: "The Edit Dialog",
							recreateForm: true,
							checkOnUpdate : true,
							checkOnSubmit : true,
							closeAfteredit: true,
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

				$("#jqGrid").addRowData(i,jsonData[i]);
				var grid = jQuery("#jqGrid");
				grid.trigger("reloadGrid");
					});
				}); 
	}
}

var itemby = new getItem();
var lastSelection = "";

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
					          'cellEdit':true,
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

