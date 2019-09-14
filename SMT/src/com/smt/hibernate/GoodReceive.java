package com.smt.hibernate;

import java.util.Date;

public class GoodReceive {

	private Long PkGoodRecId;
	private String itemName;
	private String catName;
	private double quantity;
	private Double buyPrice;
	private Double salePrice;
	private Double total;
	private String billNo;
	private String contactPerson;
	private Double vat;
	private Date date;
	private Double expence;
	private Double grossTotal;
	private Long barcodeNo;
	private Long supplierName;
	private String ondate;
	private double oringnalQuantity;
	private Double igst;
	private Double taxAmount;
	private String hsnsacno;
	private Double extraDiscount;
	private String color;
	private String size;
	private Double pendingBillPayment;
	private Long BarcodeQty;
	private double rollSize;
	private String purcode;
	private String supCode;
	private Double discount;
	private long subCatId;
	private String suppName;
	private double returnQuantity;
	private double spWithoutTax;
	private double disPerForBill;
	private long firstBarcode;
	private long lastBarcode;
	private Double soldQuantity;
	private String totalBuyPrice;
	private String totalSalePrice;
	private long fkCatId;
	private long fkProductId;
	private String style;
	private long voucherNo;
	
	public GoodReceive() {
		super();
		// TODO Auto-generated constructor stub
	}

	public GoodReceive(
			Long pkGoodRecId, String itemName, String catName, double quantity, Double buyPrice, Double salePrice, Double total, String billNo, 
			String contactPerson, Double vat, Date date, Double expence, Double grossTotal, Long barcodeNo, Long supplierName, String ondate, 
			double oringnalQuantity, Double igst, Double taxAmount, String hsnsacno, Double extraDiscount, String color, String size, Double pendingBillPayment, 
			Long barcodeQty,double rollSize,String purcode,String supCode, long subCatId, String suppName, Double returnQuantity, Double spWithoutTax, 
			Double disPerForBill, Long firstBarcode, Long lastBarcode, Double discount, Double soldQuantity, String totalBuyPrice, String totalSalePrice,
			Long fkCatId, Long fkProductId, String style, Long voucherNo)
	{
		super();
		PkGoodRecId = pkGoodRecId;
		this.itemName = itemName;
		this.catName = catName;
		this.quantity = quantity;
		this.buyPrice = buyPrice;
		this.salePrice = salePrice;
		this.total = total;
		this.billNo = billNo;
		this.contactPerson = contactPerson;
		this.vat = vat;
		this.date = date;
		this.expence = expence;
		this.grossTotal = grossTotal;
		this.barcodeNo = barcodeNo;
		this.supplierName = supplierName;
		this.ondate = ondate;
		this.oringnalQuantity = oringnalQuantity;
		this.igst = igst;
		this.taxAmount = taxAmount;
		this.hsnsacno = hsnsacno;
		this.extraDiscount = extraDiscount;
		this.color = color;
		this.size = size;
		this.pendingBillPayment = pendingBillPayment;
		this.BarcodeQty = barcodeQty;
		this.rollSize = rollSize;
		this.purcode = purcode;
		this.supCode = supCode;
		this.discount = discount;
		this.subCatId = subCatId;
		this.suppName = suppName;
		this.returnQuantity=returnQuantity;
		this.spWithoutTax = spWithoutTax;
		this.disPerForBill = disPerForBill;
		this.totalBuyPrice=totalBuyPrice;
		this.totalSalePrice=totalSalePrice;
		this.soldQuantity=soldQuantity;
		this.fkCatId=fkCatId;
		this.fkProductId=fkProductId;
		this.style=style;
		this.voucherNo=voucherNo;
	}

	public Long getBarcodeQty() {
		return BarcodeQty;
	}

	public void setBarcodeQty(Long barcodeQty) {
		BarcodeQty = barcodeQty;
	}

	public Double getPendingBillPayment() {
		return pendingBillPayment;
	}

	public void setPendingBillPayment(Double pendingBillPayment) {
		this.pendingBillPayment = pendingBillPayment;
	}

	public Long getPkGoodRecId() {
		return PkGoodRecId;
	}

