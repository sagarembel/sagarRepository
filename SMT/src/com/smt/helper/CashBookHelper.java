package com.smt.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.bean.TotalCashBookReport;
import com.smt.dao.CashBookDao;
import com.smt.hibernate.CashBook;

public class CashBookHelper {

	/* register StockEntry */
	public void registerCashBookEntry(HttpServletRequest request, HttpServletResponse response) {

		String payToId = request.getParameter("payToId");
		String toPayNameId = request.getParameter("toPayNameId");
		String paymentTypeId = request.getParameter("paymentTypeId");
		String paymebtById = request.getParameter("paymebtById");
		String chequeNoId = request.getParameter("chequeNoId");
		String chequeDateId = request.getParameter("chequeDateId");
		String cardNoId = request.getParameter("cardNoId");
		String neftAccNoId = request.getParameter("neftAccNoId");
		String paymentAmountId = request.getParameter("paymentAmountId");
		String paymentReasonId = request.getParameter("paymentReasonId");

		CashBook cb = new CashBook();

		if (!"".equals(payToId)) {
			cb.setPayToId(payToId);
		} else {
			cb.setPayToId("N/A");
		}
		if (!"".equals(toPayNameId)) {
			cb.setToPayNameId(toPayNameId);
		} else {
			cb.setToPayNameId("N/A");
		}

		if (1 == 1) {
			SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
			Date newDate = new Date();
			cb.setPaymentDate(newDate);
			System.out.println("@@@@@@@@@@@@@@@ Payment DAte : " + cb.getPaymentDate());
		}

		if (!"".equals(paymentTypeId)) {
			cb.setPaymentTypeId(paymentTypeId);
		} else {
			cb.setPaymentTypeId("N/A");
		}
		if (!"".equals(paymebtById)) {
			cb.setPaymebtById(paymebtById);
		} else {
			cb.setPaymebtById("N/A");
		}
		if (!"".equals(chequeNoId)) {
			cb.setChequeNoId(Long.parseLong(chequeNoId));
		} else {
			cb.setChequeNoId(0);
		}
		if (!"".equals(chequeDateId)) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date adate = null;
			try {
				adate = format.parse(chequeDateId);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			cb.setChequeDateId(adate);
		} else {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			String dammyDate = "00-00-0000";
			Date adate = null;
			try {
				adate = format.parse(dammyDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			cb.setChequeDateId(adate);
		}

		if (!"".equals(cardNoId)) {
			cb.setCardNoId(Long.parseLong(cardNoId));
		} else {
			cb.setCardNoId(0);
		}

		if (!"".equals(neftAccNoId)) {
			cb.setNeftAccNoId(Long.parseLong(neftAccNoId));
		} else {
			cb.setNeftAccNoId(0);
		}

		if (!"".equals(paymentAmountId)) {
			cb.setPaymentAmountId(Double.parseDouble(paymentAmountId));
		} else {
			cb.setPaymentAmountId(0d);
		}

		if (!"".equals(paymentReasonId)) {
			cb.setPaymentReasonId(paymentReasonId);
		} else {
			cb.setPaymentReasonId("N/A");
		}

		CashBookDao dao = new CashBookDao();
		dao.regstierCashBookEntry(cb);
	}

	// getCustSuppEmpReports() method is used to get reports of cust, supp and
	public List getCustSuppEmpReports(HttpServletRequest request, HttpServletResponse response) {
		String customerType = request.getParameter("customerType");
		Map<Long, TotalCashBookReport> map = new HashMap<Long, TotalCashBookReport>();
		CashBookDao dao = new CashBookDao();
		List<TotalCashBookReport> cashbooklist = dao.getCashBookReports(customerType);
		return cashbooklist;
	}

	public List getOneDayPaymentReport(HttpServletRequest request, HttpServletResponse response) {

		String reportDate = request.getParameter("reportDate");
		Map<Long, TotalCashBookReport> map = new HashMap<Long, TotalCashBookReport>();

		CashBookDao dao = new CashBookDao();
		List<TotalCashBookReport> paymentList = dao.getOneDayPaymentReport(reportDate);

		return paymentList;

	}

	public List twoDayPaymentReport(HttpServletRequest request, HttpServletResponse response) {

		String reportDate1 = request.getParameter("reportDate1");
		String reportDate2 = request.getParameter("reportDate2");
		Map<Long, TotalCashBookReport> map = new HashMap<Long, TotalCashBookReport>();

		CashBookDao dao = new CashBookDao();
		List<TotalCashBookReport> paymentList = dao.twoDayPaymentReport(reportDate1, reportDate2);

		return paymentList;

	}

	// cash report for single date
	public List singleDateCashBook(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		try {
			adate = format.parse(fDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, CashBook> map = new HashMap<Long, CashBook>();

		CashBookDao dao = new CashBookDao();
		List<CashBook> exp1List = dao.singleDateCashBook(adate);

		return exp1List;
	}

	// cash report between two dates
	public List cashBookReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fisDate = request.getParameter("fisDate");
		String endDate = request.getParameter("endDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try {
			adate = format.parse(fisDate);
			bdate = format.parse(endDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, CashBook> map = new HashMap<Long, CashBook>();

		CashBookDao dao = new CashBookDao();
		List<CashBook> exp1List = dao.cashBookReportBetweenTwoDates(adate, bdate);

		return exp1List;
	}

}
