package com.smt.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.itextpdf.text.log.SysoLogger;
import com.smt.bean.CreditDebitReportBean;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.PurchaseReturn;
import com.smt.hibernate.SupplierPaymentBean;
import com.smt.utility.HibernateUtility;

public class PurchaseReturnDao {

	public void regGoodReceive(PurchaseReturn gd) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			session.save(gd);
			transaction.commit();

		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {
			}
		}

		finally {
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}

	public void updateQuantity(Long PkGoodRecId, String editQuantity, String total, String totalAmount, String billNo, String supplierIdLong, String returnTotal)
	{
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;		
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			org.hibernate.Query query = session.createQuery("from GoodReceive where PkGoodRecId = :PkGoodRecId ");
			query.setParameter("PkGoodRecId", PkGoodRecId);

			GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
						
			Double quant = uniqueResult.getQuantity();
			Double returnQuantity = uniqueResult.getReturnQuantity();
			Double lastPendingBillpayment = uniqueResult.getPendingBillPayment();
			System.out.println(" pendingBillpayment ++++ >>> "+lastPendingBillpayment);
			Double newPendingBillpayment = lastPendingBillpayment - Double.parseDouble(returnTotal);			
			
			if(newPendingBillpayment < 0)
			{
				newPendingBillpayment = 0.0;
			}
			
			Double oriQuantity = uniqueResult.getOringnalQuantity();
			
			Double updatequnty = (Double) (quant - Double.parseDouble(editQuantity));
			Double oQuant = (Double) (oriQuantity - Double.parseDouble(editQuantity));
			Double updateReturnQuantity = returnQuantity + Double.parseDouble(editQuantity);
			GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(PkGoodRecId));

			updateStock.setQuantity(updatequnty);
			updateStock.setOringnalQuantity(oQuant);
			updateStock.setTotal(Double.parseDouble(total));
			updateStock.setReturnQuantity(updateReturnQuantity);
			System.out.println("totalAmount ============> "+totalAmount);			
			System.out.println("EDIT QUANTITY =========> "+editQuantity);
						
			session.saveOrUpdate(updateStock);
			transaction.commit();
			
			GoodReciveDao grd = new GoodReciveDao();
			grd.setPendingBillPaymentToSupp(newPendingBillpayment, supplierIdLong);	
			
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
	
	public void setNewGrossTotal(String billNo, String supplierId, String newGrosstotal)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Transaction tx = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			tx = session.beginTransaction();
			double updatedGrossTotal = Double.parseDouble(newGrosstotal);
			long suppId = Long.parseLong(supplierId);
			Query query = session.createQuery("UPDATE GoodReceive set GrossTotal=:updatedGrossTotal where BillNo=:billNo AND FksuppId =:suppId");
			query.setParameter("updatedGrossTotal", updatedGrossTotal);
			query.setParameter("billNo", billNo);
			query.setParameter("suppId", suppId);			
			query.executeUpdate();
			tx.commit();			
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
	
	public void getTotalAndPendingBillPayment(String supplierId, Date adate, String totalReturnTotal, String barcodeNo)
	{
		HibernateUtility hbu = null;
		Session session = null;
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		List<SupplierPaymentBean> paymentList = null;
		Double totalAmount = 0.0;
		Double balanceAmount = 0.0;
		
		Query query = session.createSQLQuery("select SUM(gr.Total), gr.pending_bill_payment from goodreceive gr where FksuppId = "+supplierId);
		List<Object[]> list = query.list();
		paymentList = new ArrayList<SupplierPaymentBean>(0);
		for(Object[] object : list)
		{
			SupplierPaymentBean spb = new SupplierPaymentBean();
			totalAmount = Double.parseDouble(object[0].toString());
			balanceAmount = Double.parseDouble(object[1].toString());
			System.out.println(spb.getTotalAmount());
			System.out.println(spb.getBalance());
			paymentList.add(spb);
		}
		
		SupplierPaymentBean bean = new SupplierPaymentBean();
		bean.setSupplier(Long.parseLong(supplierId));
		bean.setBalance(balanceAmount);
		bean.setTotalAmount(totalAmount);
		bean.setPaymentType("debit");
		bean.setPaymentMode("cash");
		bean.setInsertDate(adate);
		bean.setPersonname("N/A");
		bean.setCredit(Double.parseDouble(totalReturnTotal));
		bean.setDescription("Purchase Returned");
		bean.setPurchaseReturnedAmount(Double.parseDouble(totalReturnTotal));
		bean.setBarCodeNo(Long.parseLong(barcodeNo));
		SupplierPaymentDao daov = new SupplierPaymentDao();
		daov.regSupPayment(bean);
	}
	
	public void getCreditDebitAmt(String supplierId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			List<SupplierPaymentBean> paymentList = null;
			int a = 1;
			Double creditAmount = 0.0;
			Double debitAmount = 0.0;
			Query query = session.createSQLQuery("Select SUM(sp.payment), sp.paymentType from supplier_payment sp where sp.paymentType='credit' AND sp.payment > 0 AND sp.fk_supplier_id = "+supplierId+" UNION ALL Select SUM(sp.payment), sp.paymentType from supplier_payment sp where sp.paymentType='debit' AND sp.payment > 0 AND sp.fk_supplier_id = "+supplierId);
			List<Object[]> list = query.list();
			paymentList = new ArrayList<SupplierPaymentBean>(0);
			for(Object[] object : list)
			{			
				if(a == 1)
				{
					creditAmount = Double.parseDouble(object[0].toString());
					a++;
					continue;
				}
				else if(a == 2)
				{
					debitAmount = Double.parseDouble(object[0].toString());
				}
				System.out.println("creditAmount ====> "+creditAmount);			
				System.out.println("debitamount ====> "+debitAmount);
			}
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
	
}
