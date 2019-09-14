package com.smt.helper;

import java.text.DateFormat;
import java.text.DecimalFormat;
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

import com.itextpdf.text.log.SysoLogger;
import com.smt.bean.BillBean;
import com.smt.bean.CustomerBean;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.GstReportBean;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleReport;
import com.smt.bean.SaleReports;
import com.smt.bean.SaleReturnBean;
import com.smt.bean.currentStock;
import com.smt.bean.gstReturnbean;
import com.smt.dao.CarEntryDao;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.StockDao;
import com.smt.hibernate.BillEdit;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.Stock;
import com.smt.utility.HibernateUtility;

public class CustomerOrderHelper {

	// get Data On CustomerBill Using Barcode No

	public CustomerBean getDetailsById(HttpServletRequest request, HttpServletResponse response) {

		String key = request.getParameter("key");
		String carNo = request.getParameter("carNo");
		System.out.println(key + "barcode");
		Map<Long, CustomerBean> map = new HashMap<Long, CustomerBean>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<CustomerBean> catList = dao.getAllItemDetails(key, carNo);

		CustomerBean cs = null;
		if (catList != null && catList.size() > 0) {
			cs = (CustomerBean) catList.get(0);
		}
		return cs;
	}

	public List getSaleDetailsBYDate(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReports> saleList = dao.getSaleDetailsDateWise(fDate, tDate);

		return saleList;
	}

	public List getSaleDetailsBYYear(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReports> saleList = dao.getSaleDetailsYearly(fDate, tDate);

		return saleList;
	}

	public List getSaleDetailsBYSingalDate(HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fDate");
		System.out.println(fDate + "vxvdfvdf");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReports> saleList = dao.getSaleDetailsBySingalDateWise(fDate);

		return saleList;
	}

	public List getItemsBYSaleBILL(HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("customerBill");
		System.out.println(billNo + "vxvdfvdf");

		Map<Long, SaleReports> map = new HashMap<Long, SaleReports>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReports> saleList = dao.getSaleDetailsByBillNO(billNo);

		return saleList;
	}

	Long BillNo = 1l;

	// car register Bill
	public void registerBill(HttpServletRequest request, HttpServletResponse response) {

		HttpSession session3 = request.getSession();
		CustomerOrderDao data = new CustomerOrderDao();
		List stkList = data.getLastBillNo();

		for (int i = 0; i < stkList.size(); i++) {

			BillBean st = (BillBean) stkList.get(i);
			BillNo = st.getBillNo();

			BillNo++;

		}

		com.smt.hibernate.CustomerBill cust = new com.smt.hibernate.CustomerBill();

		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);

