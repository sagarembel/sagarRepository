package com.smt.helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillCopy;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.ItemList;
import com.smt.bean.ProductDetailsToEdit;
import com.smt.bean.PurchaseReport;
import com.smt.bean.SubCategoryUpdate;
import com.smt.dao.CategoryDao;
import com.smt.dao.CustomerDetailsDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.ProductDetailDao;
import com.smt.hibernate.ProductRegister;
import com.smt.hibernate.SubCategory;
import com.smt.utility.HibernateUtility;

public class ProductDetailHelper {

	public void doProductRegister(HttpServletRequest request, HttpServletResponse response) {

		String itemName = request.getParameter("itemName");
		String catId = request.getParameter("catId");

		String modelName = request.getParameter("modelName");
		String hsnsacno = request.getParameter("hsnsacno");
		String vat = request.getParameter("vat");
		String fkSubCatId = request.getParameter("fkSubCatId");
		
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		Date dateobj = new Date();

		String newDate = df.format(dateobj);

		ProductRegister pdreg = new ProductRegister();

		Integer count = Integer.parseInt(request.getParameter("count"));

		if(count == 0)
		{
			String color = request.getParameter("colorFinal");
			pdreg.setColor(color);

			String size = request.getParameter("sizeFinal");
			pdreg.setSize(size);

			pdreg.setItemName(itemName);

			pdreg.setFkCategoryId(Long.parseLong(catId));

			pdreg.setFkSubCategoryId(Long.parseLong(fkSubCatId));

			if (!"".equals(modelName)) {
				pdreg.setModelName(modelName);
			} else {
				pdreg.setModelName("N/A");
			}
		if(vat == null || vat.equalsIgnoreCase("") || vat.equalsIgnoreCase("undefined"))
		{
			pdreg.setVat(0.0);
		}
		else
		{
			pdreg.setVat(Double.parseDouble(vat));
		}
			if (hsnsacno != "") {
				pdreg.setHsnsacno(hsnsacno);
			} else {
				pdreg.setHsnsacno("N/A");
			}

			
			pdreg.setIsInsertDate(dateobj);

			ProductDetailDao reg = new ProductDetailDao();
			reg.doProductRegister(pdreg);
		
		}
		else
		{
			for (int i = 0; i < count; i++)
			{
				String color = request.getParameter("color" + i + "");
				pdreg.setColor(color);
	
				String size = request.getParameter("size" + i + "");
				pdreg.setSize(size);
	
				pdreg.setItemName(itemName);
	
				pdreg.setFkCategoryId(Long.parseLong(catId));
	
				pdreg.setFkSubCategoryId(Long.parseLong(fkSubCatId));
	
				if (!"".equals(modelName)) {
					pdreg.setModelName(modelName);
				} else {
					pdreg.setModelName("N/A");
				}
			if(vat == null || vat.equalsIgnoreCase("") || vat.equalsIgnoreCase("undefined"))
			{
				pdreg.setVat(0.0);
			}
			else
			{
				pdreg.setVat(Double.parseDouble(vat));
			}
				if (hsnsacno != "") {
					pdreg.setHsnsacno(hsnsacno);
				} else {
					pdreg.setHsnsacno("N/A");
				}
				
				pdreg.setIsInsertDate(dateobj);
	
				ProductDetailDao reg = new ProductDetailDao();
				reg.doProductRegister(pdreg);
			}
		}
	}

	// to get all Item Name on Good receive form

	public List getAllItemName()
	{
		ProductDetailDao dow = new ProductDetailDao();
		List l = dow.getAllItemName();
		System.out.println("Product List size in helper" + l.size());
		return l;
	}

	// to get itemName And Category Name on Product Detail Form
	public List getAllItemNameAndCatName() {
		ProductDetailDao dow = new ProductDetailDao();
		return dow.getAllItemNameAndCatName();
	}

	// get all main product Name
	public List getAllMAinItem(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		Map<Long, ItemList> map = new HashMap<Long, ItemList>();

		ProductDetailDao dao = new ProductDetailDao();
		List<ItemList> exp1List = dao.getAllMAinItem();

		return exp1List;
	}

	public Map getProductDetailsForEdit(String productId) {

		System.out.println("into helper class");
		ProductDetailDao dao1 = new ProductDetailDao();
		List catList = dao1.getAllProductSetailsForEdit(productId);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);

