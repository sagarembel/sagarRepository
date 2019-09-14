package com.smt.utility;

import java.io.File;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.bean.ClientDetails;
import com.smt.bean.PurchaseReport;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleReport;

public class SendReports
{		
	String pattern = "yyyy-MM-dd";
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	String todayDate = simpleDateFormat.format(new Date());
	String shopName = ClientDetails.getShopName();
	
	
	public void sendTodaySaleReport()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Double totalTodaySaleAmt = 0.0;
		try
		{
			PrintWriter pw = new PrintWriter(new File("E:\\databackup\\TodaySaleReport.csv"));
			StringBuilder sb = new StringBuilder();					
			
			System.out.println("sendTodaySaleReport Today Date =============> "+todayDate);
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			Query query2 = session.createSQLQuery("select o.BillNo, o.BarcodeNo, ct.category_name, sb.subcat_name, o.ItemName, o.Quantity, o.SalePrice, o.Discount, o.Gst, o.TaxAmount, o.totalperitem from otherbill o JOIN categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pd on o.fkProductId=pd.pkProductNameId where o.Date = :todayDate AND o.Quantity>0");
			query2.setParameter("todayDate", todayDate);
			List<Object[]> list = query2.list();
			System.out.println("TODAY SALE LIST ========> "+list.size());
			
			sb.append("Date "+todayDate);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sale Report of "+shopName);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sr. No.");
			sb.append(",");
			sb.append("Bill No.");
			sb.append(",");
			sb.append("barcode No.");
			sb.append(",");
			sb.append("Category Name");
			sb.append(",");
			sb.append("Sub Category");
			sb.append(",");
			sb.append("Product Name");
			sb.append(",");	
			sb.append("Quantity");
			sb.append(",");
			sb.append("Sale Price");
			sb.append(",");
			sb.append("Discount");
			sb.append(",");
			sb.append("GST %");
			sb.append(",");
			sb.append("GST Amount");
			sb.append(",");
			sb.append("Total Per Product");
			sb.append(",");			
			
