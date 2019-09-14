package com.smt.bean;

public class SupplierPaymentDetail {

	private String supplierName;
	private String accountantName;
	private Double totalAmount;
	private Double balanceAmount;
	private Double credit;
	private String paymentMode;
	private String billNo;
	private String paymentType;
	private Double paymentAmount;
	private String date;
	private String AccountNo;
	private String bankName;
	private String description;
	private Double purchaseReturnAmt;

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getAccountantName() {
		return accountantName;
	}

	public void setAccountantName(String accountantName) {
		this.accountantName = accountantName;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Double getBalanceAmount() {
		return balanceAmount;
	}

	public void setBalanceAmount(Double balanceAmount) {
		this.balanceAmount = balanceAmount;
	}

	public Double getCredit() {
		return credit;
	}

	public void setCredit(Double credit) {
		this.credit = credit;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Double getPaymentAmount() {
		return paymentAmount;
	}

	public void setPaymentAmount(Double paymentAmount) {
		this.paymentAmount = paymentAmount;
	}

	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAccountNo() {
		return AccountNo;
	}

	public void setAccountNo(String accountNo) {
		AccountNo = accountNo;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPurchaseReturnAmt() {
		return purchaseReturnAmt;
	}

	public void setPurchaseReturnAmt(Double purchaseReturnAmt) {
		this.purchaseReturnAmt = purchaseReturnAmt;
	}
}
