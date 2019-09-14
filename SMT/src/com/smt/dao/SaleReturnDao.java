package com.smt.dao;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.smt.bean.BillBean;
import com.smt.bean.CategoryWisePurchase;
import com.smt.bean.CustomerBean;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.SaleReturnBean;
import com.smt.hibernate.CreditCustomerBill;
import com.smt.hibernate.CustomerBill;
import com.smt.hibernate.CustomerPaymentBean;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.SaleReturn;
import com.smt.utility.HibernateUtility;

public class SaleReturnDao {

	public void registerSaleReturn(SaleReturn cust) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		System.out.println("hi this is in salereturn Dao ");
		try {
			hbu = HibernateUtility.getInstance();
			
			session = hbu.getHibernateSession();
			
			transaction = session.beginTransaction();
			
			System.out.println("salreturn values       "   +cust);

			session.save(cust);
			
			System.out.println("hi data save in sale rerurn table");
			
			transaction.commit();

		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {

			}
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
	}

	public void updateQuantity(Long pkBillId, String editQuantity, String totalAmt) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			org.hibernate.Query query = session.createQuery("from OtherBill where pkBillId = :pkBillId ");
			query.setParameter("pkBillId", pkBillId);

			OtherBill uniqueResult = (OtherBill) query.uniqueResult();
			Double quant =  uniqueResult.getQuantity();

			Double updatequnty = (quant - Double.parseDouble(editQuantity));
			
				System.out.println("update Quantity in sale retiurn dao"+updatequnty);

			OtherBill updateStock = (OtherBill) session.get(OtherBill.class, new Long(pkBillId));

			updateStock.setQuantity(updatequnty);
			updateStock.setTotalperItem(Double.parseDouble(totalAmt));

