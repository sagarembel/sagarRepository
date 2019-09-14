package com.smt.dao;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.bean.BillCopy;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleReport;
import com.smt.hibernate.OtherBill;
import com.smt.utility.HibernateUtility;

public class OtherBillDao {

	public void registerBill(OtherBill cust) {
		// TODO Auto-generated method stub
		System.out.println("hi this is vikas in other bill DAO ************");
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			session.save(cust);
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

	// get Last Bill No
	public List getLastBillNo()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<BillBean> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT BillNo, pkOtherBillId FROM otherbill ORDER BY BillNo DESC LIMIT 1");

			List<Object[]> list = query.list();
			saleList = new ArrayList<BillBean>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				BillBean reports = new BillBean();
				reports.setBillNo(Long.parseLong(object[0].toString()));
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

	// get bill no to get Bill copy

	public List getBillNo() {
		HibernateUtility hbu = null;
		Session session = null;

		List<BillCopy> billList = null;
		List<Object[]> list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select BillNo, pkOtherBillId from otherbill group by BillNo order by BillNo desc;");
			list = query.list();
			billList = new ArrayList<BillCopy>(0);

			for (Object[] objects : list) {
				BillCopy bean = new BillCopy();

				bean.setBillNo(Long.parseLong(objects[0].toString()));
				billList.add(bean);
			}
		} catch (RuntimeException e) {

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return billList;
	}

	// get single date Miscellaneos customer Sale
	public List<SaleReport> miscellaneousSingleDate(String adate) {
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+adate);
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DecimalFormat df = new DecimalFormat("#.##");
			Long k = 1l;
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))) from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BillReturnDate =:adate AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			query2.setParameter("adate", adate);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	//Credit Sale return report
	
	public List<SaleReport> CSRSingleDate(String adate) {
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+adate);
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DecimalFormat df = new DecimalFormat("#.##");
			Long k = 1l;
			String qty="0";
			String custType = "Credit Customer";
			
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, pr.ProductName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))) from salereturn sr join categories ct on sr.catId = ct.pk_category_id join product_reg pr on sr.productId = pr.pkProductNameId WHERE sr.BillReturnDate=:adate AND sr.ReturnQuantuty >:qty AND Customer_Type=:custType");
			query2.setParameter("adate", adate);
			query2.setParameter("qty", qty);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	
	// get Two date Miscellaneos customer Sale
	public List<SaleReport> miscellaneousTwoDate(String adate, String bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";
			System.out.println("hi vikas your in Tax invoice sale return ");
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where (s.Date BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where (sr.BillReturnDate BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
			
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));				

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);				
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				reports.setSaleReturnDate(object[11].toString());
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	
	
	// get Two date Credit customer Sale Return
		public List<SaleReport> CCSRTwoDate(String adate, String bdate) {
			// TODO Auto-generated method stub
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Long k = 1l;
				String qty1="1";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where (s.Date BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))) from salereturn sr where (sr.BillReturnDate BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty =:qty AND Customer_Type=:custType");
				
				query2.setParameter("adate", adate);
				query2.setParameter("bdate", bdate);
				query2.setParameter("qty", qty1);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);
				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
				
					reports.setSrNo(k);
					reports.setBillNo(Long.parseLong(object[0].toString()));
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}
	
	
	// get category wise Miscellaneos customer Sale
	public List<SaleReport> miscellaneousSaleWiseCustomer(String mscatId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";

			
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.CategoryName =:mscatId AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.category_name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.catId =:mscatId AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			
			query2.setParameter("mscatId", mscatId);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				reports.setSaleReturnDate(object[11].toString());
				
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	
	// get category wise Credit customer Sale return
		public List<SaleReport> CCSRSaleWiseCustomer(String mscatId) {
			// TODO Auto-generated method stub
			
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				System.out.println("hi vikas your in dao");
				Long k = 1l;
				String qty = "1";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.CategoryName =:mscatId AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr where sr.catId =:mscatId AND sr.ReturnQuantuty =:qty AND Customer_Type=:custType");
				
				query2.setParameter("mscatId", mscatId);
				query2.setParameter("qty", qty);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);

				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
					
					reports.setSrNo(k);
					reports.setBillNo(Long.parseLong(object[0].toString()));
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					reports.setSaleReturnDate(object[11].toString());
					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}	
	
	// get Bill no wise Miscellaneos customer Sale
	public List<SaleReport> billnowiseMiscellaneoussell(long msBillNocust) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BillNo =:msBillNocust AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.category_name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BillNo =:msBillNocust AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			query2.setParameter("msBillNocust", msBillNocust);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				reports.setSaleReturnDate(object[11].toString());
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	// get Bill no wise Credit customer Sale return report
		public List<SaleReport> billnowiseCCSR(long msBillNocust) {
			// TODO Auto-generated method stub
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Long k = 1l;
				//String qty = "0";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BillNo =:msBillNocust AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from  salereturn sr where sr.BillNo =:msBillNocust AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
				query2.setParameter("msBillNocust", msBillNocust);
				//query2.setParameter("qty", qty);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);
				

				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
					
					reports.setSrNo(k);
					reports.setBillNo(Long.parseLong(object[0].toString()));
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					reports.setSaleReturnDate(object[11].toString());		

					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					reports.setCustomerName(object[8].toString());
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}

	// Barcode No Wise Miscellaneos Sale Report
	public List<SaleReport> barcodenowiseMiscellaneoussell(long barcodeMiscellaneous) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			query2.setParameter("barcodeMiscellaneous", barcodeMiscellaneous);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);			

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(Double.parseDouble(object[5].toString()));
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));	
				reports.setSaleReturnDate(object[11].toString());
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	// Barcode No Wise Miscellaneos Sale Report
		public List<SaleReport> barcodenowiseCCSR(long barcodeMiscellaneous) {
			// TODO Auto-generated method stub
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Long k = 1l;
				String qty = "1";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr where sr.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty =:qty AND Customer_Type=:custType");
				query2.setParameter("barcodeMiscellaneous", barcodeMiscellaneous);
				query2.setParameter("qty", qty);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);
				

				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
					
					reports.setSrNo(k);
					reports.setBillNo(Long.parseLong(object[0].toString()));
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					reports.setSaleReturnDate(object[11].toString());

					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}
	
	//this dao for get Emp Details
	
	public List getEmployeeNameforGrid() {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;	
		try
		{
			hbu = HibernateUtility.getInstance();
			System.out.println("grid emp in Dao befor Query ");
			session = hbu.getHibernateSession();
			System.out.println("grid emp in after Query");
			Query query = session.createSQLQuery("SELECT CONCAT(pk_empoyee_id,' ',first_name,' ',last_name) FROM employee_details WHERE ISNULL(resignDate);");
			list = query.list();
			
		} 
		catch (RuntimeException e) 
		{
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List<PurchaseReportBean> purchaseReturnSingleDateDao(String adate)
	{
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+adate);
		HibernateUtility hbu = null;
		Session session = null;

		List<PurchaseReportBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select pr.BillNo, pr.BarcodeNo, ct.Category_name, pr.ItemName, pr.ReturnQuantity, pr.BuyPrice, pr.vat, pr.Return_Total, pr.discount, pr.rollsize, pr.ReturnDate, pr.igst, pr.discountAmount, pr.taxAmount from purchasereturn pr join categories ct on pr.fkcatId=ct.pk_category_id where pr.ReturnDate =:adate AND pr.ReturnQuantity>0");
			query2.setParameter("adate", adate);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list)
			{
				PurchaseReportBean reports = new PurchaseReportBean();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setReturnQuantity(Double.parseDouble(object[4].toString()));
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				if(Double.parseDouble(object[6].toString()) > 0)
				{
					reports.setVat(Double.parseDouble(object[6].toString()));
				}
				else
				{
					reports.setVat(Double.parseDouble(object[11].toString()));
				}
				reports.setReturnAmount(object[7].toString());
				reports.setDisPer(object[8].toString());
				reports.setRollSize(Double.parseDouble(object[9].toString()));
				reports.setOndate(object[10].toString());
				reports.setDiscountAmount(object[12].toString());
				reports.setTaxAmount(Double.parseDouble(object[13].toString()));
				
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<PurchaseReportBean> purchaseReturnRangeWiseDao(String pRFisDate, String pREndDate)
	{
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+pRFisDate+" "+pREndDate);
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, ct.Category_name, sr.ItemName, sr.ReturnQuantity, sr.BuyPrice, sr.vat, sr.Return_Total, sr.discount, sr.rollsize, sr.ReturnDate, sr.igst, sr.discountAmount, sr.taxAmount from purchasereturn sr join categories ct on sr.fkcatId=ct.pk_category_id where sr.ReturnDate between :pRFisDate AND :pREndDate AND sr.ReturnQuantity>0");
			query2.setParameter("pRFisDate", pRFisDate);
			query2.setParameter("pREndDate", pREndDate);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list) {

				PurchaseReportBean reports = new PurchaseReportBean();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setReturnQuantity(Double.parseDouble(object[4].toString()));
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				if(Double.parseDouble(object[6].toString()) > 0)
				{
					reports.setVat(Double.parseDouble(object[6].toString()));
				}
				else
				{
					reports.setVat(Double.parseDouble(object[11].toString()));
				}
				reports.setReturnAmount(object[7].toString());
				reports.setDisPer(object[8].toString());
				reports.setRollSize(Double.parseDouble(object[9].toString()));
				reports.setOndate(object[10].toString());
				reports.setDiscountAmount(object[12].toString());
				reports.setTaxAmount(Double.parseDouble(object[13].toString()));
				
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<PurchaseReportBean> purchaseReturnBillNoWiseDao(String pRBillNo, String suppName, String suppId)
	{
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+pRBillNo);
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, ct.Category_name, sr.ItemName, sr.ReturnQuantity, sr.BuyPrice, sr.vat, sr.Return_Total, sr.discount, sr.rollsize, sr.ReturnDate, sr.igst, sr.discountAmount, sr.taxAmount from purchasereturn sr join categories ct on sr.fkcatId=ct.pk_category_id where sr.BillNo=:pRBillNo AND supplierName=:suppName AND fkSuppId=:suppId AND sr.ReturnQuantity>0");
			query2.setParameter("pRBillNo", pRBillNo);
			query2.setParameter("suppName", suppName);
			query2.setParameter("suppId", suppId);
			System.out.println("suppName ==========> "+suppName);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list)
			{
				PurchaseReportBean reports = new PurchaseReportBean();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setReturnQuantity(Double.parseDouble(object[4].toString()));
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				if(Double.parseDouble(object[6].toString()) > 0)
				{
					reports.setVat(Double.parseDouble(object[6].toString()));
				}
				else
				{
					reports.setVat(Double.parseDouble(object[11].toString()));
				}
				reports.setReturnAmount(object[7].toString());
				reports.setDisPer(object[8].toString());
				reports.setRollSize(Double.parseDouble(object[9].toString()));
				reports.setOndate(object[10].toString());
				reports.setDiscountAmount(object[12].toString());
				reports.setTaxAmount(Double.parseDouble(object[13].toString()));
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public void updateBill(OtherBill cust)
	{
		System.out.println("BILL EDIT DAO");
		
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.update(cust);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}
	

}
