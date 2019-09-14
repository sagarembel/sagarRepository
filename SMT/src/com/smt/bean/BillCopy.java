package com.smt.bean;

public class BillCopy {

	private Long billNo;
	private String CustName;
	private String gstNo;
	private String lastName;

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getGstNo() {
		return gstNo;
	}

	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public String getCustName() {
		return CustName;
	}

	public void setCustName(String custName) {
		CustName = custName;
	}
}
