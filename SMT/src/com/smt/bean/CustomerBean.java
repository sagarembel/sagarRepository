package com.smt.bean;

import java.math.BigDecimal;

public class CustomerBean
{
	private String color;
	private Long size;
	private String itemName;
	private Double vatPercentage;
	private Double salePrice;
	private Double discount;
	private Long offerId;
	private Long cat_id;
	private Long item_id;
	private double quantity;
	private Double commision;
	private Long billNo;
	private Long barcodeNo;
	private Double buyPrice;
	private String supplierName;
	private String categoryName;
	private BigDecimal avilableQuan;
	private String hsnSacNo;
	private Double vat;
	private Double igst;
	private Double taxAmount;
	private String employeeName1;
	private String size1;
	private double goodReceiveQuantity;
	private Double total;
	private double rollSize;
	private String subCategoryName;
	private Double mtrQuantity;
	private Double sPWithoutTax;
	private Double disPerForBill;
	private Double taxAmountAfterDis;
	private Double disAmount;
	private Long fkCategoryId;
	private Long fkSubCatId;
	private Long fkProductId;
	private String style;
	private String spAfterDis;

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}
	public double getGoodReceiveQuantity() {
		return goodReceiveQuantity;
	}

	public void setGoodReceiveQuantity(double goodReceiveQuantity) {
		this.goodReceiveQuantity = goodReceiveQuantity;
	}

	public String getSize1() {
		return size1;
	}

	public void setSize1(String size1) {
		this.size1 = size1;
	}

	public Long getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}
	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public CustomerBean() {
		// TODO Auto-generated constructor stub
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Double getVatPercentage() {
		return vatPercentage;
	}

	public void setVatPercentage(Double vatPercentage) {
		this.vatPercentage = vatPercentage;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public String getColor() {
		return color;
	}

	public Long getOfferId() {
		return offerId;
	}

	public void setOfferId(Long offerId) {
		this.offerId = offerId;
	}

	public Long getItem_id() {
		return item_id;
	}

	public void setItem_id(Long item_id) {
		this.item_id = item_id;
	}

	public Double getCommision() {
		return commision;
	}

	public void setCommision(Double commision) {
		this.commision = commision;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public Double getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public BigDecimal getAvilableQuan() {
		return avilableQuan;
	}

	public void setAvilableQuan(BigDecimal avilableQuan) {
		this.avilableQuan = avilableQuan;
	}

	public Long getCat_id() {
		return cat_id;
	}

	public void setCat_id(Long cat_id) {
		this.cat_id = cat_id;
	}

	public String getHsnSacNo() {
		return hsnSacNo;
	}

	public void setHsnSacNo(String hsnSacNo) {
		this.hsnSacNo = hsnSacNo;
	}

	public Double getVat() {
		return vat;
	}

	public void setVat(Double vat) {
		this.vat = vat;
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

	public String getEmployeeName1() {
		return employeeName1;
	}

	public void setEmployeeName1(String employeeName1) {
		this.employeeName1 = employeeName1;
	}

	public double getRollSize() {
		return rollSize;
	}

	public void setRollSize(double rollSize) {
		this.rollSize = rollSize;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	public Double getMtrQuantity()
	{
		return mtrQuantity;
	}

	public void setMtrQuantity(Double mtrQuantity)
	{
		this.mtrQuantity = mtrQuantity;
	}

	public Double getsPWithoutTax() {
		return sPWithoutTax;
	}

	public void setsPWithoutTax(Double sPWithoutTax) {
		this.sPWithoutTax = sPWithoutTax;
	}

	public Double getDisPerForBill() {
		return disPerForBill;
	}

	public void setDisPerForBill(Double disPerForBill) {
		this.disPerForBill = disPerForBill;
	}	

	public Double getTaxAmountAfterDis() {
		return taxAmountAfterDis;
	}

	public void setTaxAmountAfterDis(Double taxAmountAfterDis) {
		this.taxAmountAfterDis = taxAmountAfterDis;
	}

	public Double getDisAmount() {
		return disAmount;
	}

	public void setDisAmount(Double disAmount) {
		this.disAmount = disAmount;
	}

	public Long getFkCategoryId() {
		return fkCategoryId;
	}

	public void setFkCategoryId(Long fkCategoryId) {
		this.fkCategoryId = fkCategoryId;
	}

	public Long getFkSubCatId() {
		return fkSubCatId;
	}

	public void setFkSubCatId(Long fkSubCatId) {
		this.fkSubCatId = fkSubCatId;
	}

	public Long getFkProductId() {
		return fkProductId;
	}

	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getSpAfterDis() {
		return spAfterDis;
	}

	public void setSpAfterDis(String spAfterDis) {
		this.spAfterDis = spAfterDis;
	}	
}
