package com.smt.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.BarcodeReportBean;
import com.smt.bean.BillBean;
import com.smt.bean.GetTransactionId;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.GoodreciveBillBean;
import com.smt.bean.ItemList;
import com.smt.bean.PreviousGoodReceive;
import com.smt.bean.PurchaseReport;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleReport;
import com.smt.bean.allTransactionId;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.OtherBill;
import com.smt.utility.HibernateUtility;

public class GoodReciveDao {

	public void regGoodReceive(GoodReceive gd)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(gd);
			transaction.commit();
		}
		catch (Exception e)
		{
			try
			{
				transaction.rollback();
			}
			catch (RuntimeException ede)
			{}
		}

		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}
	
	public void updateGoodReceive(GoodReceive gd)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.update(gd);
			transaction.commit();
		}
		catch (Exception e)
		{
			try
			{
				transaction.rollback();
			}
			catch (RuntimeException ede)
			{}
		}

		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}
	
	/*public Double getPendingBillPayment(String suppCode)
	{
		System.out.println(" 11111111 getPendingBillPayment SUPPLIER ID =====> "+suppCode);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodReceiveItemBean> saleList = null;
		List<Double> lastBillPending = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT gr.pending_bill_payment FROM goodreceive gr where gr.FksuppId = "+suppCode+" ORDER BY gr.FksuppId DESC LIMIT 1;");
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
			
		} catch (Exception e)
		{
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		
		return (lastBillPending.get(0).doubleValue());	
	}*/
	
	public List getPendingBillPayment(String suppCode)
	{
		System.out.println(" 11111111 getPendingBillPayment SUPPLIER ID =====> "+suppCode);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;

		List<Object> lastBillPending = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT gr.PkGoodRecId, gr.pending_bill_payment FROM goodreceive gr where gr.FksuppId = "+suppCode+" ORDER BY gr.FksuppId DESC LIMIT 1;");
			lastBillPending = query.list();
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
		return lastBillPending;
	}
	
	public void setPendingBillPaymentToSupp(Double totalBillpending, String suppCode)
	{
		HibernateUtility hbu2 = null;
		Session session2 = null;
		Transaction tx = null;
		try
		{
			System.out.println(" 22222222 setPendingBillPaymentToSupp = "+totalBillpending+" SUPPLIER ID =====> "+suppCode);		
			
			hbu2 = HibernateUtility.getInstance();
			session2 = hbu2.getHibernateSession();
			tx = session2.beginTransaction();
			Long suppId = Long.parseLong(suppCode); 
			Query query2 = session2.createSQLQuery("UPDATE goodreceive gr SET gr.pending_bill_payment = "+totalBillpending+" WHERE gr.FksuppId = "+suppId);		
			query2.executeUpdate();
			tx.commit();			 
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (session2 != null)
			{
				session2.close();
			}
		}
	}

	public List getLastBarcodeNo()
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodreciveBillBean> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT BillNo , BarcodeNo FROM goodreceive ORDER BY BarcodeNo DESC LIMIT 1");

			List<Object[]> list = query.list();
			saleList = new ArrayList<GoodreciveBillBean>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				GoodreciveBillBean reports = new GoodreciveBillBean();
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				saleList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return saleList;

	}

	public void updateQuantity(Long item_id, String quantity, String rollSize, String sQTY, String size1)
	{
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			org.hibernate.Query query = session.createQuery("from GoodReceive where PkGoodRecId = :item_id");
			query.setParameter("item_id", item_id);

			GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
			Double quant = uniqueResult.getQuantity();
			Double soldQuant = uniqueResult.getSoldQuantity();			
			System.out.println("QUANT FROM GOOD RECEIVE ======= >"+quant);
			Double updatequnty = 0.0;	
			Double updateSoldQuanty = 0.0;
			
			System.out.println("SAGAR size1 =============> "+size1);
			
			if (size1.equalsIgnoreCase("meter")	|| size1.equalsIgnoreCase("mtr")) 
			{
				System.out.println("SAGAR IN METER IF CONDITION");
				// fabric calculation
				
				double r = Double.parseDouble(rollSize);
				System.out.println("1 rollSize ======= >"+r);
				double sq = Double.parseDouble(sQTY);
				System.out.println("2 SQTY ======= >"+quant);
				double mQty = Double.parseDouble(quantity);
				System.out.println("3 mQty ==========> "+mQty);
				double asd = r * quant;
				//double mm = (asd - mQty)/r;
				//double cha = quant - mm;
				//updatequnty = (Double) (quant - cha);
				double quntyInMtr = (Double) (asd - mQty);
				updatequnty = quntyInMtr/r;
			}
			else
			{
				updatequnty = (Double)(quant - Double.parseDouble(quantity));
				updateSoldQuanty = (Double)(soldQuant + Double.parseDouble(quantity));
				System.out.println("sagar change size in dao !@#$%^&*(!@#$%^&*(@#$%^&*(@!#$%^&!@#$%^&@#$%^&-------------   "+updatequnty);
			}
			
			GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(item_id));

			updateStock.setQuantity(updatequnty);
			updateStock.setSoldQuantity(updateSoldQuanty);
			
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

	// BarcodeWise Stock
	//public List<GoodReceive> getCategoryWiseStock(Long barcodeNo) {
	public List<GoodReceive> getCategoryWiseStock()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodReceive> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("Select pr.ProductName, ct.Category_Name, gr.quantity, gr.buyPrice, gr.billNo, gr.barcodeNo, gr.vat, gr.igst, gr.salePrice, sd.supplier_name from GoodReceive gr JOIN supplier_details sd ON gr.FksuppId=sd.supplier_id join categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId where gr.Quantity > 0;");
			/* query2.setParameter("barcodeNo", barcodeNo); */ 
			List<Object[]> list = query2.list();
			catList = new ArrayList<GoodReceive>(0);

			for (Object[] object : list)
			{
				GoodReceive reports = new GoodReceive();
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				reports.setBuyPrice(Double.parseDouble(object[3].toString()));
				reports.setBillNo(object[4].toString());
				reports.setBarcodeNo(Long.parseLong(object[5].toString()));
				String gst = object[6].toString();
				String igst = object[7].toString();
				reports.setSalePrice(Double.parseDouble(object[8].toString()));
				if (gst.equals("0.0")) {
					reports.setVat(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setVat(Double.parseDouble(gst));
				}
				reports.setSuppName(object[9].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<GoodReceive> stockbarcodeWiseDao(Long barcodeNo, String userType, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodReceive> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("Select gr.itemName, ct.Category_Name, gr.quantity, gr.buyPrice, gr.billNo, gr.barcodeNo, gr.vat, gr.igst, gr.salePrice, sd.supplier_name from GoodReceive gr JOIN supplier_details sd ON gr.FksuppId=sd.supplier_id join categories ct on gr.fkCatId = ct.pk_category_id where quantity > 0 AND gr.BarcodeNo="+barcodeNo);
			List<Object[]> list = query2.list();
			catList = new ArrayList<GoodReceive>(0);

			for (Object[] object : list)
			{
				GoodReceive reports = new GoodReceive();
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				if(userType.equals("admin"))
				{
					reports.setBuyPrice(Double.parseDouble(object[3].toString()));
				}
				else
				{
					reports.setBuyPrice(0.0);
				}
				reports.setBillNo(object[4].toString());
				reports.setBarcodeNo(Long.parseLong(object[5].toString()));
				String gst = object[6].toString();
				String igst = object[7].toString();
				reports.setSalePrice(Double.parseDouble(object[8].toString()));
				if (gst.equals("0.0")) {
					reports.setVat(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setVat(Double.parseDouble(gst));
				}
				reports.setSuppName(object[9].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// SupplierWise stock between two days
	public List<GoodReceive> getSuppWiseStockBetTwoDate(Long suppId, String fDate, String eDate)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodReceive> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query2 = session.createSQLQuery("select barcodeNo, itemName, CategoryName, quantity, buyPrice, Vat, igst from goodreceive where FksuppId =" + suppId + " AND Date between '" + fDate + "' and '" + eDate + "';");
			Query query2 = session.createSQLQuery("SELECT barcodeNo, pr.ProductName, ct.Category_Name, gr.Quantity, gr.BuyPrice, gr.Vat, igst, OrignalQuantity, gr.SalePrice, (OrignalQuantity - gr.Quantity) FROM goodreceive gr JOIN categories ct ON gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId WHERE FksuppId =" + suppId + " AND Date between '" + fDate + "' and '" + eDate + "';");
			List<Object[]> list = query2.list();
			catList = new ArrayList<GoodReceive>(0);

			for (Object[] object : list) {

				GoodReceive reports = new GoodReceive();

				reports.setBarcodeNo(Long.parseLong(object[0].toString()));
				reports.setItemName(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setQuantity(Double.parseDouble(object[3].toString()));
				reports.setBuyPrice(Double.parseDouble(object[4].toString()));
				String gst = object[5].toString();
				String igst = object[6].toString();
				if (gst.equals("0.0")) {
					reports.setVat(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setVat(Double.parseDouble(gst));
				}
				
				reports.setOringnalQuantity(Double.parseDouble(object[7].toString()));
				reports.setSalePrice(Double.parseDouble(object[8].toString()));
				reports.setSoldQuantity(Double.parseDouble(object[9].toString()));
				reports.setTotalBuyPrice(df.format(Double.parseDouble(object[3].toString()) * Double.parseDouble(object[4].toString())));
				reports.setTotalSalePrice(df.format(Double.parseDouble(object[3].toString()) * Double.parseDouble(object[8].toString())));
				
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get purchase bill no
	public List getBillNo()
	{
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from GoodReceive group by billNo");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllMainCategories()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	// bill no wise stock
	public List<GoodReceive> getBillNoWiseStock(String billno)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodReceive> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("BEFORE EXECUTING QUERY ===");
			Query query2 = session.createSQLQuery("select pr.ProductName, ct.Category_Name, gr.quantity, gr.buyPrice, gr.salePrice, gr.billNo, gr.barcodeNo, gr.vat, gr.igst, sp.supplier_name from goodreceive gr join supplier_details sp on gr.FksuppId = sp.supplier_id join categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId where billNo=:billno");
			query2.setParameter("billno", billno);
			List<Object[]> list = query2.list();
			catList = new ArrayList<GoodReceive>(0);

			for (Object[] object : list) {

				GoodReceive reports = new GoodReceive();

				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				reports.setBuyPrice(Double.parseDouble(object[3].toString()));
				reports.setSalePrice(Double.parseDouble(object[4].toString()));
				reports.setBillNo(object[5].toString());
				reports.setBarcodeNo(Long.parseLong(object[6].toString()));
				String gst = object[7].toString();
				String igst = object[8].toString();
				if (gst.equals("0.0")) {
					reports.setVat(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setVat(Double.parseDouble(gst));
				}
				reports.setSuppName(object[9].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List<PurchaseReportBean> singleDatePurchase(Date adate)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			Long k = 0l;
			double rSize=0.0;
			double Qmeter = 0.0;
			double qty = 0.0;
			String Rsize=null;
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select g.Date, s.supplier_name, g.BillNo, s.pan_no, g.ItemName, g.BuyPrice, g.OrignalQuantity, g.vat, g.igst, g.HsnSacNo, g.RollSize, g.Discount, ((g.BuyPrice*g.OrignalQuantity)*(g.Discount/100)) from goodreceive g left join supplier_details s on g.FksuppId = s.supplier_id  where date=:adate");
			query2.setParameter("adate", adate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list) {
				k++;
				PurchaseReportBean reports = new PurchaseReportBean();
				String gsttaxAmt1 = object[7].toString();
				String igsttaxAmt1 = object[8].toString();
				
				Rsize = object[10].toString();
				rSize = Double.parseDouble(object[10].toString());
				qty = Double.parseDouble(object[6].toString());
				reports.setDiscountAmount(df.format(Double.parseDouble(object[12].toString())));
				if (gsttaxAmt1.equals("0.0") && igsttaxAmt1.equals("0.0")) {
					continue;
				} else {
					reports.setSerialnumber(k);
					reports.setFetchDate(object[0].toString());
					reports.setSupplierName(object[1].toString());
					reports.setBillNo(object[2].toString());
					reports.setGstTinNo(object[3].toString());
					reports.setItemName(object[4].toString());
					reports.setBuyPrice(Double.parseDouble(object[5].toString()));
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					
					reports.setRollSize(Double.parseDouble(object[10].toString()));					
					reports.setHsnsacno(object[9].toString());

					Double qunti = Double.parseDouble(object[6].toString());
					Double byPrice = Double.parseDouble(object[5].toString());
					
					String gsttaxAmt = object[7].toString();
					String igsttaxAmt = object[8].toString();
					reports.setVat(Double.parseDouble(gsttaxAmt));
					reports.setIgst(Double.parseDouble(igsttaxAmt));
					
					if(Rsize.equals("0.0") || Rsize.equals("1.0"))
					{
						Double total = byPrice * qunti;
						reports.setTotal(total);
						Double discountAmt = (total * (Double.parseDouble(object[11].toString())/100.00));
						reports.setDiscountAmount(df.format(discountAmt));
						if(Double.parseDouble(object[7].toString()) != 0.0)
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[7].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
						else
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[8].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
					}
					else
					{
						Double total = byPrice * qunti*rSize;
						reports.setTotal(total);
						Double discountAmt = (total * (Double.parseDouble(object[11].toString())/100.00));
						reports.setDiscountAmount(df.format(discountAmt));
						if(Double.parseDouble(object[7].toString()) != 0.0)
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[7].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
						else
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[8].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
						/*Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[7].toString())/100.00));
						reports.setTotalTaxAmount(taxAmount);
						reports.setNetAmount((total - discountAmt) + taxAmount);*/
					}
					
					/*Double total = byPrice * qunti;
					reports.setTotal(total);*/
					
					
					System.out.println("gsttaxAmt" + gsttaxAmt);
					System.out.println("igsttaxAmt" + igsttaxAmt);

					
					/*if (gsttaxAmt.equals("5.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);
					} else if (gsttaxAmt.equals("12.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (gsttaxAmt.equals("18.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST((double) Math.round(taxAmt));
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (gsttaxAmt.equals("28.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					}

					if (igsttaxAmt.equals("5.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);
					} else if (igsttaxAmt.equals("12.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (igsttaxAmt.equals("18.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (igsttaxAmt.equals("28.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					}*/

					catList.add(reports);

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}

	public List<PurchaseReportBean> purchaseReportBetweenTwoDates(Date adate, Date bdate)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			Long k = 0l;
			double rSize=0.0;
			double Qmeter = 0.0;
			double qty = 0.0;
			String Rsize=null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select g.Date, s.supplier_name, g.BillNo, s.pan_no, g.ItemName, g.BuyPrice, g.OrignalQuantity, g.vat, g.igst, g.HsnSacNo,g.RollSize, g.Discount from goodreceive g left join supplier_details s on g.FksuppId = s.supplier_id where date BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list) {
				k++;
				PurchaseReportBean reports = new PurchaseReportBean();
				String gsttaxAmt1 = object[7].toString();
				String igsttaxAmt1 = object[8].toString();
				
				Rsize = object[10].toString();
				rSize = Double.parseDouble(object[10].toString());
				qty = Double.parseDouble(object[6].toString());
				
				String gsttaxAmt = object[7].toString();
				String igsttaxAmt = object[8].toString();
				reports.setVat(Double.parseDouble(gsttaxAmt));
				reports.setIgst(Double.parseDouble(igsttaxAmt));
				System.out.println("gsttaxAmt" + gsttaxAmt);
				System.out.println("igsttaxAmt" + igsttaxAmt);
				
				if (gsttaxAmt1.equals("0.0") && igsttaxAmt1.equals("0.0")) {
					continue;
				}
				else
				{
					reports.setSerialnumber(k);
					reports.setFetchDate(object[0].toString());
					reports.setSupplierName(object[1].toString());
					reports.setBillNo(object[2].toString());
					reports.setGstTinNo(object[3].toString());
					reports.setItemName(object[4].toString());
					reports.setBuyPrice(Double.parseDouble(object[5].toString()));
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setRollSize(Double.parseDouble(object[10].toString()));
					reports.setHsnsacno(object[9].toString());

					Double qunti = Double.parseDouble(object[6].toString());
					Double byPrice = Double.parseDouble(object[5].toString());
					
					if(Rsize.equals("0.0") || Rsize.equals("1.0"))
					{
						Double total = byPrice * qunti;
						reports.setTotal(total);
						Double discountAmt = (total * (Double.parseDouble(object[11].toString())/100.00));
						reports.setDiscountAmount(df.format(discountAmt));
						if(Double.parseDouble(object[7].toString()) != 0.0)
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[7].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
						else
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[8].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
					}
					else
					{
						Double total = byPrice * qunti*rSize;
						reports.setTotal(total);
						Double discountAmt = (total * (Double.parseDouble(object[11].toString())/100.00));
						reports.setDiscountAmount(df.format(discountAmt));
						if(Double.parseDouble(object[7].toString()) != 0.0)
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[7].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
						else
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[8].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
					}
					
					/*Double total = byPrice * qunti;
					reports.setTotal(total);*/

					/*if (gsttaxAmt.equals("5.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);
					} else if (gsttaxAmt.equals("12.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (gsttaxAmt.equals("18.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount));
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (gsttaxAmt.equals("28.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					}

					if (igsttaxAmt.equals("5.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);
					} else if (igsttaxAmt.equals("12.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (igsttaxAmt.equals("18.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (igsttaxAmt.equals("28.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					}*/

					catList.add(reports);

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List<PurchaseReportBean> creditNoteReportBetweenTwoDates(String fkSupplierId, Date adate, Date bdate)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select g.ReturnDate, g.supplierName, g.BillNo, g.BarcodeNo, g.CategoryName, g.ItemName, g.BuyPrice, g.ReturnQuantity, g.Return_Total from purchasereturn g where ReturnDate BETWEEN :adate AND :bdate and g.fkSuppId=:fkSupplierId");
			query2.setParameter("fkSupplierId", fkSupplierId);
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list) {
				k++;
				PurchaseReportBean reports = new PurchaseReportBean();

				reports.setSerialnumber(k);
				reports.setFetchDate(object[0].toString());
				reports.setSupplierName(object[1].toString());
				reports.setBillNo(object[2].toString());
				reports.setBarcodeNo(Long.parseLong(object[3].toString()));
				reports.setCatName(object[4].toString());
				reports.setItemName(object[5].toString());
				reports.setBuyPrice(Double.parseDouble(object[6].toString()));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setGrossTotal(Double.parseDouble(object[8].toString()));

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List<PurchaseReportBean> debitNoteReportBetweenTwoDates(String fkSupplierId, String paymentMode) {

		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		System.out.println("In Dao paymentMode " + paymentMode);
		System.out.println("In Dao fkSupplierId " + fkSupplierId);
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select g.BillReturnDate, g.Customer_Name, g.Customer_Type, g.BillNo, g.BarcodeNo, g.CategoryNane, g.ItemName, g.SalePrice, g.ReturnQuantuty, g.Return_Total from salereturn g where g.Customer_Name=:fkSupplierId and Customer_Type=:paymentMode");
			query2.setParameter("fkSupplierId", fkSupplierId);
			query2.setParameter("paymentMode", paymentMode);
			List<Object[]> list = query2.list();
			System.out.println("In Dao List size" + list.size());
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list) {
				k++;
				PurchaseReportBean reports = new PurchaseReportBean();

				reports.setSerialnumber(k);
				reports.setFetchDate(object[0].toString());
				reports.setSupplierName(object[1].toString());
				reports.setType(object[2].toString());
				reports.setBillNo(object[3].toString());
				reports.setBarcodeNo(Long.parseLong(object[4].toString()));
				reports.setCatName(object[5].toString());
				reports.setItemName(object[6].toString());
				reports.setBuyPrice(Double.parseDouble(object[7].toString()));
				reports.setQuantity(Double.parseDouble(object[8].toString()));
				reports.setGrossTotal(Double.parseDouble(object[9].toString()));

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List<PurchaseReportBean> debitNoteReportBetweenTwoDates1(String finalString, String finalString1) {

		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		System.out.println("In Dao adate " + finalString);
		System.out.println("In Dao bdate " + finalString1);
		try{
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select g.BillReturnDate, g.Customer_Name, g.Customer_Type, g.BillNo, g.BarcodeNo, g.CategoryNane, g.ItemName, g.SalePrice, g.ReturnQuantuty, g.Return_Total from salereturn g where g.BillReturnDate BETWEEN :finalString AND :finalString1");
			query2.setParameter("finalString", finalString);
			query2.setParameter("finalString1", finalString1);
			List<Object[]> list = query2.list();
			System.out.println("In Dao List size" + list.size());
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list) {
				k++;
				PurchaseReportBean reports = new PurchaseReportBean();

				reports.setSerialnumber(k);
				reports.setFetchDate(object[0].toString());
				reports.setSupplierName(object[1].toString());
				reports.setType(object[2].toString());
				reports.setBillNo(object[3].toString());
				reports.setBarcodeNo(Long.parseLong(object[4].toString()));
				reports.setCatName(object[5].toString());
				reports.setItemName(object[6].toString());
				reports.setBuyPrice(Double.parseDouble(object[7].toString()));
				reports.setQuantity(Double.parseDouble(object[8].toString()));
				reports.setGrossTotal(Double.parseDouble(object[9].toString()));

				catList.add(reports);

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<PurchaseReportBean> purchaseReportBetweenTwoDatesNonGst(Date adate, Date bdate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		Long k = 0l;
		double rSize=0.0;
		double Qmeter = 0.0;
		double qty = 0.0;
		Double total = 0.0;
		Double Rsize=0.0;
		double disAmt = 0.0;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select g.Date, s.supplier_name, g.BillNo, s.pan_no, g.ItemName, g.BuyPrice, g.OrignalQuantity, g.vat, g.igst, g.HsnSacNo,g.RollSize, g.Total, g.Discount from goodreceive g left join supplier_details s on g.FksuppId = s.supplier_id where date BETWEEN :adate AND :bdate AND g.Vat < 0.1 AND g.igst < 0.1");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list) {
				
				PurchaseReportBean reports = new PurchaseReportBean();
				
				Rsize = Double.parseDouble(object[10].toString());
				rSize = Double.parseDouble(object[10].toString());
				reports.setDiscountAmount(df.format(Double.parseDouble(object[11].toString())));
				qty = Double.parseDouble(object[6].toString());
				String gsttaxAmt1 = object[7].toString();
				String igsttaxAmt1 = object[8].toString();
				
				System.out.println("gsttaxAmt" + gsttaxAmt1);
				System.out.println("igsttaxAmt" + igsttaxAmt1);
				
				
					k++;
					reports.setSerialnumber(k);
					reports.setFetchDate(object[0].toString());
					reports.setSupplierName(object[1].toString());
					reports.setBillNo(object[2].toString());
					reports.setGstTinNo(object[3].toString());
					reports.setItemName(object[4].toString());
					reports.setBuyPrice(Double.parseDouble(object[5].toString()));
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setHsnsacno(object[9].toString());
					
					if(rSize > 0.0)
					{
						reports.setRollSize(Double.parseDouble(object[10].toString()));
					}
					else
					{
						reports.setRollSize(0.0);
					}

					Double qunti = Double.parseDouble(object[6].toString());
					Double byPrice = Double.parseDouble(object[5].toString());
					/*double rollSize=Double.parseDouble(object[10].toString());
					if(rollSize > 0)
					{
						total = (byPrice * (rollSize*qunti));
					}
					else
					{
						total = byPrice * qunti;
					}*/
					
					reports.setTotal(Double.parseDouble(object[11].toString()));
					
					if(rSize > 0.0)
					{
						Qmeter = rSize * qty;
						reports.setQuantityMeter(Qmeter);
						
						disAmt = ((((Double.parseDouble(object[5].toString())) * (Double.parseDouble(object[6].toString()))) * rSize)*(Double.parseDouble(object[12].toString())/100.00));
						System.out.println("DIS AMT 1111111111111 =================> "+disAmt);
						reports.setDiscountAmount(String.valueOf(disAmt));
					}
					else
					{
						reports.setQuantityMeter(0.0);
						disAmt = (((Double.parseDouble(object[5].toString())) * (Double.parseDouble(object[6].toString())))*(Double.parseDouble(object[12].toString())/100.00));
						System.out.println("DIS AMT 222222222222 =================> "+disAmt);
						reports.setDiscountAmount(String.valueOf(disAmt));
						
					}
					
					reports.setDisPer(object[12].toString());
					
					catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get Previous Good Receive
	public List<PreviousGoodReceive> getPreGoodReceive(String billNo) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PreviousGoodReceive> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select s.supplier_name, g.BillNo, g.CategoryName, g.ItemName, g.BarcodeNo, g.ContactPerson, g.BarcodeQty, g.BuyPrice, g.Vat, g.Total, g.Expences, g.Date,g.igst, g.voucherNo, g.RollSize, Discount from goodreceive g left join supplier_details s on g.FksuppId = s.supplier_id where g.BillNo =:billNo");
			query2.setParameter("billNo", billNo);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PreviousGoodReceive>(0);

			for (Object[] object : list)
			{
				PreviousGoodReceive reports = new PreviousGoodReceive();

				reports.setSuppName(object[0].toString());
				reports.setBillNo(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setBarcodeNo(Long.parseLong(object[4].toString()));
				reports.setContactPerson(object[5].toString());
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				reports.setBuyPrice(Double.parseDouble(object[7].toString()));
				reports.setVat(Double.parseDouble(object[8].toString()));
				reports.setTotal(Double.parseDouble(object[9].toString()));
				reports.setExpence(Double.parseDouble(object[10].toString()));
				reports.setOndate(object[11].toString());
				reports.setIgst(Double.parseDouble(object[12].toString()));
				reports.setVoucherNo(object[13].toString());
				reports.setRollSize(object[14].toString());
				reports.setDisPer(object[15].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get all main barcode no
	public List getAllMainBarcodeNo() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from GoodReceive");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllMainBarcodeNo()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}

	// Barcode wise report
	public List<BarcodeReportBean> BarcodeWiseReport(Long barcodeId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<BarcodeReportBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select Date,ItemName,CategoryName,HsnSacNo,Quantity,BuyPrice,SalePrice,Vat,igst,Total from goodreceive where BarcodeNo =:barcodeId");
			query2.setParameter("barcodeId", barcodeId);
			List<Object[]> list = query2.list();
			catList = new ArrayList<BarcodeReportBean>(0);

			for (Object[] object : list) {

				BarcodeReportBean reports = new BarcodeReportBean();
				reports.setDate(object[0].toString());
				reports.setItemName(object[1].toString());
				reports.setCategoryName(object[2].toString());
				reports.setHsnsacNo(object[3].toString());
				reports.setQuantity(Double.parseDouble(object[4].toString()));
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				reports.setSalePrice(Double.parseDouble(object[6].toString()));
				reports.setVat(Double.parseDouble(object[7].toString()));
				reports.setIgst(Double.parseDouble(object[8].toString()));
				reports.setTotal(Double.parseDouble(object[9].toString()));

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Deactive the PaymentMode
	public void DeActivePaymentDone(String billNo, String supplier) {
		// TODO Auto-generated method stub

		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long supId = Long.parseLong(supplier);
			Query query = session.createQuery("select s.PkGoodRecId,s.paymentDone from GoodReceive s where  s.billNo =:billNo AND s.supplierName =:supId");
			query.setParameter("billNo", billNo);
			query.setParameter("supId", supId);
			List<Object[]> list = query.list();

			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Object[] objects = (Object[]) iterator.next();
				transaction = session.beginTransaction();
				Long PkGoodRecId = Long.parseLong(objects[0].toString());
				System.out.println("deactivation done of " + PkGoodRecId);
				GoodReceive upPayment = (GoodReceive) session.get(GoodReceive.class, new Long(PkGoodRecId));

				session.saveOrUpdate(upPayment);
				transaction.commit();

			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

	// Supplier Wise Purchase Report
	public List<PurchaseReport> supplierAllPurchase(long supplier) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.ContactPerson, s.CategoryName, s.ItemName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.SalePrice, s.Total, s.ExtraDiscount, s.Expences, s.ExpenseTax, s.FinalExpense, s.GrossTotal, s.Date, c.supplier_name from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id where s.FksuppId =:supplier");
			query2.setParameter("supplier", supplier);

			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);

			for (Object[] object : list) {

				PurchaseReport reports = new PurchaseReport();
				k++;
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setContactPerson(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setHsnsacno(object[4].toString());
				reports.setQuantity(Double.parseDouble(object[5].toString()));
				reports.setBuyPrice(Double.parseDouble(object[6].toString()));
				reports.setVat(Double.parseDouble(object[7].toString()));
				reports.setIgst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSalePrice(Double.parseDouble(object[10].toString()));
				reports.setTotal((double) Math.round(Double.parseDouble(object[11].toString())));
				reports.setExtraDiscount(Double.parseDouble(object[12].toString()));
				reports.setExpence(Double.parseDouble(object[13].toString()));
				reports.setTxPerexpence(Double.parseDouble(object[14].toString()));
				reports.setFinalExpenses(Double.parseDouble(object[15].toString()));
				reports.setGrossTotal((double) Math.round(Double.parseDouble(object[16].toString())));
				reports.setDate(object[17].toString());
				reports.setSupplierName(object[18].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Purchase Report Supplier Bill No Wise
	public List<PurchaseReport> supplierBillWisePurchaseReport(long supplier, String billNo) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			double rSize=0.0;
			double Qmeter = 0.0;
			double qty = 0.0;
			Double Rsize=0.0;
			
			Query query2 = session.createSQLQuery("select s.BillNo, s.ContactPerson, ct.Category_Name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.SalePrice, s.Total, s.ExtraDiscount, s.Expences, s.GrossTotal, s.Date, c.supplier_name,s.RollSize,s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), s.OrignalQuantity, sb.subcat_name, voucherNo from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id join categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.FksuppId =:supplier AND s.BillNo =:billNo");
			query2.setParameter("supplier", supplier);
			query2.setParameter("billNo", billNo);
			DecimalFormat df2 = new DecimalFormat("#.##");
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list)
			{
				PurchaseReport reports = new PurchaseReport();
				k++;
				Rsize = Double.parseDouble(object[17].toString());
				rSize = Double.parseDouble(object[17].toString());
				qty = Double.parseDouble(object[5].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setContactPerson(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setHsnsacno(object[4].toString());
				reports.setQuantity(Double.parseDouble(object[5].toString()));
				
				if(Rsize > 0.0)
				{
					reports.setRollSize(Double.parseDouble(object[17].toString()));
					double taxAmount = 0.0;
					double meterQty = Double.parseDouble(object[17].toString())*Double.parseDouble(object[20].toString());
					double amount = meterQty*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					
					if(Double.parseDouble(object[7].toString())>Double.parseDouble(object[8].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[8].toString())/100.00;
					}
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					
					reports.setTaxAmount(Double.parseDouble(df2.format(taxAmount)));
				}
				else
				{	
					reports.setRollSize(0.0);
					double taxAmount = 0.0;
					double amount = Double.parseDouble(object[20].toString())*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					if(Double.parseDouble(object[7].toString())>Double.parseDouble(object[8].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[8].toString())/100.00;
					}
					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(Double.parseDouble(df2.format(taxAmount)));
				}
				
				reports.setBuyPrice(Double.parseDouble(object[6].toString()));
				reports.setVat(Double.parseDouble(object[7].toString()));
				reports.setIgst(Double.parseDouble(object[8].toString()));
				//reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSalePrice(Double.parseDouble(object[10].toString()));
				reports.setTotal((double) Math.round(Double.parseDouble(object[11].toString())*100.0)/100.0);
				reports.setExtraDiscount(Double.parseDouble(object[12].toString()));
				reports.setExpence(Double.parseDouble(object[13].toString()));
				reports.setGrossTotal((double) Math.round(Double.parseDouble(object[14].toString())*100.0)/100.0);
				reports.setDate(object[15].toString());
				reports.setSupplierName(object[16].toString());
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[18].toString()))));
				reports.setDiscountAmt(df.format(Double.parseDouble(object[19].toString())));
				
				if(Rsize.equals("0.0") || Rsize.equals("1.0"))
				{
					/*reports.setQuantityMeter(Double.parseDouble(object[5].toString()));*/
					reports.setQuantityMeter(0.0);
				}
				else
				{
					Qmeter = rSize * qty;
					reports.setQuantityMeter(Qmeter);
				}
				
				reports.setSubCatName(object[21].toString());
				reports.setVoucherNo(object[22].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	/*********************VOUCHER NO WISE PURCHASE REPORT *************************/

	// Purchase Report Supplier Bill No Wise
	public List<PurchaseReport> voucherNoWisePurchaseReportDao(long voucherNo)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			double rSize=0.0;
			double Qmeter = 0.0;
			double qty = 0.0;
			Double Rsize=0.0;
			System.out.println();
			Query query2 = session.createSQLQuery("select s.BillNo, s.ContactPerson, ct.Category_Name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.SalePrice, s.Total, s.ExtraDiscount, s.Expences, s.GrossTotal, s.Date, c.supplier_name,s.RollSize,s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), s.OrignalQuantity, sb.subcat_name from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id join categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.voucherNo =:voucherNo");
			query2.setParameter("voucherNo", voucherNo);

			DecimalFormat df2 = new DecimalFormat("#.##");
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list)
			{
				PurchaseReport reports = new PurchaseReport();
				k++;
				Rsize = Double.parseDouble(object[17].toString());
				rSize = Double.parseDouble(object[17].toString());
				qty = Double.parseDouble(object[5].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setContactPerson(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setHsnsacno(object[4].toString());
				reports.setQuantity(Double.parseDouble(object[5].toString()));
				
				if(Rsize > 0.0)
				{
					reports.setRollSize(Double.parseDouble(object[17].toString()));
					double taxAmount = 0.0;
					double meterQty = Double.parseDouble(object[17].toString())*Double.parseDouble(object[20].toString());
					double amount = meterQty*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					
					if(Double.parseDouble(object[7].toString())>Double.parseDouble(object[8].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[8].toString())/100.00;
					}
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					
					reports.setTaxAmount(Double.parseDouble(df2.format(taxAmount)));
				}
				else
				{	
					reports.setRollSize(0.0);
					double taxAmount = 0.0;
					double amount = Double.parseDouble(object[20].toString())*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					if(Double.parseDouble(object[7].toString())>Double.parseDouble(object[8].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[8].toString())/100.00;
					}
					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(Double.parseDouble(df2.format(taxAmount)));
				}
				
				reports.setBuyPrice(Double.parseDouble(object[6].toString()));
				reports.setVat(Double.parseDouble(object[7].toString()));
				reports.setIgst(Double.parseDouble(object[8].toString()));
				//reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSalePrice(Double.parseDouble(object[10].toString()));
				reports.setTotal((double) Math.round(Double.parseDouble(object[11].toString())*100.0)/100.0);
				reports.setExtraDiscount(Double.parseDouble(object[12].toString()));
				reports.setExpence(Double.parseDouble(object[13].toString()));
				reports.setGrossTotal((double) Math.round(Double.parseDouble(object[14].toString())*100.0)/100.0);
				reports.setDate(object[15].toString());
				reports.setSupplierName(object[16].toString());
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[18].toString()))));
				reports.setDiscountAmt(df.format(Double.parseDouble(object[19].toString())));
				
				if(Rsize.equals("0.0") || Rsize.equals("1.0"))
				{
					/*reports.setQuantityMeter(Double.parseDouble(object[5].toString()));*/
					reports.setQuantityMeter(0.0);
				}
				else
				{
					Qmeter = rSize * qty;
					reports.setQuantityMeter(Qmeter);
				}
				
				reports.setSubCatName(object[21].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}	

	// Purchase Report Category Wise
	public List<PurchaseReport> categoryWisePurchaseReport(String catId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			  double rSize=0.0;
				double Qmeter = 0.0;
				double qty = 0.0;
				String Rsize=null;
			Query query2 = session.createSQLQuery("select s.BillNo, ct.category_name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.Total, s.BarcodeNo, s.Date, c.supplier_name,s.RollSize,s.ExtraDiscount,s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), s.OrignalQuantity, sb.subcat_name, s.voucherNo, s.SalePrice from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id join categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.fkCatId =:catId");
			query2.setParameter("catId", catId);

			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list) {

				PurchaseReport reports = new PurchaseReport();
				k++;
				
				Rsize = object[13].toString();
				rSize = Double.parseDouble(object[13].toString());
				qty = Double.parseDouble(object[4].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setItemName(object[2].toString());
				reports.setHsnsacno(object[3].toString());
				
				reports.setQuantity(Double.parseDouble(object[4].toString()));
				if(rSize > 0.0)
				{
					reports.setRollSize(Double.parseDouble(object[13].toString()));
					double taxAmount = 0.0;
					double meterQty = Double.parseDouble(object[17].toString())*Double.parseDouble(object[13].toString());
					double amount = meterQty*Double.parseDouble(object[5].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[15].toString())/100.00);
					taxAmount = amountWithoutDis*Double.parseDouble(object[6].toString())/100.00;
					
					if(Double.parseDouble(object[6].toString()) > Double.parseDouble(object[7].toString()))
					{
						taxAmount = amountWithoutDis*(Double.parseDouble(object[6].toString())/100.00);
					}else
					{
						taxAmount = amountWithoutDis*(Double.parseDouble(object[7].toString())/100.00);
					}
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
				}
				else
				{
					reports.setRollSize(0.0);
					double taxAmount = 0.0;
					double amount = Double.parseDouble(object[17].toString())*Double.parseDouble(object[5].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[15].toString())/100.00);
					
					if(Double.parseDouble(object[6].toString()) > Double.parseDouble(object[7].toString()))
					{	
						taxAmount = amountWithoutDis*(Double.parseDouble(object[6].toString())/100.00);
					}else
					{	
						taxAmount = amountWithoutDis*(Double.parseDouble(object[7].toString())/100.00);
					}
					
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
				}
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				reports.setVat(Double.parseDouble(object[6].toString()));
				reports.setIgst(Double.parseDouble(object[7].toString()));
				//reports.setTaxAmount(Double.parseDouble(object[8].toString()));
				reports.setTotal(Double.parseDouble(df.format(Double.parseDouble(object[9].toString()))));
				reports.setBarcodeNo(Long.parseLong(object[10].toString()));
				reports.setDate(object[11].toString());
				reports.setSupplierName(object[12].toString());
				reports.setExtraDiscount(Double.parseDouble(object[14].toString()));
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[15].toString()))));
				reports.setDiscountAmt(df.format(Double.parseDouble(object[16].toString())));
				
				
				if(Rsize.equals("0.0") || Rsize.equals("1.0"))
				{
					/*reports.setQuantityMeter(Double.parseDouble(object[4].toString()));*/
					reports.setQuantityMeter(0.0);
				}
				else
				{
					Qmeter = rSize * qty;
					reports.setQuantityMeter(Qmeter);
				}
				
				reports.setSubCatName(object[18].toString());
				reports.setVoucherNo(object[19].toString());
				reports.setSalePrice(Double.parseDouble(object[20].toString()));

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Purchase Report Barcode No Wise
	public List<PurchaseReport> barcodeWisePurchaseReport(String barcodeNoOurchase) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			
			double rSize=0.0;
			double qty = 0.0;
			String Rsize=null;
			Query query2 = session.createSQLQuery("select s.BillNo, ct.Category_Name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.Total, s.BarcodeNo, s.Date, c.supplier_name,s.RollSize,s.ExtraDiscount,s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), sb.subcat_name, s.voucherNo, s.SalePrice from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id join categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.BarcodeNo = :barcodeNoOurchase");
			query2.setParameter("barcodeNoOurchase", barcodeNoOurchase);

			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df =  new DecimalFormat("#.##");
			for (Object[] object : list)
			{
				PurchaseReport reports = new PurchaseReport();
				k++;
				
				Rsize = object[13].toString();
				rSize = Double.parseDouble(object[13].toString());
				qty = Double.parseDouble(object[4].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setItemName(object[2].toString());
				reports.setHsnsacno(object[3].toString());
				reports.setQuantity(Double.parseDouble(object[4].toString()));
				
				if(rSize > 0.0)
				{
					
					reports.setRollSize(Double.parseDouble(object[13].toString()));
					double taxAmount = 0.0;
					double meterQty = Double.parseDouble(object[13].toString())*Double.parseDouble(object[4].toString());
					double amount = meterQty*Double.parseDouble(object[5].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[15].toString())/100.00);
					if(Double.parseDouble(object[6].toString())>Double.parseDouble(object[7].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[6].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setQuantityMeter(meterQty);
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
					
				}
				else
				{
					reports.setRollSize(0.0);
					double taxAmount = 0.0;
					double amount = Double.parseDouble(object[4].toString())*Double.parseDouble(object[5].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[15].toString())/100.00);
					if(Double.parseDouble(object[6].toString())>Double.parseDouble(object[7].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[6].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setQuantityMeter(0.0);
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
				}
				
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				reports.setVat(Double.parseDouble(object[6].toString()));
				reports.setIgst(Double.parseDouble(object[7].toString()));
				//reports.setTaxAmount(Double.parseDouble(object[8].toString()));
				reports.setTotal((double) Math.round(Double.parseDouble(object[9].toString())));
				reports.setBarcodeNo(Long.parseLong(object[10].toString()));
				reports.setDate(object[11].toString());
				reports.setSupplierName(object[12].toString());
				reports.setExtraDiscount(Double.parseDouble(object[14].toString()));
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[15].toString()))));
				reports.setDiscountAmt(df.format(Double.parseDouble(object[16].toString())));
				
				reports.setSubCatName(object[17].toString());
				reports.setVoucherNo(object[18].toString());
				reports.setSalePrice(Double.parseDouble(object[19].toString()));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Purchase Report Single Date

	public List<PurchaseReport> singleDatePurchase45(Date adate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			double rSize=0.0;
			double Qmeter = 0.0;
			double qty = 0.0;
			String Rsize=null;
			double gst = 0.0;
			double iGst = 0.0;
			double taxAmount = 0.0;

			Query query2 = session.createSQLQuery("select s.BillNo, s.ContactPerson, ct.category_name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.SalePrice, s.Total, s.ExtraDiscount, s.Expences, s.GrossTotal, s.Date, c.supplier_name, s.RollSize, s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), sb.subcat_name, voucherNo from goodreceive s JOIN supplier_details c ON s.FksuppId=c.supplier_id JOIN categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.Date = :adate");
			query2.setParameter("adate", adate);

			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list)
			{
				PurchaseReport reports = new PurchaseReport();
				k++;
				
				Rsize = object[17].toString();
				rSize = Double.parseDouble(object[17].toString());
				qty = Double.parseDouble(object[5].toString());
				gst = Double.parseDouble(object[7].toString());
				iGst = Double.parseDouble(object[8].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setContactPerson(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setHsnsacno(object[4].toString());
				reports.setQuantity(Double.parseDouble(object[5].toString()));
				
				if(rSize > 0.0)
				{
					reports.setRollSize(Double.parseDouble(object[17].toString()));
					double meterQty = Double.parseDouble(object[17].toString())*Double.parseDouble(object[5].toString());
					double amount = meterQty*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					if(gst > 0)
					{
						taxAmount = amountWithoutDis*gst/100.00;						
					}
					else if(iGst > 0)
					{
						taxAmount = amountWithoutDis*iGst/100.00;	
					}					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(taxAmount);
				}
				else
				{
					reports.setRollSize(0.0);
					double amount = Double.parseDouble(object[5].toString())*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					if(gst > 0)
					{
						taxAmount = amountWithoutDis*gst/100.00;						
					}
					else if(iGst > 0)
					{
						taxAmount = amountWithoutDis*iGst/100.00;	
					}
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
				}
				
				reports.setBuyPrice(Double.parseDouble(object[6].toString()));
				reports.setVat((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0);
				reports.setIgst((double) Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
				//reports.setTaxAmount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[10].toString())*100.0)/100.0);
				reports.setTotal((double) Math.round(Double.parseDouble(object[11].toString())*100.0)/100.0);
				reports.setExtraDiscount((double) Math.round(Double.parseDouble(object[12].toString())*100.0)/100.0);
				reports.setExpence((double) Math.round(Double.parseDouble(object[13].toString())*100.0)/100.0);
				reports.setGrossTotal((double) Math.round(Double.parseDouble(object[14].toString())*100.0)/100.0);
				reports.setDate(object[15].toString());
				reports.setSupplierName(object[16].toString());
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[18].toString()))));
				reports.setDiscountAmt(df.format(Double.parseDouble(object[19].toString())));
				
				if(Rsize.equals("0.0") || Rsize.equals("1.0"))
				{
					//reports.setQuantityMeter(Double.parseDouble(object[5].toString()));
					reports.setQuantityMeter(0.0);
				}
				else
				{
					Qmeter = rSize * qty;
					reports.setQuantityMeter(Qmeter);
				}
				
				reports.setSubCatName(object[20].toString());
				reports.setVoucherNo(object[21].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Purchase Report Two Date
	public List<PurchaseReport> twoDatePurchase45(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
				double rSize=0.0;
				double Qmeter = 0.0;
				double qty = 0.0;
				String Rsize=null;
				double gst = 0.0;
				double iGst = 0.0;
				double taxAmount = 0.0;
				
			Query query2 = session.createSQLQuery("select s.BillNo, s.ContactPerson, ct.category_name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.SalePrice, s.Total, s.ExtraDiscount, s.Expences, s.GrossTotal, s.Date, c.supplier_name, s.RollSize, s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), sb.subcat_name, voucherNo from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id join categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.Date BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list)
			{
				PurchaseReport reports = new PurchaseReport();
				k++;
				
				Rsize = object[17].toString();
				rSize = Double.parseDouble(object[17].toString());
				qty = Double.parseDouble(object[5].toString());
				gst = Double.parseDouble(object[7].toString());
				iGst = Double.parseDouble(object[8].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setContactPerson(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setHsnsacno(object[4].toString());
				reports.setQuantity(Double.parseDouble(object[5].toString()));
				
				if(rSize > 0.0)
				{
					reports.setRollSize(Double.parseDouble(object[17].toString()));
					double meterQty = Double.parseDouble(object[17].toString())*Double.parseDouble(object[5].toString());
					double amount = meterQty*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					if(gst > 0)
					{
						taxAmount = amountWithoutDis*gst/100.00;						
					}
					else if(iGst > 0)
					{
						taxAmount = amountWithoutDis*iGst/100.00;	
					}					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
				}
				else
				{
					reports.setRollSize(0.0);
					double amount = Double.parseDouble(object[5].toString())*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[18].toString())/100.00);
					if(gst > 0)
					{
						taxAmount = amountWithoutDis*gst/100.00;						
					}
					else if(iGst > 0)
					{
						taxAmount = amountWithoutDis*iGst/100.00;	
					}					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(taxAmount);
				}
				
				reports.setBuyPrice(Double.parseDouble(object[6].toString()));
				reports.setVat(Double.parseDouble(object[7].toString()));
				reports.setIgst(Double.parseDouble(object[8].toString()));
				//reports.setTaxAmount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
				reports.setSalePrice(Double.parseDouble(object[10].toString()));
				reports.setTotal((double) Math.round(Double.parseDouble(object[11].toString())*100.0)/100.0);
				reports.setExtraDiscount((double) Math.round(Double.parseDouble(object[12].toString())*100.0)/100.0);
				reports.setExpence((double) Math.round(Double.parseDouble(object[13].toString())*100.0)/100.0);
				reports.setGrossTotal((double) Math.round(Double.parseDouble(object[14].toString())*100.0)/100.0);
				reports.setDate(object[15].toString());
				reports.setSupplierName(object[16].toString());
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[18].toString()))));
				reports.setDiscountAmt(df.format(Double.parseDouble(object[19].toString())));
				
				if(Rsize.equals("0.0") || Rsize.equals("1.0"))
				{
					//reports.setQuantityMeter(Double.parseDouble(object[5].toString()));
					reports.setQuantityMeter(0.0);
				}
				else
				{
					Qmeter = rSize * qty;
					reports.setQuantityMeter(Qmeter);
				}
				
				reports.setSubCatName(object[20].toString());
				reports.setVoucherNo(object[21].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// CA Purchase Report Two Date
	public List<PurchaseReport> caReportBetweenTwoDates(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select CategoryName, ItemName, HsnSacNo, OrignalQuantity, Vat, igst from goodreceive  where Date BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);

			for (Object[] object : list) {

				PurchaseReport reports = new PurchaseReport();
				k++;
				reports.setSrno(k);

				reports.setCatName(object[0].toString());
				reports.setItemName(object[1].toString());
				reports.setHsnsacno(object[2].toString());
				reports.setQuantity(Double.parseDouble(object[3].toString()));
				reports.setVat(Double.parseDouble(object[4].toString()));
				reports.setIgst(Double.parseDouble(object[5].toString()));

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// SupplierName Wise Purchase Report
	public List<PurchaseReport> suppliernamewiseAllPurchase(String supplier) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			double rSize=0.0;
			double Qmeter = 0.0;
			double qty = 0.0;
			String Rsize=null;
			//Query query2 = session.createSQLQuery("select s.supplier_name, g.BillNo, g.CategoryName, g.ItemName, g.ContactPerson, g.Quantity, g.BuyPrice, g.Vat, g.Total, g.Expences, g.Date, g.HsnSacNo, g.Igst, g.TaxAmount, g.GrossTotal,g.RollSize,g.ExtraDiscount,g.Discount, (g.BuyPrice*(g.Discount/100)), g.OrignalQuantity from goodreceive g inner join supplier_details s on g.FksuppId = s.supplier_id where FksuppId=:supplier");
			Query query2 = session.createSQLQuery("select s.supplier_name, g.BillNo, ct.category_name, pr.ProductName, g.ContactPerson, g.Quantity, g.BuyPrice, g.Vat, g.Total, g.Expences, g.Date, g.HsnSacNo, g.Igst, g.TaxAmount, g.GrossTotal,g.RollSize,g.ExtraDiscount,g.Discount, if(g.RollSize > 0, (g.BuyPrice*(g.OrignalQuantity*g.RollSize)*(g.Discount/100)),((g.BuyPrice*g.OrignalQuantity)*(g.Discount/100))), g.OrignalQuantity, g.style, sb.subcat_name, g.voucherNo from goodreceive g JOIN supplier_details s on g.FksuppId = s.supplier_id JOIN categories ct on g.fkCatId=ct.pk_category_id JOIN sub_categories sb on g.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr ON g.fkProductId = pr.pkProductNameId where FksuppId=:supplier");
			query2.setParameter("supplier", supplier);
			DecimalFormat df = new DecimalFormat("#.###");
			DecimalFormat df2 = new DecimalFormat("#.##");
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);

			for (Object[] object : list)
			{
				PurchaseReport reports = new PurchaseReport();
				k++;
				//i have to add
				Rsize = object[15].toString();
				rSize = Double.parseDouble(object[15].toString());
				qty = Double.parseDouble(object[5].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[1].toString());
				reports.setContactPerson(object[4].toString());
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setHsnsacno(object[11].toString());
				reports.setQuantity(Double.parseDouble(object[19].toString()));
				if(rSize > 0.0)
				{
					reports.setRollSize(Double.parseDouble(object[15].toString()));
					double taxAmount=0.0;
					double meterQty = Double.parseDouble(object[15].toString())*Double.parseDouble(object[19].toString());
					double amount = meterQty*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[17].toString())/100.00);
					if(Double.parseDouble(object[7].toString())>Double.parseDouble(object[12].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[12].toString())/100.00;
					}
					
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(Double.parseDouble(df2.format(taxAmount)));
				}
				else
				{
					reports.setRollSize(0.0);
					double taxAmount=0.0;
					double amount = Double.parseDouble(object[19].toString())*Double.parseDouble(object[6].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[17].toString())/100.00);
					if(Double.parseDouble(object[7].toString())>Double.parseDouble(object[12].toString()))
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[7].toString())/100.00;
					}
					else
					{
						taxAmount = amountWithoutDis*Double.parseDouble(object[12].toString())/100.00;
					}
					System.out.println("TAX AMOUNT ====> "+taxAmount);
					reports.setTaxAmount(Double.parseDouble(df2.format(taxAmount)));
				}
				
				reports.setBuyPrice(Double.parseDouble(object[6].toString()));
				reports.setVat(Double.parseDouble(object[7].toString()));
				reports.setIgst(Double.parseDouble(object[12].toString()));
				
				//reports.setTaxAmount((double) Math.round(Double.parseDouble(object[13].toString())*100.0)/100.0);
				reports.setTotal((double) Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
				reports.setExpence((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
				reports.setGrossTotal((double) Math.round(Double.parseDouble(object[14].toString())*100.0)/100.0);
				reports.setDate(object[10].toString());
				reports.setSupplierName(object[0].toString());
				
				reports.setExtraDiscount(Double.parseDouble(object[16].toString()));
				reports.setDiscount(Double.parseDouble(df2.format(Double.parseDouble(object[17].toString()))));
				reports.setDiscountAmt(df2.format(Double.parseDouble(object[18].toString())));
				
				if(Rsize.equals("0.0") || Rsize.equals("1.0"))
				{
					//reports.setQuantityMeter(Double.parseDouble(object[5].toString()));
					reports.setQuantityMeter(0.0);
				}
				else
				{
					Qmeter = rSize * qty;
					reports.setQuantityMeter(Double.parseDouble(df.format(Qmeter)));
				}

				reports.setStyle(object[20].toString());
				reports.setSubCatName(object[21].toString());
				reports.setVoucherNo(object[22].toString());
				
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List getAllPurschaseEntry() {
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from GoodReceive group by BillNo");
			list = query.list();
			System.out.println("List size in dao" + list.size());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}

	public List getAllSaleEntry() {
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from CreditCustomerBill group by billNo");
			list = query.list();
			System.out.println("List size in dao" + list.size());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}
	
/*	public List<SaleReport> employeeNameWiseAndBetweenTwoDates(String fkSupplierId, Date adate, Date bdate) {*/
	public List<SaleReport> employeeNameWiseAndBetweenTwoDates(String fkSupplierId, String empId, String adate, String bdate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			Long k = 0l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			String qty = "0";
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query2 = session.createSQLQuery("select ItemName, Quantity, BarcodeNo, CategoryName, SalePrice, Discount, BillNo, Date, totalperitem, credit_Customer_Name, employee_Name from otherbill   UNION ALL select ItemName, Quantity, BarcodeNo, CategoryName, SalePrice, Discount, BillNo, Date, totalperitem,cd.first_name,EmpName from creditcustomerbill JOIN customer_details cd on cd.pk_customer_id = creditcustomerbill.fkCrediCustId where Date BETWEEN :adate AND :bdate AND EmpName=:fkSupplierId");
			Query query2 = session.createSQLQuery("select pr.ProductName, ob.Quantity, BarcodeNo, ct.category_name, ob.SalePrice, Discount, BillNo, Date, totalperitem, credit_Customer_Name, employee_Name, sub.subcat_name from otherbill ob JOIN categories ct on ob.fkCatId = ct.pk_category_id JOIN product_reg pr on ob.fkProductId = pr.pkProductNameId JOIN sub_categories sub on ob.fkSubCatId = sub.pk_subcat_id where Date BETWEEN '"+adate+"' AND '"+bdate+"' AND FkSaleEmployeeId="+empId+" UNION ALL select pr.ProductName, ccb.Quantity, BarcodeNo, ct.category_name, ccb.SalePrice, Discount, BillNo, Date, totalperitem, EmpName, cd.first_name+' '+cd.last_name, sub.subcat_name from creditcustomerbill ccb JOIN customer_details cd on ccb.fkCrediCustId=cd.pk_customer_id JOIN categories ct on ccb.fkCatId = ct.pk_category_id JOIN product_reg pr on ccb.fkProductId = pr.pkProductNameId JOIN sub_categories sub on ccb.fkSubCatId = sub.pk_subcat_id where Date BETWEEN '"+adate+"' AND '"+bdate+"' AND FkSaleEmployeeId="+empId);
			/*query2.setParameter("empId", empId);
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);*/
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {
				k++;
				SaleReport reports = new SaleReport();

				reports.setSrNo(k);
				reports.setItemName(object[0].toString());
				System.out.println("ITEM NAME ============> "+reports.getItemName());
				reports.setQuantity(Double.parseDouble(object[1].toString()));
				reports.getQuantity();
				reports.setBarcodeNo(Long.parseLong(object[2].toString()));
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice(Double.parseDouble(object[4].toString()));
				reports.setBillNo(Long.parseLong(object[6].toString()));
				reports.setSaleDate(object[7].toString());
				reports.setTotalperItem((double)Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
				reports.setEmployeeName(fkSupplierId);
				
				System.out.println("total discounEmp Report********************"+(double)Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
				String q = object[1].toString();
				Double quantityCheck = Double.parseDouble(object[1].toString());
				/*if(q.equals("0"))*/
				if(quantityCheck < 1)
				{
					reports.setDiscount(0.00);
				}else{
					reports.setDiscount((double)Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
				}
				
				/*if(q.equals("0"))*/
				if(quantityCheck < 1)
				{
					reports.setGrossamt(0.00);
				}else
				{
					total = (Double) object[8];
					discount = (Double) object[5];
					grossAmt = total - discount;
					reports.setGrossamt((double)Math.round(grossAmt*100.0)/100.0);
				}
				System.out.println(reports);
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	// bill no wise stock
		public List<SaleReport> getSalesGraph() {
			// TODO Auto-generated method stub
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query2 = session.createSQLQuery("select GrossTotal,Date from otherbill union select GrossTotal,Date from creditcustomerbill");
				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);
				System.out.println("List size"+list.size());
				for (Object[] object : list) {
					
					SaleReport reports = new SaleReport();

					reports.setTotalAmt(Double.parseDouble(object[0].toString()));
					reports.setSaleDate(object[1].toString());
					

					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}
		
		// bill no wise stock
		public List<SaleReport> getPurchaseGraph()
		{
			// TODO Auto-generated method stub
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query2 = session.createSQLQuery("select GrossTotal,Date from goodreceive group by BillNo");
				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);
				System.out.println("List size"+list.size());
				for (Object[] object : list) {
					
					SaleReport reports = new SaleReport();
					
					String date = object[0].toString();
	
					/*String dateSplit[] = date.split("-");
					
					String year = dateSplit[0];
					System.out.println(year);
	
					String month = dateSplit[1];
					System.out.println(month);
					
					String day = dateSplit[2];
					System.out.println(day);*/
					
					reports.setTotalAmt(Double.parseDouble(object[0].toString()));
					reports.setSaleDate(object[1].toString());
					catList.add(reports);	
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}
		
		public List getLastTransactionNo()
		{
			// TODO Auto-generated method stub
			HibernateUtility hbu = null;
			Session session = null;
			List<allTransactionId> listTid = null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("SELECT pr.transactionId, pr.PkPurchaseReturnId FROM purchasereturn pr ORDER BY pr.transactionId DESC LIMIT 1;");
				listTid = query.list();
				
				List<Object[]> list = query.list();
				listTid = new ArrayList<allTransactionId>(0);
				for (Object[] object : list)
				{
					System.out.println(Arrays.toString(object));
					allTransactionId reports = new allTransactionId();
					reports.setPurchaseReturnTransactoinId(Long.parseLong(object[0].toString()));
					System.out.println("getPurchaseReturnTransactoinId =============> "+reports.getPurchaseReturnTransactoinId());
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
		
		public void setOfferDiscountDao(String disPercentage, String fromBarC, String toBarC)
		{
			System.out.println("IN DAO setOfferDiscountDao called");
			HibernateUtility hbu = null;
			Session session = null;
			
			System.out.println("disPercentage ===> "+disPercentage);
			System.out.println("fromBarC ===> "+fromBarC);
			System.out.println("toBarC ===> "+toBarC);
			Double disPerc = Double.parseDouble(disPercentage);
			long startBarcode = Long.parseLong(fromBarC);
			long endBarcode = Long.parseLong(toBarC);
			int diff = (int) (endBarcode - startBarcode);
			System.out.println("diff ==============> "+diff);
			int exU = 0;
			try
			{				
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				System.out.println("updating BARCODE ======================> "+startBarcode);
				Query query = session.createQuery("UPDATE GoodReceive SET disPerForBill =:disPerc where barcodeNo BETWEEN :startBarcode AND :endBarcode");
				query.setParameter("disPerc", disPerc);
				query.setParameter("startBarcode", startBarcode);
				query.setParameter("endBarcode", endBarcode);
				Transaction tx = session.beginTransaction();					
				exU = query.executeUpdate();
				tx.commit();
				//startBarcode++;				
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

		public List getFirstBarcode()
		{
			List<Object[]> list = null;
			
			System.out.println("IN DAO setOfferDiscountDao called");
			HibernateUtility hbu = null;
			Session session = null;	
			List<GoodReceive> barcodeList = new ArrayList<GoodReceive>();
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createQuery("SELECT gr.PkGoodRecId, gr.BarcodeNo from goodreceive gr ORDER BY PkGoodRecId ASC LIMIT 1;");
				list = query.list();				
				GoodReceive gr = new GoodReceive();
				for(Object[] object : list)
				{
					gr.setBarcodeNo(Long.parseLong(object[1].toString()));
					barcodeList.add(gr);
				}
			}
			catch(RuntimeException e)
			{
				Log.error("Error in getAllSupplier ", e);
			}
			finally
			{
				if (session != null)
				{
					hbu.closeSession(session);
				}
			}
			return barcodeList; 			
		}
		
		public List getLastVoucherNo()
		{
			HibernateUtility hbu = null;
			Session session = null;
			Query query = null;
			List<Object[]> list = null;
			List<GoodreciveBillBean> listTid = null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				query = session.createSQLQuery("SELECT gr.voucherNo, gr.PkGoodRecId FROM goodreceive gr ORDER BY voucherNo DESC LIMIT 1;");
				list = query.list();				
				listTid = new ArrayList<GoodreciveBillBean>(0);
				for (Object[] object : list) {
					System.out.println(Arrays.toString(object));
					GoodreciveBillBean reports = new GoodreciveBillBean();
					reports.setVoucherNo(Long.parseLong(object[0].toString()));
					System.out.println("getSaleReturnTransactoinId =============> "+reports.getVoucherNo());
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
		
		
		public List getTotalAmountBySupp(String supplierId)
		{
			com.smt.utility.HibernateUtility hbu = null;
			Session session = null;
			List list = null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("SELECT gr.PkGoodRecId, SUM(gr.Total) FROM goodreceive gr where gr.FksuppId = "+supplierId);
				list = query.list();
			}
			catch (Exception e)
			{			
				e.printStackTrace();
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
		
		public List getAllVoucherNumber()
		{
			HibernateUtility hbu = null;
			Session session = null;
			Transaction transaction = null;
			List<ItemList> voucherNoList = null;
			try
			{
				hbu = HibernateUtility.getInstance();
			    session = hbu.getHibernateSession();
			    
			    Query query = session.createSQLQuery("select gr.voucherNo, sd.supplier_name from goodreceive gr JOIN supplier_details sd ON gr.FksuppId = sd.supplier_id GROUP BY gr.voucherNo;");
			    List<Object[]> list = query.list();
			    voucherNoList = new ArrayList<ItemList>();

			    for(Object[] o : list)
			    {	
			    	ItemList bean = new ItemList();			    	
			    	bean.setVoucherNo(o[0].toString());
			    	bean.setSuppName(o[1].toString());
			    	voucherNoList.add(bean);
			    }
			    
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			
			return voucherNoList;
			
		}	
		
		
		public List getProductListGoodReceiveDao()
		{
			HibernateUtility hbu = null;
			Session session = null;
			List<Object[]> list = null;
			List<ItemList> bill = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("select gr.fkProductId, pr.ProductName from goodreceive gr join product_reg pr on gr.fkProductId = pr.pkProductNameId GROUP BY gr.fkProductId;");
				list = query.list();
				bill = new ArrayList<ItemList>(0);
				for (Object[] object : list)
				{
					ItemList reports = new ItemList();
					reports.setPkProductId(object[0].toString());
					reports.setItem_name(object[1].toString());
					bill.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (session != null) {

					hbu.closeSession(session);
				}
			}
			
			System.out.println(Arrays.toString(bill.toArray()));
			
			return bill;
		}
		
		
}
