<%@page import="java.io.ByteArrayOutputStream"%>
<%@page import="javax.activation.DataHandler"%>
<%@page import="javax.mail.util.ByteArrayDataSource"%>
<%@page import="javax.activation.DataSource"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>
<%@page import="javax.mail.Address"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.URLName"%>
<%@page import="com.sun.mail.smtp.SMTPTransport"%>
<%@page import="javax.mail.Transport"%>
<%@page import="com.smt.bean.ClientDetails"%>
<%@page import="org.w3c.dom.css.Rect"%>
<%@page import="com.smt.bean.NumToWord"%>
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="com.itextpdf.text.Rectangle"%>
<%@page import="com.itextpdf.text.BaseColor"%>
<%@page import="com.itextpdf.text.Font"%>
<%@page import="com.itextpdf.text.FontFactory"%>
<%@page import="java.util.Formatter"%>
<%@page import="javax.sound.midi.Soundbank"%>
<%@page import="com.itextpdf.text.pdf.codec.Base64.OutputStream"%>
<%@page import="java.util.Date"%>
<%@page import="java.io.IOException"%>
<%@page import="com.itextpdf.text.DocumentException"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.Document"%>
<%@page trimDirectiveWhitespaces="true"%>
<%@page import="java.util.Date"%>
<%@page import="java.io.IOException"%>
<%@page import="com.itextpdf.text.DocumentException"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.Document"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.awt.Desktop"%>
<%@page import="java.io.File"%>
<%@page import="com.itextpdf.text.pdf.PdfPCell"%>
<%@page import="com.itextpdf.text.pdf.PdfPTable"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="com.itextpdf.text.PageSize"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="java.util.List"%>
<%@page import="com.itextpdf.text.Element"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.itextpdf.text.Phrase"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="com.itextpdf.text.pdf.PdfGState"%>


<%
response.setContentType("application/pdf");
Long billno = (Long) session.getAttribute("BillNo");
String customerName = (String) session
		.getAttribute("creditCustomerName");
String gstTinNo = (String) session.getAttribute("gstTinNo");
Double paidAmt = (Double) session.getAttribute("paidAmt");
String creditCustomerName1 = (String) session
.getAttribute("creditCustomerName1");

System.out
		.print(":::::::::::::::::::::::::::::::::::::::::BillNO:-"
				+ billno + "::::::::::::::::::::::::::::");
System.out
		.print(":::::::::::::::::::::::::::::::::::::::::creditCustomerName:-"
				+ customerName
				+ "::::::::::::::::::::::::::::");

System.out
.print(":::::::::::::::::::::::::::::::::::::::::creditCustomerName:-"
		+ customerName
		+ "::::::::::::::::::::::::::::");

