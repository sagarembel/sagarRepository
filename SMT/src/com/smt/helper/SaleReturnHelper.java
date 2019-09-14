package com.smt.helper;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.bean.CustomerBean;
import com.smt.bean.GoodreciveBillBean;
import com.smt.bean.SaleReturnBean;
import com.smt.bean.allTransactionId;
import com.smt.dao.CustomerDetailsDao;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.CustomerPaymentDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.SaleReturnDao;
import com.smt.dao.StockDao;
import com.smt.hibernate.SaleReturn;
import com.smt.hibernate.Stock;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class SaleReturnHelper {

	public void returnSale(HttpServletRequest request, HttpServletResponse response)
	{		
		HttpSession sessionv = request.getSession(true);
		String type2 = "";
        String name2 = "";
        Long uid = null ;
        if (sessionv != null)
        {
	         if (sessionv.getAttribute("user") != null)
	         {
	        	 name2 = (String) sessionv.getAttribute("user");
	          	 HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
	        	 query1.setParameter("name2", name2);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
			 }
	         else
	         {
	        	type2 = request.getParameter("userType");
	        	name2 = request.getParameter("userName");
	        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
	        	 query1.setParameter("name2", name2);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
	         }
        }         
        
        System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
        System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
		
		Long transactionIdSr = 1l;
		String creditCustomer1 = "";
		
		CustomerDetailsDao cdd = new CustomerDetailsDao();
		List trList = cdd.getLastTransactionIdForSaleReturn();
		
		for (int i = 0; i < trList.size(); i++)
		{
			allTransactionId st = (allTransactionId) trList.get(i);
			transactionIdSr = st.getSaleReturnTransactoinId();
			transactionIdSr++;
		}
		
		// TODO Auto-generated method stub
		SaleReturn cust = new SaleReturn();

		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);

		for (int i = 0; i < count; i++)
		{				
			String editQuantity = request.getParameter("editQuantity" + i);
			
			System.out.println("EDIT QAUNTITY ===== > "+editQuantity);
			
			Double checkReturnQty = Double.parseDouble(editQuantity);
			if(checkReturnQty > 0)
			{						
				System.out.println("transactionIdSr ===== >>>>>> "+transactionIdSr);
				cust.setTransactionId(transactionIdSr);
				
				String reasonForSReturn1 = request.getParameter("reasonForSReturn1");
				if(reasonForSReturn1 == null || reasonForSReturn1.equalsIgnoreCase("") || reasonForSReturn1 == " ")
				{
					String reasonForSReturn2 = request.getParameter("reasonForSReturn2");
					if(reasonForSReturn2 == null || reasonForSReturn2.equalsIgnoreCase("") || reasonForSReturn2 == " ")
					{
						cust.setReturnReason("Sale Return");
					}
					else
					{
						cust.setReturnReason(reasonForSReturn2);
					}				
				}
				else
				{
					cust.setReturnReason(reasonForSReturn1);
				}
				
				String itemName = request.getParameter("itemName" + i);
				cust.setItemName(itemName);
	
				String categoryName = request.getParameter("categoryName" + i);
				if (!"".equals(categoryName)) {
					cust.setCategoryName(categoryName);
				} else {
					cust.setCategoryName("N/A");
				}
	
				String quantity = request.getParameter("quantity" + i);
				System.out.println("@@@@@@@@@@ sale return"+quantity);
				
				System.out.println("@@@@@@@@@@ edit sale return"+editQuantity);
				
				Double afterReturnQuantity = Double.parseDouble(quantity) - Double.parseDouble(editQuantity);
				
				System.out.println("quantity" + quantity);
				cust.setQuantity(afterReturnQuantity);
				System.out.println("after sale return"+afterReturnQuantity);
				cust.setAfterQuantity(afterReturnQuantity);
				cust.setEditQuantity(Double.parseDouble(editQuantity));
	
				String salePrice = request.getParameter("salePrice" + i);
	
				cust.setSalePrice(Double.parseDouble(salePrice));
	
				String barcodeNo = request.getParameter("barcodeNo" + i);
				System.out.println("barcode no in sale return" + barcodeNo);
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
	
				String contactNo = request.getParameter("contactNo" + i);
				if (contactNo == null) {
					cust.setContactNo(Long.parseLong("00"));
				} else {
					cust.setContactNo(Long.parseLong(contactNo));
				}
	
				String carNo = request.getParameter("carNo");
				if (!"".equals(carNo))
				{
					cust.setCarNo(carNo);
				}
				else
				{
					cust.setCarNo("N/A");
				}
	
				String totalAmt = request.getParameter("totalAmt" + i);
				cust.setTotalAmt(Double.parseDouble(totalAmt));
				
				String discount = request.getParameter("discount" + i);
				cust.setDiscount(Double.parseDouble(discount));
	
				String returnTotalAmt = request.getParameter("returnTotalAmt" + i);
				System.out.println("returnTotalAmt ================> "+returnTotalAmt);
				cust.setReturnTotal(Double.parseDouble(returnTotalAmt));//-Double.parseDouble(discount));
	
				String grossamt = request.getParameter("grossamt" + i);
				if (grossamt == null)
				{
					cust.setGrossamt(Double.parseDouble("0.00"));
				}
				else
				{
					cust.setGrossamt(Double.parseDouble(grossamt));
				}
	
				String Date = request.getParameter("Date" + i);
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	
				Date adate = null;
				try
				{
					adate = format.parse(Date);
				} catch (ParseException e1)
				{
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				cust.setCurrent_date(adate);
				try
				{
					//DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
					Date dateobj = new Date();
					System.out.println(format.format(dateobj));
					String newDate = format.format(dateobj);
					Date today = format.parse(newDate);
					System.out.println(today);
					cust.setDate(today);
				}
				catch(Exception e)
				{
					System.out.println(e);
				}
				String billNo = request.getParameter("billNo");
				cust.setBillNo(Long.parseLong(billNo));
				System.out.println("hi this is bill no for billno wise return");
	
				creditCustomer1 = request.getParameter("creditCustomer1");
				System.out.println("hi this is bill no for Cusomer name wise return");
				cust.setCustomerName(creditCustomer1);
	
				cust.setType("Tax Invoice");
				
				double gst = Double.parseDouble(request.getParameter("gst"+i));
				cust.setGst(gst);
				
				double iGst = Double.parseDouble(request.getParameter("iGst"+i));
				cust.setiGst(iGst);
				
				double taxAmount = Double.parseDouble(request.getParameter("taxAmt"+i));
				cust.setTaxAmount(taxAmount);
				
				cust.setFkCreditCustId(0l);				
				
				long productId = Long.parseLong(request.getParameter("productId"+i));
				cust.setProductId(productId);;
				
				long catId = Long.parseLong(request.getParameter("catId"+i));
				cust.setCatId(catId);;
				
				long subCatId = Long.parseLong(request.getParameter("subCatId"+i));
				cust.setSubCatId(subCatId);
				
				cust.setUserType(type2);
				cust.setFkUserId(uid);
				
				cust.setRedeemedForBillNo(0l);
				
				System.out.println("hi sagar all value is get");
				SaleReturnDao dao = new SaleReturnDao();
				dao.registerSaleReturn(cust);
	
				// update sellbill quantity minus
				Long pkBillId = Long.parseLong(request.getParameter("pkBillId" + i));
				SaleReturnDao good = new SaleReturnDao();
				good.updateQuantity(pkBillId, editQuantity, totalAmt);
				
				// update sellbill quantity minus
				Long barcodeNo1 = Long.parseLong(request.getParameter("barcodeNo" + i));
				SaleReturnDao good1 = new SaleReturnDao();
				good1.updateBarcodeQuantity(barcodeNo1, editQuantity);
	
				StockDao dao1 = new StockDao();
				List stkList2 = dao1.getAllStockEntry();
	
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					long fkProductId = st.getFkProductId();
					long fkCatId = st.getFkCategoryId();
					
	
					/* If ItemName Is Already Exists In Stock Table */
					/*if (ItemId.equals(itemName) || cat.equals(categoryName))*/
					if (fkProductId == productId && fkCatId == catId)
					{
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
						System.out.println("for update stock quantity block");
						Double updatequnty = (Double) (qunty + Double.parseDouble(editQuantity));
	
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
	
						Date date = new Date();
	
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);
						System.out.println("update stock"+updatequnty);
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
			}
		}
		
		HttpSession sessionHttp = request.getSession();
		sessionHttp.setAttribute("transactionIdSr", transactionIdSr);
		sessionHttp.setAttribute("creditCustomer1", creditCustomer1);
	}

	public void returnSale1(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		
		HttpSession sessionv = request.getSession(true);
		String type2 = "";
        String name2 = "";
        Long uid = null ;
        if (sessionv != null)
        {
	         if (sessionv.getAttribute("user") != null)
	         {
	        	 name2 = (String) sessionv.getAttribute("user");
	          	 HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
	        	 query1.setParameter("name2", name2);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
			 }
	         else
	         {
	        	type2 = request.getParameter("userType");
	        	name2 = request.getParameter("userName");
	        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
	        	 query1.setParameter("name2", name2);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
	         }
        }         
        
        System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
        System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
        
		SaleReturn cust = new SaleReturn();
		Long transactionIdSr = null;
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		String billNo = "";
		for (int i = 0; i < count; i++)
		{			
			String editQuantity = request.getParameter("editQuantity" + i);

			if(Double.parseDouble(editQuantity) > 0)
			{	
				String reasonForSReturn3 = request.getParameter("reasonForSReturn3");
				System.out.println("SALE RERURN 3333333 "+reasonForSReturn3);
				if(reasonForSReturn3 == null || reasonForSReturn3.equalsIgnoreCase(""))
				{
					cust.setReturnReason("Sale Return");
				}
				else
				{
					cust.setReturnReason(reasonForSReturn3);
				}
				
				String itemName = request.getParameter("itemName" + i);
				cust.setItemName(itemName);
	
				String categoryName = request.getParameter("categoryName" +
				i);
				if (!"".equals(categoryName)) {
					cust.setCategoryName(categoryName);
				} else {
					cust.setCategoryName("N/A");
				}
	
				String quantity = request.getParameter("quantity" + i);
				//String editQuantity = request.getParameter("editQuantity" + i);
				Double afterReturnQuantity = Double.parseDouble(quantity) - Double.parseDouble(editQuantity);
				System.out.println("quantity" + quantity);
				cust.setQuantity(afterReturnQuantity);
				cust.setAfterQuantity(afterReturnQuantity);
				cust.setEditQuantity(Double.parseDouble(editQuantity));
	
				String salePrice = request.getParameter("salePrice" + i);
	
				cust.setSalePrice(Double.parseDouble(salePrice));
	
				String barcodeNo = request.getParameter("barcodeNo" + i);
				System.out.println("unitinMl" + barcodeNo);
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
	
				String contactNo = request.getParameter("contactNo" + i);
				if (contactNo == null) {
					cust.setContactNo(Long.parseLong("00"));
				} else {
					cust.setContactNo(Long.parseLong(contactNo));
				}
	
				String carNo = request.getParameter("carNo");
				if (!"".equals(carNo))
				{
					cust.setCarNo(carNo);
				} else {
					cust.setCarNo("N/A");
				}
	
				String totalAmt = request.getParameter("totalAmt" + i);
				cust.setTotalAmt(Double.parseDouble(totalAmt));
				
				String discount = request.getParameter("discount" + i);
				cust.setDiscount(Double.parseDouble(discount));
	
				String returnTotalAmt = request.getParameter("returnTotalAmt" + i);
				cust.setReturnTotal(Double.parseDouble(returnTotalAmt));//-Double.parseDouble(discount));
	
				String grossamt = request.getParameter("grossamt" + i);
				if (grossamt == null) {
					cust.setGrossamt(Double.parseDouble("0.00"));
				} else {
					cust.setGrossamt(Double.parseDouble(grossamt));
				}
	
				String Date = request.getParameter("Date" + i);
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	
				Date adate = null;
				try
				{
					adate = format.parse(Date);
				} catch (ParseException e1)
				{
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				cust.setCurrent_date(adate);
	
				//DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
				try
				{
					//DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
					Date dateobj = new Date();
					System.out.println(format.format(dateobj));
					String newDate = format.format(dateobj);
					Date today = format.parse(newDate);
					System.out.println(today);
					cust.setDate(today);
				}
				catch(Exception e)
				{
					System.out.println(e);
				}
	
				billNo = request.getParameter("billNo");
				cust.setBillNo(Long.parseLong(billNo));
	
				String creditCustomer1 = request.getParameter("creditCustomer1");
				cust.setCustomerName(creditCustomer1);
	
				cust.setType("Credit Customer");
				
				String fkCreditCustId = request.getParameter("fkCreditCustId"+i);
				System.out.println("fkCreditCustId ====> "+fkCreditCustId);
				if(fkCreditCustId == null || fkCreditCustId.equalsIgnoreCase(""))
				{
					cust.setFkCreditCustId(0l);
				}
				else
				{
					cust.setFkCreditCustId(Long.parseLong(fkCreditCustId));
				}
				
				transactionIdSr = Long.parseLong(request.getParameter("transactionIdSr"));
				cust.setTransactionId(transactionIdSr);
				
				Double gst = Double.parseDouble(request.getParameter("gst"+i));
				cust.setGst(gst);
				
				Double iGst = Double.parseDouble(request.getParameter("iGst"+i));
				cust.setiGst(iGst);
				
				Double taxAmount = Double.parseDouble(request.getParameter("taxAmt"+i));
				cust.setTaxAmount(taxAmount);	
				
				long productId = Long.parseLong(request.getParameter("productId"+i));
				cust.setProductId(productId);;
				
				long catId = Long.parseLong(request.getParameter("catId"+i));
				cust.setCatId(catId);;
				
				long subCatId = Long.parseLong(request.getParameter("subCatId"+i));
				cust.setSubCatId(subCatId);
				
				cust.setUserType(type2);
				cust.setFkUserId(uid);				
				
				cust.setRedeemedForBillNo(0l);
	
				SaleReturnDao dao = new SaleReturnDao();
				dao.registerSaleReturn(cust);
	
				// update sellbill quantity minus
				Long pkBillId = Long.parseLong(request.getParameter("pkBillId" + i));
				Double pending_bill_payment = Double.parseDouble(request.getParameter("totalAmount"));
				System.out.println(pending_bill_payment);
				
				SaleReturnDao good = new SaleReturnDao();
				good.updateQuantity1(pkBillId, editQuantity, totalAmt, pending_bill_payment);
			
				// update Barcodewise quantity in good receive plus
				Long barcodeNo1 = Long.parseLong(request.getParameter("barcodeNo" + i));
				SaleReturnDao good1 = new SaleReturnDao();
				good1.updateBarcodeQuantity(barcodeNo1, editQuantity);
	
				Double totalPendingBal = 0.0;				
				
				List <Object[]> billPendingList = good1.gettPendingBalance(fkCreditCustId);
				for (Object[] object : billPendingList)
				{
					if(object[1] == null)
					{
						totalPendingBal = 0.0;
					}
					else
					{				
						System.out.println("ln 220 LAST BILL PENDING ==============> "+object[1].toString());
						totalPendingBal = Double.parseDouble(object[1].toString());
						System.out.println("ln 222 LAST BILL PENDING ==============> "+object[1].toString());
					}
				}
				
				//Double totalBillpending = (Double.parseDouble(Total) + totalPendingBal);
				System.out.println("returnTotalAmt ==============> "+returnTotalAmt);				
				System.out.println("lastPendingBal ==============> "+totalPendingBal);
				
				Double newPendingBill = 0.0;
				
				if(totalPendingBal > 0)
				{
					newPendingBill = (totalPendingBal - (Double.parseDouble(returnTotalAmt)));
				}
				else
				{
					newPendingBill = totalPendingBal;
				}

				System.out.println("newPendingBill ==============> "+newPendingBill);
				good1.settPendingBalance(newPendingBill, fkCreditCustId);
				
				StockDao dao1 = new StockDao();
				List stkList2 = dao1.getAllStockEntry();
	
				for (int j = 0; j < stkList2.size(); j++)
				{	
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					long fkProductId = st.getFkProductId();
					long fkCatId = st.getFkCategoryId();					
	
					/* If ItemName Is Already Exists In Stock Table */
					//if (ItemId.equals(itemName) && cat.equals(categoryName))
					if (fkProductId == productId && fkCatId == catId)
					{
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
	
						Double updatequnty = (Double) (qunty + Double.parseDouble(editQuantity));
	
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
	
						Date date = new Date();
	
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);
	
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
				System.out.println("COUNT OF GRID ==== "+count);
				
				System.out.println("C CUST PAYMENT CALL");
				Double returnTotalAmount = Double.parseDouble(request.getParameter("returnTotalAmount"));
				System.out.println("returnTotalAmount =========> "+returnTotalAmount);
				Double totalBillAmount = good1.gettTotalBillAmount(fkCreditCustId);
				Double lastPendingBalNEW = 0.0;				
				
				List <Object[]> billPendingList2 = good1.gettPendingBalance(fkCreditCustId);
				for (Object[] object : billPendingList2)
				{
					if(object[1] == null)
					{
						lastPendingBalNEW = 0.0;
					}
					else
					{				
						System.out.println("ln 220 LAST BILL PENDING ==============> "+object[1].toString());
						lastPendingBalNEW = Double.parseDouble(object[1].toString());
						System.out.println("ln 222 LAST BILL PENDING ==============> "+object[1].toString());
					}
				}				
								
				//Double totalPendingBill = (lastPendingBalNEW - (Double.parseDouble(returnTotalAmt) - Double.parseDouble(discount)));
				//good1.regCreditCustomerReturnPayment(totalBillAmount, totalPendingBill, returnTotalAmount, fkCreditCustId);
				good1.regCreditCustomerReturnPayment(totalBillAmount, lastPendingBalNEW, returnTotalAmount, fkCreditCustId, discount, reasonForSReturn3);
				System.out.println("C CUST PAYMENT ADDED");
				
			}
		}
		
		HttpSession sessionHttp = request.getSession();
		sessionHttp.setAttribute("transactionIdSr", transactionIdSr);
	}
	
	// pdf copy of other bill
		public void saleReturnCreditNoteHelper(HttpServletRequest request, HttpServletResponse response)
		{
			// TODO Auto-generated method stub
			String sRTransactionId = request.getParameter("sRTransactionId");
			System.out.println("----------------sRTransactionId before session create::" + sRTransactionId);
			HttpSession session3 = request.getSession();
			Long transactionIdSr = Long.parseLong(sRTransactionId);
			session3.setAttribute("transactionIdSr", transactionIdSr);
		}
		
		public SaleReturn getSRTrasanctionData(HttpServletRequest request, HttpServletResponse response) {
			// TODO Auto-generated method stub
			String srTransactionId = request.getParameter("srTransactionId");
			String fkRootCustId = request.getParameter("fkRootCustId");

			System.out.println(srTransactionId+" srTransactionId");
			Map<Long, SaleReturn> map = new HashMap<Long, SaleReturn>();

			SaleReturnDao dao = new SaleReturnDao();
			List<SaleReturn> trasactionIdList = dao.getAllTransactionDetails(srTransactionId, fkRootCustId);

			System.out.println("TRANSACTION LIST SIZE "+trasactionIdList.size());
			
			SaleReturn cs = null;
			if (trasactionIdList != null && trasactionIdList.size() > 0)
			{
				cs = trasactionIdList.get(0);
				System.out.println("pk id ===> "+cs.getPkBillId());
				System.out.println("transaction id ===> "+cs.getTransactionId());
				System.out.println("total return amt id ===> "+cs.getReturnTotal());
			}
			
			return cs;
		}

		
		
}
