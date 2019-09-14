package com.smt.helper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.CreditCustPaymentDetail;
import com.smt.bean.allTransactionId;
import com.smt.dao.CreditCustBillDao;
import com.smt.dao.CustomerPaymentDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.SupplierPaymentDao;
import com.smt.hibernate.CreditCustomerBill;
import com.smt.hibernate.CustomerPaymentBean;
import com.smt.hibernate.GoodReceive;
import com.smt.utility.HibernateUtility;

public class CustomerPaymentHelper
{
	Double bal;

	public void regCreditCustomerCashBank(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("In helper");

		String customer = request.getParameter("customer");

		String billNo = request.getParameter("billNo");

		String totalAmount = request.getParameter("totalAmount");

		String bankName = request.getParameter("bankName");

		String custPay = request.getParameter("custPay");

		String paymentMode1 = request.getParameter("paymentMode1");

		String chequeNum = request.getParameter("chequeNum");

		String cardNum = request.getParameter("cardNum");

		String accNum = request.getParameter("accNum");

		String personname = request.getParameter("personname");

		String nameOnCheck = request.getParameter("nameOnCheck");

		String paymentType = request.getParameter("paymentType");
		
		String balanceAmount1 = request.getParameter("balanceAmount1");
		
		String creditCustPaymentDescription = request.getParameter("creditCustPaymentDescription");
		
		String creditReceiptNo = request.getParameter("creditReceiptNo");
		
		String ccPayDate = request.getParameter("ccPayDate");
		
		Long crCustTransactionId = 1l;
		
		CustomerPaymentDao cdd = new CustomerPaymentDao();
		List trList = cdd.getCustPayLastTransactionNo();

		for (int i = 0; i < trList.size(); i++)
		{
			allTransactionId st = (allTransactionId) trList.get(i);
			crCustTransactionId = st.getCustTransactionId();
			crCustTransactionId++;
		}

		
		System.out.println("crCustTransactionId ==========> "+crCustTransactionId);

		CustomerPaymentBean bean = new CustomerPaymentBean();

		bean.setCustomer(Long.parseLong(customer));
		//bean.setBillNo(Long.parseLong(billNo));
		//bean.setBillNo(0l);

		if (!"".equals(personname)) {
			bean.setPersonname(personname);
		} else {
			bean.setPersonname("N/A");
		}
		/* bean.setPersonname(personname); */

		System.out.println("paymentMode " + paymentMode1);

		// payment details
		if (paymentMode1 == null) {
			bean.setPaymentMode("N/A");
		} else {
			bean.setPaymentMode(paymentMode1);
		}

		if (paymentMode1.equals("cheque")) {

			if (chequeNum == null) {
				bean.setChequeNum("N/A");
			} else {
				bean.setChequeNum(chequeNum);
			}

			if (nameOnCheck == null) {
				bean.setNameOnCheck("N/A");
			} else {
				bean.setNameOnCheck(nameOnCheck);
			}
		} else if (paymentMode1.equals("card")) {

			int cardNumLength = cardNum.length();
			if (cardNumLength > 0) {

				bean.setCardNum(Long.parseLong(cardNum));
			} else {
				bean.setCardNum(null);
			}
		}

		else if (paymentMode1.equals("neft")) {
			if (bankName == null) {
				bean.setBankName("N/A");
			} else {
				bean.setBankName(bankName);
			}

			int accNumLength = accNum.length();
			if (accNumLength > 0) {
				bean.setAccNum(Long.parseLong(accNum));

			} else {
				bean.setAccNum(null);
			}
		}
		
		if(creditCustPaymentDescription == null || creditCustPaymentDescription.isEmpty())
		{
			bean.setDescription("N/A");
		}
		else
		{
			bean.setDescription(creditCustPaymentDescription);
		}
		
		bean.setReturnAmount(0.0);
		bean.setReceiptNo(creditReceiptNo);

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		bean.setInsertDate(dateFormat1.parse(ccPayDate));
		
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session = hbu.getHibernateSession();
		
		HibernateUtility hbu2 = HibernateUtility.getInstance();
		Session session2 = hbu2.getHibernateSession();
		System.out.println("customer ====> "+customer);
		// Query to get latest paid amount
		//Query query = session.createSQLQuery("SELECT balance ,bill_no from credit_customer_payment WHERE bill_no =:billNo ORDER BY pk_credit_customer_id  DESC LIMIT 1 ;");
		Query query = session.createSQLQuery("SELECT ccp.balance, ccp.fk_customer_id from credit_customer_payment ccp WHERE ccp.fk_customer_id =:customer ORDER BY pk_credit_customer_id  DESC LIMIT 1 ");
		query.setParameter("customer", customer);
		List<Object[]> list = query.list();

		System.out.println("Calc total");

		for (Iterator iterator = list.iterator(); iterator.hasNext();)
		{
			Object[] objects = (Object[]) iterator.next();
			String newBal = objects[0].toString();
			bal = Double.valueOf(newBal);
			System.out.println(bal + "  bal");
			System.out.println("Calc balance");
		}

		if (bal == null)
		{
			//Double balance = Double.parseDouble(totalAmount);
			Double balance = Double.parseDouble(balanceAmount1);

			if (paymentType.equals("credit"))
			{
				Double newBal = balance - Double.parseDouble(custPay);

				Transaction transaction = session.beginTransaction();

				bean.setBalance(newBal);
				bean.setPaymentType(paymentType);
				bean.setCredit(Double.parseDouble(custPay));
				GoodReciveDao dao1 = new GoodReciveDao();
				List stkList2 = dao1.getAllSaleEntry();

				System.out.println("List size" + stkList2.size());
				
				//Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND fkCrediCustId = "+customer);
				Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE fkCrediCustId = "+customer);
		        query2.executeUpdate();

				/*for (int j = 0; j < stkList2.size(); j++) {

					CreditCustomerBill st = (CreditCustomerBill) stkList2.get(j);
					String bill = st.getBillNo1();
					Long pk_goods_receive_id = st.getPkCreditBillId();

					if (billNo.equals(bill)) {

						System.out.println("inside if");

						CreditCustomerBill updateStock = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pk_goods_receive_id));
						updateStock.setPendingBillPayment(newBal);

						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}*/
			}

			else {
				if (paymentType.equals("debit")) {
					Double newBal = balance + Double.parseDouble(custPay);

					Transaction transaction = session.beginTransaction();

					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(custPay));

					GoodReciveDao dao1 = new GoodReciveDao();
					List stkList2 = dao1.getAllSaleEntry();

					System.out.println("List size" + stkList2.size());
					//Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND fkCrediCustId = "+customer);
					Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE fkCrediCustId = "+customer);
			        query2.executeUpdate();
					
					/*for (int j = 0; j < stkList2.size(); j++) {

						CreditCustomerBill st = (CreditCustomerBill) stkList2.get(j);
						String bill = st.getBillNo1();
						Long pk_goods_receive_id = st.getPkCreditBillId();

						if (billNo.equals(bill)) {

							System.out.println("inside if");

							CreditCustomerBill updateStock = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pk_goods_receive_id));
							updateStock.setPendingBillPayment(newBal);

							session.saveOrUpdate(updateStock);
							transaction.commit();
						}
					}*/
				} else {

					bean.setCredit(0.0);
				}
			}

			bean.setTotalAmount(Double.parseDouble(totalAmount));

			com.smt.dao.CustomerPaymentDao dao = new CustomerPaymentDao();
			dao.regCustomerPayment(bean);
		}

