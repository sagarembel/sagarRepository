package com.smt.bean;

import java.math.BigInteger;

public class EmployeeAttendBean {

	private BigInteger id;
	private String empName;
	private String department;
	private String designation;
	private BigInteger totalworkday;
	private BigInteger leaveday;
	private BigInteger attendday;
	private BigInteger paidleaveday;
	private BigInteger unpaidleaveday;
	private BigInteger halfday;

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public BigInteger getTotalworkday() {
		return totalworkday;
	}

	public void setTotalworkday(BigInteger totalworkday) {
		this.totalworkday = totalworkday;
	}

	public BigInteger getLeaveday() {
		return leaveday;
	}

	public void setLeaveday(BigInteger leaveday) {
		this.leaveday = leaveday;
	}

	public BigInteger getAttendday() {
		return attendday;
	}

	public void setAttendday(BigInteger attendday) {
		this.attendday = attendday;
	}

	public BigInteger getPaidleaveday() {
		return paidleaveday;
	}

	public void setPaidleaveday(BigInteger paidleaveday) {
		this.paidleaveday = paidleaveday;
	}

	public BigInteger getUnpaidleaveday() {
		return unpaidleaveday;
	}

	public void setUnpaidleaveday(BigInteger unpaidleaveday) {
		this.unpaidleaveday = unpaidleaveday;
	}

	public BigInteger getHalfday() {
		return halfday;
	}

	public void setHalfday(BigInteger halfday) {
		this.halfday = halfday;
	}

}
