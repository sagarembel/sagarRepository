package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;

public class EmployeeDetailsBean implements Serializable {

	private long empId;
	private String firstName;
	private String middleName;
	private String lastName;
	private String address;
	private Date joiningDate;
	private long contactNo;
	private String emailId;
	private Double salary;
	private long zipCode;
	private Date resignDate;

	public long getZipCode() {
		return zipCode;
	}

	public void setZipCode(long zipCode) {
		this.zipCode = zipCode;
	}

	public long getEmpId() {
		return empId;
	}

	public void setEmpId(long empId) {
		this.empId = empId;
	}

	private long zipcode;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}

	public long getContactNo() {
		return contactNo;
	}

	public void setContactNo(long contactNo) {
		this.contactNo = contactNo;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public long getZipcode() {
		return zipcode;
	}

	public void setZipcode(long zipcode) {
		this.zipcode = zipcode;
	}

	public Date getResignDate() {
		return resignDate;
	}

	public void setResignDate(Date resignDate) {
		this.resignDate = resignDate;
	}

	public EmployeeDetailsBean(String firstName, String middleName, String lastName, String address, Date joiningDate, 
			long contactNo,	String emailId, Double salary, long zipcode, long empId, Date resignDate)
	{
		super();
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.address = address;
		this.joiningDate = joiningDate;
		this.contactNo = contactNo;
		this.emailId = emailId;
		this.salary = salary;
		this.zipcode = zipcode;
		this.empId = empId;
		this.resignDate=resignDate;
	}

	public EmployeeDetailsBean() {
		super();

	}

}
