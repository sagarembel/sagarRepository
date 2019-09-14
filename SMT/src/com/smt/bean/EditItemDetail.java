package com.smt.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

public class EditItemDetail {

	private String mmcc;
	private Double size;
	private BigDecimal salePrice;
	private BigDecimal buyPrice;
	private String itemName;
	private String color;
	private BigInteger pkproductid;

	public String getMmcc() {
		return mmcc;
	}

	public void setMmcc(String mmcc) {
		this.mmcc = mmcc;
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

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public BigDecimal getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(BigDecimal buyPrice) {
		this.buyPrice = buyPrice;
	}

	public BigInteger getPkproductid() {
		return pkproductid;
	}

	public void setPkproductid(BigInteger pkproductid) {
		this.pkproductid = pkproductid;
	}

}
