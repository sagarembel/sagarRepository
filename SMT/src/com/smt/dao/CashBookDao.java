package com.smt.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.TotalCashBookReport;
import com.smt.hibernate.CashBook;
import com.smt.utility.HibernateUtility;

public class CashBookDao {

	public void regstierCashBookEntry(CashBook cb) {

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			System.out.println(df.format(date));

			session.save(cb);
			transaction.commit();
		}

		catch (RuntimeException e) {
			try {
				transaction.rollback();
			} catch (Exception rbe) {
				rbe.printStackTrace();
			}
		} finally {
			hbu.closeSession(session);
		}

	}

	public List getEmployeeNameByToPay() {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from EmployeeDetail");
			list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	// This is getSupplierNameByToPay() used to get dynamic supplier name into
	// to pay name

	public List getSupplierNameByToPay() {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from SupplierDetails");
			list = query.list();
		} catch (RuntimeException e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List getCustomerNameByToPay() {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from CreditCustomerDetails");
			list = query.list();
		} catch (RuntimeException e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List getTotalCashBookReport() {

		HibernateUtility hbu = null;
		Session session = null;
		List<TotalCashBookReport> cashbooklist = null;
		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("select name,to_pay,paymentType, paymentBy, chequeNo, chequeDate, cardNo, neftAcNo, amount, reason from cash_book;");

			List<Object[]> list = query.list();

			cashbooklist = new ArrayList<TotalCashBookReport>(0);

			for (Object[] object : list) {
				TotalCashBookReport reports = new TotalCashBookReport();

				System.out.println("RAJJ" + Arrays.toString(object));

				reports.setName(object[0].toString());
				reports.setCustType(object[1].toString());
				reports.setPaymentType(object[2].toString());
				reports.setPaymentBy(object[3].toString());
				reports.setChequeNo(Double.parseDouble(object[4].toString()));
				reports.setChequeDate(object[5].toString());
				reports.setCardNo(Double.parseDouble(object[6].toString()));
				reports.setNeftAccNo(Double.parseDouble(object[7].toString()));
				reports.setAmount(Double.parseDouble(object[8].toString()));
				reports.setReason(object[9].toString());

				cashbooklist.add(reports);

			}
		} catch (RuntimeException e) {

		} finally {

			hbu.closeSession(session);
		}
		return cashbooklist;
	}

	public List getCashBookReports(String customerType) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<TotalCashBookReport> cashbooklist = null;

		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("select name,to_pay,paymentType, paymentBy, chequeNo, chequeDate, cardNo, neftAcNo, amount, reason from cash_book where to_pay='" + customerType + "';");

			// Query query = session.createQuery("from PurchaseBill2");
			List<Object[]> list = query.list();

			cashbooklist = new ArrayList<TotalCashBookReport>(0);

			for (Object[] object : list) {
				TotalCashBookReport reports = new TotalCashBookReport();

				System.out.println("RAJJ" + Arrays.toString(object));

				System.out.println(Arrays.toString(object));

				reports.setName(object[0].toString());
				reports.setCustType(object[1].toString());
				reports.setPaymentType(object[2].toString());
				reports.setPaymentBy(object[3].toString());
				reports.setChequeNo(Double.parseDouble(object[4].toString()));
				reports.setChequeDate(object[5].toString());
				reports.setCardNo(Double.parseDouble(object[6].toString()));
				reports.setNeftAccNo(Double.parseDouble(object[7].toString()));
				reports.setAmount(Double.parseDouble(object[8].toString()));
				reports.setReason(object[9].toString());

				cashbooklist.add(reports);

			}
		} catch (RuntimeException e) {

		} finally {

			hbu.closeSession(session);
		}
		return cashbooklist;

	}

	public List getOneDayPaymentReport(String reportDate) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<TotalCashBookReport> paymentList = null;

		String date = reportDate;

		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			System.out.println(date);
			Query query = session.createSQLQuery("select name,to_pay,paymentType, paymentBy, chequeNo, chequeDate, cardNo, neftAcNo, amount, reason from cash_book where paymentDate='" + date + "';");
			List<Object[]> list = query.list();

			paymentList = new ArrayList<TotalCashBookReport>(0);

			for (Object[] object : list) {
				TotalCashBookReport reports = new TotalCashBookReport();

				System.out.println("RAJJ" + Arrays.toString(object));

				System.out.println(Arrays.toString(object));

				reports.setName(object[0].toString());
				reports.setCustType(object[1].toString());
				reports.setPaymentType(object[2].toString());
				reports.setPaymentBy(object[3].toString());
				reports.setChequeNo(Double.parseDouble(object[4].toString()));
				reports.setChequeDate(object[5].toString());
				reports.setCardNo(Double.parseDouble(object[6].toString()));
				reports.setNeftAccNo(Double.parseDouble(object[7].toString()));
				reports.setAmount(Double.parseDouble(object[8].toString()));
				reports.setReason(object[9].toString());

				paymentList.add(reports);

			}
		} catch (RuntimeException e) {

		} finally {

			hbu.closeSession(session);
		}
		return paymentList;

	}

	public List twoDayPaymentReport(String reportDate1, String reportDate2) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<TotalCashBookReport> cashPaymentList = null;

		String date1 = reportDate1;
		String date2 = reportDate2;

		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			System.out.println(date1);
			System.out.println(date2);
			Query query = session.createSQLQuery("select name,to_pay,paymentType, paymentBy, chequeNo, chequeDate, cardNo, neftAcNo, amount, reason from cash_book where paymentDate between '" + date1 + "' AND '" + date2 + "';");
			List<Object[]> list = query.list();

			cashPaymentList = new ArrayList<TotalCashBookReport>(0);

			for (Object[] object : list) {
				TotalCashBookReport reports = new TotalCashBookReport();

				System.out.println("RAJJ" + Arrays.toString(object));

				System.out.println(Arrays.toString(object));

				reports.setName(object[0].toString());
				reports.setCustType(object[1].toString());
				reports.setPaymentType(object[2].toString());
				reports.setPaymentBy(object[3].toString());
				reports.setChequeNo(Double.parseDouble(object[4].toString()));
				reports.setChequeDate(object[5].toString());
				reports.setCardNo(Double.parseDouble(object[6].toString()));
				reports.setNeftAccNo(Double.parseDouble(object[7].toString()));
				reports.setAmount(Double.parseDouble(object[8].toString()));
				reports.setReason(object[9].toString());

				cashPaymentList.add(reports);

			}
		} catch (RuntimeException e) {

		} finally {

			hbu.closeSession(session);
		}
		return cashPaymentList;

	}

	// cash book single date

	public List<CashBook> singleDateCashBook(Date adate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CashBook> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createQuery("select payToId, toPayNameId, paymentTypeId, paymebtById, paymentAmountId, paymentReasonId, paymentDate from CashBook where paymentDate=:adate");
			query2.setParameter("adate", adate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<CashBook>(0);

			for (Object[] object : list) {

				CashBook reports = new CashBook();

				reports.setPayToId(object[0].toString());
				reports.setToPayNameId(object[1].toString());
				reports.setPaymentTypeId(object[2].toString());
				reports.setPaymebtById(object[3].toString());
				reports.setPaymentAmountId(Double.parseDouble(object[4].toString()));
				reports.setPaymentReasonId(object[5].toString());
				reports.setPaymentDate1(object[6].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// cash book between two dates
	public List<CashBook> cashBookReportBetweenTwoDates(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CashBook> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createQuery("select payToId, toPayNameId, paymentTypeId, paymebtById, paymentAmountId, paymentReasonId, paymentDate from CashBook where paymentDate BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<CashBook>(0);

			for (Object[] object : list) {

				CashBook reports = new CashBook();

				reports.setPayToId(object[0].toString());
				reports.setToPayNameId(object[1].toString());
				reports.setPaymentTypeId(object[2].toString());
				reports.setPaymebtById(object[3].toString());
				reports.setPaymentAmountId(Double.parseDouble(object[4].toString()));
				reports.setPaymentReasonId(object[5].toString());
				reports.setPaymentDate1(object[6].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

}
