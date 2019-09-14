package com.smt.hibernate;

import java.util.Date;

public class OtherBill {

	private Long pkBillId;
	private String itemName;
	private double quantity;
	private Double salePrice;
	private Double grossamt;
	private Date current_date;
	private Double totalAmt;
	private Long billNo;
	private String categoryName;
	private Long pkItemId;
	private Long barcodeNo;
	private Double discount;
	private Double totalperItem;
	private String ownerName;
	private String carNo;
	private Long contactNo;
	private String hsnSacNo;
	private Double vat;
	private Double igst;
	private Double taxAmount;
	private String creditCustomer1;
	private Long mobileNo;
	private String employeeName;
	private String chequeNum;
	private Long cardNum;
	private Long accNum;
	private Long regNumber;
	private String paymentMode;
	private String nameOnCheck;
	private String bankName;
	private String empType;
	private Long empIdFK;
	private String size;
	private Double taxAmtAfterDiscount;
	private Double perProductdisPer;
	private Double spWithoutTaxAmount;
	private Long fkSaleEmployeeId;
	private Long fkProductId;
	private Long fkSubCatId;
	private Long fkCatId;
	private Date billTime;
	private String style;
	private Double cashCard_cashAmount;
	private Double cashCard_cardAmount;
	private Double totalSaleReturnCreditAmt;
	

	public OtherBill() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OtherBill(Long pkBillId, String itemName, double quantity, Double salePrice, Double grossamt, Date current_date, Double totalAmt, Long billNo, 
			String categoryName, Long pkItemId, Long barcodeNo, Double discount, Double totalperItem, String ownerName, String carNo, Long contactNo, 
			String hsnSacNo, Double vat, Double igst, Double taxAmount, String creditCustomer1, Long mobileNo, String employeeName, String chequeNum, Long cardNum, 
			Long accNum, Long regNumber, String paymentMode, String nameOnCheck, String bankName, String empType,Long empIdFK, String size, Double taxAmtAfterDiscount,
			Double perProductdisPer, Double spWithoutTaxAmount, Long fkSaleEmployeeId, Long fkCatId, Long fkSubCatId, Long fkProductId, Date billTime, String style,
			Double cashCard_cashAmount, Double cashCard_cardAmount, Double totalSaleReturnCreditAmt)
	{
		super();
		this.pkBillId = pkBillId;
		this.itemName = itemName;
		this.quantity = quantity;
		this.salePrice = salePrice;
		this.grossamt = grossamt;
		this.current_date = current_date;
		this.totalAmt = totalAmt;
		this.billNo = billNo;
		this.categoryName = categoryName;
		this.pkItemId = pkItemId;
		this.barcodeNo = barcodeNo;
		this.discount = discount;
		this.totalperItem = totalperItem;
		this.ownerName = ownerName;
		this.carNo = carNo;
		this.contactNo = contactNo;
		this.hsnSacNo = hsnSacNo;
		this.vat = vat;
		this.igst = igst;
		this.taxAmount = taxAmount;
		this.creditCustomer1 = creditCustomer1;
		this.mobileNo = mobileNo;
		this.employeeName = employeeName;
		this.chequeNum = chequeNum;
		this.cardNum = cardNum;
		this.accNum = accNum;
		this.regNumber = regNumber;
		this.paymentMode = paymentMode;
		this.nameOnCheck = nameOnCheck;
		this.bankName = bankName;
		this.empType = empType;
		this.empIdFK = empIdFK;
		this.size = size;
		this.taxAmtAfterDiscount=taxAmtAfterDiscount;
		this.perProductdisPer = perProductdisPer;
		this.spWithoutTaxAmount = spWithoutTaxAmount;
		this.fkSaleEmployeeId = fkSaleEmployeeId;
		this.fkProductId=fkProductId;
		this.fkSubCatId=fkSubCatId;
		this.fkCatId=fkCatId;
		this.billTime=billTime;
		this.style=style;
		this.cashCard_cashAmount=cashCard_cashAmount;
		this.cashCard_cardAmount=cashCard_cardAmount;
	}

	public String getChequeNum() {
		return chequeNum;
	}

	public void setChequeNum(String chequeNum) {
		this.chequeNum = chequeNum;
	}

	public Long getCardNum() {
		return cardNum;
	}

	public void setCardNum(Long cardNum) {
		this.cardNum = cardNum;
	}

