package com.smt.hibernate;

import java.util.Date;

public class SaleReturn
{
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
	private Long barcodeNo;
	private Long contactNo;
	private Double discount;
	private String carNo;
	private Date Date;
	private Double editQuantity;
	private Double afterQuantity;
	private Double returnTotal;
	private Double returnGrossTotal;
	private String customerName;
	private String type;
	private Long fkCreditCustId;
	private Long transactionId;
	private Double gst;
	private Double iGst;
	private Double taxAmount;
	private String returnReason;
	private Long productId;
	private Long subCatId;
	private String userType;
	private Long FkUserId;
	private Long redeemedForBillNo;
	
	public SaleReturn() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SaleReturn(Long pkBillId, Long catId, String itemName, Double quantity, Double salePrice, Double grossamt, java.util.Date current_date, Double totalAmt, 
			Long billNo, String categoryName, Long barcodeNo, Long contactNo, Double discount, String carNo, Date date, Double editQuantity, Double afterQuantity, 
			Double returnTotal, Double returnGrossTotal, String customerName, String type, Long fkCreditCustId, Long transactionId,	Double gst, Double iGst, 
			Double taxAmount, String returnReason, long productId, long subCatId, String userType, long FkUserId, Long redeemedForBillNo)
	{
		super();
		this.pkBillId = pkBillId;
		this.catId = catId;
		this.itemName = itemName;
		this.quantity = quantity;
		this.salePrice = salePrice;
		this.grossamt = grossamt;
		this.current_date = current_date;
		this.totalAmt = totalAmt;
		this.billNo = billNo;
		this.categoryName = categoryName;
		this.barcodeNo = barcodeNo;
		this.contactNo = contactNo;
		this.discount = discount;
		this.carNo = carNo;
		Date = date;
		this.editQuantity = editQuantity;
		this.afterQuantity = afterQuantity;
		this.returnTotal = returnTotal;
		this.returnGrossTotal = returnGrossTotal;
		this.customerName = customerName;
		this.type = type;
		this.fkCreditCustId=fkCreditCustId;
		this.transactionId=transactionId;
		this.gst=gst;
		this.iGst=iGst;
		this.taxAmount=taxAmount;
		this.returnReason = returnReason;
		this.productId=productId;
		this.subCatId=subCatId;
		this.FkUserId=FkUserId;
		this.userType=userType;
		this.redeemedForBillNo=redeemedForBillNo;
	}

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

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}	

	public Date getDate() {
		return Date;
	}

	public void setDate(Date date) {
		Date = date;
	}

	public Double getEditQuantity() {
		return editQuantity;
	}

	public void setEditQuantity(Double editQuantity) {
		this.editQuantity = editQuantity;
	}

	public Double getAfterQuantity() {
		return afterQuantity;
	}

	public void setAfterQuantity(Double afterQuantity) {
		this.afterQuantity = afterQuantity;
	}

	public Double getReturnTotal() {
		return returnTotal;
	}

	public void setReturnTotal(Double returnTotal) {
		this.returnTotal = returnTotal;
	}

	public Double getReturnGrossTotal() {
		return returnGrossTotal;
	}

	public void setReturnGrossTotal(Double returnGrossTotal) {
		this.returnGrossTotal = returnGrossTotal;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getFkCreditCustId() {
		return fkCreditCustId;
	}

	public void setFkCreditCustId(Long fkCreditCustId) {
		this.fkCreditCustId = fkCreditCustId;
	}

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public Double getGst() {
		return gst;
	}

	public void setGst(Double gst) {
		this.gst = gst;
	}

	public Double getiGst() {
		return iGst;
	}

	public void setiGst(Double iGst) {
		this.iGst = iGst;
	}

	public Double getTaxAmount() {
		return taxAmount;
	}

	public void setTaxAmount(Double taxAmount) {
		this.taxAmount = taxAmount;
	}

	public String getReturnReason() {
		return returnReason;
	}

	public void setReturnReason(String returnReason) {
		this.returnReason = returnReason;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getSubCatId() {
		return subCatId;
	}

	public void setSubCatId(Long subCatId) {
		this.subCatId = subCatId;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public Long getFkUserId() {
		return FkUserId;
	}

	public void setFkUserId(Long fkUserId) {
		FkUserId = fkUserId;
	}

	public Long getRedeemedForBillNo() {
		return redeemedForBillNo;
	}

	public void setRedeemedForBillNo(Long redeemedForBillNo) {
		this.redeemedForBillNo = redeemedForBillNo;
	}
}
