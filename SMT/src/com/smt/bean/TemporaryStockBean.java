package com.smt.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

public class TemporaryStockBean {
	private Long temporaryStockBill;
	private Double price;
	private BigDecimal quantity;
	private String soldDate;
	private Double discount;
	private Double totalAmount;
	private Double netAmount;
	private Double SalePrice;
	private Double newTotAmt;
	private String itemName;
	private BigInteger itemId;
	private BigDecimal discountforsalereturn;
	private String color;
	private Long returnPeriod;
	private Long barcodeNo;
	private String person_shop_name;
	private Long fk_item_id;
	private String insertDate;
	private Long mobileNo;

	public Long getReturnPeriod() {
		return returnPeriod;
	}

	public void setReturnPeriod(Long returnPeriod) {
		this.returnPeriod = returnPeriod;
	}

	public Long getBarcodeNo() {
		return barcodeNo;
	}

	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public String getPerson_shop_name() {
		return person_shop_name;
	}

	public void setPerson_shop_name(String person_shop_name) {
		this.person_shop_name = person_shop_name;
	}

	public Long getTemporaryStockBill() {
		return temporaryStockBill;
	}

	public void setTemporaryStockBill(Long temporaryStockBill) {
		this.temporaryStockBill = temporaryStockBill;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
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

	public Double getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(Double netAmount) {
		this.netAmount = netAmount;
	}

	public Double getSalePrice() {
		return SalePrice;
	}

	public void setSalePrice(Double salePrice) {
		SalePrice = salePrice;
	}

	public Double getNewTotAmt() {
		return newTotAmt;
	}

	public void setNewTotAmt(Double newTotAmt) {
		this.newTotAmt = newTotAmt;
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

	public BigDecimal getDiscountforsalereturn() {
		return discountforsalereturn;
	}

	public void setDiscountforsalereturn(BigDecimal discountforsalereturn) {
		this.discountforsalereturn = discountforsalereturn;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Long getFk_item_id() {
		return fk_item_id;
	}

	public void setFk_item_id(Long fk_item_id) {
		this.fk_item_id = fk_item_id;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

	public Long getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(Long mobileNo) {
		this.mobileNo = mobileNo;
	}

}
