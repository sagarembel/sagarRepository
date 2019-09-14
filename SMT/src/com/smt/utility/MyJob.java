package com.smt.utility;

import java.io.File;
import java.io.IOException;
import org.slf4j.LoggerFactory;
import com.smt.bean.ClientDetails;

public class MyJob
{
	File backup = null;

	public void execute()
	{	
		try 
		{
			String to = ClientDetails.getEmail();
			try
			{
				AutoDatabaseBackupJob data = new AutoDatabaseBackupJob();
				backup = data.mailDatabaseBackup();
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
			try
			{
				com.smt.utility.Mailer.sendFile(to, backup);
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			System.out.println("Mail Sent...");
		}
		catch (Exception ex)
		{
			LoggerFactory.getLogger(getClass()).error(ex.getMessage());
		}
	}
}


