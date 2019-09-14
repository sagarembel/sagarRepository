package com.smt.utility;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.slf4j.LoggerFactory;

public class AutoDatabaseBackupJob
{
	public File mailDatabaseBackup() throws IOException
	{
		File f = null;
		try
		{
			System.out.println("auto backup file");
			//f = new File("F:/databackup/cloth.sql");
			f = new File("E:/databackup/fabric.sql");
			//f = new File("D:/databackup/cloth.sql");
		}
		catch (Exception ex)
		{
			LoggerFactory.getLogger(getClass()).error(ex.getMessage());
		}
		return f;
	}
}