System.out
		.print(":::::::::::::::::::::::::::::::::::::::::Paid Amt"
				+ paidAmt + "::::::::::::::::::::::::::::");
	
	if(customerName == null || customerName.equalsIgnoreCase("") || customerName.isEmpty())
	{
		customerName = " ";
	}	
	int quantCount = 0;
	double finalTotAmountWithoutDis = 0;
	double finalTotAmountWithDis = 0;
	double finalDiscountAmt = 0;
	double finalgross = 0;
	double finalDis = 0;

	double expenseExtra = 0;
	double totalAmount = 0;
	double vatAmount = 0;
	double interGstAmount = 0;
	int itemCount = 0;
	String totAmountStr = "";
	String vatAmountStr = "";
	String extraExpence = "";
	String paymentMode = "";
	double totalBags = 0;
	double packingOfBag = 0;
	String allItemNames = "";
	String AllInOne = "";
	double TotalOfTotalAmtWithoutVat = 0;
	double TotalOfTotalAmtWithoutVat1 = 0;
	double half = 2;
	double gsttax = 0;
	double GrandTotal = 0.0;
	double Total = 0.0;
	double TotalTax = 0.0;
	double stateTaxTotal = 0.0;
	int a = 1;
	String discount = "";
	Double totalDiscount = 0.0;
	int disAmount = 0;
	String gst1 = "";
	Double gstAmt = 0.0;
	String GST_No = "GST No-27AADPU2557K1Z9";
	Double totalTaxAmount = 0.0;
	int totalQty = 0;
	String userName = "";
	String cashAmount = "";
	String cardAmount = "";
	String saleRerturnCreditAmount = "";
	Double tax5 = 0.0;
	Double tax12 = 0.0;
	Double tax18 = 0.0;
	Double tax28 = 0.0;	
	Double pendingBillPayment = 0.0;

	try
	{
		Connection conn = null;
		Connection conn1 = null;
		// step 1
		//Document document = new Document();
		Document document = new Document(PageSize.A7, 05f, 05f, 0f, 0f);
		document.setMargins(16 , 0 , 0 , 0);
		
		// step 2
		PdfWriter.getInstance(document, response.getOutputStream());
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);
		// step 3
		document.open();
		/* Image image1 = Image.getInstance("C:/step0003.jpg");
		//Image image1 = Image.getInstance("/step0003.jpg");
		image1.scaleToFit(520f, 1200f);
		image1.setAlignment(Image.MIDDLE );
		//document.add(image1); */
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(	"jdbc:mysql://localhost:3306/fabric", "root", "root");
		Statement stmt = conn.createStatement();

		ResultSet rs = stmt.executeQuery("SELECT ccb.ItemName, ccb.CategoryName, ccb.Quantity, ccb.SalePrice, s.contact_no, ccb.TotalAmount, ccb.Discount, ccb.GrossTotal, ccb.Date, ccb.totalperitem, ccb.TaxAmount, s.first_name, s.last_name, ccb.Gst, ccb.Igst, ccb.HsnSacNo, ccb.payment_mode, ccb.BarcodeNo, ccb.billTime, sb.subcat_name, ccb.FkSaleEmployeeId, ud.userName, ccb.cashCard_cashAmount, ccb.cashCard_cardAmount, ccb.totalSaleReturnAmt, ccb.FkSaleEmployeeId, ccb.pending_bill_payment, ccb.taxAmtAfterDiscount FROM creditcustomerbill ccb JOIN customer_details s ON ccb.fkCrediCustId=s.pk_customer_id JOIN sub_categories sb ON ccb.fkSubCatId=sb.pk_subcat_id JOIN user_details ud on ccb.cEmpIdFk=ud.pk_user_id where ccb.BillNo = "+billno);
		System.out.println("Query Execute");
		Date d1 = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat sdf1 = new SimpleDateFormat("E");
		SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
		sdf2.setTimeZone(TimeZone.getTimeZone("IST"));

		Date billDate = new Date();
		SimpleDateFormat dateFormater = new SimpleDateFormat("dd-MM-yyyy");
		String StrBillDate = dateFormater.format(billDate);
		System.out
				.println(StrBillDate + " =================================================================== ");

		String stdver1 = (String) sdf.format(d1);
		String day = sdf1.format(d1.getDate());
		String Time = sdf2.format(d1.getTime());
		String dtfinl = stdver1;

		DecimalFormat df = new DecimalFormat("#.00");

		Font font7 = new Font(Font.FontFamily.TIMES_ROMAN, 7, Font.NORMAL, BaseColor.BLACK);
		Font font8 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);
		Font font8Bold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.BLACK);
		Font font9 = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL, BaseColor.BLACK);
		Font font9Bold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD, BaseColor.BLACK);
		Font font10 = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
		Font font10Bold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD, BaseColor.BLACK);

		Font font17Bold = new Font(Font.FontFamily.TIMES_ROMAN, 17, Font.BOLD, BaseColor.BLACK);
		Font font16Bold = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD, BaseColor.BLACK);
		Font font15Bold = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD, BaseColor.BLACK);
		Font font14Bold = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, BaseColor.BLACK);
		Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font font12Bold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font11Bold = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD, BaseColor.BLACK);
		Font font16 = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD, BaseColor.BLACK);
		Font font14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
		Font Normalfont12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);

		//Header Containt Table

		/* image1.scaleToFit(300f, 500f);
		Image imageCenter1 = Image.getInstance(image1); 
		 imageCenter1.setAlignment(Image.MIDDLE ); 
		document.add(imageCenter1); */

		rs.next();

		PdfPTable headertable22 = new PdfPTable(1);
		headertable22.setWidthPercentage(100);

		float[] HeadercolumnWidths22 = { 1.0f };
		headertable22.setWidths(HeadercolumnWidths22);

		PdfPCell headerTable_cell22;

		headerTable_cell22 = new PdfPCell(new Phrase("PEHENAVA", font17Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

		headerTable_cell22 = new PdfPCell(new Phrase("MARWAD PETH", font8Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

		headerTable_cell22 = new PdfPCell(new Phrase("BARAMATI", font8Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

		headerTable_cell22 = new PdfPCell(new Phrase("INVOICE", font8Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

		headerTable_cell22 = new PdfPCell(new Phrase("BILL NO: C90000" + billno, font9Bold));
		headerTable_cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell22.setPaddingBottom(2);
		headerTable_cell22.setBorder(Rectangle.NO_BORDER);
		headertable22.addCell(headerTable_cell22);

		document.add(headertable22);

		PdfPTable headertable21 = new PdfPTable(2);
		headertable21.setWidthPercentage(100);

		float[] HeadercolumnWidths21 = { 1.0f, 0.5f };
		headertable21.setWidths(HeadercolumnWidths21);

		PdfPCell headerTable_cell21;

		document.add(headertable21);

		headerTable_cell21 = new PdfPCell(new Phrase("Name: " + customerName, font8));
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("Date: " + StrBillDate, font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		paymentMode = rs.getString("payment_mode");
		headerTable_cell21 = new PdfPCell(new Phrase("Payment Mode: " + paymentMode, font8));
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("  Time:" + rs.getString("billTime"), font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("\n", font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("\n", font8));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		document.add(headertable21);

		//end informatin

		//table for particulars
		PdfPTable table = new PdfPTable(6);
		table.setSpacingBefore(5);
		table.setWidthPercentage(100);
		table.setSpacingAfter(5);

		float[] columnWidths = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };//{ 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table.setWidths(columnWidths);

		PdfPTable table1 = new PdfPTable(6);
		table1.setSpacingBefore(5);
		table1.setWidthPercentage(100);
		table1.setSpacingAfter(5);

		float[] columnWidths1 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table1.setWidths(columnWidths1);

		PdfPTable table2 = new PdfPTable(6);
		table2.setSpacingBefore(5);
		table2.setWidthPercentage(100);
		table2.setSpacingAfter(5);

		float[] columnWidths2 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table2.setWidths(columnWidths2);

		PdfPTable table3 = new PdfPTable(6);
		table3.setSpacingBefore(5);
		table3.setWidthPercentage(100);
		table3.setSpacingAfter(5);

		float[] columnWidths3 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table3.setWidths(columnWidths3);

		PdfPTable table4 = new PdfPTable(6);
		table4.setSpacingBefore(5);
		table4.setWidthPercentage(100);
		table4.setSpacingAfter(5);

		float[] columnWidths4 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table4.setWidths(columnWidths4);

		PdfPTable table5 = new PdfPTable(6);
		table5.setSpacingBefore(5);
		table5.setWidthPercentage(100);
		table5.setSpacingAfter(5);

		float[] columnWidths5 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table5.setWidths(columnWidths5);

		PdfPTable table6 = new PdfPTable(6);
		table6.setSpacingBefore(5);
		table6.setWidthPercentage(100);
		table6.setSpacingAfter(5);

		float[] columnWidths6 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table6.setWidths(columnWidths6);

		PdfPTable table7 = new PdfPTable(6);
		table7.setSpacingBefore(5);
		table7.setWidthPercentage(100);
		table7.setSpacingAfter(5);

		float[] columnWidths7 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table7.setWidths(columnWidths7);

		PdfPTable table8 = new PdfPTable(6);
		table8.setSpacingBefore(5);
		table8.setWidthPercentage(100);
		table8.setSpacingAfter(5);

		float[] columnWidths8 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table8.setWidths(columnWidths8);

		PdfPTable table9 = new PdfPTable(6);
		table9.setSpacingBefore(5);
		table9.setWidthPercentage(100);
		table9.setSpacingAfter(5);

		float[] columnWidths9 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f, 0.3f };
		table9.setWidths(columnWidths9);

		PdfPCell table_cell;
		rs.beforeFirst();

		PdfPCell cell1 = new PdfPCell(new Paragraph("Salesman\nNo.", font8Bold));
		cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		PdfPCell cell2 = new PdfPCell(new Paragraph("Particulars", font8Bold));
		cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
		PdfPCell cell3 = new PdfPCell(new Paragraph("Qty", font8Bold));
		cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		PdfPCell cell4 = new PdfPCell(new Paragraph("Rate", font8Bold));
		cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
		PdfPCell cell5 = new PdfPCell(new Paragraph("Discount", font8Bold));
		cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
		PdfPCell cell6 = new PdfPCell(new Paragraph("Amount", font8Bold));
		cell6.setHorizontalAlignment(Element.ALIGN_CENTER);

		table.addCell(cell1);
		table.addCell(cell2);
		table.addCell(cell3);
		table.addCell(cell4);
		table.addCell(cell5);
		table.addCell(cell6);

		table1.addCell(cell1);
		table1.addCell(cell2);
		table1.addCell(cell3);
		table1.addCell(cell4);
		table1.addCell(cell5);
		table1.addCell(cell6);

		table2.addCell(cell1);
		table2.addCell(cell2);
		table2.addCell(cell3);
		table2.addCell(cell4);
		table2.addCell(cell5);
		table2.addCell(cell6);

		table3.addCell(cell1);
		table3.addCell(cell2);
		table3.addCell(cell3);
		table3.addCell(cell4);
		table3.addCell(cell5);
		table3.addCell(cell6);

		table4.addCell(cell1);
		table4.addCell(cell2);
		table4.addCell(cell3);
		table4.addCell(cell4);
		table4.addCell(cell5);
		table4.addCell(cell6);

		table5.addCell(cell1);
		table5.addCell(cell2);
		table5.addCell(cell3);
		table5.addCell(cell4);
		table5.addCell(cell5);
		table5.addCell(cell6);

		table6.addCell(cell1);
		table6.addCell(cell2);
		table6.addCell(cell3);
		table6.addCell(cell4);
		table6.addCell(cell5);
		table6.addCell(cell6);

		table7.addCell(cell1);
		table7.addCell(cell2);
		table7.addCell(cell3);
		table7.addCell(cell4);
		table7.addCell(cell5);
		table7.addCell(cell6);

		table8.addCell(cell1);
		table8.addCell(cell2);
		table8.addCell(cell3);
		table8.addCell(cell4);
		table8.addCell(cell5);
		table8.addCell(cell6);

		table9.addCell(cell1);
		table9.addCell(cell2);
		table9.addCell(cell3);
		table9.addCell(cell4);
		table9.addCell(cell5);
		table9.addCell(cell6);

		while (rs.next())
		{
			//if (a<6)
			{
				pendingBillPayment = rs.getDouble("pending_bill_payment");
				
				double tempTax = rs.getDouble("TaxAmount");
				totalTaxAmount = totalTaxAmount + tempTax;

				expenseExtra = rs.getDouble("Discount");
				//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
				totalDiscount = totalDiscount + expenseExtra;
				gsttax = gsttax + rs.getDouble("Gst");
				gst1 = rs.getString("Gst");
				double gst = rs.getDouble("Gst");
				double igst = rs.getDouble("TaxAmount");
				double totalAmtWithoutVat = 0;
				double total = rs.getDouble("totalperitem");

				gstAmt = total * gst / 100;

				String empId = rs.getString("fkSaleEmployeeId");

				table_cell = new PdfPCell(new Phrase("" + empId, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
				table.addCell(table_cell);

				String subCat = rs.getString("subcat_name");
				String itemName = rs.getString("ItemName");
				String barcode = rs.getString("BarcodeNo");
				/* String empName = rs.getString("employee_Name"); */
				table_cell = new PdfPCell(new Phrase(" " + subCat + "\n" + barcode/* +"-"+empName */, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.NO_BORDER);
				table.addCell(table_cell);

				String hsnsac1 = rs.getString("HsnSacNo");
				String disAmt = rs.getString("Discount");
				Double disAmtCmp = Double.parseDouble(disAmt);
				String packing = String.valueOf(rs.getDouble("Quantity"));
				table_cell = new PdfPCell(new Phrase(" " + packing, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
				table.addCell(table_cell);

				double price = rs.getDouble("totalperitem");
				int quant = rs.getInt("Quantity");
				double tax = rs.getDouble("TaxAmount");
				double taxperitem = tax / quant;
				double saletotal = rs.getDouble("SalePrice");
				String SalePrice = String.valueOf(saletotal);
				
				if(gst == 5)
				{
					if(disAmtCmp > 0)
					{
						Double taxAmtAfterDis5 = rs.getDouble("taxAmtAfterDiscount");
						tax5 = tax5 + taxAmtAfterDis5;
					}
					else
					{
						tax5 = tax5 + tax;
					}
				}
				
				if(gst == 12)
				{
					if(disAmtCmp > 0)
					{
						Double taxAmtAfterDis12 = rs.getDouble("taxAmtAfterDiscount");
						tax12 = tax12 + taxAmtAfterDis12;
					}
					else
					{
						tax12 = tax12 + tax;
					}
				}
				
				if(gst == 18)
				{
					if(disAmtCmp > 0)
					{
						Double taxAmtAfterDis18 = rs.getDouble("taxAmtAfterDiscount");
						tax18 = tax18 + taxAmtAfterDis18;
					}
					else
					{
						tax18 = tax18 + tax;
					}
				}
				
				if(gst == 28)
				{
					if(disAmtCmp > 0)
					{
						Double taxAmtAfterDis28 = rs.getDouble("taxAmtAfterDiscount");
						tax28 = tax28 + taxAmtAfterDis28;
					}
					else
					{
						tax28 = tax28 + tax;
					}
				}

				String totalWeight = String.valueOf(saletotal);
				table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
				table.addCell(table_cell);

				table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.RIGHT);
				table.addCell(table_cell);

				String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
				table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
				table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				table_cell.setBorder(Rectangle.RIGHT);
				table.addCell(table_cell);

				cashAmount = rs.getString("cashCard_cashAmount");
				cardAmount = rs.getString("cashCard_cardAmount");
				saleRerturnCreditAmount = rs.getString("totalSaleReturnAmt");

				userName = rs.getString("userName");

				discount = String.valueOf(rs.getDouble("Discount"));

				if (igst == 0) {
					totalAmtWithoutVat = rs.getDouble("TaxAmount") - rs.getDouble("Gst");
				} else if (igst != 0) {
					totalAmtWithoutVat = rs.getDouble("TaxAmount") - rs.getDouble("Gst");
				}
				String strTotalAmtWithoutVat = df.format(totalAmtWithoutVat);

				TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
				Total = +TotalOfTotalAmtWithoutVat;

				TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1 + totalAmtWithoutVat;
				double vAmt = rs.getDouble("Gst");
				vatAmount = vatAmount + vAmt;

				double newiGstAmount = rs.getDouble("TaxAmount");
				interGstAmount = interGstAmount + newiGstAmount;

				double totalAmt = rs.getDouble("TaxAmount");
				TotalTax = TotalTax + totalAmt;

				itemCount++;

				//code for total item display on second pdf form of sale bill

				allItemNames = itemName;
				totalBags = rs.getDouble("Quantity");
				packingOfBag = rs.getDouble("Quantity");

				AllInOne += allItemNames + "  " + String.valueOf(totalBags) + "  Quantity  ";
				a = a + 1;
				
				totalQty = totalQty + 1;

			}
			/*
				else {
					   if(a<11)
					   {	
							double tempTax = rs.getDouble("TaxAmount");
							totalTaxAmount = totalTaxAmount + tempTax; 
							System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
							
						expenseExtra = rs.getDouble("Discount");
						//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
						 totalDiscount = totalDiscount + expenseExtra;
						gsttax = gsttax + rs.getDouble("Gst");
						gst1 = rs.getString("Gst");
						double gst = rs.getDouble("Gst");
						double igst = rs.getDouble("TaxAmount");
						double totalAmtWithoutVat = 0;
						double total = rs.getDouble("totalperitem");
			
						gstAmt = total * gst / 100;
			
						String empId = rs.getString("fkSaleEmployeeId");
						
						table_cell = new PdfPCell(new Phrase(""+empId, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
						table.addCell(table_cell);
			
						String subCat = rs.getString("subcat_name");
						String itemName = rs.getString("ItemName");
						String barcode = rs.getString("BarcodeNo");
						//String empName = rs.getString("employee_Name");
						table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.NO_BORDER);
						table.addCell(table_cell);
			
						String hsnsac1 = rs.getString("HsnSacNo");
			
						paymentMode = rs.getString("payment_mode");
			
						String packing = String.valueOf(rs.getDouble("Quantity"));
						table_cell = new PdfPCell(new Phrase(" " + packing, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
						table.addCell(table_cell);
			
						double price = rs.getDouble("totalperitem");
						int quant = rs.getInt("Quantity");
						totalQty = totalQty + quant;
						double tax = rs.getDouble("TaxAmount");
						double taxperitem = tax / quant;
						double saletotal = rs.getDouble("SalePrice");
						String SalePrice = String.valueOf(saletotal);
			
						String totalWeight = String.valueOf(saletotal);
						table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
						table.addCell(table_cell);
						
						String disAmt = rs.getString("Discount");
						table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.RIGHT);
						table.addCell(table_cell);
			
						String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
						table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.RIGHT);
						table.addCell(table_cell);
						
						userName = rs.getString("userName");
			
						discount = String.valueOf(rs.getDouble("Discount"));
			
						if (igst == 0) {
							totalAmtWithoutVat = rs.getDouble("TaxAmount")
									- rs.getDouble("Gst");
						} else if (igst != 0) {
							totalAmtWithoutVat = rs.getDouble("TaxAmount")
									- rs.getDouble("Gst");
						}
						String strTotalAmtWithoutVat = df
								.format(totalAmtWithoutVat);
			
						TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
						Total = +TotalOfTotalAmtWithoutVat;
			
						TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
								+ totalAmtWithoutVat;
						double vAmt = rs.getDouble("Gst");
						vatAmount = vatAmount + vAmt;
			
						double newiGstAmount = rs.getDouble("TaxAmount");
						interGstAmount = interGstAmount + newiGstAmount;
			
						double totalAmt = rs.getDouble("TaxAmount");
						TotalTax = TotalTax + totalAmt;
			
						itemCount++;
			
						//code for total item display on second pdf form of sale bill
			
						allItemNames = itemName;
						totalBags = rs.getDouble("Quantity");
						packingOfBag = rs.getDouble("Quantity");
			
						AllInOne += allItemNames + "  " + String.valueOf(totalBags)
								+ "  Quantity  ";
						a=a+1;
						}
					  
					   else {
			    		  if(a<16)
			    		  {	
			    				double tempTax = rs.getDouble("TaxAmount");
			    				totalTaxAmount = totalTaxAmount + tempTax; 
			    				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
			    				
			    			expenseExtra = rs.getDouble("Discount");
			    			//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
			    			 totalDiscount = totalDiscount + expenseExtra;
			    			gsttax = gsttax + rs.getDouble("Gst");
			    			gst1 = rs.getString("Gst");
			    			double gst = rs.getDouble("Gst");
			    			double igst = rs.getDouble("TaxAmount");
			    			double totalAmtWithoutVat = 0;
			    			double total = rs.getDouble("totalperitem");
			
			    			gstAmt = total * gst / 100;
			
			    			String empId = rs.getString("fkSaleEmployeeId");
			    			
			    			table_cell = new PdfPCell(new Phrase(""+empId, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			    			table.addCell(table_cell);
			
			    			String subCat = rs.getString("subcat_name");
			    			String itemName = rs.getString("ItemName");
			    			String barcode = rs.getString("BarcodeNo");
			    			//String empName = rs.getString("employee_Name"); 
			    			table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.NO_BORDER);
			    			table.addCell(table_cell);
			
			    			String hsnsac1 = rs.getString("HsnSacNo");
			
			    			paymentMode = rs.getString("payment_mode");
			
			    			String packing = String.valueOf(rs.getDouble("Quantity"));
			    			table_cell = new PdfPCell(new Phrase(" " + packing, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			    			table.addCell(table_cell);
			
			    			double price = rs.getDouble("totalperitem");
			    			int quant = rs.getInt("Quantity");
			    			totalQty = totalQty + quant;
			    			double tax = rs.getDouble("TaxAmount");
			    			double taxperitem = tax / quant;
			    			double saletotal = rs.getDouble("SalePrice");
			    			String SalePrice = String.valueOf(saletotal);
			
			    			String totalWeight = String.valueOf(saletotal);
			    			table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			    			table.addCell(table_cell);
			    			
			    			String disAmt = rs.getString("Discount");
			    			table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.RIGHT);
			    			table.addCell(table_cell);
			
			    			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			    			table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.RIGHT);
			    			table.addCell(table_cell);
			    			
			    			userName = rs.getString("userName");
			
			    			discount = String.valueOf(rs.getDouble("Discount"));
			
			    			if (igst == 0) {
			    				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			    						- rs.getDouble("Gst");
			    			} else if (igst != 0) {
			    				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			    						- rs.getDouble("Gst");
			    			}
			    			String strTotalAmtWithoutVat = df
			    					.format(totalAmtWithoutVat);
			
			    			TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
			    			Total = +TotalOfTotalAmtWithoutVat;
			
			    			TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
			    					+ totalAmtWithoutVat;
			    			double vAmt = rs.getDouble("Gst");
			    			vatAmount = vatAmount + vAmt;
			
			    			double newiGstAmount = rs.getDouble("TaxAmount");
			    			interGstAmount = interGstAmount + newiGstAmount;
			
			    			double totalAmt = rs.getDouble("TaxAmount");
			    			TotalTax = TotalTax + totalAmt;
			
			    			itemCount++;
			
			    			//code for total item display on second pdf form of sale bill
			
			    			allItemNames = itemName;
			    			totalBags = rs.getDouble("Quantity");
			    			packingOfBag = rs.getDouble("Quantity");
			
			    			AllInOne += allItemNames + "  " + String.valueOf(totalBags)
			    					+ "  Quantity  ";
			    			a=a+1;
			    			}
			    		  else {
			        		  if(a<21){	
			        				double tempTax = rs.getDouble("TaxAmount");
			        				totalTaxAmount = totalTaxAmount + tempTax; 
			        				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
			        				
			        			expenseExtra = rs.getDouble("Discount");
			        			//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
			        			 totalDiscount = totalDiscount + expenseExtra;
			        			gsttax = gsttax + rs.getDouble("Gst");
			        			gst1 = rs.getString("Gst");
			        			double gst = rs.getDouble("Gst");
			        			double igst = rs.getDouble("TaxAmount");
			        			double totalAmtWithoutVat = 0;
			        			double total = rs.getDouble("totalperitem");
			
			        			gstAmt = total * gst / 100;
			
			        			String empId = rs.getString("fkSaleEmployeeId");
			        			
			        			table_cell = new PdfPCell(new Phrase(""+empId, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			String subCat = rs.getString("subcat_name");
			        			String itemName = rs.getString("ItemName");
			        			String barcode = rs.getString("BarcodeNo");
			        			//String empName = rs.getString("employee_Name");
			        			table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.NO_BORDER);
			        			table.addCell(table_cell);
			
			        			String hsnsac1 = rs.getString("HsnSacNo");
			
			        			paymentMode = rs.getString("payment_mode");
			
			        			String packing = String.valueOf(rs.getDouble("Quantity"));
			        			table_cell = new PdfPCell(new Phrase(" " + packing, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			double price = rs.getDouble("totalperitem");
			        			int quant = rs.getInt("Quantity");
			        			totalQty = totalQty + quant;
			        			double tax = rs.getDouble("TaxAmount");
			        			double taxperitem = tax / quant;
			        			double saletotal = rs.getDouble("SalePrice");
			        			String SalePrice = String.valueOf(saletotal);
			
			        			String totalWeight = String.valueOf(saletotal);
			        			table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			        			
			        			String disAmt = rs.getString("Discount");
			        			table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			        			table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.RIGHT);
			        			table.addCell(table_cell);
			        			
			        			userName = rs.getString("userName");
			
			        			discount = String.valueOf(rs.getDouble("Discount"));
			
			        			if (igst == 0) {
			        				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			        						- rs.getDouble("Gst");
			        			} else if (igst != 0) {
			        				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			        						- rs.getDouble("Gst");
			        			}
			        			String strTotalAmtWithoutVat = df
			        					.format(totalAmtWithoutVat);
			
			        			TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
			        			Total = +TotalOfTotalAmtWithoutVat;
			
			        			TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
			        					+ totalAmtWithoutVat;
			        			double vAmt = rs.getDouble("Gst");
			        			vatAmount = vatAmount + vAmt;
			
			        			double newiGstAmount = rs.getDouble("TaxAmount");
			        			interGstAmount = interGstAmount + newiGstAmount;
			
			        			double totalAmt = rs.getDouble("TaxAmount");
			        			TotalTax = TotalTax + totalAmt;
			
			        			itemCount++;
			
			        			//code for total item display on second pdf form of sale bill
			
			        			allItemNames = itemName;
			        			totalBags = rs.getDouble("Quantity");
			        			packingOfBag = rs.getDouble("Quantity");
			
			        			AllInOne += allItemNames + "  " + String.valueOf(totalBags)
			        					+ "  Quantity  ";
			        			a=a+1;
			        			}
			        		  else {
			            		  if(a<26)
			            		  {	
			            				double tempTax = rs.getDouble("TaxAmount");
			            				totalTaxAmount = totalTaxAmount + tempTax; 
			            				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
			            				
			            			expenseExtra = rs.getDouble("Discount");
			            			//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
			            			 totalDiscount = totalDiscount + expenseExtra;
			            			gsttax = gsttax + rs.getDouble("Gst");
			            			gst1 = rs.getString("Gst");
			            			double gst = rs.getDouble("Gst");
			            			double igst = rs.getDouble("TaxAmount");
			            			double totalAmtWithoutVat = 0;
			            			double total = rs.getDouble("totalperitem");
			
			            			gstAmt = total * gst / 100;
			
			            			String empId = rs.getString("fkSaleEmployeeId");
			            			
			            			table_cell = new PdfPCell(new Phrase(""+empId, font8));
			            			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			            			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			            			table.addCell(table_cell);
			
			            			String subCat = rs.getString("subcat_name");
			            			String itemName = rs.getString("ItemName");
			            			String barcode = rs.getString("BarcodeNo");
			            			String empName = rs.getString("employee_Name");
			            			table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
			            			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			            			table_cell.setBorder(Rectangle.NO_BORDER);
			            			table.addCell(table_cell);
			
			            			String hsnsac1 = rs.getString("HsnSacNo");
			
			            			paymentMode = rs.getString("payment_mode");
			
			            			String packing = String.valueOf(rs.getDouble("Quantity"));
			            			table_cell = new PdfPCell(new Phrase(" " + packing, font8));
			            			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			            			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			            			table.addCell(table_cell);
			
			            			double price = rs.getDouble("totalperitem");
			            			int quant = rs.getInt("Quantity");
			            			totalQty = totalQty + quant;
			            			double tax = rs.getDouble("TaxAmount");
			            			double taxperitem = tax / quant;
			            			double saletotal = rs.getDouble("SalePrice");
			            			String SalePrice = String.valueOf(saletotal);
			
			            			String totalWeight = String.valueOf(saletotal);
			            			table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
			            			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			            			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			            			table.addCell(table_cell);
			            			
			            			String disAmt = rs.getString("Discount");
			            			table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
			            			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			            			table_cell.setBorder(Rectangle.RIGHT);
			            			table.addCell(table_cell);
			
			            			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			            			table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
			            			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			            			table_cell.setBorder(Rectangle.RIGHT);
			            			table.addCell(table_cell);
			            			
			            			userName = rs.getString("userName");
			
			            			discount = String.valueOf(rs.getDouble("Discount"));
			
			            			if (igst == 0) {
			            				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			            						- rs.getDouble("Gst");
			            			} else if (igst != 0) {
			            				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			            						- rs.getDouble("Gst");
			            			}
			            			String strTotalAmtWithoutVat = df
			            					.format(totalAmtWithoutVat);
			
			            			TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
			            			Total = +TotalOfTotalAmtWithoutVat;
			
			            			TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
			            					+ totalAmtWithoutVat;
			            			double vAmt = rs.getDouble("Gst");
			            			vatAmount = vatAmount + vAmt;
			
			            			double newiGstAmount = rs.getDouble("TaxAmount");
			            			interGstAmount = interGstAmount + newiGstAmount;
			
			            			double totalAmt = rs.getDouble("TaxAmount");
			            			TotalTax = TotalTax + totalAmt;
			
			            			itemCount++;
			
			            			//code for total item display on second pdf form of sale bill
			
			            			allItemNames = itemName;
			            			totalBags = rs.getDouble("Quantity");
			            			packingOfBag = rs.getDouble("Quantity");
			
			            			AllInOne += allItemNames + "  " + String.valueOf(totalBags)
			            					+ "  Quantity  ";
			            			a=a+1;
			            			}
			            		  
			            		  else {
			                		  if(a<31)
			                		  {	
			                				double tempTax = rs.getDouble("TaxAmount");
			                				totalTaxAmount = totalTaxAmount + tempTax; 
			                				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
			                				
			                			expenseExtra = rs.getDouble("Discount");
			                			//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
			                			 totalDiscount = totalDiscount + expenseExtra;
			                			gsttax = gsttax + rs.getDouble("Gst");
			                			gst1 = rs.getString("Gst");
			                			double gst = rs.getDouble("Gst");
			                			double igst = rs.getDouble("TaxAmount");
			                			double totalAmtWithoutVat = 0;
			                			double total = rs.getDouble("totalperitem");
			
			                			gstAmt = total * gst / 100;
			
			                			String empId = rs.getString("fkSaleEmployeeId");
			                			
			                			table_cell = new PdfPCell(new Phrase(""+empId, font8));
			                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			                			table.addCell(table_cell);
			
			                			String subCat = rs.getString("subcat_name");
			                			String itemName = rs.getString("ItemName");
			                			String barcode = rs.getString("BarcodeNo");
			                			//String empName = rs.getString("employee_Name");
			                			table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
			                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			                			table_cell.setBorder(Rectangle.NO_BORDER);
			                			table.addCell(table_cell);
			
			                			String hsnsac1 = rs.getString("HsnSacNo");
			
			                			paymentMode = rs.getString("payment_mode");
			
			                			String packing = String.valueOf(rs.getDouble("Quantity"));
			                			table_cell = new PdfPCell(new Phrase(" " + packing, font8));
			                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			                			table.addCell(table_cell);
			
			                			double price = rs.getDouble("totalperitem");
			                			int quant = rs.getInt("Quantity");
			                			totalQty = totalQty + quant;
			                			double tax = rs.getDouble("TaxAmount");
			                			double taxperitem = tax / quant;
			                			double saletotal = rs.getDouble("SalePrice");
			                			String SalePrice = String.valueOf(saletotal);
			
			                			String totalWeight = String.valueOf(saletotal);
			                			table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
			                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			                			table.addCell(table_cell);
			                			
			                			String disAmt = rs.getString("Discount");
			                			table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
			                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			                			table_cell.setBorder(Rectangle.RIGHT);
			                			table.addCell(table_cell);
			
			                			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			                			table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
			                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			                			table_cell.setBorder(Rectangle.RIGHT);
			                			table.addCell(table_cell);
			                			
			                			userName = rs.getString("userName");
			
			                			discount = String.valueOf(rs.getDouble("Discount"));
			
			                			if (igst == 0) {
			                				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			                						- rs.getDouble("Gst");
			                			} else if (igst != 0) {
			                				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			                						- rs.getDouble("Gst");
			                			}
			                			String strTotalAmtWithoutVat = df
			                					.format(totalAmtWithoutVat);
			
			                			TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
			                			Total = +TotalOfTotalAmtWithoutVat;
			
			                			TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
			                					+ totalAmtWithoutVat;
			                			double vAmt = rs.getDouble("Gst");
			                			vatAmount = vatAmount + vAmt;
			
			                			double newiGstAmount = rs.getDouble("TaxAmount");
			                			interGstAmount = interGstAmount + newiGstAmount;
			
			                			double totalAmt = rs.getDouble("TaxAmount");
			                			TotalTax = TotalTax + totalAmt;
			
			                			itemCount++;
			
			                			//code for total item display on second pdf form of sale bill
			
			                			allItemNames = itemName;
			                			totalBags = rs.getDouble("Quantity");
			                			packingOfBag = rs.getDouble("Quantity");
			
			                			AllInOne += allItemNames + "  " + String.valueOf(totalBags)
			                					+ "  Quantity  ";
			                			a=a+1;
			                			}
			                		  
			                		  else {
					  if(a<36){	
							double tempTax = rs.getDouble("TaxAmount");
							totalTaxAmount = totalTaxAmount + tempTax; 
							System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
							
						expenseExtra = rs.getDouble("Discount");
						//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
						 totalDiscount = totalDiscount + expenseExtra;
						gsttax = gsttax + rs.getDouble("Gst");
						gst1 = rs.getString("Gst");
						double gst = rs.getDouble("Gst");
						double igst = rs.getDouble("TaxAmount");
						double totalAmtWithoutVat = 0;
						double total = rs.getDouble("totalperitem");
			
						gstAmt = total * gst / 100;
			
						String empId = rs.getString("fkSaleEmployeeId");
						
						table_cell = new PdfPCell(new Phrase(""+empId, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
						table.addCell(table_cell);
			
						String subCat = rs.getString("subcat_name");
						String itemName = rs.getString("ItemName");
						String barcode = rs.getString("BarcodeNo");
						String empName = rs.getString("employee_Name");
						table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.NO_BORDER);
						table.addCell(table_cell);
			
						String hsnsac1 = rs.getString("HsnSacNo");
			
						paymentMode = rs.getString("payment_mode");
			
						String packing = String.valueOf(rs.getDouble("Quantity"));
						table_cell = new PdfPCell(new Phrase(" " + packing, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
						table.addCell(table_cell);
			
						double price = rs.getDouble("totalperitem");
						int quant = rs.getInt("Quantity");
						totalQty = totalQty + quant;
						double tax = rs.getDouble("TaxAmount");
						double taxperitem = tax / quant;
						double saletotal = rs.getDouble("SalePrice");
						String SalePrice = String.valueOf(saletotal);
			
						String totalWeight = String.valueOf(saletotal);
						table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
						table.addCell(table_cell);
						
						String disAmt = rs.getString("Discount");
						table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.RIGHT);
						table.addCell(table_cell);
			
						String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
						table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
						table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						table_cell.setBorder(Rectangle.RIGHT);
						table.addCell(table_cell);
						
						userName = rs.getString("userName");
			
						discount = String.valueOf(rs.getDouble("Discount"));
			
						if (igst == 0) {
							totalAmtWithoutVat = rs.getDouble("TaxAmount")
									- rs.getDouble("Gst");
						} else if (igst != 0) {
							totalAmtWithoutVat = rs.getDouble("TaxAmount")
									- rs.getDouble("Gst");
						}
						String strTotalAmtWithoutVat = df
								.format(totalAmtWithoutVat);
			
						TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
						Total = +TotalOfTotalAmtWithoutVat;
			
						TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
								+ totalAmtWithoutVat;
						double vAmt = rs.getDouble("Gst");
						vatAmount = vatAmount + vAmt;
			
						double newiGstAmount = rs.getDouble("TaxAmount");
						interGstAmount = interGstAmount + newiGstAmount;
			
						double totalAmt = rs.getDouble("TaxAmount");
						TotalTax = TotalTax + totalAmt;
			
						itemCount++;
			
						//code for total item display on second pdf form of sale bill
			
						allItemNames = itemName;
						totalBags = rs.getDouble("Quantity");
						packingOfBag = rs.getDouble("Quantity");
			
						AllInOne += allItemNames + "  " + String.valueOf(totalBags)
								+ "  Quantity  ";
						a=a+1;
						} 
					  else {
			    		  if(a<41)
			    		  {	
			    				double tempTax = rs.getDouble("TaxAmount");
			    				totalTaxAmount = totalTaxAmount + tempTax; 
			    				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
			    				
			    			expenseExtra = rs.getDouble("Discount");
			    			//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
			    			 totalDiscount = totalDiscount + expenseExtra;
			    			gsttax = gsttax + rs.getDouble("Gst");
			    			gst1 = rs.getString("Gst");
			    			double gst = rs.getDouble("Gst");
			    			double igst = rs.getDouble("TaxAmount");
			    			double totalAmtWithoutVat = 0;
			    			double total = rs.getDouble("totalperitem");
			
			    			gstAmt = total * gst / 100;
			
			    			String empId = rs.getString("fkSaleEmployeeId");
			    			
			    			table_cell = new PdfPCell(new Phrase(""+empId, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			    			table.addCell(table_cell);
			
			    			String subCat = rs.getString("subcat_name");
			    			String itemName = rs.getString("ItemName");
			    			String barcode = rs.getString("BarcodeNo");
			    			//String empName = rs.getString("employee_Name");
			    			table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.NO_BORDER);
			    			table.addCell(table_cell);
			
			    			String hsnsac1 = rs.getString("HsnSacNo");
			
			    			paymentMode = rs.getString("payment_mode");
			
			    			String packing = String.valueOf(rs.getDouble("Quantity"));
			    			table_cell = new PdfPCell(new Phrase(" " + packing, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			    			table.addCell(table_cell);
			
			    			double price = rs.getDouble("totalperitem");
			    			int quant = rs.getInt("Quantity");
			    			totalQty = totalQty + quant;
			    			double tax = rs.getDouble("TaxAmount");
			    			double taxperitem = tax / quant;
			    			double saletotal = rs.getDouble("SalePrice");
			    			String SalePrice = String.valueOf(saletotal);
			
			    			String totalWeight = String.valueOf(saletotal);
			    			table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			    			table.addCell(table_cell);
			    			
			    			String disAmt = rs.getString("Discount");
			    			table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.RIGHT);
			    			table.addCell(table_cell);
			
			    			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			    			table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
			    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			    			table_cell.setBorder(Rectangle.RIGHT);
			    			table.addCell(table_cell);
			    			
			    			userName = rs.getString("userName");
			
			    			discount = String.valueOf(rs.getDouble("Discount"));
			
			    			if (igst == 0) {
			    				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			    						- rs.getDouble("Gst");
			    			} else if (igst != 0) {
			    				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			    						- rs.getDouble("Gst");
			    			}
			    			String strTotalAmtWithoutVat = df
			    					.format(totalAmtWithoutVat);
			
			    			TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
			    			Total = +TotalOfTotalAmtWithoutVat;
			
			    			TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
			    					+ totalAmtWithoutVat;
			    			double vAmt = rs.getDouble("Gst");
			    			vatAmount = vatAmount + vAmt;
			
			    			double newiGstAmount = rs.getDouble("TaxAmount");
			    			interGstAmount = interGstAmount + newiGstAmount;
			
			    			double totalAmt = rs.getDouble("TaxAmount");
			    			TotalTax = TotalTax + totalAmt;
			
			    			itemCount++;
			
			    			//code for total item display on second pdf form of sale bill
			
			    			allItemNames = itemName;
			    			totalBags = rs.getDouble("Quantity");
			    			packingOfBag = rs.getDouble("Quantity");
			
			    			AllInOne += allItemNames + "  " + String.valueOf(totalBags)
			    					+ "  Quantity  ";
			    			a=a+1;
			    			}
			    		  
			    		  else {
			        		  if(a<46){	
			        				double tempTax = rs.getDouble("TaxAmount");
			        				totalTaxAmount = totalTaxAmount + tempTax; 
			        				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
			        				
			        			expenseExtra = rs.getDouble("Discount");
			        			//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
			        			 totalDiscount = totalDiscount + expenseExtra;
			        			gsttax = gsttax + rs.getDouble("Gst");
			        			gst1 = rs.getString("Gst");
			        			double gst = rs.getDouble("Gst");
			        			double igst = rs.getDouble("TaxAmount");
			        			double totalAmtWithoutVat = 0;
			        			double total = rs.getDouble("totalperitem");
			
			        			gstAmt = total * gst / 100;
			
			        			String empId = rs.getString("fkSaleEmployeeId");
			        			
			        			table_cell = new PdfPCell(new Phrase(""+empId, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			String subCat = rs.getString("subcat_name");
			        			String itemName = rs.getString("ItemName");
			        			String barcode = rs.getString("BarcodeNo");
			        			//String empName = rs.getString("employee_Name");
			        			table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.NO_BORDER);
			        			table.addCell(table_cell);
			
			        			String hsnsac1 = rs.getString("HsnSacNo");
			
			        			paymentMode = rs.getString("payment_mode");
			
			        			String packing = String.valueOf(rs.getDouble("Quantity"));
			        			table_cell = new PdfPCell(new Phrase(" " + packing, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			double price = rs.getDouble("totalperitem");
			        			int quant = rs.getInt("Quantity");
			        			totalQty = totalQty + quant;
			        			double tax = rs.getDouble("TaxAmount");
			        			double taxperitem = tax / quant;
			        			double saletotal = rs.getDouble("SalePrice");
			        			String SalePrice = String.valueOf(saletotal);
			
			        			String totalWeight = String.valueOf(saletotal);
			        			table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			        			
			        			String disAmt = rs.getString("Discount");
			        			table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			        			table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.RIGHT);
			        			table.addCell(table_cell);
			        			
			        			userName = rs.getString("userName");
			
			        			discount = String.valueOf(rs.getDouble("Discount"));
			
			        			if (igst == 0) {
			        				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			        						- rs.getDouble("Gst");
			        			} else if (igst != 0) {
			        				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			        						- rs.getDouble("Gst");
			        			}
			        			String strTotalAmtWithoutVat = df
			        					.format(totalAmtWithoutVat);
			
			        			TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
			        			Total = +TotalOfTotalAmtWithoutVat;
			
			        			TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
			        					+ totalAmtWithoutVat;
			        			double vAmt = rs.getDouble("Gst");
			        			vatAmount = vatAmount + vAmt;
			
			        			double newiGstAmount = rs.getDouble("TaxAmount");
			        			interGstAmount = interGstAmount + newiGstAmount;
			
			        			double totalAmt = rs.getDouble("TaxAmount");
			        			TotalTax = TotalTax + totalAmt;
			
			        			itemCount++;
			
			        			//code for total item display on second pdf form of sale bill
			
			        			allItemNames = itemName;
			        			totalBags = rs.getDouble("Quantity");
			        			packingOfBag = rs.getDouble("Quantity");
			
			        			AllInOne += allItemNames + "  " + String.valueOf(totalBags)
			        					+ "  Quantity  ";
			        			a=a+1;
			        			}
			        		  else {	
			        				double tempTax = rs.getDouble("TaxAmount");
			        				totalTaxAmount = totalTaxAmount + tempTax; 
			        				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
			        				
			        			expenseExtra = rs.getDouble("Discount");
			        			//totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
			        			 totalDiscount = totalDiscount + expenseExtra;
			        			gsttax = gsttax + rs.getDouble("Gst");
			        			gst1 = rs.getString("Gst");
			        			double gst = rs.getDouble("Gst");
			        			double igst = rs.getDouble("TaxAmount");
			        			double totalAmtWithoutVat = 0;
			        			double total = rs.getDouble("totalperitem");
			
			        			gstAmt = total * gst / 100;
			
			        			String empId = rs.getString("fkSaleEmployeeId");
			        			
			        			table_cell = new PdfPCell(new Phrase(""+empId, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			String subCat = rs.getString("subcat_name");
			        			String itemName = rs.getString("ItemName");
			        			String barcode = rs.getString("BarcodeNo");
			        			String empName = rs.getString("employee_Name");
			        			table_cell = new PdfPCell(new Phrase(" " + subCat+"\n"+barcode, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.NO_BORDER);
			        			table.addCell(table_cell);
			
			        			String hsnsac1 = rs.getString("HsnSacNo");
			
			        			paymentMode = rs.getString("payment_mode");
			
			        			String packing = String.valueOf(rs.getDouble("Quantity"));
			        			table_cell = new PdfPCell(new Phrase(" " + packing, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			double price = rs.getDouble("totalperitem");
			        			int quant = rs.getInt("Quantity");
			        			totalQty = totalQty + quant;
			        			double tax = rs.getDouble("TaxAmount");
			        			double taxperitem = tax / quant;
			        			double saletotal = rs.getDouble("SalePrice");
			        			String SalePrice = String.valueOf(saletotal);
			
			        			String totalWeight = String.valueOf(saletotal);
			        			table_cell = new PdfPCell(new Phrase("" + totalWeight, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			        			table.addCell(table_cell);
			        			
			        			String disAmt = rs.getString("Discount");
			        			table_cell = new PdfPCell(new Phrase("" + disAmt, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.RIGHT);
			        			table.addCell(table_cell);
			
			        			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			        			table_cell = new PdfPCell(new Phrase(" " + vatAmt, font8));
			        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			        			table_cell.setBorder(Rectangle.RIGHT);
			        			table.addCell(table_cell);
			        			
			        			userName = rs.getString("userName");
			
			        			discount = String.valueOf(rs.getDouble("Discount"));
			
			        			if (igst == 0) {
			        				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			        						- rs.getDouble("Gst");
			        			} else if (igst != 0) {
			        				totalAmtWithoutVat = rs.getDouble("TaxAmount")
			        						- rs.getDouble("Gst");
			        			}
			        			String strTotalAmtWithoutVat = df
			        					.format(totalAmtWithoutVat);
			
			        			TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
			        			Total = +TotalOfTotalAmtWithoutVat;
			
			        			TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1
			        					+ totalAmtWithoutVat;
			        			double vAmt = rs.getDouble("Gst");
			        			vatAmount = vatAmount + vAmt;
			
			        			double newiGstAmount = rs.getDouble("TaxAmount");
			        			interGstAmount = interGstAmount + newiGstAmount;
			
			        			double totalAmt = rs.getDouble("TaxAmount");
			        			TotalTax = TotalTax + totalAmt;
			
			        			itemCount++;
			
			        			//code for total item display on second pdf form of sale bill
			
			        			allItemNames = itemName;
			        			totalBags = rs.getDouble("Quantity");
			        			packingOfBag = rs.getDouble("Quantity");
			
			        			AllInOne += allItemNames + "  " + String.valueOf(totalBags)
			        					+ "  Quantity  ";
			        			a=a+1;
			        			}
			    		  }
					  }
			                		  }
			            		  }
			        		  }  
			    		  }
			         }     
			    }*/
		}

		//if(a>1 && a<=6 )
		{
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.RIGHT);
			table.addCell(table_cell);

			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.NO_BORDER);
			//table_cell.setPaddingBottom(1);
			//table_cell.setColspan(0); 
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.RIGHT);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("Total ", font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("" + totalQty, font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("", font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT | Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table.addCell(table_cell);

			table_cell = new PdfPCell(new Phrase("" + Math.round(totalDiscount), font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT | Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			//table_cell.setColspan(1);
			table.addCell(table_cell);

			String TotalOfTotalAmtWithoutVatStr = df.format(Total);
			table_cell = new PdfPCell(new Phrase("" + TotalOfTotalAmtWithoutVatStr, font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP | Rectangle.LEFT);
			table_cell.setColspan(2);
			table.addCell(table_cell);

			document.add(table);

			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);

			float[] footerColumnWidths3 = { 1.0f };
			footerTable3.setWidths(footerColumnWidths3);

			PdfPCell footerTable_cell3;

			if (paymentMode.equalsIgnoreCase("cash"))
			{
				footerTable_cell3 = new PdfPCell(new Phrase("Net Paid Amount: "+cashAmount, font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);
				
				footerTable_cell3 = new PdfPCell(new Phrase("Cash Amount: "+cashAmount, font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);
			}
			else if (paymentMode.equalsIgnoreCase("card"))
			{
				footerTable_cell3 = new PdfPCell(new Phrase("Net Paid Amount: "+cardAmount, font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);
				
				footerTable_cell3 = new PdfPCell(new Phrase("Card Amount: "+cardAmount, font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);
			}
			else if (paymentMode.equalsIgnoreCase("cashandcard"))
			{
				footerTable_cell3 = new PdfPCell(new Phrase("Net Paid Amount: "+df.format(Double.parseDouble(cashAmount) + Double.parseDouble(cardAmount)), font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);
				
				footerTable_cell3 = new PdfPCell(new Phrase("Cash Amount: "+cashAmount, font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);

				footerTable_cell3 = new PdfPCell(new Phrase("Card Amount: "+cardAmount, font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);
			}
			else{}

			if (Double.parseDouble(saleRerturnCreditAmount) > 0)
			{
				footerTable_cell3 = new PdfPCell(new Phrase("Credit Amount: " + saleRerturnCreditAmount, font8Bold));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3);
			}
			
			footerTable_cell3 = new PdfPCell(new Phrase("Balance Amount: "+pendingBillPayment, font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
			
			footerTable_cell3 = new PdfPCell(new Phrase("5%Tax="+df.format(tax5)+"Rs|12%Tax="+df.format(tax12)+"|18%Tax="+df.format(tax18)+"Rs|28%Tax="+df.format(tax28), font7));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("Terms and Conditions: NO REFUNDS", font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("\n", font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase(
					"No Exchange of Suit, Indo-Western, Sherwani, Blazer, Tie, Pheta, Mojodi, Dupatta, Hosiery and Functional Items",
					font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("\n"));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("No Exchange Without Barcode and Invoice", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("\n", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(
					new Phrase("No Guarantee of Work Embrodiery and fabric of Garment", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("\n", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			footerTable_cell3 = new PdfPCell(new Phrase("CASHIER:- " + userName.toUpperCase(), font8Bold));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);

			/* 	footerTable_cell3 = new PdfPCell(new Phrase("Cashier:- "+userName.toUpperCase(), font8));
				footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
				footerTable_cell3.setBorder(Rectangle.NO_BORDER);
				footerTable3.addCell(footerTable_cell3); */

			document.add(footerTable3);
		}
		/*
		
		
		if(a>6 && a<=11 )
		{	
			 document.add(table); 
		   
		    document.newPage();
		    document.add(new Paragraph("        "));
		    document.add(new Paragraph("        "));
		    document.add(new Paragraph("        "));
		
		    table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.RIGHT);
			table1.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.NO_BORDER);
			//table_cell.setPaddingBottom(1);
			//table_cell.setColspan(0);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.RIGHT);
			table1.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table1.addCell(table_cell);
		
			table_cell = new PdfPCell(new Phrase("Total ", font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase(""+totalQty, font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("", font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT | Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase(""+Math.round(totalDiscount), font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT | Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			//table_cell.setColspan(1);
			table1.addCell(table_cell);	
			
			String TotalOfTotalAmtWithoutVatStr = df.format(Total);
			table_cell = new PdfPCell(new Phrase(""+TotalOfTotalAmtWithoutVatStr, font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP | Rectangle.LEFT);
			table_cell.setColspan(2);
			table1.addCell(table_cell);
			
			document.add(table1);
			
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
			
			float[] footerColumnWidths3 = { 1.0f };
			footerTable3.setWidths(footerColumnWidths3);
			
			PdfPCell footerTable_cell3;
			
			footerTable_cell3 = new PdfPCell(new Phrase("Terms: NO REFUNDS\n*No Exchange of Suit, Indo-Western, Sherwani, Blazer, Tie, Pheta, Mojodi, Dupatta, Hosieri and Functional Items\n*No Exchange Without Barcode and Invoice\n*No Gaurantee of Work Embrodiery and fabric of Garment", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			//footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
			
			footerTable_cell3 = new PdfPCell(new Phrase("Cashier:- "+userName.toUpperCase(), font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			//footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
			
			document.add(footerTable3);
		}
		
		if(a>11 && a<=16 ){
			
			document.add(table);   
		   	//document.newPage();
		 
			   /* document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(table1); 
		  
		   document.newPage(); */

		/*   
		   
		   
		   
		   String empty = " ";
		
		   table_cell = new PdfPCell(new Phrase("", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.RIGHT | Rectangle.TOP);
			table2.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.NO_BORDER);
			//table_cell.setPaddingBottom(1);
			//table_cell.setColspan(0);
			table2.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table2.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table2.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table2.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.RIGHT);
			table2.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table2.addCell(table_cell);
		
			table_cell = new PdfPCell(new Phrase("Total ", font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT);
			table2.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase(""+totalQty, font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table2.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("", font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT | Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table2.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase(""+Math.round(totalDiscount), font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP | Rectangle.RIGHT | Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			//table_cell.setColspan(1);
			table2.addCell(table_cell);
			
			
			String TotalOfTotalAmtWithoutVatStr = df.format(Total);
			table_cell = new PdfPCell(new Phrase(""+TotalOfTotalAmtWithoutVatStr, font8Bold));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP | Rectangle.LEFT);
			table_cell.setColspan(2);
			table2.addCell(table_cell);
			
			document.add(table2);
			
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
			
			float[] footerColumnWidths3 = { 1.0f };
			footerTable3.setWidths(footerColumnWidths3);
			
			PdfPCell footerTable_cell3;
			
			footerTable_cell3 = new PdfPCell(new Phrase("Terms: NO REFUNDS\n*No Exchange of Suit, Indo-Western, Sherwani, Blazer, Tie, Pheta, Mojodi, Dupatta, Hosieri and Functional Items\n*No Exchange Without Barcode and Invoice\n*No Gaurantee of Work Embrodiery and fabric of Garment", font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			//footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
			
			footerTable_cell3 = new PdfPCell(new Phrase("Cashier:- "+userName.toUpperCase(), font8));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			//footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
			
			document.add(footerTable3);
		  
		}
		
		if(a>16 && a<=21 )
		{   	
			   document.add(table); 
		   document.add(new Paragraph("                                                                                                               Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(table1); 
		   document.add(new Paragraph("                                                                                                               Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
			   document.add(table2); 
		   document.add(new Paragraph("                                                                                                                Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			  
		  	document.add(new Paragraph("        "));
		  	document.add(new Paragraph("        ")); 
		  	document.add(new Paragraph("        "));  
		  
		   String empty = " ";
		   
		   	table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table3.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\n      GST: "+totalTaxAmount , font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(0);
			table3.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table3.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table3.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table3.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table3.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table3.addCell(table_cell);
			
		/*
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table3.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
					font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table3.addCell(table_cell);
		*/

		/*
		
		
		
		
		
		table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(2);
		table3.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Discount: " + Math.round(totalDiscount), font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table3.addCell(table_cell);
		
		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setColspan(2);
		table3.addCell(table_cell);
		
			document.add(table3);
		
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
		
			float[] footerColumnWidths3 = { 0.9f };
			footerTable3.setWidths(footerColumnWidths3);
		
			PdfPCell footerTable_cell3;
		
			footerTable_cell3 = new PdfPCell(new Phrase(
					"\n\n\n\nThank You visit Again!! "));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
		
			document.add(footerTable3);
		  
		}
		
		if(a>21 && a<=26 )
		{   	
			   document.add(table); 
		   document.add(new Paragraph("                                                                                                               Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(table1); 
		   document.add(new Paragraph("                                                                                                              Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
			   document.add(table2); 
		   document.add(new Paragraph("                                                                                                            Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table3); 
		   document.add(new Paragraph("                                                                                                            Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			  
		  	document.add(new Paragraph("        "));
		  	document.add(new Paragraph("        ")); 
		  	document.add(new Paragraph("        "));  
		  
		   String empty = " ";
		   
		    table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table4.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\n      GST: "+totalTaxAmount , font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(0);
			table4.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table4.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table4.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table4.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table4.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table4.addCell(table_cell);
			
		/*
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table4.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
					font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table4.addCell(table_cell);
		*/

		/*
		
		
		
		table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(2);
		table4.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Discount: " + Math.round(totalDiscount), font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table4.addCell(table_cell);
		
		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setColspan(2);
		table4.addCell(table_cell);
		
			document.add(table4);
		
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
		
			float[] footerColumnWidths3 = { 0.9f };
			footerTable3.setWidths(footerColumnWidths3);
		
			PdfPCell footerTable_cell3;
		
			footerTable_cell3 = new PdfPCell(new Phrase(
					"\n\n\n\nThank You visit Again!! "));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
		
			document.add(footerTable3);
		  
		} 
		
		
		if(a>26 && a<=31 )
		{   	
			   document.add(table); 
		   document.add(new Paragraph("                                                                                                           Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(table1); 
		   document.add(new Paragraph("                                                                                                          Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
			   document.add(table2); 
		   document.add(new Paragraph("                                                                                                          Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table3); 
		   document.add(new Paragraph("                                                                                                          Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table4); 
		   document.add(new Paragraph("                                                                                                           Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			  
		  	document.add(new Paragraph("        "));
		  	document.add(new Paragraph("        ")); 
		  	document.add(new Paragraph("        "));  
		   
		   String empty = " ";
		   
		    table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table5.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\n      GST: "+totalTaxAmount , font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(0);
			table5.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table5.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table5.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table5.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table5.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table5.addCell(table_cell);
			
		/*
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table5.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
					font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table5.addCell(table_cell);
		*/

		/*
		
		
		
		table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(2);
		table5.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Discount: " + Math.round(totalDiscount), font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table5.addCell(table_cell);
		
		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setColspan(2);
		table5.addCell(table_cell);
		
			document.add(table5);
		
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
		
			float[] footerColumnWidths3 = { 0.9f };
			footerTable3.setWidths(footerColumnWidths3);
		
			PdfPCell footerTable_cell3;
		
			footerTable_cell3 = new PdfPCell(new Phrase(
					"\n\n\n\nThank You visit Again!! "));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
		
			document.add(footerTable3);
		  
		} 
		
		if(a>31 && a<=36 ){
		   	
			   document.add(table); 
		   document.add(new Paragraph("                                                                                                          Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(table1); 
		   document.add(new Paragraph("                                                                                                         Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
			   document.add(table2); 
		   document.add(new Paragraph("                                                                                                        Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table3); 
		   document.add(new Paragraph("                                                                                                       Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table4); 
		   document.add(new Paragraph("                                                                                                       Continue On Next Page..."));
			   document.add(new Paragraph(""));
		 //  document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table5); 
		   document.add(new Paragraph("                                                                                                      Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			  
		  	document.add(new Paragraph("        "));
		  	document.add(new Paragraph("        ")); 
		  	document.add(new Paragraph("        "));  
		  
		   String empty = " ";
		   
		   table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table6.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\n      GST: "+totalTaxAmount , font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(0);
			table6.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table6.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table6.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table6.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table6.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table6.addCell(table_cell);
			
		/*
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table6.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
					font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table6.addCell(table_cell);
		*/

		/*
		
		
		
		table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(2);
		table6.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Discount: " + Math.round(totalDiscount), font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table6.addCell(table_cell);
		
		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setColspan(2);
		table6.addCell(table_cell);
		
			document.add(table6);
		
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
		
			float[] footerColumnWidths3 = { 0.9f };
			footerTable3.setWidths(footerColumnWidths3);
		
			PdfPCell footerTable_cell3;
		
			footerTable_cell3 = new PdfPCell(new Phrase(
					"\n\n\n\nThank You visit Again!! "));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
		
			document.add(footerTable3);
		  
		   
		} 
		
		if(a>36 && a<=41 ){
		   	
			   document.add(table); 
		   document.add(new Paragraph("                                                                                                    Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(table1); 
		   document.add(new Paragraph("                                                                                                     Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
			   document.add(table2); 
		   document.add(new Paragraph("                                                                                                    Continue On Next Page..."));
			   document.add(new Paragraph(""));
		  // document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table3); 
		   document.add(new Paragraph("                                                                                                    Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table4); 
		   document.add(new Paragraph("                                                                                                   Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table5); 
		   document.add(new Paragraph("                                                                                                  Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table6); 
		   document.add(new Paragraph("                                                                                                   Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   //document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			  
		  	document.add(new Paragraph("        "));
		  	document.add(new Paragraph("        ")); 
		  	document.add(new Paragraph("        "));  
		 
		   String empty = " ";
		
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1
					+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table7.addCell(table_cell);
		
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\n      GST: "+totalTaxAmount , font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(0);
			table7.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table7.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table7.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table7.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table7.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table7.addCell(table_cell);
			
		/*
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table7.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
					font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table7.addCell(table_cell);
		*/

		/*
		
		
		
		
		table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(2);
		table7.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Discount: " + Math.round(totalDiscount), font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table7.addCell(table_cell);
		
		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setColspan(2);
		table7.addCell(table_cell);
		
			document.add(table7);
		
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
		
			float[] footerColumnWidths3 = { 0.9f };
			footerTable3.setWidths(footerColumnWidths3);
		
			PdfPCell footerTable_cell3;
		
			footerTable_cell3 = new PdfPCell(new Phrase(
					"\n\n\n\nThank You visit Again!! "));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
		
			document.add(footerTable3);
		  
		   
		} 
		
		if(a>41 && a<=46 ){
		   	
			   document.add(table); 
		   document.add(new Paragraph("                                                                                                    Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(table1); 
		   document.add(new Paragraph("                                                                                                     Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
			   document.add(table2); 
		   document.add(new Paragraph("                                                                                                     Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table3); 
		   document.add(new Paragraph("                                                                                                     Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table4); 
		   document.add(new Paragraph("                                                                                                     Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		  
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table5); 
		   document.add(new Paragraph("                                                                                                    Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table6); 
		   document.add(new Paragraph("                                                                                                    Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
		 
			   document.add(new Paragraph("        "));
			   document.add(new Paragraph("        ")); 
		   document.add(new Paragraph("        "));
		   document.add(new Paragraph("        ")); 
			   document.add(new Paragraph("        "));
		   document.add(table7); 
		   document.add(new Paragraph("                                                                                                    Continue On Next Page..."));
			   document.add(new Paragraph(""));
		   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		  
		   document.newPage();
			  
		  	document.add(new Paragraph("        "));
		  	document.add(new Paragraph("        ")); 
		  	document.add(new Paragraph("        "));  
		
		   String empty = " ";
		
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1
					+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table8.addCell(table_cell);
		
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\n      GST: "+totalTaxAmount , font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(0);
			table8.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table8.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT);
			table8.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table8.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table8.addCell(table_cell);	
			
			table_cell = new PdfPCell(new Phrase("\n", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.BOTTOM);
			table8.addCell(table_cell);
			
		/*
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(4);
			table8.addCell(table_cell);
			
			Double TaxAmount = gstAmt;
			table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
					font13));
			table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table_cell.setPaddingBottom(1);
			table_cell.setColspan(1);
			table8.addCell(table_cell);
		*/

		/*
		
		
		table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(2);
		table8.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Discount: " + Math.round(totalDiscount), font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table8.addCell(table_cell);
		
		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM | Rectangle.TOP);
		table_cell.setColspan(2);
		table8.addCell(table_cell);
		
			document.add(table8);
		
			PdfPTable footerTable3 = new PdfPTable(1);
			footerTable3.setWidthPercentage(100);
		
			float[] footerColumnWidths3 = { 0.9f };
			footerTable3.setWidths(footerColumnWidths3);
		
			PdfPCell footerTable_cell3;
		
			footerTable_cell3 = new PdfPCell(new Phrase(
					"\n\n\n\nThank You visit Again!! "));
			footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			footerTable_cell3.setRowspan(1);
			footerTable_cell3.setBorder(Rectangle.NO_BORDER);
			footerTable3.addCell(footerTable_cell3);
		
			document.add(footerTable3);
		  
		   
		} 
		*/
		/*
		if(a>46){
		document.add(table); 
		document.add(new Paragraph("                                                                                                        Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
		document.add(table1); 
		document.add(new Paragraph("                                                                                                        Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
		document.add(table2); 
		document.add(new Paragraph("                                                                                                       Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(table3); 
		document.add(new Paragraph("                                                                                                       Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(table4); 
		document.add(new Paragraph("                                                                                                       Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(table5); 
		document.add(new Paragraph("                                                                                                      Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(new Paragraph("        "));  
		document.add(new Paragraph("        "));
			document.add(table6); 
		document.add(new Paragraph("                                                                                                      Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(table7); 
		document.add(new Paragraph("                                                                                                      Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
		
		document.add(new Paragraph("        "));
		document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(new Paragraph("        ")); 
		document.add(new Paragraph("        "));
			document.add(table8); 
		document.add(new Paragraph("                                                                                                      Continue On Next Page..."));
		document.add(new Paragraph(""));
		document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
		
		
		document.newPage();
			  
			document.add(new Paragraph("        "));
			document.add(new Paragraph("        ")); 
			document.add(new Paragraph("        "));  
		
		String empty = " ";
		
		table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1
				+ "%", font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(4);
		table9.addCell(table_cell);
		
		Double TaxAmount = gstAmt;
		table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + totalTaxAmount,
				font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table9.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Payment Mode:"
				+ paymentMode, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(2);
		table9.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Discount:"
				+ Math.round(totalDiscount), font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(1);
		table9.addCell(table_cell);
		
		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase("Gross Total:"
				+ TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		table_cell.setColspan(2);
		table9.addCell(table_cell);
		
		document.add(table9);
		
		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);
		
		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);
		
		PdfPCell footerTable_cell3;
		
		footerTable_cell3 = new PdfPCell(new Phrase(
				"\n\n\n\nThank You visit Again!! "));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);
		
		document.add(footerTable3);
		
		}
		
		
		*/

		rs.close();
		stmt.close();
		conn.close();
		// step 5

		document.close();
		
	} catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%>
