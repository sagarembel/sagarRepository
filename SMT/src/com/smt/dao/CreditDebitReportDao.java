package com.smt.dao;

import java.util.ArrayList;
import java.util.List;
import org.hibernate.Query;
import org.hibernate.Session;
import com.smt.bean.CreditDebitReportBean;
import com.smt.utility.HibernateUtility;

public class CreditDebitReportDao
{
	public List<CreditDebitReportBean> getExpensePaymentDetailByTwoDates(String startDateCd, String endDateCd)
	{	
		
		List<CreditDebitReportBean> finalList = null;
		List<CreditDebitReportBean> suppList = null;
		List<CreditDebitReportBean> purchaseReturnList = null;
		List<CreditDebitReportBean> purchaseList = null;	 
		List<CreditDebitReportBean> billingList = null;	 
		List<CreditDebitReportBean> creditCustList = null;	 
		List<CreditDebitReportBean> creditCustPaymentList = null;
		List<CreditDebitReportBean> saleReturnList = null;	 
		List<CreditDebitReportBean> expenditureList = null;	 
		List<CreditDebitReportBean> employeeCreditDebitList = null;	 
		
		//1
		try
		{						
			HibernateUtility hbu = null;
			Session session = null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			List<Object[]> list = null;						
			
/*
			Query testQ = session.createSQLQuery("SELECT gr.PkGoodRecId, 'purchase' AS 'purchase', gr.Date, 'credit' AS paymentType, gr.GrossTotal from goodreceive gr WHERE Date BETWEEN '2019-01-01' AND '2019-12-12' GROUP BY gr.BillNo AND gr.FksuppId UNION ALL SELECT ob.BillNo, 'invoice' as 'invoice', ob.Date, 'credit' as paymentType, (ob.cashCard_cashAmount+ob.cashCard_cardAmount+ob.totalSaleReturnAmt) FROM otherbill ob WHERE Date BETWEEN '2019-01-01' AND '2019-12-12' GROUP BY ob.BillNo UNION ALL SELECT sp.pk_supplier_payment_id, sp.description, sp.insert_date, sp.paymentType, sp.payment from supplier_payment sp WHERE sp.insert_date BETWEEN '2019-01-01' AND '2019-12-12'");
			//Query testQ = session.createSQLQuery("SELECT PkGoodRecId, 'READY MADE PURCHASE' as reason, Date, 'debit' as paymentMode, GrossTotal as totalAmt from goodreceive WHERE Date BETWEEN '2019-01-01' AND '2019-12-12' GROUP BY BillNo AND FksuppId UNION ALL SELECT pk_supplier_payment_id, description as reason, insert_date, paymentType as paymentMode, payment as totalAmt from supplier_payment WHERE insert_date BETWEEN '2019-01-01' AND '2019-12-12' UNION ALL SELECT transactionId, purchaseReturnReason as reason, ReturnDate, 'debit' as paymentMode, Return_Total as totalAmt FROM purchasereturn WHERE ReturnDate BETWEEN '2019-01-01' AND '2019-12-12' UNION ALL SELECT BillNo, 'INVOIVE' as reason, Date, 'credit' as paymentMode, (cashCard_cashAmount+cashCard_cardAmount+totalSaleReturnAmt) as totalAmt FROM otherbill WHERE Date BETWEEN '2019-01-01' AND '2019-12-12' GROUP BY BillNo UNION ALL SELECT transactionId, Reason as reason, BillReturnDate, 'credit' as paymentMode, Return_Total as totalAmt FROM salereturn WHERE BillReturnDate BETWEEN '2019-01-01' AND '2019-12-12' UNION ALL SELECT pk_expenditure_payment_id, 'Expenditure' as reason, insert_date, paymentType as paymentMode, payment as totalAmt FROM expenditure_payment WHERE insert_date BETWEEN '2019-01-01' AND '2019-12-12' UNION ALL SELECT pk_employee_payment_id, reason as reason, insert_date, paymentType as paymentMode, payment as totalAmt FROM employee_payment WHERE insert_date BETWEEN '2019-01-01' AND '2019-12-12'");
			List<Object[]> testList  = testQ.list();
*/
			//SUPPLIER CREDIT DEBIT
			Query query = session.createSQLQuery("SELECT pk_supplier_payment_id, description, insert_date, paymentType, payment from supplier_payment WHERE insert_date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"'");
			list = query.list();
			System.out.println("list.size() ====> "+list.size());			
			suppList = new ArrayList<CreditDebitReportBean>();
			for (Object[] object : list)
			{
				CreditDebitReportBean reports = new CreditDebitReportBean();
				
				//String transanctionOf = object[6].toString();
				String description = object[2].toString();
				//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
				Double payment = Double.parseDouble(object[4].toString());
				String paymentMode = object[3].toString();
				
				reports.setTrIdOrBillNo(object[0].toString());
				reports.setDiscription(object[1].toString());
				reports.setTransactionDate(object[2].toString());
					if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
					{
						reports.setDebit(payment);
						reports.setCredit(0.0);
					}
					else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
					{
						reports.setCredit(payment);
						reports.setDebit(0.0);
					}
					else
					{
						reports.setCredit(0.0);
						reports.setDebit(0.0);
					}					
				
					suppList.add(reports);					
			}
		}
		 catch (Exception e)
		{
			e.printStackTrace();
		}	
		
		
		
		//2
		
		try
		{	
			HibernateUtility hbu = null;
			Session session = null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			List<Object[]> list = null;
			
			//PURCHASE RETURN CREDIT DEBIT
			Query query = session.createSQLQuery("SELECT transactionId, purchaseReturnReason, ReturnDate, 'debit' , Return_Total FROM purchasereturn WHERE ReturnDate BETWEEN '"+startDateCd+"' AND '"+endDateCd+"'");
			list = query.list();
			System.out.println("list.size() ====> "+list.size());			
			purchaseReturnList = new ArrayList<CreditDebitReportBean>();
			for (Object[] object : list)
			{
				CreditDebitReportBean reports = new CreditDebitReportBean();
				
				//String transanctionOf = object[6].toString();
				String description = object[2].toString();
				//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
				Double payment = Double.parseDouble(object[4].toString());
				String paymentMode = object[3].toString();
				
				reports.setTrIdOrBillNo(object[0].toString());
				reports.setDiscription(object[1].toString());
				reports.setTransactionDate(object[2].toString());
					if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
					{
						reports.setDebit(payment);
						reports.setCredit(0.0);
					}
					else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
					{
						reports.setCredit(payment);
						reports.setDebit(0.0);
					}
					else
					{
						reports.setCredit(0.0);
						reports.setDebit(0.0);
					}					
				
					purchaseReturnList.add(reports);					
			}
		}
		 catch (Exception e)
		{
			e.printStackTrace();
		}
		
		
		//3	PURCHASE (GOOD RECEIVE)
		try
		{						
			HibernateUtility hbu = null;
			Session session = null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			List<Object[]> list = null;
			
			//SUPPLIER CREDIT DEBIT
			Query query = session.createSQLQuery("SELECT PkGoodRecId, 'READY MADE PURCHASE', Date, 'debit', GrossTotal from goodreceive WHERE Date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"' GROUP BY BillNo, FksuppId");
			list = query.list();
			System.out.println("list.size() ====> "+list.size());			
			purchaseList = new ArrayList<CreditDebitReportBean>();
			for (Object[] object : list)
			{
				CreditDebitReportBean reports = new CreditDebitReportBean();
				
				//String transanctionOf = object[6].toString();
				String description = object[2].toString();
				//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
				Double payment = Double.parseDouble(object[4].toString());
				String paymentMode = object[3].toString();
				
				reports.setTrIdOrBillNo(object[0].toString());
				reports.setDiscription(object[1].toString());
				reports.setTransactionDate(object[2].toString());
					if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
					{
						reports.setCredit(payment);
						reports.setDebit(0.0);
					}
					else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
					{
						reports.setDebit(payment);
						reports.setCredit(0.0);
					}
					else
					{
						reports.setCredit(0.0);
						reports.setDebit(0.0);
					}					
				
					purchaseList.add(reports);					
			}
		}
		 catch (Exception e)
		{
			e.printStackTrace();
		}
		
		
		//4 BILLING	
		try
		{	
			HibernateUtility hbu = null;
			Session session = null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			List<Object[]> list = null;
			
			//BILLING CREDIT DEBIT
			Query query = session.createSQLQuery("SELECT ob.BillNo, 'Invoice', ob.Date, 'credit', (ob.cashCard_cashAmount+ob.cashCard_cardAmount+ob.totalSaleReturnAmt) FROM otherbill ob WHERE ob.Date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"' GROUP BY ob.BillNo");
			list = query.list();
			System.out.println("list.size() ====> "+list.size());			
			billingList = new ArrayList<CreditDebitReportBean>();
			for (Object[] object : list)
			{
				CreditDebitReportBean reports = new CreditDebitReportBean();
				
				//String transanctionOf = object[6].toString();
				String description = object[2].toString();
				//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
				Double payment = Double.parseDouble(object[4].toString());
				String paymentMode = object[3].toString();
				
				reports.setTrIdOrBillNo(object[0].toString());
				reports.setDiscription(object[1].toString());
				reports.setTransactionDate(object[2].toString());
				if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
				{
					reports.setCredit(payment);
					reports.setDebit(0.0);
				}
				else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
				{
					reports.setDebit(payment);
					reports.setCredit(0.0);
				}
				else
				{
					reports.setCredit(0.0);
					reports.setDebit(0.0);
				}					
			
				billingList.add(reports);					
			}
		}
		 catch (Exception e)
		{
			e.printStackTrace();
		}
				
		//5 CREDIT CUST BILLING
				try
				{	
					
					HibernateUtility hbu = null;
					Session session = null;
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					List<Object[]> list = null;
					
					//BILLING CREDIT DEBIT
					//Query query = session.createSQLQuery("SELECT ccb.BillNo, 'Credit Cust Invoive', ccb.Date, 'credit', (ccb.cashCard_cashAmount+ccb.cashCard_cardAmount+ccb.totalSaleReturnAmt) FROM creditcustomerbill ccb WHERE ((ccb.cashCard_cashAmount+ccb.cashCard_cardAmount+ccb.totalSaleReturnAmt) = 0) AND ccb.Date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"' GROUP BY ccb.BillNo");
					Query query = session.createSQLQuery("SELECT ccb.BillNo, 'Credit Cust Invoice', ccb.Date, 'debit', TotalAmount FROM creditcustomerbill ccb WHERE ccb.Date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"' GROUP BY ccb.BillNo");
					list = query.list();
					System.out.println("CREDIT CUST BILLING");			
					creditCustList = new ArrayList<CreditDebitReportBean>();
					for (Object[] object : list)
					{
						CreditDebitReportBean reports = new CreditDebitReportBean();
						Double payment = Double.parseDouble(object[4].toString());
						
						//String transanctionOf = object[6].toString();
						String description = object[2].toString();
						//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
						
						String paymentMode = object[3].toString();
						
						reports.setTrIdOrBillNo(object[0].toString());
						reports.setDiscription(object[1].toString());
						reports.setTransactionDate(object[2].toString());
						if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
						{
							reports.setCredit(payment);
							reports.setDebit(0.0);
						}
						else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
						{
							reports.setDebit(payment);
							reports.setCredit(0.0);
						}
						else
						{
							reports.setCredit(0.0);
							reports.setDebit(0.0);
						}					
					
						creditCustList.add(reports);					
					}
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
		
			//6 CREDIT CUST PAYMENT 
			try
			{	
				HibernateUtility hbu = null;
				Session session = null;
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				List<Object[]> list = null;
				
				Query query = session.createSQLQuery("SELECT ccp.pk_credit_customer_id, 'Credit Cust Payment', ccp.insert_date, 'credit', ccp.payment FROM credit_customer_payment ccp WHERE ccp.insert_date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"'");
				list = query.list();
				System.out.println("CREDIT CUST PAYMENT");			
				creditCustPaymentList = new ArrayList<CreditDebitReportBean>();
				for (Object[] object : list)
				{
					CreditDebitReportBean reports = new CreditDebitReportBean();
					Double payment = Double.parseDouble(object[4].toString());
					
					//String transanctionOf = object[6].toString();
					String description = object[2].toString();
					//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
					
					String paymentMode = object[3].toString();
					
					reports.setTrIdOrBillNo(object[0].toString());
					reports.setDiscription(object[1].toString());
					reports.setTransactionDate(object[2].toString());
					if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
					{
						reports.setCredit(payment);
						reports.setDebit(0.0);
					}
					else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
					{
						reports.setDebit(payment);
						reports.setCredit(0.0);
					}
					else
					{
						reports.setCredit(0.0);
						reports.setDebit(0.0);
					}					
				
					creditCustPaymentList.add(reports);					
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}				
		
		//7 SALE RETURN
		try
		{					
			HibernateUtility hbu = null;
			Session session = null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			List<Object[]> list = null;
			
			//BILLING CREDIT DEBIT
			Query query = session.createSQLQuery("SELECT sr.transactionId, sr.Reason, sr.BillReturnDate, 'credit', sr.Return_Total FROM salereturn sr WHERE sr.BillReturnDate BETWEEN '"+startDateCd+"' AND '"+endDateCd+"'");
			list = query.list();
			System.out.println("list.size() ====> "+list.size());			
			saleReturnList = new ArrayList<CreditDebitReportBean>();
			for (Object[] object : list)
			{
				CreditDebitReportBean reports = new CreditDebitReportBean();
				
				//String transanctionOf = object[6].toString();
				String description = object[2].toString();
				//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
				Double payment = Double.parseDouble(object[4].toString());
				String paymentMode = object[3].toString();
				
				reports.setTrIdOrBillNo(object[0].toString());
				reports.setDiscription(object[1].toString());
				reports.setTransactionDate(object[2].toString());
				if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
				{
					reports.setDebit(payment);
					reports.setCredit(0.0);
				}
				else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
				{
					reports.setCredit(payment);
					reports.setDebit(0.0);
				}
				else
				{
					reports.setCredit(0.0);
					reports.setDebit(0.0);
				}					
			
				saleReturnList.add(reports);					
			}
		}
		 catch (Exception e)
		{
			e.printStackTrace();
		}		
		
		
		//8 EXPENDITURE CREDIT DEBIT
		try
		{					
			HibernateUtility hbu = null;
			Session session = null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			List<Object[]> list = null;
			
			//BILLING CREDIT DEBIT
			Query query = session.createSQLQuery("SELECT ep.pk_expenditure_payment_id, 'Expenditure', ep.insert_date, ep.paymentType, ep.payment FROM expenditure_payment ep WHERE ep.insert_date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"'");
			list = query.list();
			System.out.println("list.size() ====> "+list.size());			
			expenditureList = new ArrayList<CreditDebitReportBean>();
			for (Object[] object : list)
			{
				CreditDebitReportBean reports = new CreditDebitReportBean();
				
				//String transanctionOf = object[6].toString();
				String description = object[2].toString();
				//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
				Double payment = Double.parseDouble(object[4].toString());
				String paymentMode = object[3].toString();
				
				reports.setTrIdOrBillNo(object[0].toString());
				reports.setDiscription(object[1].toString());
				reports.setTransactionDate(object[2].toString());
				if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
				{
					reports.setDebit(payment);
					reports.setCredit(0.0);					
				}
				else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
				{
					reports.setCredit(payment);
					reports.setDebit(0.0);
				}
				else
				{
					reports.setCredit(0.0);
					reports.setDebit(0.0);
				}					
			
				expenditureList.add(reports);					
			}
		}
		 catch (Exception e)
		{
			e.printStackTrace();
		}
		
		
		//9 EMPLOYEE CREDIT DEBIT
				try
				{					
					HibernateUtility hbu = null;
					Session session = null;
					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					List<Object[]> list = null;
					
					//BILLING CREDIT DEBIT
					Query query = session.createSQLQuery("SELECT emp.pk_employee_payment_id, emp.reason, emp.insert_date, emp.paymentType, emp.payment FROM employee_payment emp WHERE emp.insert_date BETWEEN '"+startDateCd+"' AND '"+endDateCd+"'");
					list = query.list();
					System.out.println("list.size() ====> "+list.size());			
					employeeCreditDebitList = new ArrayList<CreditDebitReportBean>();
					for (Object[] object : list)
					{
						CreditDebitReportBean reports = new CreditDebitReportBean();
						
						//String transanctionOf = object[6].toString();
						String description = object[2].toString();
						//Double purchaseReturnedAmount = Double.parseDouble(object[5].toString());
						Double payment = Double.parseDouble(object[4].toString());
						String paymentMode = object[3].toString();
						
						reports.setTrIdOrBillNo(object[0].toString());
						reports.setDiscription(object[1].toString());
						reports.setTransactionDate(object[2].toString());
						if(paymentMode.equalsIgnoreCase("credit") && payment > 0.0)
						{
							reports.setDebit(payment);
							reports.setCredit(0.0);
						}
						else if(paymentMode.equalsIgnoreCase("debit") && payment > 0.0)
						{
							reports.setCredit(payment);
							reports.setDebit(0.0);
						}
						else
						{
							reports.setCredit(0.0);
							reports.setDebit(0.0);
						}					
					
						employeeCreditDebitList.add(reports);					
					}
				}
				 catch (Exception e)
				{
					e.printStackTrace();
				}		
		
		finalList = new ArrayList<CreditDebitReportBean>();
		
		if(suppList != null)
		{
			finalList.addAll(suppList);
		}
				
		if(purchaseList != null)
		{
			finalList.addAll(purchaseList);
		}
		
		if(billingList != null)
		{
			finalList.addAll(billingList);
		}
		
		if(creditCustList != null)
		{
			finalList.addAll(creditCustList);
		}
		
		if(creditCustPaymentList != null)
		{
			finalList.addAll(creditCustPaymentList);
		}
		
		if(saleReturnList != null)
		{
			finalList.addAll(saleReturnList);
		}
		
		if(expenditureList != null)
		{
			finalList.addAll(expenditureList);
		}
		
		if(employeeCreditDebitList != null)
		{
			finalList.addAll(employeeCreditDebitList);
		}
		
		if(purchaseReturnList != null)
		{
			finalList.addAll(purchaseReturnList);
		}
		
		return finalList;
	}
}