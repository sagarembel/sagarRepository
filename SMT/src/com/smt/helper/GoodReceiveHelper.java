package com.smt.helper;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import com.smt.bean.BarcodeReportBean;
import com.smt.bean.BillBean;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.GoodreciveBillBean;
import com.smt.bean.PreviousGoodReceive;
import com.smt.bean.PurchaseReport;
import com.smt.bean.allTransactionId;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.PurchaseReturnDao;
import com.smt.dao.StockDao;
import com.smt.dao.SupplierPaymentDao;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.PurchaseReturn;
import com.smt.hibernate.Stock;
import com.smt.hibernate.SupplierPaymentBean;
import com.smt.utility.HibernateUtility;

public class GoodReceiveHelper
{
	public void regGoodReceive(HttpServletRequest request, HttpServletResponse response)
	{		
		Long barcodeNo = 1000l;
		Long voucherNo = 1l;

		System.out.println("GOOD RECEIVE HELPER");
		
		GoodReciveDao dao = new GoodReciveDao();
		GoodReciveDao data = new GoodReciveDao();
		
		// TODO Auto-generated method stub

		GoodReceive goodsReceived = new GoodReceive();
		System.out.println("hi vikas in helper");
		Integer count = Integer.parseInt(request.getParameter("count"));
		
		String billNo = request.getParameter("billNo");		
		String resolution = request.getParameter("resolution");
		String supplierId = request.getParameter("supplierId");
		String pDate = request.getParameter("pDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			
		Date adate = null;
		try {
			adate = format.parse(pDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}		
		
		System.out.println("c111111" + count);		
	
		List vList = data.getLastVoucherNo();

		for (int i = 0; i < vList.size(); i++)
		{
			GoodreciveBillBean grbb = (GoodreciveBillBean) vList.get(i);
			voucherNo = grbb.getVoucherNo();
			voucherNo++;
		}
		
		
		for (int i = 0; i < count; i++)
		{
			HttpSession session3 = request.getSession();
			//GoodReciveDao data = new GoodReciveDao();
			List stkList = data.getLastBarcodeNo();

			for (int j = 0; j < stkList.size(); j++) {

				GoodreciveBillBean st = (GoodreciveBillBean) stkList.get(j);
				barcodeNo = st.getBarcodeNo();
				barcodeNo++;
			}
			
			goodsReceived.setVoucherNo(voucherNo);
			
			String color = request.getParameter("color" + i + ""/* +k */);
			System.out.println("Color is :++++++++++++" + color);
			goodsReceived.setColor(color);

			String size = request.getParameter("size" + i + ""/* +k */);
			System.out.println("Size is :++++++++++++" + size);
			goodsReceived.setSize(size);			

			String quantity = request.getParameter("quantity" + i + ""/* +k */);
			goodsReceived.setQuantity(Double.parseDouble(quantity));
			goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			goodsReceived.setBarcodeQty(Long.parseLong(quantity));
			
			String rollSize = request.getParameter("rollSize" + i/* + ""/* +k */);
			if (!"".equals(rollSize) || rollSize != null)
			{
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				goodsReceived.setRollSize(0.0);
			}

			// goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			String itemName = request.getParameter("itemName" + i);
			goodsReceived.setItemName(itemName);

			String catName = request.getParameter("catName" + i);
			goodsReceived.setCatName(catName);

			String buyPrice = request.getParameter("buyPrice" + i);
			goodsReceived.setBuyPrice(Double.parseDouble(buyPrice));

			String purcode = request.getParameter("purcode" + i);
			System.out.println(purcode);
			goodsReceived.setPurcode(purcode);
			
			String discount = request.getParameter("disPer"+i);
			goodsReceived.setDiscount(Double.parseDouble(discount));

			String actualprice = request.getParameter("actualprice" + i);
			goodsReceived.setSalePrice(Double.parseDouble(actualprice));
			System.out.println(actualprice);

			String hsnsacno = request.getParameter("hsnsacno" + i);
			goodsReceived.setHsnsacno(hsnsacno);

			String Total = request.getParameter("Total" + i);
			goodsReceived.setTotal(Double.parseDouble(Total));
			
			String subCatId = request.getParameter("subCatId" + i);
			goodsReceived.setSubCatId(Long.parseLong(subCatId));
			
			String productId = request.getParameter("productId" + i);
			goodsReceived.setFkProductId(Long.parseLong(productId));
			
			String categoryId = request.getParameter("categoryId" + i);
			goodsReceived.setFkCatId(Long.parseLong(categoryId));

			//String billNo = request.getParameter("billNo");
			goodsReceived.setBillNo(billNo);
			
			String contactPerson = request.getParameter("contactPerson");
			if (!"".equals(contactPerson))
			{
				goodsReceived.setContactPerson(contactPerson);
			}
			else
			{
				goodsReceived.setContactPerson("NA");
			}

			String vat = request.getParameter("vat" + i);
			Double gst = Double.parseDouble(vat);
			Double mainGst = gst;
			System.out.println("VAt is " + mainGst);
			if (vat == null) {
				goodsReceived.setVat(0.0);
			} else {
				goodsReceived.setVat(mainGst);
			}

			String igst = request.getParameter("igst" + i);
			System.out.println("igst is " + igst);
			if (igst == null) {
				goodsReceived.setIgst(0.0);
			} else {
				goodsReceived.setIgst(Double.parseDouble(igst));
			}

			String gstamt = request.getParameter("gstamt" + i);
			System.out.println("gstamt is " + gstamt);
			if (gstamt == null) {
				goodsReceived.setTaxAmount(0.0);
			} else {
				goodsReceived.setTaxAmount(Double.parseDouble(gstamt));
			}

			String extraDiscount = request.getParameter("extraDiscount");
			goodsReceived.setExtraDiscount(Double.parseDouble(extraDiscount));

			String expence = request.getParameter("expence");
			goodsReceived.setExpence(Double.parseDouble(expence));

			//String resolution = request.getParameter("resolution");
			goodsReceived.setGrossTotal(Double.parseDouble(resolution));

			//String supplierId = request.getParameter("supplierId");
			goodsReceived.setSupplierName(Long.parseLong(supplierId));

			//String pDate = request.getParameter("pDate");
			
			String supcode = request.getParameter("supcode");
			System.out.println("this is supplier code"+supcode);
			goodsReceived.setSupCode(supcode);
			
			/*Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 625 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);*/
			
			Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{				
					System.out.println("ln 220 LAST BILL PENDING ==============> "+object[1].toString());
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 222 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);
			
			//Double lastBillPending = dao.getPendingBillPayment(supplierId);
			//Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);
			
			/*goodsReceived.setPendingBillPayment(Double.parseDouble(resolution));
			goodsReceived.setPendingBillPayment(totalBillpending);*/			

			double discontTotal = Double.parseDouble(Total);
			double data1 = Double.parseDouble(quantity);

			double discontValue = (discontTotal / data1);

			long data5 = (long) discontValue;
			System.out.println("print BuyPrice ::  " + data5);
			String data6 = String.valueOf(data5);
			String xyz = "";
			String adc = "";
			String[] Shreemant;
			if (actualprice.equals("0.0")) {
				Shreemant = data6.split("");
			} else {
				Shreemant = actualprice.split("");
			}
			for (int a = 0; a < Shreemant.length; a++) {
				System.out.println("shreemant :: " + Shreemant[a]);
				String abc = Shreemant[a];
				if (abc.equals("1")) {
					adc = "N";
				}
				if (abc.equals("2")) {
					adc = "A";
				}
				if (abc.equals("3")) {
					adc = "G";
				}
				if (abc.equals("4")) {
					adc = "P";
				}
				if (abc.equals("5")) {
					adc = "U";
				}
				if (abc.equals("6")) {
					adc = "R";
				}
				if (abc.equals("7")) {
					adc = "C";
				}
				if (abc.equals("8")) {
					adc = "I";
				}
				if (abc.equals("9")) {
					adc = "T";
				}
				if (abc.equals("0")) {
					adc = "Y";
				}
				xyz = xyz.concat(adc);
			}

			/*Date adate = null;
			try {
				adate = format.parse(pDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}*/
			goodsReceived.setDate(adate);

			session3.setAttribute("barcodeNo", barcodeNo);

			if (barcodeNo == null) {
				goodsReceived.setBarcodeNo(1000l);
			} else {
				goodsReceived.setBarcodeNo(barcodeNo);
			}

			goodsReceived.setReturnQuantity(0);
			
			String sPWithoutTax = request.getParameter("sPWithoutTax"+i);
			goodsReceived.setSpWithoutTax(Double.parseDouble(sPWithoutTax));			
			
			//goodsReceived.setDisPerForBill(10.0);
			goodsReceived.setDisPerForBill(0.0);
			
			String style = request.getParameter("style"+i);			
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				goodsReceived.setStyle("N/A");
			}
			else
			{
				goodsReceived.setStyle(style);
			}
			
			String subCatName = request.getParameter("subCatName"+i);			
			if(subCatName == null || subCatName.equalsIgnoreCase(""))
			{
				subCatName = "";
			}
			
			goodsReceived.setSoldQuantity(0d);
			
			dao.regGoodReceive(goodsReceived);
			dao.setPendingBillPaymentToSupp(totalBillpending, supplierId);
			
			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();

			double quant = Double.parseDouble(quantity);

			try
			{
				FileInputStream fstream = new FileInputStream("C:/barcose/input.prn");

				BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
				FileWriter fw = new FileWriter("C:/barcose/Output" + i + ".txt");

				BufferedWriter bw = new BufferedWriter(fw);
				String strLine;
				String str1;
				while ((strLine = br.readLine()) != null)
				{
					if (strLine.equals("@shopName")) {
						str1 = br.readLine();
						strLine = str1 + "\"Style me\"";
					}
					else if (strLine.equals("@product"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + itemName + "\"";
					}
					else if (strLine.equals("@quanti"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + quantity + "\"";
					}
					else if (strLine.equals("@catName"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + catName + "\"";
					}
					else if (strLine.equals("@subCatName"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + subCatName + "\"";
					}					
					else if (strLine.equals("@barv"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
					}
					else if (strLine.equals("@bar"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + barcodeNo + "\"";
					}
					else if (strLine.equals("@company"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + catName + "\"";
					}
					else if (strLine.equals("@total"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + xyz + "\"";
					}
					else if (strLine.equals("@quantityForNumberOfPrint"))
					{
						str1 = br.readLine();
						strLine = str1 + quantity;
					}
					else if (strLine.equals("@size"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + size + "\"";
					}
					else if (strLine.equals("@style"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + style + "\"";
					}					
					else if (strLine.equals("@saleprice"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" +""+actualprice + "\"";
					}
					//for purchase code
					else if (strLine.equals("@pcode"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + purcode + "\"";//purcode
					}
					//for supplier code
					else if (strLine.equals("@scode"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + supcode + "\"";//purcode
					}

					System.out.println(strLine);
					bw.write(strLine + "\r\n");
					
					/*
					if (strLine.equals("@product")) {
						str1 = br.readLine();
						strLine = str1 + "\"Style me\"";
					} else if (strLine.equals("@quanti")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + itemName + "\"";
					} else if (strLine.equals("@catName")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + itemName + "\"";

					} else if (strLine.equals("@barv")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + "!105" + barcodeNo + "\"";

					} else if (strLine.equals("@bar")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + barcodeNo + "\"";
					} else if (strLine.equals("@company")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + catName + "\"";
					} else if (strLine.equals("@total")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + xyz + "\"";

					} else if (strLine.equals("@quantityForNumberOfPrint")) {
						str1 = br.readLine();
						strLine = str1 + quantity;

					} else if (strLine.equals("@size")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + size + "\"";

					} else if (strLine.equals("@saleprice")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + "Rs " + actualprice + "\"";

					}
					//for purchase code
					else if (strLine.equals("@pcode")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + purcode + "\"";//purcode

					}
					//for supplier code
					else if (strLine.equals("@scode")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + supcode + "\"";//purcode

					}

					System.out.println(strLine);
					bw.write(strLine + "\r\n");
				*/
				}
				System.out.println("catName is " + catName);
				System.out.println("Barcode is ++++++++++" + barcodeNo);
				System.out.println("itemName is *********" + itemName);
				System.out.println("Sale Price is //////" + actualprice);
				System.out.println("size is " + size);
				bw.close();
				// Close the input stream
				br.close();

				List cmdAndArgs = Arrays.asList("cmd", "/C", "printbatch" + i + ".bat");
				File dir = new File("C:/barcose");

				ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
				pb.directory(dir);
				Process p = pb.start();
			} catch (Exception e) {

			}

			// End Barcode code

			/* If Stock Is Empty */
			if (stkList2.size() == 0)
			{
				Stock newEntry = new Stock();

				newEntry.setItemName(itemName);
				newEntry.setQuantity(Double.parseDouble(quantity));
				newEntry.setCatName(catName);
				newEntry.setFkCategoryId(Long.parseLong(categoryId));
				newEntry.setFkProductId(Long.parseLong(productId));;
				
				StockDao dao2 = new StockDao();
				dao2.registerStock(newEntry);
			}
			else/* To Update Stock Table If It is Not Empty */
			{
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long PkItemId = st.getPkStockId();
					Long fkProductId = st.getFkProductId();
					Long fkCategoryId = st.getFkCategoryId();
					
					/* If ItemName Is Already Exists In Stock Table */
				//	if (ItemId.equals(itemName) && cat.equals(catName)) {
					if ((Long.parseLong(productId) == fkProductId)  && (Long.parseLong(categoryId) == fkCategoryId))
					{	
						Double qunty = st.getQuantity();
						Double updatequnty = (Double) (qunty + Double.parseDouble(quantity));
						
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
						break;
					} else {
						/* ItemName is Not Exists */
						if (j + 1 == stkList2.size())
						{
							Stock newEntry = new Stock();

							newEntry.setItemName(itemName);
							newEntry.setQuantity(Double.parseDouble(quantity));
							newEntry.setCatName(catName);
							newEntry.setFkCategoryId(Long.parseLong(categoryId));
							newEntry.setFkProductId(Long.parseLong(productId));

							StockDao dao2 = new StockDao();
							dao2.registerStock(newEntry);
						}
					}
				}
			}
		}
		
		/*
			SupplierPaymentBean bean = new SupplierPaymentBean();
			bean.setBillNo(billNo);
			bean.setSupplier(Long.parseLong(supplierId));
			bean.setBalance(Double.parseDouble(resolution));
			bean.setTotalAmount(Double.parseDouble(resolution));
			bean.setPaymentType("credit");
			bean.setPaymentMode("cash");
			bean.setInsertDate(adate);
			bean.setPersonname("N/A");
			bean.setCredit(0.00);
			SupplierPaymentDao daov = new SupplierPaymentDao();
			daov.regSupPayment(bean);
		*/
	}
	
	// Register Data in database without barcode printing	
	public void regGoodReceiveWithOutBarcode(HttpServletRequest request, HttpServletResponse response)
	{		
		Long barcodeNo = 1000l;
		Long voucherNo = 1l;
		GoodReciveDao dao = new GoodReciveDao();
		GoodReciveDao data = new GoodReciveDao();
		
		// TODO Auto-generated method stub

		GoodReceive goodsReceived = new GoodReceive();
		System.out.println("hi vikas in helper witout barcode print");
		Integer count = Integer.parseInt(request.getParameter("count"));
		
		String billNo = request.getParameter("billNo");		
		String resolution = request.getParameter("resolution");
		String supplierId = request.getParameter("supplierId");
		String pDate = request.getParameter("pDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		Date adate = null;
		try {
			adate = format.parse(pDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		System.out.println("c111111" + count);		
		
		List vList = data.getLastVoucherNo();

		for (int i = 0; i < vList.size(); i++)
		{
			GoodreciveBillBean grbb = (GoodreciveBillBean) vList.get(i);
			voucherNo = grbb.getVoucherNo();
			voucherNo++;
		}		

		for (int i = 0; i < count; i++)
		{
			HttpSession session3 = request.getSession();
			//GoodReciveDao data = new GoodReciveDao();
			List stkList = data.getLastBarcodeNo();

			for (int j = 0; j < stkList.size(); j++)
			{
				GoodreciveBillBean st = (GoodreciveBillBean) stkList.get(j);
				barcodeNo = st.getBarcodeNo();
				barcodeNo++;
			}
			
			goodsReceived.setVoucherNo(voucherNo);
			
			String color = request.getParameter("color" + i + ""/* +k */);
			System.out.println("Color is :++++++++++++" + color);
			goodsReceived.setColor(color);

			String size = request.getParameter("size" + i + ""/* +k */);
			System.out.println("Size is :++++++++++++" + size);
			goodsReceived.setSize(size);

			String quantity = request.getParameter("quantity" + i + ""/* +k */);
			goodsReceived.setQuantity(Double.parseDouble(quantity));
			goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			goodsReceived.setBarcodeQty(Long.parseLong(quantity));

			String rollSize = request.getParameter("rollSize" + i + ""/* +k */);
			System.out.println("rollSize ========> "+rollSize);
			if (!"".equals(rollSize) || rollSize != null)
			{
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				goodsReceived.setRollSize(0);
			}
			/*if (!"".equals(rollSize)) {
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			} else {
				goodsReceived.setRollSize(1);
			}*/

			// goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			String itemName = request.getParameter("itemName" + i);
			goodsReceived.setItemName(itemName);

			String catName = request.getParameter("catName" + i);
			goodsReceived.setCatName(catName);

			String buyPrice = request.getParameter("buyPrice" + i);
			goodsReceived.setBuyPrice(Double.parseDouble(buyPrice));

			String purcode = request.getParameter("purcode" + i);
			System.out.println(purcode);
			goodsReceived.setPurcode(purcode);
			
			String discount = request.getParameter("disPer"+i);
			System.out.println("discount ==============> "+discount);
			goodsReceived.setDiscount(Double.parseDouble(discount));

			String actualprice = request.getParameter("actualprice" + i);
			goodsReceived.setSalePrice(Double.parseDouble(actualprice));
			System.out.println(actualprice);
			
			String subCatId = request.getParameter("subCatId" + i);
			System.out.println("subCatId =====> "+subCatId);
			goodsReceived.setSubCatId(Long.parseLong(subCatId));
			
			String productId = request.getParameter("productId" + i);
			System.out.println("productId =====> "+productId);
			goodsReceived.setFkProductId(Long.parseLong(productId));
			
			String categoryId = request.getParameter("categoryId" + i);
			System.out.println("categoryId =====> "+categoryId);
			goodsReceived.setFkCatId(Long.parseLong(categoryId));
			
			String hsnsacno = request.getParameter("hsnsacno" + i);
			goodsReceived.setHsnsacno(hsnsacno);

			String Total = request.getParameter("Total" + i);
			goodsReceived.setTotal(Double.parseDouble(Total));

			//String billNo = request.getParameter("billNo");
			goodsReceived.setBillNo(billNo);

			String contactPerson = request.getParameter("contactPerson");
			if (!"".equals(contactPerson)) {
				goodsReceived.setContactPerson(contactPerson);
			} else {
				goodsReceived.setContactPerson("NA");
			}

			String vat = request.getParameter("vat" + i);
			Double gst = Double.parseDouble(vat);
			Double mainGst = gst;
			System.out.println("VAt is " + mainGst);
			if (vat == null) {
				goodsReceived.setVat(0.0);
			} else {
				goodsReceived.setVat(mainGst);
			}

			String igst = request.getParameter("igst" + i);
			System.out.println("igst is " + igst);
			if (igst == null) {
				goodsReceived.setIgst(0.0);
			} else {
				goodsReceived.setIgst(Double.parseDouble(igst));
			}

			String gstamt = request.getParameter("gstamt" + i);
			System.out.println("gstamt is " + gstamt);
			if (gstamt == null) {
				goodsReceived.setTaxAmount(0.0);
			} else {
				goodsReceived.setTaxAmount(Double.parseDouble(gstamt));
			}

			String extraDiscount = request.getParameter("extraDiscount");
			goodsReceived.setExtraDiscount(Double.parseDouble(extraDiscount));

			String expence = request.getParameter("expence");
			goodsReceived.setExpence(Double.parseDouble(expence));

			//String resolution = request.getParameter("resolution");
			goodsReceived.setGrossTotal(Double.parseDouble(resolution));

			//String supplierId = request.getParameter("supplierId");
			goodsReceived.setSupplierName(Long.parseLong(supplierId));

			//String pDate = request.getParameter("pDate");
			//SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			
			String supcode = request.getParameter("supcode");
			goodsReceived.setSupCode(supcode);

			/*goodsReceived.setPendingBillPayment(Double.parseDouble(resolution));
			Double lastBillPending = dao.getPendingBillPayment(supplierId);
			Double totalBillpending = (Double.parseDouble(resolution) + lastBillPending);*/
			
			/*Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 625 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);*/
			
			Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					System.out.println("ln 675 LAST BILL PENDING ==============> "+object[1].toString());
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 677 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);			
			
			/*Double lastBillPending = dao.getPendingBillPayment(supplierId);
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);*/

			double discontTotal = Double.parseDouble(Total);
			double data1 = Double.parseDouble(quantity);

			double discontValue = (discontTotal / data1);

			long data5 = (long) discontValue;
			System.out.println("print BuyPrice ::  " + data5);
			String data6 = String.valueOf(data5);
			String xyz = "";
			String adc = "";
			String[] Shreemant;
			if (actualprice.equals("0.0")) {
				Shreemant = data6.split("");
			} else {
				Shreemant = actualprice.split("");
			}
			for (int a = 0; a < Shreemant.length; a++) {
				System.out.println("shreemant :: " + Shreemant[a]);
				String abc = Shreemant[a];
				if (abc.equals("1")) {
					adc = "N";
				}
				if (abc.equals("2")) {
					adc = "A";
				}
				if (abc.equals("3")) {
					adc = "G";
				}
				if (abc.equals("4")) {
					adc = "P";
				}
				if (abc.equals("5")) {
					adc = "U";
				}
				if (abc.equals("6")) {
					adc = "R";
				}
				if (abc.equals("7")) {
					adc = "C";
				}
				if (abc.equals("8")) {
					adc = "I";
				}
				if (abc.equals("9")) {
					adc = "T";
				}
				if (abc.equals("0")) {
					adc = "Y";
				}
				xyz = xyz.concat(adc);
			}

			/*Date adate = null;
			try {
				adate = format.parse(pDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}*/
			goodsReceived.setDate(adate);

			session3.setAttribute("barcodeNo", barcodeNo);

			if (barcodeNo == null) {
				goodsReceived.setBarcodeNo(1000l);
			} else {
				goodsReceived.setBarcodeNo(barcodeNo);
			}
			
			goodsReceived.setReturnQuantity(0);
			
			String sPWithoutTax = request.getParameter("sPWithoutTax"+i);
			goodsReceived.setSpWithoutTax(Double.parseDouble(sPWithoutTax));			

			goodsReceived.setDisPerForBill(0.0);
			
			String style = request.getParameter("style"+i);			
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				goodsReceived.setStyle("N/A");
			}
			else
			{
				goodsReceived.setStyle(style);
			}
			
			goodsReceived.setSoldQuantity(0d);
			
			dao.regGoodReceive(goodsReceived);
			dao.setPendingBillPaymentToSupp(totalBillpending, supplierId);

			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();
			System.out.println("stkList2.size() ===========> "+stkList2.size());
			double quant = Double.parseDouble(quantity);

			if (stkList2.size() == 0)
			{
				Stock newEntry = new Stock();

				newEntry.setItemName(itemName);
				newEntry.setQuantity(Double.parseDouble(quantity));
				newEntry.setCatName(catName);
				newEntry.setFkCategoryId(Long.parseLong(categoryId));
				newEntry.setFkProductId(Long.parseLong(productId));;
				
				StockDao dao2 = new StockDao();
				dao2.registerStock(newEntry);

			}
			else/* To Update Stock Table If It is Not Empty */
			{
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long PkItemId = st.getPkStockId();
					Long fkProductId = st.getFkProductId();
					Long fkCategoryId = st.getFkCategoryId();
					
					/* If ItemName Is Already Exists In Stock Table */
				//	if (ItemId.equals(itemName) && cat.equals(catName)) {
					if ((Long.parseLong(productId) == fkProductId)  && (Long.parseLong(categoryId) == fkCategoryId))
					{	
						System.out.println("<============== UPDATE STOCK =============>");
						
						Double qunty = st.getQuantity();

						Double updatequnty = (Double) (qunty + Double.parseDouble(quantity));

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
						break;
					}
					else
					{
						/* ItemName is Not Exists */
						if (j + 1 == stkList2.size())
						{
							System.out.println("<============== NEW STOCK ENTRY =============>");
							Stock newEntry = new Stock();

							newEntry.setItemName(itemName);
							newEntry.setQuantity(Double.parseDouble(quantity));
							newEntry.setCatName(catName);
							newEntry.setFkCategoryId(Long.parseLong(categoryId));
							newEntry.setFkProductId(Long.parseLong(productId));

							StockDao dao2 = new StockDao();
							dao2.registerStock(newEntry);

						}
					}

				}

			}			
		}
		/*SupplierPaymentBean bean = new SupplierPaymentBean();
		bean.setBillNo(billNo);
		bean.setSupplier(Long.parseLong(supplierId));
		bean.setBalance(Double.parseDouble(resolution));
		bean.setTotalAmount(Double.parseDouble(resolution));
		bean.setPaymentType("credit");
		bean.setPaymentMode("cash");
		bean.setInsertDate(adate);
		bean.setPersonname("N/A");
		bean.setCredit(0.00);
		SupplierPaymentDao daov = new SupplierPaymentDao();
		daov.regSupPayment(bean);*/
	
	}
	/* } */
	
	public void updatePurchaseReturnHelper(HttpServletRequest request, HttpServletResponse response)
	{	
		System.out.println("UPDATE GOOD RECEIVE HELPER");
		
		GoodReciveDao dao = new GoodReciveDao();
		
		// TODO Auto-generated method stub

		Integer count = Integer.parseInt(request.getParameter("count"));
		String billNo = request.getParameter("billNo");			
		String supplierId = request.getParameter("supplierId");
		String pEDate = request.getParameter("pEDate");
		String editGrossTotal = request.getParameter("editGrossTotal");
		String pendingBillpaymentHidden = request.getParameter("pendingBillpaymentHidden");
		String grossTotalDiff = request.getParameter("grossTotalDiff");
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Double spWtax = 0.0;
		Date adate = null;
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			adate = format.parse(pEDate);
		
		System.out.println("c111111" + count);		
		
		for (int i = 0; i < count; i++)
		{			
			String PkGoodRecId = request.getParameter("PkGoodRecId" + i);
			System.out.println("PkGoodRecId is :++++++++++++" + PkGoodRecId);
			GoodReceive goodsReceived = (GoodReceive) session.get(GoodReceive.class, Long.parseLong(PkGoodRecId));
			
			goodsReceived.setDate(adate);
			
			String hsnsacno = request.getParameter("hsnSac" + i);
			goodsReceived.setHsnsacno(hsnsacno);
			
			String color = request.getParameter("color" + i);
			System.out.println("Color is :++++++++++++" + color);
			goodsReceived.setColor(color);

			String size = request.getParameter("size" + i);
			System.out.println("Size is :++++++++++++" + size);
			goodsReceived.setSize(size);		
			
			String style = request.getParameter("style"+i);		
			System.out.println("style is :++++++++++++" + style);
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				goodsReceived.setStyle("N/A");
			}
			else
			{
				goodsReceived.setStyle(style);
			}

			Double oriQuantity = Double.parseDouble(request.getParameter("oriQuantity" + i));
			Double quantity = Double.parseDouble(request.getParameter("quantity" + i));
			Double returnedQty = Double.parseDouble(request.getParameter("returnedQty" + i));
			Double soldQty = Double.parseDouble(request.getParameter("soldQty" + i));
			Double availquantity = Double.parseDouble(request.getParameter("availquantity" + i));			
			
			System.out.println("count = "+i+" oriQuantity = "+oriQuantity+" quantity = "+quantity);						
			
			if(oriQuantity == quantity)
			{System.out.println("QUANTITY IS SAME");}
			else if((oriQuantity > quantity) || (oriQuantity < quantity))
			{
				System.out.println("count = "+i+" oriQuantity = "+oriQuantity+" quantity = "+quantity);
				Double updateAvlQty = (quantity-(soldQty + returnedQty));
				goodsReceived.setQuantity(updateAvlQty);
				goodsReceived.setOringnalQuantity(quantity - returnedQty);
				goodsReceived.setBarcodeQty(new Double(quantity).longValue());
				System.out.println("GOOD RECEIVE QUANTITY ======> "+updateAvlQty);
				
				System.out.println("quantity => "+updateAvlQty);
				System.out.println("oriQuantity => "+(quantity-returnedQty));
				System.out.println("barQuantity => "+quantity);
			}		
			
			String rollSize = request.getParameter("rollsize" + i);
			if (!"".equals(rollSize) || rollSize != null)
			{
				System.out.println("rollSize ==> "+rollSize);
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				goodsReceived.setRollSize(0.0);
			}

			String buyPrice = request.getParameter("buyPrice" + i);
			goodsReceived.setBuyPrice(Double.parseDouble(buyPrice));
			
			String salePrice = request.getParameter("salePrice" + i);
			goodsReceived.setSalePrice(Double.parseDouble(salePrice));
			System.out.println(salePrice);

			String purchaseCode = request.getParameter("purchaseCode" + i);
			System.out.println(purchaseCode);
			goodsReceived.setPurcode(purchaseCode);
			
			String discount = request.getParameter("discount"+i);
			goodsReceived.setDiscount(Double.parseDouble(discount));			

			String vat = request.getParameter("vat"+i);
			goodsReceived.setVat(Double.parseDouble(vat));	
			
			String igst = request.getParameter("igst"+i);
			goodsReceived.setIgst(Double.parseDouble(igst));
			
			if(Double.parseDouble(vat) > 0)
			{
				if(Double.parseDouble(salePrice) > 0)
				{
					spWtax = ((Double.parseDouble(salePrice))/(1+(Double.parseDouble(vat)/100)));
				}
				else
				{
					spWtax = Double.parseDouble(salePrice);						
				}
			}
			else if(Double.parseDouble(igst) > 0)
			{
				if(Double.parseDouble(salePrice) > 0)
				{
					spWtax = ((Double.parseDouble(salePrice))/(1+(Double.parseDouble(igst)/100)));
				}
				else
				{
					spWtax = Double.parseDouble(salePrice);						
				}
			}
			else
			{
				spWtax = Double.parseDouble(salePrice);	
			}
			
			goodsReceived.setSpWithoutTax(spWtax);
			
			String Total = request.getParameter("total" + i);
			System.out.println("Total ====> "+Total);
			goodsReceived.setTotal(Double.parseDouble(Total));
			
			String subCatId = request.getParameter("subCatId" + i);
			goodsReceived.setSubCatId(Long.parseLong(subCatId));
			
			String productId = request.getParameter("productId" + i);
			goodsReceived.setFkProductId(Long.parseLong(productId));
			
			String categoryId = request.getParameter("catId" + i);
			goodsReceived.setFkCatId(Long.parseLong(categoryId));

			//String billNo = request.getParameter("billNo");
			goodsReceived.setBillNo(billNo);
			
			String contactPerson = request.getParameter("contactPerson");
			if (!"".equals(contactPerson))
			{
				goodsReceived.setContactPerson(contactPerson);
			}
			else
			{
				goodsReceived.setContactPerson("NA");
			}

			String taxAmount = request.getParameter("taxAmount" + i);
			goodsReceived.setTaxAmount(Double.parseDouble(taxAmount));

			goodsReceived.setSupplierName(Long.parseLong(supplierId));
			
			String supcode = request.getParameter("supcode");
			supcode = "";
			System.out.println("this is supplier code"+supcode);
			goodsReceived.setSupCode(supcode);
			
			System.out.println("editGrossTotal ===> "+editGrossTotal);
			goodsReceived.setGrossTotal(Double.parseDouble(editGrossTotal));
			
/*
			goodsReceived.setPendingBillPayment(Double.parseDouble(pendingBillpaymentHidden));
			
			Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					lastBillPending = Double.parseDouble(object[1].toString());
				}
			}		
*/
			dao.updateGoodReceive(goodsReceived);
			dao.setPendingBillPaymentToSupp(Double.parseDouble(pendingBillpaymentHidden), supplierId);
			
			//GETTING TOTAL UPDATED QUANTITY FROM GOOD RECEIVE TO UPDATE IN STOCK
			StockDao dao1 = new StockDao();
			
			Double totalStock = 0.0;
			List <Object[]> totalStockAftPEdit = dao1.getTotalQuantityByCatIdAndProductId(categoryId, productId);
			for (Object[] object : totalStockAftPEdit)
			{
				if(object[1] == null)
				{
					totalStock = 0.0;
				}
				else
				{
					totalStock = Double.parseDouble(object[1].toString());
				}
			}
			
			//UPDATE TOTAL STOCK
/*			dao1.updateTotalQuantityInStock(categoryId, productId, totalStock);    */
			
			List stkList2 = dao1.getAllStockEntry();
			System.out.println("stkList2.size() ===========> "+stkList2.size());

			for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					Long PkItemId = st.getPkStockId();
					Long fkProductId = st.getFkProductId();
					Long fkCategoryId = st.getFkCategoryId();

					if ((Long.parseLong(productId) == fkProductId)  && (Long.parseLong(categoryId) == fkCategoryId))
					{	
						System.out.println("<============== UPDATE STOCK =============>");
						
						Double updatequnty = totalStock;
						System.out.println("totalStock ====> "+totalStock);

						HibernateUtility hbu2 = HibernateUtility.getInstance();
						Session session2 = hbu2.getHibernateSession();
						Transaction transaction2 = session.beginTransaction();

						DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
						Date date = new Date();

						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);

						session2.saveOrUpdate(updateStock);
						transaction2.commit();
						break;
					}
				}
			//UPDATE SUPPLIER PAYMENT
			
			Double suppTotalAmt = 0.0;
			List <Object[]> totalAmtList = dao.getTotalAmountBySupp(supplierId);
			for (Object[] object : totalAmtList)
			{
				if(object[1] == null)
				{
					suppTotalAmt = 0.0;
				}
				else
				{
					suppTotalAmt = Double.parseDouble(object[1].toString());
				}
			}
			
			if(i == (count - 1))
			{
				if((Double.parseDouble(grossTotalDiff) == 0d))
				{
					System.out.println("grossTotalDiff ===>   (Double.parseDouble(grossTotalDiff)) == 0d   "+grossTotalDiff);
				}
				else if((Double.parseDouble(grossTotalDiff)) != 0d)
				{
					System.out.println("grossTotalDiff ===>   (Double.parseDouble(grossTotalDiff)) != 0d   "+grossTotalDiff);
					SupplierPaymentBean bean = new SupplierPaymentBean();
					bean.setBillNo(billNo);
					bean.setSupplier(Long.parseLong(supplierId));
					bean.setPaymentType("N/A");
					//bean.setPaymentMode("cash");
					bean.setInsertDate(adate);
					bean.setPersonname("N/A");
					bean.setCredit(0.00);
					bean.setDescription("PURCHASE EDITED");
					bean.setTotalAmount(suppTotalAmt);
					bean.setBalance(Double.parseDouble(pendingBillpaymentHidden));
					SupplierPaymentDao daov = new SupplierPaymentDao();
					daov.regSupPayment(bean);
				}
			}
		}
	}	catch (Exception e)
	{
		// TODO: handle exception
		System.out.println("UPDATE GOOD RECEIVE EXCEPTION ");
		e.printStackTrace();
	}
}
	
	// get all purchase bill no
	public List getBillNo() {
		GoodReciveDao dao = new GoodReciveDao();
		return dao.getBillNo();
	}

	// get Previous Good Receive Detail
	public List getPreGoodReceive(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String BillNo = "";
		GoodReciveDao data = new GoodReciveDao();
		List stkList = data.getLastBarcodeNo();

		for (int j = 0; j < stkList.size(); j++) {

			GoodreciveBillBean st = (GoodreciveBillBean) stkList.get(j);
			BillNo = st.getBillNo();

		}

		Map<Long, PreviousGoodReceive> map = new HashMap<Long, PreviousGoodReceive>();

		GoodReciveDao dao = new GoodReciveDao();
		System.out.println("BILL NO ::: " + BillNo);
		List<PreviousGoodReceive> exp1List = dao.getPreGoodReceive(BillNo);
		return exp1List;
	}

	// get all main barcode no
	public List getAllMainBarcodeNo() {
		GoodReciveDao dao = new GoodReciveDao();
		return dao.getAllMainBarcodeNo();
	}

	// print barcode
	public void printBarcode(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String barcodeId = request.getParameter("barcodeId");
		System.out.println("barcode No is***************************" + barcodeId);
		String quantity = request.getParameter("quantity");
		long bar = Long.parseLong(barcodeId);
		System.out.println("id is++++++++++++++++++++++++++++++++++++" + bar);

		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session1 = hbu.getHibernateSession();
		/*org.hibernate.Query query = session1.createQuery("from GoodReceive where barcodeNo=:bar");
		query.setParameter("bar", bar);*/
		
		String itemName = "";
		String subCatName = "";
		String salePrice = "";
		String style = "";
		String size = "";
		String barcode = "";
		
		Query query2 = session1.createSQLQuery("select gr.ItemName, sb.subcat_name, gr.SalePrice, gr.style, gr.size, gr.BarcodeNo from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id where gr.BarcodeNo = "+bar);
		List<Object[]> list = null;
		list = query2.list();
		for (Object[] objects : list)
		{
			itemName = objects[0].toString();
			subCatName = objects[1].toString();
			salePrice = objects[2].toString();
			if(objects[3] == null)
			{
				System.out.println("N/A");
			}
			else
			{
				style = objects[3].toString();
			}
			size = objects[4].toString();
			barcode = objects[5].toString();
		}

		/*GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
		String itemName = uniqueResult.getItemName();
		System.out.println("hi this is vikas" + itemName);
		String catName = uniqueResult.getCatName();
		System.out.println("category" + catName);
		Double buyPrice = uniqueResult.getBuyPrice();
		System.out.println("name" + buyPrice);
		Double actualprice = uniqueResult.getSalePrice();
		System.out.println("aPrice" + actualprice);
		String size = uniqueResult.getSize();
		System.out.println(" " + size);
		String purcode = uniqueResult.getPurcode();
		System.out.println(" "+purcode);
		
		String supcode = uniqueResult.getSupCode();
		System.out.println(" "+supcode);*/

		String data6 = String.valueOf(salePrice);
		String xyz = "";
		String adc = "";
		String[] Shreemant = data6.split("");
		for (int a = 0; a < Shreemant.length; a++) {
			System.out.println("shreemant :: " + Shreemant[a]);
			String abc = Shreemant[a];
			if (abc.equals("1")) {
				adc = "N";
			}
			if (abc.equals("2")) {
				adc = "A";
			}
			if (abc.equals("3")) {
				adc = "G";
			}
			if (abc.equals("4")) {
				adc = "P";
			}
			if (abc.equals("5")) {
				adc = "U";
			}
			if (abc.equals("6")) {
				adc = "R";
			}
			if (abc.equals("7")) {
				adc = "C";
			}
			if (abc.equals("8")) {
				adc = "I";
			}
			if (abc.equals("9")) {
				adc = "T";
			}
			if (abc.equals("0")) {
				adc = "Y";
			}
			xyz = xyz.concat(adc);
		}

		try {
			FileInputStream fstream = new FileInputStream("C:/barcose/input.prn");

			BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
			FileWriter fw = new FileWriter("C:/barcose/Output.txt");

			BufferedWriter bw = new BufferedWriter(fw);
			String strLine;
			String str1;
			while ((strLine = br.readLine()) != null)
			{
				if (strLine.equals("@shopName")) {
					str1 = br.readLine();
					strLine = str1 + "\"Style me\"";
				}
				else if (strLine.equals("@product"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";
				}
				else if (strLine.equals("@quanti"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + quantity + "\"";
				}
				else if (strLine.equals("@catName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}
				else if (strLine.equals("@subCatName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}					
				else if (strLine.equals("@barv"))
				{
					str1 = br.readLine();
					//strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
					strLine = str1 + "\"" + "!105" + barcodeId + "\"";
				}
				else if (strLine.equals("@bar"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + barcodeId + "\"";
				}
				else if (strLine.equals("@company"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}
				else if (strLine.equals("@total"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + xyz + "\"";
				}
				else if (strLine.equals("@quantityForNumberOfPrint"))
				{
					str1 = br.readLine();
					strLine = str1 + quantity;
				}
				else if (strLine.equals("@size"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + size + "\"";
				}
				else if (strLine.equals("@style"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + style + "\"";
				}					
				else if (strLine.equals("@saleprice"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" +""+salePrice + "\"";
				}
				/*if (strLine.equals("@product"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";
				}
				else if (strLine.equals("@quanti"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";
				}
				else if (strLine.equals("@catName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";

				}
				else if (strLine.equals("@barv"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + "!105" + bar + "\"";

				}
				else if (strLine.equals("@bar"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + bar + "\"";

				}
				else if (strLine.equals("@company"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}
				else if (strLine.equals("@total"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + xyz + "\"";
				}
				else if (strLine.equals("@quantityForNumberOfPrint"))
				{
					str1 = br.readLine();
					strLine = str1 + quantity;
				}
				else if (strLine.equals("@size"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + size + "\"";
				}
				else if (strLine.equals("@saleprice"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + "Rs " + salePrice + "\"";
				}*/
				
				System.out.println("xyz is " + xyz);
				System.out.println("catName is " + subCatName);
				System.out.println("Barcode is ++++++++++" + bar);
				System.out.println("itemName is *********" + itemName);
				System.out.println("Sale Price is //////" + salePrice);
				System.out.println("size is " + size);

				System.out.println(strLine);
				bw.write(strLine + "\r\n");
				}

			bw.close();
			// Close the input stream
			br.close();

			List cmdAndArgs = Arrays.asList("cmd", "/c", "printbatch.bat");
			File dir = new File("C:/barcose");

			ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
			pb.directory(dir);
			Process p = pb.start();
			/* } */
		} catch (Exception e) {

		}

	}

	// get Barcode Wise report
	public List BarcodeWiseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catName = request.getParameter("catName");
		Long barcodeId = Long.parseLong(catName);

		Map<Long, BarcodeReportBean> map = new HashMap<Long, BarcodeReportBean>();

		GoodReciveDao dao = new GoodReciveDao();
		List<BarcodeReportBean> exp1List = dao.BarcodeWiseReport(barcodeId);

		return exp1List;
	}

	// SupplierName Wise purchase report
	public List getsuppliernamewisepurchaseReport(String supplier)
	{
		Map<String, PurchaseReport> map = new HashMap<String, PurchaseReport>();
		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.suppliernamewiseAllPurchase(supplier);

		return exp1List;
	}

	// Purchase Report Category Wise
	public List categoryWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catId = request.getParameter("catId");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.categoryWisePurchaseReport(catId);

		return exp1List;
	}

	// Purchase Report Supplier Bill No Wise
	public List supplierBillWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long supplier = Long.parseLong(request.getParameter("supplier"));
		String billNo = request.getParameter("billNo");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.supplierBillWisePurchaseReport(supplier, billNo);

		return exp1List;
	}
	
	public List voucherNumberWisePurchaseReportHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long voucherNo = Long.parseLong(request.getParameter("voucherNo"));
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.voucherNoWisePurchaseReportDao(voucherNo);

		return exp1List;
	}


	// Purchase Report Barcode No Wise
	public List barcodeWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String barcodeNoOurchase = request.getParameter("barcodeNoOurchase");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.barcodeWisePurchaseReport(barcodeNoOurchase);

		return exp1List;
	}

	// Purchase Report Single Date
	public List singleDatePurchase45(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("purDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		try {
			adate = format.parse(fDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.singleDatePurchase45(adate);

		return exp1List;
	}

	// Purchase Report Two Date
	public List twoDatePurchase45(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pFisDate = request.getParameter("pFisDate");
		String pEndDate = request.getParameter("pEndDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;
		try {
			adate = format.parse(pFisDate);
			bdate = format.parse(pEndDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.twoDatePurchase45(adate, bdate);

		return exp1List;
	}

	// CA Purchase Report Two Date
	public List caReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pFisDate = request.getParameter("fisDate1");
		String pEndDate = request.getParameter("endDate1");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;
		try {
			adate = format.parse(pFisDate);
			bdate = format.parse(pEndDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.caReportBetweenTwoDates(adate, bdate);

		return exp1List;
	}
	
	public void setOfferDiscountHelper(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN Helper setOfferDiscountHelper called");
		String disPercentage = request.getParameter("disPercentage");
		String fromBarC = request.getParameter("fromBarC");
		String toBarC = request.getParameter("toBarC");
		
		GoodReciveDao grd = new GoodReciveDao();
		grd.setOfferDiscountDao(disPercentage, fromBarC, toBarC);
	}

}
