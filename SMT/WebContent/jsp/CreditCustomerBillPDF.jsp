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
	String customerName = (String) session.getAttribute("creditCustomerName");
	String gstTinNo = (String) session.getAttribute("gstTinNo");
	//Double paidAmt = (Double) session.getAttribute("paidAmt");
	
	/* response.setContentType("application/pdf");
	Long billno = (Long) session.getAttribute("BillNo");
	String creditCustomerName = (String) session.getAttribute("creditCustomerName");
	String gstTinNo = (String) session.getAttribute("gstTinNo");
	Double paidAmt = (Double) session.getAttribute("paidAmt"); */

	System.out.print(":::::::::::::::::::::::::::::::::::::::::BillNO:-"+ billno + "::::::::::::::::::::::::::::");
	System.out.print(":::::::::::::::::::::::::::::::::::::::::customerName:-"+ customerName + "::::::::::::::::::::::::::::");

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
	double billPaymentPending = 0.0;
	String custId = "";
	Double paidAmount = 0.0;

	try {
		Connection conn = null;
		Connection conn1 = null;
		// step 1
		Document document = new Document();
		
		
		//Document document = new Document();
		document.setMargins(35 , 35 , 10 , 0);
		
		// step 2
		PdfWriter.getInstance(document, response.getOutputStream());

		// step 3
		document.open();
		//Image image1 = Image.getInstance("C:/step0003.jpg");
		Image image1 = Image.getInstance("/step0003.jpg");
		image1.scaleToFit(520f, 1200f);
		image1.setAlignment(Image.MIDDLE );
		document.add(image1);
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(	"jdbc:mysql://localhost:3306/fabric", "root", "root");
		Statement stmt = conn.createStatement();

		ResultSet rs = stmt.executeQuery("select c.ItemName, c.Quantity, c.SalePrice, c.Discount, c.TotalAmount, c.GrossTotal, c.Date, c.totalperitem, c.Gst, c.Igst, c.TaxAmount, c.HsnSacNo , s.contact_no, s.first_name,c.pending_bill_payment,c.BarcodeNo,c.EmpName, payment_mode, fkCrediCustId from creditcustomerbill c left join customer_details s ON c.fkCrediCustId=s.pk_customer_id where c.BillNo = "+billno);
		System.out.println("Query Execute");
		
		Date d1 = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat sdf1 = new SimpleDateFormat("E");
		SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
		sdf2.setTimeZone(TimeZone.getTimeZone("IST"));

		Date billDate = new Date();
		SimpleDateFormat dateFormater = new SimpleDateFormat("dd-MM-yyyy");
		String StrBillDate = dateFormater.format(billDate);
		System.out.println(StrBillDate+" =================================================================== ");

		String stdver1 = (String) sdf.format(d1);
		String day = sdf1.format(d1.getDate());
		String Time = sdf2.format(d1.getTime());
		String dtfinl = stdver1;

		DecimalFormat df = new DecimalFormat("#.00");

		Font font17Bold = new Font(Font.FontFamily.TIMES_ROMAN, 17,
				Font.BOLD, BaseColor.BLACK);
		Font font16Bold = new Font(Font.FontFamily.TIMES_ROMAN, 16,
				Font.BOLD, BaseColor.BLACK);
		Font font15Bold = new Font(Font.FontFamily.TIMES_ROMAN, 15,
				Font.BOLD, BaseColor.BLACK);
		Font font14Bold = new Font(Font.FontFamily.TIMES_ROMAN, 14,
				Font.BOLD, BaseColor.BLACK);
		Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13,
				Font.BOLD, BaseColor.BLACK);
		Font font12Bold = new Font(Font.FontFamily.TIMES_ROMAN, 12,
				Font.BOLD, BaseColor.BLACK);
		Font font11Bold = new Font(Font.FontFamily.TIMES_ROMAN, 11,
				Font.BOLD, BaseColor.BLACK);
		Font font16 = new Font(Font.FontFamily.TIMES_ROMAN, 16,
				Font.BOLD, BaseColor.BLACK);
		Font font14 = new Font(Font.FontFamily.TIMES_ROMAN, 14,
				Font.BOLD, BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12,
				Font.BOLD, BaseColor.BLACK);
		Font font13 = new Font(Font.FontFamily.TIMES_ROMAN, 13,
				Font.BOLD, BaseColor.BLACK);
		Font Normalfont12 = new Font(Font.FontFamily.TIMES_ROMAN, 12,
				Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13,
				Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14,
				Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14,
				Font.UNDERLINE, BaseColor.BLACK);

		//Header Containt Table
		
			/* image1.scaleToFit(300f, 500f);
			Image imageCenter1 = Image.getInstance(image1); 
			 imageCenter1.setAlignment(Image.MIDDLE ); 
			document.add(imageCenter1); */		

		rs.next();
		
		PdfPTable headertable21 = new PdfPTable(2);
		headertable21.setWidthPercentage(100);

		float[] HeadercolumnWidths21 = { 0.9f, 0.5f };
		headertable21.setWidths(HeadercolumnWidths21);

		PdfPCell headerTable_cell21;

		headerTable_cell21 = new PdfPCell(new Phrase(GST_No, font12Bold));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell21.setPaddingBottom(2);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		/* headerTable_cell21 = new PdfPCell(new Phrase("Date: "+ rs.getString("Date"), font12Bold)); */
		headerTable_cell21 = new PdfPCell(new Phrase("Date: "+StrBillDate, font12Bold));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell21.setPaddingBottom(2);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("Name: "	+ customerName,	font12Bold));
		headerTable_cell21.setRowspan(8);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell21.setPaddingTop(8);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("                      Bill No: " + billno,font12Bold));
		headerTable_cell21.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell21.setPaddingTop(8);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase(""));
		headerTable_cell21.setRowspan(8);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		headerTable_cell21 = new PdfPCell(new Phrase("\n"));
		headerTable_cell21.setRowspan(8);
		headerTable_cell21.setBorder(Rectangle.NO_BORDER);
		headertable21.addCell(headerTable_cell21);

		document.add(headertable21);

		//end informatin

		//table for particulars
		PdfPTable table = new PdfPTable(6);
		table.setSpacingBefore(5);
		table.setWidthPercentage(100);
		table.setSpacingAfter(5);

		float[] columnWidths = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table.setWidths(columnWidths);
		
		PdfPTable table1 = new PdfPTable(6);
		 table1.setSpacingBefore(5);
		table1.setWidthPercentage(100);
		table1.setSpacingAfter(5);

		float[] columnWidths1 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table1.setWidths(columnWidths1);
		
		PdfPTable table2 = new PdfPTable(6);
		 table2.setSpacingBefore(5);
		table2.setWidthPercentage(100);
		table2.setSpacingAfter(5);

		float[] columnWidths2 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table2.setWidths(columnWidths2);
		
		PdfPTable table3 = new PdfPTable(6);
		 table3.setSpacingBefore(5);
		table3.setWidthPercentage(100);
		table3.setSpacingAfter(5);

		float[] columnWidths3 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table3.setWidths(columnWidths3);
		
		PdfPTable table4 = new PdfPTable(6);
		 table4.setSpacingBefore(5);
		table4.setWidthPercentage(100);
		table4.setSpacingAfter(5);

		float[] columnWidths4 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table4.setWidths(columnWidths4);
		
		PdfPTable table5 = new PdfPTable(6);
		 table5.setSpacingBefore(5);
		table5.setWidthPercentage(100);
		table5.setSpacingAfter(5);

		float[] columnWidths5 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table5.setWidths(columnWidths5);
		
		PdfPTable table6 = new PdfPTable(6);
		 table6.setSpacingBefore(5);
		table6.setWidthPercentage(100);
		table6.setSpacingAfter(5);

		float[] columnWidths6 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table6.setWidths(columnWidths6);
		
		PdfPTable table7 = new PdfPTable(6);
		 table7.setSpacingBefore(5);
		table7.setWidthPercentage(100);
		table7.setSpacingAfter(5);

		float[] columnWidths7 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table7.setWidths(columnWidths7);
		
		PdfPTable table8 = new PdfPTable(6);
		 table8.setSpacingBefore(5);
		table8.setWidthPercentage(100);
		table8.setSpacingAfter(5);

		float[] columnWidths8 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table8.setWidths(columnWidths8);
		
		PdfPTable table9 = new PdfPTable(6);
		 table9.setSpacingBefore(5);
		table9.setWidthPercentage(100);
		table9.setSpacingAfter(5);

		float[] columnWidths9 = { 0.1f, 0.7f, 0.3f, 0.3f, 0.3f, 0.5f };
		table9.setWidths(columnWidths9);
		
		PdfPCell table_cell;
		rs.beforeFirst();
	    		
		/**/
		
        PdfPCell cell1 = new PdfPCell(new Paragraph("Sr. No."));
        cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		PdfPCell cell2 = new PdfPCell(new Paragraph("Particulars"));
		cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
	    PdfPCell cell3 = new PdfPCell(new Paragraph("Qty"));
	    cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
	    PdfPCell cell4 = new PdfPCell(new Paragraph("Rate"));
	    cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
	    PdfPCell cell5 = new PdfPCell(new Paragraph("GST (%)"));
	    cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
	    PdfPCell cell6 = new PdfPCell(new Paragraph("Amount")); 
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
	   

