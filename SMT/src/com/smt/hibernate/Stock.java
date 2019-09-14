package com.smt.hibernate;

import java.util.Date;

public class Stock {

	public long PkStockId;
	public String itemName;
	public String catName;
	private double quantity;
	private Date UpdateDate;
	private String date;
	private Long datediff;
	private String qty2;
	private String size;
	private String subCatName;
	private Long fkCategoryId;
	private Long fkProductId;
	
	
	public Stock() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Stock(long pkStockId, String itemName, String catName, double quantity, String qty2,  
			Date updateDate, String date, Long datediff, String size, Long fkCategoryId, Long fkProductId)
	{
		super();
		this.PkStockId = pkStockId;
		this.itemName = itemName;
		this.catName = catName;
		this.quantity = quantity;
		this.UpdateDate = updateDate;
		this.date = date;
		this.datediff = datediff;
		this.qty2 = qty2;
		this.size = size;
		this.subCatName=subCatName;
		this.fkCategoryId=fkCategoryId;
		this.fkProductId=fkProductId;
	}

	public Long getDatediff() {
		return datediff;
	}

	public void setDatediff(Long datediff) {
		this.datediff = datediff;
	}

	public long getPkStockId() {
		return PkStockId;
	}

	public void setPkStockId(long pkStockId) {
		PkStockId = pkStockId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public Date getUpdateDate() {
		return UpdateDate;
	}

	public void setUpdateDate(Date updateDate) {
		UpdateDate = updateDate;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getQty2() {
		return qty2;
	}

	public void setQty2(String qty2) {
		this.qty2 = qty2;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

	public Long getFkCategoryId() {
		return fkCategoryId;
	}

	public void setFkCategoryId(Long fkCategoryId) {
		this.fkCategoryId = fkCategoryId;
	}

	public Long getFkProductId() {
		return fkProductId;
	}

	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}
}
