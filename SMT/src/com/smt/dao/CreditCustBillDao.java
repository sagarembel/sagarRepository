package com.smt.dao;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.bean.BillCopy;
import com.smt.bean.ItemList;
import com.smt.bean.SaleReport;
import com.smt.hibernate.CreditCustomerBill;
import com.smt.hibernate.OtherBill;
import com.smt.utility.HibernateUtility;

public class CreditCustBillDao
{	
	/*public Double getPendingBillPaymentCreditCust(String fkRootCustId)
	{
		System.out.println("11111111 getPendingBillPayment fkRootCust ID =====> "+fkRootCustId);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<CreditCustomerBill> pendingAmtList = null;
		List<Double> lastBillPending = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT ccb.pending_bill_payment FROM creditcustomerbill ccb where ccb.fkCrediCustId = "+fkRootCustId+" ORDER BY ccb.pkCrediBillId DESC LIMIT 1;");
			lastBillPending = query.list();
			
			if(lastBillPending.size() == 0 || lastBillPending.isEmpty() || lastBillPending == null)
			{
				lastBillPending.add(0.0);
			}
			else if(lastBillPending.get(0) < 0 || lastBillPending.get(0) == null)
			{
				lastBillPending.add(0.0);
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
		
			System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0).doubleValue());
			BigDecimal bd1 = BigDecimal.valueOf(lastBillPending.get(0).doubleValue());
			Double lastPendingBill = bd1.doubleValue();
				
		return lastBillPending.get(0).doubleValue();
	}*/
	
	
	public List getPendingBillPaymentCreditCust(String fkRootCustId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<BillBean> saleList = null;
		BillBean reports = new BillBean();
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT ccb.pending_bill_payment FROM creditcustomerbill ccb where ccb.fkCrediCustId = "+fkRootCustId+" ORDER BY ccb.pkCrediBillId DESC LIMIT 1;");

			List<Double> list = query.list();
			saleList = new ArrayList<BillBean>(0);
			
			System.out.println("SIZE OF LIST = >>>>>>>>>>>>>> "+list.size());			
			
			for (Double object : list)
			{	
					System.out.println("============== VALUE IS NOT NULL ============="+object.toString());
					//System.out.println(Arrays.toString(object));					
					reports.setPendingBill(Double.parseDouble(object.toString()));
					saleList.add(reports);
					System.out.println("SALELIST SIZE =========> "+saleList.size());
					System.out.println("VALUE OF LAST PENDING BILL ============> "+reports.getPendingBill());					
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
		return saleList;
	}
	
	
	public void setPendingBillPaymentToCreditCust(double totalBillpending, String fkRootCustId)
	{		
		System.out.println(" 22222222 setPendingBillPaymentToSupp fkRootCust ID =====> "+fkRootCustId);
		System.out.println(" 22222222 setPendingBillPaymentToSupp totalBillpending =====> "+totalBillpending);
		HibernateUtility hbu2 = null;
		Session session2 = null;
		
		hbu2 = HibernateUtility.getInstance();
		session2 = hbu2.getHibernateSession();
		Transaction tx = session2.beginTransaction();
		//Double totalBillpending = (billpending - Double.parseDouble(paidAmt));
		
		Query query2 = session2.createSQLQuery("UPDATE creditcustomerbill ccb set ccb.pending_bill_payment = "+totalBillpending+" where ccb.fkCrediCustId = "+fkRootCustId);
		
		query2.executeUpdate();
		tx.commit();
		
	}
	
	public List getTotalBillAmountOfCust(String fkRootCustId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<BillBean> saleList = null;
		BillBean reports = new BillBean();
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT SUM(ccb.totalperitem) FROM creditcustomerbill ccb where ccb.fkCrediCustId = "+fkRootCustId+" ORDER BY ccb.pkCrediBillId DESC LIMIT 1");

			List<Double> list = query.list();
			saleList = new ArrayList<BillBean>(0);
			
			System.out.println("SIZE OF LIST = >>>>>>>>>>>>>> "+list.size());			
			
			for (Double object : list)
			{	
					System.out.println("============== VALUE IS NOT NULL ============="+object.toString());
					//System.out.println(Arrays.toString(object));					
					reports.setPendingBill(Double.parseDouble(object.toString()));
					saleList.add(reports);
					System.out.println("SALELIST SIZE =========> "+saleList.size());
					System.out.println("VALUE OF LAST PENDING BILL ============> "+reports.getPendingBill());					
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
		return saleList;
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
			Query query = session.createSQLQuery("SELECT BillNo , pkCrediBillId FROM creditcustomerbill ORDER BY BillNo DESC LIMIT 1");

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

	public void regCreditCustomerBill(CreditCustomerBill cust) {
		// TODO Auto-generated method stub

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

	// get bill no to get Bill copy

	public List getBillNo() {
		HibernateUtility hbu = null;
		Session session = null;

		List<BillCopy> billList = null;
		List<Object[]> list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select c.BillNo, s.first_name, s.aadhar_no, s.last_name, CONCAT(s.first_name,' ',s.last_name)  from creditcustomerbill c left join customer_details s on c.fkCrediCustId=s.pk_customer_id group by c.BillNo order by c.BillNo desc;");
			list = query.list();
			billList = new ArrayList<BillCopy>(0);

			for (Object[] objects : list)
			{
				BillCopy bean = new BillCopy();

				bean.setBillNo(Long.parseLong(objects[0].toString()));
				bean.setCustName(objects[1].toString());
				bean.setGstNo(objects[2].toString());
				bean.setLastName(objects[3].toString());
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

	public void DeActivePaymentDone(String billNo) {
		// TODO Auto-generated method stub

		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long bill = Long.parseLong(billNo);
			Query query = session.createQuery("select s.pkCreditBillId,s.paymentDone from CreditCustomerBill s where  s.billNo =:bill");
			query.setParameter("bill", bill);

			List<Object[]> list = query.list();

			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Object[] objects = (Object[]) iterator.next();
				transaction = session.beginTransaction();
				Long pkCreditBillId = Long.parseLong(objects[0].toString());
				System.out.println("deactivation done of " + pkCreditBillId);
				CreditCustomerBill upPayment = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pkCreditBillId));
				upPayment.setPaymentDone("n");

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

	// Single Date Credit Sale Report

	public List<SaleReport> creditSingleDate(Date adate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount, s.Igst, CONCAT(c.first_name,' ',c.last_name), s.SalePWithoutTax, s.perProductdisPer, s.taxAmtAfterDiscount, s.Gst, s.totalperitem from creditcustomerbill s left join customer_details c ON s.fkCrediCustId=c.pk_customer_id where s.Date =:adate AND Quantity>0");
			query2.setParameter("adate", adate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())));
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[6].toString()))));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setFirstName(object[11].toString());

