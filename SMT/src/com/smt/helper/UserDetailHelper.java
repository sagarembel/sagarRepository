package com.smt.helper;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.dao.UserDetailDao;
import com.smt.hibernate.Category;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class UserDetailHelper {

	// Register User Detail
	public void userLogin(HttpServletRequest request, HttpServletResponse response)
	{
		UserDetail userDetail = new UserDetail();
		String typeId = request.getParameter("typeId");
		String password = request.getParameter("password");
		String userName = request.getParameter("userName");
		String repassword = request.getParameter("repassword");

		userDetail.setTypeId(typeId);
		userDetail.setPassword(password);
		userDetail.setRepassword(repassword);
		userDetail.setUserName(userName);

		UserDetailDao userDetailDao = new UserDetailDao();
		userDetailDao.registerUser(userDetail);
		// TODO Auto-generated method stub
	}

	public List getAlluserName() {
		UserDetailDao dao = new UserDetailDao();
		return dao.getAlluserName();
	}
	
	public List getAllUserListHelper(HttpServletRequest request, HttpServletResponse response) {

		Map<Long, Category> map = new HashMap<Long, Category>();

		UserDetailDao dao = new UserDetailDao();
		List<Category> userList = dao.getAlluserName();

		return userList;

	}
	
	public Map getAllUsersToEditHelper(String typeId) {

		Map<Long, UserDetail> map = new HashMap<Long, UserDetail>();

		UserDetailDao dao = new UserDetailDao();
		List catList = dao.getAllUsersToEditDao(typeId);
		Map map1 = new HashMap();
		for (int i = 0; i < catList.size(); i++)
		{
			Object[] o = (Object[]) catList.get(i);
			UserDetail bean = new UserDetail();
			bean.setPkUserId(Long.parseLong(o[0].toString()));
			bean.setUserName(o[1].toString());

			System.out.println("***************" + o[0] + "\t" + o[1]);
			map1.put(bean.getPkUserId(), bean);
		}
		return map1;
	}
	
	public String updateUserDetailsHelper(HttpServletRequest request, HttpServletResponse response)
	{
		String updateTypeId = request.getParameter("updateTypeId");
		String pk_user_id = request.getParameter("pk_user_id");
		String updatePassword = request.getParameter("updatePassword");
		String UpdateRePassword = request.getParameter("UpdateRePassword");
		String msg = "Updated Successfully,\n Please Login Again!!";
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			System.out.println("updateTypeId ===> "+updateTypeId);	
			Query query = session.createSQLQuery("UPDATE user_details SET password='"+updatePassword+"', repassword='"+UpdateRePassword+"' WHERE pk_user_id="+pk_user_id);			
			query.executeUpdate();
			transaction.commit();
			System.out.println("updateTypeId ===> "+updateTypeId);
			if(updateTypeId.equalsIgnoreCase("admin"))
			{
				response.setContentType("text/html");
				PrintWriter out = response.getWriter();
				response.sendRedirect("/SMT/jsp/login.jsp");
				//out.println(msg);
				
				HttpSession sessionHttp = request.getSession(false);		
				sessionHttp.setAttribute("user", null);
				sessionHttp.removeAttribute("user");
			}
			else{}
	
			System.out.println("Record updated successfully.");
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

		if(updateTypeId.equalsIgnoreCase("admin"))
		{
			return msg;
		}
		else
		{
			return "Updated Successfully";
		}
	}

}
