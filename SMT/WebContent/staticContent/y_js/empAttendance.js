function empattend(){
	document.empatd.btn.disabled = true; 
	var id= $('#id').val();
	var attended= $('#attended').val();
	var params= {};
	params["id"] = id;
	params["attended"] = attended;
	params["methodName"] = "regempAttend";

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

function empAttend1(){
	this.empAttend = empAttend;
}      

function empAttend(){
	$("#jqGrid").jqGrid("clearGridData");
	var params ={};
	var maincat = $("#EmpName").val();
	params ["methodName"] = "getAttendanceByEmp";
	params ["EmpName"] = maincat;

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){

		var jsonData1 = $.parseJSON(data);
		// var catmap = jsonData1.list;
		$.each(jsonData1,function(i,v)
				{


			v.id;
			v.empName;
			v.department;
			v.designation;
			v.totalworkday;
			v.leaveday;
			v.attendday;
			v.paidleaveday;
			v.unpaidleaveday;
			v.halfday;
			$(document).ready(function () {
				rownumbers: true,

				$("#jqGrid").jqGrid({

					datatype:"local",

					colNames: ["Id","Name","Department","Designation", "Total Working Days","Attended","Leave","Paid Leave","Unpaid Leave","Half Day" ],

					colModel: [
					           { 	
					        	   name: "id",
					        	   width:70,

					           },

					           {
					        	   name: "empName",
					        	   width: 150,
					           },	
					           {
					        	   name: "department",
					        	   width: 200,
					           },	

					           {
					        	   name:  "designation",
					        	   width: 200,
					           },

					           {
					        	   name: "totalworkday",
					        	   width: 100,

					           },

					           {
					        	   name: "leaveday",
					        	   width: 80,

					           },

					           {
					        	   name:'attendday',
					        	   width: 80,
					           },

					           {
					        	   name: "paidleaveday",
					        	   width: 80,

					           },

					           {
					        	   name:"unpaidleaveday",
					        	   width: 80,
					           },

					           {
					        	   name:"halfday",
					        	   width: 80,
					           },


					           ],

					           loadonce: true,
					           viewrecords: true,
					           width: 1000,
					           height: 100,
					           rowNum: 10,
				});

			$("#jqGrid").addRowData(i,jsonData1[i]);
			});
				});
	});   
}
var shree = new empAttend1();	 

function reset()
{
	document.empatd.reset();	
}
