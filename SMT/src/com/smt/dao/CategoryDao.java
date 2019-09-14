package com.smt.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.CategoryDetails;
import com.smt.bean.CategoryWisePurchase;
import com.smt.bean.CategoryWiseSaleReport;
import com.smt.hibernate.Category;
import com.smt.hibernate.SubCategory;
import com.smt.utility.HibernateUtility;

public class CategoryDao {

	public void valCategory(Category category) {
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(category);
			transaction.commit();
		} catch (RuntimeException e) {

			try {
				transaction.rollback();

			} catch (RuntimeException rbe) {

				Log.error("Couldn't roll back transaction", rbe);
			}

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

	public List getAllMainCategories()

	{
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from Category");
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

	public List getCategoryWisePurchaseReport() {
		HibernateUtility hbu = null;
		Session session = null;
		List<CategoryWisePurchase> categoryBean = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select po.po_id,s.supplier_name,c.category_name,i.item_name,i.color,i.size,po.quantity,po.total_Amount from purchaseorderdetails po left join categories c ON po.fk_category_id=c.pk_category_id left join product_details p ON p.fk_cat_id=p.pk_product_id left join supplier_details s ON p.fk_vendor_id=s.supplier_id left join item_details i ON i.fk_product_id=p.pk_product_id ORDER BY c.category_name");
			List<Object[]> list = query.list();
			categoryBean = new ArrayList<CategoryWisePurchase>(0);

			for (Object[] object : list) {

				CategoryWisePurchase cBean = new CategoryWisePurchase();
				cBean.setPoid(Long.parseLong(object[0].toString()));
				cBean.setSupplierName(object[1].toString());
				cBean.setCategoryName(object[2].toString());
				cBean.setItemName(object[3].toString());
				cBean.setColor(object[4].toString());
				cBean.setSize(Long.parseLong(object[5].toString()));
				cBean.setQuantity(Long.parseLong(object[6].toString()));
				cBean.setTotalAmount(Double.parseDouble(object[7].toString()));
				categoryBean.add(cBean);
			}
		}

		catch (RuntimeException e) {
			Log.error("getCategoryWisePurchaseReport()", e);

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return categoryBean;
	}

	public List getCategoryWiseSaleReport() {

		HibernateUtility hbu = null;
		Session session = null;
		List<CategoryWiseSaleReport> cBean = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select c.customerBill,c.item_name,c1.category_name,c.quantity,c.price,c.totalAmt from customer_order c left join offer_details o ON c.fk_offerrr_id=o.pk_itemoffer_id left join item_details i ON c.fk_item_id=i.pk_item_id left join product_details p ON i.fk_product_id=p.pk_product_id left join categories c1 ON p.fk_cat_id=c1.pk_category_id where (sale_return) IN ('No') ");

			List<Object[]> list = query.list();
			cBean = new ArrayList<CategoryWiseSaleReport>(0);
			for (Object[] object : list) {

				CategoryWiseSaleReport catBean = new CategoryWiseSaleReport();
				catBean.setOrderId(Long.parseLong(object[0].toString()));
				catBean.setItemName(object[1].toString());
				String catName = (String) object[2];
				if (catName != null) {
					catBean.setCategoryName(object[2].toString());
				} else {
					catBean.setCategoryName("N/A");
				}
				BigDecimal qunt = (BigDecimal) object[3];
				catBean.setQuantity(qunt);

				catBean.setSalePrice(Double.parseDouble(object[4].toString()));
				catBean.setTotalAmount(Double.parseDouble(object[5].toString()));
				cBean.add(catBean);
			}
		} catch (RuntimeException e) {

			Log.error("getCategoryWiseSaleReport()", e);

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return cBean;
	}

	public List getSubCategoriesByRootcategoryFORPO(String mainCatId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from SubCategory sc where  sc.fkRootcatId =" + mainCatId);
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getSubCategoriesByRootcategoryFORPO(String mainCatId)", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);

			}
		}

		return list;
	}

	public List getCategoryName() {

		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("select categoryName from Category");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getCategoryName()", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);

			}
		}

		return list;

	}

	public List getCategoryBySupplier(String supplierId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select c.category_name ,c.pk_category_id from supplier_details s left join product_details p ON p.fk_vendor_id = s.supplier_id left join  categories c ON p.fk_cat_id = c.pk_category_id where s.supplier_id=" + supplierId);

			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getCategoryBySupplier(String supplierId)", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);

			}

		}

		return list;

	}

	// get All MAin CategoryName In CaTeGory List form
	public List<Category> getAllMAinCaregory() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<Category> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createQuery("select categoryName , pkCategoryId from Category");
			List<Object[]> list = query2.list();
			catList = new ArrayList<Category>(0);

			for (Object[] object : list) {
				k++;
				Category reports = new Category();
				reports.setSerialnumber(k);
				reports.setCategoryName(object[0].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get All MAin CategoryName In CaTeGory List form
	public List<SubCategory> getAllMainSubCategory() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SubCategory> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select subcat_name , pk_subcat_id, category_name from sub_categories left join categories on fk_rootcat_id = pk_category_id");
			List<Object[]> list = query2.list();
			catList = new ArrayList<SubCategory>(0);

			for (Object[] object : list) {
				k++;
				SubCategory reports = new SubCategory();
				reports.setSerialnumber(k);
				reports.setSubcatName(object[0].toString());
				reports.setCatName(object[2].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// ReName Category
	public void reNameCategory(Long pk_cat_id, String reNameCat) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			Category cat = (Category) session.get(Category.class, new Long(pk_cat_id));
			cat.setCategoryName(reNameCat);
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

	// get All Category to dispay category wise reports
	public List getCategoryNames() {

		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		List<CategoryDetails> bill = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select pk_category_id, category_name from categories;");
			list = query.list();
			bill = new ArrayList<CategoryDetails>(0);
			for (Object[] object : list) {
				CategoryDetails reports = new CategoryDetails();
				reports.setCatId(Long.parseLong(object[0].toString()));
				reports.setCatName(object[1].toString());
				bill.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}

		return bill;

	}

	public List getSubCategoriesByRootcategory(String catID) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select pk_subcat_id , subcat_name from sub_categories sc where  sc.fk_rootcat_id =" + catID);
			list = query.list();
			System.out.println("In Dao List is" + list);
		} catch (RuntimeException e) {
			Log.error("Error in getSubCategoriesByRootcategory(String mainCatId)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}

}
