package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;

public class SupplierAccountDetailsBean implements Serializable {

	private Long pkSupplierAccDetailsId;
	private Long fk_supplier_id;
	private Long billNo;
	private Double totalAmt;
	private Date insertDate;
	private SupplierDetail supplierDetailsBean;

	public SupplierAccountDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SupplierAccountDetailsBean(Long pkSupplierAccDetailsId, Long fk_supplier_id, Long billNo, Double totalAmt, Date insertDate, SupplierDetail supplierDetailsBean) {
		super();
		this.pkSupplierAccDetailsId = pkSupplierAccDetailsId;
		this.fk_supplier_id = fk_supplier_id;
		this.billNo = billNo;
		this.totalAmt = totalAmt;
		this.insertDate = insertDate;
		this.supplierDetailsBean = supplierDetailsBean;
	}

	public Long getPkSupplierAccDetailsId() {
		return pkSupplierAccDetailsId;
	}

	public void setPkSupplierAccDetailsId(Long pkSupplierAccDetailsId) {
		this.pkSupplierAccDetailsId = pkSupplierAccDetailsId;
	}

	public Long getFk_supplier_id() {
		return fk_supplier_id;
	}

	public void setFk_supplier_id(Long fk_supplier_id) {
		this.fk_supplier_id = fk_supplier_id;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public Double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(Double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public SupplierDetail getSupplierDetailsBean() {
		return supplierDetailsBean;
	}

	public void setSupplierDetailsBean(SupplierDetail supplierDetailsBean) {
		this.supplierDetailsBean = supplierDetailsBean;
	}

}
