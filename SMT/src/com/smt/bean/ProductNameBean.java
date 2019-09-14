package com.smt.bean;

public class ProductNameBean {

	private String ItemName;
	private String CaregoryName;
	private String hsnsacno;
	private String productid;
	private String color;
	private String size;
	private String fkCatId;
	private String subCatid;
	private String subCat;

	public String getFkCatId() {
		return fkCatId;
	}

	public void setFkCatId(String fkCatId) {
		this.fkCatId = fkCatId;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getProductid() {
		return productid;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

	public String getItemName() {
		return ItemName;
	}

	public void setItemName(String itemName) {
		ItemName = itemName;
	}

	public String getCaregoryName() {
		return CaregoryName;
	}

	public void setCaregoryName(String caregoryName) {
		CaregoryName = caregoryName;
	}

	public String getHsnsacno() {
		return hsnsacno;
	}

	public void setHsnsacno(String hsnsacno) {
		this.hsnsacno = hsnsacno;
	}

	public String getSubCatid() {
		return subCatid;
	}

	public void setSubCatid(String subCatid) {
		this.subCatid = subCatid;
	}

	public String getSubCat() {
		return subCat;
	}

	public void setSubCat(String subCat) {
		this.subCat = subCat;
	}
	

}
