package com.smt.bean;

public class ItemList
{
	private String pkProductId;
	private String item_name;
	private String categoryName;
	private String hsnsacno;
	private Long serialnumber;
	private String subCatName;
	private String size;
	private String suppName;
	private String voucherNo;
	
	public String getItem_name() {
		return item_name;
	}

	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getHsnsacno() {
		return hsnsacno;
	}

	public void setHsnsacno(String hsnsacno) {
		this.hsnsacno = hsnsacno;
	}

	public Long getSerialnumber() {
		return serialnumber;
	}

	public void setSerialnumber(Long serialnumber) {
		this.serialnumber = serialnumber;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getPkProductId() {
		return pkProductId;
	}

	public void setPkProductId(String pkProductId) {
		this.pkProductId = pkProductId;
	}

	public String getSuppName() {
		return suppName;
	}

	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

	public String getVoucherNo() {
		return voucherNo;
	}

	public void setVoucherNo(String voucherNo) {
		this.voucherNo = voucherNo;
	}
}
