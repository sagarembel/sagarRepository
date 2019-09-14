package com.smt.bean;

import java.math.BigInteger;

public class CreditCustPaymentDetail {

	private String creditCustomerFirstName;
	private String creditCustomerLastName;
	private Double totalAmount;
	private Double balanceAmount;
	private Double credit;
	private String paymentMode;
	private BigInteger billNo;
	private Double paymentAmount;
	private String PaymentType;
	private String paymentDate;
	private String catName;
	private String accountantName;
	private String date;
	private Double returnAmount;
	private String accountNo;
	private String description;
	private String bankName;	

	public String getAccountantName() {
		return accountantName;
	}

	public void setAccountantName(String accountantName) {
		this.accountantName = accountantName;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Double getPaymentAmount() {
		return paymentAmount;
	}

	public void setPaymentAmount(Double paymentAmount) {
		this.paymentAmount = paymentAmount;
	}

	public String getPaymentType() {
		return PaymentType;
	}

	public void setPaymentType(String paymentType) {
		PaymentType = paymentType;
	}

	public String getCreditCustomerFirstName() {
		return creditCustomerFirstName;
	}

	public void setCreditCustomerFirstName(String creditCustomerFirstName) {
		this.creditCustomerFirstName = creditCustomerFirstName;
	}

	public String getCreditCustomerLastName() {
		return creditCustomerLastName;
	}

	public void setCreditCustomerLastName(String creditCustomerLastName) {
		this.creditCustomerLastName = creditCustomerLastName;
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

	public BigInteger getBillNo() {
		return billNo;
	}

	public void setBillNo(BigInteger billNo) {
		this.billNo = billNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Double getReturnAmount() {
		return returnAmount;
	}

	public void setReturnAmount(Double returnAmount) {
		this.returnAmount = returnAmount;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
}
