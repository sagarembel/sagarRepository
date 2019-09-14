package com.smt.bean;

import java.math.BigInteger;

public class CurrentStockGraph {

	private BigInteger stock;
	private BigInteger quantity;
	private BigInteger total;
	private BigInteger itemId;

	public BigInteger getStock() {
		return stock;
	}

	public void setStock(BigInteger stock) {
		this.stock = stock;
	}

	public BigInteger getQuantity() {
		return quantity;
	}

	public void setQuantity(BigInteger quantity) {
		this.quantity = quantity;
	}

	public BigInteger getTotal() {
		return total;
	}

	public void setTotal(BigInteger total) {
		this.total = total;
	}

	public BigInteger getItemId() {
		return itemId;
	}

	public void setItemId(BigInteger itemId) {
		this.itemId = itemId;
	}

}
