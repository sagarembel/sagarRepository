package com.smt.bean;

public class EmpNameWiseLeave {

	private Long id;
	private String empName;
	private String typeofleave;
	private String reason;
	private String approvedby;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getTypeofleave() {
		return typeofleave;
	}

	public void setTypeofleave(String typeofleave) {
		this.typeofleave = typeofleave;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getApprovedby() {
		return approvedby;
	}

	public void setApprovedby(String approvedby) {
		this.approvedby = approvedby;
	}

}
