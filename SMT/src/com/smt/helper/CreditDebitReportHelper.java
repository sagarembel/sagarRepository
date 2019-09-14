package com.smt.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.bean.CreditDebitReportBean;
import com.smt.dao.CreditDebitReportDao;
import com.smt.dao.ExpenditurePaymentDao;

public class CreditDebitReportHelper
{
	public List getCreditDebitReportByTwoDate(HttpServletRequest request, HttpServletResponse response)
	{

		String startDateCD = request.getParameter("startDateCD");
		String endDateCD = request.getParameter("endDateCD");

		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		CreditDebitReportDao dao = new CreditDebitReportDao();
		List<CreditDebitReportBean> exp1List = dao.getExpensePaymentDetailByTwoDates(startDateCD, endDateCD);

		return exp1List;
	}
}
