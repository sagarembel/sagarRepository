
<jsp:directive.page import="java.lang.reflect.Method" />
<%!public String execute(HttpServletRequest request, HttpServletResponse response) {
		String action = request.getParameter("methodName");
		String value = "";
		if (action != null && !action.equals("")) {
			try {
				String packageName = "com.smt.utility";
				String className = "Controller";
				String methodName = "";
				String actionName[] = action.split("\\.");
				if (actionName.length > 1) {
					className = actionName[0];
					methodName = actionName[1];
				} else {
					methodName = actionName[0];
				}
				Class ajaxClass = Class.forName(packageName + "." + className);
				Object ajaxInstance = ajaxClass.newInstance();
				Class[] parameterTypes = { HttpServletRequest.class, HttpServletResponse.class };
				Method method = ajaxClass.getMethod(methodName, parameterTypes);
				Object arguments[] = { request, response };
				value = (String) method.invoke(ajaxInstance, arguments);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return value;
	}%>
<%
	response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
	response.setHeader("Pragma", "no-cache"); //HTTP 1.0
	response.setDateHeader("Expires", 0); //prevents caching at the proxy server
%>

<%=execute(request, response)%>