package com.smt.bean;

import java.util.Date;

public class SaleReturnBean {

	private Long pkBillId;
	private Long catId;
	private String itemName;
	private Double quantity;
	private Double salePrice;
	private Double grossamt;
	private Date current_date;
	private Double totalAmt;
	private Long billNo;
	private String categoryName;
	private Long pkItemId;
	private Long barcodeNo;
	private Long contactNo;
	private Double discount;
	private String ownerName;
	private String carNo;
	private String Date;
	//private Long editQuantity;
	private String editQuantity;
	private String size;
	private Double taxAmt;
	private String fkCreditCustId;
	private double gst;
	private double iGst;
	private double finalTotalPerProduct;
	private long productId;
	private long subCatId;
	private String subCatName;
		
	public Long getPkBillId() {
		return pkBillId;
	}

	public void setPkBillId(Long pkBillId) {
		this.pkBillId = pkBillId;
	}

	public Long getCatId() {
		return catId;
	}

	public void setCatId(Long catId) {
		this.catId = catId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public Double getGrossamt() {
		return grossamt;
	}

	public void setGrossamt(Double grossamt) {
		this.grossamt = grossamt;
	}

	public Date getCurrent_date() {
		return current_date;
	}

	public void setCurrent_date(Date current_date) {
		this.current_date = current_date;
	}

	public Double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(Double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Long getPkItemId() {
		return pkItemId;
	}

	public void setPkItemId(Long pkItemId) {
		this.pkItemId = pkItemId;
	}

	public Long getBarcodeNo() {
		return barcodeNo;
	}

	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public Long getContactNo() {
		return contactNo;
	}

	public void setContactNo(Long contactNo) {
		this.contactNo = contactNo;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getDate() {
		return Date;
	}

	public void setDate(String date) {
		Date = date;
	}

	/*public Long getEditQuantity() {
		return editQuantity;
	}

	public void setEditQuantity(Long editQuantity) {
		this.editQuantity = editQuantity;
	}*/

	public String getSize() {
		return size;
	}

	public String getEditQuantity() {
		return editQuantity;
	}

	public void setEditQuantity(String editQuantity) {
		this.editQuantity = editQuantity;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Double getTaxAmt() {
		return taxAmt;
	}

	public void setTaxAmt(Double taxAmt) {
		this.taxAmt = taxAmt;
	}

	public String getFkCreditCustId() {
		return fkCreditCustId;
	}

	public void setFkCreditCustId(String fkCreditCustId) {
		this.fkCreditCustId = fkCreditCustId;
	}

	public double getGst() {
		return gst;
	}

	public void setGst(double gst) {
		this.gst = gst;
	}

	public double getiGst() {
		return iGst;
	}

	public void setiGst(double iGst) {
		this.iGst = iGst;
	}

	public double getFinalTotalPerProduct() {
		return finalTotalPerProduct;
	}

	public void setFinalTotalPerProduct(double finalTotalPerProduct) {
		this.finalTotalPerProduct = finalTotalPerProduct;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public long getSubCatId() {
		return subCatId;
	}

	public void setSubCatId(long subCatId) {
		this.subCatId = subCatId;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}
}