		for (int i = 0; i < count; i++) {

			String itemName = request.getParameter("itemName" + i);
			cust.setItemName(itemName);

			String categoryName = request.getParameter("categoryName" + i);
			cust.setCategoryName(categoryName);

			String quantity = request.getParameter("quantity" + i);
			System.out.println("quantity" + quantity);
			cust.setQuantity(Long.parseLong(quantity));

			String salePrice = request.getParameter("salePrice" + i);

			String barcodeNo = request.getParameter("barcodeNo" + i);
			System.out.println("unitinMl" + barcodeNo);
			cust.setBarcodeNo(Long.parseLong(barcodeNo));

			String hsnSacNo = request.getParameter("hsnSacNo" + i);
			cust.setHsnSacNo(hsnSacNo);

			String vat = request.getParameter("vat" + i);
			String igst = request.getParameter("igst" + i);
			
			String size1 = request.getParameter("size1" + i);

			if (vat.equals("0")) {
				cust.setVat(Double.parseDouble(igst));
				double igstAmt = Double.parseDouble(salePrice) - (Double.parseDouble(salePrice) * (100 / (100 + Double.parseDouble(igst))));
				double netPrice = Double.parseDouble(salePrice) - igstAmt;
				cust.setSalePrice(netPrice);

			} else {
				cust.setVat(Double.parseDouble(vat));
				double gstAmt = Double.parseDouble(salePrice) - (Double.parseDouble(salePrice) * (100 / (100 + Double.parseDouble(vat))));
				double netPrice = Double.parseDouble(salePrice) - gstAmt;
				cust.setSalePrice(netPrice);
			}
			cust.setIgst(0d);

			String taxAmount = request.getParameter("taxAmount" + i);
			cust.setTaxAmount(Double.parseDouble(taxAmount));

			String contactNo = request.getParameter("contactNo");
			cust.setContactNo(Long.parseLong(contactNo));

			String ownerName = request.getParameter("ownerName");
			cust.setOwnerName(ownerName);

			String carNo = request.getParameter("carNo");
			cust.setCarNo(carNo);

			String totalAmount = request.getParameter("totalAmount");
			cust.setTotalAmt(Double.parseDouble(totalAmount));

			String discount = request.getParameter("discount");
			double disAmt = Double.parseDouble(discount) / count;
			cust.setDiscount(disAmt);

			String laberCharges = request.getParameter("laberCharges");
			double laber = Double.parseDouble(laberCharges) / count;
			cust.setLaberCharges(laber);

			String total = request.getParameter("total" + i);
			cust.setTotalperItem(Double.parseDouble(total));
			
			String rollSize = request.getParameter("rollSize"+i);
			System.out.println("roll size in other bill helper@@@###$$$    ----"+rollSize);
			
			String sQTY = request.getParameter("goodReceiveQuantity"+i);
			System.out.println("there is stock Quantity #### %%% &&&"+sQTY);

			String grossTotal = request.getParameter("grossTotal");
			cust.setGrossamt(Double.parseDouble(grossTotal));

			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(dateobj);
			cust.setCurrent_date(dateobj);

			session3.setAttribute("BillNo", BillNo);

			if (BillNo == null) {
				cust.setBillNo(1l);
			} else {
				cust.setBillNo(BillNo);
			}

			CustomerOrderDao dao = new CustomerOrderDao();
			dao.registerBill(cust);

			Long pk_temp_id = Long.parseLong(request.getParameter("pk_temp_id" + i));
			System.out.println("pk_temp_id" + pk_temp_id);
			dao.updateTabaleStatus(pk_temp_id);

			Long item_id = Long.parseLong(request.getParameter("item_id" + i));
			System.out.println("item_id" + item_id);
			GoodReciveDao good = new GoodReciveDao();
			good.updateQuantity(item_id, quantity,rollSize,sQTY,size1);

			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();

			for (int j = 0; j < stkList2.size(); j++) {

				Stock st = (Stock) stkList2.get(j);
				String ItemId = st.getItemName();
				String cat = st.getCatName();

				/* If ItemName Is Already Exists In Stock Table */
				if (ItemId.equals(itemName) && cat.equals(categoryName)) {
					Long PkItemId = st.getPkStockId();
					Double qunty = st.getQuantity();

					Double updatequnty = (Double) (qunty - Double.parseDouble(quantity));

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
		}

		// Session for PDF

		HttpSession billNoInSession = request.getSession();
		billNoInSession.setAttribute("carBillNO", BillNo);

		System.out.println("#######################  " + billNoInSession.getAttribute("carBillNO"));

		Long carID = Long.parseLong(request.getParameter("carID"));
		CarEntryDao acrive = new CarEntryDao();
		acrive.updateCarStatus(carID);
	}

	// get current Stock

	public List getAllCurrentStock(HttpServletRequest request, HttpServletResponse response) {
		/*Map<Long, Stock> map = new HashMap<Long, Stock>();*/
		Map<Long, currentStock> map = new HashMap<Long, currentStock>();
		StockDao dao = new StockDao();
		List<currentStock> exp1List = dao.getAllCurrentStock();

		return exp1List;
	}

	public List getAllStock(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("HELPER CALLED ========== ");
		Map<Long, GoodReceiveItemBean> map = new HashMap<Long, GoodReceiveItemBean>();

		StockDao dao = new StockDao();
		List<GoodReceiveItemBean> exp1List = dao.getAllStock();

		return exp1List;
	}
	
	// category Wise Stock
	public List getCategoryWiseStock(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catId = request.getParameter("catId");
		Map<Long, Stock> map = new HashMap<Long, Stock>();
		StockDao dao = new StockDao();
		List<Stock> exp1List = dao.getCategoryWiseStock(catId);

		return exp1List;

	}

	// Barcode Wise Stock
	/*public List getBarcodeWiseStock(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub

		Long barcodeNo = Long.parseLong(request.getParameter("barcodeNo"));
		System.out.println("barcode : " + barcodeNo);
		Map<Long, GoodReceive> map = new HashMap<Long, GoodReceive>();

		GoodReciveDao dao = new GoodReciveDao();
		List<GoodReceive> exp1List = dao.getCategoryWiseStock(barcodeNo);
		//List<GoodReceive> exp1List = dao.getCategoryWiseStock(barcodeNo);

		return exp1List;
	}*/
	
	public List stockbarcodeWiseHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub

		Long barcodeNo = Long.parseLong(request.getParameter("barcodeNo"));
		String userType = request.getParameter("userType");
		String userName = request.getParameter("userName");
		
		System.out.println("barcode : " + barcodeNo);
		Map<Long, GoodReceive> map = new HashMap<Long, GoodReceive>();

		GoodReciveDao dao = new GoodReciveDao();
		List<GoodReceive> exp1List = dao.stockbarcodeWiseDao(barcodeNo, userType, userName);
		//List<GoodReceive> exp1List = dao.getCategoryWiseStock(barcodeNo);

		return exp1List;
	}