			session.saveOrUpdate(updateStock);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}

	public void updateQuantity1(Long pkBillId, String editQuantity, String totalAmt, Double pending_bill_payment)
	{
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			org.hibernate.Query query = session.createQuery("from CreditCustomerBill where pkCreditBillId = :pkCreditBillId");
			query.setParameter("pkCreditBillId", pkBillId);

			CreditCustomerBill uniqueResult = (CreditCustomerBill) query.uniqueResult();
			Double quant = uniqueResult.getQuantity();

			Double updatequnty = (quant - Long.parseLong(editQuantity));
			//Double pendingBalance = uniqueResult.getPendingBillPayment();
			//pendingBalance = pendingBalance - returnTotalAmount;
			
			CreditCustomerBill updateStock = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pkBillId));

			updateStock.setQuantity(updatequnty);
			updateStock.setTotalperItem(Double.parseDouble(totalAmt));
			//updateStock.setPendingBillPayment(pending_bill_payment);
			//updateStock.setPendingBillPayment(pendingBalance);
			System.out.println("BEFORE UPDATE CREDITCUSTOMER BILL");
			session.saveOrUpdate(updateStock);
			System.out.println("AFTER UPDATE CREDITCUSTOMER BILL");
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}

	public void updateBarcodeQuantity(Long barcodeNo, String editQuantity)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			org.hibernate.Query query = session.createQuery("from GoodReceive where barcodeNo=:barcodeNo");
			query.setParameter("barcodeNo", barcodeNo);

			GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
			Double quant = uniqueResult.getQuantity();
			Double soldQuantity = uniqueResult.getSoldQuantity();
			Long pkGoodReceiveId = uniqueResult.getPkGoodRecId();
			Double updatequnty = (Double) (quant + Double.parseDouble(editQuantity));
			Double updateSoldQuantity = soldQuantity - Double.parseDouble(editQuantity);
			GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pkGoodReceiveId));

			updateStock.setQuantity(updatequnty);
			updateStock.setSoldQuantity(updateSoldQuantity);
			session.saveOrUpdate(updateStock);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null)
			{
				session.close();
			}
		}
	}	
		
	public List gettPendingBalance(String fkCreditCustId)
	{
		System.out.println(" ((((((((((    gettPendingBalance    ))))))))))) 11111111 getPendingBillPayment fkCreditCustId ID =====> "+fkCreditCustId);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<Object> lastBillPending = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT ccb.fkCrediCustId, ccb.pending_bill_payment FROM creditcustomerbill ccb where ccb.fkCrediCustId = "+fkCreditCustId+" ORDER BY ccb.fkCrediCustId DESC LIMIT 1;");
			lastBillPending = query.list();	
			
			/*			
				System.out.println("lastBillPending SIZE ====>======>====> "+lastBillPending.size());
				if(lastBillPending.isEmpty())
				{
					lastBillPending.add(0.0);
				}
				else if(lastBillPending.get(0) == null)
				{
					lastBillPending.add(0.0);
				}
				System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0));			
			*/
			
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
		
		/*		
			System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0).doubleValue());
			BigDecimal bd1 = BigDecimal.valueOf(lastBillPending.get(0).doubleValue());
			Double lastPendingBill = bd1.doubleValue();
			return (lastBillPending.get(0).doubleValue());
		*/	
		
		return lastBillPending;
	}
	
	public void settPendingBalance(Double totalPendingbalance, String fkCreditCustId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		Double pendingBalance = 0.0;
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			Query query = session.createSQLQuery("update creditcustomerbill set pending_bill_payment = "+totalPendingbalance+" where fkCrediCustId = "+fkCreditCustId);
			query.executeUpdate();
			transaction.commit();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	public Double gettTotalBillAmount(String fkCreditCustId)
	{
		System.out.println(" 11111111 getPendingBillPayment fkCreditCustId ID =====> "+fkCreditCustId);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<Double> lastBillPending = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT SUM(ccb.totalperitem) FROM creditcustomerbill ccb where ccb.fkCrediCustId = "+fkCreditCustId+" AND ccb.totalperitem > 0");
			lastBillPending = query.list();
			
			System.out.println("lastBillPending SIZE ====>======>====> "+lastBillPending.size());
			if(lastBillPending.isEmpty())
			{
				lastBillPending.add(0.0);
			}
			else if(lastBillPending.get(0) == null)
			{
				lastBillPending.add(0.0);
			}
			System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0));	
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
		/*System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0).doubleValue());
		BigDecimal bd1 = BigDecimal.valueOf(lastBillPending.get(0).doubleValue());
		Double lastPendingBill = bd1.doubleValue();*/
		return (lastBillPending.get(0).doubleValue());	
	}
	
	public void regCreditCustomerReturnPayment(Double grossTotal, Double lastPendingBalNEW, Double returnAmt, String fkRootCustId, String discount,  String reasonForSReturn3) 
	{
		// TODO Auto-generated method stub
		try
		{
			CustomerPaymentBean bean = new CustomerPaymentBean();
	
			bean.setCustomer(Long.parseLong(fkRootCustId));
	
			//bean.setBillNo(billNo);
	
			bean.setPersonname("At Time Of Bill");
	
			bean.setPaymentMode("N/A");
	
			bean.setChequeNum("N/A");
	
			bean.setNameOnCheck("N/A");
	
			bean.setCardNum(null);
	
			bean.setBankName("N/A");
	
			bean.setAccNum(null);
	
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
	
			bean.setInsertDate(dateobj);
	
			bean.setTotalAmount(grossTotal);
	
			bean.setBalance(lastPendingBalNEW);
	
			bean.setPaymentType("debit");
	
			bean.setCredit(0.0);
			
			bean.setReturnAmount(returnAmt);
			
			if(reasonForSReturn3 == null || reasonForSReturn3.equalsIgnoreCase(""))
			{
				bean.setDescription("Sale Return");
			}
			else
			{
				bean.setDescription(reasonForSReturn3);
			}
			
			CustomerPaymentDao dao = new CustomerPaymentDao();
			dao.regCustomerPayment(bean);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
	
	public List<SaleReturn> getAllTransactionDetails(String srTransactionId, String fkRootCustId)
	{
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReturn> itemlist = null;
		String sqlQuery = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			if(fkRootCustId == null)
			{
				sqlQuery = "SELECT sr.PkSellReturnId, sr.transactionId, SUM(sr.Return_Total) FROM salereturn sr WHERE sr.transactionId = "+srTransactionId+" AND redeemedForBillNo=0 GROUP BY sr.transactionId";
			}
			else
			{
				sqlQuery = "SELECT sr.PkSellReturnId, sr.transactionId, SUM(sr.Return_Total) FROM salereturn sr WHERE sr.transactionId = "+srTransactionId+" AND fkCreditCustId = "+fkRootCustId+" AND redeemedForBillNo=0 GROUP BY sr.transactionId";
			}

			Query query = session.createSQLQuery(sqlQuery);
			List<Object[]> list = query.list();
			SaleReturn bean = new SaleReturn();
			itemlist = new ArrayList<SaleReturn>(0);
			for (Object[] objects : list)
			{
				bean.setPkBillId(Long.parseLong(objects[0].toString()));
				bean.setTransactionId(Long.parseLong(objects[1].toString()));
				bean.setReturnTotal(Double.parseDouble(objects[2].toString()));
				itemlist.add(bean);
			}
			
			System.out.println("pk id ===> "+bean.getPkBillId());
			System.out.println("transaction id ===> "+bean.getTransactionId());
			System.out.println("total return amt id ===> "+bean.getReturnTotal());
			
		} catch (RuntimeException e) {
			Log.error("Error in getAllItemDetails(String key)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return itemlist;
	}	
}
