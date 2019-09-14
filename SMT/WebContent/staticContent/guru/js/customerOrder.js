function forOptionselect()
{
	var str = document.getElementById("paymentType").value;
	if (str == "cash")
	{
		var ac1 =  0;
		document.getElementById("card").value = ac1; 
		var ac =  document.getElementById("resolution").value;
		document.getElementById("cash").value = ac;  
		document.custord.card.disabled = true;
	}
	if(str == "card")
	{
		document.custord.cash.disabled = true;
		var ac =  0;
		document.getElementById("cash").value = ac; 
		var ac1 =  document.getElementById("resolution").value;
		document.getElementById("card").value = ac1;  
	} 
	if(str== "CC")
	{

		var ac =  0;
		document.getElementById("cash").value = ac; 
		var ac1 =  0;
		document.getElementById("card").value = ac1; 
		document.custord.cash.disabled = false;
		document.custord.card.disabled = false;
	}
}

function getCardAmont()
{
	var ac1 =  document.getElementById("resolution").value;
	var cash = document.getElementById("cash").value; 
	var cardamt = ac1 - cash ;
	document.getElementById("card").value = cardamt ;
}

function getCashAmont()
{
	var ac1 =  document.getElementById("resolution").value;
	var card = document.getElementById("card").value; 
	var cardamt = ac1 - card ;
	document.getElementById("cash").value = cardamt ;
}

var sum=0;
var length;
var newrow;
var rowId;
function windowClose() {
	window.location.reload();
}
function customerOrder(){
	document.custord.btn.disabled=true;
	var params= {};

	var customerMobileNo= $('#customerMobileNo').val();
	var customerFirstName= $('#customerFirstName').val();
	var PaymentType= $('#paymentType').val();
	var cardNumber= $('#cardNumber').val();
	var cash= $('#cash').val();
	var card= $('#card').val();

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

	var input = document.getElementById('customerFirstName1'),
	list = document.getElementById('customerFirstName_drop'),
	i,customerFirstName1;

	if (input == null) {
		customerFirstName1 =null;
	}

	else 	if (input.value !=null) {
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				customerFirstName1 = list.options[i].getAttribute('data-value');
				alert(customerFirstName1)
			}
		}
	}

	params["customerFirstName1"] = customerFirstName1;

	params["cash"] = cash;
	params["card"] = card;
	params["customerFirstName"] = customerFirstName;
	params["customerMobileNo"] = customerMobileNo;
	params["cardNumber"] = cardNumber;
	params["PaymentType"] = PaymentType;
	params["count"] = count;

	params["methodName"] = "doCustomerOrder";


	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		alert(data)
		document.custord.btn.disablesd = false;
		window.open("createClientPDF.jsp");
			}

	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	})}


function groTot(){
	document.getElementById("resolution").value = sum;
}

function changeAmount ()
{
	var amount=$('#amount').val();
	amount = sum-amount ;
	document.getElementById("changeAmt").value = amount;
}

function OfferHelper()
{
	var offerList="";
	this.getitemData = getitemData;
	this.getSalesman=getSalesman;
	this.sumFmatter000 = sumFmatter000	;
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
					var shree = document.custord.resolution.value;
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
				$("#list4").jqGrid({
					datatype: "local",

					colNames:['offerId','Barcode NO','Item Name','color', 'Quantity', 'Price', 'Total','Discount','TotalAmount','Employee Name','EmpId','Commision'],
					colModel:[ 

					          {
					        	  name:'offerId',
					        	  hidden:true,
					          },
					          {
					        	  name:'barcodeNo',
					          },

					          {
					        	  name:'itemName',
					          },

					          {	name:'color'},

					          {	name:'quantity',
					        	  editable: true
					          },

					          {	name:'salePrice',
					        	  editable: true
					          },

					          {	name:'total',
					        	  formatter: sumFmatter,
					          },

					          {
					        	  name:'discount',
					        	  editable: true
					          },

					          {
					        	  name:'TotalAmount',
					        	  formatter: calDiscount,
					          },

					          {
					        	  name:'empName',
					          },

					          {
					        	  name:'empId',
					        	  hidden:true,
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

					          caption: "Local salary data added to salaries table",

				});

				if(count==0 || count==null)
				{
					$("#list4").addRowData(0,jsonData.offer);
				}
				var value= $('#key').val('');
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

	function getSalesman(){
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
	}
	function sumFmatter000 ()
	{
		var grid = jQuery("#list4");
		grid.trigger("reloadGrid");
	}
}    
var offer = new OfferHelper();

/*************************Report Code*******************/


