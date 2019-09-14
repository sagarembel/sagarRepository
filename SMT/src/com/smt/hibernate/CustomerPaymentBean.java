package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;

public class CustomerPaymentBean implements Serializable {

	private Long pkCustPaymentId;
	private Long customer;
	private Long billNo;
	private String chequeNum;
	private Long cardNum;
	private Long accNum;
	private Long regNumber;
	private String paymentMode;
	private String nameOnCheck;
	private String bankName;
	private String personname;
	private Double totalAmount;
	private Double balance;
	private Double credit;
	private String paymentType;
	private Date insertDate;
	private String description;
	private Double returnAmount;
	private String receiptNo;
	

	public CustomerPaymentBean(Long pkCustPaymentId, Long customer, Long billNo, String chequeNum, Long cardNum, Long accNum, Long regNumber, String paymentMode, 
			String nameOnCheck, String bankName, String personname, Double totalAmount, Double balance, Double credit, Date insertDate, String paymentType,
			String description, Double returnAmount, String receiptNo) {
		super();
		this.pkCustPaymentId = pkCustPaymentId;
		this.customer = customer;
		this.billNo = billNo;
		this.chequeNum = chequeNum;
		this.cardNum = cardNum;
		this.accNum = accNum;
		this.regNumber = regNumber;
		this.paymentMode = paymentMode;
		this.nameOnCheck = nameOnCheck;
		this.bankName = bankName;
		this.personname = personname;
		this.totalAmount = totalAmount;
		this.balance = balance;
		this.credit = credit;
		this.insertDate = insertDate;
		this.paymentType = paymentType;
		this.description = description;
		this.returnAmount = returnAmount;
		this.receiptNo=receiptNo;
	}
	
	public Long getPkCustPaymentId() {
		return pkCustPaymentId;
	}

	public void setPkCustPaymentId(Long pkCustPaymentId) {
		this.pkCustPaymentId = pkCustPaymentId;
	}

	public Long getCustomer() {
		return customer;
	}

	public void setCustomer(Long customer) {
		this.customer = customer;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public String getChequeNum() {
		return chequeNum;
	}

	public void setChequeNum(String chequeNum) {
		this.chequeNum = chequeNum;
	}

	public Long getCardNum() {
		return cardNum;
	}

	public void setCardNum(Long cardNum) {
		this.cardNum = cardNum;
	}

	public Long getAccNum() {
		return accNum;
	}

	public void setAccNum(Long accNum) {
		this.accNum = accNum;
	}

	public Long getRegNumber() {
		return regNumber;
	}

	public void setRegNumber(Long regNumber) {
		this.regNumber = regNumber;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getNameOnCheck() {
		return nameOnCheck;
	}

	public void setNameOnCheck(String nameOnCheck) {
		this.nameOnCheck = nameOnCheck;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getPersonname() {
		return personname;
	}

	public void setPersonname(String personname) {
		this.personname = personname;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Double getCredit() {
		return credit;
	}

	public void setCredit(Double credit) {
		this.credit = credit;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public CustomerPaymentBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getReturnAmount() {
		return returnAmount;
	}

	public void setReturnAmount(Double returnAmount) {
		this.returnAmount = returnAmount;
	}

	public String getReceiptNo() {
		return receiptNo;
	}

	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}
}
