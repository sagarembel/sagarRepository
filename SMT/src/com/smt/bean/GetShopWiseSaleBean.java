package com.smt.bean;

import java.math.BigDecimal;

public class GetShopWiseSaleBean {

	private String shopName;
	private String itemName;
	private Double salePrice;
	private Double quantity;
	private Double totalAmount;
	private String insertDate;
	private Double discount;
	private Long customerBill;
	private Double cardAmt;
	private Double cashAmt;
	private BigDecimal newDiscount;
	private Double newTotalAmt;

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Double getNewTotalAmt() {
		return newTotalAmt;
	}

	public void setNewTotalAmt(Double newTotalAmt) {
		this.newTotalAmt = newTotalAmt;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

	public BigDecimal getNewDiscount() {
		return newDiscount;
	}

	public void setNewDiscount(BigDecimal newDiscount) {
		this.newDiscount = newDiscount;
	}

	public Long getCustomerBill() {
		return customerBill;
	}

	public void setCustomerBill(Long customerBill) {
		this.customerBill = customerBill;
	}

	public Double getCardAmt() {
		return cardAmt;
	}

	public void setCardAmt(Double cardAmt) {
		this.cardAmt = cardAmt;
	}

	public Double getCashAmt() {
		return cashAmt;
	}

	public void setCashAmt(Double cashAmt) {
		this.cashAmt = cashAmt;
	}

}
