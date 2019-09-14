package com.smt.bean;

public class TotalCashBookReport {

	private String name;
	private String custType;
	private String paymentType;
	private String paymentBy;
	private double chequeNo;
	private String chequeDate;
	private double cardNo;
	private double neftAccNo;
	private double amount;
	private String reason;

	public TotalCashBookReport() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TotalCashBookReport(String name, String custType, String paymentType, String paymentBy, double chequeNo, String chequeDate, double cardNo, double neftAccNo, double amount, String reason) {
		super();
		this.name = name;
		this.custType = custType;
		this.paymentType = paymentType;
		this.paymentBy = paymentBy;
		this.chequeNo = chequeNo;
		this.chequeDate = chequeDate;
		this.cardNo = cardNo;
		this.neftAccNo = neftAccNo;
		this.amount = amount;
		this.reason = reason;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public String getPaymentBy() {
		return paymentBy;
	}

	public void setPaymentBy(String paymentBy) {
		this.paymentBy = paymentBy;
	}

	public double getChequeNo() {
		return chequeNo;
	}

	public void setChequeNo(double chequeNo) {
		this.chequeNo = chequeNo;
	}

	public String getChequeDate() {
		return chequeDate;
	}

	public void setChequeDate(String chequeDate) {
		this.chequeDate = chequeDate;
	}

	public double getCardNo() {
		return cardNo;
	}

	public void setCardNo(double cardNo) {
		this.cardNo = cardNo;
	}

	public double getNeftAccNo() {
		return neftAccNo;
	}

	public void setNeftAccNo(double neftAccNo) {
		this.neftAccNo = neftAccNo;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

}
