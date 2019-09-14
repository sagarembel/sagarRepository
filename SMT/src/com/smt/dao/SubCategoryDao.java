package com.smt.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.SubCategoryWisePurchase;
import com.smt.bean.SubCategoryWiseSaleReport;
import com.smt.hibernate.Category;
import com.smt.hibernate.SubCategory;
import com.smt.utility.HibernateUtility;

public class SubCategoryDao {

	public void valCategory(SubCategory subCategory) {
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session = hbu.getHibernateSession();
		long fkCatIfd = subCategory.getFkRootcatId();
		Category cate = (Category) session.load(Category.class, fkCatIfd);
		subCategory.setCategory(cate);
		Transaction transaction = session.beginTransaction();
		session.save(subCategory);
		transaction.commit();

	}

	public List getAllSubCategories() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<SubCategory> subBean = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			query = session.createSQLQuery("select s.pk_subcat_id,s.subcat_name,c.category_name from sub_categories s left join categories c on s.fk_rootcat_id=c.pk_category_id");
			list = query.list();
			subBean = new ArrayList<SubCategory>(0);
			for (Object[] object : list) {

				SubCategory scBean = new SubCategory();
				scBean.setPkSubcatId(Long.parseLong(object[0].toString()));

				scBean.setCatName(object[2].toString());
				scBean.setSubcatName(object[1].toString());
				subBean.add(scBean);

			}

		} catch (RuntimeException e) {
			Log.error("error in method", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return subBean;
	}

	public List getSubCategoryWisePurchaseReport() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<SubCategoryWisePurchase> subBean = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select po.po_id,s.supplier_name,c.category_name,sc.subcat_name,i.item_name,i.color,i.size,po.quantity,po.total_Amount from purchaseorderdetails po left join sub_categories sc ON po.fk_subcategory_id=sc.pk_subcat_id left join categories c ON sc.fk_rootcat_id=c.pk_category_id left join  product_details p ON p.fk_cat_id=p.pk_product_id left join supplier_details s ON p.fk_vendor_id=s.supplier_id left join item_details i ON i.fk_product_id=p.pk_product_id ORDER BY sc.subcat_name");

			list = query.list();
			subBean = new ArrayList<SubCategoryWisePurchase>(0);
			for (Object[] object : list) {

				SubCategoryWisePurchase scBean = new SubCategoryWisePurchase();
				scBean.setPoid(Long.parseLong(object[0].toString()));
				scBean.setSupplierName(object[1].toString());
				scBean.setItemName(object[4].toString());
				scBean.setColor(object[5].toString());
				scBean.setSize(Long.parseLong(object[6].toString()));
				scBean.setQuantity(Long.parseLong(object[7].toString()));
				scBean.setTotalAmount(Double.parseDouble(object[8].toString()));

				subBean.add(scBean);

			}

		} catch (RuntimeException e) {
			Log.error("Error in getSubCategoryWisePurchaseReport ", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}

		return subBean;
	}

	public List getSubCategoryWiseSaleReport() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<SubCategoryWiseSaleReport> subCat = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select c.customerBill,c.item_name,c1.category_name,c.quantity,c.price,c.newTotalAmt, s.subcat_name ,c.totalAmt from customer_order c left join offer_details o ON c.fk_offerrr_id=o.pk_itemoffer_id left join item_details i ON c.fk_item_id=i.pk_item_id left join product_details p ON i.fk_product_id=p.pk_product_id left join categories c1 ON p.fk_cat_id=c1.pk_category_id left join sub_categories s ON s.fk_rootcat_id=s.pk_subcat_id where (sale_return) IN ('No')");
			list = query.list();
			subCat = new ArrayList<SubCategoryWiseSaleReport>(0);

			for (Object[] object : list) {
				SubCategoryWiseSaleReport subBean = new SubCategoryWiseSaleReport();
				subBean.setOrderId(Long.parseLong(object[0].toString()));
				subBean.setItemName(object[1].toString());
				String catName = (String) object[2];
				if (catName != null) {
					subBean.setCategoryName(object[2].toString());
				} else {

					subBean.setCategoryName("N/A");
				}
				BigDecimal qunt = (BigDecimal) object[3];
				subBean.setQuantity(qunt);

				subBean.setSalePrice(Double.parseDouble(object[4].toString()));
				subBean.setTotalAmount(Double.parseDouble(object[5].toString()));
				subBean.setSubcatName(object[6].toString());
				subBean.setTotalAmount(Double.parseDouble(object[7].toString()));
				subCat.add(subBean);
			}

		} catch (RuntimeException e) {
			Log.error(" Error in getSubCategoryWiseSaleReport", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return subCat;

	}

	public List getAllCategoriesWiseSubCategories(String catId) {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<SubCategory> subBean = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select po.po_id,s.supplier_name,c.category_name,sc.subcat_name,i.item_name,i.color,i.size,po.quantity,po.total_Amount from purchaseorderdetails po left join sub_categories sc ON po.fk_subcategory_id=sc.pk_subcat_id left join categories c ON sc.fk_rootcat_id=c.pk_category_id left join  product_details p ON p.fk_cat_id=p.pk_product_id left join supplier_details s ON p.fk_vendor_id=s.supplier_id left join item_details i ON i.fk_product_id=p.pk_product_id ORDER BY sc.subcat_name");

			list = query.list();
			subBean = new ArrayList<SubCategory>(0);
			for (Object[] object : list) {

				SubCategory scBean = new SubCategory();

				subBean.add(scBean);

			}

		} catch (RuntimeException e) {
			Log.error("Error in getSubCategoryWisePurchaseReport ", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}

		return subBean;
	}

	// ReName Category
	public void reNameSubCategory(Long subcatId, String reNameCat) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			SubCategory cat = (SubCategory) session.get(SubCategory.class, new Long(subcatId));
			cat.setSubcatName(reNameCat);
			session.saveOrUpdate(cat);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

}