			sb.append("\r\n");
			for (Object[] object : list)
			{									
				sb.append(String.valueOf(k));
				sb.append(",");
				sb.append(object[0].toString());
				sb.append(",");
				sb.append(object[1].toString());
				sb.append(",");
				sb.append(object[2].toString());
				sb.append(",");
				sb.append(object[3].toString());
				sb.append(",");
				sb.append(object[4].toString());
				sb.append(",");
				sb.append(object[5].toString());
				sb.append(",");		
				sb.append(object[6].toString());
				sb.append(",");
				sb.append(object[7].toString());
				sb.append(",");								
				sb.append(object[8].toString());
				sb.append(",");		
				sb.append(object[9].toString());
				sb.append(",");
				sb.append(object[10].toString());
				sb.append(",");
							
				sb.append("");
				sb.append(",");
				sb.append("\r\n");
								
				totalTodaySaleAmt = totalTodaySaleAmt+Double.parseDouble(object[10].toString());			
		
				k++;
			}
			sb.append(todayDate+" TODAY TOTAL SALE AMOUNT = "+String.valueOf(totalTodaySaleAmt));
			sb.append(",");
			pw.write(sb.toString());
			pw.close();
		} 
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public void sendTodayPurchaseReport()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		try
		{			
			PrintWriter pw = new PrintWriter(new File("E:\\databackup\\TodayPurchaseReport.csv"));
			StringBuilder sb = new StringBuilder();
			
			System.out.println("sendTodayPurchaseReport Today Date =============> "+todayDate);
			
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
			Double totalTodayPurchaseAmt = 0.0;

			Query query2 = session.createSQLQuery("select s.BillNo, c.supplier_name, ct.category_name, sb.subcat_name, pd.ProductName, s.HsnSacNo, s.style, s.BarcodeQty, s.BuyPrice, s.SalePrice, s.Discount, s.Vat, s.igst, s.TaxAmount, s.Total, s.GrossTotal from goodreceive s JOIN supplier_details c ON s.FksuppId=c.supplier_id JOIN categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pd on s.fkProductId=pd.pkProductNameId where s.Date = :todayDate");
			query2.setParameter("todayDate", todayDate);
			
			List<Object[]> list = query2.list();	
			System.out.println("TODAY PURCHASE LIST ========> "+list.size());
			DecimalFormat df = new DecimalFormat("#.##");
			
			sb.append("Date "+todayDate);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Purchase Report of "+shopName);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sr. No.");
			sb.append(",");
			sb.append("Bill No.");
			sb.append(",");
			sb.append("Supplier Name");
			sb.append(",");
			sb.append("Category");
			sb.append(",");
			sb.append("Sub Category");
			sb.append(",");
			sb.append("Product Name");
			sb.append(",");
			sb.append("HSN/SAC No.");
			sb.append(",");
			sb.append("Style");
			sb.append(",");
			sb.append("Quantity");
			sb.append(",");
			sb.append("Buy Price");
			sb.append(",");
			sb.append("Sale Price");
			sb.append(",");
			sb.append("Discount %");
			sb.append(",");
			sb.append("GST %");
			sb.append(",");
			sb.append("IGST %");
			sb.append(",");
			sb.append("Tax Amount");
			sb.append(",");
			sb.append("Total Amount");
			sb.append(",");
			sb.append("Gross Amount");
			sb.append(",");
			sb.append("\r\n");
			
			for (Object[] object : list)
			{
				
				gst = Double.parseDouble(object[7].toString());
				iGst = Double.parseDouble(object[8].toString());
				k++;
				
				sb.append(k);
				sb.append(",");
				sb.append(object[0].toString());
				sb.append(",");
				sb.append(object[1].toString());
				sb.append(",");
				sb.append(object[2].toString());
				sb.append(",");
				sb.append(object[3].toString());
				sb.append(",");
				sb.append(object[4].toString());
				sb.append(",");
				sb.append(object[5].toString());
				sb.append(",");
				sb.append(object[6].toString());
				sb.append(",");
				sb.append(object[7].toString());
				sb.append(",");
				sb.append(object[8].toString());
				sb.append(",");
				sb.append(object[9].toString());
				sb.append(",");
				sb.append(object[10].toString());
				sb.append(",");
				sb.append(object[11].toString());
				sb.append(",");
				sb.append(object[12].toString());
				sb.append(",");
				sb.append(object[13].toString());
				sb.append(",");
				sb.append(object[14].toString());
				sb.append(",");
				sb.append(object[15].toString());
				sb.append(",");
				sb.append("\r\n");
				
				totalTodayPurchaseAmt = ((double) Math.round(Double.parseDouble(object[15].toString())*100.0)/100.0);				
			}
			
			sb.append(todayDate+" TODAY TOTAL PURCHASE AMOUNT = "+df.format(totalTodayPurchaseAmt));
			sb.append(",");
			pw.write(sb.toString());
			pw.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}	
	}	
	
	public void sendTodaySaleReturnReport()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Double totalTodaySaleReturnAmt = 0.0;
		try
		{
			System.out.println("sendTodaySaleReturnReport Today Date =============> "+todayDate);
			
			PrintWriter pw = new PrintWriter(new File("E:\\databackup\\TodaySaleReturnReport.csv"));
			StringBuilder sb = new StringBuilder();
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DecimalFormat df = new DecimalFormat("#.##");
			Long k = 1l;
			
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, ct.category_name, sb.subcat_name, pd.ProductName, sr.ReturnQuantuty, sr.SalePrice, sr.Discount, sr.gst, sr.taxAmount, sr.Return_Total from salereturn sr JOIN categories ct on sr.catId = ct.pk_category_id JOIN sub_categories sb on sr.subCatId=sb.pk_subcat_id JOIN product_reg pd on sr.productId = pd.pkProductNameId where sr.BillReturnDate = :todayDate AND sr.ReturnQuantuty > 0");
			query2.setParameter("todayDate", todayDate);

			List<Object[]> list = query2.list();
			System.out.println("TODAY SALE RETURN LIST ========> "+list.size());
			
			sb.append("Date "+todayDate);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sale Return Report of "+shopName);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sr. No.");
			sb.append(",");
			sb.append("Bill No.");
			sb.append(",");
			sb.append("Barcode No.");
			sb.append(",");
			sb.append("Category");
			sb.append(",");
			sb.append("Sub Category");
			sb.append(",");
			sb.append("Product Name");
			sb.append(",");
			sb.append("Return Quantity");
			sb.append(",");
			sb.append("Sale Price");
			sb.append(",");
			sb.append("Discount Amount");
			sb.append(",");	
			sb.append("GST %");
			sb.append(",");
			sb.append("GST Amount");
			sb.append(",");		
			sb.append("Return Amount");
			sb.append(",");		
			sb.append("\r\n");
			
			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
				
				sb.append(k);
				sb.append(",");		
				sb.append(object[0].toString());
				sb.append(",");		
				sb.append(object[1].toString());
				sb.append(",");		
				sb.append(object[2].toString());
				sb.append(",");		
				sb.append(object[3].toString());
				sb.append(",");		
				sb.append(object[4].toString());
				sb.append(",");		
				sb.append(object[5].toString());
				sb.append(",");		
				sb.append(object[6].toString());
				sb.append(",");		
				sb.append(object[7].toString());
				sb.append(",");		
				sb.append(object[8].toString());
				sb.append(",");		
				sb.append(object[9].toString());
				sb.append(",");
				sb.append(object[10].toString());
				sb.append(",");
				sb.append("\r\n");
				k++;				
				totalTodaySaleReturnAmt = totalTodaySaleReturnAmt + (Double.parseDouble(object[10].toString()));
			}
			sb.append(todayDate+" TODAY TOTAL SALE RETURN AMOUNT = "+String.valueOf(totalTodaySaleReturnAmt));
			sb.append(",");
			pw.write(sb.toString());
			pw.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public void sendTodayPurchaseReturnReport()
	{
		// TODO Auto-generated method stub
		
		System.out.println("sendTodayPurchaseReturnReport Today Date ===>  "+todayDate);
		HibernateUtility hbu = null;
		Session session = null;

		List<PurchaseReportBean> catList = null;
		try
		{
			PrintWriter pw = new PrintWriter(new File("E:\\databackup\\TodayPurchaseReturnReport.csv"));
			StringBuilder sb = new StringBuilder();			
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			Double totalTodayPurchaseReturnAmt = 0.0;
			
			Query query2 = session.createSQLQuery("select pr.BillNo, sd.supplier_name, ct.category_name, sb.subcat_name, pd.ProductName, gr.HsnSacNo, gr.style, pr.ReturnQuantity, pr.BuyPrice, pr.discount, pr.vat, pr.igst, pr.taxAmount, pr.Return_Total, pr.rollsize, pr.ReturnDate, pr.discountAmount, pr.BarcodeNo from purchasereturn pr join supplier_details sd on pr.fkSuppId=sd.supplier_id join categories ct on pr.fkCatId=ct.pk_category_id join sub_categories sb on pr.fkSubCatId=sb.pk_subcat_id join goodreceive gr ON pr.BarcodeNo=gr.BarcodeNo JOIN product_reg pd on pr.fkProductId = pd.pkProductNameId WHERE pr.ReturnDate = :todayDate AND pr.ReturnQuantity>0");
			query2.setParameter("todayDate", todayDate);
			
			List<Object[]> list = query2.list();			
			System.out.println("TODAY PURCHASE RETURN LIST ========> "+list.size());
			
			sb.append("Date "+todayDate);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sale Return Report of "+shopName);
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sr. No.");
			sb.append(",");
			sb.append("Bill No.");
			sb.append(",");
			sb.append("Supplier Name");
			sb.append(",");
			sb.append("Category");
			sb.append(",");
			sb.append("Sub Category");
			sb.append(",");
			sb.append("Product Name");
			sb.append(",");
			sb.append("HSN/SAC");
			sb.append(",");
			sb.append("Style");
			sb.append(",");			
			sb.append("Return Quantity");
			sb.append(",");
			sb.append("Buy Price");
			sb.append(",");
			sb.append("Discount %");
			sb.append(",");
			sb.append("GST %");
			sb.append(",");
			sb.append("IGST %");
			sb.append(",");
			sb.append("Tax Amount");
			sb.append(",");
			sb.append("Return Amount");
			sb.append(",");					
			sb.append("\r\n");

			for (Object[] object : list)
			{
				PurchaseReportBean reports = new PurchaseReportBean();
				
				sb.append(k);
				sb.append(",");	
				sb.append(object[0].toString());
				sb.append(",");	
				sb.append(object[1].toString());
				sb.append(",");	
				sb.append(object[2].toString());
				sb.append(",");	
				sb.append(object[3].toString());
				sb.append(",");	
				sb.append(object[4].toString());
				sb.append(",");	
				sb.append(object[5].toString());
				sb.append(",");	
				sb.append(object[6].toString());
				sb.append(",");					
				sb.append(object[7].toString());
				sb.append(",");	
				sb.append(object[8].toString());
				sb.append(",");	
				sb.append(object[9].toString());
				sb.append(",");
				sb.append(object[10].toString());
				sb.append(",");	
				sb.append(object[11].toString());
				sb.append(",");
				sb.append(object[12].toString());
				sb.append(",");	
				sb.append(object[13].toString());
				sb.append(",");					
				sb.append("\r\n");				
				k++;				
				totalTodayPurchaseReturnAmt = totalTodayPurchaseReturnAmt + (Double.parseDouble(object[13].toString()));
			}
			
			sb.append(todayDate+" TODAY TOTAL SALE RETURN AMOUNT = "+String.valueOf(totalTodayPurchaseReturnAmt));
			sb.append(",");
			pw.write(sb.toString());
			pw.close();
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
}
