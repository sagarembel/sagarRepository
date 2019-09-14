package com.smt.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.SupplierPaymentDetail;
import com.smt.bean.allTransactionId;
import com.smt.hibernate.SupplierPaymentBean;
import com.smt.utility.HibernateUtility;

public class SupplierPaymentDao {

	public void regSupPayment(SupplierPaymentBean bean) {

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(bean);
			transaction.commit();
			System.out.println("Successful");
		} catch (RuntimeException e) {

			try {
				transaction.rollback();
			} catch (RuntimeException e2) {

				Log.error("Error in regSupPayment", e2);
			}
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

	// Supplier Payment details for single date
	public List<SupplierPaymentDetail> getCreditCustPaymentDetailsForSingleDate(String fDate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<SupplierPaymentDetail> supplierList = null;
		Double returnAmt = 0.0;		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select sd.supplier_name, sp.description, sp.total_amount, sp.balance, sp.payment, sp.payment_mode, sp.person_name, sp.paymentType, sp.acc_num, sp.bank_name, sp.insert_date, sp.purchaseReturnedAmount, sp.description FROM supplier_details sd RIGHT JOIN supplier_payment sp ON sd.supplier_id = sp.fk_supplier_id WHERE DATE(insert_date)=:isInsertDate");
			query.setParameter("isInsertDate", fDate);
			List<Object[]> list = query.list();
			supplierList = new ArrayList<SupplierPaymentDetail>(0);

			for (Object[] object : list) {

				SupplierPaymentDetail reports = new SupplierPaymentDetail();

				reports.setSupplierName(object[0].toString());
				//reports.setBillNo(object[1].toString());
				reports.setBillNo("0");
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				reports.setPaymentAmount(Double.parseDouble(object[4].toString()));
				if(object[5] == null)
				{
					reports.setPaymentMode("N/A");
				}
				else
				{
					reports.setPaymentMode(object[5].toString());
				}
				reports.setAccountantName(object[6].toString());
				
				if(object[7] == null)
				{
					reports.setPaymentType("N/A");
				}
				else
				{
					reports.setPaymentType(object[7].toString());
				}
				if(object[8]==null)
				{reports.setAccountNo("NA");}else
				{reports.setAccountNo(object[8].toString());}
				
				if(object[8]==null)
				{reports.setBankName("NA");}else
				{reports.setBankName(object[9].toString());}
				reports.setDate(object[10].toString());				
				
				if(object[11] == null)
				{
					reports.setPurchaseReturnAmt(0.0);
				}
				else
				{
					returnAmt = Double.parseDouble(object[11].toString());
					reports.setPurchaseReturnAmt(Double.parseDouble(object[11].toString()));
				}
				
				
				if(returnAmt > 0.0)
				{
					reports.setDescription("Purchase Returned");
				}
				else
				{
					reports.setDescription(object[12].toString());
				}
				
				supplierList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierList;

	}

	// Supplier Payment Details between two dates
	public List<SupplierPaymentDetail> getSupplierDetailsDateWise(String fDate, String tDate) {

		System.out.println(fDate + "first Date In dao");
		System.out.println(tDate + "Second Date In dao");
		Double returnAmt = 0.0;
		HibernateUtility hbu = null;
		Session session = null;
		List<SupplierPaymentDetail> sup1List = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select sd.supplier_name, sp.description, sp.total_amount, sp.balance, sp.payment, sp.payment_mode, sp.person_name, sp.paymentType, sp.insert_date, sp.acc_num, sp.bank_name, sp.purchaseReturnedAmount, sp.description FROM supplier_details sd RIGHT JOIN supplier_payment sp ON sd.supplier_id = sp.fk_supplier_id WHERE insert_date BETWEEN '" + fDate + "' AND '" + tDate+"'");
			List<Object[]> list = query2.list();
			sup1List = new ArrayList<SupplierPaymentDetail>(0);

			for (Object[] object : list)
			{
				SupplierPaymentDetail reports = new SupplierPaymentDetail();

				reports.setSupplierName(object[0].toString());
				//reports.setBillNo(object[1].toString());
				reports.setBillNo("0");
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				reports.setPaymentAmount(Double.parseDouble(object[4].toString()));
				if(object[5] == null)
				{
					reports.setPaymentMode("N/A");
				}
				else
				{
					reports.setPaymentMode(object[5].toString());
				}

				reports.setAccountantName(object[6].toString());
				if(object[7] == null)
				{
					reports.setPaymentType("N/A");
				}
				else
				{
					reports.setPaymentType(object[7].toString());
				}
				reports.setDate(object[8].toString());
				if(object[9]==null)
				{
					reports.setAccountNo("N/A");
				}
				else{
					reports.setAccountNo(object[9].toString());
				}
				if(object[10]==null)
				{
					reports.setBankName("NA");
				}
				else{
					reports.setBankName(object[10].toString());
				}
				
				if(object[11] == null)
				{
					reports.setPurchaseReturnAmt(0.0);
				}
				else
				{
					returnAmt = Double.parseDouble(object[11].toString());
					reports.setPurchaseReturnAmt(Double.parseDouble(object[11].toString()));
				}				
				if(returnAmt > 0.0)
				{
					reports.setDescription("Purchase Returned");
				}
				else
				{
					reports.setDescription(object[12].toString());
				}
				sup1List.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sup1List;

	}

	public List<SupplierPaymentDetail> getCreditCustPaymentDetailsAsBill(String billNo, String fkSupplierId) {

		HibernateUtility hbu = null;
		Session session = null;
		List<SupplierPaymentDetail> supplierList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.supplier_name, p.bill_no, p.total_amount, p.balance, p.payment, p.payment_mode, p.person_name , p.paymentType, p.insert_date, p.acc_num, p.bank_name FROM supplier_details s RIGHT JOIN supplier_payment p ON s.supplier_id = p.fk_supplier_id WHERE p.bill_no =:billNumber And p.fk_supplier_id=:fkSupplierId");
			query.setParameter("billNumber", billNo);
			query.setParameter("fkSupplierId", fkSupplierId);

			List<Object[]> list = query.list();
			supplierList = new ArrayList<SupplierPaymentDetail>(0);

			for (Object[] object : list) {

				SupplierPaymentDetail reports = new SupplierPaymentDetail();

				reports.setSupplierName(object[0].toString());
				reports.setBillNo(object[1].toString());
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));
				reports.setPaymentAmount(Double.parseDouble(object[4].toString()));
				reports.setPaymentMode(object[5].toString());
				reports.setAccountantName(object[6].toString());
				reports.setPaymentType(object[7].toString());
				reports.setDate(object[8].toString());
				if(object[9]==null)
				{
					reports.setAccountNo("NA");
				}
				else{
					reports.setAccountNo(object[9].toString());
				}
				
				if(object[10]==null)
				{
					reports.setAccountNo("NA");
				}
				else{
				reports.setBankName(object[10].toString());
				}
				supplierList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierList;

	}

	public List<SupplierPaymentDetail> getCreditCustPaymentDetailsAsBill(String fkSupplierId)
	{
		
		Double returnAmt = 0.0;
		HibernateUtility hbu = null;
		Session session = null;
		List<SupplierPaymentDetail> supplierList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select sd.supplier_name, sp.description, sp.total_amount, sp.balance, sp.paymentType, sp.payment_mode, sp.person_name, sp.payment, sp.insert_date, sp.acc_num, sp.bank_name, sp.purchaseReturnedAmount, sp.description FROM supplier_details sd RIGHT JOIN supplier_payment sp ON sd.supplier_id = sp.fk_supplier_id WHERE sp.fk_supplier_id=:fkSupplierId");
			query.setParameter("fkSupplierId", fkSupplierId);
			List<Object[]> list = query.list();
			supplierList = new ArrayList<SupplierPaymentDetail>(0);

			for (Object[] object : list)
			{

				SupplierPaymentDetail reports = new SupplierPaymentDetail();

				reports.setSupplierName(object[0].toString());
				//reports.setBillNo(object[1].toString());
				reports.setBillNo("0");
				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(object[3].toString()));				
				
				if(object[4]==null)
				{
					reports.setPaymentType("N/A");
				}
				else
				{
					reports.setPaymentType(object[4].toString());
				}
				
				
				if(object[5]==null)
				{
					reports.setPaymentMode("N/A");
				}
				else
				{
					reports.setPaymentMode(object[5].toString());
				}
				
				reports.setAccountantName(object[6].toString());
				
				reports.setPaymentAmount(Double.parseDouble(object[7].toString()));
				reports.setDate(object[8].toString());
				if(object[9]==null)
				{
					reports.setAccountNo("NA");
				}
				else
				{
					reports.setAccountNo(object[9].toString());
				}
				if(object[10]==null)
				{
					reports.setBankName("NA");
				}
				else
				{
					reports.setBankName(object[10].toString());
				}
				
				if(object[11] == null)
				{
					reports.setPurchaseReturnAmt(0.0);
				}
				else
				{
					returnAmt = Double.parseDouble(object[11].toString());
					reports.setPurchaseReturnAmt(Double.parseDouble(object[11].toString()));
				}
				
				if(returnAmt > 0.0)
				{
					reports.setDescription("Purchase Returned");
				}
				else
				{
					reports.setDescription(object[12].toString());
				}
				
				supplierList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierList;

	}

	public List<SupplierPaymentDetail> getSupplierUnpaidPaymentDetailsAsBill(String fkSupplierId) {
		Double total = 0.0;
		HibernateUtility hbu = null;
		Session session = null;
		List<SupplierPaymentDetail> supplierList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select supplier_name, BillNo, pending_bill_payment FROM supplier_details RIGHT JOIN goodreceive ON supplier_details.supplier_id = goodreceive.FksuppId WHERE goodreceive.FksuppId=:fkSupplierId group by BillNo LIMIT 1");		
			query.setParameter("fkSupplierId", fkSupplierId);
			List<Object[]> list = query.list();
			supplierList = new ArrayList<SupplierPaymentDetail>(0);

			for (Object[] object : list) {

				SupplierPaymentDetail reports = new SupplierPaymentDetail();

				String pendingBal = object[2].toString();
				if (pendingBal.equals("0"))
				{
					continue;
				} else {
					reports.setSupplierName(object[0].toString());
					reports.setBillNo(object[1].toString());
					String pendingBillPayment = object[2].toString();
					//String payment = object[3].toString();
					Double billPayment = Double.valueOf(pendingBillPayment);
					//Double payment1 = Double.valueOf(payment);
					total = billPayment;
					System.out.println("Bill No"+object[1]);
					System.out.println("Total Bill"+billPayment);
					//System.out.println("Total Bill"+payment1);
					System.out.println("Total "+total);
					reports.setBalanceAmount(total);
				}
				supplierList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierList;

	}

	// Supplier payment details for report
	public List getSupplierPaymentDetailForReport() {

		HibernateUtility hbu = null;
		Session session = null;
		List<SupplierPaymentDetail> productList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT s.supplier_name,p.bill_no,p.total_amount,p.balance,p.paymentType,p.payment,p.payment_mode,p.person_name FROM supplier_payment p LEFT JOIN supplier_details s ON p.fk_supplier_id = s.pk_supplier_id");
			List<Object[]> list = query.list();
			productList = new ArrayList<SupplierPaymentDetail>(0);
			for (Object[] o : list) {
				System.out.println(Arrays.toString(o));

				SupplierPaymentDetail reports = new SupplierPaymentDetail();

				reports.setSupplierName(o[0].toString());
				reports.setBillNo(o[1].toString());
				reports.setTotalAmount(Double.parseDouble(o[2].toString()));
				reports.setBalanceAmount(Double.parseDouble(o[3].toString()));
				reports.setPaymentType(o[4].toString());
				reports.setPaymentAmount(Double.parseDouble(o[5].toString()));
				reports.setPaymentMode(o[6].toString());
				reports.setAccountantName(o[7].toString());

				productList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return productList;
	}
	
	public List getLastTransactionNo()
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
			Query query = session.createSQLQuery("SELECT sp.pk_supplier_payment_id, sp.fk_supplier_id FROM supplier_payment sp ORDER BY sp.pk_supplier_payment_id DESC LIMIT 1;");
			listTid = query.list();
			
			List<Object[]> list = query.list();
			listTid = new ArrayList<allTransactionId>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				allTransactionId reports = new allTransactionId();
				reports.setSuppTransactionId(Long.parseLong(object[0].toString()));
				System.out.println("suppTransactionId =============> "+reports.getSuppTransactionId());
				listTid.add(reports);
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return listTid;
	}
	
	public void updateSupplierPaymentTable()
	{
		
	}

}
