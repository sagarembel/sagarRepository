package com.smt.bean;

public class ParcelEntryBean {

	private long pkParcelEntryId;
	private long invoiceNo;
	private long challanNo;
	private String supplierName;
	private String transportName;
	private Double invoiceAmount;
	private Double paidAmount;
	private Double transportFees;
	private String checkInBy;
	private Double totalPaid;
	private String insertDate;
	private String checkedBy;

	public long getPkParcelEntryId() {
		return pkParcelEntryId;
	}

	public void setPkParcelEntryId(long pkParcelEntryId) {
		this.pkParcelEntryId = pkParcelEntryId;
	}

	public long getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(long invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public long getChallanNo() {
		return challanNo;
	}

	public void setChallanNo(long challanNo) {
		this.challanNo = challanNo;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getTransportName() {
		return transportName;
	}

	public Double getInvoiceAmount() {
		return invoiceAmount;
	}

	public void setInvoiceAmount(Double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}

	public Double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(Double paidAmount) {
		this.paidAmount = paidAmount;
	}

	public Double getTransportFees() {
		return transportFees;
	}

	public void setTransportFees(Double transportFees) {
		this.transportFees = transportFees;
	}

	public Double getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(Double totalPaid) {
		this.totalPaid = totalPaid;
	}

	public void setTransportName(String transportName) {
		this.transportName = transportName;
	}

	public String getCheckInBy() {
		return checkInBy;
	}

	public void setCheckInBy(String checkInBy) {
		this.checkInBy = checkInBy;
	}

	public String getCheckedBy() {
		return checkedBy;
	}

	public void setCheckedBy(String checkedBy) {
		this.checkedBy = checkedBy;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

}
