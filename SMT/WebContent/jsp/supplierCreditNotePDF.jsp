<%@page import="com.smt.bean.ClientDetails"%>
<%@page import="java.io.ByteArrayOutputStream"%>
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
System.out.println("transactionId ===========> "+transactionId);

try
{
	Connection conn = null;
	 // step 1
    
    Document document = new Document(PageSize.A7, 20f,20f, 0f, 10f);
	document.setMargins(0 , 0 , 0 , 0);
    
    // step 2
   
    PdfWriter.getInstance(document, response.getOutputStream());
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    PdfWriter.getInstance(document, baos);
    // step 3
    document.open();
    
/*     Image image1 = Image.getInstance("C:/step0003.jpg");
	image1.scaleToFit(520f, 1200f);
	image1.setAlignment(Image.MIDDLE );
	document.add(image1); */
    
	Class.forName("com.mysql.jdbc.Driver");
	conn= DriverManager.getConnection("jdbc:mysql://localhost:3306/fabric","root","root");
 	Statement stmt = conn.createStatement();
    //ResultSet rs = stmt.executeQuery("select ccp.bill_no, ccp.total_amount, ccp.balance, ccp.payment, ccp.paymentType, ccp.payment_mode, ccp.insert_date, cd.first_name, sd.shop_name, sd.address, sd.contactNo, sd.gstNo from credit_customer_payment ccp JOIN customer_details cd on ccp.fk_customer_id=cd.pk_customer_id JOIN shop_details sd on ccp.shopId=sd.pk_shop_id ORDER BY pk_credit_customer_id DESC Limit 1;");
    ResultSet rs = stmt.executeQuery("select sp.total_amount, sp.balance, sp.payment, sp.paymentType, sp.payment_mode, sp.insert_date, sd.supplier_name, sp.receiptNumber, sp.pk_supplier_payment_id from supplier_payment sp join supplier_details sd on sp.fk_supplier_id=sd.supplier_id where sp.pk_supplier_payment_id = "+transactionId+" ORDER BY sp.pk_supplier_payment_id;");
   	rs.next();
	String totalAmount = rs.getString("total_amount");
	System.out.println(totalAmount);
	String balance = rs.getString("balance");
	String payment = rs.getString("payment");
	String paymentType = rs.getString("paymentType");
	String insertdate = rs.getString("insert_date");
	/* String transactionId = rs.getString("pk_supplier_payment_id"); */
	String suppName = rs.getString("supplier_name");
	//String lname = rs.getString("last_name");
	//String name = fname+" "+lname;
	String payment_mode = rs.getString("payment_mode");
	//String contactNo = rs.getString("contact_no");
	
	/* String shop_name = rs.getString("shop_name");
	String address = rs.getString("address");
	String gstNo = rs.getString("gstNo"); */
	
	double totalPaidAmt = Double.parseDouble(totalAmount)-Double.parseDouble(balance);

	SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
	Date tempInsertdate = dateFormater.parse(insertdate);
	
	SimpleDateFormat dateFormaterForddMMYYYY = new SimpleDateFormat("dd-MM-yyyy");
	String creditInsertdate = dateFormaterForddMMYYYY.format(tempInsertdate);
	
	Font font10 = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
	Font font10Bold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD, BaseColor.BLACK);
	Font font8 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);		
	Font font8Bold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.BLACK);
	
    Font font20Bold = new Font(Font.FontFamily.TIMES_ROMAN, 20, Font.BOLD, BaseColor.BLACK);
    Font font15Bold = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD, BaseColor.BLACK);
    Font font15Normal = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.NORMAL, BaseColor.BLACK);
    Font font15BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD | Font.UNDERLINE,BaseColor.BLACK);
    Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
    Font font11Bold = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD, BaseColor.BLACK);
    Font font11NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.NORMAL, BaseColor.BLACK);
    Font font12NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
    Font font8NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL, BaseColor.BLACK);
    Font font9NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL, BaseColor.BLACK);
    Font font10NoBold = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL, BaseColor.BLACK);
    Font font12BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD | Font.UNDERLINE,BaseColor.BLACK);
    Font font17 = new Font(Font.FontFamily.TIMES_ROMAN, 17, Font.BOLD, BaseColor.BLACK);
    Font font13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
    Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);
    Font Normalfont11 = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.NORMAL, BaseColor.BLACK);
    Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
    Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
    Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);    
    
    Date d1 = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
    SimpleDateFormat sdf1 = new SimpleDateFormat("E");
    SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
    sdf2.setTimeZone(TimeZone.getTimeZone("IST")); 

  	String stdver1=(String) sdf.format(d1);
  	String day=sdf1.format(d1.getDate());
    String Time=sdf2.format(d1.getTime());
    String dtfinl=stdver1;
    
    
    PdfPTable shopTable = new PdfPTable(2);
    shopTable.setSpacingAfter(5f);
    shopTable.setWidthPercentage(100);
    PdfPCell table_cell1;

	float[] columnWidths1 = { 0.3f, 0.3f};
	shopTable.setWidths(columnWidths1);
	
		table_cell1 = new PdfPCell(new Phrase("Bill Cash/Credit Memorandum", font10));
		table_cell1.setBorder(table_cell1.NO_BORDER);
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		shopTable.addCell(table_cell1);

		table_cell1 = new PdfPCell(new Phrase(/*shop_name*/"", font11Bold));
		table_cell1.setBorder(table_cell1.NO_BORDER);
		table_cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		shopTable.addCell(table_cell1);

		table_cell1 = new PdfPCell(new Phrase("",font9NoBold));
		table_cell1.setBorder(table_cell1.NO_BORDER);
		table_cell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
		shopTable.addCell(table_cell1);
				
		table_cell1 = new PdfPCell(new Phrase(/*"Bill No: "+*/""/*shopPrBillno*/, font9NoBold));
		table_cell1.setBorder(table_cell1.NO_BORDER);
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setPaddingTop(2f);
		shopTable.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase(""/*address*/, Normalfont11));
		table_cell1.setBorder(table_cell1.NO_BORDER);
		table_cell1.setPaddingTop(2f);
		table_cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		shopTable.addCell(table_cell1);	

		table_cell1 = new PdfPCell(new Phrase(""+/*gstNo*/"", font9NoBold));
		table_cell1.setBorder(table_cell1.NO_BORDER);
		table_cell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
		shopTable.addCell(table_cell1);

		document.add(shopTable);
		
    // step 4
	
    PdfPTable table = new PdfPTable(2); 
      
