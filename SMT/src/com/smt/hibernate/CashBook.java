package com.smt.hibernate;

import java.util.*;

public class CashBook {

	private long pkCashBookEntry;
	private String payToId;
	private String toPayNameId;
	private Date paymentDate;
	private String paymentTypeId;
	private String paymebtById;
	private long chequeNoId;
	private Date chequeDateId;
	private long cardNoId;
	private long neftAccNoId;
	private Double paymentAmountId;
	private String paymentReasonId;
	private String paymentDate1;

	public CashBook() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CashBook(long pkCashBookEntry, String payToId, String toPayNameId, Date paymentDate, String paymentTypeId, String paymebtById, long chequeNoId, Date chequeDateId, long cardNoId, long neftAccNoId, Double paymentAmountId, String paymentReasonId) {
		super();
		this.pkCashBookEntry = pkCashBookEntry;
		this.payToId = payToId;
		this.toPayNameId = toPayNameId;
		this.paymentDate = paymentDate;
		this.paymentTypeId = paymentTypeId;
		this.paymebtById = paymebtById;
		this.chequeNoId = chequeNoId;
		this.chequeDateId = chequeDateId;
		this.cardNoId = cardNoId;
		this.neftAccNoId = neftAccNoId;
		this.paymentAmountId = paymentAmountId;
		this.paymentReasonId = paymentReasonId;
	}

	public long getPkCashBookEntry() {
		return pkCashBookEntry;
	}

	public void setPkCashBookEntry(long pkCashBookEntry) {
		this.pkCashBookEntry = pkCashBookEntry;
	}

	public String getPayToId() {
		return payToId;
	}

	public void setPayToId(String payToId) {
		this.payToId = payToId;
	}

	public String getToPayNameId() {
		return toPayNameId;
	}

	public void setToPayNameId(String toPayNameId) {
		this.toPayNameId = toPayNameId;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentTypeId() {
		return paymentTypeId;
	}

	public void setPaymentTypeId(String paymentTypeId) {
		this.paymentTypeId = paymentTypeId;
	}

	public String getPaymebtById() {
		return paymebtById;
	}

	public void setPaymebtById(String paymebtById) {
		this.paymebtById = paymebtById;
	}

	public long getChequeNoId() {
		return chequeNoId;
	}

	public void setChequeNoId(long chequeNoId) {
		this.chequeNoId = chequeNoId;
	}

	public Date getChequeDateId() {
		return chequeDateId;
	}

	public void setChequeDateId(Date chequeDateId) {
		this.chequeDateId = chequeDateId;
	}

	public long getCardNoId() {
		return cardNoId;
	}

	public void setCardNoId(long cardNoId) {
		this.cardNoId = cardNoId;
	}

	public long getNeftAccNoId() {
		return neftAccNoId;
	}

	public void setNeftAccNoId(long neftAccNoId) {
		this.neftAccNoId = neftAccNoId;
	}

	public Double getPaymentAmountId() {
		return paymentAmountId;
	}

	public void setPaymentAmountId(Double paymentAmountId) {
		this.paymentAmountId = paymentAmountId;
	}

	public String getPaymentReasonId() {
		return paymentReasonId;
	}

	public void setPaymentReasonId(String paymentReasonId) {
		this.paymentReasonId = paymentReasonId;
	}

	public String getPaymentDate1() {
		return paymentDate1;
	}

	public void setPaymentDate1(String paymentDate1) {
		this.paymentDate1 = paymentDate1;
	}

}
