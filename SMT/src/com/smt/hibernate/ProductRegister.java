package com.smt.hibernate;

import java.util.Date;

public class ProductRegister {

	private Long pkProductId;
	private Double vat;
	private Long fkCategoryId;
	private Long fkSubCategoryId;
	private String itemName;
	private Date isInsertDate;
	private String modelName;
	private String hsnsacno;
	private String size;
	private String color;
	private String catName;
	private Double buyPrice;
	private Double salePrice;
	private Long quantity;
	private Category category;
	private SubCategory subCategory;

	public ProductRegister(Long pkProductId, Double vat, Long fkCategoryId, Long fkSubCategoryId, String itemName, Date isInsertDate, String modelName, String hsnsacno, String size, Double buyPrice, Double salePrice, Long quantity, Category category, SubCategory subCategory, String color) {
		super();
		this.pkProductId = pkProductId;
		this.vat = vat;
		this.fkCategoryId = fkCategoryId;
		this.fkSubCategoryId = fkSubCategoryId;
		this.itemName = itemName;
		this.isInsertDate = isInsertDate;
		this.modelName = modelName;
		this.hsnsacno = hsnsacno;
		this.size = size;
		this.buyPrice = buyPrice;
		this.salePrice = salePrice;
		this.quantity = quantity;
		this.category = category;
		this.subCategory = subCategory;
		this.color = color;
	}

	public ProductRegister() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getPkProductId() {
		return pkProductId;
	}

	public void setPkProductId(Long pkProductId) {
		this.pkProductId = pkProductId;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public Double getVat() {
		return vat;
	}

	public void setVat(Double vat) {
		this.vat = vat;
	}

	public Long getFkCategoryId() {
		return fkCategoryId;
	}

	public void setFkCategoryId(Long fkCategoryId) {
		this.fkCategoryId = fkCategoryId;
	}

	public Long getFkSubCategoryId() {
		return fkSubCategoryId;
	}

	public void setFkSubCategoryId(Long fkSubCategoryId) {
		this.fkSubCategoryId = fkSubCategoryId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Date getIsInsertDate() {
		return isInsertDate;
	}

	public void setIsInsertDate(Date isInsertDate) {
		this.isInsertDate = isInsertDate;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public String getHsnsacno() {
		return hsnsacno;
	}

	public void setHsnsacno(String hsnsacno) {
		this.hsnsacno = hsnsacno;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Double getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public SubCategory getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(SubCategory subCategory) {
		this.subCategory = subCategory;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

}