	public Long getAccNum() {
		return accNum;
	}

	public void setAccNum(Long accNum) {
		this.accNum = accNum;
	}

	public Long getRegNumber() {
		return regNumber;
	}

	public void setRegNumber(Long regNumber) {
		this.regNumber = regNumber;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getNameOnCheck() {
		return nameOnCheck;
	}

	public void setNameOnCheck(String nameOnCheck) {
		this.nameOnCheck = nameOnCheck;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public Long getPkBillId() {
		return pkBillId;
	}

	public void setPkBillId(Long pkBillId) {
		this.pkBillId = pkBillId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public Double getGrossamt() {
		return grossamt;
	}

	public void setGrossamt(Double grossamt) {
		this.grossamt = grossamt;
	}

	public Date getCurrent_date() {
		return current_date;
	}

	public void setCurrent_date(Date current_date) {
		this.current_date = current_date;
	}

	public Double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(Double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public Long getBillNo() {
		return billNo;
	}

	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Long getPkItemId() {
		return pkItemId;
	}

	public void setPkItemId(Long pkItemId) {
		this.pkItemId = pkItemId;
	}

	public Long getBarcodeNo() {
		return barcodeNo;
	}

	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Double getTotalperItem() {
		return totalperItem;
	}

	public void setTotalperItem(Double totalperItem) {
		this.totalperItem = totalperItem;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public Long getContactNo() {
		return contactNo;
	}

	public void setContactNo(Long contactNo) {
		this.contactNo = contactNo;
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

	public String getCreditCustomer1() {
		return creditCustomer1;
	}

	public void setCreditCustomer1(String creditCustomer1) {
		this.creditCustomer1 = creditCustomer1;
	}

	public Long getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(Long mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmpType() {
		return empType;
	}

	public void setEmpType(String empType) {
		this.empType = empType;
	}

	public Long getEmpIdFK() {
		return empIdFK;
	}

	public void setEmpIdFK(Long empIdFK) {
		this.empIdFK = empIdFK;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Double getTaxAmtAfterDiscount() {
		return taxAmtAfterDiscount;
	}

	public void setTaxAmtAfterDiscount(Double taxAmtAfterDiscount) {
		this.taxAmtAfterDiscount = taxAmtAfterDiscount;
	}

	public Double getPerProductdisPer() {
		return perProductdisPer;
	}

	public void setPerProductdisPer(Double perProductdisPer) {
		this.perProductdisPer = perProductdisPer;
	}

	public Double getSpWithoutTaxAmount() {
		return spWithoutTaxAmount;
	}

	public void setSpWithoutTaxAmount(Double spWithoutTaxAmount) {
		this.spWithoutTaxAmount = spWithoutTaxAmount;
	}

	public Long getFkSaleEmployeeId() {
		return fkSaleEmployeeId;
	}

	public void setFkSaleEmployeeId(Long fkSaleEmployeeId) {
		this.fkSaleEmployeeId = fkSaleEmployeeId;
	}

	public Long getFkProductId() {
		return fkProductId;
	}

	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}

	public Long getFkSubCatId() {
		return fkSubCatId;
	}

	public void setFkSubCatId(Long fkSubCatId) {
		this.fkSubCatId = fkSubCatId;
	}

	public Long getFkCatId() {
		return fkCatId;
	}

	public void setFkCatId(Long fkCatId) {
		this.fkCatId = fkCatId;
	}

	public Date getBillTime() {
		return billTime;
	}

	public void setBillTime(Date billTime) {
		this.billTime = billTime;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public Double getCashCard_cashAmount() {
		return cashCard_cashAmount;
	}

	public void setCashCard_cashAmount(Double cashCard_cashAmount) {
		this.cashCard_cashAmount = cashCard_cashAmount;
	}

	public Double getCashCard_cardAmount() {
		return cashCard_cardAmount;
	}

	public void setCashCard_cardAmount(Double cashCard_cardAmount) {
		this.cashCard_cardAmount = cashCard_cardAmount;
	}

	public Double getTotalSaleReturnCreditAmt() {
		return totalSaleReturnCreditAmt;
	}

	public void setTotalSaleReturnCreditAmt(Double totalSaleReturnCreditAmt) {
		this.totalSaleReturnCreditAmt = totalSaleReturnCreditAmt;
	}
}
