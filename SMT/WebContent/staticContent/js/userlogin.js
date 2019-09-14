function validataionUserLogin()
{
	var typeId= $('#typeId').val();
	var userName = $('#userName123').val();
	var password=$('#password').val();
	var repassword=$('#repassword').val();

	if(typeId != null && typeId != "" && typeId != " "){
		if(userName != null && userName != "" && userName != " "){
			if(password != null && password != "" && password != " "){
				if(repassword != null && repassword != "" && repassword != " "){
					if(password == repassword){
						userLogin();
					}
					else{
						alert("Password and Re-Password is not match !");
					}

				}
				else{
					alert("Please enter Re-Password !");
				}
			}
			else{
				alert("Please enter password !");
			}
		}
		else{
			alert("Please enter username !");
		}
	}
	else{
		alert("Please select type !");
	}
}

function userLogin()
{
	var typeId= $('#typeId').val();
	var userName = $('#userName123').val();
	var password=$('#password').val();
	var repassword=$('#repassword').val();

	var params= {};

	params ["typeId"] = typeId;
	params ["userName"] = userName;
	params ["password"] = password;
	params ["repassword"] = repassword;

	params["methodName"] = "userLogin";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);


		if(document.createuser) 
		{
			document.createuser.reset();
		}
		location.reload();
		document.createuser.btn.disabled = false;

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
	function getAllUserList()
	{
	var params= {};
	params["methodName"] = "getUserList";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#userDetails').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#userDetails').DataTable( {
				
				 fnRowCallback : function(nRow, aData, iDisplayIndex){
		        	  $("th:first", nRow).html(iDisplayIndex +1);
		        	  return nRow;
		        	 },
				         
				         "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          //orderable: true,
				          "paging":   false,
				          "ordering": false,
				          "info":     false,
				          "scrollY": 250,
				          "scrollX": true,
				       
				          columns: [
				        	  		{"data": "pkUserId", "width": "5%", "defaultContent": ""},
				        	  		{"data": "typeId", "width": "5%", "defaultContent": ""},
				                    {"data": "userName", "width": "5%", "defaultContent": ""},
				                    {"data": "password", "width": "5%", "defaultContent": ""},
				                   ],
				                   
				                   dom: 'Bfrtip',
				   				buttons: [
				   				          /*'copy', 'csv', 'excel', 'pdf', 'print',*/
				   					 
				   	                     { extend: 'copyHtml5', footer: true },
				   	                     { extend: 'excelHtml5', footer: true },
				   	                     { extend: 'csvHtml5', footer: true },
				   	                     { extend : 'pdfHtml5', footer: true,
				   	                    	 title : function()
				   	                    	 {
				   	                    		 return "User Details";
				   	                    	 },
				   	                    	 orientation : 'landscape',
				   	                    	 pageSize : 'LEGAL',
				   	                    	 titleAttr : 'PDF' 
				   	                     } ]
			} );
		} );
	
		var mydata = catmap;
		$('#userDetails').dataTable().fnAddData(mydata);
		}
	);
}
	
	function getAllUsersToEdit()
	{
		var userType = $("#updateTypeId").val();
		
		$("#userNameList").empty();
		$("#password").empty();
		$("#repassword").empty();
		$("#userNameList").append($("<option></option>").attr("value","").text("Select User Name"));
		var params = {};
		params["userType"] = userType;	
		params["methodName"] = "getAllUsersToEdit";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		{
			var count = 1;
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
			{
				$("#userNameList").append($("<option></option>").attr("value",v.pkUserId).text(v.userName));
				count++;
			});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout")
				{
				}
		});
	}
	
	
	
	function updateUserDetails()
	{
		var updateTypeId= $('#updateTypeId').val();
		var pk_user_id = $('#userNameList').val();
		var updatePassword=$('#updatePassword').val();
		var UpdateRePassword=$('#UpdateRePassword').val();
		
		var updatePasswordUp = updatePassword.toUpperCase()
		var UpdateRePasswordUp = UpdateRePassword.toUpperCase();
		
		var checkPassword = /^\S*$/;
		
		if(updateTypeId == "select")
		{
			alert("Please Select Type");
			return false;
		}
		else{}
		
		if(pk_user_id == null || pk_user_id == "" || pk_user_id == undefined || pk_user_id == " ")
		{
			alert("Please Select Username");
			return false;
		}
		else if(updatePassword.match(checkPassword))
		{}
		
		if(updatePassword == null || updatePassword == "" || updatePassword == undefined || updatePassword == " ")
		{
			alert("Please Enter Password");
			return false;
		}
		else if(updatePassword.match(checkPassword))
		{}
		else
		{
			alert("Spaces are Not Allowed In Password");
			return false;
		}

		if(UpdateRePassword == null || UpdateRePassword == "" || UpdateRePassword == undefined || UpdateRePassword == " ")
		{
			alert("Please Enter Re-Password");
			return false;
		}
		else if(UpdateRePassword.match(checkPassword))
		{}
		else
		{
			alert("Spaces are Not Allowed In Password");
			return false;
		}
		
		if(updatePassword == UpdateRePassword)
		{}
		else
		{
			alert("Password Did Not Matched");
			return false;
		}
		
		var params= {};
		
		params ["updateTypeId"] = updateTypeId;
		params ["pk_user_id"] = pk_user_id;
		params ["updatePassword"] = updatePassword;
		params ["UpdateRePassword"] = UpdateRePassword;

		params["methodName"] = "updateUserDetails";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		{   			
			if(document.createuser) 
			{
				document.createuser.reset();
			}
			location.reload();
			document.createuser.btn.disabled = false;
		}
		).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}
	