	public void setPkGoodRecId(Long pkGoodRecId) {
		PkGoodRecId = pkGoodRecId;
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

	public Double getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public Double getVat() {
		return vat;
	}

	public void setVat(Double vat) {
		this.vat = vat;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Double getExpence() {
		return expence;
	}

	public void setExpence(Double expence) {
		this.expence = expence;
	}

	public Double getGrossTotal() {
		return grossTotal;
	}

	public void setGrossTotal(Double grossTotal) {
		this.grossTotal = grossTotal;
	}

	public Long getBarcodeNo() {
		return barcodeNo;
	}

	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public Long getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(Long supplierName) {
		this.supplierName = supplierName;
	}

	public String getOndate() {
		return ondate;
	}

	public void setOndate(String ondate) {
		this.ondate = ondate;
	}



	public double getOringnalQuantity() {
		return oringnalQuantity;
	}

	public void setOringnalQuantity(double oringnalQuantity) {
		this.oringnalQuantity = oringnalQuantity;
	}

	public Double getIgst() {
		return igst;
	}

	public void setIgst(Double igst) {
		this.igst = igst;
	}

	public Double getTaxAmount() {
		return taxAmount;
	}

	public void setTaxAmount(Double taxAmount) {
		this.taxAmount = taxAmount;
	}

	public String getHsnsacno() {
		return hsnsacno;
	}

	public void setHsnsacno(String hsnsacno) {
		this.hsnsacno = hsnsacno;
	}

	public Double getExtraDiscount() {
		return extraDiscount;
	}

	public void setExtraDiscount(Double extraDiscount) {
		this.extraDiscount = extraDiscount;
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

	public double getRollSize() {
		return rollSize;
	}

	public void setRollSize(double rollSize) {
		this.rollSize = rollSize;
	}

	public String getPurcode() {
		return purcode;
	}

	public void setPurcode(String purcode) {
		this.purcode = purcode;
	}

	public String getSupCode() {
		return supCode;
	}

	public void setSupCode(String supCode) {
		this.supCode = supCode;
	}	

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public long getSubCatId()
	{
		return subCatId;
	}

	public void setSubCatId(long subCatId) {
		this.subCatId = subCatId;
	}

	public String getSuppName() {
		return suppName;
	}

	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

	public double getReturnQuantity() {
		return returnQuantity;
	}

	public void setReturnQuantity(double returnQuantity) {
		this.returnQuantity = returnQuantity;
	}

	public double getSpWithoutTax() {
		return spWithoutTax;
	}

	public void setSpWithoutTax(double spWithoutTax) {
		this.spWithoutTax = spWithoutTax;
	}

	public double getDisPerForBill() {
		return disPerForBill;
	}

	public void setDisPerForBill(double disPerForBill) {
		this.disPerForBill = disPerForBill;
	}

	public long getFirstBarcode() {
		return firstBarcode;
	}

	public void setFirstBarcode(long firstBarcode) {
		this.firstBarcode = firstBarcode;
	}

	public long getLastBarcode() {
		return lastBarcode;
	}

	public void setLastBarcode(long lastBarcode) {
		this.lastBarcode = lastBarcode;
	}

	public double getSoldQuantity() {
		return soldQuantity;
	}

	public void setSoldQuantity(Double soldQuantity) {
		this.soldQuantity = soldQuantity;
	}

	public String getTotalBuyPrice() {
		return totalBuyPrice;
	}

	public void setTotalBuyPrice(String totalBuyPrice) {
		this.totalBuyPrice = totalBuyPrice;
	}

	public String getTotalSalePrice() {
		return totalSalePrice;
	}

	public void setTotalSalePrice(String totalSalePrice) {
		this.totalSalePrice = totalSalePrice;
	}

	public long getFkCatId() {
		return fkCatId;
	}

	public void setFkCatId(long fkCatId) {
		this.fkCatId = fkCatId;
	}

	public long getFkProductId() {
		return fkProductId;
	}

	public void setFkProductId(long fkProductId) {
		this.fkProductId = fkProductId;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public long getVoucherNo() {
		return voucherNo;
	}

	public void setVoucherNo(long voucherNo) {
		this.voucherNo = voucherNo;
	}
}