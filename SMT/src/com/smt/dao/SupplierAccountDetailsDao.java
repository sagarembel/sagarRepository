package com.smt.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.tools.ant.taskdefs.Echo;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.GetSupplierDetails;
import com.smt.hibernate.CashBankBookDataDateWise;
import com.smt.hibernate.SupplierAccountDetailsBean;
import com.smt.hibernate.SupplierDetail;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class SupplierAccountDetailsDao {

	public void supplierAccount(SupplierAccountDetailsBean sadb) {

		System.out.println("In DAO");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			System.out.println("Tx started");

			Long fkSupplierId = sadb.getFk_supplier_id();
			SupplierDetail detail = (SupplierDetail) session.load(SupplierDetail.class, fkSupplierId);
			System.out.println(detail);
			sadb.setSupplierDetailsBean(detail);
			session.save(sadb);
			transaction.commit();
			System.out.println("Successful");
		} catch (RuntimeException e) {
			try {
				transaction.rollback();
			} catch (RuntimeException rbe) {
				Log.error("Couldn't roll back tranaction", rbe);
			}
		} finally {
			hbu.closeSession(session);
		}
	}

	public List getAllBillBySuppliers(String supplierId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.bill_number,s.insertDate from goods_receive s where s.fk_supplier_id=" + supplierId);
			list = query.list();

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

	public List getTotalAmtByBillNoForCustomer(String billNo, String supplierId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select s.GrossTotal,s.Total from goodreceive s where s.BillNo=:billNo And s.FksuppId=:supplierId");
			Query query = session.createSQLQuery("select SUM(s.Total), s.pending_bill_payment from goodreceive s where s.FksuppId=:supplierId");
			//query.setParameter("billNo", billNo);
			query.setParameter("supplierId", supplierId);
			list = query.list();

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

	public List getbalanceAmtByBillNo(String billNo, String supplier)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("SELECT s.payment , g.GrossTotal, s.total_amount, s.balance from supplier_payment s left join goodreceive g ON g.BillNo = s.bill_no WHERE g.BillNo =:billNo AND g.FksuppId =:supplier group by pk_supplier_payment_id");
			//Query query = session.createSQLQuery("SELECT s.payment , g.GrossTotal, s.total_amount, s.balance from supplier_payment s left join goodreceive g ON g.BillNo = s.bill_no WHERE s.bill_no =:billNo AND s.fk_supplier_id =:supplier group by pk_supplier_payment_id");
			Query query = session.createSQLQuery("SELECT s.payment, SUM(g.Total), s.total_amount, s.balance from supplier_payment s left join goodreceive g ON g.FksuppId = s.fk_supplier_id WHERE s.fk_supplier_id =:supplier group by pk_supplier_payment_id desc limit 1");
			//query.setParameter("billNo", billNo);
			query.setParameter("supplier", supplier);
			list = query.list();

		}
		catch (Exception e)
		{
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

	public Double getTotalAmt(String billNo, String supplier) {

		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		Double totalAmt = null;
		List<GetSupplierDetails> itemlist = null;
		String newBal = "";
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select s.GrossTotal,s.Total from goodreceive s left join supplier_payment g ON s.FksuppId = g.fk_supplier_id where s.BillNo=:billNo And s.FksuppId=:supplier ORDER BY s.Total AND s.GrossTotal DESC LIMIT 1");
			Query query = session.createSQLQuery("select SUM(s.Total), g.total_amount, g.balance from goodreceive s left join supplier_payment g ON s.FksuppId = g.fk_supplier_id where s.FksuppId=:supplier");
			//query.setParameter("billNo", billNo);
			query.setParameter("supplier", supplier);
			list = query.list();
			itemlist = new ArrayList<GetSupplierDetails>(0);

			for (Object[] objects : list)
			{
				GetSupplierDetails bean = new GetSupplierDetails();

				if(objects[0] == null)
				{
					newBal = "0";
					totalAmt = Double.valueOf(newBal);
				}
				else
				{
					newBal = (objects[0].toString());
					totalAmt = Double.valueOf(newBal);					
				}

				itemlist.add(bean);
			}

		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return totalAmt;

	}

	public List getYesterdarTotalAmount() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT onDate, totalAmount FROM cashbankbooktable ORDER BY pkLastCashId DESC LIMIT 1");
			list = query.list();

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

	public List getYesterdaySuppCredit(String yesterday) {
		// TODO Auto-generated method stub
		return null;
	}

	public void registeryesterdayTotal(CashBankBookDataDateWise cs) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			System.out.println("Tx started");

			session.save(cs);
			transaction.commit();
			System.out.println("Successful By Sonal Register Yesterday Total AMT");
		} catch (RuntimeException e) {
			try {
				transaction.rollback();
			} catch (RuntimeException rbe) {
				Log.error("Couldn't roll back tranaction", rbe);
			}
		} finally {
			hbu.closeSession(session);
		}

	}

	public List getDiffBetDates() {
		// TODO Auto-generated method stub

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyyMMdd");
		Date dateobj = new Date();
		String todayDate = dateFormat1.format(dateobj);

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("SELECT date , totalAmount FROM CashBankBookDataDateWise ORDER BY date DESC LIMIT 1");
			list = query.list();

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

	public List getTodaySaleTotalAmount() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select DISTINCT COUNT(DISTINCT BillNo), sum(DISTINCT  GrossTotal) from creditcustomerbill where Date=:date");
			query.setParameter("date", date);
			list = query.list();

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

	public List getTodaySaleTotalAmount1(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		
		/*HibernateUtility hbu2 = null;
		Session session2 = null;*/
		
		List list = null;
		List list2 = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));
		//String date = "2018-05-11";
		System.out.println("print date for dashboard TODAY OTHER BILL AMOUNT ===============> "+date);
 
		String type2 = "";
        String name2 = "";
        Long uid = null ;
		
		try
		{
			try
			{
				System.out.println("userType == > "+userType+" userName ===> "+userName);
					        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:userName");
	        	 query1.setParameter("userName", userName);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
		         
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
				query = session.createSQLQuery("select BillNo, GrossTotal from otherbill where Date='"+date+"' group by BillNo");				
			}
			else
			{
				System.out.println("UID ----------> "+uid);
				query = session.createSQLQuery("select BillNo, GrossTotal from otherbill where Date='"+date+"' AND EmpId_Fk="+uid+" group by BillNo");
			}
			
			list = query.list();
			
			System.out.println(list);

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

	public List getTodaySaleReturnTotalAmount()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));
		System.out.println("Todays Date"+date);
			
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			/*Query query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate=:date");*/
			Query query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate=:date AND ReturnQuantuty > 0 AND Customer_Type='Tax Invoice'");		
			query.setParameter("date", date);
			list = query.list();

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
	
	
	
	public List getTodaySaleReturnTotalAmount(String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));
		System.out.println("Todays Date"+date);
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
		         
		         System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		         System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
			}
			catch(Exception e)
			{
				e.fillInStackTrace();
			}
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			/*Query query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate=:date");*/
			Query query = null;
			if(userName.equalsIgnoreCase("admin"))
			{
				query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate='"+date+"' AND ReturnQuantuty > 0 AND Customer_Type='Tax Invoice'");
			}
			else
			{
				query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate='"+date+"' AND ReturnQuantuty > 0 AND Customer_Type='Tax Invoice' AND FkUserId="+uid);
			}
			list = query.list();

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
	
	public List getTodayCreditTotalAmountDao()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		//SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd-MM-yyyy");
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));
		System.out.println("getTodayCreditTotalAmountDao =========> Todays Date"+date);

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			/*Query query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate=:date");*/
			Query query = session.createSQLQuery("select BillNo, GrossTotal from creditcustomerbill where Date=:date group by BillNo");
			query.setParameter("date", date);
			list = query.list();

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
	
	public List getTodayCreditReturnTotalAmountDao()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));
		System.out.println("Todays Date"+date);

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			/*Query query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate=:date");*/
			Query query = session.createSQLQuery("select BillNo, Return_Total from salereturn where BillReturnDate=:date AND ReturnQuantuty > 0 AND Customer_Type='Credit Customer'");
			query.setParameter("date", date);
			list = query.list();

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
	
	public List getTodayPurchaseReturnTotalAmount() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select BillNo, Return_Total from purchasereturn where ReturnDate=:date");
			query.setParameter("date", date);
			list = query.list();

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
	
	public List getTodayPurchaseTotalAmount() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select DISTINCT COUNT(DISTINCT BillNo), sum(DISTINCT GrossTotal) from goodreceive where Date=:date");
			query.setParameter("date", date);
			list = query.list();

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
