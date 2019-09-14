package com.smt.helper;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.itextpdf.text.log.SysoLogger;
import com.smt.bean.BillBean;
import com.smt.bean.allTransactionId;
import com.smt.dao.CustomerDetailsDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.PurchaseReturnDao;
import com.smt.dao.StockDao;
import com.smt.dao.SupplierPaymentDao;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.PurchaseReturn;
import com.smt.hibernate.Stock;
import com.smt.hibernate.SupplierPaymentBean;
import com.smt.utility.HibernateUtility;

public class PurchaseReturnHelper {

	public void returngoodsReceipt(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("******************* PURCHASE RETURN STARTED *******************");
		
		PurchaseReturnDao good = new PurchaseReturnDao();
		String supplierId = "";
		Date adate = null;
		
		Long transactionId = 1l;
		
		GoodReciveDao grd = new GoodReciveDao();
		List trList = grd.getLastTransactionNo();
		
		for (int i = 0; i < trList.size(); i++)
		{
			allTransactionId st = (allTransactionId) trList.get(i);
			transactionId = st.getPurchaseReturnTransactoinId();
			transactionId++;
		}
		
		// TODO Auto-generated method stub
		PurchaseReturn gd = new PurchaseReturn();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);

		for (int i = 0; i < count; i++)
		{
			String editQuantity = request.getParameter("editQuantity" + i);
			Double checkReturnQty = Double.parseDouble(editQuantity);
			
			if(checkReturnQty > 0)
			{
				System.out.println("transactionId ==> "+transactionId);
				gd.setTransactionId(transactionId);
				
				String itemName = request.getParameter("itemName" + i);
				System.out.println("hi in purchase return helper "+itemName);
				gd.setItemName(itemName);
	
				String catName = request.getParameter("catName" + i);
				gd.setCatName(catName);
				
				String quantity = request.getParameter("quantity" + i);
	
				String availquantity = request.getParameter("availquantity" + i);
	
				//String editQuantity = request.getParameter("editQuantity" + i);
				Long afterReturnQuantity = Long.parseLong(quantity) - Long.parseLong(editQuantity);
				gd.setQuantity(afterReturnQuantity);
	
				gd.setOringnalQuantity(Long.parseLong(editQuantity));
				
				String rollsize = request.getParameter("rollsize"+ i);
				System.out.println("GRID rollsize ==> "+rollsize);
				gd.setRollSize(Double.parseDouble(rollsize));
				
				String discount = request.getParameter("discount"+ i);
				System.out.println("GRID DISCOUNT ==> "+discount);
				gd.setDiscount(Double.parseDouble(discount));
	
				String buyPrice = request.getParameter("buyPrice" + i);
				gd.setBuyPrice(Double.parseDouble(buyPrice));
	
				String vat = request.getParameter("vat" + i);
				String igst = request.getParameter("igst" + i);
				
				if(Double.parseDouble(vat) > 0.0)
				{
					double taxAmount = 0.0;
					double disAmount = 0.0;
					gd.setVat(Double.parseDouble(vat));
					gd.setiGst(0.0);
					
					if(Double.parseDouble(discount) > 0.0)
					{	
						if(Double.parseDouble(rollsize) > 0)
						{
							disAmount = (Double.parseDouble(buyPrice) * (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(vat)/100));
							taxAmount = taxAmount*Double.parseDouble(rollsize);
							taxAmount = taxAmount * Double.parseDouble(rollsize);
							disAmount = disAmount * Double.parseDouble(rollsize);
						}
						else if(Double.parseDouble(rollsize) < 1)
						{
							disAmount = (Double.parseDouble(buyPrice) * (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(vat)/100));
						}
					}
					else if(Double.parseDouble(discount) == 0.0)
					{
						if(Double.parseDouble(rollsize) > 0)
						{
							taxAmount = ((Double.parseDouble(buyPrice))*(Double.parseDouble(vat)/100));
							taxAmount = taxAmount*Double.parseDouble(rollsize);
							taxAmount = taxAmount * Double.parseDouble(rollsize);
						}
						else if(Double.parseDouble(rollsize) < 1)
						{
							disAmount = (Double.parseDouble(buyPrice) * (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(vat)/100));
						}
					}					
					gd.setTaxAmount(taxAmount);
					gd.setDisAmount(disAmount);
				}
				else if(Double.parseDouble(igst) > 0.0)
				{
					double taxAmount = 0.0;
					double disAmount = 0.0;
					gd.setiGst(Double.parseDouble(igst));
					gd.setVat(0.0);
					
					if(Double.parseDouble(discount) > 0.0)
					{	
						if(Double.parseDouble(rollsize) > 0)
						{
							disAmount = (Double.parseDouble(buyPrice) * (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(igst)/100));
							taxAmount = taxAmount * Double.parseDouble(rollsize);
							disAmount = disAmount * Double.parseDouble(rollsize);
						}
						else if(Double.parseDouble(rollsize) < 1)
						{
							disAmount = (Double.parseDouble(buyPrice) *  (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(igst)/100));
						}
					}
					else if(Double.parseDouble(discount) == 0.0)
					{
						if(Double.parseDouble(rollsize) > 0)
						{
							taxAmount = ((Double.parseDouble(buyPrice))*(Double.parseDouble(vat)/100));
							taxAmount = taxAmount*Double.parseDouble(rollsize);
							taxAmount = taxAmount * Double.parseDouble(rollsize);
						}
						else if(Double.parseDouble(rollsize) < 1)
						{
							disAmount = (Double.parseDouble(buyPrice) * (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(vat)/100));
						}
					}
					gd.setTaxAmount(taxAmount);
					gd.setDisAmount(disAmount);
				}
				if(Double.parseDouble(igst) == 0.0 && Double.parseDouble(vat) == 0.0)
				{
					double disAmount = 0.0;
					double taxAmount = 0.0;
					gd.setVat(0.0);
					gd.setiGst(0.0);
					gd.setTaxAmount(0.0);
					
					if(Double.parseDouble(discount) > 0.0)
					{	
						if(Double.parseDouble(rollsize) > 0)
						{
							disAmount = (Double.parseDouble(buyPrice) * (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(igst)/100));
							taxAmount = taxAmount * Double.parseDouble(rollsize);
							disAmount = disAmount * Double.parseDouble(rollsize);
						}
						else if(Double.parseDouble(rollsize) < 1)
						{
							disAmount = (Double.parseDouble(buyPrice) *  (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(igst)/100));
						}
					}
					else if(Double.parseDouble(discount) == 0.0)
					{
						if(Double.parseDouble(rollsize) > 0)
						{
							taxAmount = ((Double.parseDouble(buyPrice))*(Double.parseDouble(vat)/100));
							taxAmount = taxAmount*Double.parseDouble(rollsize);
							taxAmount = taxAmount * Double.parseDouble(rollsize);
						}
						else if(Double.parseDouble(rollsize) < 1)
						{
							disAmount = (Double.parseDouble(buyPrice) * (Double.parseDouble(discount)/100));
							taxAmount = ((Double.parseDouble(buyPrice) - disAmount)*(Double.parseDouble(vat)/100));
						}
					}
					gd.setTaxAmount(taxAmount);
					gd.setDisAmount(disAmount);
				}
	
				String total = request.getParameter("total" + i);
				gd.setTotal(Double.parseDouble(total));
	
				String returnTotal = request.getParameter("returnTotal" + i);
				gd.setReturnTotal(Double.parseDouble(returnTotal));
	
				String contactPerson = request.getParameter("contactPerson" + i);
				gd.setContactPerson(contactPerson);
	
				String barcodeNo = request.getParameter("barcodeNo" + i);
				gd.setBarcodeNo(Long.parseLong(barcodeNo));
	
				String ondate = request.getParameter("ondate" + i);
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				
				try {
					adate = format.parse(ondate);
				} catch (ParseException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				gd.setDate(adate);
	
				DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
				Date dateobj = new Date();
				System.out.println(df1.format(dateobj));
				String newDate = df1.format(dateobj);
				gd.setOndate(newDate);
				Date todayDate = null;
				try
				{
					todayDate = df1.parse(newDate);
				}
				catch(Exception e)
				{
					System.out.println(e);
				}
	
				String billNo = request.getParameter("billNo"+i);
				gd.setBillNo(Long.parseLong(billNo));
	
				supplierId = request.getParameter("supplierName2"+i);
				gd.setSupplierName(supplierId);
	
				String totalAmount = request.getParameter("totalAmount");
				gd.setGrossTotal(Double.parseDouble(totalAmount));
	
				String totalAmount1 = request.getParameter("totalAmount1");
				System.out.println("GRID TOTAL AMOUNT ========>  "+totalAmount1);
				gd.setReturnGrossTotal(Double.parseDouble(totalAmount1));
								
				String supplierIdLong = request.getParameter("supplierId"+ i);
				System.out.println("GRID supplierId ==> "+supplierIdLong);
				gd.setFkSupplierId(Long.parseLong(supplierIdLong));
				
				String prReason = request.getParameter("prReason");
				System.out.println("GRID supplierId ==> "+prReason);
				if(prReason.isEmpty() || prReason == null)
				{
					gd.setPurchaseReturnReason("Purchse Return");
				}
				else
				{
					gd.setPurchaseReturnReason(prReason);
				}
				
				String size = request.getParameter("size" + i);
				System.out.println("size  ==>  " + size);
				gd.setSize(size);				

				long productId = Long.parseLong(request.getParameter("productId"+i));
				gd.setProductId(productId);;
				
				long catId = Long.parseLong(request.getParameter("catId"+i));
				gd.setCatId(catId);;
				
				long subCatId = Long.parseLong(request.getParameter("subCatId"+i));
				gd.setSubCatId(subCatId);
				
				PurchaseReturnDao dao = new PurchaseReturnDao();
				dao.regGoodReceive(gd);
	
				Long PkGoodRecId = Long.parseLong(request.getParameter("PkGoodRecId" + i));
				System.out.println("item_id" + PkGoodRecId);
								
				String newGrossTotal = request.getParameter("newGrossTotal");
				System.out.println("newGrossTotal     "+newGrossTotal);
				
				good.updateQuantity(PkGoodRecId, editQuantity, total, totalAmount, billNo, supplierIdLong, returnTotal);				
				good.setNewGrossTotal(billNo, supplierIdLong, newGrossTotal);				
	
				StockDao dao1 = new StockDao();
				List stkList2 = dao1.getAllStockEntry();
	
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long PkItemId = st.getPkStockId();
					long fkProductId = st.getFkProductId();
					long fkCatId = st.getFkCategoryId();
	
					/* If ItemName Is Already Exists In Stock Table */
					if (fkProductId == productId && fkCatId == catId)
					{
						Double qunty = st.getQuantity();
	
						Double updatequnty = (Double) (qunty - Double.parseDouble(editQuantity));
	
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
	
						DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
						Date date = new Date();
	
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);
	
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
				if(i == (count - 1))
				{
					good.getTotalAndPendingBillPayment(supplierIdLong, todayDate, totalAmount1, barcodeNo);
					//good.getCreditDebitAmt(supplierIdLong);
				}
				System.out.println("");
				HttpSession sessionHS = request.getSession(true);
				sessionHS.setAttribute("transactionId", transactionId);
			}
		}
	}
}
