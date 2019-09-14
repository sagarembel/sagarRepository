
function stockHelper()
{
	var offerList="";
	this.graph = graph;
	this.month = month;
	this.day = day;
	this.shopday = shopday;
	this.shopweek = shopweek;
	this.shopmonth = shopmonth;
	this.shopyear = shopyear;
	this.shopNetTotalFor1=shopNetTotalFor1;
	this.shopNetTotalFor2=shopNetTotalFor2;
	this.shopNetTotalFor3=shopNetTotalFor3;

	function day()
	{
		var params= {};

		params["methodName"] = "getAllDay";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;

			var sss = $.map(catmap, function(el) { return el.price });
			var ddd = $.map(catmap, function(el) { return el.weekDays });


			$(function () {
				Highcharts.chart('container', {
					chart: {
						type: 'column'
					},
					title: {
						text: 'Daily Sale'
					},
					subtitle: {
						text: 'Source: embel.co.in'
					},
					xAxis: {
						categories: ddd

					},
					yAxis: {
						min: 0,
						title: {
							text: 'Price (Rs)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{

						name: 'Price',
						data: sss



					}]
				});
			});

				});
	}


	function shopNetTotalFor1()
	{
		var params= {};

		params["methodName"] = "shopNetTotalFor1";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;



			var arr1 = $.map(catmap, function(el) { return el.newTotalAmt });

			/*arr1 = arr1 + "";
			var abc = arr1.split("").reverse().join("");

			var ac = abc.length;

			for(var i=0;i<ac;i++){

			switch(i) {
		    case 3:
		        abc.join(i,',');
		        break;
		    case 5:
		    	abc.join(i,',');
		        break;
		    default:
		    	break;
		}

			}	*/
			document.getElementById('shop1').value = arr1;

				});
	}

	function shopNetTotalFor2()
	{
		var params= {};

		params["methodName"] = "shopNetTotalFor2";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;



			var arr1 = $.map(catmap, function(el) { return el.newTotalAmt });

			/*arr1 = arr1 + "";
			var abc = arr1.split("").reverse().join("");

			var ac = abc.length;

			for(var i=0;i<ac;i++){

			switch(i) {
		    case 3:
		        abc.join(i,',');
		        break;
		    case 5:
		    	abc.join(i,',');
		        break;
		    default:
		    	break;
		}

			}	*/
			document.getElementById('shop2').value = arr1;

				});
	}

	function shopNetTotalFor3()
	{
		var params= {};

		params["methodName"] = "shopNetTotalFor3";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;



			var arr1 = $.map(catmap, function(el) { return el.newTotalAmt });

			/*arr1 = arr1 + "";
			var abc = arr1.split("").reverse().join("");

			var ac = abc.length;

			for(var i=0;i<ac;i++){

			switch(i) {
		    case 3:
		        abc.join(i,',');
		        break;
		    case 5:
		    	abc.join(i,',');
		        break;
		    default:
		    	break;
		}

			}	*/
			document.getElementById('shop3').value = arr1;

				});
	}

	function graph()
	{
		var params= {};

		params["methodName"] = "getAllWeek";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;

			var arr = $.map(catmap, function(el) { return el.week });
			var sss = $.map(catmap, function(el) { return el.price });
			var ddd = $.map(catmap, function(el) { return el.weekDays });


			$(function () {
				Highcharts.chart('container', {
					chart: {
						type: 'column'
					},
					title: {
						text: 'Weekly Sale'
					},
					subtitle: {
						text: 'Source: embel.co.in'
					},
					xAxis: {
						categories: ddd
						/*categories: [
			                'MON-SUN','MON-SUN','MON-SUN','MON-SUN','MON-SUN','MON-SUN'
			            ],
			            crosshair: true*/
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Price (Rs)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{

						name: 'Price',
						data: sss



					}]
				});
			});

				});
	}


	function month()
	{
		var params= {};

		params["methodName"] = "getAllMonth";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;

			var arr = $.map(catmap, function(el) { return el.week });
			var sss = $.map(catmap, function(el) { return el.price });
			var ddd = $.map(catmap, function(el) { return el.weekDays });


			$(function () {
				Highcharts.chart('container', {
					chart: {
						type: 'column'
					},
					title: {
						text: 'Monthly Sale'
					},
					subtitle: {
						text: 'Source: embel.co.in'
					},
					xAxis: {
						categories: ddd
						/*categories: [
			                'MON-SUN','MON-SUN','MON-SUN','MON-SUN','MON-SUN','MON-SUN'
			            ],
			            crosshair: true*/
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Price (Rs)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{

						name: 'Price',
						data: sss



					}]
				});
			});

				});
	}


	function shopday()
	{
		var params= {};

		params["methodName"] = "getAllShopDay";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;

			var arr = $.map(catmap, function(el) { return el.shopId });
			var sss = $.map(catmap, function(el) { return el.price });
			var ddd = $.map(catmap, function(el) { return el.Weekdays });


			$(function () {
				Highcharts.chart('container', {
					chart: {
						type: 'column'
					},
					title: {
						text: 'Daily Shop Sale'
					},
					subtitle: {
						text: 'Source: embel.co.in'
					},
					xAxis: {
						categories: ddd

					},
					yAxis: {
						min: 0,
						title: {
							text: 'Price (Rs)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{

						name: 'Price',
						data: sss

					}]
				});
			});

				});
	}


	function shopweek()
	{
		var params= {};

		params["methodName"] = "getAllShopWeek";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;

			var arr = $.map(catmap, function(el) { return el.shopId });
			var sss = $.map(catmap, function(el) { return el.price });
			var ddd = $.map(catmap, function(el) { return el.Weekdays });


			$(function () {
				Highcharts.chart('container', {
					chart: {
						type: 'column'
					},
					title: {
						text: 'Weekly Shop Sale'
					},
					subtitle: {
						text: 'Source: embel.co.in'
					},
					xAxis: {
						categories: ddd

					},
					yAxis: {
						min: 0,
						title: {
							text: 'Price (Rs)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{

						name: 'Price',
						data: sss

					}]
				});
			});

				});
	}



	function shopmonth()
	{
		var params= {};

		params["methodName"] = "getAllShopMonth";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;

			var arr = $.map(catmap, function(el) { return el.shopId });
			var sss = $.map(catmap, function(el) { return el.price });
			var ddd = $.map(catmap, function(el) { return el.Weekdays });


			$(function () {
				Highcharts.chart('container', {
					chart: {
						type: 'column'
					},
					title: {
						text: 'Monthly Shop Sale'
					},
					subtitle: {
						text: 'Source: embel.co.in'
					},
					xAxis: {
						categories: ddd

					},
					yAxis: {
						min: 0,
						title: {
							text: 'Price (Rs)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{

						name: 'Price',
						data: sss

					}]
				});
			});

				});
	}


	function shopyear()
	{
		var params= {};

		params["methodName"] = "getAllShopYear";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{

			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;

			var arr = $.map(catmap, function(el) { return el.shopId });
			var sss = $.map(catmap, function(el) { return el.price });
			var ddd = $.map(catmap, function(el) { return el.Weekdays });


			$(function () {
				Highcharts.chart('container', {
					chart: {
						type: 'column'
					},
					title: {
						text: 'Yearly Shop Sale'
					},
					subtitle: {
						text: 'Source: embel.co.in'
					},
					xAxis: {
						categories: ddd

					},
					yAxis: {
						min: 0,
						title: {
							text: 'Price (Rs)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{

						name: 'Price',
						data: sss

					}]
				});
			});

				});
	}

}


var stock = new stockHelper();