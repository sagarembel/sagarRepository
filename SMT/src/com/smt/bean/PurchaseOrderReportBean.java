package com.smt.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

public class PurchaseOrderReportBean {

	private BigInteger itemID;
	private Long OrderId;
	private String supplierName;
	private String insertDate;
	private Double unitPrice;
	private Double totalAmount;
	private String productName;
	private String expectedDate;
	private String color;
	private BigDecimal quantity;
	private BigInteger supplier_id;
	private java.sql.Timestamp insDate;
	private BigInteger billNo;
	private Double vatTotal;
	private Double expence;
	private String shopName;

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public BigInteger getBillNo() {
		return billNo;
	}

	public void setBillNo(BigInteger billNo) {
		this.billNo = billNo;
	}

	public Double getVatTotal() {
		return vatTotal;
	}

	public void setVatTotal(Double vatTotal) {
		this.vatTotal = vatTotal;
	}

	public BigInteger getSupplier_id() {
		return supplier_id;
	}

	public void setSupplier_id(BigInteger supplier_id) {
		this.supplier_id = supplier_id;
	}

	public BigInteger getItemID() {
		return itemID;
	}

	public void setItemID(BigInteger itemID) {
		this.itemID = itemID;
	}

	public java.sql.Timestamp getInsDate() {
		return insDate;
	}

	public void setInsDate(java.sql.Timestamp insDate) {
		this.insDate = insDate;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

	public Long getOrderId() {
		return OrderId;
	}

	public void setOrderId(Long orderId) {
		OrderId = orderId;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public Double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getExpectedDate() {
		return expectedDate;
	}

	public void setExpectedDate(String expectedDate) {
		this.expectedDate = expectedDate;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public Double getExpence() {
		return expence;
	}

	public void setExpence(Double expence) {
		this.expence = expence;
	}

}
