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

import com.smt.bean.SupplierPaymentDetail;
import com.smt.bean.allTransactionId;
import com.smt.dao.CustomerDetailsDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.SupplierPaymentDao;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.SupplierPaymentBean;
import com.smt.utility.HibernateUtility;

public class SupplierCashBankHelper
{
		Double bal;
		public void regSupplierCashBank(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("In helper");

		String supplier = request.getParameter("supplier");
		System.out.println("suplyer ****** by vikas -*****************"+supplier);

		String billNo = request.getParameter("billNo");

		String totalAmount = request.getParameter("totalAmount");
		
		String balanceAmount = request.getParameter("balanceAmount");

		String bankName = request.getParameter("bankName");

		String paymentType = request.getParameter("paymentType");

		String paymentMode = request.getParameter("paymentMode");

		String chequeNum = request.getParameter("chequeNum");

		String cardNum = request.getParameter("cardNum");

		String accNum = request.getParameter("accNum");

		String personname = request.getParameter("personname");

		String nameOnCheck = request.getParameter("nameOnCheck");

		String supPay = request.getParameter("supPay");

		String supPaymentDescription = request.getParameter("supPaymentDescription");
		
		String receiptNo = request.getParameter("receiptNo");
		
		String suppPayDate = request.getParameter("suppPayDate");
		
		Long transactionId = 1l;
		
		SupplierPaymentDao cdd = new SupplierPaymentDao();
		List trList = cdd.getLastTransactionNo();

		for (int i = 0; i < trList.size(); i++)
		{
			allTransactionId st = (allTransactionId) trList.get(i);
			transactionId = st.getSuppTransactionId();
			transactionId++;
		}

		SupplierPaymentBean bean = new SupplierPaymentBean();

		bean.setSupplier(Long.parseLong(supplier));
		bean.setBillNo(billNo);

		if (!"".equals(personname)) {
			bean.setPersonname(personname);
		} else {
			bean.setPersonname("N/A");
		}

		System.out.println("paymentMode " + paymentMode);

		// payment details
		if (paymentMode == null) {
			bean.setPaymentMode("N/A");
		} else {
			bean.setPaymentMode(paymentMode);
		}

		if (paymentMode.equals("cheque")) {

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
		} else if (paymentMode.equals("card")) {

			int cardNumLength = cardNum.length();
			if (cardNumLength > 0) {

				bean.setCardNum(Long.parseLong(cardNum));
			} else {
				bean.setCardNum(null);
			}
		}

		else if (paymentMode.equals("neft")) {
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
		
		if(supPaymentDescription == "" || supPaymentDescription == null || supPaymentDescription == " ")
		{
			if (paymentType.equals("credit"))
			{
				bean.setDescription("Credited To Supplier");
			}
			else if(paymentType.equals("debit"))
			{
				bean.setDescription("Debited From Supplier");
			}
		}
		else
		{
			bean.setDescription(supPaymentDescription);
		}
		bean.setReceiptNo(receiptNo);
		bean.setPurchaseReturnedAmount(0.0);

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		System.out.println("suppPayDate ====> "+suppPayDate);
		bean.setInsertDate(dateFormat1.parse(suppPayDate));

		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session = hbu.getHibernateSession();
		
		HibernateUtility hbu2 = HibernateUtility.getInstance();
		Session session2 = hbu2.getHibernateSession();

		// Query to get latest paid amount
		//Query query = session.createSQLQuery("SELECT balance ,bill_no from supplier_payment WHERE bill_no =:billNo ORDER BY  pk_supplier_payment_id  DESC LIMIT 1 ;");
		Query query = session.createSQLQuery("SELECT balance, fk_supplier_id from supplier_payment WHERE fk_supplier_id=:supplier ORDER BY pk_supplier_payment_id  DESC LIMIT 1;");
		//query.setParameter("billNo", billNo);
		query.setParameter("supplier", supplier);
		List<Object[]> list = query.list();
		int count = 0;
		for (Iterator iterator = list.iterator(); iterator.hasNext();)
		{ 
			System.out.println("Count **************--------------************* ");
			Object[] objects = (Object[]) iterator.next();
			String newBal = objects[0].toString();
			String billNodeo = objects[1].toString();
			System.out.println("count "+count+"***********"+billNodeo);
			// BigDecimal bigDecimal = new BigDecimal(newBal);
			bal = Double.valueOf(newBal);
			System.out.println(bal);
			count++;
		}

		System.out.println("*************************"+bal);

		if (bal == null)
		{
			Double balance = Double.parseDouble(balanceAmount);
			System.out.println("Balance inside if"+balance);
			if (paymentType.equals("credit"))
			{
				System.out.println("SupPAY inside if"+supPay);
				Double newBal = balance - Double.parseDouble(supPay);
				System.out.println("New Balance inside if"+newBal);
				Transaction transaction = session.beginTransaction();
				bean.setBalance(newBal);
				bean.setPaymentType(paymentType);
				bean.setCredit(Double.parseDouble(supPay));
				GoodReciveDao dao1 = new GoodReciveDao();
				List stkList2 = dao1.getAllPurschaseEntry();

				System.out.println("List size" + stkList2.size());
				System.out.println("NEW BALANCE =====> "+newBal);
				//Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND FksuppId = "+supplier);
				Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE FksuppId = "+supplier);
		        query2.executeUpdate();

				/*for (int j = 0; j < stkList2.size(); j++) {

					GoodReceive st = (GoodReceive) stkList2.get(j);
					String bill = st.getBillNo();
					String siD = st.getSupplierName().toString();
					Long pk_goods_receive_id = st.getPkGoodRecId();
					 System.out.println("Cash book Data****************************"+pk_goods_receive_id);

					if (billNo.equals(bill) && siD.equals(supplier))
					{
						System.out.println("111111111inside if bill no  "+billNo);
						System.out.println("111111111inside if supplier  "+supplier);

						Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND FksuppId = "+supplier);
				        query2.executeUpdate();
						
						GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pk_goods_receive_id));
						updateStock.setPendingBillPayment(newBal);

						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}*/

			}

			else {
				if (paymentType.equals("debit"))
				{
					Double newBal = balance + Double.parseDouble(supPay);

					Transaction transaction = session.beginTransaction();

					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(supPay));

					GoodReciveDao dao1 = new GoodReciveDao();
					List stkList2 = dao1.getAllPurschaseEntry();

					System.out.println("List size" + stkList2.size());
					System.out.println("NEW BALANCE =====> "+newBal);
					//Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND FksuppId = "+supplier);
					Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE FksuppId = "+supplier);
			        query2.executeUpdate();

					/*for (int j = 0; j < stkList2.size(); j++) {

						GoodReceive st = (GoodReceive) stkList2.get(j);
						String bill = st.getBillNo();
						String siD = st.getSupplierName().toString();
						Long pk_goods_receive_id = st.getPkGoodRecId();
						System.out.println("Cash book Data****************************"+pk_goods_receive_id);

						if (billNo.equals(bill) && siD.equals(supplier))
						{
							System.out.println("inside if");
							
							System.out.println("222222222inside if bill no  "+billNo);
							System.out.println("222222222inside if supplier  "+supplier);

							GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pk_goods_receive_id));
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

			SupplierPaymentDao dao = new SupplierPaymentDao();
			dao.regSupPayment(bean);
		}

		else
		{
			Double balance = Double.parseDouble(balanceAmount);
            System.out.println("Balance in Else"+balance);
			if (paymentType.equals("credit"))
			{
				System.out.println("SupPAY in else "+supPay);
				Double newBal = balance - Double.parseDouble(supPay);
				System.out.println("In Else Credit"+newBal);
				Transaction transaction = session.beginTransaction();

				bean.setBalance(newBal);
				bean.setPaymentType(paymentType);
				bean.setCredit(Double.parseDouble(supPay));
				
				/*if (bal.equals(Double.parseDouble(supPay)))
				{
					GoodReciveDao Npay = new GoodReciveDao();
					Npay.DeActivePaymentDone(billNo, supplier);
				}*/

				GoodReciveDao dao1 = new GoodReciveDao();
				List stkList2 = dao1.getAllPurschaseEntry();

				System.out.println("List size" + stkList2.size());
				System.out.println("NEW BALANCE =====> "+newBal);
				/*Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND FksuppId = "+supplier);*/
				Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE FksuppId = "+supplier);
		        query2.executeUpdate();

				/*for (int j = 0; j < stkList2.size(); j++)
				{
					GoodReceive st = (GoodReceive) stkList2.get(j);
					String bill = st.getBillNo();
					String siD = st.getSupplierName().toString();
					Long pk_goods_receive_id = st.getPkGoodRecId();
					
					
					System.out.println("Cash book Data****************************"+pk_goods_receive_id);
					Long supId = st.getSupplierName();
					System.out.println("Cash book bill****************************"+bill);
					System.out.println("Cash book sup id****************************"+supId);

					if (billNo.equals(bill) && siD.equals(supplier))
					{
						System.out.println("333333333333inside if bill no  "+billNo);
						System.out.println("333333333333inside if supplier  "+supplier);
						
						Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND FksuppId = "+supplier);
				        query2.executeUpdate();

						GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pk_goods_receive_id));
						updateStock.setPendingBillPayment(newBal);

						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}*/
			}

			else {
				if (paymentType.equals("debit"))
				{
					Double newBal = bal + Double.parseDouble(supPay);

					Transaction transaction = session.beginTransaction();

					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(supPay));

					GoodReciveDao dao1 = new GoodReciveDao();
					List stkList2 = dao1.getAllPurschaseEntry();
					System.out.println("NEW BALANCE =====> "+newBal);
					System.out.println("List size" + stkList2.size());
					/*Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND FksuppId = "+supplier);*/
					Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE FksuppId = "+supplier);
			        query2.executeUpdate();

					/*for (int j = 0; j < stkList2.size(); j++) {

						GoodReceive st = (GoodReceive) stkList2.get(j);
						String bill = st.getBillNo();
						String siD = st.getSupplierName().toString();
						Long pk_goods_receive_id = st.getPkGoodRecId();

						if (billNo.equals(bill) && siD.equals(supplier)) {

							System.out.println("inside if");
							
							System.out.println("4444444444inside if bill no  "+billNo);
							System.out.println("4444444444inside if supplier  "+supplier);

							Query query2 = session2.createQuery("UPDATE GoodReceive set pending_bill_payment = "+newBal+" WHERE BillNo = "+billNo+" AND FksuppId = "+supplier);
					        query2.executeUpdate();
							
							GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pk_goods_receive_id));
							updateStock.setPendingBillPayment(newBal);

							session.saveOrUpdate(updateStock);
							transaction.commit();
						}
					}*/
				}

				else {

					bean.setCredit(0.0);
				}
			}

			bean.setTotalAmount(Double.parseDouble(totalAmount));

			SupplierPaymentDao dao = new SupplierPaymentDao();
			dao.regSupPayment(bean);
		}
		
		HttpSession sessionHs = request.getSession();
		sessionHs.setAttribute("transactionId",transactionId);
		sessionHs.setAttribute("receiptNo",receiptNo);
	}

