package com.smt.bean;

public class DayWiseSalesmanCommision {

	private String empName;
	private Long empId;
	private Double commision;
	private String insertDate;
	private Double commisionforemp;
	private Double totalAmt;
	private Double quantity;
	private Double commisionAmount;
	private Double salary;

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public Double getCommisionforemp() {
		return commisionforemp;
	}

	public void setCommisionforemp(Double commisionforemp) {
		this.commisionforemp = commisionforemp;
	}

	public Double getCommisionAmount() {
		return commisionAmount;
	}

	public void setCommisionAmount(Double commisionAmount) {
		this.commisionAmount = commisionAmount;
	}

	public Double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(Double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
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

	public Double getCommision() {
		return commision;
	}

	public void setCommision(Double commision) {
		this.commision = commision;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

}
