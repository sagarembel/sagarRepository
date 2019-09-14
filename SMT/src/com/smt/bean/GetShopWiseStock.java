package com.smt.bean;

public class GetShopWiseStock {

	private String supllierName;
	private String shopName;
	private Double purchasePrice;
	private Double salePrice;
	private String itemName;
	private Double normQuantity;
	private Double sQuantity;
	private Double availableQuantity;

	public String getSupllierName() {
		return supllierName;
	}

	public void setSupllierName(String supllierName) {
		this.supllierName = supllierName;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public Double getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(Double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Double getNormQuantity() {
		return normQuantity;
	}

	public void setNormQuantity(Double normQuantity) {
		this.normQuantity = normQuantity;
	}

	public Double getsQuantity() {
		return sQuantity;
	}

	public void setsQuantity(Double sQuantity) {
		this.sQuantity = sQuantity;
	}

	public Double getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(Double availableQuantity) {
		this.availableQuantity = availableQuantity;
	}

}