	public List getSupplierPaymentDetailsBySingleDate(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fDate");
		System.out.println(fDate + "Single Date");

		Map<Long, SupplierPaymentDetail> map = new HashMap<Long, SupplierPaymentDetail>();

		SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsForSingleDate(fDate);

		return supList;

	}

	public List getSupplierPaymentByTwoDate(HttpServletRequest request, HttpServletResponse response) {

		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SupplierPaymentDetail> map = new HashMap<Long, SupplierPaymentDetail>();

		SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> sup1List = dao.getSupplierDetailsDateWise(fDate, tDate);

		return sup1List;

	}

	public List getSupplierPaymentDetailsByBillNumber(HttpServletRequest request, HttpServletResponse response) {

		String billNo = request.getParameter("billNo");
		String fkSupplierId = request.getParameter("fkSupplierId");

		Map<Long, SupplierPaymentDetail> map = new HashMap<Long, SupplierPaymentDetail>();

		SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsAsBill(billNo, fkSupplierId);

		return supList;

	}

	public List getSupplierPaymentDetailsByNames(HttpServletRequest request, HttpServletResponse response) {
		String fkSupplierId = request.getParameter("fkSupplierId");

		Map<Long, SupplierPaymentDetail> map = new HashMap<Long, SupplierPaymentDetail>();

		SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsAsBill(fkSupplierId);

		return supList;
	}

	public List getSupplierUnpaidPaymentDetailsByNames(HttpServletRequest request, HttpServletResponse response) {
		String fkSupplierId = request.getParameter("supplier");

		Map<Long, SupplierPaymentDetail> map = new HashMap<Long, SupplierPaymentDetail>();

		SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> supList = dao.getSupplierUnpaidPaymentDetailsAsBill(fkSupplierId);

		return supList;
	}

}
