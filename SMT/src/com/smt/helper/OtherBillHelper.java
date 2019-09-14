package com.smt.helper;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

import com.itextpdf.text.log.SysoLogger;
import com.smt.bean.BillBean;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleReport;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.SaleReturnDao;
import com.smt.dao.StockDao;
import com.smt.dao.SupplierDetailDao;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.SaleReturn;
import com.smt.hibernate.Stock;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class OtherBillHelper
{
	DecimalFormat df = new DecimalFormat("#.##");

	Long BillNo = 1l;

	public void registerOtherBill(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		HttpSession session3 = request.getSession();
		
		/*this session is handel for get user type and id*/
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
		
		OtherBillDao data = new OtherBillDao();
		List stkList = data.getLastBillNo();

		for (int i = 0; i < stkList.size(); i++)
		{
			BillBean st = (BillBean) stkList.get(i);
			BillNo = st.getBillNo();

			BillNo++;
		}

		OtherBill cust = new OtherBill();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);

		for (int i = 0; i < count; i++)
		{
			/*BillNo = Long.parseLong(request.getParameter("billNo"));
			System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);*/
			
			String itemName = request.getParameter("itemName" + i);
			cust.setItemName(itemName);

			String categoryName = request.getParameter("categoryName" + i);
			cust.setCategoryName(categoryName);

			String quantity = request.getParameter("quantity" + i);
			System.out.println("SAGAR ====> quantity" + quantity);
			cust.setQuantity(Double.parseDouble(quantity));			

			String salePrice = request.getParameter("salePrice" + i);
			System.out.println("Sale Price is" + salePrice);

			String barcodeNo = request.getParameter("barcodeNo" + i);
			System.out.println("unitinMl" + barcodeNo);
			cust.setBarcodeNo(Long.parseLong(barcodeNo));

			String hsnSacNo = request.getParameter("hsnSacNo" + i);
			cust.setHsnSacNo(hsnSacNo);

			String vat = request.getParameter("vat" + i);
			String igst = request.getParameter("igst" + i);
			
			String size1 = request.getParameter("size1"+i);
			cust.setSize(size1);
			
			String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
			System.out.println("SALE PRICE WITHOUT WITHOUT TAX ======> "+sPWithoutTax);
			cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));

			System.out.println("VAT ================> "+vat);
			double gstAmt = 0.0;
			if (vat.equalsIgnoreCase("0"))
			{
				cust.setVat(Double.parseDouble(vat));
			} else {
				cust.setVat(Double.parseDouble(vat));
				gstAmt = (Double.parseDouble(salePrice)-Double.parseDouble(sPWithoutTax));
				System.out.println("gstAmt =========> "+gstAmt);
			}
			
			cust.setIgst(0d);
			cust.setTaxAmount(gstAmt);
			//cust.setTaxAmount(Double.parseDouble(taxAmount));
			
			String saleEmpName = request.getParameter("saleEmpName"+i);
			System.out.println("hi this is Sagar in other bill helper"+saleEmpName);			
			if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
			{				
				cust.setEmployeeName("NA");				
			}
			else
			{
				cust.setEmployeeName(saleEmpName);
			}
			
			String saleEmpId = request.getParameter("saleEmpId"+i);
			System.out.println("hi this is Sagar in other bill helper"+saleEmpId);
			if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
			{
				cust.setFkSaleEmployeeId(0l);				
			}
			else
			{
				cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
			}

			String rollSize = request.getParameter("rollSize"+i);
			System.out.println("roll size in other bill helper@@@###$$$    ----"+rollSize);
			
			String sQTY = request.getParameter("goodReceiveQuantity"+i);
			System.out.println("there is stock Quantity #### %%% &&&"+sQTY);
			
			String totalAmount = request.getParameter("totalAmount");
			cust.setTotalAmt(Double.parseDouble(totalAmount));

			String perProductdisPer = request.getParameter("perProductdisPer"+i);
			System.out.println("perProductdisPer =============> "+perProductdisPer);
			if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
			{
				cust.setPerProductdisPer(0.0);
			}
			else
			{
				cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
			}
			
			String discountPerProduct = request.getParameter("perProductdisAmount"+i);
			System.out.println("discountPerProduct =============> "+discountPerProduct);
			if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
			{
				cust.setDiscount(0.0);				
			}
			else
			{
				cust.setDiscount(Double.parseDouble(discountPerProduct));
			}
			
			String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
			System.out.println("taxAmountAfterDis =============> "+taxAmountAfterDis);
			if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
			{
				cust.setTaxAmtAfterDiscount(0.0);
			}
			else
			{
				cust.setTaxAmtAfterDiscount(Double.parseDouble(taxAmountAfterDis));
			}
			
			String creditCustomer1 = request.getParameter("creditCustomer1");
			String mobileNo = request.getParameter("mobileNo");

			String paymentMode = request.getParameter("paymentMode");

			String chequeNum = request.getParameter("chequeNum");

			String cardNum = request.getParameter("cardNum");

			String accNum = request.getParameter("accNum");

			String nameOnCheck = request.getParameter("nameOnCheck");

			String bankName = request.getParameter("bankName");
			
			String grossTotal = request.getParameter("grossTotal");
			
			cust.setGrossamt(Double.parseDouble(grossTotal));
			
			String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");

			String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
			
			String totalCreditAmt = request.getParameter("totalCreditAmt");
			if(totalCreditAmt == null || totalCreditAmt.isEmpty())
			{
				totalCreditAmt = "0";
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			}
			else
			{
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			}

			cust.setCarNo("NA");
			cust.setContactNo(000l);
			cust.setOwnerName("NA");
			cust.setCreditCustomer1(creditCustomer1);
			cust.setSalePrice(Double.parseDouble(salePrice));

			if (!"".equals(mobileNo)) {

				cust.setMobileNo(Long.parseLong(mobileNo));
			} else {

				cust.setMobileNo(Long.parseLong("00"));
			}

			// payment details
			if (paymentMode == null) {
				cust.setPaymentMode("N/A");
			} else {
				cust.setPaymentMode(paymentMode);
			}		
		
			if (paymentMode.equals("cheque")) {

				if (chequeNum == null) {
					cust.setChequeNum("N/A");
				} else {
					cust.setChequeNum(chequeNum);
				}

				if (nameOnCheck == null) {
					cust.setNameOnCheck("N/A");
				} else {
					cust.setNameOnCheck(nameOnCheck);
				}
			} else if (paymentMode.equals("card"))
			{
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cardAmount = request.getParameter("cardAmount");
					cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
				}
				else
				{
					cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cashAmount(0.0);
				
				int cardNumLength = cardNum.length();
				if (cardNumLength > 0) {

					cust.setCardNum(Long.parseLong(cardNum));
				} else {
					cust.setCardNum(null);
				}
			}
			else if (paymentMode.equals("neft")) {
				if (bankName == null) {
					cust.setBankName("N/A");
				} else {
					cust.setBankName(bankName);
				}

				int accNumLength = accNum.length();
				if (accNumLength > 0) {
					cust.setAccNum(Long.parseLong(accNum));

				} else {
					cust.setAccNum(null);
				}
			}
			else if (paymentMode.equals("cash"))
			{				
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cashAmount = request.getParameter("cashAmount");
					cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
				}
				else
				{
					cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cardAmount(0.0);
			}			
			
			if (paymentMode.equals("cashAndCard"))
			{
				if(cashCard_cashAmount.equals("") || cashCard_cashAmount.isEmpty() || cashCard_cashAmount == null)
				{
					cust.setCashCard_cashAmount(0.0);
				}
				else
				{
					cust.setCashCard_cashAmount(Double.parseDouble(cashCard_cashAmount));
				}
				
				if(cashCard_cardAmount.equals("") || cashCard_cardAmount.isEmpty() || cashCard_cardAmount == null)
				{
					cust.setCashCard_cardAmount(0.0);
				}
				else
				{
					cust.setCashCard_cardAmount(Double.parseDouble(cashCard_cardAmount));
				}
			}
			
			String total = request.getParameter("total" + i);
			cust.setTotalperItem(Double.parseDouble(total));
			
			//this two value save user id and userType
			cust.setEmpType(type2);
			System.out.println("type2 ====> "+type2);
			cust.setEmpIdFK(uid);
			System.out.println("uid ====>  "+uid);

			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(dateobj);
			cust.setCurrent_date(dateobj);
			
			//get bill no auto increment
			session3.setAttribute("BillNo", BillNo);
			session3.setAttribute("customerName", creditCustomer1);
			if (BillNo == null) {
				cust.setBillNo(1l);
			} else {
				System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
				cust.setBillNo(BillNo);
			}
			
			String fkProductId = request.getParameter("fkProductId" + i);
			cust.setFkProductId(Long.parseLong(fkProductId));
			
			String fkSubCatId = request.getParameter("fkSubCatId" + i);
			cust.setFkSubCatId(Long.parseLong(fkSubCatId));
			
			String fkCatId = request.getParameter("fkCategoryId" + i);
			cust.setFkCatId(Long.parseLong(fkCatId));

			Date now = new Date();
			cust.setBillTime(now);
			
			String style = request.getParameter("style"+i);
			cust.setStyle(style);
			
			OtherBillDao dao = new OtherBillDao();
			dao.registerBill(cust);
			
			Long item_id = Long.parseLong(request.getParameter("item_id" + i));
			System.out.println("item_id" + item_id);
			GoodReciveDao good = new GoodReciveDao();
			good.updateQuantity(item_id, quantity, rollSize, sQTY, size1);

			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();

			Double updatequnty = 0.0;		
			
			for (int j = 0; j < stkList2.size(); j++)
			{
				Stock st = (Stock) stkList2.get(j);
				String ItemId = st.getItemName();
				String cat = st.getCatName();
				Long productId = st.getFkProductId();
				Long categoryId = st.getFkCategoryId();

				/* If ItemName Is Already Exists In Stock Table */
				//if (ItemId.equals(itemName) && cat.equals(categoryName))
				if (productId == Long.parseLong(fkProductId) && categoryId == Long.parseLong(fkCatId))
				{
					Long PkItemId = st.getPkStockId();
					Double qunty = st.getQuantity();
					
					double QTY = 0.0;
					if(!rollSize.equals("0"))
					{	
						List<Double> list = null;
						Double totalQty = 0.0;
						HibernateUtility hbuSu = HibernateUtility.getInstance();
						Session sessionSu = hbuSu.getHibernateSession();
						Transaction transactionSu = sessionSu.beginTransaction();
						org.hibernate.Query querySu = sessionSu.createSQLQuery("select SUM(gr.Quantity) from goodreceive gr where gr.fkProductId =:fkProductId AND gr.fkCatId=:fkCatId");
						querySu.setParameter("fkProductId", fkProductId);
						querySu.setParameter("fkCatId", fkCatId);
						list = querySu.list();
						updatequnty = list.get(0).doubleValue();
						System.out.println("GOOD RECEIVE QUANTITY ============> "+updatequnty);
					}
					else
					{
						updatequnty = (Double) (qunty - Double.parseDouble(quantity));
					}

					HibernateUtility hbu = HibernateUtility.getInstance();
					Session session = hbu.getHibernateSession();
					Transaction transaction = session.beginTransaction();

					Date date = new Date();

					Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
					updateStock.setQuantity(updatequnty);
					updateStock.setUpdateDate(date);
					session.saveOrUpdate(updateStock);
					transaction.commit();
				}
			}
		}
		Integer count1 = Integer.parseInt(request.getParameter("count1"));
		if(count1 > 0)
		{
			System.out.println("c22222 ====> " + count1);
			HibernateUtility hbu2 = null;
			Session session2 = null;
			Transaction transaction2 = null;
	
			try
			{
				hbu2 = HibernateUtility.getInstance();
				session2 = hbu2.getHibernateSession();
				transaction2 = session2.beginTransaction();		
				for(int j=0; j<count1; j++)
				{				
					String transactionId = request.getParameter("transactionId"+j);
					Query query = session2.createSQLQuery("UPDATE salereturn set redeemedForBillNo = "+BillNo+" WHERE transactionId = "+transactionId);
					query.executeUpdate();
					transaction2.commit();
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		else
		{}
	}

	// pdf copy of other bill
	public void OtherBillCOPY(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String billNo = request.getParameter("billNo");
		System.out.println("----------------Bill No before session create::" + billNo);
		HttpSession session3 = request.getSession();
		Long billNo2 = Long.parseLong(billNo);
		session3.setAttribute("billNo2", billNo2);
	}

	// get single date Miscellaneos customer Sale
	public List miscellaneousSingleDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+fDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");		    

		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.miscellaneousSingleDate(fDate);

		return exp1List;
	}
	
	//get singal date sale return report
	public List CSRSingleDate(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+fDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.CSRSingleDate(fDate);

		return exp1List;
	}
	

	// get Two date Miscellaneos customer Sale
	public List miscellaneousTwoDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		String eDate = request.getParameter("eDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		String adate = null;
		String bdate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(eDate);
			
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		    // adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			adate = formatter.format(date); ;
			bdate = formatter.format(date1); ;
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.miscellaneousTwoDate(fDate, eDate);

		return exp1List;
	}
	
	// get Two date Credit customer Sale Return
		public List CCSRTwoDate(HttpServletRequest request, HttpServletResponse response)
		{
			// TODO Auto-generated method stub
			String fDate = request.getParameter("fDate");
			String eDate = request.getParameter("eDate");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

			String adate = null;
			String bdate = null;
			try {
				
				Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
				Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(eDate);
				
			    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			    // adate = formatter.format(date);  
			    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
				
				adate = formatter.format(date); ;
				bdate = formatter.format(date1); ;
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			OtherBillDao dao = new OtherBillDao();
			List<SaleReport> exp1List = dao.CCSRTwoDate(fDate, eDate);

			return exp1List;
		}

	// get category wise Miscellaneos customer Sale
	public List miscellaneousSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String mscatId = request.getParameter("mscatId");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.miscellaneousSaleWiseCustomer(mscatId);

		return exp1List;
	}
	// get category wise Credit customer Sale return
	public List CCSRSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String mscatId = request.getParameter("mscatId");
		System.out.println("hi vikas your in helper");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.CCSRSaleWiseCustomer(mscatId);

		return exp1List;
	}

	// get Bill no wise Miscellaneos customer Sale
	public List billnowiseMiscellaneoussell(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long msBillNocust = Long.parseLong(request.getParameter("msBillNocust"));

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.billnowiseMiscellaneoussell(msBillNocust);

		return exp1List;
	}
	
	// get Bill no wise Credit customer Sale Return Report
		public List billnowiseCCSR(HttpServletRequest request, HttpServletResponse response) {
			// TODO Auto-generated method stub
			long msBillNocust = Long.parseLong(request.getParameter("msBillNocust"));

			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			OtherBillDao dao = new OtherBillDao();
			List<SaleReport> exp1List = dao.billnowiseCCSR(msBillNocust);

			return exp1List;
		}

	// Barcode No Wise Miscellaneos Sale Report
	public List barcodenowiseMiscellaneoussell(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long barcodeMiscellaneous = Long.parseLong(request.getParameter("barcodeMiscellaneous"));

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.barcodenowiseMiscellaneoussell(barcodeMiscellaneous);

		return exp1List;
	}
	
	// Barcode No Wise Credit Customer Sale Return Report
		public List barcodenowiseCCSR(HttpServletRequest request, HttpServletResponse response) {
			// TODO Auto-generated method stub
			long barcodeMiscellaneous = Long.parseLong(request.getParameter("barcodeMiscellaneous"));

			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			OtherBillDao dao = new OtherBillDao();
			List<SaleReport> exp1List = dao.barcodenowiseCCSR(barcodeMiscellaneous);

			return exp1List;
		}
	
	// EmpName For Grid
	public List getEmployee()
	{
		System.out.println("grid emp in helper");
		OtherBillDao dao = new OtherBillDao();
		return dao.getEmployeeNameforGrid();

	}
	
	public List purchaseReturnSingleDateHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pRDate = request.getParameter("pRDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+pRDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(pRDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReturnSingleDateDao(pRDate);

		return exp1List;
	}
	
	public List purchaseReturnRangeWiseHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pRFisDate = request.getParameter("pRFisDate");
		String pREndDate = request.getParameter("pREndDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+pRFisDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(pRFisDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReturnRangeWiseDao(pRFisDate, pREndDate);

		return exp1List;
	}
	
	public List purchaseReturnBillNoWiseHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pRBillNo = request.getParameter("pRBillNo");
		String supplierpR = request.getParameter("supplierpR");
		String suppId = request.getParameter("suppId");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+pRBillNo);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");		
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReturnBillNoWiseDao(pRBillNo, supplierpR, suppId);

		return exp1List;
	}
	
	public void editBillTaxInvoiceHelper(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("BILL EDIT HELPER");
		
		OtherBillDao obd = new OtherBillDao();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		Double saleReturnCAmt = 0.0;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			for (int i = 0; i < count; i++)
			{	
				String pkBillId = request.getParameter("pkBillId" + i);
				OtherBill cust = (OtherBill) session.get(OtherBill.class, Long.parseLong(pkBillId));
				
				String fkSaleEmployeeId = request.getParameter("saleEmpId" + i);
				cust.setFkSaleEmployeeId(Long.parseLong(fkSaleEmployeeId));
	
				String employeeName = request.getParameter("saleEmpName" + i);
				cust.setEmployeeName(employeeName);			
				
				String creditCustomer1 = request.getParameter("creditCustomer1");
				cust.setCreditCustomer1(creditCustomer1);
				
				String finalCreditAmount = request.getParameter("finalCreditAmount");
				if(finalCreditAmount.equalsIgnoreCase("0") || finalCreditAmount.isEmpty() || finalCreditAmount.equalsIgnoreCase("") || finalCreditAmount == null)
				{}else
				{
					saleReturnCAmt = Double.parseDouble(finalCreditAmount);
				}
				
				String mobileNo = request.getParameter("mobileNo");
				if(mobileNo.isEmpty() || mobileNo.equalsIgnoreCase("") || mobileNo == null)
				{
					cust.setMobileNo(0l);
				}
				else
				{
					cust.setMobileNo(Long.parseLong(mobileNo));
				}
				
				String paymentMode = request.getParameter("paymentMode");
				cust.setPaymentMode(paymentMode);
				
				String totalAmount = request.getParameter("totalAmount");
				if(paymentMode.equals("cash"))
				{	
					cust.setCashCard_cashAmount(Double.parseDouble(totalAmount) - saleReturnCAmt);
					cust.setCashCard_cardAmount(0.0);
				}
				else if(paymentMode.equals("card"))
				{
					cust.setCashCard_cardAmount(Double.parseDouble(totalAmount) - saleReturnCAmt);
					cust.setCashCard_cashAmount(0.0);
				}
				else if(paymentMode.equals("cashAndCard"))
				{
					String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
					String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
					cust.setCashCard_cashAmount(Double.parseDouble(cashCard_cashAmount));
					cust.setCashCard_cardAmount(Double.parseDouble(cashCard_cardAmount));					
				}
				
				obd.updateBill(cust);
			}
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
	}

}