	// get supplierwise stock between two selected date
	public List getSupWiseStockBetTwoDays(HttpServletRequest request, HttpServletResponse response)
	{
		Long suppId = Long.parseLong(request.getParameter("suppId"));
		String fDate = request.getParameter("fDate");
		String eDate = request.getParameter("eDate");
		System.out.println("++++++++++++++++++++++ Suppp Id : " + suppId);
		System.out.println("++++++++++++++++++++++ Start Date : " + fDate);
		System.out.println("++++++++++++++++++++++ End Date : " + eDate);
		Map<Long, GoodReceive> map = new HashMap<Long, GoodReceive>();

		GoodReciveDao dao = new GoodReciveDao();
		List<GoodReceive> exp1List = dao.getSuppWiseStockBetTwoDate(suppId, fDate, eDate);

		return exp1List;
	}

	// bill no wise stock
	public List getBillNoWiseStock(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String Billno = (request.getParameter("Billno"));
		System.out.println("barcode : " + Billno);
		Map<Long, GoodReceive> map = new HashMap<Long, GoodReceive>();

		GoodReciveDao dao = new GoodReciveDao();
		List<GoodReceive> exp1List = dao.getBillNoWiseStock(Billno);

		return exp1List;
	}

	// category Wise Stock
	public List getCategoryWiseItemnameStock(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catId = request.getParameter("catId");
		String itemId = request.getParameter("itemId");
		Map<Long, Stock> map = new HashMap<Long, Stock>();

		StockDao dao = new StockDao();
		List<Stock> exp1List = dao.getCategoryWiseItemnameStock(catId, itemId);

		return exp1List;

	}

	// Most Selling Item
	public List getMostSellingProduct(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catId = request.getParameter("catId");
		/* String itemName = request.getParameter("itemName"); */
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		StockDao dao = new StockDao();
		List<SaleReport> exp1List = dao.getMostSellingProduct(catId);

		return exp1List;

	}

	// single date purchase
	public List singleDatePurchase(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		try {
			adate = format.parse(fDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, PurchaseReportBean> map = new HashMap<Long, PurchaseReportBean>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReportBean> exp1List = dao.singleDatePurchase(adate);

		return exp1List;
	}

	// two dates purchase
	public List purchaseReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, PurchaseReportBean> map = new HashMap<Long, PurchaseReportBean>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReportBetweenTwoDates(adate, bdate);

		return exp1List;
	}

	// two dates purchase
	public List creditNoteReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		String fkSupplierId = request.getParameter("fkSupplierId");
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, PurchaseReportBean> map = new HashMap<Long, PurchaseReportBean>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReportBean> exp1List = dao.creditNoteReportBetweenTwoDates(fkSupplierId, adate, bdate);

		return exp1List;
	}

	// two dates purchase
	public List debitNoteReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		String fkSupplierId = request.getParameter("fkSupplierId");
		String paymentMode = request.getParameter("paymentMode");

		Map<Long, PurchaseReportBean> map = new HashMap<Long, PurchaseReportBean>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReportBean> exp1List = dao.debitNoteReportBetweenTwoDates(fkSupplierId, paymentMode);