		else {

			Double balance = Double.parseDouble(balanceAmount1);

			if (paymentType.equals("credit")) {
				Double newBal = balance - Double.parseDouble(custPay);

				Transaction transaction = session.beginTransaction();

				bean.setBalance(newBal);
				bean.setPaymentType(paymentType);
				bean.setCredit(Double.parseDouble(custPay));
				GoodReciveDao dao1 = new GoodReciveDao();
				List stkList2 = dao1.getAllSaleEntry();

				System.out.println("List size" + stkList2.size());
				
				//Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND fkCrediCustId = "+customer);
				Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE fkCrediCustId = "+customer);
		        query2.executeUpdate();

				/*for (int j = 0; j < stkList2.size(); j++) {

					CreditCustomerBill st = (CreditCustomerBill) stkList2.get(j);

					Long bill = st.getBillNo();
					String billNo1 = bill.toString();
					Long pk_goods_receive_id = st.getPkCreditBillId();

					if (billNo.equals(billNo1)) {

						System.out.println("inside if");

						CreditCustomerBill updateStock = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pk_goods_receive_id));
						updateStock.setPendingBillPayment(newBal);

						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}*/
			} else {
				if (paymentType.equals("debit")) {
					Double newBal = bal + Double.parseDouble(custPay);

					Transaction transaction = session.beginTransaction();

					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(custPay));

					GoodReciveDao dao1 = new GoodReciveDao();
					List stkList2 = dao1.getAllSaleEntry();

					System.out.println("List size" + stkList2.size());
					//Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND fkCrediCustId = "+customer);
					Query query2 = session2.createQuery("UPDATE CreditCustomerBill set pending_bill_payment = "+newBal+" WHERE fkCrediCustId = "+customer);
			        query2.executeUpdate();

					/*for (int j = 0; j < stkList2.size(); j++) {

						CreditCustomerBill st = (CreditCustomerBill) stkList2.get(j);
						String bill = st.getBillNo1();
						Long pk_goods_receive_id = st.getPkCreditBillId();

						if (billNo.equals(bill)) {

							System.out.println("inside if");

							CreditCustomerBill updateStock = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pk_goods_receive_id));
							updateStock.setPendingBillPayment(newBal);

							session.saveOrUpdate(updateStock);
							transaction.commit();
						}
					}*/
				} else {

					bean.setCredit(0.0);
				}
			}

