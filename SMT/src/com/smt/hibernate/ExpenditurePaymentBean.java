package com.smt.hibernate;

import java.util.Date;

public class ExpenditurePaymentBean {

	private Long pkExpPaymentId;
	private Long fkExpDetailId;
	private String serviceProvider;
	private Long contactNumber;
	private String accountantName;
	private String paymentType;
	private Double crDbAmount;
	private Double totalAmount;
	private Date insertDate;

	
	public ExpenditurePaymentBean(Long pkExpPaymentId, Long fkExpDetailId, String serviceProvider, Long contactNumber, String accountantName, String paymentType, 
			Double crDbAmount, Double totalAmount, Date insertDate, ExpenditureDetailsBean expenditureDetailsBean)
	{
		super();
		this.pkExpPaymentId = pkExpPaymentId;
		this.fkExpDetailId = fkExpDetailId;
		this.serviceProvider = serviceProvider;
		this.contactNumber = contactNumber;
		this.accountantName = accountantName;
		this.paymentType = paymentType;
		this.crDbAmount = crDbAmount;
		this.totalAmount = totalAmount;
		this.insertDate = insertDate;
		this.expenditureDetailsBean = expenditureDetailsBean;
	}

	public ExpenditurePaymentBean() {
		super();
		// TODO Auto-generated constructor stub
	}	
	
	
	// For Mapping
	private ExpenditureDetailsBean expenditureDetailsBean;

	public ExpenditureDetailsBean getExpenditureDetailsBean() {
		return expenditureDetailsBean;
	}

	public void setExpenditureDetailsBean(ExpenditureDetailsBean expenditureDetailsBean) {
		this.expenditureDetailsBean = expenditureDetailsBean;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Long getPkExpPaymentId() {
		return pkExpPaymentId;
	}

	public void setPkExpPaymentId(Long pkExpPaymentId) {
		this.pkExpPaymentId = pkExpPaymentId;
	}

	public Long getFkExpDetailId() {
		return fkExpDetailId;
	}

	public void setFkExpDetailId(Long fkExpDetailId) {
		this.fkExpDetailId = fkExpDetailId;
	}

	public String getServiceProvider() {
		return serviceProvider;
	}

	public void setServiceProvider(String serviceProvider) {
		this.serviceProvider = serviceProvider;
	}

	public Long getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(Long contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getAccountantName() {
		return accountantName;
	}

	public void setAccountantName(String accountantName) {
		this.accountantName = accountantName;
	}	

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Double getCrDbAmount() {
		return crDbAmount;
	}

	public void setCrDbAmount(Double crDbAmount) {
		this.crDbAmount = crDbAmount;
	}
}
