package com.smt.dao;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.ItemList;
import com.smt.bean.allTransactionId;
import com.smt.bean.expenditureList;
import com.smt.hibernate.ExpenditureDetailsBean;
import com.smt.utility.HibernateUtility;

public class ExpenditureDetailsDao
{
	public void addExpenseDetails(ExpenditureDetailsBean bean)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			System.out.println("Tx started");
			session.save(bean);
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

	public List getAllExpenseName() {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from ExpenditureDetailsBean");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllUnits", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;

	}

	// get All expense Names
	public List getAllExpenseNames()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from ExpenditureDetailsBean");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllExpenseNames", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;

	}
	
	public List getTodayExpdCreditAmount() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String date = (dateFormat1.format(date1));
		String credit = "credit";
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select ep.fk_expense_detail_id, SUM(ep.payment) from expenditure_payment ep where ep.paymentType =:credit AND ep.insert_date=:date");
			query.setParameter("credit", credit);
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
	
	
	public List getTodayExpdDebitAmount()
	{
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
			Query query = session.createSQLQuery("select ep.fk_expense_detail_id, SUM(ep.payment) from expenditure_payment ep where ep.paymentType='debit' AND ep.insert_date=:date");
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
	
	public List<expenditureList> getAllExpedName() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<expenditureList> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select * from expenditure_details;");
			List<Object[]> list = query2.list();
			catList = new ArrayList<expenditureList>(0);

			for (Object[] object : list) {
				k++;
				expenditureList reports = new expenditureList();
				reports.setSerialNo(k);
				reports.setExpenditureName(object[1].toString());
				reports.setDate(object[2].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List getExpenditureLastTransactionNo()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<allTransactionId> saleList = null;
		List<allTransactionId> listTid = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT ep.pk_expenditure_payment_id, ep.fk_expense_detail_id FROM expenditure_payment ep ORDER BY ep.pk_expenditure_payment_id DESC LIMIT 1;");
			listTid = query.list();
			
			List<Object[]> list = query.list();
			listTid = new ArrayList<allTransactionId>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				allTransactionId reports = new allTransactionId();
				reports.setExpTransactionId(Long.parseLong(object[0].toString()));
				System.out.println("selTransactionId =============> "+reports.getSaleReturnTransactoinId());
				listTid.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return listTid;
	}
	
}
