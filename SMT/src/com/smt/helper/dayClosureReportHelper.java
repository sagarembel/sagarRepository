package com.smt.helper;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.smt.bean.SaleReport;
import com.smt.dao.DayClosureReportDao;
import com.smt.dao.ExpenditureDetailsDao;
import com.smt.hibernate.ExpenditureDetailsBean;

public class dayClosureReportHelper
{
	public Map getTodayCashAmounthelper(String userType, String userName)
	{
		// TODO Auto-generated method stub
		DayClosureReportDao dao = new DayClosureReportDao();
		List list = dao.getTodayCashAmountDao(userType, userName);
		System.out.println("today Cash list size ====> "+list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			SaleReport bean = new SaleReport();
			
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setTodayCashAmt("0");
			} else {
				bean.setTodayCashAmt(o[1].toString());
				System.out.println("today cash AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
				System.out.println("today cash AMOUNT ==========> "+bean.getTodayCashAmt());
			}
			map.put(bean.getTodayCashAmt(), bean);
		}
		return map;
	}
	
	public Map getTodayCardAmounthelper(String userType, String userName)
	{
		// TODO Auto-generated method stub
		DayClosureReportDao dao = new DayClosureReportDao();
		List list = dao.getTodayCardAmountDao(userType, userName);
		System.out.println("today Card list size ====> "+list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			SaleReport bean = new SaleReport();
			
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setTodayCardAmt("0");
			} else {
				bean.setTodayCardAmt(o[1].toString());
				System.out.println("today card AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
			}
			map.put(bean.getTodayCardAmt(), bean);
		}
		return map;
	}
	
	public Map getTodayChequeAmounthelper(String userType, String userName)
	{
		// TODO Auto-generated method stub
		DayClosureReportDao dao = new DayClosureReportDao();
		List list = dao.getTodayChequeAmountDao(userType, userName);
		System.out.println("today cheque list size ====> "+list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			SaleReport bean = new SaleReport();
			
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setTodayChequeAmt("0");
			} else {
				bean.setTodayChequeAmt(o[1].toString());
				System.out.println("today cheque AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
			}
			map.put(bean.getTodayChequeAmt(), bean);
		}
		return map;
	}
	
	public Map getTodayNeftAmounthelper(String userType, String userName)
	{
		// TODO Auto-generated method stub
		DayClosureReportDao dao = new DayClosureReportDao();
		List list = dao.getTodayNeftAmountDao(userType, userName);
		System.out.println("today NEFT list size ====> "+list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			SaleReport bean = new SaleReport();
			
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setTodayNeftAmt("0");
			} else {
				bean.setTodayNeftAmt(o[1].toString());
				System.out.println("today NEFT AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
			}
			map.put(bean.getTodayNeftAmt(), bean);
		}
		return map;
	}
	
	
	public Map getTodayCReditCustCashAmounthelper(String userType, String userName)
	{
		// TODO Auto-generated method stub
		DayClosureReportDao dao = new DayClosureReportDao();
		List list = dao.getTodayCreditCustCashAmountDao(userType, userName);
		System.out.println("today Credit Cust Cash list size ====> "+list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			SaleReport bean = new SaleReport();
			
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setTodayCreditCustCashAmt("0");
			} else {
				bean.setTodayCreditCustCashAmt(o[1].toString());
				System.out.println("today cash AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
				System.out.println("today cash AMOUNT ==========> "+bean.getTodayCreditCustCashAmt());
			}
			map.put(bean.getTodayCreditCustCashAmt(), bean);
		}
		return map;
	}
	
	
	public Map getTodayCReditCustCardAmounthelper(String userType, String userName)
	{
		// TODO Auto-generated method stub
		DayClosureReportDao dao = new DayClosureReportDao();
		List list = dao.getTodayCreditCustCardAmountDao(userType, userName);
		System.out.println("today Credit Cust Cash list size ====> "+list.size());
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			SaleReport bean = new SaleReport();
			
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setTodayCreditCustCardAmt("0");
			} else {
				bean.setTodayCreditCustCardAmt(o[1].toString());
				System.out.println("today cash AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
				System.out.println("today cash AMOUNT ==========> "+bean.getTodayCreditCustCardAmt());
			}
			map.put(bean.getTodayCreditCustCardAmt(), bean);
		}
		return map;
	}
	
	
}
