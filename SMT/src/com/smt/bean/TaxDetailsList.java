package com.smt.bean;

public class TaxDetailsList
{
	private String taxPkId;
	private String taxName;
	private String taxPercentage;
	private String startPrice;
	private String endPrice;
	private String srNo;
	
	public String getTaxPkId() {
		return taxPkId;
	}
	public void setTaxPkId(String taxPkId) {
		this.taxPkId = taxPkId;
	}
	public String getTaxName() {
		return taxName;
	}
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	public String getTaxPercentage() {
		return taxPercentage;
	}
	public void setTaxPercentage(String taxPercentage) {
		this.taxPercentage = taxPercentage;
	}
	public String getStartPrice() {
		return startPrice;
	}
	public void setStartPrice(String startPrice) {
		this.startPrice = startPrice;
	}
	public String getEndPrice() {
		return endPrice;
	}
	public void setEndPrice(String endPrice) {
		this.endPrice = endPrice;
	}
	public String getSrNo() {
		return srNo;
	}
	public void setSrNo(String srNo) {
		this.srNo = srNo;
	} 
}
