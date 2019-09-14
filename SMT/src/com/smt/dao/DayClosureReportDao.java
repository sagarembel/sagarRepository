package com.smt.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class DayClosureReportDao
{

	public List getTodayCashAmountDao(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		String type2 = "";
        String name2 = "";
        Long uid = null ;
		try {
			System.out.println("userType == > "+userType+" userName ===> "+userName);
			try
			{			        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:userName");
	        	 query1.setParameter("userName", userName);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
		         
	        	 System.out.println("uid ******************************>>>>>>>>> "+uid);
		         System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		         System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
			}
			catch(Exception e)
			{
				e.fillInStackTrace();
			}
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = null;
			if(userName.equalsIgnoreCase("admin"))
			{	
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cash'");
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cashAmount),0) from (select DISTINCT BillNo, cashCard_cashAmount from otherbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='cash') AND Quantity > 0) ob;");
			}
			else
			{
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cash' AND ob.EmpId_Fk="+uid);
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cashAmount),0) from (select DISTINCT BillNo, cashCard_cashAmount from otherbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='cash') AND EmpId_Fk="+uid+" AND Quantity > 0) ob;");
			}
			
			//query.setParameter("date", date);
			list = query.list();
			System.out.println("SIZE OF LIST getTodayCashAmountDao ====> "+list.size());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getTodayCardAmountDao(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));
		String type2 = "";
        String name2 = "";
        Long uid = null ;
		try {
			System.out.println("userType == > "+userType+" userName ===> "+userName);
			try
			{			        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:userName");
	        	 query1.setParameter("userName", userName);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
		         
	        	 System.out.println("uid ******************************>>>>>>>>> "+uid);
		         System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		         System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
			}
			catch(Exception e)
			{
				e.fillInStackTrace();
			}
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = null;
			if(userName.equalsIgnoreCase("admin"))
			{
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='card'");
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cardAmount),0) from (select DISTINCT BillNo, cashCard_cardAmount from otherbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='card')) ob;");
			}
			else
			{
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='card' AND EmpId_Fk="+uid);
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cardAmount),0) from (select DISTINCT BillNo, cashCard_cardAmount from otherbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='card') AND EmpId_Fk="+uid+") ob;");
			}

			//query.setParameter("date", date);
			list = query.list();
			System.out.println("SIZE OF LIST getTodayCashAmountDao ====> "+list.size());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getTodayChequeAmountDao(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		String type2 = "";
        String name2 = "";
        Long uid = null ;
		try {
			System.out.println("userType == > "+userType+" userName ===> "+userName);
			try
			{			        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:userName");
	        	 query1.setParameter("userName", userName);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
		         
	        	 System.out.println("uid ******************************>>>>>>>>> "+uid);
		         System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		         System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
			}
			catch(Exception e)
			{
				e.fillInStackTrace();
			}
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			Query query = null;
			if(userName.equalsIgnoreCase("admin"))
			{
				query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cheque'");
			}
			else
			{
				query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cheque' AND EmpId_Fk="+uid);
			}

			//query.setParameter("date", date);
			list = query.list();
			System.out.println("SIZE OF LIST getTodayCashAmountDao ====> "+list.size());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getTodayNeftAmountDao(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		String type2 = "";
        String name2 = "";
        Long uid = null ;
		try {
			System.out.println("userType == > "+userType+" userName ===> "+userName);
			try
			{			        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:userName");
	        	 query1.setParameter("userName", userName);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
		         
	        	 System.out.println("uid ******************************>>>>>>>>> "+uid);
		         System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		         System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
			}
			catch(Exception e)
			{
				e.fillInStackTrace();
			}
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = null;
			
			if(userName.equalsIgnoreCase("admin"))
			{
				query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='neft'");
			}
			else
			{
				query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='neft' AND EmpId_Fk = "+uid);
			}
			//query.setParameter("date", date);
			list = query.list();
			System.out.println("SIZE OF LIST getTodayCashAmountDao ====> "+list.size());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
		
	public List getTodayCreditCustCashAmountDao(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		String type2 = "";
        String name2 = "";
        Long uid = null ;
		try {
			System.out.println("userType == > "+userType+" userName ===> "+userName);
			try
			{			        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:userName");
	        	 query1.setParameter("userName", userName);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
		         
	        	 System.out.println("uid ******************************>>>>>>>>> "+uid);
		         System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		         System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
			}
			catch(Exception e)
			{
				e.fillInStackTrace();
			}
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = null;
			if(userName.equalsIgnoreCase("admin"))
			{	
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cash'");
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cashAmount),0) from (select DISTINCT BillNo, cashCard_cashAmount from creditcustomerbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='cash') AND Quantity > 0) ob;");
			}
			else
			{
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cash' AND ob.EmpId_Fk="+uid);
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cashAmount),0) from (select DISTINCT BillNo, cashCard_cashAmount from creditcustomerbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='cash') AND EmpId_Fk="+uid+" AND Quantity > 0) ob;");
			}
			
			//query.setParameter("date", date);
			list = query.list();
			System.out.println("SIZE OF LIST getTodayCashAmountDao ====> "+list.size());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	
	
	public List getTodayCreditCustCardAmountDao(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		String type2 = "";
        String name2 = "";
        Long uid = null ;
		try {
			System.out.println("userType == > "+userType+" userName ===> "+userName);
			try
			{			        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:userName");
	        	 query1.setParameter("userName", userName);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
		         
	        	 System.out.println("uid ******************************>>>>>>>>> "+uid);
		         System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		         System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
			}
			catch(Exception e)
			{
				e.fillInStackTrace();
			}
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = null;
			if(userName.equalsIgnoreCase("admin"))
			{	
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cash'");
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cardAmount),0) from (select DISTINCT BillNo, cashCard_cardAmount from creditcustomerbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='card')  AND Quantity > 0) ob;");
			}
			else
			{
				//query = session.createSQLQuery("select ob.pkOtherBillId, SUM(ob.SalePrice-Discount) from otherbill ob where ob.Date='"+date+"' AND ob.payment_mode='cash' AND ob.EmpId_Fk="+uid);
				query = session.createSQLQuery("select COUNT(*), COALESCE(sum(ob.cashCard_cardAmount),0) from (select DISTINCT BillNo, cashCard_cardAmount from creditcustomerbill WHERE Date='"+date+"' AND (payment_mode='cashAndCard' OR payment_mode='card') AND EmpId_Fk="+uid+" AND Quantity > 0) ob;");
			}
			
			//query.setParameter("date", date);
			list = query.list();
			System.out.println("SIZE OF LIST getTodayCashAmountDao ====> "+list.size());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
