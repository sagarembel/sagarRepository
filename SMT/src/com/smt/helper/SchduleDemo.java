package com.smt.helper;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class SchduleDemo implements Job {

	public SchduleDemo() {
	}

	public void execute(JobExecutionContext context) throws JobExecutionException {

		System.out.println("Hello!  HelloJob is executing.");
	}
}