while(rs.next())
{	
	billPaymentPending = rs.getDouble("pending_bill_payment");
	custId = rs.getString("fkCrediCustId");
	System.out.println("CUSTOMER ID =============> "+custId);
	
	if (a<6)
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

	table_cell = new PdfPCell(new Phrase(" " + a));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);

	String itemName = rs.getString("ItemName");
	String barcode = rs.getString("BarcodeNo");
	/* String empName = rs.getString("employee_Name"); */
	table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);

	String hsnsac1 = rs.getString("HsnSacNo");

	paymentMode = rs.getString("payment_mode");

	String packing = String.valueOf(rs.getDouble("Quantity"));
	table_cell = new PdfPCell(new Phrase(" " + packing));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);

	double price = rs.getDouble("totalperitem");
	long quant = rs.getLong("Quantity");
	double tax = rs.getDouble("TaxAmount");
	double taxperitem = tax / quant;
	double saletotal = rs.getDouble("SalePrice");
	String SalePrice = String.valueOf(saletotal);	
	
	String totalWeight = String.valueOf(saletotal);
	table_cell = new PdfPCell(new Phrase("" + totalWeight));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("" + gst));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT);
	table.addCell(table_cell);

	String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
	table_cell = new PdfPCell(new Phrase(" " + vatAmt));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);

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

			table_cell = new PdfPCell(new Phrase(" " + a));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell);

			String itemName = rs.getString("ItemName");
			String barcode = rs.getString("BarcodeNo");
			/* String empName = rs.getString("employee_Name"); */
			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell);

			String hsnsac1 = rs.getString("HsnSacNo");

			paymentMode = rs.getString("payment_mode");

			String packing = String.valueOf(rs.getDouble("Quantity"));
			table_cell = new PdfPCell(new Phrase(" " + packing));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell);

			double price = rs.getDouble("totalperitem");
			long quant = rs.getLong("Quantity");
			double tax = rs.getDouble("TaxAmount");
			double taxperitem = tax / quant;
			double saletotal = rs.getDouble("SalePrice");
			String SalePrice = String.valueOf(saletotal);	
			
			String totalWeight = String.valueOf(saletotal);
			table_cell = new PdfPCell(new Phrase("" + totalWeight));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell);
			
			table_cell = new PdfPCell(new Phrase("" + gst));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.RIGHT);
			table1.addCell(table_cell);

			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell);

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

  			table_cell = new PdfPCell(new Phrase(" " + a));
  			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
  			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
  			table2.addCell(table_cell);

  			String itemName = rs.getString("ItemName");
  			String barcode = rs.getString("BarcodeNo");
  			/* String empName = rs.getString("employee_Name"); */
  			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
  			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
  			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
  			table2.addCell(table_cell);

  			String hsnsac1 = rs.getString("HsnSacNo");

  			paymentMode = rs.getString("payment_mode");

  			String packing = String.valueOf(rs.getDouble("Quantity"));
  			table_cell = new PdfPCell(new Phrase(" " + packing));
  			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
  			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
  			table2.addCell(table_cell);

  			double price = rs.getDouble("totalperitem");
  			long quant = rs.getLong("Quantity");
  			double tax = rs.getDouble("TaxAmount");
  			double taxperitem = tax / quant;
  			double saletotal = rs.getDouble("SalePrice");
  			String SalePrice = String.valueOf(saletotal);	
  			
  			String totalWeight = String.valueOf(saletotal);
  			table_cell = new PdfPCell(new Phrase("" + totalWeight));
  			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
  			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
  			table2.addCell(table_cell);
  			
  			table_cell = new PdfPCell(new Phrase("" + gst));
  			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
  			table_cell.setBorder(Rectangle.RIGHT);
  			table2.addCell(table_cell);

  			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
  			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
  			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
  			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
  			table2.addCell(table_cell);

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

          			table_cell = new PdfPCell(new Phrase(" " + a));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table3.addCell(table_cell);

          			String itemName = rs.getString("ItemName");
          			String barcode = rs.getString("BarcodeNo");
          			/* String empName = rs.getString("employee_Name"); */
          			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table3.addCell(table_cell);

          			String hsnsac1 = rs.getString("HsnSacNo");

          			paymentMode = rs.getString("payment_mode");

          			String packing = String.valueOf(rs.getDouble("Quantity"));
          			table_cell = new PdfPCell(new Phrase(" " + packing));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table3.addCell(table_cell);

          			double price = rs.getDouble("totalperitem");
          			long quant = rs.getLong("Quantity");
          			double tax = rs.getDouble("TaxAmount");
          			double taxperitem = tax / quant;
          			double saletotal = rs.getDouble("SalePrice");
          			String SalePrice = String.valueOf(saletotal);	
          			
          			String totalWeight = String.valueOf(saletotal);
          			table_cell = new PdfPCell(new Phrase("" + totalWeight));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table3.addCell(table_cell);
          			
          			table_cell = new PdfPCell(new Phrase("" + gst));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.RIGHT);
          			table3.addCell(table_cell);

          			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
          			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table3.addCell(table_cell);

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

          			table_cell = new PdfPCell(new Phrase(" " + a));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table4.addCell(table_cell);

          			String itemName = rs.getString("ItemName");
          			String barcode = rs.getString("BarcodeNo");
          			/* String empName = rs.getString("employee_Name"); */
          			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table4.addCell(table_cell);

          			String hsnsac1 = rs.getString("HsnSacNo");

          			paymentMode = rs.getString("payment_mode");

          			String packing = String.valueOf(rs.getDouble("Quantity"));
          			table_cell = new PdfPCell(new Phrase(" " + packing));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table4.addCell(table_cell);

          			double price = rs.getDouble("totalperitem");
          			long quant = rs.getLong("Quantity");
          			double tax = rs.getDouble("TaxAmount");
          			double taxperitem = tax / quant;
          			double saletotal = rs.getDouble("SalePrice");
          			String SalePrice = String.valueOf(saletotal);	
          			
          			String totalWeight = String.valueOf(saletotal);
          			table_cell = new PdfPCell(new Phrase("" + totalWeight));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table4.addCell(table_cell);
          			
          			table_cell = new PdfPCell(new Phrase("" + gst));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.RIGHT);
          			table4.addCell(table_cell);

          			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
          			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
          			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
          			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
          			table4.addCell(table_cell);

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

              			table_cell = new PdfPCell(new Phrase(" " + a));
              			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
              			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
              			table5.addCell(table_cell);

              			String itemName = rs.getString("ItemName");
              			String barcode = rs.getString("BarcodeNo");
              			/* String empName = rs.getString("employee_Name"); */
              			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
              			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
              			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
              			table5.addCell(table_cell);

              			String hsnsac1 = rs.getString("HsnSacNo");

              			paymentMode = rs.getString("payment_mode");

              			String packing = String.valueOf(rs.getDouble("Quantity"));
              			table_cell = new PdfPCell(new Phrase(" " + packing));
              			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
              			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
              			table5.addCell(table_cell);

              			double price = rs.getDouble("totalperitem");
              			long quant = rs.getLong("Quantity");
              			double tax = rs.getDouble("TaxAmount");
              			double taxperitem = tax / quant;
              			double saletotal = rs.getDouble("SalePrice");
              			String SalePrice = String.valueOf(saletotal);	
              			
              			String totalWeight = String.valueOf(saletotal);
              			table_cell = new PdfPCell(new Phrase("" + totalWeight));
              			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
              			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
              			table5.addCell(table_cell);
              			
              			table_cell = new PdfPCell(new Phrase("" + gst));
              			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
              			table_cell.setBorder(Rectangle.RIGHT);
              			table5.addCell(table_cell);

              			String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
              			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
              			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
              			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
              			table5.addCell(table_cell);

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

                			table_cell = new PdfPCell(new Phrase(" " + a));
                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                			table6.addCell(table_cell);

                			String itemName = rs.getString("ItemName");
                			String barcode = rs.getString("BarcodeNo");
                			/* String empName = rs.getString("employee_Name"); */
                			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                			table6.addCell(table_cell);

                			String hsnsac1 = rs.getString("HsnSacNo");

                			paymentMode = rs.getString("payment_mode");

                			String packing = String.valueOf(rs.getDouble("Quantity"));
                			table_cell = new PdfPCell(new Phrase(" " + packing));
                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                			table6.addCell(table_cell);

                			double price = rs.getDouble("totalperitem");
                			long quant = rs.getLong("Quantity");
                			double tax = rs.getDouble("TaxAmount");
                			double taxperitem = tax / quant;
                			double saletotal = rs.getDouble("SalePrice");
                			String SalePrice = String.valueOf(saletotal);

                			String totalWeight = String.valueOf(saletotal);
                			table_cell = new PdfPCell(new Phrase(" " + totalWeight));
                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                			table6.addCell(table_cell);

                			String vatAmt = String
                					.valueOf(rs.getDouble("totalperitem"));
                			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                			table6.addCell(table_cell);

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
                        			 // totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
								totalDiscount = totalDiscount + expenseExtra;
                    			gsttax = gsttax + rs.getDouble("Gst");
                    			gst1 = rs.getString("Gst");
                    			double gst = rs.getDouble("Gst");
                    			double igst = rs.getDouble("TaxAmount");
                    			double totalAmtWithoutVat = 0;
                    			double total = rs.getDouble("totalperitem");

                    			gstAmt = total * gst / 100;

                    			table_cell = new PdfPCell(new Phrase(" " + a));
                    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                    			table7.addCell(table_cell);

                    			String itemName = rs.getString("ItemName");
                    			String barcode = rs.getString("BarcodeNo");
                    			/* String empName = rs.getString("employee_Name"); */
                    			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
                    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                    			table7.addCell(table_cell);

                    			String hsnsac1 = rs.getString("HsnSacNo");

                    			paymentMode = rs.getString("payment_mode");

                    			String packing = String.valueOf(rs.getDouble("Quantity"));
                    			table_cell = new PdfPCell(new Phrase(" " + packing));
                    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                    			table7.addCell(table_cell);

                    			double price = rs.getDouble("totalperitem");
                    			long quant = rs.getLong("Quantity");
                    			double tax = rs.getDouble("TaxAmount");
                    			double taxperitem = tax / quant;
                    			double saletotal = rs.getDouble("SalePrice");
                    			String SalePrice = String.valueOf(saletotal);

                    			String totalWeight = String.valueOf(saletotal);
                    			table_cell = new PdfPCell(new Phrase(" " + totalWeight));
                    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                    			table7.addCell(table_cell);

                    			String vatAmt = String
                    					.valueOf(rs.getDouble("totalperitem"));
                    			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                    			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                    			table7.addCell(table_cell);

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
                            			 // totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
									totalDiscount = totalDiscount + expenseExtra;
                        			gsttax = gsttax + rs.getDouble("Gst");
                        			gst1 = rs.getString("Gst");
                        			double gst = rs.getDouble("Gst");
                        			double igst = rs.getDouble("TaxAmount");
                        			double totalAmtWithoutVat = 0;
                        			double total = rs.getDouble("totalperitem");

                        			gstAmt = total * gst / 100;

                        			table_cell = new PdfPCell(new Phrase(" " + a));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table8.addCell(table_cell);

                        			String itemName = rs.getString("ItemName");
                        			String barcode = rs.getString("BarcodeNo");
                        			/* String empName = rs.getString("employee_Name"); */
                        			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table8.addCell(table_cell);

                        			String hsnsac1 = rs.getString("HsnSacNo");

                        			paymentMode = rs.getString("payment_mode");

                        			String packing = String.valueOf(rs.getDouble("Quantity"));
                        			table_cell = new PdfPCell(new Phrase(" " + packing));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table8.addCell(table_cell);

                        			double price = rs.getDouble("totalperitem");
                        			long quant = rs.getLong("Quantity");
                        			double tax = rs.getDouble("TaxAmount");
                        			double taxperitem = tax / quant;
                        			double saletotal = rs.getDouble("SalePrice");
                        			String SalePrice = String.valueOf(saletotal);

                        			String totalWeight = String.valueOf(saletotal);
                        			table_cell = new PdfPCell(new Phrase(" " + totalWeight));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table8.addCell(table_cell);

                        			String vatAmt = String
                        					.valueOf(rs.getDouble("totalperitem"));
                        			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table8.addCell(table_cell);

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
                        			a++;}
                            		  else {
                            			  double tempTax = rs.getDouble("TaxAmount");
                            				totalTaxAmount = totalTaxAmount + tempTax; 
                            				System.out.println("totalTaxAmount -------------> "+totalTaxAmount);
                            			  expenseExtra = rs.getDouble("Discount");
                            		 // totalDiscount = Math.round((totalDiscount + expenseExtra)*100.0/100.0);
									totalDiscount = totalDiscount + expenseExtra;
                        			gsttax = gsttax + rs.getDouble("Gst");
                        			gst1 = rs.getString("Gst");
                        			double gst = rs.getDouble("Gst");
                        			double igst = rs.getDouble("TaxAmount");
                        			double totalAmtWithoutVat = 0;
                        			double total = rs.getDouble("totalperitem");

                        			gstAmt = total * gst / 100;

                        			table_cell = new PdfPCell(new Phrase(" " + a));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table9.addCell(table_cell);

                        			String itemName = rs.getString("ItemName");
                        			String barcode = rs.getString("BarcodeNo");
                        			/* String empName = rs.getString("employee_Name"); */
                        			table_cell = new PdfPCell(new Phrase(" " + itemName+"-"+barcode/* +"-"+empName */));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table9.addCell(table_cell);

                        			String hsnsac1 = rs.getString("HsnSacNo");

                        			paymentMode = rs.getString("payment_mode");

                        			String packing = String.valueOf(rs.getDouble("Quantity"));
                        			table_cell = new PdfPCell(new Phrase(" " + packing));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table9.addCell(table_cell);

                        			double price = rs.getDouble("totalperitem");
                        			long quant = rs.getLong("Quantity");
                        			double tax = rs.getDouble("TaxAmount");
                        			double taxperitem = tax / quant;
                        			double saletotal = rs.getDouble("SalePrice");
                        			String SalePrice = String.valueOf(saletotal);

                        			String totalWeight = String.valueOf(saletotal);
                        			table_cell = new PdfPCell(new Phrase(" " + totalWeight));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table9.addCell(table_cell);

                        			String vatAmt = String
                        					.valueOf(rs.getDouble("totalperitem"));
                        			table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                        			table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        			table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
                        			table9.addCell(table_cell);

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
    }
}


