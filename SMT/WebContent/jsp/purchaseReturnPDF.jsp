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
Long transactionId = (Long) session.getAttribute("transactionId");
System.out.print("::::::::::::::::::::::::::::::::::::::::: transactionId:- "+transactionId+" ::::::::::::::::::::::::::::");

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
String gst1 = "";
Double gstAmt = 0.0;
Double totalAfterRetrun = 0.0;
String GST_No = /*"GST No-27AADPU2557K1Z9"*/"";
Double totalTaxAmount = 0.0;
Double totalQtyTax = 0.0;
Double disAmount = 0.0;
Double totalDisAmount = 0.0;
Double totalQtydis = 0.0;
String returnGrossTotal = "";

try {
	Connection conn = null;
	Connection conn1 = null;
	// step 1
	Document document = new Document(PageSize.A7, 05f, 05f, 0f, 0f);
	document.setMargins(16 , 0 , 0 , 0);
	// step 2
	PdfWriter.getInstance(document, response.getOutputStream());
	ByteArrayOutputStream baos = new ByteArrayOutputStream();
    PdfWriter.getInstance(document, baos);
	// step 3
	document.open();
	/*Image image1 = Image.getInstance("C:/step0003.jpg");
	 Image image1 = Image.getInstance("/step0003.jpg");
	image1.scaleToFit(520f, 1200f);
	image1.setAlignment(Image.MIDDLE );
	document.add(image1); */

	Class.forName("com.mysql.jdbc.Driver");
	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/fabric", "root", "root");
	Statement stmt = conn.createStatement();

	ResultSet rs = stmt.executeQuery("select pr.BillNo, pr.ItemName, pr.CategoryName, pr.ReturnQuantity, pr.BuyPrice, pr.supplierName, pr.Discount, pr.GrossTotal, pr.ReturnDate, pr.Return_Total, pr.Vat, pr.BarcodeNo, pr.Return_Gross_Total, pr.rollsize, pr.size, pr.purchaseReturnReason, pr.igst  from purchasereturn pr where pr.transactionId = "+transactionId);
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
	
	Font font10 = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
	Font font10Bold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD, BaseColor.BLACK);
	Font font8 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);		
	Font font8Bold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.BLACK);

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

	returnGrossTotal = rs.getString("Return_Gross_Total");
		
	PdfPTable headertable21 = new PdfPTable(2);
	headertable21.setWidthPercentage(100);

	float[] HeadercolumnWidths21 = { 0.9f, 0.5f };
	headertable21.setWidths(HeadercolumnWidths21);

	PdfPCell headerTable_cell21;

	headerTable_cell21 = new PdfPCell(new Phrase("PEHENAVA", font10Bold));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	headerTable_cell21.setPaddingBottom(2);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	headerTable_cell21 = new PdfPCell(new Phrase("", font10));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	headerTable_cell21.setPaddingBottom(2);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	headerTable_cell21 = new PdfPCell(new Phrase("Marwad Peth,\nBaramati", font10));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	headerTable_cell21.setPaddingBottom(2);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	headerTable_cell21 = new PdfPCell(new Phrase("", font10));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	headerTable_cell21.setPaddingBottom(2);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	//headerTable_cell21 = new PdfPCell(new Phrase(GST_No+"", font12Bold));
	headerTable_cell21 = new PdfPCell(new Phrase("PURCHASE RETURN", font10));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	//headerTable_cell21.setPaddingBottom(2);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);

	String returnDate = rs.getString("ReturnDate");
	
	/* headerTable_cell21 = new PdfPCell(new Phrase("Date: "+ rs.getString("Date"), font12Bold)); */
	headerTable_cell21 = new PdfPCell(new Phrase("Date: "+returnDate/*StrBillDate*/, font8));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_RIGHT);
	//headerTable_cell21.setPaddingBottom(2);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);

	String supplierName = rs.getString("supplierName");
	headerTable_cell21 = new PdfPCell(new Phrase("Supplier Name: "+supplierName,	font10));
	//headerTable_cell21.setRowspan(8);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	//headerTable_cell21.setPaddingTop(8);
	headertable21.addCell(headerTable_cell21);

	headerTable_cell21 = new PdfPCell(new Phrase("Transaction ID:" + transactionId,font8));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	//headerTable_cell21.setPaddingTop(8);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);

	headerTable_cell21 = new PdfPCell(new Phrase("Return Because of: "+rs.getString("purchaseReturnReason"), font10));
	headerTable_cell21.setHorizontalAlignment(Element.ALIGN_LEFT);
	//headerTable_cell21.setPaddingBottom(2);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	
	/* headerTable_cell21 = new PdfPCell(new Phrase(""));
	//headerTable_cell21.setRowspan(8);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);*/

	headerTable_cell21 = new PdfPCell(new Phrase("\n"));
	//headerTable_cell21.setRowspan(8);
	headerTable_cell21.setBorder(Rectangle.NO_BORDER);
	headertable21.addCell(headerTable_cell21);
	document.add(headertable21);

	//end informatin
 
	//table for particulars
	PdfPTable table = new PdfPTable(5);
	 table.setSpacingBefore(5);
	table.setWidthPercentage(100);
	table.setSpacingAfter(5);

	float[] columnWidths = { 0.2f, 0.7f, 0.3f, 0.4f, 0.5f };
	table.setWidths(columnWidths);
	
	PdfPTable table1 = new PdfPTable(5);
	 table1.setSpacingBefore(5);
	table1.setWidthPercentage(100);
	table1.setSpacingAfter(5);

	float[] columnWidths1 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table1.setWidths(columnWidths1);
	
	PdfPTable table2 = new PdfPTable(5);
	 table2.setSpacingBefore(5);
	table2.setWidthPercentage(100);
	table2.setSpacingAfter(5);

	float[] columnWidths2 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table2.setWidths(columnWidths2);
	
	PdfPTable table3 = new PdfPTable(5);
	 table3.setSpacingBefore(5);
	table3.setWidthPercentage(100);
	table3.setSpacingAfter(5);

	float[] columnWidths3 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table3.setWidths(columnWidths3);
	
	PdfPTable table4 = new PdfPTable(5);
	 table4.setSpacingBefore(5);
	table4.setWidthPercentage(100);
	table4.setSpacingAfter(5);

	float[] columnWidths4 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table4.setWidths(columnWidths4);
	
	PdfPTable table5 = new PdfPTable(5);
	 table5.setSpacingBefore(5);
	table5.setWidthPercentage(100);
	table5.setSpacingAfter(5);

	float[] columnWidths5 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table5.setWidths(columnWidths5);
	
	PdfPTable table6 = new PdfPTable(5);
	 table6.setSpacingBefore(5);
	table6.setWidthPercentage(100);
	table6.setSpacingAfter(5);

	float[] columnWidths6 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table6.setWidths(columnWidths6);
	
	PdfPTable table7 = new PdfPTable(5);
	 table7.setSpacingBefore(5);
	table7.setWidthPercentage(100);
	table7.setSpacingAfter(5);

	float[] columnWidths7 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table7.setWidths(columnWidths7);
	
	PdfPTable table8 = new PdfPTable(5);
	 table8.setSpacingBefore(5);
	table8.setWidthPercentage(100);
	table8.setSpacingAfter(5);

	float[] columnWidths8 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table8.setWidths(columnWidths8);
	
	PdfPTable table9 = new PdfPTable(5);
	 table9.setSpacingBefore(5);
	table9.setWidthPercentage(100);
	table9.setSpacingAfter(5);

	float[] columnWidths9 = { 0.1f, 0.7f, 0.3f, 0.4f, 0.5f };
	table9.setWidths(columnWidths9);
	
	PdfPCell table_cell;
	rs.beforeFirst();
    
     
    PdfPCell cell1 = new PdfPCell(new Paragraph("Sr. No.", font10Bold));
    cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
	PdfPCell cell2 = new PdfPCell(new Paragraph("Particulars", font10Bold));
	cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
    PdfPCell cell3 = new PdfPCell(new Paragraph("Qty", font10Bold));
    cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
    PdfPCell cell4 = new PdfPCell(new Paragraph("Rate", font10Bold));
    cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
    PdfPCell cell5 = new PdfPCell(new Paragraph("Amount", font10Bold)); 
    cell5.setHorizontalAlignment(Element.ALIGN_CENTER);    
   
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

