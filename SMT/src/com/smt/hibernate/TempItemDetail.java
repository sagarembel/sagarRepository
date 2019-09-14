package com.smt.hibernate;

import java.util.Date;

public class TempItemDetail {

	private Long pk_temp_id;
	private String carNo;
	private String itemName;
	private Double salePrice;
	private Long cat_id;
	private Long item_id;
	private Long quantity;
	private Long barcodeNo;
	private String categoryName;
	private Date current_date;
	private char activeYN;
	private String hsnSacNo;
	private Double vat;
	private Double igst;
	private Double taxAmount;

	public TempItemDetail(Long pk_temp_id, String carNo, String itemName, Double salePrice, Long cat_id, Long item_id, Long quantity, Long barcodeNo, String categoryName, Date current_date, char activeYN, String hsnSacNo, Double vat, Double igst, Double taxAmount) {
		super();
		this.pk_temp_id = pk_temp_id;
		this.carNo = carNo;
		this.itemName = itemName;
		this.salePrice = salePrice;
		this.cat_id = cat_id;
		this.item_id = item_id;
		this.quantity = quantity;
		this.barcodeNo = barcodeNo;
		this.categoryName = categoryName;
		this.current_date = current_date;
		this.activeYN = activeYN;
		this.hsnSacNo = hsnSacNo;
		this.vat = vat;
		this.igst = igst;
		this.taxAmount = taxAmount;
	}

	public TempItemDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getPk_temp_id() {
		return pk_temp_id;
	}

	public void setPk_temp_id(Long pk_temp_id) {
		this.pk_temp_id = pk_temp_id;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
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

	public Long getCat_id() {
		return cat_id;
	}

	public void setCat_id(Long cat_id) {
		this.cat_id = cat_id;
	}

	public Long getItem_id() {
		return item_id;
	}

	public void setItem_id(Long item_id) {
		this.item_id = item_id;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Long getBarcodeNo() {
		return barcodeNo;
	}

	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Date getCurrent_date() {
		return current_date;
	}

	public void setCurrent_date(Date current_date) {
		this.current_date = current_date;
	}

	public char getActiveYN() {
		return activeYN;
	}

	public void setActiveYN(char activeYN) {
		this.activeYN = activeYN;
	}

	public String getHsnSacNo() {
		return hsnSacNo;
	}

	public void setHsnSacNo(String hsnSacNo) {
		this.hsnSacNo = hsnSacNo;
	}

	public Double getVat() {
		return vat;
	}

	public void setVat(Double vat) {
		this.vat = vat;
	}

	public Double getIgst() {
		return igst;
	}

	public void setIgst(Double igst) {
		this.igst = igst;
	}

	public Double getTaxAmount() {
		return taxAmount;
	}

	public void setTaxAmount(Double taxAmount) {
		this.taxAmount = taxAmount;
	}

}
