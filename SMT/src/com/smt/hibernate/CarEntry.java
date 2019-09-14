package com.smt.hibernate;

import java.util.Date;

public class CarEntry {

	private Long pkCarEntryId;
	private String carNo;
	private Long contactNo;
	private String ownerName;
	private char activeYN;
	private Date dateid;

	public CarEntry(Long pkCarEntryId, String carNo, Long contactNo, String ownerName, char activeYN, Date dateid) {
		super();
		this.pkCarEntryId = pkCarEntryId;
		this.carNo = carNo;
		this.contactNo = contactNo;
		this.ownerName = ownerName;
		this.activeYN = activeYN;
		this.dateid = dateid;
	}

	public CarEntry() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getPkCarEntryId() {
		return pkCarEntryId;
	}

	public void setPkCarEntryId(Long pkCarEntryId) {
		this.pkCarEntryId = pkCarEntryId;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public Long getContactNo() {
		return contactNo;
	}

	public void setContactNo(Long contactNo) {
		this.contactNo = contactNo;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public char getActiveYN() {
		return activeYN;
	}

	public void setActiveYN(char activeYN) {
		this.activeYN = activeYN;
	}

	public Date getDateid() {
		return dateid;
	}

	public void setDateid(Date dateid) {
		this.dateid = dateid;
	}

}
