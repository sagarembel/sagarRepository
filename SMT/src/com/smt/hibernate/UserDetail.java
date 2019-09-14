package com.smt.hibernate;

import java.io.Serializable;

/** @author Hibernate CodeGenerator */
public class UserDetail implements Serializable {

	/** identifier field */
	private Long pkUserId;

	/** nullable persistent field */
	private String typeId;

	/** nullable persistent field */
	private String userName;

	/** nullable persistent field */
	private String password;

	/** nullable persistent field */
	private String repassword;

	public UserDetail(Long pkUserId, String typeId, String userName, String password, String repassword) {
		super();
		this.pkUserId = pkUserId;
		this.typeId = typeId;
		this.userName = userName;
		this.password = password;
		this.repassword = repassword;
	}

	public UserDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getPkUserId() {
		return pkUserId;
	}

	public void setPkUserId(Long pkUserId) {
		this.pkUserId = pkUserId;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRepassword() {
		return repassword;
	}

	public void setRepassword(String repassword) {
		this.repassword = repassword;
	}
}
