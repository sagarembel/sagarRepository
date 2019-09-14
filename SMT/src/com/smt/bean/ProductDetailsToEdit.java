package com.smt.bean;

public class ProductDetailsToEdit {

	private long pkProduct;
	private String ProName;
	private double vat;
	private String ModelName;
	private String hsnsacno;
	private String size;
	private String catName;
	private String subCatName;

	public long getPkProduct()
	{
		return pkProduct;
	}

	public void setPkProduct(long pkProduct) {
		this.pkProduct = pkProduct;
	}

	public String getProName() {
		return ProName;
	}

	public void setProName(String proName) {
		ProName = proName;
	}

	public double getVat() {
		return vat;
	}

	public void setVat(double vat) {
		this.vat = vat;
	}

	public String getModelName() {
		return ModelName;
	}

	public void setModelName(String modelName) {
		ModelName = modelName;
	}

	public String getHsnsacno() {
		return hsnsacno;
	}

	public void setHsnsacno(String hsnsacno) {
		this.hsnsacno = hsnsacno;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}
}
