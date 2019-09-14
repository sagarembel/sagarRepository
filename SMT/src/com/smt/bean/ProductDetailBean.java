package com.smt.bean;

public class ProductDetailBean {

	private Long catId;
	private String categoryName;
	private Long subCatId;
	private String subCatName;
	private Long leafCatId;
	private String leafCatName;

	public Long getCatId() {
		return catId;
	}

	public void setCatId(Long catId) {
		this.catId = catId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Long getSubCatId() {
		return subCatId;
	}

	public void setSubCatId(Long subCatId) {
		this.subCatId = subCatId;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

	public Long getLeafCatId() {
		return leafCatId;
	}

	public void setLeafCatId(Long leafCatId) {
		this.leafCatId = leafCatId;
	}

	public String getLeafCatName() {
		return leafCatName;
	}

	public void setLeafCatName(String leafCatName) {
		this.leafCatName = leafCatName;
	}

}
