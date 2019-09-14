package com.smt.bean;

import java.math.BigDecimal;

public class CurrentStockDetails {

	private String supplierName;
	private String categoryName;
	private String subCategoryName;
	private String leafCategoryName;
	private String itemName;
	private String color;
	private Double size;
	private Double mrp;
	private Long totalQuantity;
	private Long itemId;;
	private Long soldQuantity;
	private Long availableQuantity;
	private Double valuation;
	private Double salePrice;
	private Double buyPrice;
	private String shopName;
	private BigDecimal totalQuantityForCurrentStock;

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

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	public String getLeafCategoryName() {
		return leafCategoryName;
	}

	public void setLeafCategoryName(String leafCategoryName) {
		this.leafCategoryName = leafCategoryName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Double getSize() {
		return size;
	}

	public void setSize(Double size) {
		this.size = size;
	}

	public Double getMrp() {
		return mrp;
	}

	public void setMrp(Double mrp) {
		this.mrp = mrp;
	}

	public Long getTotalQuantity() {
		return totalQuantity;
	}

	public void setTotalQuantity(Long totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	public Long getSoldQuantity() {
		return soldQuantity;
	}

	public void setSoldQuantity(Long soldQuantity) {
		this.soldQuantity = soldQuantity;
	}

	public Long getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(Long availableQuantity) {
		this.availableQuantity = availableQuantity;
	}

	public Double getValuation() {
		return valuation;
	}

	public void setValuation(Double valuation) {
		this.valuation = valuation;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public Double getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public BigDecimal getTotalQuantityForCurrentStock() {
		return totalQuantityForCurrentStock;
	}

	public void setTotalQuantityForCurrentStock(BigDecimal totalQuantityForCurrentStock) {
		this.totalQuantityForCurrentStock = totalQuantityForCurrentStock;
	}

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

}