ResultSet rs1 = stmt.executeQuery("select ((SUM(c.totalperitem) - SUM(c.Discount)) - c.pending_bill_payment) AS paidAmt from creditcustomerbill c WHERE c.fkCrediCustId = "+custId);
//rs1.next();

while(rs1.next())
{
	paidAmount = Double.parseDouble(rs1.getString("paidAmt"));
	System.out.println("paidAMT =================> "+paidAmount);
}

if(a>1 && a<=6 )
{
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
	
	Double TaxAmount = gstAmt;
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n      GST: "+Math.round(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(0);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
	table.addCell(table_cell);	
	
	
/* table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(4);
table.addCell(table_cell);

Double TaxAmount = gstAmt;
table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
		font13));
table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table.addCell(table_cell); */

table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Dis: " + Math.round(totalDiscount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table.addCell(table_cell);

String TotalOfTotalAmtWithoutVatStr = df.format(Total);
table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.TOP);
table_cell.setColspan(2);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Paid Amt: " + Math.round(paidAmount),font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Balance Amt: " + Math.round(billPaymentPending), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT);
table_cell.setColspan(2);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
table_cell.setColspan(2);
table.addCell(table_cell);

document.add(table);

PdfPTable footerTable3 = new PdfPTable(1);
footerTable3.setWidthPercentage(100);

