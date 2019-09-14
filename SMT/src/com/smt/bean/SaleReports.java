package com.smt.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

public class SaleReports {

	private Long orderId;
	private BigDecimal quantity;
	private String soldDate;
	private Double discount;
	private Double totalAmount;
	private Double tax;
	private Double netAmount;
	private Double SalePrice;
	private BigDecimal salePriceforsale;
	private Integer customerBill;
	private Double newTotAmt;
	private String itemName;
	private BigInteger itemId;
	private BigDecimal discountforsalereturn;
	private String color;
	private String empName;
	private String suppName;
	private String categoryName;
	private Double cashAmt;
	private Double cardAmt;

	public BigDecimal getSalePriceforsale() {
		return salePriceforsale;
	}

	public void setSalePriceforsale(BigDecimal salePriceforsale) {
		this.salePriceforsale = salePriceforsale;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public void setCustomerBill(Integer customerBill) {
		this.customerBill = customerBill;
	}

	public BigDecimal getDiscountforsalereturn() {
		return discountforsalereturn;
	}

	public void setDiscountforsalereturn(BigDecimal discountforsalereturn) {
		this.discountforsalereturn = discountforsalereturn;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public BigInteger getItemId() {
		return itemId;
	}

	public void setItemId(BigInteger itemId) {
		this.itemId = itemId;
	}

	public int getCustomerBill() {
		return customerBill;
	}

	public void setCustomerBill(int customerBill) {
		this.customerBill = customerBill;
	}

	public Double getSalePrice() {
		return SalePrice;
	}

	public void setSalePrice(Double salePrice) {
		SalePrice = salePrice;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public String getSoldDate() {
		return soldDate;
	}

	public void setSoldDate(String soldDate) {
		this.soldDate = soldDate;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Double getTax() {
		return tax;
	}

	public void setTax(Double tax) {
		this.tax = tax;
	}

	public Double getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(Double netAmount) {
		this.netAmount = netAmount;
	}

	public Double getNewTotAmt() {
		return newTotAmt;
	}

	public void setNewTotAmt(Double newTotAmt) {
		this.newTotAmt = newTotAmt;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getSuppName() {
		return suppName;
	}

	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Double getCashAmt() {
		return cashAmt;
	}

	public void setCashAmt(Double cashAmt) {
		this.cashAmt = cashAmt;
	}

	public Double getCardAmt() {
		return cardAmt;
	}

	public void setCardAmt(Double cardAmt) {
		this.cardAmt = cardAmt;
	}

}
