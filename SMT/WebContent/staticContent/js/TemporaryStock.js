
var sum=0;
var length;
var newrow;
var rowId;
function temp(){

	var checkBy = $('#checkBy').val();
	var contactNo=$('#contactNo').val();
	var returnPeriod=$('#returnPeriod').val(); 
	var person_shop_name=$('#person_shop_name').val();

	var params= {};

	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#list4').getGridParam('data');

	var AllRows=JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {


		var offerId = allRowsInGrid[i].offerId;
		params["fk_item_id"+i] = offerId;

		var empId = allRowsInGrid[i].empId;
		params["empId"+i] = empId;



		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;


		var itemName = allRowsInGrid[i].itemName;
		params["itemName"+i] = itemName;

		var color = allRowsInGrid[i].color;
		params["color"+i] = color;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;


		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice"+i] = salePrice;


		var vatPercentage = allRowsInGrid[i].vatPercentage;
		params["vatPercentage"+i] = vatPercentage;


		var commision = allRowsInGrid[i].commision;
		params["commision"+i] = commision;


		var discount=allRowsInGrid[i].discount;
		params["discount"+i] = discount;

		var total = allRowsInGrid[i].total;
		params["total"+i] = total;


		var totals=((quantity) * (salePrice));

		sum= sum + totals;

	}


	params ["checkBy"] = checkBy;
	params ["contactNo"] = contactNo;
	params ["returnPeriod"] = returnPeriod;
	params["count"] = count;
	params ["person_shop_name"] = person_shop_name;


	params["methodName"] = "regTemp";

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


function OfferHelper()
{

	var offerList="";
	this.getitemData = getitemData;
	//this.getSalesman=getSalesman;

	function getitemData(){



		var value = document.getElementById("key").value;
		if(value.length ==4){

			var params= {};


			params["methodName"] ="fetchCust";
			params["key"]=value;
			var count=0;
			$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
					{

				var jsonData = $.parseJSON(data);

				function sumFmatter (cellvalue, options, rowObject)
				{


					var jam=0;
					var tot= (options.rowData.quantity * options.rowData.salePrice);
					var shree = document.tempstock.resolution.value;

					var count = jQuery("#list4").jqGrid('getGridParam', 'records');
					var allRowsInGrid1 = $('#list4').getGridParam('data');
					var AllRows=JSON.stringify(allRowsInGrid1);
					for (var i = 0; i < count; i++) {

						var quantity = allRowsInGrid1[i].quantity;
						params["quantity"+i] = quantity;

						var salePrice = allRowsInGrid1[i].salePrice;
						params["salePrice"+i] = salePrice;

						var discount=allRowsInGrid1[i].discount;
						params["discount"+i] = discount;

						var totals1=((salePrice)*(quantity))-(((salePrice)*(quantity))*((discount)/100));
						jam = jam + totals1;

					}


					document.getElementById("resolution").value = jam;

					return tot;

				}



				var calCommision = function(cellvalue, options, rowObject) {


					var cellvalue=(options.rowData.quantity)*(options.rowData.salePrice)*((options.rowData.commision)/100);

					return cellvalue;
				}


				function calDiscount(cellvalue, options, rowObject){

					return ((options.rowData.salePrice)*(options.rowData.quantity))-(((options.rowData.salePrice)*(options.rowData.quantity))*((options.rowData.discount)/100));
				} 


				count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
				var rowdata =$("#list4").jqGrid('getGridParam','data');
				var ids = jQuery("#list4").jqGrid('getDataIDs');


				var ori_quantity,offerId;
				for (var j = 0; j < count; j++) 
				{
					offerId = rowdata[j].offerId;

					var rowId = ids[j];
					var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);

					if (offerId==jsonData.offer.offerId) {
						ori_quantity = rowdata[j].quantity+1;


						$("#list4").jqGrid("setCell", rowId, "quantity", ori_quantity);
						var grid = jQuery("#list4");
						grid.trigger("reloadGrid");
						newrow=false;
						break;
					}
					else
					{
						newrow = true;
					}
				}
				if(newrow== true)
				{
					$("#list4").addRowData(count,jsonData.offer); 
				}

				for (var k = 0; k < count; k++) 
				{

				}	

				$("#list4").jqGrid({
					datatype: "local",

					colNames:['offerId','Barcode NO','Item Name','color', 'Quantity', 'Price', 'Total','Discount','TotalAmount','Commision'],
					colModel:[ 

					          {
					        	  name:'offerId',
					        	  hidden:true,


					          },
					          {
					        	  name:'barcodeNo',



					          },

					          {name:'itemName',

					          },

					          {	name:'color'},

					          {	name:'quantity',
					        	  editable: true,
					        	  sorttype: "integer"
					          },

					          {	name:'salePrice',
					        	  editable: true

					          },

					          {	name:'total',
					        	  formatter: sumFmatter,
					        	  editable: "readonly",
					        	  editable: true

					          },

					          {
					        	  name:'discount',
					        	  editable: true

					          },



					          {
					        	  name:'TotalAmount',
					        	  formatter: calDiscount,
					        	  editable: "readonly"
					          },



					          {
					        	  name: 'commision',
					        	  hidden:true,
					        	  formatter:calCommision,

					          },




					          ],
					          footerrow: true,
					          userDataOnFooter: true,		
					          idPrefix : "a",
					          sortorder : 'desc',
					          loadonce: false,
					          viewrecords: true,
					          width: 1000,
					          height: 200,
					          rowNum: 10,
					          pager: "#jqGridPager",
					          'cellEdit':true,
					          caption: "Local salary data added to salaries table",

				});

				if(count==0 || count==null)
				{

					$("#list4").addRowData(0,jsonData.offer);
				}

				var value= $('#key').val('');
				$("#list4").trigger("reloadGrid");


				$('#list4').navGrid('#jqGridPager',

						{ edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },

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

						{
							closeAfterAdd: true,
							recreateForm: true,
							errorTextFormat: function (data) {
								return 'Error: ' + data.responseText
							}
						},

						{
							closeAfterdel:true,
							recreateForm: true,

							errorTextFormat: function (data) {
								return 'Error: ' + data.responseText
							}




						});





					})
					.error(function(jqXHR, textStatus, errorThrown){
						if(textStatus==="timeout") {
							$(loaderObj).hide();
							$(loaderObj).find('#errorDiv').show();
						}
					})
		}
	}


	/*function getSalesman(){

		var value = document.getElementById("key1").value;


			var params={};
			params["methodName"]="getSalesmanName";
			params["key1"]=value;
			$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		 	    	{
				var jsonData = $.parseJSON(data);



				count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
				var rowdata =$("#list4").jqGrid('getGridParam','data');

		       var ids = jQuery("#list4").jqGrid('getDataIDs');


		            var x= --ids.length;
					var rowId = x;


					var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				$.each(jsonData,function(i,v){

					var empName=v.empName;
					var empId=v.empId;

					$("#list4").jqGrid("setCell", rowId, "empName", empName);
					$("#list4").jqGrid("setCell", rowId, "empId", empId);

					newrow=false;


					});


				var value= $('#key1').val('');
				$("#list4").trigger("reloadGrid");
				})


		}*/
}	

var offer = new OfferHelper();