float[] footerColumnWidths3 = { 0.9f };
footerTable3.setWidths(footerColumnWidths3);

PdfPCell footerTable_cell3;

footerTable_cell3 = new PdfPCell(new Phrase(
		"\nThank You visit Again!! "));
footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
footerTable_cell3.setRowspan(1);
footerTable_cell3.setBorder(Rectangle.NO_BORDER);
footerTable3.addCell(footerTable_cell3);

document.add(footerTable3);
}

if(a>6 && a<=11 ){
	
	document.add(table); 
    document.add(new Paragraph("                                                                                                             Continue On Next Page..."));
   // document.add(new Paragraph("					                                   Thank You Visit Again !!!						"));
   
    document.newPage();
    document.add(new Paragraph("        "));
    document.add(new Paragraph("        "));
    document.add(new Paragraph("        "));

    table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table1.addCell(table_cell);
	
	Double TaxAmount = gstAmt;
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n      GST: "+Math.round(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(0);
	table1.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table1.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table1.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table1.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table1.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
	table1.addCell(table_cell);	
	
	
/* table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(4);
table1.addCell(table_cell);

Double TaxAmount = gstAmt;
table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
		font13));
table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table1.addCell(table_cell); */

table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Dis: " + Math.round(totalDiscount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table1.addCell(table_cell);

String TotalOfTotalAmtWithoutVatStr = df.format(Total);
table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.TOP);
table_cell.setColspan(2);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Paid Amt: " + Math.round(paidAmount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Balance Amt: " + Math.round(billPaymentPending), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT);
table_cell.setColspan(2);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table1.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
table_cell.setColspan(2);
table1.addCell(table_cell);
	
	document.add(table1); 
	
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

