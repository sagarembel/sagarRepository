package com.smt.bean;

public class BrokerList {

	private Long pk_broker_id;
	private String FirstName;
	private String LastName;
	private String AccountType;
	private Long ContactNo;
	private String Address;
	private Long AccountNo;

	public Long getPk_broker_id() {
		return pk_broker_id;
	}

	public void setPk_broker_id(Long pk_broker_id) {
		this.pk_broker_id = pk_broker_id;
	}

	public String getFirstName() {
		return FirstName;
	}

	public void setFirstName(String firstName) {
		FirstName = firstName;
	}

	public String getLastName() {
		return LastName;
	}

	public void setLastName(String lastName) {
		LastName = lastName;
	}

	public Long getContactNo() {
		return ContactNo;
	}

	public void setContactNo(Long contactNo) {
		ContactNo = contactNo;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public Long getAccountNo() {
		return AccountNo;
	}

	public void setAccountNo(Long accountNo) {
		AccountNo = accountNo;
	}

	public String getAccountType() {
		return AccountType;
	}

	public void setAccountType(String accountType) {
		AccountType = accountType;
	}

}
