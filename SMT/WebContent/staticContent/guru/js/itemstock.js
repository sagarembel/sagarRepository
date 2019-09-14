function showData() {
	var theSelect = demoForm.item_details_id;
	var item_details_id = document.getElementById('item_details_id');
	item_details_id.innerHTML = ('This option\'s index number is: ' + theSelect.selectedIndex );
}

function itemStockADd(){
	if(document.itemst.productId.value == "")
	{
		alert("Please Select Product Name!!!");
		return false;
	}
	if(document.itemst.itemId.value == "")
	{
		alert("Please Select Item Name!!!");
		return false;
	}
	if(document.itemst.color.value == "")
	{
		alert("Please Select Color Name!!!");
		return false;
	}
	if(document.itemst.size.value == "")
	{
		alert("Please Select Size!!!");
		return false;
	}
	if(document.itemst.branch.value == "")
	{
		alert("Please Enter Branch Name!!!");
		return false;
	}
	var letterNumber = /^[a-zA-Z]+$/;  
	if(document.itemst.branch.value.match(letterNumber)) 
	{
		if(document.itemst.defectiveQty.value == "")
		{
			alert("Please Enter Defective Quntity!!!");
			return false;
		}
		var letterNumber = /^[0-9]+$/;  
		if(document.itemst.defectiveQty.value.match(letterNumber)) 
		{
			{
				alert("Please Enter Stock!!!");
				return false;
			}
			var letterNumber = /^[0-9]+$/;  
			if(document.itemst.stock.value.match(letterNumber)) 
			{
				iteme();

			}
			else
			{
				alert("Please Enter Numbers Only Stock Column");
				return false;
			}	
		}
		else
		{
			alert("Please Enter Numbers Only In Defective Qty Column");
			return false;
		}	
	}
	else
	{
		alert("Please Enter Alphabets Only In Branch Column");
		return false;
	}	
}
function iteme(){
	var branch= $('#branch').val();
	var defectiveQty = $('#defectiveQty').val();
	var normalQty=$('#normalQty').val();
	var stock=$('#stock').val();
	var productId=$('#productId').val();
	var itemId=$('#itemId').val();
	var params= {};

	params ["branch"] = branch;
	params ["defectiveQty"] = defectiveQty;
	params ["stock"] = stock;
	params ["productId"] = productId;
	params ["itemId"] = itemId;

	params["methodName"] = "regItemStock";
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

function stockHelper()
{
	var offerList="";
	this.getAllCurrentStock = getAllCurrentStock;
	this.fillItemList = fillItemList;

	function fillItemList()
	{
		var supplierName = $("#supplierName").val();
		var categoryName = $("#categoryName").val();
		var subCategoryName = $("#subCategoryName").val();
		var leafCategoryName = $("#leafCategoryName").val();
		var itemName = $("#itemName").val();
		var color=$("#color").val();
		var size=$("#size").val();
		var availableQuantity=$("#availableQuantity").val();
	}

	function getAllCurrentStock()
	{
		var params= {};
		params["methodName"] = "getAllCurrentStockReport";
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(catmap,function(i,v)
					{
				$("#list4").jqGrid({
					datatype: "local",
					height: 350,
					colNames:['SupplierName','CategoryName',  'ItemName', 'Color', 'Size' ,'SalePrice','Quantity'],
					colModel:[
					          {name:'supplierName'},
					          {name:'categoryName'},

					          {name:'itemName',
					        	  editable: true
					          },
					          {name:'color',
					        	  editable: true

					          },
					          {name:'size',
					        	  editable: true

					          },
					          {name:'salePrice',
					          },
					          {name:'totalQuantity',
					        	  editable: true

					          },
					          ],
					          width :1000,
					          height:500,

					          viewrecords: true,
					          'cellEdit':true,
					          caption: "Local salary data added to salaries table",
				});
				$("#list4").jqGrid('filterToolbar', {
					autosearch: true,
					stringResult: true,
					searchOnEnter: false,
					defaultSearch: "cn",
				});
					});
			var mydata = catmap;
			for(var i=0;i<mydata.length;i++){$("#list4").addRowData(i,mydata[i]);
			}
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
						$(loaderObj).hide();
						$(loaderObj).find('#errorDiv').show();
					}
				});
	}
}
var stock = new stockHelper();
function ItemHelper()
{
	this.getitems = getitems;

	function fillItemList()
	{
		var productId = $("#productId").val();
		var itemId = $("#itemId").val();
	}
	function getitems()
	{
		var productId = $("#productId").val();
		$("#itemId").empty();
		$("#itemId").append($("<option></option>").attr("value","").text("Select items"));
		var params= {};
		params["methodName"] = "getitemsByProducts";
		params["productId"]= productId;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				$("#itemId").append($("<option></option>").attr("value",i).text(v.itemName)); 

					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}
}

var stockhelper = new ItemHelper();
function ItemColorHelper()
{
	this.getcolor = getcolor;
	this.fillColorList = fillColorList;

	function fillColorList()
	{
		var itemId = $("#itemId").val();
		var color = $("#color").val();
	}
	function getcolor()
	{
		var itemId = $("#itemId").val();
		$("#color").empty();
		$("#size").empty();
		$("#color").append($("<option></option>").attr("value","").text("Select color"));
		$("#size").append($("<option></option>").attr("value","").text("Select size"));
		var params= {};
		params["methodName"] = "getcolorByProducts";
		params["itemId"]= itemId;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				$("#color").append($("<option></option>").attr("value",i).text(v.color));
				$("#size").append($("<option></option>").attr("value",i).text(v.size));

					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}
}

var colordETAILS = new ItemColorHelper();
function GetItemPerFormance()
{
	this.getSaleDetailsBetweenTwoDates = getSaleDetailsBetweenTwoDates;
	function getSaleDetailsBetweenTwoDates()
	{
		var params= {};
		var startDate = $("#fisDate").val();
		var endDate = $("#endDate").val();
		params["fisDate"]= startDate;
		params["endDate"]= endDate;
		params["methodName"] = "getTopSaleItemDateWise";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$(document).ready(function() {
				$('#example').DataTable( {
					destroy: true,
					searching: false,
					columns: [
					          {"data": "itemName", "width": "5%"},
					          {"data": "quantity" , "width": "5%"},
					          ]
				} );
			} );

			var mydata = catmap;
			$('#example').dataTable().fnAddData(mydata);

				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
						$(loaderObj).hide();
						$(loaderObj).find('#errorDiv').show();
					}
				});
	}
}

var itemperformance = new GetItemPerFormance();