			bean.setTotalAmount(Double.parseDouble(totalAmount));
			CustomerPaymentDao dao = new CustomerPaymentDao();
			dao.regCustomerPayment(bean);
		}
		
		HttpSession session1 = request.getSession();
		session1.setAttribute("BillNo", billNo);
		session1.setAttribute("creditCustomerName", customer);
		session1.setAttribute("crCustTransactionId", crCustTransactionId);
	}

	public List getCustDetailsByDate(HttpServletRequest request, HttpServletResponse response) {

		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, CreditCustPaymentDetail> map = new HashMap<Long, CreditCustPaymentDetail>();

		CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> custList = dao.getCreditCustomerDetailsDateWise(fDate, tDate);

		return custList;
	}

	public List getCustPaymentDetailsBySingleDate(HttpServletRequest request, HttpServletResponse response) {

		String fDate = request.getParameter("fDate");

		Map<Long, CreditCustPaymentDetail> map = new HashMap<Long, CreditCustPaymentDetail>();

		CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> cust1List = dao.getCreditCustPaymentDetailsForSingleDate(fDate);

		return cust1List;
	}

	public List getCustPaymentDetailsByBill(HttpServletRequest request, HttpServletResponse response) {

		String billNo = request.getParameter("billNo");
		String fkCustomerId = request.getParameter("fkCustomerId");

		Map<Long, CreditCustPaymentDetail> map = new HashMap<Long, CreditCustPaymentDetail>();

		CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> cust1List = dao.getCreditCustPaymentDetailsAsPerBillNum(billNo, fkCustomerId);

		return cust1List;

	}

	public List getCustPaymentDetailsByNames(HttpServletRequest request, HttpServletResponse response) {
		String fkCustomerId = request.getParameter("fkCustomerId");

		Map<Long, CreditCustPaymentDetail> map = new HashMap<Long, CreditCustPaymentDetail>();

		CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> cust1List = dao.getCreditCustPaymentDetailsAsPerName(fkCustomerId);

		return cust1List;
	}

	public List getCreditCustomerBalanceReportNameWise(HttpServletRequest request, HttpServletResponse response) {
		String fkCustomerId = request.getParameter("fkCustomerId");

		Map<Long, CreditCustPaymentDetail> map = new HashMap<Long, CreditCustPaymentDetail>();

		CustomerPaymentDao dao = new CustomerPaymentDao();
		List<CreditCustPaymentDetail> cust1List = dao.getCreditCustomerBalanceReportNameWise(fkCustomerId);

		return cust1List;
	}

}
