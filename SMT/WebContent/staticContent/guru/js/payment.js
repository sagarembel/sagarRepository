

function getPayment(){

	this.paymentHelperForsingleDate = paymentHelperForsingleDate ;

	function paymentHelperForsingleDate()
	{
		var params= {};
		var fDate = $("#fDate").val();


		params["fDate"]= fDate;

		params["methodName"] = "getPaymentDetailsBYSingalDate";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;




			$.each(catmap,function(i,v)

					{


				var customerBill = v.customerBill;
				var soldDate = v.soldDate;
				var quantity=v.quantity;
				var SalePrice=v.SalePrice;
				var totalAmount=v.totalAmount;
				var newTotAmt =v.newTotAmt;


				//catmap[catmap]={OrderId:"",soldDate:"",SalePrice:"",quantity:"",discount:"",totalAmount:""};
				$("#jqGrid").jqGrid("clearGridData");



				$("#jqGrid").jqGrid({



					datatype: "local",
					height: 250,
					width: '100%',

					search:true,

					multiselect: true,

					multiboxonly: true,  

					colNames:['customerBill','Cash', 'Card','NewtotalAmount'],

					colModel: [
					           {

					        	   name:"customerBill",

					           },
					           { 	
					        	   name: "cash",
					        	   width:100,

					           },
					           {
					        	   name: "card",
					        	   width: 80,
					           },	

					           {
					        	   name:  "newTotalAmt",
					        	   width: 140,

					           },




					           ],



					           viewrecords: true,
					           width: 1000,
					           height: 200,
					           // rowNum: 10,

					           pager: "#jqGridPager",
					           'cellEdit':true,
					           footerrow:true,
					           loadComplete : function(){
					        	   var $grid = $("#jqGrid");
					        	   var colSum = $grid.jqGrid('getCol','cash',false,'sum');
					        	   $grid.jqGrid('footerData','set',{netAmount : colSum});

					        	   var colSum = $grid.jqGrid('getCol','card',false,'sum');
					        	   $grid.jqGrid('footerData','set',{totalAmount : colSum});

					        	   var colSum = $grid.jqGrid('getCol','newTotalAmt',false,'sum');
					        	   $grid.jqGrid('footerData','set',{totalAmount : colSum});
					           }
				});

				$("#jqGrid").jqGrid("navGrid", "#jqGridPager", {add: false});
				$("#jqGrid").jqGrid("navGrid", "#jqGridPager", {edit: false});
				$("#jqGrid").jqGrid("navGrid", "#jqGridPager", {del: false});
				var mydata = catmap;
				for(var i=0;i<mydata.length;i++){
					$("#jqGrid").addRowData(i,mydata[i]);



				}



					});




			$('#jqGrid').jqGrid('navGrid', '#jqGridPager', /*{
		        search: true,
		        searchtext: "Search",  //  Make the Search icon have a "Search" label next to it
		        edit: false,
		        add: false,
		        del: false,
		        refresh: false
		    },*/
					{}, // default settings for edit
					{}, // default settings for add
					{}, // delete
					{
						closeOnEscape: true, closeAfterSearch: true, ignoreCase: true, multipleSearch: false, multipleGroup: false, showQuery: false,
						sopt: ['cn', 'eq', 'ne'],
						defaultSearch: 'cn'
					}).navButtonAdd('#jqGridPager', {
						caption: "Export to Excel",
						id:'ExportToExcel',
						buttonicon: "ui-icon-disk",
						onClickButton : function(e)
						{
							exportData(e, '#jqGrid');
						},

						buttonicon: 'ui-icon-print',
						position: "last"
					});


				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
						$(loaderObj).hide();
						$(loaderObj).find('#errorDiv').show();

					}

					//var value= $('#fDate').val('');

				});


	}
}

var payment = new getPayment();

function getTotal()
{
	var grid = $("#jqGrid");
	sum = grid.jqGrid('getCol','newTotalAmt',false,'sum');
	document.getElementById("resolution").value = sum;

	sum2 = grid.jqGrid('getCol','cash',false,'sum')
	document.getElementById("resolution2").value = sum2; 

	sum3 = grid.jqGrid('getCol','card',false,'sum')
	document.getElementById("saleitem").value = sum3; 


}