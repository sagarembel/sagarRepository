package com.smt.dao;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.jfree.util.Log;

import com.smt.bean.BillCopy;
import com.smt.bean.CategoryDetails;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.ItemList;
import com.smt.bean.ProductNameBean;
import com.smt.bean.PurchaseReport;
import com.smt.bean.UpdateProductDetails;
import com.smt.hibernate.Category;
import com.smt.hibernate.ProductRegister;
import com.smt.hibernate.SubCategory;
import com.smt.utility.HibernateUtility;

public class ProductDetailDao {

	public List getAllProductDetails() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<UpdateProductDetails> proList = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select s.shop_name , sup.supplier_name , c.category_name ,sc.subcat_name ,p.pk_product_id, p.item_name , p.is_vat , p.vat_percentage , p.is_alternate_product , p.is_item , p.commision from product_details p left join shop_detail s ON p.fk_shop_id=s.shop_id left join supplier_details sup ON p.fk_vendor_id = sup.supplier_id left join categories c ON p.fk_cat_id = c.pk_category_id left join sub_categories sc ON sc.fk_rootcat_id = c.pk_category_id");
			list = query.list();
			proList = new ArrayList<UpdateProductDetails>(0);

			for (Object[] objects : list) {

				UpdateProductDetails productDetails = new UpdateProductDetails();
				productDetails.setShopName(objects[0].toString());
				productDetails.setSupplierName(objects[1].toString());
				productDetails.setCategoryName(objects[2].toString());
				productDetails.setSubCatName(objects[3].toString());
				productDetails.setProductId(Long.parseLong(objects[4].toString()));
				productDetails.setProductName(objects[5].toString());
				productDetails.setIsVat(objects[6].toString());
				productDetails.setVatPercentage(Double.parseDouble(objects[7].toString()));
				productDetails.setIsAlterNate(objects[8].toString());
				productDetails.setIsItem(objects[9].toString());
				productDetails.setCommission(Double.parseDouble(objects[10].toString()));

				proList.add(productDetails);

			}

		} catch (Exception e) {
			Log.error("Error in getAllProductDetails Method ", e);
			// TODO: handle exception
		} finally

		{
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return proList;

	}

	public List getLeafcatBYCatandSubCategory(String catID, String subCatID) {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("select i.leafcatName from ItemDetail as i join i.productDetail where i.productDetail.category.subCategory.pkSubcatId=" + subCatID);
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getLeafcatBYCatandSubCategory", e);
			// TODO: handle exception
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List getAllProductName(String productId) {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select p.item_name,p.pk_product_id from product_details p where p.pk_product_id=" + productId);
			list = query.list();
		} catch (RuntimeException e) {

			Log.error("Error In getAllProductname", e);
			// TODO: handle exception
		} finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
		return list;
	}

	/****** code for edit item details *****/

	public List getallItemDetails(String productId) {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select i.item_name,i.color,i.size,i.sale_price,i.buy_price,i.mmcc,i.pk_item_id from item_details i where i.pk_item_id=" + productId);
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getallItemDetails", e);
			// TODO: handle exception
		} finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
		return list;

	}

	public void doProductRegister(ProductRegister pdreg) {

		HibernateUtility hbu = null;
		Session session = null;
		org.hibernate.Transaction transaction = null;

		Category category = null;
		Long fkCategoryId = null;
		Long fkSubCategoryId = null;

		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			fkCategoryId = pdreg.getFkCategoryId();
			fkSubCategoryId = pdreg.getFkSubCategoryId();
			Category supdetail = (Category) session.load(Category.class, fkCategoryId);
			SubCategory subCat = (SubCategory) session.load(SubCategory.class, fkSubCategoryId);
			pdreg.setCategory(supdetail);
			pdreg.setSubCategory(subCat);

			session.save(pdreg);

			transaction.commit();
		} catch (RuntimeException e) {

			try {
				transaction.rollback();
			} catch (RuntimeException e2) {
				Log.error("Error in PRODUCTDETAIL Add FORM", e2);
			}
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

	public List getAllItemName() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<ProductNameBean> itemList = null;
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		query = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.color, p.size,p.FkCatId,p.fkSubCategoryId,sc.subcat_name, p.pkProductNameId from product_reg p left join categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sc on p.fkSubCategoryId = sc.pk_subcat_id GROUP BY p.ProductName, c.category_name, sc.subcat_name");
		list = query.list();
		System.out.println("Item List" + list);

		itemList = new ArrayList<ProductNameBean>(0);
		for (Object[] objects : list) {

			ProductNameBean item = new ProductNameBean();
			item.setItemName(objects[0].toString());
			item.setCaregoryName(objects[1].toString());
			item.setHsnsacno(objects[2].toString());
			item.setFkCatId(objects[5].toString());
			item.setSubCatid(objects[6].toString());
			item.setSubCat(objects[7].toString());
			item.setProductid(objects[8].toString());
			String color = objects[3].toString();

			String size = objects[4].toString();

			if (color.equals("null")) {
				item.setColor("N/A");
			} else {
				item.setColor(color);
			}
			if (size.equals("null")) {
				item.setSize("N/A");
			} else {
				item.setSize(size);
			}

			itemList.add(item);

		}

		hbu.closeSession(session);
		return itemList;
	}

	// to get itemName And Category Name on Product Detail Form
	public List getAllItemNameAndCatName() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from ProductRegister");
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

	// get all main Item name
	public List<ItemList> getAllMAinItem() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<ItemList> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, sb.subcat_name, p.size from product_reg p left join categories c ON p.FkCatId = c.pk_category_id join sub_categories sb on p.fkSubCategoryId = sb.pk_subcat_id");
			List<Object[]> list = query2.list();
			catList = new ArrayList<ItemList>(0);

			for (Object[] object : list) {
				k++;
				ItemList reports = new ItemList();
				reports.setSerialnumber(k);
				reports.setItem_name(object[0].toString());
				reports.setCategoryName(object[1].toString());
				reports.setHsnsacno(object[2].toString());
				reports.setSubCatName(object[3].toString());
				reports.setSize(object[4].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List getProductNames() {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from ProductRegister");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllSupllier", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;

	}

	public List getAllProductSetailsForEdit(String ProductId) {

		System.out.println("into dao supplier : " + ProductId);
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select pr.ProductName, pr.Vat, pr.modelName, pr.pkProductNameId, pr.HsnSacNo, pr.size, c.category_name, subC.subcat_name from product_reg pr join categories c on pr.FkCatId=c.pk_category_id join sub_categories subC on pr.fkSubCategoryId = subC.pk_subcat_id where pkProductNameId = "+ProductId);
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

	public List getProductDetailsForAdvanceBook(String itemName) {
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("select p.size,p.pkProductNameId from product_reg p  where p.ProductName ='" + itemName + "'");
			System.out.println("ItemNAme is" + itemName);
			list = query.list();

			System.out.println(list.size() + "*************");
		} catch (RuntimeException e) {

			Log.error("Error in getProductDetails", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}

		}

		return list;
	}

	
	
	public List<GoodReceiveItemBean> getDetailsById1(String itemName, String fkCatId, String subcatId, String productId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.GoodReceiveItemBean> saleList = null;
		try
		{
			System.out.println("itemName " + itemName);
			System.out.println("fkCatId " + fkCatId);
			System.out.println("subcatId " + subcatId);
			System.out.println("productId " + productId);
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.size,p.Vat,p.color,sb.subcat_name, sb.pk_subcat_id, c.pk_category_id, p.pkProductNameId from product_reg p left join categories c ON p.FkCatId = c.pk_category_id join sub_categories sb ON p.fkSubCategoryId = sb.pk_subcat_id where p.ProductName=:itemName AND p.FkCatId=:fkCatId AND p.fkSubCategoryId=:subcatId");
			query2.setParameter("itemName", itemName);
			query2.setParameter("fkCatId", fkCatId);
			query2.setParameter("subcatId", subcatId);
			
			List<Object[]> list = query2.list();
			saleList = new ArrayList<com.smt.bean.GoodReceiveItemBean>(0);

			for (Object[] object : list) {

				com.smt.bean.GoodReceiveItemBean reports = new com.smt.bean.GoodReceiveItemBean();

				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setHsnsacno(object[2].toString());
				reports.setSize(object[3].toString());
				reports.setSizeFixed(object[3].toString());
				reports.setVat(0d);
				reports.setColor(object[5].toString());
				reports.setSubCatName(object[6].toString());
				reports.setSubCatId(object[7].toString());
				reports.setCategoryId(object[8].toString());
				reports.setProductId(Long.parseLong(object[9].toString()));
				
				reports.setRollSize(0d);

				saleList.add(reports);
				System.out.println("PRODUCT ADDED");
			}
		} catch (RuntimeException e) {
			Log.error("Error in getSaleDetailsDateWise(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;

	}
	
	
	
	public List<GoodReceiveItemBean> getDetailsById1(String itemName) {

		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.GoodReceiveItemBean> saleList = null;
		try {
			System.out.println("hiii " + itemName);
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.size,p.Vat,p.color from product_reg p left join categories c ON p.FkCatId = c.pk_category_id where p.ProductName =:itemName ");
			query2.setParameter("itemName", itemName);
			List<Object[]> list = query2.list();
			System.out.println("hiii " + itemName);
			saleList = new ArrayList<com.smt.bean.GoodReceiveItemBean>(0);

			for (Object[] object : list) {

				com.smt.bean.GoodReceiveItemBean reports = new com.smt.bean.GoodReceiveItemBean();

				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setHsnsacno(object[2].toString());
				reports.setSize(object[3].toString());
				reports.setVat(0d);
				reports.setColor(object[5].toString());
				reports.setRollSize(0d);

				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getSaleDetailsDateWise(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;

	}

	public List getCategoryWiseItemName(String category)
	{
		System.out.println("category ====> "+category);
		List<GoodReceiveItemBean> saleList = null;
		HibernateUtility hbu = null;
		Session session = null;
		try {
			String paytype = "y";
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select pr.ProductName, pr.FkCatId, pr.size, pr.pkProductNameId from product_reg pr left join categories c on c.pk_category_id = pr.FkCatId where pr.FkCatId=:category");
			query.setParameter("category", category);
			List<Object[]> list = query.list();
			saleList = new ArrayList<GoodReceiveItemBean>(0);
			for (Object[] objects : list)
			{
				System.out.println(Arrays.toString(objects));
				GoodReceiveItemBean bean = new GoodReceiveItemBean();
				bean.setItemName(objects[0].toString());
				bean.setSize(objects[2].toString());
				bean.setProductId(Long.parseLong(objects[3].toString()));
				saleList.add(bean);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return saleList;
	}
	
	
	
	public List getProductListDao()
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		List<ItemList> bill = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select ob.fkProductId, pr.ProductName from otherbill ob join product_reg pr on ob.fkProductId = pr.pkProductNameId GROUP BY ob.fkProductId;");
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
	
	
	public List<PurchaseReport> productWisePurchaseReportDao(String productId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			  double rSize=0.0;
				double Qmeter = 0.0;
				double qty = 0.0;
				String Rsize=null;
			Query query2 = session.createSQLQuery("select s.BillNo, ct.category_name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.Total, s.BarcodeNo, s.Date, c.supplier_name,s.RollSize,s.ExtraDiscount,s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), s.OrignalQuantity, sb.subcat_name, s.voucherNo, s.SalePrice from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id join categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.fkProductId = :productId");
			query2.setParameter("productId", productId);

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
	
	
	
	
}
