package com.smt.bean;

public class CustomerList {

	private Long billNo;
	private String date;
	private String customerName;
	private Long mobNo;
	private Double amount;

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Long getMobNo() {
		return mobNo;
	}

	public void setMobNo(Long mobNo) {
		this.mobNo = mobNo;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