			ProductDetailsToEdit bean = new ProductDetailsToEdit();
			bean.setProName(o[0].toString());
			String vat = o[1].toString();
			bean.setVat(Double.parseDouble(vat));
			bean.setModelName(o[2].toString());
			String pkId = o[3].toString();
			bean.setHsnsacno(o[4].toString());
			bean.setSize(o[5].toString());
			bean.setCatName(o[6].toString());
			bean.setSubCatName(o[7].toString());
			bean.setPkProduct(Long.parseLong(pkId));

			map.put(bean.getPkProduct(), bean);
		}
		System.out.println("out of helper return map : " + map);
		return map;
	}

	public void editProductDetail(HttpServletRequest request, HttpServletResponse response)
	{
		ProductDetailDao pdo = new ProductDetailDao();

		String productId = request.getParameter("productId");
		String itemName = request.getParameter("itemName");
		String modelName = request.getParameter("modelName");
		String hsnsacno = request.getParameter("hsnsacno");
		//String vat = request.getParameter("vat");
		String size = request.getParameter("size");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();

		System.out.println("%%%%%%%%%%%%%%%%% Product id :" + productId);
		long productID = Long.parseLong(productId);
		ProductRegister det = (ProductRegister) session.get(ProductRegister.class, productID);

		if (!"".equals(itemName)) {
			det.setItemName(itemName);
		} else {
			det.setItemName("N/A");
		}

		//det.setVat(Double.parseDouble(vat));

		if (!"".equals(modelName)) {
			det.setModelName(modelName);
		} else {
			det.setModelName("N/A");
		}

		if (hsnsacno != "") {
			det.setHsnsacno(hsnsacno);
		} else {
			det.setHsnsacno("N/A");
		}
		
		det.setSize(size);
		session.saveOrUpdate(det);
		transaction.commit();
		session.close();
		//pdo.updateProductName();
		System.out.println("Record updated successfully.");

	}

	public Map getSubCategoriesByRootcategory(String catID) {

		Map<Long, SubCategory> map = new HashMap<Long, SubCategory>();

		CategoryDao dao = new CategoryDao();
		List catList = dao.getSubCategoriesByRootcategory(catID);
		Map map1 = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);
			SubCategoryUpdate bean = new SubCategoryUpdate();
			bean.setSubCatId(Long.parseLong(o[0].toString()));
			bean.setSubCatName((String) o[1]);

			System.out.println("***************" + o[0] + "\t" + o[1]);
			map1.put(bean.getSubCatId(), bean);
		}
		return map1;
	}

	public Map getDetailsById(String itemName) {

		ProductDetailDao dao = new ProductDetailDao();
		List list = dao.getProductDetailsForAdvanceBook(itemName);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			ProductRegister bean = new ProductRegister();
			bean.setSize(o[0].toString());
			bean.setPkProductId(Long.parseLong(o[1].toString()));
			map1.put(bean.getSize(), bean);
		}
		return map1;

	}

	public List getDetailsById1(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		
		String itemName = request.getParameter("itemName");
		String fkCatId = request.getParameter("fkCatId");
		String subcatId = request.getParameter("subcatId");
		String productId = request.getParameter("productId");
		System.out.println(productId+" "+subcatId+" "+fkCatId+"hi SAGAR in helper");
		Map<Long, GoodReceiveItemBean> map = new HashMap<Long, GoodReceiveItemBean>();

		ProductDetailDao dao = new ProductDetailDao();
		List<GoodReceiveItemBean> saleList = dao.getDetailsById1(itemName,fkCatId,subcatId, productId);

		return saleList;
	}

	public List getCategoryWiseItemName(String category) {

		Map<Long, GoodReceiveItemBean> map = new HashMap<Long, GoodReceiveItemBean>();

		ProductDetailDao dao = new ProductDetailDao();
		List<GoodReceiveItemBean> custList = dao.getCategoryWiseItemName(category);

		return custList;

	}
	
	public List getProductListHelper() {

		ProductDetailDao dao = new ProductDetailDao();
		return dao.getProductListDao();
	}
	
	
	public List productWisePurchaseReportHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String productId = request.getParameter("productId");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		ProductDetailDao dao = new ProductDetailDao();
		List<PurchaseReport> exp1List = dao.productWisePurchaseReportDao(productId);

		return exp1List;
	}
	
	
	
	

}