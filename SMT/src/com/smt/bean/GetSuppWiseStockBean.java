package com.smt.bean;

import java.math.BigDecimal;

public class GetSuppWiseStockBean {

	private String supplierName;
	private Long supplierId;
	private String itemName;
	private BigDecimal availableQuant;
	private BigDecimal soldQuantity;
	private String categoryName;

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public BigDecimal getAvailableQuant() {
		return availableQuant;
	}

	public void setAvailableQuant(BigDecimal availableQuant) {
		this.availableQuant = availableQuant;
	}

	public BigDecimal getSoldQuantity() {
		return soldQuantity;
	}

	public void setSoldQuantity(BigDecimal soldQuantity) {
		this.soldQuantity = soldQuantity;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

}
