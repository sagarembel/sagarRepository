package com.smt.helper;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.bean.CreditDebitReportBean;
import com.smt.bean.ExpenditurePaymentDetail;
import com.smt.dao.ExpenditureDetailsDao;
import com.smt.dao.ExpenditurePaymentDao;
import com.smt.dao.SupplierAccountDetailsDao;
import com.smt.hibernate.CashBankBookDataDateWise;
import com.smt.hibernate.ExpenditureDetailsBean;
import com.smt.hibernate.ExpenditurePaymentBean;
import com.smt.utility.HibernateUtility;

public class ExpenditurePaymentHelper
{
	public void regExpensePayment(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		String fkRootexpId = request.getParameter("fkRootexpId");
		String serviceProvider = request.getParameter("serviceProvider");
		String paymentType = request.getParameter("paymentType");
		String crDbAmount = request.getParameter("crDbAmount");		
		String contactNumber = request.getParameter("contactNumber");
		String accountantName = request.getParameter("accountantName");
		String expdDate = request.getParameter("expdDate");		

		System.out.println("paymentType ==> "+paymentType);
		System.out.println("crDbAmount ==> "+crDbAmount);
		
		ExpenditurePaymentBean bean = new ExpenditurePaymentBean();
		
		bean.setFkExpDetailId(Long.parseLong(fkRootexpId));
		bean.setServiceProvider(serviceProvider);
		bean.setAccountantName(accountantName);
		bean.setContactNumber(Long.parseLong(contactNumber));
		bean.setTotalAmount(Double.parseDouble(crDbAmount));
		bean.setPaymentType(paymentType);
		bean.setCrDbAmount(Double.parseDouble(crDbAmount));		

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		System.out.println("expdDate ===> "+expdDate);
		bean.setInsertDate(dateFormat1.parse(expdDate));
		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		dao.addExpensePayment(bean);
	}

	public List getExpensePaymentDetailsForSingleDate(HttpServletRequest request, HttpServletResponse response)
	{
		String fDate = request.getParameter("fDate");
		System.out.println(fDate + "Single Date");

		Map<Long, ExpenditurePaymentDetail> map = new HashMap<Long, ExpenditurePaymentDetail>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<ExpenditurePaymentDetail> expList = dao.getExpensePaymentDetailsForSingleDate(fDate);

		return expList;
	}

	public List getExpensePaymentDetailByTwoDate(HttpServletRequest request, HttpServletResponse response)
	{
		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");
		String fkRootexpId = request.getParameter("fkRootexpId");

		Map<Long, ExpenditurePaymentDetail> map = new HashMap<Long, ExpenditurePaymentDetail>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<ExpenditurePaymentDetail> exp1List = dao.getExpensePaymentDetailByTwoDates(fDate, tDate, fkRootexpId);

		return exp1List;

	}

	public List getTodayCreditDebitReport(HttpServletRequest request, HttpServletResponse response)
	{
		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<CreditDebitReportBean> exp1List = dao.getTodayCreditDebitReport();

		return exp1List;
	}

	public List getTodayCreditDebitReport1(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<CreditDebitReportBean> exp1List = dao.getTodayCreditDebitReport1();

		return exp1List;
	}

	public List creditdebitForsingleDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<CreditDebitReportBean> exp1List = dao.creditdebitForsingleDate(fDate);

		return exp1List;

	}

	public List creditdebitForsingleDate1(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<CreditDebitReportBean> exp1List = dao.creditdebitForsingleDate1(fDate);

		return exp1List;
	}

	public List creditdebitForBetTowDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fisDate");
		String nDate = request.getParameter("endDate");

		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<CreditDebitReportBean> exp1List = dao.creditdebitForBetTowDate(fDate, nDate);

		return exp1List;
	}

	public List creditdebitForBetTowDate1(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fisDate");
		String nDate = request.getParameter("endDate");

		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ExpenditurePaymentDao dao = new ExpenditurePaymentDao();
		List<CreditDebitReportBean> exp1List = dao.creditdebitForBetTowDate1(fDate, nDate);

		return exp1List;
	}
	
	
	public Map getTodayExpdCreditAmount()
	{
		// TODO Auto-generated method stub
		ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
		List list = dao.getTodayExpdCreditAmount();
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			ExpenditureDetailsBean bean = new ExpenditureDetailsBean();
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setExpdCreditAmount(0.0d);
			} else {
				bean.setExpdCreditAmount(Double.parseDouble(o[1].toString()));
				System.out.println("EXPD CREDIT AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
			}
			map.put(bean.getExpdCreditAmount(), bean);
		}
		return map;
	}
	
	public Map getTodayExpdDebitAmount()
	{
		// TODO Auto-generated method stub
		ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
		List list = dao.getTodayExpdDebitAmount();
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			ExpenditureDetailsBean bean = new ExpenditureDetailsBean();
			System.out.println(Arrays.toString(o));
			if (o[1] == null)
			{
				bean.setExpdDebitAmount(0.0d);
			} else {
				bean.setExpdDebitAmount(Double.parseDouble(o[1].toString()));
				System.out.println("EXPD debit AMOUNT ==========> "+Double.parseDouble(o[1].toString()));
			}
			map.put(bean.getExpdDebitAmount(), bean);
		}
		return map;
	}
}
