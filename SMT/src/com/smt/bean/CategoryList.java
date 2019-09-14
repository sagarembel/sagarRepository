package com.smt.bean;

import java.math.BigInteger;

public class CategoryList {

	private String category_name;
	private String subcat_name;
	private String cat_name;
	private BigInteger catId;

	public BigInteger getCatId() {
		return catId;
	}

	public void setCatId(BigInteger bigInteger) {
		this.catId = bigInteger;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public String getSubcat_name() {
		return subcat_name;
	}

	public void setSubcat_name(String subcat_name) {
		this.subcat_name = subcat_name;
	}

	public String getCat_name() {
		return cat_name;
	}

	public void setCat_name(String cat_name) {
		this.cat_name = cat_name;
	}

}
