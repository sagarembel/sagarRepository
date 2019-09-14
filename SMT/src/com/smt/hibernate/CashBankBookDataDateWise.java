package com.smt.hibernate;

public class CashBankBookDataDateWise
{
	private Long pkLastCashId;
	private String date;
	private Double totalAmount;
	private String saleReturnAmount;
	private String creditSaleAmount;
	private String creditRerturnAmount;
	private String purchaseReturnAmount;

	public CashBankBookDataDateWise(Long pkLastCashId, String date, Double totalAmount)
	{
		super();
		this.pkLastCashId = pkLastCashId;
		this.date = date;
		this.totalAmount = totalAmount;
	}

	public CashBankBookDataDateWise() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getPkLastCashId() {
		return pkLastCashId;
	}

	public void setPkLastCashId(Long pkLastCashId) {
		this.pkLastCashId = pkLastCashId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getSaleReturnAmount() {
		return saleReturnAmount;
	}

	public void setSaleReturnAmount(String saleReturnAmount) {
		this.saleReturnAmount = saleReturnAmount;
	}

	public String getCreditSaleAmount() {
		return creditSaleAmount;
	}

	public void setCreditSaleAmount(String creditSaleAmount) {
		this.creditSaleAmount = creditSaleAmount;
	}

	public String getCreditRerturnAmount() {
		return creditRerturnAmount;
	}

	public void setCreditRerturnAmount(String creditRerturnAmount) {
		this.creditRerturnAmount = creditRerturnAmount;
	}

	public String getPurchaseReturnAmount() {
		return purchaseReturnAmount;
	}

	public void setPurchaseReturnAmount(String purchaseReturnAmount) {
		this.purchaseReturnAmount = purchaseReturnAmount;
	}
}
