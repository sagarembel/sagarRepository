package com.smt.hibernate;

import java.util.Date;

public class CreditCustomerBill
{
	private Long pkCreditBillId;
	private Long fkRootCustId;
	private String itemName;
	private Double quantity;
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
	private String hsnSacNo;
	private Double vat;
	private Double igst;
	private Double taxAmount;
	private String paymentDone;
	private Double pendingBillPayment;
	private String billNo1;
	private String EmpName;
	private String CCBempType;
	private Long CCBempIdFK;
	private String size;	
	private String chequeNum;
	private Long cardNum;
	private Long accNum;
	private Long regNumber;
	private String paymentMode;
	private String nameOnCheck;
	private String bankName;
	private Double taxAmtAfterDiscount;
	private Double perProductdisPer;
	private Double spWithoutTaxAmount;
	private String saleDate;
	private Long fkSaleEmployeeId;
	private Long fkProductId;
	private Long fkSubCatId;
	private Long fkCatId;
	private Date billTime;
	private String style;
	private Double cashCard_cashAmount;
	private Double cashCard_cardAmount;
	private Double totalSaleReturnCreditAmt;
	
	public CreditCustomerBill() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreditCustomerBill(Long pkCreditBillId, Long fkRootCustId, String itemName, Double quantity, Double salePrice, Double grossamt, Date current_date, 
			Double totalAmt, Long billNo, String categoryName, Long pkItemId, Long barcodeNo, Double discount, Double totalperItem, String hsnSacNo, Double vat, 
			Double igst, Double taxAmount, String paymentDone, Double pendingBillPayment, String billNo1,String EmpName,String CCBempType,Long CCBempIdFK, 
			String size, String chequeNum, Long cardNum, Long accNum, Long regNumber, String paymentMode, String nameOnCheck, String bankName, Double taxAmtAfterDiscount,
			Double perProductdisPer, Double spWithoutTaxAmount, String saleDate, Long fkSaleEmployeeId, Long fkCatId, Long fkSubCatId, Long fkProductId)
	{
		super();
		this.pkCreditBillId = pkCreditBillId;
		this.fkRootCustId = fkRootCustId;
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
		this.hsnSacNo = hsnSacNo;
		this.vat = vat;
		this.igst = igst;
		this.taxAmount = taxAmount;
		this.paymentDone = paymentDone;
		this.pendingBillPayment = pendingBillPayment;
		this.billNo1 = billNo1;
		this.EmpName = EmpName;
		this.CCBempType = CCBempType;
		this.CCBempIdFK = CCBempIdFK;
		this.size = size;
		this.chequeNum = chequeNum;
		this.cardNum = cardNum;
		this.accNum = accNum;
		this.regNumber = regNumber;
		this.paymentMode = paymentMode;
		this.nameOnCheck = nameOnCheck;
		this.bankName = bankName;
		this.taxAmtAfterDiscount=taxAmtAfterDiscount;
		this.perProductdisPer = perProductdisPer;
		this.spWithoutTaxAmount=spWithoutTaxAmount;
		this.saleDate = saleDate;
		this.fkSaleEmployeeId = fkSaleEmployeeId;
		this.fkProductId=fkProductId;
		this.fkSubCatId=fkSubCatId;
		this.fkCatId=fkCatId;
	}

	public String getBillNo1() {
		return billNo1;
	}

	public void setBillNo1(String billNo1) {
		this.billNo1 = billNo1;
	}

	public Double getPendingBillPayment() {
		return pendingBillPayment;
	}

	public void setPendingBillPayment(Double pendingBillPayment) {
		this.pendingBillPayment = pendingBillPayment;
	}

	public Long getPkCreditBillId() {
		return pkCreditBillId;
	}

	public void setPkCreditBillId(Long pkCreditBillId) {
		this.pkCreditBillId = pkCreditBillId;
	}

	public Long getFkRootCustId() {
		return fkRootCustId;
	}

	public void setFkRootCustId(Long fkRootCustId) {
		this.fkRootCustId = fkRootCustId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
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

	public String getPaymentDone() {
		return paymentDone;
	}

	public void setPaymentDone(String paymentDone) {
		this.paymentDone = paymentDone;
	}

	public String getEmpName() {
		return EmpName;
	}

	public void setEmpName(String empName) {
		EmpName = empName;
	}

	public String getCCBempType() {
		return CCBempType;
	}

	public void setCCBempType(String cCBempType) {
		CCBempType = cCBempType;
	}

	public Long getCCBempIdFK() {
		return CCBempIdFK;
	}

	public void setCCBempIdFK(Long cCBempIdFK) {
		CCBempIdFK = cCBempIdFK;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
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

	public String getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(String saleDate) {
		this.saleDate = saleDate;
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
