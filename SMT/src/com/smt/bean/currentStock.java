package com.smt.bean;

import java.util.Date;

public class currentStock {
	
	private String catName;
	private String itemName;
	private String barcode;
	private Double quantity;
	private String Age;
	private String SaleDate;
	private Double salePrice;
	private Double total;
	private String rollSize;
	private String size;
	private double stockinmeter;
	private String subCatName;
	private Double returnquantity;;
	
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getBarcode() {
		return barcode;
	}
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}
	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	public String getAge() {
		return Age;
	}
	public void setAge(String age) {
		Age = age;
	}
	public String getSaleDate() {
		return SaleDate;
	}
	public void setSaleDate(String saleDate) {
		SaleDate = saleDate;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getRollSize() {
		return rollSize;
	}
	public void setRollSize(String rollSize) {
		this.rollSize = rollSize;
	}
	public double getStockinmeter() {
		return stockinmeter;
	}
	public void setStockinmeter(double stockinmeter) {
		this.stockinmeter = stockinmeter;
	}
	public String getSubCatName() {
		return subCatName;
	}
	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}
	public Double getReturnquantity() {
		return returnquantity;
	}
	public void setReturnquantity(Double returnquantity) {
		this.returnquantity = returnquantity;
	}
}
