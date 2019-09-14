<html>
<head>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.min.js"></script>
<script>    
	$(document).ready(function(){
   		 $("#dbType").change(function(){
        	$(this).find("option:selected").each(function(){
            	if($(this).attr("value")=="other"){
            	$("#otherType").show(); 	
            	}
           	 else if($(this).attr("value")!="other"){
            	$("#otherType").hide(); 
            }
        });
    }).change();
});
</script>
</head>
<body>
	<label for="db">Choose type</label>
	<select name="dbType" id="dbType">
		<option>Choose Database Type</option>
		<option value="oracle">Oracle</option>
		<option value="mssql">MS SQL</option>
		<option value="mysql">MySQL</option>
		<option value="other">Other</option>
	</select>
	<div id="otherType" style="display: none;">
		<label for="specify">Specify</label> <input type="text" name="specify"
			placeholder="Specify Databse Type" />
	</div>
</body>
</html>