while(rs.next())
{
if (a<6)
{	
	
expenseExtra = rs.getDouble("Discount");
totalDiscount = totalDiscount + expenseExtra;

double igst = 0.0;

double totalAmtWithoutVat = 0;

gstAmt = 0.0;

table_cell = new PdfPCell(new Phrase(" " + a, font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table.addCell(table_cell);

String itemName = rs.getString("ItemName");

table_cell = new PdfPCell(new Phrase(itemName, font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table.addCell(table_cell);

Double rollSize = rs.getDouble("rollSize");
String unit = rs.getString("size");
Double returnQuantity = rs.getDouble("ReturnQuantity");

if (unit.equalsIgnoreCase("meter") || unit.equalsIgnoreCase("mtr"))
{	
	Double totalMeter = rollSize * returnQuantity;
	table_cell = new PdfPCell(new Phrase(String.valueOf(totalMeter)+" "+unit, font10));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
}
else
{
	table_cell = new PdfPCell(new Phrase(String.valueOf(returnQuantity), font10));
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	table.addCell(table_cell);
}

double price = rs.getDouble("buyPrice");

String totalWeight = String.valueOf(price);
table_cell = new PdfPCell(new Phrase("" + price, font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table.addCell(table_cell);

String returnTotal = String.valueOf(rs.getDouble("Return_Total"));
table_cell = new PdfPCell(new Phrase(" " +returnTotal, font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
table.addCell(table_cell);

double discountPer = rs.getDouble("discount");

if(discountPer > 0.0)
{
	disAmount = (discountPer/100.00)*price;
	if(rollSize > 0.0)
	{
		totalQtydis = ((returnQuantity*rollSize)*disAmount);		
	}
	else
	{
		totalQtydis = (returnQuantity*disAmount);
	}
	totalDisAmount = totalDisAmount + totalQtydis;
	price = price - disAmount;	
	
	System.out.println("totalDisAmount " +totalDisAmount);
	System.out.println();	
}

double taxPer = rs.getDouble("vat");
if(taxPer > 0)
{
	if(taxPer > 0.0)
	{
		vatAmount = (taxPer/100.00)*price;
		if(rollSize > 0.0)
		{
			System.out.println("rollSize ====> "+rollSize);
			totalQtyTax = ((returnQuantity*rollSize)*vatAmount);
		}
		else
		{
			totalQtyTax = returnQuantity*vatAmount;
		}
		totalTaxAmount = totalTaxAmount + totalQtyTax;
		System.out.println("totalTaxAmount " +totalTaxAmount);
		System.out.println();	
	}
}
else
{
	double iGsttaxPer = rs.getDouble("igst");
	if(iGsttaxPer > 0.0)
	{
		vatAmount = (iGsttaxPer/100.00)*price;
		if(rollSize > 0.0)
		{
			System.out.println("rollSize ====> "+rollSize);
			totalQtyTax = ((returnQuantity*rollSize)*vatAmount);
		}
		else
		{
			totalQtyTax = returnQuantity*vatAmount;
		}
		totalTaxAmount = totalTaxAmount + totalQtyTax;
		System.out.println("totalTaxAmount " +totalTaxAmount);
		System.out.println();	
	}
}

if (igst == 0)
{
	totalAmtWithoutVat = 0.0;
}
else if (igst != 0)
{
	totalAmtWithoutVat = 0.0;
}
String strTotalAmtWithoutVat = df.format(totalAmtWithoutVat);

TotalOfTotalAmtWithoutVat = rs.getDouble("GrossTotal");
Total = +TotalOfTotalAmtWithoutVat;

TotalOfTotalAmtWithoutVat1 = TotalOfTotalAmtWithoutVat1 + totalAmtWithoutVat;

vatAmount = 0.0;//vatAmount + vAmt;

interGstAmount = 0.0;//interGstAmount + newiGstAmount;

TotalTax = 0.0;// TotalTax + totalAmt;

itemCount++;

allItemNames = ""/*itemName*/;


AllInOne += allItemNames + "  " + String.valueOf(totalBags)
		+ "  Quantity  ";
a=a+1;
}
}

{
	
table_cell = new PdfPCell(new Phrase("Discount: "+df.format(totalDisAmount), font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.TOP);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table_cell.setPaddingTop(0f);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("", font10));
table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
table_cell.setBorder(Rectangle.TOP | Rectangle.RIGHT | Rectangle.LEFT);
table_cell.setPaddingBottom(1);
//table_cell.setColspan(1);
table.addCell(table_cell);

//String TotalOfTotalAmtWithoutVatStr = df.format(Total);
table_cell = new PdfPCell(new Phrase("Gross Total: ", font10Bold));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.TOP);
table_cell.setColspan(3);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("Tax Amt: "+df.format(totalTaxAmount), font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table_cell.setPaddingTop(0f);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("", font10));
table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
table_cell.setBorder(Rectangle.BOTTOM | Rectangle.RIGHT);
table_cell.setPaddingBottom(1);
//table_cell.setColspan(1);
table.addCell(table_cell);

String TotalOfTotalAmtWithoutVatStr = df.format(Total);
table_cell = new PdfPCell(new Phrase(""+returnGrossTotal, font10Bold));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.RIGHT | Rectangle.BOTTOM);
table_cell.setColspan(3);
table.addCell(table_cell);

table_cell = new PdfPCell(new Phrase("", font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM );
table_cell.setPaddingBottom(1);
//table_cell.setColspan(2);
table.addCell(table_cell);


table_cell = new PdfPCell(new Phrase("", font10));
table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
table_cell.setBorder(Rectangle.LEFT | Rectangle.BOTTOM );
table_cell.setPaddingBottom(1);
table_cell.setColspan(2);
table.addCell(table_cell);

document.add(table);

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
//step 5

document.close();
out = pageContext.pushBody();

try{
	
	String emailId = ClientDetails.getEmail();
	String embelEmail = ClientDetails.getEmbelEmail();
	String embelPassword = ClientDetails.getEmbelEmailPassword();
	String vendorName = ""; 
	
	javax.mail.Session mailSession = javax.mail.Session.getInstance(System.getProperties());
    Transport transport = new SMTPTransport(mailSession,new URLName("smtp.gmail.com"));
    transport = mailSession.getTransport("smtps");
    transport.connect("smtp.gmail.com", 465, embelEmail, embelPassword);

     
    MimeMessage m = new MimeMessage(mailSession); 
    m.setFrom(new InternetAddress(emailId));
    Address[] toAddr = new InternetAddress[] {
    new InternetAddress(emailId)
    };
    m.setRecipients(javax.mail.Message.RecipientType.TO, toAddr);
    m.setHeader("Content-Type", "multipart/mixed");
    m.setSubject("PURCHASE RETURN "+billDate);
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
