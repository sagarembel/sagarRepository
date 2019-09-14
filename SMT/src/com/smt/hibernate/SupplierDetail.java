package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;

/** @author Hibernate CodeGenerator */
public class SupplierDetail implements Serializable {

	/** identifier field */
	private Long supplierId;

	/** persistent field */
	private String address;

	private Long serialnumber;
	/** persistent field */
	private Date anniversary;

	/** persistent field */
	private String bankName;

	/** persistent field */
	private Date birthday;

	/** persistent field */
	private String branchName;

	/** persistent field */
	private String brand;

	/** persistent field */
	private String city;

	/** persistent field */
	private String contactPerson;

	/** persistent field */
	private Double creditLimit;

	/** persistent field */
	private Long cstNo;

	/** persistent field */
	private String email;

	/** persistent field */
	private String ifscCode;

	/* *//** persistent field */
	/*
	 * private String offer;
	 */

	/** persistent field */
	private String partyType;

	/** persistent field */
	private String paymentType;

	/** persistent field */
	private Long pin;

	/** persistent field */
	private String state;

	/** persistent field */
	private String supplierName;

	/** persistent field */
	private Long tinNo;

	private Long mobileno;
	private Long micrNo;
	private String panNo;
	private Long accountNo;

	private Double discount;
	private String suppCode;
	
	//goodrecieve data
	private String gRItemName;
	private String gRBarcode;
	private String taxType;
	
	

	/** full constructor */

	public SupplierDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SupplierDetail(Long supplierId, String address, Date anniversary, String bankName, Date birthday, String branchName, String brand, String city, 
			String contactPerson, Double creditLimit, Long cstNo, String email, String ifscCode, String partyType, String paymentType, Long pin, String state, 
			String supplierName, Long tinNo, Long mobileno, Long micrNo, String panNo, Long accountNo, Double discount, String suppCode, String taxType)
	{
		super();
		this.supplierId = supplierId;
		this.address = address;
		this.anniversary = anniversary;
		this.bankName = bankName;
		this.birthday = birthday;
		this.branchName = branchName;
		this.brand = brand;
		this.city = city;
		this.contactPerson = contactPerson;
		this.creditLimit = creditLimit;
		this.cstNo = cstNo;
		this.email = email;
		this.ifscCode = ifscCode;
		this.partyType = partyType;
		this.paymentType = paymentType;
		this.pin = pin;
		this.state = state;
		this.supplierName = supplierName;
		this.tinNo = tinNo;
		this.mobileno = mobileno;
		this.micrNo = micrNo;
		this.panNo = panNo;
		this.accountNo = accountNo;
		this.discount = discount;
		this.suppCode = suppCode;
		this.taxType=taxType;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getAnniversary() {
		return anniversary;
	}

	public void setAnniversary(Date anniversary) {
		this.anniversary = anniversary;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public Double getCreditLimit() {
		return creditLimit;
	}

	public void setCreditLimit(Double creditLimit) {
		this.creditLimit = creditLimit;
	}

	public Long getCstNo() {
		return cstNo;
	}

	public void setCstNo(Long cstNo) {
		this.cstNo = cstNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

	public String getPartyType() {
		return partyType;
	}

	public void setPartyType(String partyType) {
		this.partyType = partyType;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Long getPin() {
		return pin;
	}

	public void setPin(Long pin) {
		this.pin = pin;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public Long getTinNo() {
		return tinNo;
	}

	public void setTinNo(Long tinNo) {
		this.tinNo = tinNo;
	}

	public Long getMobileno() {
		return mobileno;
	}

	public void setMobileno(Long mobileno) {
		this.mobileno = mobileno;
	}

	public Long getMicrNo() {
		return micrNo;
	}

	public void setMicrNo(Long micrNo) {
		this.micrNo = micrNo;
	}

	public String getPanNo() {
		return panNo;
	}

	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}

	public Long getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(Long accountNo) {
		this.accountNo = accountNo;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Long getSerialnumber() {
		return serialnumber;
	}

	public void setSerialnumber(Long serialnumber) {
		this.serialnumber = serialnumber;
	}

	public String getSuppCode() {
		return suppCode;
	}

	public void setSuppCode(String suppCode) {
		this.suppCode = suppCode;
	}
	
	//goodrecieve
	public String getgRItemName() {
		return gRItemName;
	}

	public void setgRItemName(String gRItemName) {
		this.gRItemName = gRItemName;
	}

	public String getgRBarcode() {
		return gRBarcode;
	}

	public void setgRBarcode(String gRBarcode) {
		this.gRBarcode = gRBarcode;
	}

	public String getTaxType() {
		return taxType;
	}

	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}	
}
