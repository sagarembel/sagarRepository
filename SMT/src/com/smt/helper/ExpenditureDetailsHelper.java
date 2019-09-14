package com.smt.helper;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.dao.ExpenditureDetailsDao;
import com.smt.hibernate.ExpenditureDetailsBean;

public class ExpenditureDetailsHelper {

	public void expenseDetails(HttpServletRequest request, HttpServletResponse response) {

		String expenseName = request.getParameter("expenseName");

		ExpenditureDetailsBean bean = new ExpenditureDetailsBean();

		bean.setExpenseName(expenseName);

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date dateobj = new Date();
		System.out.println(dateFormat1.format(dateobj));

		bean.setInsertDate(dateobj);

		ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
		dao.addExpenseDetails(bean);
	}

}
