package com.smt.helper;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.dao.CategoryDao;
import com.smt.dao.SubCategoryDao;
import com.smt.hibernate.SubCategory;

public class SubCategoryHelper {
	public void regSubCategory(HttpServletRequest request, HttpServletResponse response) {

		String subcatName = request.getParameter("subcatName");
		System.out.println("SubCat" + subcatName);
		String fkRootcatId = request.getParameter("fkRootcatId");
		System.out.println("Cat Id" + fkRootcatId);

		SubCategory subCategory = new SubCategory();
		subCategory.setSubcatName(subcatName);
		subCategory.setFkRootcatId(Long.parseLong(fkRootcatId));
		SubCategoryDao dao = new SubCategoryDao();
		dao.valCategory(subCategory);
	}

	public List getAllMainSubCategories() {
		SubCategoryDao dao = new SubCategoryDao();
		return dao.getAllSubCategories();

	}

	public List getAllCategoriesWiseSubCategories(HttpServletRequest request, HttpServletResponse response) {
		String catId = request.getParameter("catId");
		SubCategoryDao dao = new SubCategoryDao();
		return dao.getAllCategoriesWiseSubCategories(catId);

	}

	// rename Category
	public void reNameSubCategory(HttpServletRequest request, HttpServletResponse response) {

		String reNameCat = request.getParameter("reNameCat");

		SubCategoryDao dao = new SubCategoryDao();
		Long subcatId = Long.parseLong(request.getParameter("subcatId"));
		System.out.println("pk_temp_id" + subcatId);
		dao.reNameSubCategory(subcatId, reNameCat);

	}

}
