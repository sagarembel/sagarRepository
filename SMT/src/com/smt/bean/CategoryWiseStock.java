package com.smt.bean;

import java.math.BigDecimal;

public class CategoryWiseStock {

	private String supplierName;
	private String categoryName;
	private String itemName;
	private String shopName;
	private BigDecimal avilableQuan;
	private BigDecimal soldQuan;

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public BigDecimal getAvilableQuan() {
		return avilableQuan;
	}

	public void setAvilableQuan(BigDecimal avilableQuan) {
		this.avilableQuan = avilableQuan;
	}

	public BigDecimal getSoldQuan() {
		return soldQuan;
	}

	public void setSoldQuan(BigDecimal soldQuan) {
		this.soldQuan = soldQuan;
	}

}
