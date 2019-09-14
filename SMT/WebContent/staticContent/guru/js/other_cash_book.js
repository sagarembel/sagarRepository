function getCashBankBookother()
{

	var fDate = $('#fDate').val();
	var tDate = $('#tDate').val();

	var input = document.getElementById('otherID'),
	list = document.getElementById('otherID_drop'),
	i,otherID;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			otherID = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["fDate"] = fDate;
	params["tDate"] = tDate;
	params["otherId"] = otherID;

	params["methodName"] = "getOtherCashBookReportBetTwoDates";



	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example').DataTable( {



				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over all pages
					/* total = api
				                .column( 6 )
				                .data()
				                .reduce( function (a, b) {
				                    return intVal(a) + intVal(b);
				                }, 0 ); 
				 			console.log(total); */
					// Total over this page
					pageTotal = api
					.column( 3 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 3 ).footer() ).html(
							'Rs'+' '+ parseFloat(pageTotal).toFixed(2));

					console.log( pageTotal);

					// Total over this page       
					pageTotal1 = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 4 ).footer() ).html(
							'Rs'+' '+parseFloat(pageTotal1).toFixed(2));


					console.log( pageTotal1);



				},

				destroy: true,
				searching: false,




				columns: [
				          {"data": "otherName", "width": "5%"},
				          {"data": "date" , "width": "5%"},
				          {"data": "persoName" , "width": "5%"},
				          {"data": "credit", "width": "5%"},
				          {"data": "debit" , "width": "5%"}


				          ]
			} );
		} );

		var mydata = catmap;
		$('#example').dataTable().fnAddData(mydata);

		/*$.each(catmap,function(i,v)

					{




				$("#list4").jqGrid({



					 datatype: "local",
					    height: 250,
					    width: '100%',

							search:true,
						    multiselect: true,
						    multiboxonly: true,  

					colNames:["Employee Name","Date","Person Name","credit", "debit"],
					colModel:[ 


							 	{

					        	 name:"empName",

					           },

					           { 	
					        	   name: "date",

					           },

					           {
					        	   name:"personName",
					           },


					           {
					        	   name:  "credit",

					           },

					           {
					        	   name: "debit",

					           },



							],
					           viewrecords: true,
					           width: 1000,
					           height: 200,
					           rowNum: 10,
					           loadonce:true,
					           stringResult:true,
					           pager: "#jqGridPager",
					           'cellEdit':true



				});

				$("#list4").jqGrid('filterToolbar', {
	                autosearch: true,
	                stringResult: true,
	                searchOnEnter: false,
	                defaultSearch: "cn",
	            });

				$("#list4").jqGrid("navGrid", "#jqGridPager", {add: false});
				$("#list4").jqGrid("navGrid", "#jqGridPager", {edit: false});
				$("#list4").jqGrid("navGrid", "#jqGridPager", {del: false});

					});
			var mydata = catmap;
			for(var j=0;j<mydata.length;j++){
			$("#list4").addRowData(j,mydata[j]);

			}

			$('#list4').jqGrid('navGrid', '#jqGridPager', {
		        search: true,
		        searchtext: "Search",  //  Make the Search icon have a "Search" label next to it
		        edit: false,
		        add: false,
		        del: false,
		        refresh: false
		    },
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
		            exportData(e, '#list4');
		        },

		        buttonicon: 'ui-icon-print',
		        position: "last"
		    });
		 */

			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}