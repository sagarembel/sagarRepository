package com.smt.hibernate;

import java.util.Set;

import org.apache.commons.lang.builder.ToStringBuilder;

/** @author Hibernate CodeGenerator */
public class Category {

	/** identifier field */
	private Long pkCategoryId;

	/** persistent field */
	private String activeYn;

	/** persistent field */
	private String categoryName;

	/** persistent field */
	private String isleafCat;

	/** persistent field */
	private String isrootCat;
	private Long serialnumber;

	/** persistent field */
	private Set productDetails;

	/** full constructor */
	public Category(Long pkCategoryId, String activeYn, String categoryName, String isleafCat, String isrootCat, Set productDetails) {
		this.pkCategoryId = pkCategoryId;
		this.activeYn = activeYn;
		this.categoryName = categoryName;
		this.isleafCat = isleafCat;
		this.isrootCat = isrootCat;
		this.productDetails = productDetails;
	}

	/** default constructor */
	public Category() {
	}

	public Long getPkCategoryId() {
		return this.pkCategoryId;
	}

	public void setPkCategoryId(Long pkCategoryId) {
		this.pkCategoryId = pkCategoryId;
	}

	public String getActiveYn() {
		return this.activeYn;
	}

	public void setActiveYn(String activeYn) {
		this.activeYn = activeYn;
	}

	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getIsleafCat() {
		return this.isleafCat;
	}

	public void setIsleafCat(String isleafCat) {
		this.isleafCat = isleafCat;
	}

	public String getIsrootCat() {
		return this.isrootCat;
	}

	public void setIsrootCat(String isrootCat) {
		this.isrootCat = isrootCat;
	}

	public Set getProductDetails() {
		return this.productDetails;
	}

	public void setProductDetails(Set productDetails) {
		this.productDetails = productDetails;
	}

	public String toString() {
		return new ToStringBuilder(this).append("pkCategoryId", getPkCategoryId()).toString();
	}

	public Long getSerialnumber() {
		return serialnumber;
	}

	public void setSerialnumber(Long serialnumber) {
		this.serialnumber = serialnumber;
	}

}