		return exp1List;
	}

	// two dates purchase
		public List debitNoteReportBetweenTwoDates1(HttpServletRequest request, HttpServletResponse response) {
			
			SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
			
			String fisDate = request.getParameter("fisDate");
			String endDate = request.getParameter("endDate");
			
			System.out.println("In Helper fisDate " + fisDate);
			System.out.println("In Helper endDate " + endDate);
			
			String start_dt = fisDate;
			String end_dt = endDate;
			Date date = null;
			Date date1 = null;
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-DD"); 
			try {
				date = (Date)formatter.parse(start_dt);
				date1 = (Date)formatter.parse(end_dt);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			System.out.println("In Helper adate " + date);
			System.out.println("In Helper bdate " + date1);			
			
			SimpleDateFormat newFormat = new SimpleDateFormat("DD-MM-yyyy");
			String finalString = newFormat.format(date);
			String finalString1 = newFormat.format(date1);
			
			Map<Long, PurchaseReportBean> map = new HashMap<Long, PurchaseReportBean>();

			GoodReciveDao dao = new GoodReciveDao();
			List<PurchaseReportBean> exp1List = dao.debitNoteReportBetweenTwoDates1(finalString, finalString1);

			return exp1List;
		}
		
	// two dates purchase NON GST
	public List purchaseReportBetweenTwoDatesNonGst(HttpServletRequest request, HttpServletResponse response) {
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, PurchaseReportBean> map = new HashMap<Long, PurchaseReportBean>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReportBetweenTwoDatesNonGst(adate, bdate);

		return exp1List;
	}

	// single date sale
	public List singleDateSale(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fisDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Date adate = null;
		try {
			adate = format.parse(fDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.singleDatePurchase(adate, userTypeRole, userName);

		return exp1List;

	}

	// get Category Wise sale report
	public List CategoryWiseSaleReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catId = request.getParameter("catId");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.CategoryWiseSaleReport(catId,userTypeRole,userName);
		return exp1List;
	}
	
	public List productWiseSaleReportHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String productId = request.getParameter("productId");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.productWiseSaleReportDao(productId,userTypeRole,userName);
		return exp1List;
	}

	// sale between two dates

	public List getSaleDetailsBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.getSaleDetailsBetweenTwoDates(adate, bdate, userTypeRole, userName);

		return exp1List;
	}
	//get Sale Detail Between Date and Bill No Wise
	public List getSaleDetailsBetweenTwoDatesBillNo(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		
		System.out.println("userTypeRole "+userTypeRole);
		System.out.println("userName "+userName);
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.getSaleDetailsBetweenTwoDatesBillNo(adate, bdate, userTypeRole, userName);

		return exp1List;
	}
	
	//gst return gstReturn
	
	public List gstReturn(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		System.out.println("in gst return helper"+fisDate);
		String endDate = request.getParameter("endDate");
		System.out.println("in gst return helper"+endDate);
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, gstReturnbean> map = new HashMap<Long, gstReturnbean>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<gstReturnbean> exp1List = dao.gstReturndao(adate, bdate, userTypeRole, userName);

		return exp1List;
	}
	//purchase return gst  purchasegstReturn
	public List purchasegstReturn(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		System.out.println("hi this is vikas in gst return for purchase helper"+fisDate);
		String endDate = request.getParameter("endDate");
		System.out.println("hi this is vikas in gst return for purchase helper"+endDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, gstReturnbean> map = new HashMap<Long, gstReturnbean>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<gstReturnbean> exp1List = dao.purchasegstReturn(adate, bdate);

		return exp1List;
	}
	
	//sale between two dates as per user
	public List getSaleDetailsBetweenTwoDates_users(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		//System.out.println("hi this is vikas in cusomer helper"+fisDate);
		String endDate = request.getParameter("endDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String uType = request.getParameter("utypes");
		String userId = request.getParameter("userId");
		
		
		//LOGGED IN USER
		String userType = request.getParameter("userType");
		String userName = request.getParameter("userName");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.getSaleDetailsBetweenTwoDates_asPerUser(uType, userId, fisDate, endDate, userType, userName);

		return exp1List;
	}
	

	// day closing report
	public List dayCloseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.dayCloseReport();

		return exp1List;
	}

	public Map getSaleItemByBillNo(String billNo) {
		// TODO Auto-generated method stub
		CustomerOrderDao dao = new CustomerOrderDao();
		List list = dao.getSaleItemByBillNo(billNo);
		Map map = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			SaleReturnBean bean = new SaleReturnBean();
			bean.setPkBillId(Long.parseLong(o[0].toString()));
			bean.setCategoryName(o[1].toString());
			bean.setItemName(o[2].toString());
			bean.setBarcodeNo(Long.parseLong(o[3].toString()));
			bean.setQuantity(Double.parseDouble(o[4].toString()));
			String quanty = o[4].toString();
			String totalAmt = o[7].toString();
			//double salePrice = Double.parseDouble(totalAmt) / Double.parseDouble(quanty);
			bean.setSalePrice(Double.parseDouble(o[5].toString()));
			bean.setContactNo(Long.parseLong(o[6].toString()));
			bean.setTotalAmt(Double.parseDouble(o[7].toString()));
			bean.setDiscount(Double.parseDouble(o[8].toString()));
			bean.setGrossamt(Double.parseDouble(o[9].toString()));
			bean.setDate(o[10].toString());
			bean.setSize(o[11].toString());
			if(Double.parseDouble(o[15].toString()) > 0)
			{
				bean.setTaxAmt(Double.parseDouble(o[16].toString()));
			}
			else
			{
				bean.setTaxAmt(Double.parseDouble(o[12].toString()));
			}
			//bean.setTaxAmt(Double.parseDouble(o[12].toString()));
			bean.setGst(Double.parseDouble(o[13].toString()));
			bean.setiGst(Double.parseDouble(o[14].toString()));
			bean.setFinalTotalPerProduct(Double.parseDouble(o[7].toString()));
			bean.setProductId(Long.parseLong(o[17].toString()));
			bean.setSubCatId(Long.parseLong(o[18].toString()));
			bean.setCatId(Long.parseLong(o[19].toString()));		
			
			Long editQuan = 0l;
			//bean.setEditQuantity(editQuan);
			bean.setEditQuantity("00");			
			
			System.out.println("***************" + o[0]);
			map.put(bean.getPkBillId(), bean);
		}
		return map;
	}

	public Map getSaleItemByBillNo1(String billNo)
	{
		// TODO Auto-generated method stub
		CustomerOrderDao dao = new CustomerOrderDao();
		List list = dao.getSaleItemByBillNo1(billNo);
		Map map = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			SaleReturnBean bean = new SaleReturnBean();
			bean.setPkBillId(Long.parseLong(o[0].toString()));
			bean.setCategoryName(o[1].toString());
			bean.setItemName(o[2].toString());
			bean.setBarcodeNo(Long.parseLong(o[3].toString()));
			bean.setQuantity(Double.parseDouble(o[4].toString()));
			String quanty = o[4].toString();
			String totalAmt = o[6].toString();
			//double salePrice = Double.parseDouble(totalAmt) / Double.parseDouble(quanty);
			bean.setSalePrice(Double.parseDouble(o[5].toString()));
			bean.setTotalAmt(Double.parseDouble(o[6].toString()));
			bean.setDiscount(Double.parseDouble(o[7].toString()));
			bean.setGrossamt(Double.parseDouble(o[8].toString()));
			bean.setDate(o[9].toString());
			bean.setSize(o[10].toString());
			bean.setFkCreditCustId(o[11].toString());
			bean.setBillNo(Long.parseLong(o[12].toString()));
			bean.setGst(Double.parseDouble(o[13].toString()));
			bean.setiGst(Double.parseDouble(o[14].toString()));
			if(Double.parseDouble(o[17].toString()) > 0)
			{
				bean.setTaxAmt(Double.parseDouble(o[16].toString()));
			}
			else
			{
				bean.setTaxAmt(Double.parseDouble(o[15].toString()));
			}
			bean.setFinalTotalPerProduct(Double.parseDouble(o[6].toString()));
			Long editQuan = 0l;
			//bean.setEditQuantity(editQuan);
			bean.setEditQuantity("00");
			bean.setProductId(Long.parseLong(o[18].toString()));
			bean.setSubCatId(Long.parseLong(o[19].toString()));
			bean.setCatId(Long.parseLong(o[20].toString()));		
			bean.setContactNo(Long.parseLong(o[21].toString()));
			System.out.println("***************" + o[0]);
			map.put(bean.getPkBillId(), bean);
		}
		return map;
	}
	
	
	//get sale return by bill no using bill no
	
	public Map getSaleItemByBillNo2(String billNo) {
		// TODO Auto-generated method stub
		System.out.println("hi vikas your in sale return helper");
		CustomerOrderDao dao = new CustomerOrderDao();
		List list = dao.getSaleItemByBillNo(billNo);
		Map map = new HashMap();

		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			SaleReturnBean bean = new SaleReturnBean();
			bean.setPkBillId(Long.parseLong(o[0].toString()));
			bean.setCategoryName(o[1].toString());
			bean.setItemName(o[2].toString());
			bean.setBarcodeNo(Long.parseLong(o[3].toString()));
			bean.setQuantity(Double.parseDouble(o[4].toString()));
			String quanty = o[4].toString();
			String totalAmt = o[5].toString();
			//double salePrice = Double.parseDouble(totalAmt) / Double.parseDouble(quanty);
			bean.setSalePrice(Double.parseDouble(o[5].toString()));
			bean.setContactNo(Long.parseLong(o[6].toString()));
			bean.setTotalAmt(Double.parseDouble(o[7].toString()));
			bean.setDiscount(Double.parseDouble(o[8].toString()));
			bean.setGrossamt(Double.parseDouble(o[9].toString()));
			bean.setDate(o[10].toString());
			bean.setSize(o[11].toString());
			if(Double.parseDouble(o[15].toString()) > 0)
			{
				bean.setTaxAmt(Double.parseDouble(o[16].toString()));
			}
			else
			{
				bean.setTaxAmt(Double.parseDouble(o[12].toString()));
			}
			bean.setGst(Double.parseDouble(o[13].toString()));
			bean.setiGst(Double.parseDouble(o[14].toString()));
			bean.setFinalTotalPerProduct(Double.parseDouble(o[7].toString()));			
			bean.setProductId(Long.parseLong(o[17].toString()));
			bean.setSubCatId(Long.parseLong(o[18].toString()));
			bean.setCatId(Long.parseLong(o[19].toString()));
			bean.setSubCatName(o[20].toString());
			Long editQuan = 0l;
			//bean.setEditQuantity(editQuan);
			bean.setEditQuantity("00");
			System.out.println("***************" + o[0]);
			map.put(bean.getPkBillId(), bean);
		}
		return map;
	}

	// other bill
	public CustomerBean getDetailsById1(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String key = request.getParameter("key");

		System.out.println(key + "barcode");
		Map<Long, CustomerBean> map = new HashMap<Long, CustomerBean>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<CustomerBean> catList = dao.getAllItemDetails1(key);

		CustomerBean cs = null;
		if (catList != null && catList.size() > 0)
		{
			cs = (CustomerBean) catList.get(0);
		}
		return cs;
	}

	public List getAllBillNumbers() {
		CustomerOrderDao dao = new CustomerOrderDao();
		return dao.getAllBillNumbers();
	}

	public List getAllBillNumbers1() {
		CustomerOrderDao dao = new CustomerOrderDao();
		return dao.getAllBillNumbers1();
	}

	// two dates sale gst
	public List gstSaleReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, GstReportBean> map = new HashMap<Long, GstReportBean>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<GstReportBean> exp1List = dao.gstSaleReportBetweenTwoDates(adate, bdate);

		return exp1List;
	}

	// Single Date Sale Report
	public List singleDateSaleReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);

		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.singleDateSaleReport(adate);

		return exp1List;
	}

	// Two Date Sale Report
	public List twoDateSaleReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.twoDateSaleReport(adate, bdate);

		return exp1List;
	}

	// Category Wise Sale Report
	public List categorySaleWise(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catName = request.getParameter("catName");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.categorySaleWise(catName);

		return exp1List;
	}

	// Single Date Vehicle Customer Sale Report
	public List vehicleSingleDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		try {
			adate = format.parse(fDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.vehicleSingleDate(adate);

		return exp1List;
	}

	// get Two date Vehicle customer Sale
	public List vehicleTwoDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		String eDate = request.getParameter("eDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;
		try {
			adate = format.parse(fDate);
			bdate = format.parse(eDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.vehicleTwoDate(adate, bdate);

		return exp1List;
	}

	// get Category Wise Vehicle customer Sale
	public List categorySaleWiseCustomer(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catId = request.getParameter("catId");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.categorySaleWiseCustomer(catId);

		return exp1List;
	}

	// get Category Wise Vehicle customer Sale
	public List billnowiseVehiclesell(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String BillNo = request.getParameter("BillNocust");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.billnowiseVehiclesell(BillNo);

		return exp1List;
	}

	// get Barcode Wise Vehicle customer Sale
	public List barcodewiseVehicleSale(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String barcodeVehicle = request.getParameter("barcodeVehicle");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CustomerOrderDao dao = new CustomerOrderDao();
		List<SaleReport> exp1List = dao.barcodewiseVehicleSale(barcodeVehicle);

		return exp1List;
	}

	// two dates purchase
		public List employeeNameWiseAndBetweenTwoDates(HttpServletRequest request, HttpServletResponse response)
		{
			String fkSupplierId = request.getParameter("fkSupplierId");
			System.out.println("Employee NAme"+fkSupplierId);
			String empId = request.getParameter("empId");
			System.out.println("Employee ID ==============> "+empId);
			String fisDate = request.getParameter("fisDate");
			String endDate = request.getParameter("endDate");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

			Date adate = null;
			Date bdate = null;

			try {
				adate = format.parse(fisDate);
				bdate = format.parse(endDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			GoodReciveDao dao = new GoodReciveDao();
			//List<SaleReport> exp1List = dao.employeeNameWiseAndBetweenTwoDates(fkSupplierId, adate, bdate);
			List<SaleReport> exp1List = dao.employeeNameWiseAndBetweenTwoDates(fkSupplierId, empId, fisDate, endDate);

			return exp1List;
		}
		
		// Sale Graph
		public List getSalesGraph(HttpServletRequest request, HttpServletResponse response) {
			// TODO Auto-generated method stub
			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			GoodReciveDao dao = new GoodReciveDao();
			List<SaleReport> exp1List = dao.getSalesGraph();

			return exp1List;
		}
		
		// Purchase Graph
				public List getPurchaseGraph(HttpServletRequest request, HttpServletResponse response) {
					// TODO Auto-generated method stub
					Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

					GoodReciveDao dao = new GoodReciveDao();
					List<SaleReport> exp1List = dao.getPurchaseGraph();

					return exp1List;
				}
				
				public Map getSaleItemByBillNoForBillEditHelper(String billNo) {
					// TODO Auto-generated method stub
					DecimalFormat df = new DecimalFormat("#.##");
					Long k = 0l;
					Double totalProductAmount = 0.0;
					Double totalDiscount = 0.0;

					CustomerOrderDao dao = new CustomerOrderDao();
					List list = dao.getSaleItemByBillNoForBillEditdao(billNo);
					Map map = new HashMap();

					for (int i = 0; i < list.size(); i++)
					{
						Object[] o = (Object[]) list.get(i);
						BillEdit bean = new BillEdit();
						bean.setPkBillId(Long.parseLong(o[0].toString()));
						bean.setCategoryName(o[1].toString());
						bean.setItemName(o[2].toString());
						bean.setBarcodeNo(Long.parseLong(o[3].toString()));
						bean.setQuantity(Double.parseDouble(o[4].toString()));
						String quanty = o[4].toString();
						String totalAmt = o[5].toString();
						//double salePrice = Double.parseDouble(totalAmt) / Double.parseDouble(quanty);
						bean.setSalePrice(Double.parseDouble(o[5].toString()));
						bean.setContactNo(Long.parseLong(o[6].toString()));
						bean.setTotalAmt(Double.parseDouble(o[26].toString()));
						bean.setDiscount(Double.parseDouble(o[8].toString()));
						bean.setGrossamt(Double.parseDouble(df.format(Double.parseDouble(o[9].toString()) - Double.parseDouble(o[24].toString()))));
						bean.setDate(o[10].toString());
						bean.setSize(o[11].toString());
						if(Double.parseDouble(o[15].toString()) > 0)
						{
							bean.setTaxAmt(Double.parseDouble(o[16].toString()));
						}
						else
						{
							bean.setTaxAmt(Double.parseDouble(o[12].toString()));
						}
						bean.setGst(Double.parseDouble(o[13].toString()));
						bean.setiGst(Double.parseDouble(o[14].toString()));
						bean.setFinalTotalPerProduct(Double.parseDouble(o[7].toString()));
						
						Long editQuan = 0l;
						//bean.setEditQuantity(editQuan);
						bean.setEditQuantity("00");
						bean.setEmployeeName1(o[17].toString());
						bean.setPkBillId(Long.parseLong(o[18].toString()));
						bean.setCustomerName(o[19].toString());
						bean.setContactNo(Long.parseLong(o[20].toString()));
						bean.setPaymentMode(o[21].toString());
						bean.setOldCashAmount(o[22].toString());
						bean.setOldCardAmount(o[23].toString());
						bean.setTotalSaleReturnAmt(o[24].toString());
						
						totalProductAmount = totalProductAmount + Double.parseDouble(o[26].toString());
						totalDiscount = totalDiscount + Double.parseDouble(o[8].toString());
						
						bean.setTotalProductAmount(Double.parseDouble(df.format(totalProductAmount)));
						bean.setTotalDiscount(Double.parseDouble(df.format(totalDiscount)));
						bean.setSpWithoutTax(o[27].toString());
						
						System.out.println("***************" + o[0]);
						k++;
						bean.setBillProCount(k);
						map.put(bean.getPkBillId(), bean);
					}
					return map;
				}
				
				public Map getSaleItemByBillNoForBillEditCreditCustHelper(String billNo)
				{
					// TODO Auto-generated method stub
					DecimalFormat df = new DecimalFormat("#.##");
					Long k = 0l;
					Double totalProductAmount = 0.0;
					Double totalDiscount = 0.0;
					CustomerOrderDao dao = new CustomerOrderDao();
					List list = dao.getSaleItemByBillNoForBillEditCreditCustDao(billNo);
					Map map = new HashMap();

					for (int i = 0; i < list.size(); i++)
					{
						Object[] o = (Object[]) list.get(i);
						BillEdit bean = new BillEdit();
						bean.setPkBillId(Long.parseLong(o[0].toString()));
						bean.setCategoryName(o[1].toString());
						bean.setItemName(o[2].toString());
						bean.setBarcodeNo(Long.parseLong(o[3].toString()));
						bean.setQuantity(Double.parseDouble(o[4].toString()));
						String quanty = o[4].toString();
						String totalAmt = o[5].toString();
						//double salePrice = Double.parseDouble(totalAmt) / Double.parseDouble(quanty);
						bean.setSalePrice(Double.parseDouble(o[5].toString()));
						//bean.setContactNo(Long.parseLong(o[6].toString()));
						bean.setTotalAmt(Double.parseDouble(o[6].toString()));
						bean.setDiscount(Double.parseDouble(o[7].toString()));
						//bean.setGrossamt(Double.parseDouble(o[9].toString()));
						bean.setDate(o[9].toString());
						bean.setSize(o[11].toString());
						if(Double.parseDouble(o[15].toString()) > 0)
						{
							bean.setTaxAmt(Double.parseDouble(o[16].toString()));
						}
						else
						{
							bean.setTaxAmt(Double.parseDouble(o[15].toString()));
						}
						bean.setGst(Double.parseDouble(o[13].toString()));
						bean.setiGst(Double.parseDouble(o[14].toString()));
						bean.setFinalTotalPerProduct(Double.parseDouble(o[7].toString()));
						
						Long editQuan = 0l;
						//bean.setEditQuantity(editQuan);
						bean.setEditQuantity("00");
						bean.setEmployeeName1(o[18].toString());
						
						bean.setPaymentMode(o[19].toString());
						bean.setOldCashAmount(o[20].toString());
						bean.setOldCardAmount(o[21].toString());
						bean.setTotalSaleReturnAmt(o[22].toString());
						
						double cashPay = Double.parseDouble(o[20].toString());
						double cardPay = Double.parseDouble(o[21].toString());
						double saleReturnPay = Double.parseDouble(o[22].toString());
						double totalAmt1 = Double.parseDouble(o[24].toString());
						bean.setNetPaymentAmount(df.format(Double.parseDouble(o[20].toString())+Double.parseDouble(o[21].toString())));
						totalProductAmount = totalProductAmount + Double.parseDouble(o[6].toString());
						totalDiscount = totalDiscount + Double.parseDouble(o[7].toString());
						
						bean.setTotalProductAmount(Double.parseDouble(o[24].toString()));
						bean.setTotalDiscount(Double.parseDouble(df.format(totalDiscount)));
						bean.setGrossamt((totalAmt1) - (cashPay + cardPay + saleReturnPay));
						
						bean.setSpWithoutTax(o[23].toString());
						k++;
						bean.setBillProCount(k);
						map.put(bean.getPkBillId(), bean);
					}
					return map;
				}
				
				public List paymentModeWiseReportHelper(HttpServletRequest request, HttpServletResponse response)
				{
					// TODO Auto-generated method stub
					String pmDate = request.getParameter("pmDate");
					String pmDate22 = request.getParameter("pmDate22");
					String paymentMode = request.getParameter("paymentMode");
					String userTypeRole = request.getParameter("userTypeRole");
					String userName = request.getParameter("userName");
					SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
					
					System.out.println("pmDate ===> "+pmDate);
					System.out.println("pmDate22 ===> "+pmDate22);
					
					Date adate = null;
					Date bdate = null;
					try
					{
						adate = format.parse(pmDate);
						//bdate = format.parse(pmDate22);
					}
					catch (ParseException e1)
					{
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					
					/*System.out.println("pmDate HELPER =========> "+pmDate);
					System.out.println("adate HELPER =========> "+adate);*/
					
					Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

					CustomerOrderDao dao = new CustomerOrderDao();
					List<SaleReport> exp1List = dao.paymentModeWiseReportDao(pmDate, pmDate22, paymentMode, userTypeRole, userName);

					return exp1List;

				}
				
				public List paymentModeRangeWiseReportHelper(HttpServletRequest request, HttpServletResponse response)
				{
					// TODO Auto-generated method stub
					String startDateRP = request.getParameter("startDateRP");
					String endDateRP = request.getParameter("endDateRP");
					
					System.out.println("startDateRP HELPER =========> "+startDateRP);
					System.out.println("endDate HELPER =========> "+endDateRP);
					
					SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

					Date adate = null;
					Date bdate = null;
					try
					{
						adate = format.parse(startDateRP);
						bdate = format.parse(endDateRP);
					} catch (ParseException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					
					System.out.println("adate HELPER =========> "+adate);
					System.out.println("bdate HELPER =========> "+bdate);
					
					Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

					CustomerOrderDao dao = new CustomerOrderDao();
					List<SaleReport> exp1List = dao.paymentModeRangeWiseReportDao(startDateRP, endDateRP);

					return exp1List;

				}
				
				
				
}
