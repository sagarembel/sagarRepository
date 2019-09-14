package com.smt.bean;

public class CreditDebitReportBean
{	
	private String trIdOrBillNo;
	private String transactionOf;
	private String discription;
	private String transactionDate;
	private String transactionPaymentType;
	private String transactionAmt;
	private Double credit;
	private Double debit;
	private String name;

	public Double getCredit() {
		return credit;
	}

	public void setCredit(Double credit) {
		this.credit = credit;
	}

	public Double getDebit() {
		return debit;
	}

	public void setDebit(Double debit) {
		this.debit = debit;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTrIdOrBillNo() {
		return trIdOrBillNo;
	}

	public void setTrIdOrBillNo(String trIdOrBillNo) {
		this.trIdOrBillNo = trIdOrBillNo;
	}

	public String getTransactionOf() {
		return transactionOf;
	}

	public void setTransactionOf(String transactionOf) {
		this.transactionOf = transactionOf;
	}

	public String getDiscription() {
		return discription;
	}

	public void setDiscription(String discription) {
		this.discription = discription;
	}

	public String getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getTransactionPaymentType() {
		return transactionPaymentType;
	}

	public void setTransactionPaymentType(String transactionPaymentType) {
		this.transactionPaymentType = transactionPaymentType;
	}

	public String getTransactionAmt() {
		return transactionAmt;
	}

	public void setTransactionAmt(String transactionAmt) {
		this.transactionAmt = transactionAmt;
	}	
}
