package com.smt.bean;

public class Bean {

	private Long supplierId;
	private String supplierName;
	private Long productId;
	private String productName;
	private Long catId;
	private String categoryName;
	private Long itemId;
	private String itemName;

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
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

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Bean(Long supplierId, String supplierName, Long productId, String productName, Long catId, String categoryName, Long itemId, String itemName) {
		super();
		this.supplierId = supplierId;
		this.supplierName = supplierName;
		this.productId = productId;
		this.productName = productName;
		this.catId = catId;
		this.categoryName = categoryName;
		this.itemId = itemId;
		this.itemName = itemName;
	}

	public Bean() {
		// TODO Auto-generated constructor stub
	}
}
