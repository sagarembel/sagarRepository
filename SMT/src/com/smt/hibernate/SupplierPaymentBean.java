package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;

public class SupplierPaymentBean implements Serializable {

	private Long pkSupPaymentId;
	private Long supplier;
	private String billNo;
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
	private String description;
	private String receiptNo;
	private Double purchaseReturnedAmount;
	private Long barCodeNo;

	private Date insertDate;

	public SupplierPaymentBean(Long pkSupPaymentId, Long supplier, String billNo, String chequeNum, Long cardNum, Long accNum, Long regNumber, 
			String paymentMode, String nameOnCheck, String bankName, String personname, Double totalAmount, Double balance, Double credit, String description, 
			Date insertDate, String paymentNote, String receiptNo, Double purchaseReturnedAmount, Long barCodeNo) {
		super();
		this.pkSupPaymentId = pkSupPaymentId;
		this.supplier = supplier;
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
		this.paymentType = paymentType;
		this.insertDate = insertDate;
		this.description=paymentNote;
		this.receiptNo=receiptNo;
		this.purchaseReturnedAmount=purchaseReturnedAmount;
		this.barCodeNo=barCodeNo;
	}

	public SupplierPaymentBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getPkSupPaymentId() {
		return pkSupPaymentId;
	}

	public void setPkSupPaymentId(Long pkSupPaymentId) {
		this.pkSupPaymentId = pkSupPaymentId;
	}

	public Long getSupplier() {
		return supplier;
	}

	public void setSupplier(Long supplier) {
		this.supplier = supplier;
	}

	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
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

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReceiptNo() {
		return receiptNo;
	}

	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}

	public Double getPurchaseReturnedAmount() {
		return purchaseReturnedAmount;
	}

	public void setPurchaseReturnedAmount(Double purchaseReturnedAmount) {
		this.purchaseReturnedAmount = purchaseReturnedAmount;
	}

	public Long getBarCodeNo() {
		return barCodeNo;
	}

	public void setBarCodeNo(Long barCodeNo) {
		this.barCodeNo = barCodeNo;
	}
}
