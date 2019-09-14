package com.smt.utility;

import java.util.Timer;
import java.util.TimerTask;
import com.smt.helper.LogoutController;

public class ScheduledBackup
{	
	public static void backupOnTime()
	{		
		
		final SendReports sendreports = new SendReports();
		final MyJob myjob = new MyJob();
		TimerTask task = new TimerTask()
		{
			/*LogoutController bb = new LogoutController();
			Date date = new Date();*/
			@Override
			public void run()
			{
				sendreports.sendTodayPurchaseReport();
				sendreports.sendTodayPurchaseReturnReport();
				sendreports.sendTodaySaleReport();	
				sendreports.sendTodaySaleReturnReport();
				LogoutController.main1();
				myjob.execute();
			}
		};

		Timer timer = new Timer();
		long delay = 0;
		long intevalPeriod = 1 * 3600 * 1000;//time interval for 1 hour
		//long intevalPeriod = 1 * 1000 * 20;//time interval for 20 second
		// schedules the task to be run in an interval
		/*long t2 = intevalPeriod/2;
		long t3 = t2/2;*/
		timer.scheduleAtFixedRate(task, delay, intevalPeriod);
	}

	public static void main(String[] args)
	{
		
	} // end of main
}
