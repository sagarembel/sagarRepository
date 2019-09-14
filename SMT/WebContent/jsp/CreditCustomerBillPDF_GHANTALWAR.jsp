<%@page import="com.smt.bean.ClientDetails"%>
<%@page import="java.io.ByteArrayOutputStream"%>
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

<%@page import="javax.activation.DataSource"%>
<%@page import="javax.mail.util.ByteArrayDataSource"%>
<%@page import="javax.activation.DataHandler"%>
<%@page import="javax.activation.FileDataSource"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>
<%@page import="javax.mail.Address"%>
<%@page import="com.sun.mail.smtp.SMTPTransport"%>
<%@page import="javax.mail.URLName"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.Transport"%>
<%@page import="java.awt.*"%>

<%
response.setContentType("application/pdf");
Long billno = (Long) session.getAttribute("BillNo2");
String creditCustomerName = (String) session
		.getAttribute("creditCustomerName");
String gstTinNo = (String) session.getAttribute("gstTinNo");
Double paidAmt = (Double) session.getAttribute("paidAmt");

System.out
		.print(":::::::::::::::::::::::::::::::::::::::::BillNO:-"
				+ billno + "::::::::::::::::::::::::::::");
System.out
		.print(":::::::::::::::::::::::::::::::::::::::::creditCustomerName:-"
				+ creditCustomerName
				+ "::::::::::::::::::::::::::::");
System.out
		.print(":::::::::::::::::::::::::::::::::::::::::Paid Amt"
				+ paidAmt + "::::::::::::::::::::::::::::");

double expenseExtra = 0;
double totalAmount = 0;
double vatAmount = 0;
double interGstAmount = 0;
int itemCount = 0;
String totAmountStr = "";
String vatAmountStr = "";
String extraExpence = "";
double totalBags = 0;
double packingOfBag = 0;
String allItemNames = "";
String AllInOne = "";
String discount = "";
double TotalOfTotalAmtWithoutVat = 0;
double TotalOfTotalAmtWithoutVat1 = 0;
double half = 2;
double gsttax = 0;
double GrandTotal = 0.0;
double Total = 0.0;
double TotalTax = 0.0;
double stateTaxTotal = 0.0;
int a = 1;
Double Balance = 0.0;
Double totalDiscount = 0.0;
Double totalTaxAmount = 0.0;

