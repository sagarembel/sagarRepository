package com.smt.hibernate;

public class VatEntry {

	private long vatPkId;
	private String vatName;
	private double vatPercentage;
	private double startPrice;
	private double endPrice;

	public long getVatPkId() {
		return vatPkId;
	}

	public void setVatPkId(long vatPkId) {
		this.vatPkId = vatPkId;
	}

	public String getVatName() {
		return vatName;
	}

	public void setVatName(String vatName) {
		this.vatName = vatName;
	}

	public double getVatPercentage() {
		return vatPercentage;
	}

	public void setVatPercentage(double vatPercentage) {
		this.vatPercentage = vatPercentage;
	}

	public double getStartPrice() {
		return startPrice;
	}

	public void setStartPrice(double startPrice) {
		this.startPrice = startPrice;
	}

	public double getEndPrice() {
		return endPrice;
	}

	public void setEndPrice(double endPrice) {
		this.endPrice = endPrice;
	}
}