/* 	PdfPTable table1 = new PdfPTable(10);       
    PdfPTable table2 = new PdfPTable(10); */
    
	table.setWidthPercentage(100);

	float[] columnWidths = { 0.6f, 0.4f};
	table.setWidths(columnWidths);
    
    PdfPCell table_cell;    
       
    table_cell = new PdfPCell(new Phrase("Pehenava Baramati", font10Bold));
	table_cell.setBorder(table_cell.LEFT | table_cell.TOP);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	//table_cell.setPadding(10.0f);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("Transaction Id: "+transactionId, font11NoBold));
	table_cell.setBorder(table_cell.TOP | table_cell.RIGHT);
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	//table_cell.setPadding(10.0f);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("Payment Receipt", font10));
	table_cell.setBorder(table_cell.LEFT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	//table_cell.setPadding(10.0f);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("Date:"+creditInsertdate, font10));
	table_cell.setBorder(table_cell.RIGHT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	//table_cell.setPadding(10.0f);
	table.addCell(table_cell);
	
	if(paymentType.equalsIgnoreCase("credit"))
	{
		table_cell = new PdfPCell(new Phrase("Received From ", font10Bold));
		table_cell.setBorder(table_cell.LEFT | table_cell.RIGHT | table_cell.BOTTOM);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setPadding(10.0f);
		table.addCell(table_cell);
	}
	else
	{
		table_cell = new PdfPCell(new Phrase("Paid To ", font10Bold));
		table_cell.setBorder(table_cell.LEFT | table_cell.RIGHT | table_cell.BOTTOM);
		table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table_cell.setPadding(10.0f);
		table.addCell(table_cell);
	}
	
	table_cell = new PdfPCell(new Phrase("Amount", font10));
	table_cell.setBorder(table_cell.RIGHT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setPadding(10.0f);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase(suppName, font10));
	table_cell.setBorder(table_cell.LEFT | table_cell.RIGHT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setPadding(10.0f);
	table.addCell(table_cell);	
	
	table_cell = new PdfPCell(new Phrase(payment+" Rs", font10));
	table_cell.setBorder(table_cell.RIGHT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	table_cell.setPadding(10.0f);
	table.addCell(table_cell);	
	
	table_cell = new PdfPCell(new Phrase("Total Amount: "+totalAmount+" Rs", font10));
	table_cell.setBorder(table_cell.LEFT | table_cell.RIGHT);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setPaddingTop(10.0f);
	table.addCell(table_cell);	
	
	table_cell = new PdfPCell(new Phrase("Payment Type: "+paymentType.toUpperCase(), font10));
	table_cell.setBorder(table_cell.RIGHT);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setPaddingTop(10.0f);
	table.addCell(table_cell);
	
	
	if(totalPaidAmt < 0)
	{
		totalPaidAmt = 0;
	}
	table_cell = new PdfPCell(new Phrase("Total Paid Amount: "+String.format("%.2f",totalPaidAmt)+" Rs", font10));
	table_cell.setBorder(table_cell.LEFT | table_cell.RIGHT);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("Payment Mode: "+payment_mode, font10));
	table_cell.setBorder(table_cell.RIGHT);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table.addCell(table_cell);
		
	table_cell = new PdfPCell(new Phrase("Balance Amount: "+balance+" Rs", font10));
	table_cell.setBorder(table_cell.LEFT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table_cell.setPaddingBottom(10.0f);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("", font10));
	table_cell.setBorder(table_cell.LEFT | table_cell.BOTTOM | table_cell.RIGHT);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("Received By: ", font10));
	table_cell.setBorder(table_cell.LEFT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
	table_cell.setPaddingTop(6.0f);
	table_cell.setPaddingBottom(6.0f);
	table.addCell(table_cell);
	
	table_cell = new PdfPCell(new Phrase("", font10));
	table_cell.setBorder(table_cell.RIGHT | table_cell.BOTTOM);
	table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
	table.addCell(table_cell);
	
	document.add(table);

   int a=1;
   Double sum=0d;
   Double tax=0d;
   String taxVal="";
   Double swachaTax=0d;
   Double groTOT=0d;
   String xx1="";
   
   String grossT="";
   
    while(rs.next())
    {}   
    // step 5        
     rs.close();
     stmt.close();
     conn.close();
     document.close();
     out.clear(); // where out is a JspWriter
 	 out = pageContext.pushBody();
try { 	
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
         Address[] toAddr = new InternetAddress[]{
         new InternetAddress(emailId)
         };
         m.setRecipients(javax.mail.Message.RecipientType.TO, toAddr);
         m.setHeader("Content-Type", "multipart/mixed");
         m.setSubject("Supplier Payment Transaction");
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
     
} catch (DocumentException de)
{	
    throw new IOException(de.getMessage());
}
%> 