try {
	Connection conn = null;
	Connection conn1 = null;
	// step 1
	Document document = new Document(PageSize.A6, 20f,20f, 0f, 10f);

	// step 2
	PdfWriter.getInstance(document, response.getOutputStream());
	ByteArrayOutputStream baos = new ByteArrayOutputStream();
    PdfWriter.getInstance(document, baos);
    
	// step 3
	document.open();

	Class.forName("com.mysql.jdbc.Driver");
	conn = DriverManager.getConnection(
			"jdbc:mysql://localhost:3306/fabric", "root", "root");
	Statement stmt = conn.createStatement();

	ResultSet rs = stmt.executeQuery("select c.ItemName, c.Quantity, c.SalePrice, c.Discount, c.TotalAmount, c.GrossTotal, c.Date, c.totalperitem, c.Gst, c.Igst, c.TaxAmount, c.HsnSacNo , s.contact_no, s.first_name,c.pending_bill_payment, perProductdisPer, taxAmtAfterDiscount from creditcustomerbill c left join customer_details s ON c.fkCrediCustId=s.pk_customer_id where c.BillNo = "+billno);

	System.out.println("Query Execute");
	Date d1 = new Date();
	SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
	SimpleDateFormat sdf1 = new SimpleDateFormat("E");
	SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
	sdf2.setTimeZone(TimeZone.getTimeZone("IST"));

	Date billDate = new Date();
	SimpleDateFormat dateFormater = new SimpleDateFormat(
			"dd-MM-yyyy");
	String StrBillDate = dateFormater.format(billDate);

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

	rs.next();

	PdfPTable headertable21 = new PdfPTable(2);
	headertable21.setWidthPercentage(100);

	float[] HeadercolumnWidths21 = { 0.9f, 0.5f };
	headertable21.setWidths(HeadercolumnWidths21);

	PdfPCell headerTable_cell21;
	
	headerTable_cell21 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n"));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	headerTable_cell21 = new PdfPCell(new Phrase("\n\n\n\n\n\n\n"));
	//headerTable_cell21.setRowspan(8);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);

	headerTable_cell21 = new PdfPCell(new Phrase(""+billno, font12Bold));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_RIGHT);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	headerTable_cell21 = new PdfPCell(new Phrase(rs.getString("Date"), font12Bold));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_RIGHT);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	headerTable_cell21 = new PdfPCell(new Phrase(""+ creditCustomerName,font12Bold));
	//headerTable_cell21.setRowspan(8);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_CENTER);
	headertable21.addCell(headerTable_cell21);
	
	headerTable_cell21 = new PdfPCell(new Phrase(""));
	headerTable_cell21.setRowspan(8);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	

	document.add(headertable21);

		//end informatin

		//table for particulars
		PdfPTable table = new PdfPTable(5);
		 table.setSpacingBefore(5);
		table.setWidthPercentage(100);
		table.setSpacingAfter(5);

		float[] columnWidths = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table.setWidths(columnWidths);
		
		PdfPTable table1 = new PdfPTable(5);
		 table1.setSpacingBefore(5);
		table1.setWidthPercentage(100);
		table1.setSpacingAfter(5);

		float[] columnWidths1 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table1.setWidths(columnWidths1);
		
		PdfPTable table2 = new PdfPTable(5);
		 table2.setSpacingBefore(5);
		table2.setWidthPercentage(100);
		table2.setSpacingAfter(5);

		float[] columnWidths2 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table2.setWidths(columnWidths2);
		
		PdfPTable table3 = new PdfPTable(5);
		 table3.setSpacingBefore(5);
		table3.setWidthPercentage(100);
		table3.setSpacingAfter(5);

		float[] columnWidths3 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table3.setWidths(columnWidths3);
		
		PdfPTable table4 = new PdfPTable(5);
		 table4.setSpacingBefore(5);
		table4.setWidthPercentage(100);
		table4.setSpacingAfter(5);

		float[] columnWidths4 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table4.setWidths(columnWidths4);
		
		PdfPTable table5 = new PdfPTable(5);
		 table5.setSpacingBefore(5);
		table5.setWidthPercentage(100);
		table5.setSpacingAfter(5);

		float[] columnWidths5 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table5.setWidths(columnWidths5);
		
		PdfPTable table6 = new PdfPTable(5);
		 table6.setSpacingBefore(5);
		table6.setWidthPercentage(100);
		table6.setSpacingAfter(5);

		float[] columnWidths6 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table6.setWidths(columnWidths6);
		
		PdfPTable table7 = new PdfPTable(5);
		 table7.setSpacingBefore(5);
		table7.setWidthPercentage(100);
		table7.setSpacingAfter(5);

		float[] columnWidths7 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table7.setWidths(columnWidths7);
		
		PdfPTable table8 = new PdfPTable(5);
		 table8.setSpacingBefore(5);
		table8.setWidthPercentage(100);
		table8.setSpacingAfter(5);

		float[] columnWidths8 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table8.setWidths(columnWidths8);
		
		PdfPTable table9 = new PdfPTable(5);
		 table9.setSpacingBefore(5);
		table9.setWidthPercentage(100);
		table9.setSpacingAfter(5);

		float[] columnWidths9 = { 0.2f, 0.4f, 0.2f, 0.3f, 0.3f };
		table9.setWidths(columnWidths9);
		
		PdfPCell table_cell;
		rs.beforeFirst();
    
	     
		PdfPCell cell1 = new PdfPCell(new Paragraph(""));
		PdfPCell cell2 = new PdfPCell(new Paragraph(""));
	    PdfPCell cell3 = new PdfPCell(new Paragraph(""));
	    PdfPCell cell4 = new PdfPCell(new Paragraph(""));
	    PdfPCell cell5 = new PdfPCell(new Paragraph(""));  
	    
	   
	   	table.addCell(cell1);
	    table.addCell(cell2);
	 	table.addCell(cell3);
	    table.addCell(cell4); 
	    table.addCell(cell5); 
	    
	 	table1.addCell(cell1);
	    table1.addCell(cell2);
	    table1.addCell(cell3);
	    table1.addCell(cell4);
	    table1.addCell(cell5);
	   

	    table2.addCell(cell1);
	    table2.addCell(cell2);
	    table2.addCell(cell3);
	    table2.addCell(cell4); 
	    table2.addCell(cell5);
	    
		
	    table3.addCell(cell1);
	    table3.addCell(cell2);
	    table3.addCell(cell3);
	    table3.addCell(cell4); 
	    table3.addCell(cell5);
	    
	    
	    table4.addCell(cell1);
	    table4.addCell(cell2);
	    table4.addCell(cell3);
	    table4.addCell(cell4); 
	    table4.addCell(cell5);
	    
	    
	    table5.addCell(cell1);
	    table5.addCell(cell2);
	    table5.addCell(cell3);
	    table5.addCell(cell4); 
	    table5.addCell(cell5);
	    
	    
	    table6.addCell(cell1);
	    table6.addCell(cell2);
	    table6.addCell(cell3);
	    table6.addCell(cell4); 
	    table6.addCell(cell5);
	   
	    
	    table7.addCell(cell1);
	    table7.addCell(cell2);
	    table7.addCell(cell3);
	    table7.addCell(cell4); 
	    table7.addCell(cell5);
	  
	    
	    table8.addCell(cell1);
	    table8.addCell(cell2);
	    table8.addCell(cell3);
	    table8.addCell(cell4); 
	    table8.addCell(cell5);
	  
	    
	    table9.addCell(cell1);
	    table9.addCell(cell2);
	    table9.addCell(cell3);
	    table9.addCell(cell4); 
	    table9.addCell(cell5);
   
    while(rs.next()){
    	if (a<6)
    	{
    		
    		double tempTax = rs.getDouble("TaxAmount");
    		totalTaxAmount = totalTaxAmount + tempTax; 
    		System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
    		
    		expenseExtra = rs.getDouble("Discount");
		totalDiscount = totalDiscount + expenseExtra;

		gsttax = gsttax + rs.getDouble("Gst");

		Balance = rs.getDouble("pending_bill_payment");

		double gst = rs.getDouble("Gst");
		double igst = rs.getDouble("TaxAmount");
		
		double totalAmtWithoutVat = 0;
		double total = rs.getDouble("totalperitem");

		double taxAmt = rs.getDouble("TaxAmount");
		double taxAmtAfterDis = rs.getDouble("TaxAmount");
		double gstAmt = 0;
		if(rs.getDouble("perProductdisPer") > 0)
		{
			gstAmt = taxAmtAfterDis;
		}
		else
		{
			gstAmt = taxAmt;
		}
	
		table_cell = new PdfPCell(new Phrase(" " + a));
		table_cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(table_cell);

		String itemName = rs.getString("ItemName");
		table_cell = new PdfPCell(new Phrase(" " + itemName));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(table_cell);

		String hsnsac1 = rs.getString("HsnSacNo");

		String packing = String.valueOf(rs.getDouble("Quantity"));
		table_cell = new PdfPCell(new Phrase("" + packing));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(table_cell);

		String totalWeight = String.valueOf(rs
				.getDouble("SalePrice"));
		table_cell = new PdfPCell(new Phrase("" + totalWeight));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(table_cell);

		/* table_cell = new PdfPCell(new Phrase("" + gst));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(table_cell); 

		String TaxAmount = String.valueOf(rs.getDouble("TaxAmount"));

		table_cell = new PdfPCell(new Phrase(df.format(gstAmt)));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(table_cell);
		*/

		String vatAmt = String
				.valueOf(rs.getDouble("totalperitem"));
		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setBorder(Rectangle.NO_BORDER);
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
    		   if(a<11){
    			   
    			   double tempTax = rs.getDouble("TaxAmount");
    	    		totalTaxAmount = totalTaxAmount + tempTax; 
    	    		System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
    			   
    	    		expenseExtra = rs.getDouble("Discount");
    	    		totalDiscount = totalDiscount + expenseExtra;

    	    		gsttax = gsttax + rs.getDouble("Gst");

    	    		Balance = rs.getDouble("pending_bill_payment");

    	    		double gst = rs.getDouble("Gst");
    	    		double igst = rs.getDouble("TaxAmount");
    	    		double totalAmtWithoutVat = 0;
    	    		double total = rs.getDouble("totalperitem");

    	    		double taxAmt = rs.getDouble("TaxAmount");
    	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
    	    		double gstAmt = 0;
    	    		if(rs.getDouble("perProductdisPer") > 0)
    	    		{
    	    			gstAmt = taxAmtAfterDis;
    	    		}
    	    		else
    	    		{
    	    			gstAmt = taxAmt;
    	    		}
    	    		
    	    		table_cell = new PdfPCell(new Phrase(" " + a));
    	    		table_cell.setBorder(Rectangle.NO_BORDER);
    	    		table1.addCell(table_cell);

    	    		String itemName = rs.getString("ItemName");
    	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
    	    		table_cell.setBorder(Rectangle.NO_BORDER);
    	    		table1.addCell(table_cell);

    	    		String hsnsac1 = rs.getString("HsnSacNo");

    	    		String packing = String.valueOf(rs.getDouble("Quantity"));
    	    		table_cell = new PdfPCell(new Phrase("" + packing));
    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
    	    		table_cell.setBorder(Rectangle.NO_BORDER);
    	    		table1.addCell(table_cell);

    	    		String totalWeight = String.valueOf(rs
    	    				.getDouble("SalePrice"));
    	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
    	    		table_cell.setBorder(Rectangle.NO_BORDER);
    	    		table1.addCell(table_cell);

    	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
    	    		table_cell.setBorder(Rectangle.NO_BORDER);
    	    		table1.addCell(table_cell);

    	    		String TaxAmount = String.valueOf(rs.getDouble("TaxAmount"));
    	    		
    	    		table_cell = new PdfPCell(new Phrase(df.format(gstAmt)));
    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
    	    		table_cell.setBorder(Rectangle.NO_BORDER);
    	    		table1.addCell(table_cell);
    	    		*/

    	    		String vatAmt = String.valueOf(rs.getDouble("totalperitem"));
    	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
    	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
        		  if(a<16){
        			  
        			  double tempTax = rs.getDouble("TaxAmount");
        	    		totalTaxAmount = totalTaxAmount + tempTax; 
        	    		System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
        	    		
        	    		expenseExtra = rs.getDouble("Discount");
        	    		totalDiscount = totalDiscount + expenseExtra;

        	    		gsttax = gsttax + rs.getDouble("Gst");

        	    		Balance = rs.getDouble("pending_bill_payment");

        	    		double gst = rs.getDouble("Gst");
        	    		double igst = rs.getDouble("TaxAmount");
        	    		double totalAmtWithoutVat = 0;
        	    		double total = rs.getDouble("totalperitem");

        	    		double taxAmt = rs.getDouble("TaxAmount");
        	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
        	    		double gstAmt = 0;
        	    		if(rs.getDouble("perProductdisPer") > 0)
        	    		{
        	    			gstAmt = taxAmtAfterDis;
        	    		}
        	    		else
        	    		{
        	    			gstAmt = taxAmt;
        	    		}
        	    		
        	    		table_cell = new PdfPCell(new Phrase(" " + a));
        	    		table_cell.setBorder(Rectangle.NO_BORDER);
        	    		table2.addCell(table_cell);

        	    		String itemName = rs.getString("ItemName");
        	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	    		table_cell.setBorder(Rectangle.NO_BORDER);
        	    		table2.addCell(table_cell);

        	    		String hsnsac1 = rs.getString("HsnSacNo");

        	    		String packing = String.valueOf(rs.getDouble("Quantity"));
        	    		table_cell = new PdfPCell(new Phrase("" + packing));
        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	    		table_cell.setBorder(Rectangle.NO_BORDER);
        	    		table2.addCell(table_cell);

        	    		String totalWeight = String.valueOf(rs
        	    				.getDouble("SalePrice"));
        	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	    		table_cell.setBorder(Rectangle.NO_BORDER);
        	    		table2.addCell(table_cell);

        	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	    		table_cell.setBorder(Rectangle.NO_BORDER);
        	    		table2.addCell(table_cell); 
        	    		
        	    		String TaxAmount = String
        	    				.valueOf(rs.getDouble("TaxAmount"));

        	    		table_cell = new PdfPCell(
        	    				new Phrase(df.format(gstAmt)));
        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	    		table_cell.setBorder(Rectangle.NO_BORDER);
        	    		table2.addCell(table_cell);*/

        	    		String vatAmt = String
        	    				.valueOf(rs.getDouble("totalperitem"));
        	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
            	    		totalDiscount = totalDiscount + expenseExtra;

            	    		gsttax = gsttax + rs.getDouble("Gst");

            	    		Balance = rs.getDouble("pending_bill_payment");

            	    		double gst = rs.getDouble("Gst");
            	    		double igst = rs.getDouble("TaxAmount");
            	    		double totalAmtWithoutVat = 0;
            	    		double total = rs.getDouble("totalperitem");

            	    		double taxAmt = rs.getDouble("TaxAmount");
            	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
            	    		double gstAmt = 0;
            	    		if(rs.getDouble("perProductdisPer") > 0)
            	    		{
            	    			gstAmt = taxAmtAfterDis;
            	    		}
            	    		else
            	    		{
            	    			gstAmt = taxAmt;
            	    		}
            	    		
            	    		table_cell = new PdfPCell(new Phrase(" " + a));
            	    		table_cell.setBorder(Rectangle.NO_BORDER);
            	    		table3.addCell(table_cell);

            	    		String itemName = rs.getString("ItemName");
            	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            	    		table_cell.setBorder(Rectangle.NO_BORDER);
            	    		table3.addCell(table_cell);

            	    		String hsnsac1 = rs.getString("HsnSacNo");

            	    		String packing = String.valueOf(rs.getDouble("Quantity"));
            	    		table_cell = new PdfPCell(new Phrase("" + packing));
            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            	    		table_cell.setBorder(Rectangle.NO_BORDER);
            	    		table3.addCell(table_cell);

            	    		String totalWeight = String.valueOf(rs
            	    				.getDouble("SalePrice"));
            	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            	    		table_cell.setBorder(Rectangle.NO_BORDER);
            	    		table3.addCell(table_cell);

            	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            	    		table_cell.setBorder(Rectangle.NO_BORDER);
            	    		table3.addCell(table_cell); 

            	    		String TaxAmount = String
            	    				.valueOf(rs.getDouble("TaxAmount"));

            	    		table_cell = new PdfPCell(
            	    				new Phrase(df.format(gstAmt)));
            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            	    		table_cell.setBorder(Rectangle.NO_BORDER);
            	    		table3.addCell(table_cell);*/

            	    		String vatAmt = String
            	    				.valueOf(rs.getDouble("totalperitem"));
            	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
                		  if(a<26){
                			  
                			  double tempTax = rs.getDouble("TaxAmount");
                	    		totalTaxAmount = totalTaxAmount + tempTax; 
                	    		System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
                			  
                	    		expenseExtra = rs.getDouble("Discount");
                	    		totalDiscount = totalDiscount + expenseExtra;

                	    		gsttax = gsttax + rs.getDouble("Gst");

                	    		Balance = rs.getDouble("pending_bill_payment");

                	    		double gst = rs.getDouble("Gst");
                	    		double igst = rs.getDouble("TaxAmount");
                	    		double totalAmtWithoutVat = 0;
                	    		double total = rs.getDouble("totalperitem");

                	    		double taxAmt = rs.getDouble("TaxAmount");
                	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
                	    		double gstAmt = 0;
                	    		if(rs.getDouble("perProductdisPer") > 0)
                	    		{
                	    			gstAmt = taxAmtAfterDis;
                	    		}
                	    		else
                	    		{
                	    			gstAmt = taxAmt;
                	    		}
                	    		
                	    		table_cell = new PdfPCell(new Phrase(" " + a));
                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                	    		table4.addCell(table_cell);

                	    		String itemName = rs.getString("ItemName");
                	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                	    		table4.addCell(table_cell);

                	    		String hsnsac1 = rs.getString("HsnSacNo");

                	    		String packing = String.valueOf(rs.getDouble("Quantity"));
                	    		table_cell = new PdfPCell(new Phrase("" + packing));
                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                	    		table4.addCell(table_cell);

                	    		String totalWeight = String.valueOf(rs
                	    				.getDouble("SalePrice"));
                	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                	    		table4.addCell(table_cell);

                	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                	    		table4.addCell(table_cell); 

                	    		String TaxAmount = String
                	    				.valueOf(rs.getDouble("TaxAmount"));

                	    		table_cell = new PdfPCell(
                	    				new Phrase(df.format(gstAmt)));
                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                	    		table4.addCell(table_cell);*/

                	    		String vatAmt = String
                	    				.valueOf(rs.getDouble("totalperitem"));
                	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
                    		  if(a<31){
                    			  
                    			  double tempTax = rs.getDouble("TaxAmount");
                    	    		totalTaxAmount = totalTaxAmount + tempTax; 
                    	    		System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
                    			  
                    	    		expenseExtra = rs.getDouble("Discount");
                    	    		totalDiscount = totalDiscount + expenseExtra;

                    	    		gsttax = gsttax + rs.getDouble("Gst");

                    	    		Balance = rs.getDouble("pending_bill_payment");

                    	    		double gst = rs.getDouble("Gst");
                    	    		double igst = rs.getDouble("TaxAmount");
                    	    		double totalAmtWithoutVat = 0;
                    	    		double total = rs.getDouble("totalperitem");

                    	    		double taxAmt = rs.getDouble("TaxAmount");
                    	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
                    	    		double gstAmt = 0;
                    	    		if(rs.getDouble("perProductdisPer") > 0)
                    	    		{
                    	    			gstAmt = taxAmtAfterDis;
                    	    		}
                    	    		else
                    	    		{
                    	    			gstAmt = taxAmt;
                    	    		}
                    	    		
                    	    		table_cell = new PdfPCell(new Phrase(" " + a));
                    	    		table_cell.setBorder(Rectangle.NO_BORDER);
                    	    		table5.addCell(table_cell);

                    	    		String itemName = rs.getString("ItemName");
                    	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
                    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    	    		table_cell.setBorder(Rectangle.NO_BORDER);
                    	    		table5.addCell(table_cell);

                    	    		String hsnsac1 = rs.getString("HsnSacNo");

                    	    		String packing = String.valueOf(rs.getDouble("Quantity"));
                    	    		table_cell = new PdfPCell(new Phrase("" + packing));
                    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    	    		table_cell.setBorder(Rectangle.NO_BORDER);
                    	    		table5.addCell(table_cell);

                    	    		String totalWeight = String.valueOf(rs
                    	    				.getDouble("SalePrice"));
                    	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
                    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    	    		table_cell.setBorder(Rectangle.NO_BORDER);
                    	    		table5.addCell(table_cell);

                    	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
                    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    	    		table_cell.setBorder(Rectangle.NO_BORDER);
                    	    		table5.addCell(table_cell); 

                    	    		String TaxAmount = String
                    	    				.valueOf(rs.getDouble("TaxAmount"));

                    	    		table_cell = new PdfPCell(
                    	    				new Phrase(df.format(gstAmt)));
                    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    	    		table_cell.setBorder(Rectangle.NO_BORDER);
                    	    		table5.addCell(table_cell);*/

                    	    		String vatAmt = String
                    	    				.valueOf(rs.getDouble("totalperitem"));
                    	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                    	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
                        	    		totalDiscount = totalDiscount + expenseExtra;

                        	    		gsttax = gsttax + rs.getDouble("Gst");

                        	    		Balance = rs.getDouble("pending_bill_payment");

                        	    		double gst = rs.getDouble("Gst");
                        	    		double igst = rs.getDouble("TaxAmount");
                        	    		double totalAmtWithoutVat = 0;
                        	    		double total = rs.getDouble("totalperitem");

                        	    		double taxAmt = rs.getDouble("TaxAmount");
                        	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
                        	    		double gstAmt = 0;
                        	    		if(rs.getDouble("perProductdisPer") > 0)
                        	    		{
                        	    			gstAmt = taxAmtAfterDis;
                        	    		}
                        	    		else
                        	    		{
                        	    			gstAmt = taxAmt;
                        	    		}
                        	    		
                        	    		table_cell = new PdfPCell(new Phrase(" " + a));
                        	    		table_cell.setBorder(Rectangle.NO_BORDER);
                        	    		table6.addCell(table_cell);

                        	    		String itemName = rs.getString("ItemName");
                        	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
                        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        	    		table_cell.setBorder(Rectangle.NO_BORDER);
                        	    		table6.addCell(table_cell);

                        	    		String hsnsac1 = rs.getString("HsnSacNo");

                        	    		String packing = String.valueOf(rs.getDouble("Quantity"));
                        	    		table_cell = new PdfPCell(new Phrase("" + packing));
                        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        	    		table_cell.setBorder(Rectangle.NO_BORDER);
                        	    		table6.addCell(table_cell);

                        	    		String totalWeight = String.valueOf(rs
                        	    				.getDouble("SalePrice"));
                        	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
                        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        	    		table_cell.setBorder(Rectangle.NO_BORDER);
                        	    		table6.addCell(table_cell);

                        	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
                        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        	    		table_cell.setBorder(Rectangle.NO_BORDER);
                        	    		table6.addCell(table_cell); 

                        	    		String TaxAmount = String
                        	    				.valueOf(rs.getDouble("TaxAmount"));

                        	    		table_cell = new PdfPCell(
                        	    				new Phrase(df.format(gstAmt)));
                        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        	    		table_cell.setBorder(Rectangle.NO_BORDER);
                        	    		table6.addCell(table_cell);*/

                        	    		String vatAmt = String
                        	    				.valueOf(rs.getDouble("totalperitem"));
                        	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                        	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                        	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
                            		  if(a<41){
                            			  
                            			  double tempTax = rs.getDouble("TaxAmount");
                            	    		totalTaxAmount = totalTaxAmount + tempTax; 
                            	    		System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
                            			  
                            	    		expenseExtra = rs.getDouble("Discount");
                            	    		totalDiscount = totalDiscount + expenseExtra;

                            	    		gsttax = gsttax + rs.getDouble("Gst");

                            	    		Balance = rs.getDouble("pending_bill_payment");

                            	    		double gst = rs.getDouble("Gst");
                            	    		double igst = rs.getDouble("TaxAmount");
                            	    		double totalAmtWithoutVat = 0;
                            	    		double total = rs.getDouble("totalperitem");

                            	    		double taxAmt = rs.getDouble("TaxAmount");
                            	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
                            	    		double gstAmt = 0;
                            	    		if(rs.getDouble("perProductdisPer") > 0)
                            	    		{
                            	    			gstAmt = taxAmtAfterDis;
                            	    		}
                            	    		else
                            	    		{
                            	    			gstAmt = taxAmt;
                            	    		}
                            	    		
                            	    		table_cell = new PdfPCell(new Phrase(" " + a));
                            	    		table_cell.setBorder(Rectangle.NO_BORDER);
                            	    		table7.addCell(table_cell);

                            	    		String itemName = rs.getString("ItemName");
                            	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
                            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                            	    		table_cell.setBorder(Rectangle.NO_BORDER);
                            	    		table7.addCell(table_cell);

                            	    		String hsnsac1 = rs.getString("HsnSacNo");

                            	    		String packing = String.valueOf(rs.getDouble("Quantity"));
                            	    		table_cell = new PdfPCell(new Phrase("" + packing));
                            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                            	    		table_cell.setBorder(Rectangle.NO_BORDER);
                            	    		table7.addCell(table_cell);

                            	    		String totalWeight = String.valueOf(rs
                            	    				.getDouble("SalePrice"));
                            	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
                            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                            	    		table_cell.setBorder(Rectangle.NO_BORDER);
                            	    		table7.addCell(table_cell);

                            	    		table_cell = new PdfPCell(new Phrase("" + gst));
                            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                            	    		table_cell.setBorder(Rectangle.NO_BORDER);
                            	    		table7.addCell(table_cell);

                            	    		String TaxAmount = String
                            	    				.valueOf(rs.getDouble("TaxAmount"));

                            	    		/* table_cell = new PdfPCell(
                            	    				new Phrase(df.format(gstAmt)));
                            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                            	    		table_cell.setBorder(Rectangle.NO_BORDER);
                            	    		table7.addCell(table_cell); 

                            	    		String vatAmt = String
                            	    				.valueOf(rs.getDouble("totalperitem"));
                            	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                            	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                            	    		table_cell.setBorder(Rectangle.NO_BORDER);
                            	    		table7.addCell(table_cell);*/

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
                                	    		totalDiscount = totalDiscount + expenseExtra;

                                	    		gsttax = gsttax + rs.getDouble("Gst");

                                	    		Balance = rs.getDouble("pending_bill_payment");

                                	    		double gst = rs.getDouble("Gst");
                                	    		double igst = rs.getDouble("TaxAmount");
                                	    		double totalAmtWithoutVat = 0;
                                	    		double total = rs.getDouble("totalperitem");

                                	    		double taxAmt = rs.getDouble("TaxAmount");
                                	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
                                	    		double gstAmt = 0;
                                	    		if(rs.getDouble("perProductdisPer") > 0)
                                	    		{
                                	    			gstAmt = taxAmtAfterDis;
                                	    		}
                                	    		else
                                	    		{
                                	    			gstAmt = taxAmt;
                                	    		}
                                	    		
                                	    		table_cell = new PdfPCell(new Phrase(" " + a));
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table8.addCell(table_cell);

                                	    		String itemName = rs.getString("ItemName");
                                	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table8.addCell(table_cell);

                                	    		String hsnsac1 = rs.getString("HsnSacNo");

                                	    		String packing = String.valueOf(rs.getDouble("Quantity"));
                                	    		table_cell = new PdfPCell(new Phrase("" + packing));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table8.addCell(table_cell);

                                	    		String totalWeight = String.valueOf(rs
                                	    				.getDouble("SalePrice"));
                                	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table8.addCell(table_cell);

                                	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table8.addCell(table_cell); 

                                	    		String TaxAmount = String
                                	    				.valueOf(rs.getDouble("TaxAmount"));

                                	    		table_cell = new PdfPCell(
                                	    				new Phrase(df.format(gstAmt)));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table8.addCell(table_cell);*/

                                	    		String vatAmt = String
                                	    				.valueOf(rs.getDouble("totalperitem"));
                                	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
                                	    		a=a+1;
                                	    		}
                                		  else {
                                			  
                                			  double tempTax = rs.getDouble("TaxAmount");
                                	    		totalTaxAmount = totalTaxAmount + tempTax; 
                                	    		System.out.println("totalTaxAmount -------------> "+totalTaxAmount);	
                                			  
                                	    		expenseExtra = rs.getDouble("Discount");
                                	    		totalDiscount = totalDiscount + expenseExtra;

                                	    		gsttax = gsttax + rs.getDouble("Gst");

                                	    		Balance = rs.getDouble("pending_bill_payment");

                                	    		double gst = rs.getDouble("Gst");
                                	    		double igst = rs.getDouble("TaxAmount");
                                	    		double totalAmtWithoutVat = 0;
                                	    		double total = rs.getDouble("totalperitem");

                                	    		double taxAmt = rs.getDouble("TaxAmount");
                                	    		double taxAmtAfterDis = rs.getDouble("TaxAmount");
                                	    		double gstAmt = 0;
                                	    		if(rs.getDouble("perProductdisPer") > 0)
                                	    		{
                                	    			gstAmt = taxAmtAfterDis;
                                	    		}
                                	    		else
                                	    		{
                                	    			gstAmt = taxAmt;
                                	    		}
                                	    		
                                	    		table_cell = new PdfPCell(new Phrase(" " + a));
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table9.addCell(table_cell);

                                	    		String itemName = rs.getString("ItemName");
                                	    		table_cell = new PdfPCell(new Phrase(" " + itemName));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table9.addCell(table_cell);

                                	    		String hsnsac1 = rs.getString("HsnSacNo");

                                	    		String packing = String.valueOf(rs.getDouble("Quantity"));
                                	    		table_cell = new PdfPCell(new Phrase("" + packing));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table9.addCell(table_cell);

                                	    		String totalWeight = String.valueOf(rs
                                	    				.getDouble("SalePrice"));
                                	    		table_cell = new PdfPCell(new Phrase("" + totalWeight));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table9.addCell(table_cell);

                                	    		/* table_cell = new PdfPCell(new Phrase("" + gst));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table9.addCell(table_cell); 

                                	    		String TaxAmount = String
                                	    				.valueOf(rs.getDouble("TaxAmount"));

                                	    		table_cell = new PdfPCell(
                                	    				new Phrase(df.format(gstAmt)));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
                                	    		table9.addCell(table_cell);*/

                                	    		String vatAmt = String
                                	    				.valueOf(rs.getDouble("totalperitem"));
                                	    		table_cell = new PdfPCell(new Phrase(" " + vatAmt));
                                	    		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                                	    		table_cell.setBorder(Rectangle.NO_BORDER);
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
       
    if(a>1 && a<=6 )
    {    	
    	 table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\nDiscount:"+df.format(totalDiscount)+" Paid Amount: "+df.format(paidAmt), Normalfont12));
 		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
 		table_cell.setBorder(Rectangle.NO_BORDER);
    	table_cell.setColspan(5);
 		table.addCell(table_cell);
 		
 		
    	
    	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
    	table_cell = new PdfPCell(new Phrase("GST: "+df.format(totalTaxAmount)+" Total: "+(TotalOfTotalAmtWithoutVatStr), Normalfont12));
    	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
    	table_cell.setBorder(Rectangle.NO_BORDER);
    	table_cell.setColspan(5);
    	table.addCell(table_cell);
    	

    	document.add(table);

    	PdfPTable footerTable3 = new PdfPTable(1);
    	footerTable3.setWidthPercentage(100);

    	float[] footerColumnWidths3 = { 0.9f };
    	footerTable3.setWidths(footerColumnWidths3);

    	PdfPCell footerTable_cell3;

    	footerTable_cell3 = new PdfPCell(new Phrase(""));
    	footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
    	/* footerTable_cell3.setRowspan(1); */
    	footerTable_cell3.setBorder(Rectangle.NO_BORDER);
    	footerTable3.addCell(footerTable_cell3);

    	document.add(footerTable3);
    }
    
   if(a>6 && a<=11 )
   {    	
    	document.add(table); 
        document.add(new Paragraph(""));
        document.add(new Paragraph(""));
       
        document.newPage();
        document.add(new Paragraph("        "));
        document.add(new Paragraph("        "));
        document.add(new Paragraph("        "));

        table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\nDiscount:"+df.format(totalDiscount)+" Paid Amount: "+paidAmt, Normalfont12));
 		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
 		table_cell.setBorder(Rectangle.NO_BORDER);
    	table_cell.setColspan(5);
    	table1.addCell(table_cell);
 		
 		
    	
    	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
    	table_cell = new PdfPCell(new Phrase("GST: "+totalTaxAmount+" Total: "+TotalOfTotalAmtWithoutVatStr, Normalfont12));
    	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
    	table_cell.setBorder(Rectangle.NO_BORDER);
    	table_cell.setColspan(5);
    	table1.addCell(table_cell);
    	
		document.add(table1);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
       
    	
    }
   
   if(a>11 && a<=16 ){
   	
   	   document.add(table); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
     
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	document.add(new Paragraph(""));
       document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(table1); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   
       String empty = " ";

    table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\nDiscount:"+df.format(totalDiscount)+" Paid Amount: "+paidAmt, Normalfont12));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.NO_BORDER);
   	table_cell.setColspan(5);
   	table2.addCell(table_cell);
		
		
   	
   	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
   	table_cell = new PdfPCell(new Phrase("GST: "+totalTaxAmount+" Total: "+TotalOfTotalAmtWithoutVatStr, Normalfont12));
   	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
   	table_cell.setBorder(Rectangle.NO_BORDER);
   	table_cell.setColspan(5);
   	table2.addCell(table_cell);
		
   	document.add(table2);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
      
   }
   
   if(a>16 && a<=21 ){
	   	
   	   document.add(table); 
       document.add(new Paragraph("  "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(table1); 
       document.add(new Paragraph("  "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   	 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
   	   document.add(table2); 
       document.add(new Paragraph("   "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
    	  
      	document.add(new Paragraph("        "));
      	document.add(new Paragraph("        ")); 
      	document.add(new Paragraph("        "));  
      
       String empty = " ";

       table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\nDiscount:"+df.format(totalDiscount)+" Paid Amount: "+paidAmt, Normalfont12));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
  	table_cell.setColspan(5);
  	table3.addCell(table_cell);
		
		
  	
  	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
  	table_cell = new PdfPCell(new Phrase("GST: "+totalTaxAmount+" Total: "+TotalOfTotalAmtWithoutVatStr, Normalfont12));
  	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
  	table_cell.setBorder(Rectangle.NO_BORDER);
  	table_cell.setColspan(5);
  	table3.addCell(table_cell);

		document.add(table3);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
      
   }
    
   if(a>21 && a<=26 ){
	   	
   	   document.add(table); 
       document.add(new Paragraph("  "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(table1); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   	 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
   	   document.add(table2); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table3); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
    	  
      	document.add(new Paragraph("        "));
      	document.add(new Paragraph("        ")); 
      	document.add(new Paragraph("        "));  
      
       String empty = " ";

       table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\nDiscount:"+df.format(totalDiscount)+" Paid Amount: "+paidAmt, Normalfont12));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
 	table_cell.setColspan(5);
 	table4.addCell(table_cell);
		
		
 	
 	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
 	table_cell = new PdfPCell(new Phrase("GST: "+totalTaxAmount+" Total: "+TotalOfTotalAmtWithoutVatStr, Normalfont12));
 	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
 	table_cell.setBorder(Rectangle.NO_BORDER);
 	table_cell.setColspan(5);
 	table4.addCell(table_cell);

		document.add(table4);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
      
   } 
   
   
   if(a>26 && a<=31 ){
	   	
   	   document.add(table); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(table1); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   	  
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
   	   document.add(table2); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
     
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table3); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table4); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
    	  
      	document.add(new Paragraph("        "));
      	document.add(new Paragraph("        ")); 
      	document.add(new Paragraph("        "));  
       
       String empty = " ";

       table_cell = new PdfPCell(new Phrase("\n\n\n\n\n\nDiscount:"+df.format(totalDiscount)+" Paid Amount: "+paidAmt, Normalfont12));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setColspan(5);
	table5.addCell(table_cell);
		
		
	
	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
	table_cell = new PdfPCell(new Phrase("GST: "+totalTaxAmount+" Total: "+TotalOfTotalAmtWithoutVatStr, Normalfont12));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setColspan(5);
	table5.addCell(table_cell);
		document.add(table5);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
      
   } 
   
   if(a>31 && a<=36 ){
	   	
   	   document.add(table); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(table1); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   	 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
   	   document.add(table2); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table3); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table4); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
     
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table5); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
    	  
      	document.add(new Paragraph("        "));
      	document.add(new Paragraph("        ")); 
      	document.add(new Paragraph("        "));  
      
       String empty = " ";

       table_cell = new PdfPCell(new Phrase(
				"\n\n\n\n\n\n\nPaid Amount", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(2);
		table_cell.setColspan(5);
		table6.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase(
				"\n\n\n\n\n\n\n" + paidAmt, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table6.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Balance", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(2);
		table_cell.setColspan(5);
		table6.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("" + Balance, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table6.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Discount", font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(3);
		table6.addCell(table_cell);

		table_cell = new PdfPCell(
				new Phrase("" + totalDiscount, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(1);
		table_cell.setPaddingBottom(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table6.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Net Total", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table6.addCell(table_cell);

		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase(""
				+ TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(1);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table6.addCell(table_cell);

		document.add(table6);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
      
       
   } 
   
   if(a>36 && a<=41 ){
	   	
   	   document.add(table); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(table1); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   	
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
   	   document.add(table2); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table3); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table4); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
     
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table5); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table6); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
    	  
      	document.add(new Paragraph("        "));
      	document.add(new Paragraph("        ")); 
      	document.add(new Paragraph("        "));  
     
       String empty = " ";

       table_cell = new PdfPCell(new Phrase(
				"\n\n\n\n\n\n\nPaid Amount", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(2);
		table_cell.setColspan(5);
		table7.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase(
				"\n\n\n\n\n\n\n" + paidAmt, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table7.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Balance", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(2);
		table_cell.setColspan(5);
		table7.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("" + Balance, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table7.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Discount", font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(3);
		table7.addCell(table_cell);

		table_cell = new PdfPCell(
				new Phrase("" + totalDiscount, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(1);
		table_cell.setPaddingBottom(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table7.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Net Total", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table7.addCell(table_cell);

		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase(""
				+ TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(1);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table7.addCell(table_cell);

		document.add(table7);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
      
       
   } 
   
   if(a>41 && a<=46 ){
	   	
   	   document.add(table); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
     
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(table1); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
   	 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
   	   document.add(table2); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table3); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table4); 
       document.add(new Paragraph(" "));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
      
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table5); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
     
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table6); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
     
   	   document.add(new Paragraph("        "));
   	   document.add(new Paragraph("        ")); 
       document.add(new Paragraph("        "));
       document.add(new Paragraph("        ")); 
   	   document.add(new Paragraph("        "));
       document.add(table7); 
       document.add(new Paragraph(""));
   	   document.add(new Paragraph(""));
       document.add(new Paragraph(""));
      
       document.newPage();
    	  
      	document.add(new Paragraph("        "));
      	document.add(new Paragraph("        ")); 
      	document.add(new Paragraph("        "));  
    
       String empty = " ";

       table_cell = new PdfPCell(new Phrase(
				"\n\n\n\n\n\n\nPaid Amount", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(2);
		table_cell.setColspan(5);
		table8.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase(
				"\n\n\n\n\n\n\n" + paidAmt, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table8.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Balance", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(2);
		table_cell.setColspan(5);
		table8.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("" + Balance, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table8.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Discount", font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setPaddingBottom(1);
		table_cell.setColspan(3);
		table8.addCell(table_cell);

		table_cell = new PdfPCell(
				new Phrase("" + totalDiscount, font13));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(1);
		table_cell.setPaddingBottom(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table8.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Net Total", font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table_cell.setColspan(2);
		table_cell.setPaddingBottom(2);
		table8.addCell(table_cell);

		String TotalOfTotalAmtWithoutVatStr = df.format(Total);
		table_cell = new PdfPCell(new Phrase(""
				+ TotalOfTotalAmtWithoutVatStr, font16));
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setColspan(1);
		table_cell.setPaddingBottom(2);
		table_cell.setPaddingTop(1);
		table_cell.setBorder(Rectangle.NO_BORDER);
		table8.addCell(table_cell);

		document.add(table8);

		PdfPTable footerTable3 = new PdfPTable(1);
		footerTable3.setWidthPercentage(100);

		float[] footerColumnWidths3 = { 0.9f };
		footerTable3.setWidths(footerColumnWidths3);

		PdfPCell footerTable_cell3;

		footerTable_cell3 = new PdfPCell(new Phrase(""));
		footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		footerTable_cell3.setRowspan(1);
		footerTable_cell3.setBorder(Rectangle.NO_BORDER);
		footerTable3.addCell(footerTable_cell3);

		document.add(footerTable3);
      
       
   } 
   
  
    if(a>46){
    document.add(table); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
  
    document.newPage();
  
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
	document.add(table1); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   

    document.newPage();
	
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
	document.add(table2); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
  
    document.newPage();

	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(table3); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
  
    document.newPage();
    
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(table4); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
  
    document.newPage();
    
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(table5); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
  
    document.newPage();
  
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(new Paragraph("        "));  
	document.add(new Paragraph("        "));
   	document.add(table6); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
 
    document.newPage();
  
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(table7); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
 
    document.newPage();
    
	document.add(new Paragraph("        "));
	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(new Paragraph("        ")); 
	document.add(new Paragraph("        "));
   	document.add(table8); 
    document.add(new Paragraph(""));
	document.add(new Paragraph(""));
    document.add(new Paragraph(""));
   
   
    document.newPage();
 	  
   	document.add(new Paragraph("        "));
   	document.add(new Paragraph("        ")); 
   	document.add(new Paragraph("        "));  
  
    String empty = " ";

    table_cell = new PdfPCell(new Phrase(
			"\n\n\n\n\n\n\nPaid Amount", font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(2);
	table_cell.setColspan(5);
	table9.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase(
			"\n\n\n\n\n\n\n" + paidAmt, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setColspan(2);
	table_cell.setPaddingBottom(2);
	table_cell.setPaddingTop(1);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table9.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Balance", font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(2);
	table_cell.setColspan(5);
	table9.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("" + Balance, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setColspan(2);
	table_cell.setPaddingBottom(2);
	table_cell.setPaddingTop(1);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table9.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Discount", font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setPaddingBottom(1);
	table_cell.setColspan(3);
	table9.addCell(table_cell);

	table_cell = new PdfPCell(
			new Phrase("" + totalDiscount, font13));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setColspan(1);
	table_cell.setPaddingBottom(1);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table9.addCell(table_cell);

	table_cell = new PdfPCell(new Phrase("Net Total", font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table_cell.setColspan(2);
	table_cell.setPaddingBottom(2);
	table9.addCell(table_cell);

	String TotalOfTotalAmtWithoutVatStr = df.format(Total);
	table_cell = new PdfPCell(new Phrase(""+TotalOfTotalAmtWithoutVatStr, font16));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setColspan(1);
	table_cell.setPaddingBottom(2);
	table_cell.setPaddingTop(1);
	table_cell.setBorder(Rectangle.NO_BORDER);
	table9.addCell(table_cell);

	document.add(table9);

	PdfPTable footerTable3 = new PdfPTable(1);
	footerTable3.setWidthPercentage(100);

	float[] footerColumnWidths3 = { 0.9f };
	footerTable3.setWidths(footerColumnWidths3);

	PdfPCell footerTable_cell3;

	footerTable_cell3 = new PdfPCell(new Phrase(""));
	footerTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
	footerTable_cell3.setRowspan(1);
	footerTable_cell3.setBorder(Rectangle.NO_BORDER);
	footerTable3.addCell(footerTable_cell3);

	document.add(footerTable3);
   
    }    
    
    rs.close();
    stmt.close();
    conn.close(); 
    // step 5    
    document.close();
	out = pageContext.pushBody();
    
    try{
    	
    	String emailId = ClientDetails.getEmail();
    	String vendorName = ""; 
    	
    	javax.mail.Session mailSession = javax.mail.Session.getInstance(System.getProperties());
        Transport transport = new SMTPTransport(mailSession,new URLName("smtp.gmail.com"));
        transport = mailSession.getTransport("smtps");
        transport.connect("smtp.gmail.com", 465 ,"embelbackup@gmail.com","ClothSoft");

         
        MimeMessage m = new MimeMessage(mailSession); 
        m.setFrom(new InternetAddress(emailId));
        Address[] toAddr = new InternetAddress[] {
        new InternetAddress(emailId)
        };
        m.setRecipients(javax.mail.Message.RecipientType.TO, toAddr);
        m.setHeader("Content-Type", "multipart/mixed");
        m.setSubject("CREDIT CUSTOMER TAX INVOICE "+billDate);
        m.setSentDate(new java.util.Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setText("Dear,  "+vendorName);
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);

        messageBodyPart = new MimeBodyPart();
         
        DataSource source = new ByteArrayDataSource(baos.toByteArray(), "application/pdf");
        messageBodyPart.setDataHandler(new DataHandler(source));
        messageBodyPart.setFileName("Tax Invoice.pdf");
        multipart.addBodyPart(messageBodyPart);

        m.setContent(multipart);

        transport.sendMessage(m,m.getAllRecipients());
        transport.close();
        out.println("Thanks for sending mail!");
    	System.out.println("BILLING PDF SENT");
    }catch(Exception e){
        out.println(e.getMessage());
        e.printStackTrace();
      }
    
   
} catch (DocumentException de) {
    throw new IOException(de.getMessage());
}
%>