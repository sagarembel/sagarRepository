package com.smt.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

public class PoItemDisplayBean {
	private BigInteger itemID;
	private BigInteger SupplierId;
	private String itemName;
	private String color;
	private String size;
	private Double buyPrice;
	private String model;
	private Long quantity;
	private String buyPriceForItemNAme;
	private Double vatPec;
	private Double salePrice;
	private String shopName;
	private BigDecimal newsalePrice;
	private BigDecimal newbuyPrice;
	private String buyPriceforGrn;

	public BigInteger getSupplierId() {
		return SupplierId;
	}

	public void setSupplierId(BigInteger supplierId) {
		SupplierId = supplierId;
	}

	public String getBuyPriceforGrn() {
		return buyPriceforGrn;
	}

	public void setBuyPriceforGrn(String buyPriceforGrn) {
		this.buyPriceforGrn = buyPriceforGrn;
	}

	public BigDecimal getNewbuyPrice() {
		return newbuyPrice;
	}

	public void setNewbuyPrice(BigDecimal newbuyPrice) {
		this.newbuyPrice = newbuyPrice;
	}

	public BigDecimal getNewsalePrice() {
		return newsalePrice;
	}

	public void setNewsalePrice(BigDecimal newsalePrice) {
		this.newsalePrice = newsalePrice;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getBuyPriceForItemNAme() {
		return buyPriceForItemNAme;
	}

	public void setBuyPriceForItemNAme(String buyPriceForItemNAme) {
		this.buyPriceForItemNAme = buyPriceForItemNAme;
	}

	public BigInteger getItemID() {
		return itemID;
	}

	public void setItemID(BigInteger itemID) {
		this.itemID = itemID;
	}

	public Double getVatPec() {
		return vatPec;
	}

	public void setVatPec(Double vatPec) {
		this.vatPec = vatPec;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
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

	public Double getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}
}
