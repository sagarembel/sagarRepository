function valProductDetail()
{
	var catId = $("#catId").val();
	var fkSubCatId = $("#fkSubCatId").val();
	var itemName = $('#itemName').val();
	//var vat = $('#vat').val();
	var hsnsacno = $('#hsnsacno').val();
	var vatPattern = /^[0-9]{1,50}$/;
	//var vatPatternRes = vatPattern.test(vat);

	if (catId != null && catId != "" && catId != " ") {
		if (fkSubCatId != null && fkSubCatId != "" && fkSubCatId != " ") {
			if (itemName != null && itemName != "" && itemName != " ") {
				/*if (vat != null && vat != "" && vat != " ")
				{
					if (vatPatternRes)
					{*/
						productdel();
					/*} else {
						alert(" Please Enter Only Numbers In GST % !");
						
					}
				}
				else
				{
					alert("Please Enter GST % !");
				}*/
			}
			else {
				alert("Please Enter Product Name !");
			}
		} else {
			alert("Please Enter Sub Category Name !");
		}
	} else {
		alert("Please Enter Category Name !");
	}
}

function productdel()
{
	document.getElementById("btn").disabled = true;	
	var params= {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	
	var colorFinal = ".";
	var sizeFinal = ".";
	
	var fff = JSON.stringify(allRowsInGrid);
	if(count == 0)
	{
		params["colorFinal"] = colorFinal;

		var sizeFinal = ".";
		params["sizeFinal"] = sizeFinal;
	}
	else
	{
		for (var i = 0; i < count; i++)
		{
			var color = allRowsInGrid[i].color;
			params["color" + i] = color;
	
			var size = allRowsInGrid[i].size;
			params["size" + i] = size;
	
		}
	}
	var itemName= $('#itemName').val();

	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');
		}
	}

	var fkSubCatId = $("#fkSubCatId").val();
	var vat = $("#vat").val();
	var hsnsacno = $("#hsnsacno").val();
	var modelName = $("#modelName").val();

	params["itemName"] = itemName;
	params["hsnsacno"] = hsnsacno;
	params["vat"] = vat;
	params["modelName"] = modelName;
	params["catId"] =catId;
	params["fkSubCatId"] =fkSubCatId;
	params["count"] = count;
	params["methodName"] = "doProductDetail";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		location.reload();
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
		colNames:["Color","Size"],
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
		           ],

		           data:[],
		           sortorder : 'desc',
		           loadonce: true,
		           viewrecords: true,
		           width: 600,
		           shrinkToFit: true,
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
		$("#fkSubCatId").empty();
		$("#fkSubCatId").append($("<option></option>").attr("value","").text("Select subcategory"));
		var params= {};
		params["methodName"] = "getSubCategoriesByRootcategory";
		params["catId"]= mainCat;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
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
function disable(){
	if(document.itemdel.itemName.value !== "")
	{
		document.itemdel.itemName.disabled = true;
		return false;
	}	
}

function reset()
{
	document.itemdel.reset();
}

var pohelper = new POHelper();
function getAllMAinItem(){

	var params= {};
	params["methodName"] = "getAllMAinItem";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#itemName').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#itemName').DataTable( {

				dom: 'Bfrtip',
				buttons: [
				          'copy', 'csv', 'excel', 'pdf', 'print'
				          ],
				          fnRowCallback : function(nRow, aData, iDisplayIndex){
				        	  $("th:first", nRow).html(iDisplayIndex +1);
				        	  return nRow;
				          },
				          "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          orderable: true,
				          columns: [
				                    {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				                    {"data": "categoryName", "width": "5%", "defaultContent": ""},
				                    {"data": "item_name", "width": "5%", "defaultContent": ""},
				                    {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				                    ],
			} );
		} );
		var mydata = catmap;
		$('#itemName').dataTable().fnAddData(mydata);
			}
	);
}	

function valEditProductDetail()
{
	var itemNameFixed = $('#hiddenItemName').val();
	var dropDownName = $('#product').val();
	
	var itemName = $('#product').val();
	var vat = $('#vat').val();
	var size = $('#size').val();
	var vatPattern = /^[0-9]{1,50}$/;
	var vatPatternRes = vatPattern.test(vat);
	
	if (itemName != null && itemName != "" && itemName != " ")
	{
		/*if (vat != null && vat != "" && vat != " ")
		{
			if (vatPatternRes)
			{*/
				if (size != null && size != "" && size != " ")
				{
					updateProduct();
				}
				else
				{
					alert("Pleae Enter Size");
					return false;
				}
			}
			/*else
			{
				alert(" Please Enter Only Numbers In GST % !");
				return false;
			}
		}
		else
		{
			alert("Please Enter GST % !");
			return false;
		}
	}*/
	else
	{
		alert("Please Select Product Name !");
		return false;
	}
}

//Update product Details

function updateProduct()
{
	document.UpdateProd.btn.disabled = true;
	var input = document.getElementById('product'),
	list = document.getElementById('sup_drop'),
	i,fkRootSupId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootSupId = list.options[i].getAttribute('data-value');
		}
	}

	var itemName = $('#hiddenItemName').val();
	var itemName = $('#itemName').val();
	//var vat = $('#vat').val();
	var hsnsacno = $('#hsnsacno').val();
	var modelName = $('#modelName').val();
	var size = $('#size').val();
	
	var params = {};
	params["productId"] = fkRootSupId;
	params["itemName"] = itemName;
	params["hsnsacno"] = hsnsacno;
	//params["vat"] = vat;
	params["modelName"] = modelName;
	params["size"] = size;
	
	params["methodName"] = "updateProductDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		alert(data);
		if(document.UpdateProd)
		{
			document.UpdateProd.reset();
			location.reload();
		}	
		document.UpdateProd.btn.disabled =false;
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

/********* get Product Details ************/
function getProductDetails()
{
	var params= {};

	var input = document.getElementById('product'),
	list = document.getElementById('sup_drop'),
	i,fkRootSupId;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			fkRootSupId = list.options[i].getAttribute('data-value');
		}
	}

	$("#itemName").append($("<input/>").attr("value","").text());
	//$("#vat").append($("<input/>").attr("value","").text());
	$("#modelName").append($("<input/>").attr("value","").text());
	$("#hsnsacno").append($("<input/>").attr("value","").text());
	$("#size").append($("<input/>").attr("value","").text());
	$("#catName").append($("<input/>").attr("value","").text());
	$("#subCatName").append($("<input/>").attr("value","").text());

	params["productId"]= fkRootSupId;
	params["methodName"] = "getProductDetailsToEdit";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("hiddenItemName").value = v.ProName;
			document.getElementById("itemName").value = v.ProName;
			//document.getElementById("vat").value = v.vat;
			document.getElementById("modelName").value = v.ModelName;
			document.getElementById("hsnsacno").value = v.hsnsacno;
			document.getElementById("size").value = v.size;
			document.getElementById("catName").value = v.catName;
			document.getElementById("subCatName").value = v.subCatName;
		});
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{}
	});
	
	
}