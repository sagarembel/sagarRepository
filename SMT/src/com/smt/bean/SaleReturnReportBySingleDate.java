package com.smt.bean;

import java.math.BigDecimal;

public class SaleReturnReportBySingleDate {

	private Long customerBill;
	private String itemName;
	private BigDecimal quantity;
	private Double newTotalAmount;
	private Double totalAmount;
	private String insertDate;

	public Long getCustomerBill() {
		return customerBill;
	}

	public void setCustomerBill(Long customerBill) {
		this.customerBill = customerBill;
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

	public Double getNewTotalAmount() {
		return newTotalAmount;
	}

	public void setNewTotalAmount(Double newTotalAmount) {
		this.newTotalAmount = newTotalAmount;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

}
