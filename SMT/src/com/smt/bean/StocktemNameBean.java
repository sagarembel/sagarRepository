package com.smt.bean;

public class StocktemNameBean {

	public long PkStockId;
	public String catName;
	public String itemName;
	public long quantity;

	public long getPkStockId() {
		return PkStockId;
	}

	public void setPkStockId(long pkStockId) {
		PkStockId = pkStockId;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

}
