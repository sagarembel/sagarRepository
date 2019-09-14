package com.smt.bean;

public class SalesmanDetailBean {

	private String empName;
	private Long empId;
	private Double commision;
	private Long fkEmpId;
	private Long billNo;
	private String itemName;
	private Double salePrice;

	public SalesmanDetailBean() {

		// TODO Auto-generated constructor stub
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public Long getEmpId() {
		return empId;
	}

	public void setEmpId(Long empId) {
		this.empId = empId;
	}

	public Long getFkEmpId() {
		return fkEmpId;
	}

	public void setFkEmpId(Long fkEmpId) {
		this.fkEmpId = fkEmpId;
	}

	public Double getCommision() {
		return commision;
	}

	public void setCommision(Double commision) {
		this.commision = commision;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

}
