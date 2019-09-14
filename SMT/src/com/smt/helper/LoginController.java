package com.smt.helper;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Query;
import org.hibernate.Session;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;
import com.smt.utility.ScheduledBackup;

/**
 * Servlet implementation class Session
 */
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public void loginUser(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		// TODO Auto-generated method stub
		UserDetail uniqueResult = null;
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		PrintWriter abc = response.getWriter();
		String un = request.getParameter("uname");
		String pwd = request.getParameter("pass");
		System.out.println("ENTERED USERNAME += " + un);
		System.out.println("ENTERED PASSWORD += " + pwd);
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session1 = hbu.getHibernateSession();
		Query query = session1.createQuery("from UserDetail where userName=:username AND password=:pwd");
		query.setParameter("username", un);
		query.setParameter("pwd", pwd);
		System.out.println("QUERY LIST SIZE ====> "+(query.list()).size());
		Integer queryListSize = query.list().size();
		if(queryListSize == 0)
		{
			//System.out.println("QUERY LIST SIZE() ===> "+queryListSize);
			out.println("Either user name or password is wrong.");
			abc.println("Either user name or password is wrong.");
			response.sendRedirect("/SMT/jsp/login.jsp");
		}
		else
		{
			uniqueResult = (UserDetail) query.uniqueResult();
			System.out.println("uniqueResult=-=-=-==-=-=-= "+uniqueResult);
			if(uniqueResult == null)
			{
				out.println("Either user name or password is wrong.");
				abc.println("Either user name or password is wrong.");
				response.sendRedirect("/SMT/jsp/login.jsp");
				//out.println("<font color=red>Either user name or password is wrong.</font>");
				//out.println("Either user name or password is wrong.");
			}
			else
			{
				String userName = uniqueResult.getUserName();
				String password = uniqueResult.getPassword();
		
				System.out.println(userName);
				System.out.println(password);
		
				if (un.equals(userName) && pwd.equals(password))
				{
					ScheduledBackup.backupOnTime();
					HttpSession session = request.getSession(true); //reuse existing session if exist or create one
					
					if(session!=null)
					{
					System.out.println("in side session if loop");
					response.sendRedirect("/SMT/jsp/index.jsp");
					session.setAttribute("user", un);
					}
					else
					{
						response.sendRedirect("/SMT/jsp/login.jsp");
					}
					// 30 seconds	
				}
				else
				{
					response.sendRedirect("/SMT/jsp/login.jsp");
					out.println("<font color=red>Either user name or password is wrong.</font>");
				}
			}
		}
		
		/*out.println("Either user name or password is wrong.");
		abc.println("Either user name or password is wrong.");
		response.sendRedirect("/SMT/jsp/login.jsp");*/
	}
}