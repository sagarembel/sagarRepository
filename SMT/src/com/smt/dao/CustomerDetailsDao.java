package com.smt.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.BillBean;
import com.smt.bean.BillCopy;
import com.smt.bean.GetCreditCustomerDetails;
import com.smt.bean.TransactionIdSaleReturn;
import com.smt.bean.allTransactionId;
import com.smt.hibernate.CustomerDetailsBean;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.SaleReturn;
import com.smt.utility.HibernateUtility;

import groovy.ui.SystemOutputInterceptor;

public class CustomerDetailsDao {

	public void valCustomerDetails(CustomerDetailsBean cdb) {
		System.out.println("In DAO");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("got session "); 
			transaction = session.beginTransaction();

			System.out.println("Tx started");
			session.save(cdb);
			transaction.commit();
			System.out.println("Successfully hi this is SAGAR ++++++++++++++++");
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

	public List<CustomerDetailsBean> getAllCustomer()
	{		
		System.out.println("GET CUSTOMER ===============> DAO");

		List<CustomerDetailsBean> customerList = null;
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select ccb.fkCrediCustId, cd.first_name, cd.last_name from creditcustomerbill ccb join customer_details cd ON cd.pk_customer_id = ccb.fkCrediCustId where ccb.pending_bill_payment > 0 GROUP BY ccb.fkCrediCustId;");
			//query = session.createQuery("from CustomerDetailsBean");
			list = query.list();
			customerList = new ArrayList<CustomerDetailsBean>(0);
			System.out.println("CUSTOMER LIST SIZE ========> "+list.size());
			if(list.size() > 0)
			{
				for (Object[] objects : list)
				{
					System.out.println(Arrays.toString(objects));
					CustomerDetailsBean bean = new CustomerDetailsBean();
					
					if(objects[0] == null)
					{}
					else
					{
						bean.setCustId(Long.parseLong(objects[0].toString()));
					}
					if(objects[1] == null)
					{}
					else
					{
						bean.setFirstName(objects[1].toString());
					}
					if(objects[2] == null)
					{}
					else
					{
						bean.setLastName(objects[2].toString());
					}
					
					customerList.add(bean);
				}
			}
			else
			{
				customerList.clear();
			}
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return customerList;
	}
	
	
	public List<CustomerDetailsBean> getAllCustomerForBilling()
	{		
		System.out.println("GET CUSTOMER ===============> DAO");

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<CustomerDetailsBean> list = null;
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//query = session.createSQLQuery("select ccb.fkCrediCustId, cd.first_name, cd.last_name from creditcustomerbill ccb join customer_details cd ON cd.pk_customer_id = ccb.fkCrediCustId where ccb.pending_bill_payment > 0 GROUP BY ccb.fkCrediCustId;");
			query = session.createQuery("from CustomerDetailsBean");
			list = query.list();			
			
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}

	public List<OtherBill> getAllMiscellaneousCustomer() {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<OtherBill> list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from OtherBill group by creditCustomer1");
			list = query.list();
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List<SaleReturn> getAllCustomer1() {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<SaleReturn> list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from SaleReturn group by billNo");
			list = query.list();
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List getVillageByCustomerName(String creditCustomerId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select c.address , c.first_name, c.contact_no, c.aadhar_no from customer_details c where c.pk_customer_id =" + creditCustomerId);
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

	public List getAllBillByCreditCustomer(String fkCustomerId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			String paytype = "y";
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.BillNo,s.Date,s.pending_bill_payment,s.Quantity from creditcustomerbill s where s.fkCrediCustId='" + fkCustomerId + "'group by s.BillNo");
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

	public List getAllBillByCreditCustomer2(String fkCustomerId)
	{
		List<BillCopy> saleList = null;
		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		try {
			System.out.println("Customer Name" + fkCustomerId);
			String paytype = "y";
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.BillNo,s.credit_Customer_Name,s.Quantity from otherbill s where s.credit_Customer_Name=:fkCustomerId group by s.BillNo");
			query.setParameter("fkCustomerId", fkCustomerId);
			list = query.list();

			saleList = new ArrayList<BillCopy>(0);
			for (Object[] objects : list) {
				System.out.println(Arrays.toString(objects));
				BillCopy bean = new BillCopy();
				String quantity = objects[2].toString();
				
				bean.setBillNo(Long.parseLong(objects[0].toString()));
				
				saleList.add(bean);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saleList;

	}

	public List getAllBillByCreditCustomer1(String fkCustomerId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.BillNo,s.Date from creditcustomerbill s where s.fkCrediCustId=" + fkCustomerId);

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

	public List getTotalAmountByBill(String billNo, String creditCustomer) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select totalperitem , Date, Discount  from creditcustomerbill  where BillNo='" + billNo + "'AND fkCrediCustId=" + creditCustomer);
			Query query = session.createSQLQuery("select totalperitem, Date, Discount from creditcustomerbill where fkCrediCustId = "+ creditCustomer+" AND totalperitem > 0");
			System.out.println("In dao get total");
			list = query.list();
			System.out.println("List size in DAO of total = == =" + list.size());
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

	public List getRemainingBalanceAmountByBill(String billNo, String creditCustomer)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("SELECT s.payment, s.bill_no, c.totalperitem, c.Discount,s.total_amount, s.balance from credit_customer_payment s left join creditcustomerbill c on c.BillNo = s.bill_no WHERE s.bill_no ='" + billNo + "' AND s.fk_customer_id='" + creditCustomer + "' group BY  s.pk_credit_customer_id;");
			Query query = session.createSQLQuery("SELECT s.payment, c.totalperitem, c.Discount, s.total_amount, s.balance, c.pending_bill_payment from credit_customer_payment s left join creditcustomerbill c on c.fkCrediCustId = s.fk_customer_id WHERE s.fk_customer_id='" + creditCustomer + "' group BY  s.pk_credit_customer_id;");

			list = query.list();

		} catch (Exception e)
		{
			e.printStackTrace();
			// TODO: handle exception
		}

		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
		return list;
	}

	public Double getTotalAmt(String billNo)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		Double totalAmount = null;
		List<GetCreditCustomerDetails> itemlist = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select GrossTotal, Date from creditcustomerbill  where BillNo=" + billNo);
			Query query = session.createSQLQuery("select pending_bill_payment, Date from creditcustomerbill where fkCrediCustId = "+billNo+" LIMIT 1");
			list = query.list();
			itemlist = new ArrayList<GetCreditCustomerDetails>(0);

			for (Object[] objects : list) {

				GetCreditCustomerDetails bean = new GetCreditCustomerDetails();

				String newBal = (objects[0].toString());
				totalAmount = Double.valueOf(newBal);

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
		return totalAmount;

	}

	public List getCreditCustomerForEdit(Long customerId) {

		System.out.println("into dao Credit Customer : " + customerId);
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("SELECT c.first_name, c.middle_name, c.last_name,c.email_id, c.address, c.contact_no, c.pin_code, c.aadhar_no FROM customer_details c where c.pk_customer_id=" + customerId);
			list = query.list();
		} catch (RuntimeException e) {
			e.printStackTrace();
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		System.out.println("out of dao - return credit customer List : " + list);
		return list;

	}

	public List getCreditCustomerList() {

		HibernateUtility hbu = null;
		Session session = null;
		List<GetCreditCustomerDetails> custList = null;
		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("SELECT first_name, middle_name, last_name, email_id, address, contact_no, pin_code, aadhar_no FROM customer_details");
			List<Object[]> list = query.list();

			custList = new ArrayList<GetCreditCustomerDetails>(0);

			for (Object[] object : list) {
				GetCreditCustomerDetails reports = new GetCreditCustomerDetails();

				reports.setFirstName(object[0].toString());
				reports.setMiddleName(object[1].toString());
				reports.setLastName(object[2].toString());
				reports.setAddress(object[4].toString());
				reports.setEmail(object[3].toString());
				reports.setContactNo((BigInteger) object[5]);
				reports.setZipCode((BigInteger) object[6]);
				reports.setAadhar(object[7].toString());

				custList.add(reports);

			}
		} catch (RuntimeException e) {

		} finally {

			hbu.closeSession(session);
		}
		return custList;
	}	
	
	public List getLastTransactionIdForSaleReturn()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<allTransactionId> listTid = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT sr.transactionId, sr.PkSellReturnId FROM salereturn sr ORDER BY sr.transactionId DESC LIMIT 1;");
			listTid = query.list();
		
			List<Object[]> list = query.list();
			listTid = new ArrayList<allTransactionId>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				allTransactionId reports = new allTransactionId();
				reports.setSaleReturnTransactoinId(Long.parseLong(object[0].toString()));
				System.out.println("getSaleReturnTransactoinId =============> "+reports.getSaleReturnTransactoinId());
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
