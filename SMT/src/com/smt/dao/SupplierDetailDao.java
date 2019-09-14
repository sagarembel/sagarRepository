package com.smt.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.BillCopy;
import com.smt.bean.CustomerBean;
import com.smt.bean.GetSupplierDetails;
import com.smt.bean.PurchaseReturnGetItems;
import com.smt.bean.SupplierEditBean;
import com.smt.bean.SupplierListBean;
import com.smt.bean.SupplierWiseSaleReport;
import com.smt.hibernate.SupplierDetail;
import com.smt.utility.HibernateUtility;

public class SupplierDetailDao {

	public void valSupplierDetail(SupplierDetail supplierDetail) {
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(supplierDetail);
			transaction.commit();

		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

	public List getAllSupplier()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from SupplierDetail");
			list = query.list();

		} catch (RuntimeException e) {
			Log.error("Error in getAllSupplier ", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}	
	
	public List getAllSupplierForCashBook()
	{
		
		System.out.println(" ======= In supplier List DAO ======= ");
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<SupplierDetail> supList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select sd.supplier_id, sd.supplier_name from supplier_details sd join goodreceive gr on sd.supplier_id=gr.FksuppId where gr.pending_bill_payment > 0 GROUP BY gr.FksuppId");
			list = query.list();
			supList = new ArrayList<SupplierDetail>(0);
			for(Object[] object : list )
			{
				SupplierDetail sdBean = new SupplierDetail();
				if(object[0] == null)
				{}
				else
				{
					sdBean.setSupplierId(Long.parseLong(object[0].toString()));
				}				
				if(object[1] == null)
				{}
				else
				{
					sdBean.setSupplierName(object[1].toString());
				}
				supList.add(sdBean);
			}

		} catch (RuntimeException e) {
			Log.error("Error in getAllSupplier ", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return supList;
	}

	public List getAllMainSuppliers() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			
			System.out.println("ALL SUPPLIER====");
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//query = session.createQuery("from SupplierDetail");
			query = session.createQuery("from SupplierDetail");
			list = query.list();

		} catch (RuntimeException e) {
			Log.error("Error in getAllSupplier ", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}

	public List getSupplierWiseSaleReport() {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<SupplierWiseSaleReport> suppBean = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select c.customerBill,c.totalAmt,c.quantity,c1.category_name,i.item_name,s.supplier_name,c.price,c.newTotalAmt from customer_order c left join offer_details o ON c.fk_offerrr_id=o.pk_itemoffer_id left join item_details i ON c.fk_item_id=i.pk_item_id left join product_details p ON i.fk_product_id=p.pk_product_id left join supplier_details s ON p.fk_vendor_id=s.supplier_id left join categories c1 ON p.fk_cat_id=c1.pk_category_id where (sale_return) IN ('No')");
			list = query.list();
			suppBean = new ArrayList<SupplierWiseSaleReport>(0);
			for (Object[] object : list) {

				SupplierWiseSaleReport sBean = new SupplierWiseSaleReport();
				sBean.setOrderId(Long.parseLong(object[0].toString()));
				sBean.setTotalAmount(Double.parseDouble(object[1].toString()));
				BigDecimal qunt = (BigDecimal) object[2];
				sBean.setQuantity(qunt);
				sBean.setCategoryName(object[3].toString());
				sBean.setItemName(object[4].toString());
				sBean.setSupplierName(object[5].toString());
				sBean.setSalePrice(Double.parseDouble(object[6].toString()));
				sBean.setNetAmount(Double.parseDouble(object[7].toString()));
				suppBean.add(sBean);
			}
		} catch (RuntimeException e) {
			Log.error("Error in Method", e);
		}

		return suppBean;
	}

	// get all Information about Supplier on SupplierEdit Form
	public List getEditSupplier1(Long suppilerId) {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("select s.address, s.city, s.contactPerson, s.pin, s.email, s.mobileno, s.panNo, s.supplierName,s.suppCode, taxType from SupplierDetail s where supplierId =" + suppilerId);
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getEditSupplier1", e);
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

	public List getAllSupplierList() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<SupplierListBean> suppBean = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select s.supplier_id, s.supplier_name, s.address, s.bank_name, s.branch_name, s.birthday, s.contact_person, s.product_type, s.email, s.mobileNo, s.pan_no, s.account_no, s.tin_no, s.city, s.credit_limit, s.cst_no, b.FirstName, b.LastName from supplier_details s left join broker b ON b.pk_broker_id=s.Broker_id group by s.supplier_id");
			list = query.list();
			suppBean = new ArrayList<SupplierListBean>(0);
			for (Object[] object : list) {
				SupplierListBean sBean = new SupplierListBean();
				sBean.setSupplierId(Long.parseLong(object[0].toString()));
				sBean.setSupplierName(object[1].toString());
				sBean.setAddress(object[2].toString());
				sBean.setBankName(object[3].toString());
				sBean.setBranchName(object[4].toString());
				sBean.setContactPerson(object[6].toString());
				sBean.setProductType(object[7].toString());
				sBean.setEmail(object[8].toString());
				sBean.setPanNo(Long.parseLong(object[10].toString()));
				sBean.setTinNo(Long.parseLong(object[12].toString()));
				sBean.setCity(object[13].toString());
				sBean.setCreditLimit(Double.parseDouble(object[14].toString()));

				suppBean.add(sBean);
			}
		} catch (RuntimeException e) {

			Log.error("Error in getAllSupplierList ", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return suppBean;
	}

	// get alll supplier name
	public List<SupplierDetail> getAllMAinSupp() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SupplierDetail> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createQuery("select supplierName, address, city, mobileno, contactPerson, email, panNo, pin  from SupplierDetail");

			List<Object[]> list = query2.list();
			catList = new ArrayList<SupplierDetail>(0);

			for (Object[] object : list) {
				k++;
				SupplierDetail reports = new SupplierDetail();
				reports.setSerialnumber(k);
				reports.setSupplierName(object[0].toString());
				reports.setAddress(object[1].toString());
				reports.setCity(object[2].toString());
				reports.setMobileno(Long.parseLong(object[3].toString()));
				reports.setContactPerson(object[4].toString());
				reports.setEmail(object[5].toString());
				reports.setPanNo(object[6].toString());
				reports.setPin(Long.parseLong(object[7].toString()));

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List getSupplierNameByToPay() {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from SupplierDetail");
			list = query.list();
		} catch (RuntimeException e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List getEmployeeNameByToPay() {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from EmployeeDetailsBean");
			list = query.list();
		} catch (RuntimeException e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List getAllBillBySuppliers(String supplierId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			String paymentdone = "y";
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.BillNo,s.FksuppId,s.pending_bill_payment from goodreceive s where s.FksuppId='" + supplierId + "'group by BillNo");
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

	public List getAllUnPaidBillAmount(String supplierId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<GetSupplierDetails> custList = null;
		try {
			String paymentdone = "y";
			Long supId = Long.parseLong(supplierId);
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.BillNo,s.GrossTotal from goodreceive s where  s.paymentDone =:paymentdone and s.FksuppId=:supId GROUP by s.BillNo");
			query.setParameter("paymentdone", paymentdone);
			query.setParameter("supId", supId);
			List<Object[]> list = query.list();

			custList = new ArrayList<GetSupplierDetails>(0);

			for (Object[] o : list) {

				GetSupplierDetails reports = new GetSupplierDetails();

				reports.setBillNo(o[0].toString());
				reports.setTotalAmt(Double.parseDouble(o[1].toString()));
				custList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return custList;

	}

	public List getAllBillBySuppliers1(String supplierId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.BillNo,s.FksuppId from goodreceive s where s.FksuppId=" + supplierId);

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

	/*public List getTotalItemByBillNo(String billNo, String supplierId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("BillNo :: " + billNo);
			System.out.println("supplierId :: " + supplierId);
			//Query query = session.createSQLQuery("select s.PkGoodRecId,s.CategoryName, s.ItemName, s.OrignalQuantity, s.BuyPrice, s.Vat, s.Total, s.ContactPerson, s.BarcodeNo, s.Date, s.Quantity,s.igst,s.Discount,s.RollSize,s.size, s.FksuppId from goodreceive s where s.BillNo=:billNo And s.FksuppId=:supplierId and s.Quantity>0");
			Query query = session.createSQLQuery("select s.PkGoodRecId,s.CategoryName, s.ItemName, s.OrignalQuantity, s.BuyPrice, s.Vat, s.Total, s.ContactPerson, s.BarcodeNo, s.Date, s.Quantity,s.igst,s.Discount,s.RollSize,s.size, s.FksuppId, s.BillNo from goodreceive s where s.BarcodeNo=:supplierId and s.Quantity>0");
			//query.setParameter("billNo", billNo);
			query.setParameter("supplierId", supplierId);
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
	}*/
	
	
	public List getTotalItemByBillNo(String billNo, String supplierId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		
		List<PurchaseReturnGetItems> itemlist = null;
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("BillNo :: " + billNo);
			System.out.println("supplierId :: " + supplierId);
			//Query query = session.createSQLQuery("select s.PkGoodRecId,s.CategoryName, s.ItemName, s.OrignalQuantity, s.BuyPrice, s.Vat, s.Total, s.ContactPerson, s.BarcodeNo, s.Date, s.Quantity,s.igst,s.Discount,s.RollSize,s.size, s.FksuppId from goodreceive s where s.BillNo=:billNo And s.FksuppId=:supplierId and s.Quantity>0");
			Query query = session.createSQLQuery("select s.PkGoodRecId, ct.Category_Name, pr.ProductName, s.OrignalQuantity, s.BuyPrice, s.Vat, s.Total, s.ContactPerson, s.BarcodeNo, s.Date, s.Quantity, s.igst, s.Discount, s.RollSize, pr.size, s.FksuppId, s.BillNo, sd.supplier_name, s.GrossTotal, s.fkProductId, s.fkSubCatId, s.fkCatId, sb.subcat_name from goodreceive s JOIN supplier_details sd on s.FksuppId=sd.supplier_id JOIN categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb ON s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr ON s.fkProductId=pr.pkProductNameId where s.BarcodeNo=:supplierId AND s.Quantity>0");
			//query.setParameter("billNo", billNo);
			query.setParameter("supplierId", supplierId);
			list = query.list();			
			itemlist = new ArrayList<PurchaseReturnGetItems>(0);
				for (int i = 0; i < list.size(); i++)
				{
					Object[] o = (Object[]) list.get(i);
					PurchaseReturnGetItems bean = new PurchaseReturnGetItems();
					bean.setPkGoodRecId(Long.parseLong(o[0].toString()));
					bean.setCatName(o[1].toString());
					bean.setItemName(o[2].toString());
					bean.setQuantity(Double.parseDouble(o[3].toString()));
					System.out.println("hi this is sagar +++++++++++"+(o[3].toString()));
					bean.setBuyPrice(Double.parseDouble(o[4].toString()));
					bean.setVat(Double.parseDouble(o[5].toString()));
					bean.setIgst(Double.parseDouble(o[11].toString()));
					bean.setDiscount(Double.parseDouble(o[12].toString()));
					bean.setRollsize(Double.parseDouble(o[13].toString()));
					bean.setTotal(Double.parseDouble(o[6].toString()));
					bean.setContactPerson(o[7].toString());
					bean.setBarcodeNo(Long.parseLong(o[8].toString()));
					bean.setOndate(o[9].toString());
					bean.setAvailquantity(Double.parseDouble(o[10].toString()));
					bean.setSize(o[14].toString());
					bean.setSupplierId(o[15].toString());
					bean.setBillNo(Long.parseLong(o[16].toString()));
					bean.setSupplierName2(o[17].toString());
					bean.setGrossTotal(Double.parseDouble(o[18].toString()));
					Double d = 0d;
					bean.setReturnTotal(d);
					Long editQuan = 0l;
					bean.setEditQuantity(editQuan);
					bean.setProductId(Long.parseLong(o[19].toString()));
					bean.setSubCatId(Long.parseLong(o[20].toString()));
					bean.setCatId(Long.parseLong(o[21].toString()));
					System.out.println("***************" + o[0]);
					itemlist.add(bean);
			}
		}
		catch (Exception e)
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
		return itemlist;
	}
	
	public List getSuppAndItemToPReturnDao()
	{
		System.out.println("getSuppAndItemToPReturnDao =============== ");
		HibernateUtility hbu = null;
		Session session = null;
		//Query query = null;
		
		List<SupplierEditBean> suppAndPorductList = null;
		List<Object[]> list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select s.address, s.city, s.mobileNo, s.pin, s.email, s.mobileno, s.pan_no, s.supplier_name,s.supplier_id, gr.ItemName, gr.BarcodeNo, gr.size from supplier_details s join goodreceive gr on s.supplier_id=gr.FksuppId AND gr.Quantity > 0;");
			list = query.list();
			suppAndPorductList = new ArrayList<SupplierEditBean>(0);

			for (Object[] objects : list)
			{
				SupplierEditBean bean = new SupplierEditBean();				
				
				bean.setSupplierName(objects[7].toString());
				bean.setSuppCode(objects[8].toString());
				bean.setgRItemName(objects[9].toString());
				bean.setgRBarcode(objects[10].toString());
				bean.setgRSize(objects[11].toString());
				suppAndPorductList.add(bean);
			}
		} catch (RuntimeException e) {

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return suppAndPorductList;
		
		
		/*List<SupplierEditBean> suppAndPorductList = null;
		List<Object[]> list = null;
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//query = session.createQuery("select  s.address, s.city, s.contactPerson, s.pin, s.email, s.mobileno, s.panNo, s.supplierName,s.suppCode from SupplierDetail s where supplierId =" + suppilerId);
			Query query = session.createSQLQuery("select s.address, s.city, s.mobileNo, s.pin, s.email, s.mobileno, s.pan_no, s.supplier_name,s.supplier_id, gr.ItemName, gr.BarcodeNo from supplier_details s join goodreceive gr on s.supplier_id=gr.FksuppId;");
			list = query.list();
			
			suppAndPorductList = new ArrayList<SupplierEditBean>(0);
			
			for(Object[] objects : list)
			{
				SupplierEditBean bean = new SupplierEditBean();
				bean.setSuppCode((String)objects[8]);
				bean.setgRItemName((String)objects[9]);
				bean.setgRBarcode((String)objects[10]);
				suppAndPorductList.add(bean);
				System.out.println(bean.getSuppCode());
				System.out.println(bean.getgRItemName());
				System.out.println(bean.getgRBarcode());
			}
			
			for(int i=0;i<suppAndPorductList.size(); i++)
			{
				System.out.println(suppAndPorductList.get(i).toString()+" list data");
			}
			
		} catch (RuntimeException e) {
			Log.error("Error in getEditSupplier1", e);
		}
		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
		//return list;
		return suppAndPorductList;*/
	}
	
	public List getTotalItemByVoucherNoForEditGRDao(String voucherNo) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		
		List<PurchaseReturnGetItems> itemlist = null;
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("====DAO====");
			System.out.println("voucherNo  :: " + voucherNo);
			//Query query = session.createSQLQuery("select s.PkGoodRecId,s.CategoryName, s.ItemName, s.OrignalQuantity, s.BuyPrice, s.Vat, s.Total, s.ContactPerson, s.BarcodeNo, s.Date, s.Quantity,s.igst,s.Discount,s.RollSize,s.size, s.FksuppId from goodreceive s where s.BillNo=:billNo And s.FksuppId=:supplierId and s.Quantity>0");
			Query query = session.createSQLQuery("select s.PkGoodRecId, ct.Category_Name, pr.ProductName, s.OrignalQuantity, s.BuyPrice, s.Vat, s.Total, s.ContactPerson, s.BarcodeNo, s.Date, s.Quantity, s.igst, s.Discount, s.RollSize, pr.size, s.FksuppId, s.BillNo, sd.supplier_name, s.GrossTotal, sc.subcat_name, s.HsnSacNo, pr.color, s.style, s.PurchaseCode, s.ContactPerson, s.TaxAmount, s.returnQuantity, s.SalePrice, sd.supplier_id, s.fkProductId, s.fkSubCatId, s.fkCatId, sd.SuppCode, s.soldQuantity, s.pending_bill_payment, s.BarcodeQty from goodreceive s join supplier_details sd on s.FksuppId=sd.supplier_id join sub_categories sc on s.fkSubCatId=sc.pk_subcat_id join categories ct on s.fkCatId=ct.pk_category_id JOIN product_reg pr ON s.fkProductId = pr.pkProductNameId where s.voucherNo=:voucherNo AND s.voucherNo > 0");
			query.setParameter("voucherNo", voucherNo);
			list = query.list();			
		}
		catch (Exception e)
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
		
		//System.out.println("TOTAL ITEMLIST DAO "+itemlist.size());
		
		return list;
	}	
	
	public List getCurrentNewSupplierPendingAmountDao(String newSupplierId) {

		System.out.println("into dao newSupplierId : "+newSupplierId);
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select gr.PkGoodRecId, gr.FksuppId, gr.pending_bill_payment from goodreceive gr where gr.FksuppId = "+newSupplierId+" ORDER BY PkGoodRecId DESC LIMIT 1");
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
