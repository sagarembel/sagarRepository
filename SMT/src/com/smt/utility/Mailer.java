package com.smt.utility;

import java.io.IOException;
import java.io.File;
import java.util.Properties;
import javax.activation.*;
import javax.mail.*;
import javax.mail.internet.*;

public class Mailer {

	public static void sendFile(String to, File f)
	{
		final String user = "embelmessanger@gmail.com";// change accordingly
		final String pass = "embel@123";

		// 1st step) Get the session object
		Properties props = new Properties();
		props.setProperty("mail.transport.protocol", "smtp");
	
		props.setProperty("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.debug", "true");
		props.put("mail.smtp.socketFactory.fallback", "false");
		props.setProperty("mail.smtp.quitwait", "false");
		
		Session session = Session.getInstance(props, new javax.mail.Authenticator()
		{			
			protected PasswordAuthentication getPasswordAuthentication()
			{
				return new PasswordAuthentication(user, pass);
			}		
		}		
	);
		// 2nd step)compose message
		try
		{
			/*
				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress(user));
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
				message.setSubject("GHANTALWAR MEN'S WEAR database backup By Embel Technologies Pvt Ltd");
				message.setText("DATABASE BACKUP OF GHANTALWAR MEN'S WEAR");
				String filename = "E:/databackup/fabric.sql";//change accordingly
				String filename2 = "E:/databackup/DemoCSV.csv";//change accordingly	
				
				DataSource source = new FileDataSource(filename);
				message.setDataHandler(new DataHandler(source));
				message.setFileName(filename);
			
				// 3rd step send message
				Transport.send(message);
			*/
			
			
			MimeMessage message = new MimeMessage(session); 
			message.setFrom(new InternetAddress(user)); 
			message.addRecipient(Message.RecipientType.TO,new InternetAddress(to)); 
			message.setSubject("DAILY REPORTS FROM EMBEL TECHNOLOGY PVT. LTD, PUNE."); 
			
			//3) create MimeBodyPart object and set your message content 
			MimeBodyPart messageBodyPart1 = new MimeBodyPart(); 
			messageBodyPart1.setContent("<h1>Daily Transaction Reports<br></h1>","text/html"); 
			//art1.setText("<h1>This is message body ki hall ne rajeev veere<br>theek thaak ho</h1>"); 
			
			//4) create new MimeBodyPart object and set DataHandler object to this object 
			
			MimeBodyPart messageBodyPart2 = new MimeBodyPart();			  
			String filename1 = "E:\\databackup\\fabric.sql";//change accordingly //DataSource
			DataSource source1 = new FileDataSource(filename1);
			messageBodyPart2.setDataHandler(new DataHandler(source1));
			messageBodyPart2.setFileName(filename1);
			 			
			MimeBodyPart messageBodyPart3 = new MimeBodyPart(); 
			String filename2 = "E:\\databackup\\TodaySaleReport.csv";//change accordingly 
			DataSource source2 = new FileDataSource(filename2); 
			messageBodyPart3.setDataHandler(new DataHandler(source2)); 
			messageBodyPart3.setFileName(filename2); 			
			
			MimeBodyPart messageBodyPart4 = new MimeBodyPart(); 
			String filename3 = "E:\\databackup\\TodayPurchaseReport.csv";//change accordingly 
			DataSource source3 = new FileDataSource(filename3); 
			messageBodyPart4.setDataHandler(new DataHandler(source3)); 
			messageBodyPart4.setFileName(filename3); 			
			
		   MimeBodyPart messageBodyPart5 = new MimeBodyPart(); 
		   String filename4 = "E:\\databackup\\TodaySaleReturnReport.csv";//change accordingly
		   DataSource source4 = new FileDataSource(filename4);
		   messageBodyPart5.setDataHandler(new DataHandler(source4));
		   messageBodyPart5.setFileName(filename4);		
		   
		   MimeBodyPart messageBodyPart6 = new MimeBodyPart(); 
		   String filename5 = "E:\\databackup\\TodayPurchaseReturnReport.csv";//change accordingly
		   DataSource source5 = new FileDataSource(filename5);
		   messageBodyPart6.setDataHandler(new DataHandler(source5));
		   messageBodyPart6.setFileName(filename5);	
			
			//5) create Multipart object and add MimeBodyPart objects to this object 
			Multipart multipart = new MimeMultipart(); 
			multipart.addBodyPart(messageBodyPart1); 
			multipart.addBodyPart(messageBodyPart2); 
			multipart.addBodyPart(messageBodyPart3); 
			multipart.addBodyPart(messageBodyPart4);
			multipart.addBodyPart(messageBodyPart5);
			multipart.addBodyPart(messageBodyPart6);
			
			//6) set the multiplart object to the message object 
			message.setContent(multipart); 
			
			//7) send message 
			Transport.send(message); 
			
			System.out.println("Mailer....Done");			
			
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}

	}

}