if(a>11 && a<=16 ){
	
	   document.add(table); 
   document.add(new Paragraph("                                                                                                              Continue On Next Page..."));
	   document.add(new Paragraph(""));
   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
  
   document.newPage();
 
	   document.add(new Paragraph("        "));
	   document.add(new Paragraph("        ")); 
	   document.add(new Paragraph("        ")); 
	document.add(new Paragraph("                                                                                   "+dtfinl));
   document.add(new Paragraph("        "));
	   document.add(new Paragraph("        ")); 
	   document.add(new Paragraph("        "));
	   document.add(table1); 
   document.add(new Paragraph("                                                                                                              Continue On Next Page..."));
	   document.add(new Paragraph(""));
   document.add(new Paragraph("					                                   Thank You Visit Again !..................						"));
  
   document.newPage();

   String empty = " ";

   table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table2.addCell(table_cell);
	
	Double TaxAmount = gstAmt;
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n      GST: "+Math.round(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(0);
	table2.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table2.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table2.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table2.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table2.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
	table2.addCell(table_cell);	
	
	
/* table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(4);
table2.addCell(table_cell);

Double TaxAmount = gstAmt;
table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,
		font13));
table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table2.addCell(table_cell); */

table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Dis: " + Math.round(totalDiscount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table2.addCell(table_cell);

String TotalOfTotalAmtWithoutVatStr = df.format(Total);
table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.TOP);
table_cell.setColspan(2);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Paid Amt: " + Math.round(paidAmount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Balance Amt: " + Math.round(billPaymentPending), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT);
table_cell.setColspan(2);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table2.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
table_cell.setColspan(2);
table2.addCell(table_cell);

	document.add(table2);

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

