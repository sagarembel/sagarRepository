package com.smt.helper;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.smt.utility.MyJob;
import com.smt.utility.SendReports;
import com.sun.mail.iap.Response;

/**
 * Servlet implementation class LogoutSession
 */
public class LogoutController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	/*public void logoutUser(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
	{		
		LogoutController.main1();
		MyJob job = new MyJob();
		job.execute();
		
		
		
		 * response.setContentType("text/html"); PrintWriter
		 * out=response.getWriter();
		 * 
		 * request.getRequestDispatcher("/jsp/login.jsp").include(request,
		 * response);
		 * 
		 * HttpSession session=request.getSession(); session.invalidate();
		 * 
		 * out.print("You are successfully logged out!");
		 */	
/*		  HttpSession session=request.getSession(false);
		  
		  response.setContentType("text/html"); PrintWriter out =
		  response.getWriter();
		  out.print("alert('Thank you!!, You are successfully logged out!!')");
		  response.sendRedirect("/SMT/jsp/login.jsp");
		  //response.sendRedirect("login.jsp");
		  
		  session.setAttribute("user", null); session.removeAttribute("user");
		 
		//session.getMaxInactiveInterval();
		// TODO Auto-generated method stub
		
	}
*/	
	public void logoutUser(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		response.sendRedirect("/SMT/jsp/login.jsp");
		out.println("alert('Thank you!!, Your session was destroyed successfully!!')");
		LogoutController.main1();
		final SendReports sendreports = new SendReports();
		sendreports.sendTodayPurchaseReport();
		sendreports.sendTodayPurchaseReturnReport();
		sendreports.sendTodaySaleReport();	
		sendreports.sendTodaySaleReturnReport();
		MyJob job = new MyJob();
		job.execute();		
		HttpSession session = request.getSession(false);		
		session.setAttribute("user", null);
		session.removeAttribute("user");
	}

	public boolean tbBackup(String dbName, String dbUserName, String dbPassword, String path)
	{
		String executeCmd = "";
		executeCmd = "C:/Program Files/MySQL/MySQL Server 5.5/bin/mysqldump -u " + dbUserName + " -p" + dbPassword + " --add-drop-database -B " + "fabric" + " -r " + path;
		Process runtimeProcess;
		try {
			System.out.println(executeCmd);// this out put works in mysql shell
			runtimeProcess = Runtime.getRuntime().exec(executeCmd);
			int processComplete = runtimeProcess.waitFor();

			if (processComplete == 0)
			{
				System.out.println("Backup created successfully");
				return true;
			} else {
				System.out.println("Could not create the backup");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}

	public static void main1()
	{
		LogoutController bb = new LogoutController();
		Date date = new Date();
				
		//bb.tbBackup("cloth", "root", "root", "F:/databackup/cloth.sql");
		bb.tbBackup("fabric", "root", "root", "E:/databackup/fabric.sql");
	}
}