				String gst = object[8].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}

				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem(Double.parseDouble(object[16].toString()));
				//reports.setTotalAmt((double) Math.round(totalAmt));
				reports.setTotalAmt(Double.parseDouble(object[16].toString()));//(Double.parseDouble(df.format(saleTotal - (Double.parseDouble(object[6].toString())))));
				
				reports.setSpWithoutTax(object[12].toString());
				reports.setPerProductDisPer(object[13].toString());
				reports.setAfterDisTaxAmt(object[14].toString());
				reports.setGst((Double)object[15]);
				
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}

	// Two Date Credit Sale Report
	public List<SaleReport> creditTwoDate(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount, s.Igst, CONCAT(c.first_name,' ',c.last_name), s.SalePWithoutTax, s.perProductdisPer, s.taxAmtAfterDiscount, s.Gst, s.totalperitem, s.Date from creditcustomerbill s left join customer_details c ON s.fkCrediCustId=c.pk_customer_id where s.Date BETWEEN :adate AND :bdate AND Quantity>0");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())));
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[6].toString()))));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setFirstName(object[11].toString());

				String gst = object[8].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}

				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem(Double.parseDouble(object[16].toString()));
				/*reports.setTotalAmt((double) Math.round(totalAmt));*/
				reports.setTotalAmt(Double.parseDouble(object[16].toString()));//(Double.parseDouble(df.format(saleTotal - (Double.parseDouble(object[6].toString())))));
				
				reports.setSpWithoutTax(object[12].toString());
				reports.setPerProductDisPer(object[13].toString());
				reports.setAfterDisTaxAmt(object[14].toString());
				reports.setGst((Double)object[15]);
				reports.setSaleDate(object[17].toString());
				
				
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}

	// Category Wise Credit Sale Report
	public List<SaleReport> creditSaleWiseCustomer(String cscatId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount, s.Igst, CONCAT(c.first_name,' ',c.last_name), s.SalePWithoutTax, s.perProductdisPer, s.taxAmtAfterDiscount, s.totalperitem, s.Date from creditcustomerbill s left join customer_details c ON s.fkCrediCustId=c.pk_customer_id where s.fkCatId =:cscatId AND Quantity>0");
			query2.setParameter("cscatId", cscatId);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[6].toString()))));
				
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setFirstName(object[11].toString());

				String gst = object[8].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}

				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) (Double)object[15]);
				//reports.setTotalAmt((double) Math.round(totalAmt));
				reports.setTotalAmt((Double)object[15]);//(Double.parseDouble(df.format(saleTotal - (Double.parseDouble(object[6].toString())))));
				reports.setGst((Double)object[8]);
				reports.setSpWithoutTax(object[12].toString());
				reports.setPerProductDisPer(object[13].toString());
				reports.setAfterDisTaxAmt(object[14].toString());
				reports.setSaleDate(object[16].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}
	
	
	
	//CREDIT CUST PRODUCT WISE REPORT
	public List<SaleReport> creditProductWiseSaleDao(String csProductId) {
		// TODO Auto-generated method stub
		System.out.println("csProductId ===> "+csProductId);
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount, s.Igst, CONCAT(c.first_name,' ',c.last_name), s.SalePWithoutTax, s.perProductdisPer, s.taxAmtAfterDiscount, s.totalperitem, s.Date from creditcustomerbill s left join customer_details c ON s.fkCrediCustId=c.pk_customer_id where s.fkProductId =:csProductId AND Quantity>0");
			query2.setParameter("csProductId", csProductId);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[6].toString()))));
				
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setFirstName(object[11].toString());

				String gst = object[8].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}

				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) (Double)object[15]);
				//reports.setTotalAmt((double) Math.round(totalAmt));
				reports.setTotalAmt((Double)object[15]);//(Double.parseDouble(df.format(saleTotal - (Double.parseDouble(object[6].toString())))));
				reports.setGst((Double)object[8]);
				reports.setSpWithoutTax(object[12].toString());
				reports.setPerProductDisPer(object[13].toString());
				reports.setAfterDisTaxAmt(object[14].toString());
				reports.setSaleDate(object[16].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}
	
	
	
	

	// Bill No Wise Credit Sale Report
	public List<SaleReport> billnowiseCreditsell(long csBillNocust) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount, s.Igst, CONCAT(c.first_name,' ',c.last_name), s.SalePWithoutTax, s.perProductdisPer, s.taxAmtAfterDiscount, s.totalperitem, s.Date from creditcustomerbill s left join customer_details c ON s.fkCrediCustId=c.pk_customer_id where s.BillNo =:csBillNocust AND Quantity>0");
			query2.setParameter("csBillNocust", csBillNocust);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[6].toString()))));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setFirstName(object[11].toString());

				String gst = object[8].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}

				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem(Double.parseDouble(object[15].toString()));
				//reports.setTotalAmt((double) Math.round(totalAmt));
				reports.setTotalAmt((Double)(object[15]));//(Double.parseDouble(df.format(saleTotal - (Double.parseDouble(object[6].toString())))));
				
				reports.setGst((Double)object[8]);
				reports.setSpWithoutTax(object[12].toString());
				reports.setPerProductDisPer(object[13].toString());
				reports.setAfterDisTaxAmt(object[14].toString());
				reports.setSaleDate(object[16].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Barcode No Wise Credit Sale Report
	public List<SaleReport> barcodenowiseCredit(long barcodeCredit) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount, s.Igst, CONCAT(c.first_name,' ',c.last_name), s.SalePWithoutTax, s.perProductdisPer, s.taxAmtAfterDiscount, s.totalperitem, s.Date from creditcustomerbill s left join customer_details c ON s.fkCrediCustId=c.pk_customer_id where s.BarcodeNo =:barcodeCredit AND Quantity>0");
			query2.setParameter("barcodeCredit", barcodeCredit);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())));
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[6].toString()))));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setFirstName(object[11].toString());

				String gst = object[8].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0"))
				{
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0"))
				{
					reports.setGst(Double.parseDouble(gst));
				}

				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem(Double.parseDouble(object[15].toString()));
				//reports.setTotalAmt((double) Math.round(totalAmt));
				reports.setTotalAmt((Double)object[15]);//Double.parseDouble(df.format(saleTotal - (Double.parseDouble(object[6].toString())))));
				
				reports.setSpWithoutTax(object[12].toString());
				reports.setPerProductDisPer(object[13].toString());
				reports.setAfterDisTaxAmt(object[14].toString());
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setSaleDate(object[16].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public void creditCustomerUpdateBill(CreditCustomerBill cust)
	{
		System.out.println("credit Customer BILL EDIT DAO");
		
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
	
	public List getCreditCustSaleProductListDao()
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		List<ItemList> bill = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("Select ccb.fkProductId, pr.ProductName from creditcustomerbill ccb join product_reg pr on ccb.fkProductId=pr.pkProductNameId GROUP BY ccb.fkProductId;");
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
	
	
	//get sale details between two date as per user FOR CREDIT CUSTOMER
	
	public List<SaleReport> getSaleDetailsBetweenTwoDates_asPerUser(String uType, String userId, String adate, String bdate, String userType, String userName)
	{
		// TODO Auto-generated method stub
		
		
		//LOGGED IN USER
/*		userType
		userName      */
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			
			System.out.println("uType ===> "+uType);
			System.out.println("userId ===> "+userId);
			System.out.println("adate ===> "+adate);
			System.out.println("bdate ===> "+bdate);
			
			//LOGGED IN USER
			if(userType.equalsIgnoreCase("admin"))
			{
				query2 = session.createSQLQuery("select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice, totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND EmpType=:uType AND EmpId_Fk=:uId AND Quantity > 0 UNION ALL select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice,totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, ccb.Date, sb.subcat_name from creditcustomerbill ccb join categories ct on ccb.fkCatId=ct.pk_category_id JOIN sub_categories sb on ccb.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND cEmpType=:uType AND cEmpIdFk=:uId AND Quantity > 0");
				query2.setParameter("adate", adate);
				query2.setParameter("bdate", bdate);
				query2.setParameter("uType", uType);
				query2.setParameter("uId", userId);
			}
			else
			{
				query2 = session.createSQLQuery("select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice, totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND Quantity > 0 AND EmpType != 'admin' UNION ALL select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice,totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, ccb.Date, sb.subcat_name from creditcustomerbill ccb join categories ct on ccb.fkCatId=ct.pk_category_id JOIN sub_categories sb on ccb.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND Quantity > 0 AND cEmpType != 'admin'");
				query2.setParameter("adate", adate);
				query2.setParameter("bdate", bdate);
			}
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				String quantity = object[7].toString();
				if (quantity.equals("0")) {
					continue;

				} else {
				reports.setSrNo(k);
				reports.setBillNo(Long.parseLong(object[0].toString()));
				/*reports.setCarNo(object[1].toString());*/
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				DecimalFormat f = new DecimalFormat("##.00");
				String sp = f.format(object[4]);
				reports.setSalePrice(Double.parseDouble(sp));
				/*reports.setOwnerName(object[6].toString());
				reports.setContactNo(Long.parseLong(object[7].toString()));*/
				reports.setTotalAmt((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
				reports.setDiscount((double) Math.round(Double.parseDouble(object[6].toString())*100.0)/100.0);
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				total = (Double) object[5];
				discount = (Double) object[6];
				grossAmt = total - discount;
				reports.setGrossamt((Double) object[5]);
				reports.setSpWithoutTax(object[8].toString());
				reports.setPerProductDisPer(object[9].toString());
				reports.setAfterDisTaxAmt(object[10].toString());
				reports.setGst(Double.parseDouble(object[11].toString()));
				reports.setSaleDate(object[12].toString());
				reports.setSubCatName(object[13].toString());
				k++;
				}
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	
	public List<SaleReport> paymentModeWiseReportDaoForCreditCust(String startDateForCC, String endDateForCC, String paymentModeForCC, String userTypeRole, String userName)
	{		
			System.out.println("adate DAO =========> "+startDateForCC);
			// TODO Auto-generated method stub
			HibernateUtility hbu = null;
			Session session = null;
			Query query2 = null;
			List<SaleReport> catList = null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Long k = 1l;
				Double total = 0.0;
				Double discount = 0.0;
				Double grossAmt = 0.0;
				if(userTypeRole.equalsIgnoreCase("admin"))
				{
					query2 = session.createSQLQuery("select o.BillNo, o.GrossTotal, o.payment_mode, (cd.first_name+' '+cd.last_name), cashCard_cashAmount, cashCard_cardAmount, o.Date, totalSaleReturnAmt from creditcustomerbill o join customer_details cd on o.fkCrediCustId = cd.pk_customer_id where o.payment_mode = :paymentModeForCC AND o.Date BETWEEN :startDateForCC AND :endDateForCC GROUP BY o.BillNo;");
				}
				else
				{
					query2 = session.createSQLQuery("select o.BillNo, o.GrossTotal, o.payment_mode, (cd.first_name+' '+cd.last_name), cashCard_cashAmount, cashCard_cardAmount, o.Date, totalSaleReturnAmt from creditcustomerbill o join customer_details cd on o.fkCrediCustId = cd.pk_customer_id where o.payment_mode= :paymentModeForCC AND o.Date BETWEEN :startDateForCC AND :endDateForCC AND EmpType != 'admin' GROUP BY o.BillNo;");
				}

				query2.setParameter("startDateForCC", startDateForCC);
				query2.setParameter("endDateForCC", endDateForCC);
				query2.setParameter("paymentModeForCC", paymentModeForCC);
				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list)
				{

					SaleReport reports = new SaleReport();
					
				 {
					reports.setSrNo(k);
					reports.setBillNo(Long.parseLong(object[0].toString()));
					
					reports.setPaymentMode(object[2].toString());
					
					if(object[3] == null || object[3].toString().isEmpty())
					{
						reports.setCustomerName("N/A");
					}
					else
					{
						reports.setCustomerName(object[3].toString());
					}
					
					reports.setCashAndCard_cashAmount(object[4].toString());
					reports.setCashAndCard_cardAmount(object[5].toString());
					reports.setSaleDate(object[6].toString());
					reports.setGrossamt(Double.parseDouble(object[4].toString()) + Double.parseDouble(object[5].toString()) + Double.parseDouble(object[7].toString()));
					reports.setTotalSaleReturnAmt(object[7].toString());
					
					k++;
				}
					catList.add(reports);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}
	
	
	public void updateCreditCustomerBill(CreditCustomerBill cust)
	{
		System.out.println("IN CONTROLLER BILL EDIT DAO");
		
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
