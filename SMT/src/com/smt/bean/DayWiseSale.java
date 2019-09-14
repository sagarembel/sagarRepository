package com.smt.bean;

import java.math.BigDecimal;

public class DayWiseSale {

	private String itemName;
	private BigDecimal quantity;
	private Double quantity1;
	private Double price;
	private Double newTotalAmt;
	private Double totAmount;
	private Long customerBill;
	private Double discount;
	private Double dicountTotal;
	private Double cash;

	private Double card;

	private String isdate;

	public String getIsdate() {
		return isdate;
	}

	public void setIsdate(String isdate) {
		this.isdate = isdate;
	}

	public Double getCash() {
		return cash;
	}

	public void setCash(Double cash) {
		this.cash = cash;
	}

	public Double getCard() {
		return card;
	}

	public void setCard(Double card) {
		this.card = card;
	}

	public Double getQuantity1() {
		return quantity1;
	}

	public void setQuantity1(Double quantity1) {
		this.quantity1 = quantity1;
	}

	public Double getDicountTotal() {
		return dicountTotal;
	}

	public void setDicountTotal(Double dicountTotal) {
		this.dicountTotal = dicountTotal;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getNewTotalAmt() {
		return newTotalAmt;
	}

	public void setNewTotalAmt(Double newTotalAmt) {
		this.newTotalAmt = newTotalAmt;
	}

	public Double getTotAmount() {
		return totAmount;
	}

	public void setTotAmount(Double totAmount) {
		this.totAmount = totAmount;
	}

	public Long getCustomerBill() {
		return customerBill;
	}

	public void setCustomerBill(Long customerBill) {
		this.customerBill = customerBill;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

}
