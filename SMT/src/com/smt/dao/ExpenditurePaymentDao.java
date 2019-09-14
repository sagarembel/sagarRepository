package com.smt.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.CreditDebitReportBean;
import com.smt.bean.ExpenditurePaymentDetail;
import com.smt.hibernate.ExpenditureDetailsBean;
import com.smt.hibernate.ExpenditurePaymentBean;
import com.smt.utility.HibernateUtility;

public class ExpenditurePaymentDao {

	public void addExpensePayment(ExpenditurePaymentBean bean) {

		System.out.println("In DAO");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			System.out.println("11111111111111111111111111111111111111");

			System.out.println("Tx started");

			session.save(bean);
			System.out.println("22222222222222222222222222222222222222");
			transaction.commit();
			System.out.println("Successful");
		}
		catch (RuntimeException e)
		{
			try
			{
				transaction.rollback();
				e.printStackTrace();
			}			
			catch (RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction", rbe);
				rbe.printStackTrace();
			}		
		}
		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}

	}

	public List<ExpenditurePaymentDetail> getExpensePaymentDetailsForSingleDate(String fDate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<ExpenditurePaymentDetail> expenseList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select expense_name, service_provide, total_amount, paymentType, payment, accountant_name,expenditure_payment.insert_date FROM expenditure_details RIGHT JOIN expenditure_payment ON expenditure_details.pk_expense_details_id = expenditure_payment.fk_expense_detail_id WHERE DATE(expenditure_payment.insert_date)=:isInsertDate ");
			query.setParameter("isInsertDate", fDate);
			List<Object[]> list = query.list();
			expenseList = new ArrayList<ExpenditurePaymentDetail>(0);

			for (Object[] object : list) {

				ExpenditurePaymentDetail reports = new ExpenditurePaymentDetail();

				reports.setExpenseName(object[0].toString());
				reports.setServiceProviderName(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setPaymentMode(object[3].toString());
				reports.setPayment(object[4].toString());
				reports.setAccountantName(object[5].toString());
				reports.setInsertDate(object[6].toString());

				expenseList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList;

	}

	public List<ExpenditurePaymentDetail> getExpensePaymentDetailByTwoDates(String fDate, String tDate, String fkRootexpId) {

		System.out.println(fDate + "first Date In dao");
		System.out.println(tDate + "Second Date In dao");
		HibernateUtility hbu = null;
		Session session = null;
		List<ExpenditurePaymentDetail> expenseList = null;
		try {
			Long expId = Long.parseLong(fkRootexpId);
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select expense_name, service_provide, total_amount, paymentType, payment, accountant_name,expenditure_payment.insert_date FROM expenditure_details RIGHT JOIN expenditure_payment ON expenditure_details.pk_expense_details_id = expenditure_payment.fk_expense_detail_id WHERE fk_expense_detail_id =:expId AND expenditure_payment.insert_date BETWEEN '" + fDate + "' AND '" + tDate + "'");
			query2.setParameter("expId", expId);
			List<Object[]> list = query2.list();
			expenseList = new ArrayList<ExpenditurePaymentDetail>(0);

			for (Object[] object : list)
			{
				ExpenditurePaymentDetail reports = new ExpenditurePaymentDetail();

				reports.setExpenseName(object[0].toString());
				reports.setServiceProviderName(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setPaymentMode(object[3].toString());
				reports.setPayment(object[4].toString());
				reports.setAccountantName(object[5].toString());
				reports.setInsertDate(object[6].toString());

				expenseList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList;

	}

	public List<CreditDebitReportBean> getTodayCreditDebitReport() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CreditDebitReportBean> expenseList = null;

		try {
			String credit = "credit";

			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date date1 = new Date();
			String date = (dateFormat1.format(date1));

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("SELECT s.payment, a.supplier_name from supplier_payment s LEFT JOIN supplier_details a ON s.fk_supplier_id = a.supplier_id WHERE s.paymentType =:credit  AND s.insert_date =:date UNION ALL SELECT e.payment , b.first_name from employee_payment e LEFT JOIN employee_details b ON e.fk_employee_id = b.pk_empoyee_id WHERE e.paymentType =:credit  AND e.insert_date=:date UNION ALL SELECT c.payment , d.first_name from credit_customer_payment c LEFT JOIN customer_details d ON c.fk_customer_id = d.pk_customer_id WHERE c.paymentType =:credit  AND c.insert_date=:date UNION ALL SELECT x.payment, y.expense_name from expenditure_payment x LEFT JOIN expenditure_details y ON x.fk_expense_detail_id = y.pk_expense_details_id WHERE x.paymentType='credit' AND x.insert_date=:date");
			query2.setParameter("credit", credit);
			query2.setParameter("date", date);

			List<Object[]> list = query2.list();
			System.out.println("Shreemant +++=====");
			expenseList = new ArrayList<CreditDebitReportBean>(0);

			for (Object[] object : list)
			{
				System.out.println("hello   =  " + Arrays.toString(object));
				CreditDebitReportBean reports = new CreditDebitReportBean();
				String creditAmt = object[0].toString();
				if (creditAmt.equals("0.0"))
				{
					continue;
				}
				else
				{
					reports.setCredit(Double.parseDouble(object[0].toString()));
					reports.setName(object[1].toString());
				}

				expenseList.add(reports);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList;

	}

	public List<CreditDebitReportBean> getTodayCreditDebitReport1() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CreditDebitReportBean> expenseList1 = null;

		try {
			String credit = "debit";

			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date date1 = new Date();
			String date = (dateFormat1.format(date1));

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query3 = session.createSQLQuery("SELECT s.payment , a.supplier_name from supplier_payment s LEFT JOIN supplier_details a ON s.fk_supplier_id = a.supplier_id WHERE s.paymentType =:credit  AND s.insert_date =:date UNION ALL SELECT e.payment , b.first_name from employee_payment e LEFT JOIN employee_details b ON e.fk_employee_id = b.pk_empoyee_id WHERE e.paymentType =:credit  AND e.insert_date=:date UNION ALL SELECT c.payment , d.first_name from credit_customer_payment c LEFT JOIN customer_details d ON c.fk_customer_id = d.pk_customer_id WHERE c.paymentType =:credit  AND c.insert_date=:date UNION ALL SELECT x.payment, y.expense_name from expenditure_payment x LEFT JOIN expenditure_details y ON x.fk_expense_detail_id = y.pk_expense_details_id WHERE x.paymentType = :credit AND x.insert_date=:date");
			query3.setParameter("credit", credit);
			query3.setParameter("date", date);

			List<Object[]> list1 = query3.list();
			System.out.println("Shreemant +++=====");
			expenseList1 = new ArrayList<CreditDebitReportBean>(0);

			for (Object[] object : list1) {
				System.out.println("hello   =  " + Arrays.toString(object));
				CreditDebitReportBean reports = new CreditDebitReportBean();
				String debitAmt = object[0].toString();
				if (debitAmt.equals("0.0")) {
					continue;
				} else {
					reports.setDebit(Double.parseDouble(object[0].toString()));
					reports.setName(object[1].toString());
				}

				expenseList1.add(reports);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList1;

	}

	public List<CreditDebitReportBean> creditdebitForsingleDate(String fDate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CreditDebitReportBean> expenseList = null;

		try {
			String credit = "credit";
			System.out.println("Current Darte = " + fDate);

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("SELECT s.payment , a.supplier_name from supplier_payment s LEFT JOIN supplier_details a ON s.fk_supplier_id = a.pk_supplier_id WHERE s.paymentType =:credit  AND s.insert_date =:date UNION ALL SELECT e.payment , b.first_name from employee_payment e LEFT JOIN employee_details b ON e.fk_employee_id = b.pk_empoyee_id WHERE e.paymentType =:credit  AND e.insert_date=:date UNION ALL SELECT c.payment , d.first_name from credit_customer_payment c LEFT JOIN customer_details d ON c.fk_customer_id = d.pk_customer_id WHERE c.paymentType =:credit  AND c.insert_date=:date UNION ALL SELECT x.credit , y.expense_name from expenditure_payment x LEFT JOIN expenditure_details y ON x.fk_expense_detail_id = y.pk_expense_details_id  WHERE x.insert_date=:date");
			query2.setParameter("credit", credit);
			query2.setParameter("date", fDate);

			List<Object[]> list = query2.list();
			System.out.println("Shreemant +++=====");
			expenseList = new ArrayList<CreditDebitReportBean>(0);

			for (Object[] object : list) {
				System.out.println("hello   =  " + Arrays.toString(object));
				CreditDebitReportBean reports = new CreditDebitReportBean();

				reports.setCredit(Double.parseDouble(object[0].toString()));
				reports.setName(object[1].toString());

				expenseList.add(reports);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList;
	}

	public List<CreditDebitReportBean> creditdebitForsingleDate1(String fDate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CreditDebitReportBean> expenseList1 = null;

		try {
			String credit = "debit";

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query3 = session.createSQLQuery("SELECT s.payment , a.supplier_name from supplier_payment s LEFT JOIN supplier_details a ON s.fk_supplier_id = a.pk_supplier_id WHERE s.paymentType =:credit  AND s.insert_date =:date UNION ALL SELECT e.payment , b.first_name from employee_payment e LEFT JOIN employee_details b ON e.fk_employee_id = b.pk_empoyee_id WHERE e.paymentType =:credit  AND e.insert_date=:date UNION ALL SELECT c.payment , d.first_name from credit_customer_payment c LEFT JOIN customer_details d ON c.fk_customer_id = d.pk_customer_id WHERE c.paymentType =:credit  AND c.insert_date=:date UNION ALL SELECT x.credit , y.expense_name from expenditure_payment x LEFT JOIN expenditure_details y ON x.fk_expense_detail_id = y.pk_expense_details_id  WHERE x.insert_date=:date");
			query3.setParameter("credit", credit);
			query3.setParameter("date", fDate);

			List<Object[]> list1 = query3.list();
			System.out.println("Shreemant +++=====");
			expenseList1 = new ArrayList<CreditDebitReportBean>(0);

			for (Object[] object : list1) {
				System.out.println("hello   =  " + Arrays.toString(object));
				CreditDebitReportBean reports = new CreditDebitReportBean();

				reports.setDebit(Double.parseDouble(object[0].toString()));
				reports.setName(object[1].toString());

				expenseList1.add(reports);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList1;
	}

	public List<CreditDebitReportBean> creditdebitForBetTowDate(String fDate, String nDate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CreditDebitReportBean> expenseList = null;

		try {
			String credit = "credit";
			System.out.println("Current Darte = " + fDate);

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("SELECT s.payment , a.supplier_name from supplier_payment s LEFT JOIN supplier_details a ON s.fk_supplier_id = a.pk_supplier_id WHERE s.paymentType =:credit  AND s.insert_date between :date AND :date2 UNION ALL SELECT e.payment , b.first_name from employee_payment e LEFT JOIN employee_details b ON e.fk_employee_id = b.pk_empoyee_id WHERE e.paymentType =:credit  AND e.insert_date between :date AND :date2 UNION ALL SELECT c.payment , d.first_name from credit_customer_payment c LEFT JOIN customer_details d ON c.fk_customer_id = d.pk_customer_id WHERE c.paymentType =:credit  AND c.insert_date between :date AND :date2 UNION ALL SELECT x.credit , y.expense_name from expenditure_payment x LEFT JOIN expenditure_details y ON x.fk_expense_detail_id = y.pk_expense_details_id  WHERE x.insert_date between :date AND :date2");
			query2.setParameter("credit", credit);
			query2.setParameter("date", fDate);
			query2.setParameter("date2", nDate);

			List<Object[]> list = query2.list();
			System.out.println("Shreemant +++=====");
			expenseList = new ArrayList<CreditDebitReportBean>(0);

			for (Object[] object : list) {
				System.out.println("hello   =  " + Arrays.toString(object));
				CreditDebitReportBean reports = new CreditDebitReportBean();

				reports.setCredit(Double.parseDouble(object[0].toString()));
				reports.setName(object[1].toString());

				expenseList.add(reports);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList;
	}

	public List<CreditDebitReportBean> creditdebitForBetTowDate1(String fDate, String nDate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CreditDebitReportBean> expenseList1 = null;

		try {
			String credit = "debit";

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query3 = session.createSQLQuery("SELECT s.payment , a.supplier_name from supplier_payment s LEFT JOIN supplier_details a ON s.fk_supplier_id = a.pk_supplier_id WHERE s.paymentType =:credit  AND s.insert_date between :date AND :date2 UNION ALL SELECT e.payment , b.first_name from employee_payment e LEFT JOIN employee_details b ON e.fk_employee_id = b.pk_empoyee_id WHERE e.paymentType =:credit  AND e.insert_date between :date AND :date2 UNION ALL SELECT c.payment , d.first_name from credit_customer_payment c LEFT JOIN customer_details d ON c.fk_customer_id = d.pk_customer_id WHERE c.paymentType =:credit  AND c.insert_date between :date AND :date2 UNION ALL SELECT x.credit , y.expense_name from expenditure_payment x LEFT JOIN expenditure_details y ON x.fk_expense_detail_id = y.pk_expense_details_id  WHERE x.insert_date between :date AND :date2");
			query3.setParameter("credit", credit);
			query3.setParameter("date", fDate);
			query3.setParameter("date2", nDate);

			List<Object[]> list1 = query3.list();
			System.out.println("Shreemant +++=====");
			expenseList1 = new ArrayList<CreditDebitReportBean>(0);

			for (Object[] object : list1) {
				System.out.println("hello   =  " + Arrays.toString(object));
				CreditDebitReportBean reports = new CreditDebitReportBean();

				reports.setDebit(Double.parseDouble(object[0].toString()));
				reports.setName(object[1].toString());

				expenseList1.add(reports);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return expenseList1;
	}

}