/*	
	function updateUserDetails()
	{
		var updateTypeId= $('#updateTypeId').val();
		var pk_user_id = $('#userNameList').val();
		var updatePassword=$('#updatePassword').val();
		var UpdateRePassword=$('#UpdateRePassword').val();
		
		var updatePasswordUp = updatePassword.toUpperCase()
		var UpdateRePasswordUp = UpdateRePassword.toUpperCase();
		
		var checkPassword = /^\S*$/;
		
		if(updateTypeId == "select")
		{
			alert("Please Select Type");
			return false;
		}
		else{}
		
		if(pk_user_id == null || pk_user_id == "" || pk_user_id == undefined || pk_user_id == " ")
		{
			alert("Please Select Username");
			return false;
		}
		else if(updatePassword.match(checkPassword))
		{}
		
		if(updatePassword == null || updatePassword == "" || updatePassword == undefined || updatePassword == " ")
		{
			alert("Please Enter Password");
			return false;
		}
		else if(updatePassword.match(checkPassword))
		{}
		else
		{
			alert("Spaces are Not Allowed In Password");
			return false;
		}

		if(UpdateRePassword == null || UpdateRePassword == "" || UpdateRePassword == undefined || UpdateRePassword == " ")
		{
			alert("Please Enter Re-Password");
			return false;
		}
		else if(UpdateRePassword.match(checkPassword))
		{}
		else
		{
			alert("Spaces are Not Allowed In Password");
			return false;
		}
		
		if(updatePassword == UpdateRePassword)
		{}
		else
		{
			alert("Password Did Not Matched");
			return false;
		}
		
		var params= {};
		
		params ["updateTypeId"] = updateTypeId;
		params ["pk_user_id"] = pk_user_id;
		params ["updatePassword"] = updatePassword;
		params ["UpdateRePassword"] = UpdateRePassword;

		params["methodName"] = "updateUserDetails";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		{   
			alert(data);
			
			if(document.createuser) 
			{
				document.createuser.reset();
			}
			location.reload();
			document.createuser.btn.disabled = false;
		}
		).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}
*/