if(a>16 && a<=21 ){
   	
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
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n      GST: "+Math.round(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(0);
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
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table3.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table3.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("\n", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
	table3.addCell(table_cell);	
	
	
/* table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
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
table3.addCell(table_cell); */

table_cell = new PdfPCell(new Phrase("Payment Mode: "+ paymentMode, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Dis: " + Math.round(totalDiscount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.TOP);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table3.addCell(table_cell);

String TotalOfTotalAmtWithoutVatStr = df.format(Total);
table_cell = new PdfPCell(new Phrase("Gross Total: " + TotalOfTotalAmtWithoutVatStr, font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.TOP);
table_cell.setColspan(2);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Paid Amt: " + Math.round(paidAmount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
//table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Balance Amt: " + Math.round(billPaymentPending), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT);
table_cell.setColspan(2);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table3.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
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

if(a>21 && a<=26 ){
   	
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
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n      GST:" + gst1+ "% "+df.format(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(0);
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
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table4.addCell(table_cell);

	/* table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1+ "%", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(4);
	table4.addCell(table_cell);

	Double TaxAmount = gstAmt;
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + TaxAmount,font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table4.addCell(table_cell); */

	table_cell = new PdfPCell(new Phrase("Payment Mode:"+ paymentMode, font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table4.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Dis: " + df.format(totalDiscount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.TOP | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table4.addCell(table_cell);

	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
	table_cell = new PdfPCell(new Phrase("Gross Total:"
			+ TotalOfTotalAmtWithoutVatStr, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.TOP | Rectangle.BOTTOM | Rectangle.RIGHT);
	table_cell.setColspan(2);
	table4.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table4.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Paid Amt: " + df.format(paidAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table4.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Balance Amt: " + df.format(billPaymentPending), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT);
	table_cell.setColspan(2);
	table4.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table4.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table4.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
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


if(a>26 && a<=31 ){
   	
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
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n      GST:" + gst1+ "% "+df.format(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(0);
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
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table5.addCell(table_cell);

	/* table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1
			+ "%", font13));
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
	table5.addCell(table_cell); */

	table_cell = new PdfPCell(new Phrase("Payment Mode:"
			+ paymentMode, font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table5.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Dis: " + df.format(totalDiscount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.TOP | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table5.addCell(table_cell);

	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
	table_cell = new PdfPCell(new Phrase("Gross Total:"
			+ TotalOfTotalAmtWithoutVatStr, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.TOP | Rectangle.BOTTOM | Rectangle.RIGHT);
	table_cell.setColspan(2);
	table5.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table5.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Paid Amt: " + df.format(paidAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table5.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Balance Amt: " + df.format(billPaymentPending), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT);
	table_cell.setColspan(2);
	table5.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table5.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table5.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
	table_cell.setColspan(2);
	table.addCell(table_cell);

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
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n      GST:" + gst1+ "% "+df.format(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(0);
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
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table6.addCell(table_cell);

	/* table_cell = new PdfPCell(new Phrase("\n\n\n\n\nGST:" + gst1
			+ "%", font13));
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
	table6.addCell(table_cell); */

	table_cell = new PdfPCell(new Phrase("Payment Mode:"
			+ paymentMode, font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table6.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Dis: " + df.format(totalDiscount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.TOP | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table6.addCell(table_cell);

	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
	table_cell = new PdfPCell(new Phrase("Gross Total:"
			+ TotalOfTotalAmtWithoutVatStr, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.TOP | Rectangle.BOTTOM | Rectangle.RIGHT);
	table_cell.setColspan(2);
	table6.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table6.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Paid Amt: " + df.format(paidAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table6.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Balance Amt: " + df.format(billPaymentPending), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT);
	table_cell.setColspan(2);
	table6.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table6.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table6.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
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

if(a>36 && a<=41 )
{   	
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
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + df.format(totalTaxAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table7.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Payment Mode:"
			+ paymentMode, font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table7.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Dis: " + df.format(totalDiscount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table7.addCell(table_cell);

	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
	table_cell = new PdfPCell(new Phrase("Gross Total:"
			+ TotalOfTotalAmtWithoutVatStr, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setColspan(2);
	table7.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table7.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Paid Amt: " + df.format(paidAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table7.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT);
	table_cell.setColspan(2);
	table7.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table7.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table7.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Balance Amt: " + df.format(billPaymentPending), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
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
	table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + df.format(totalTaxAmount),
			font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table8.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Payment Mode:"
			+ paymentMode, font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table8.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Dis: " + df.format(totalDiscount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table8.addCell(table_cell);

	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
	table_cell = new PdfPCell(new Phrase("Gross Total:"
			+ TotalOfTotalAmtWithoutVatStr, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table_cell.setColspan(2);
	table8.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table8.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table8.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Paid Amt: " + df.format(paidAmount), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT);
	table_cell.setColspan(2);
	table8.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(2);
	table8.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(""));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.BOTTOM);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(1);
	table8.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Balance Amt: " + df.format(billPaymentPending), font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
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
table_cell = new PdfPCell(new Phrase("\n\n\n\n\n" + df.format(totalTaxAmount),
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

table_cell = new PdfPCell(new Phrase("Dis: " + df.format(totalDiscount), font13));
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

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.NO_BORDER);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table9.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Paid Amt: " + df.format(paidAmount), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.RIGHT);
table_cell.setColspan(2);
table9.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table9.addCell(table_cell);

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.BOTTOM);
table_cell.setPaddingBottom(1);
table_cell.setColspan(1);
table9.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Balance Amt: " + df.format(billPaymentPending), font13));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
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

table_cell = new PdfPCell(new Phrase(""));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table.addCell(table_cell);

document.add(footerTable3);
}

rs.close();
stmt.close();
conn.close(); 
// step 5

document.close();


} catch (DocumentException de) {
throw new IOException(de.getMessage());
}
    
    %>
