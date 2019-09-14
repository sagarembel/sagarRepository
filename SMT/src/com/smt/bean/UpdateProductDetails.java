package com.smt.bean;

public class UpdateProductDetails {

	private Long catId;
	private String categoryName;
	private String subCatName;
	private String shopName;
	private String supplierName;
	private Long productId;
	private String productName;
	private String isVat;
	private Double vatPercentage;
	private String isAlterNate;
	private String isItem;
	private Double commission;

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

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

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getIsVat() {
		return isVat;
	}

	public void setIsVat(String isVat) {
		this.isVat = isVat;
	}

	public Double getVatPercentage() {
		return vatPercentage;
	}

	public void setVatPercentage(Double vatPercentage) {
		this.vatPercentage = vatPercentage;
	}

	public String getIsAlterNate() {
		return isAlterNate;
	}

	public void setIsAlterNate(String isAlterNate) {
		this.isAlterNate = isAlterNate;
	}

	public String getIsItem() {
		return isItem;
	}

	public void setIsItem(String isItem) {
		this.isItem = isItem;
	}

	public Double getCommission() {
		return commission;
	}

	public void setCommission(Double commission) {
		this.commission = commission;
	}

}
