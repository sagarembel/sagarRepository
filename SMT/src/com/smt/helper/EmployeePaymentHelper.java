package com.smt.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.bean.EmployeePaymentDetail;
import com.smt.dao.EmployeePaymentDao;
import com.smt.hibernate.EmployeePaymentBean;

public class EmployeePaymentHelper {

	public void regEmployeePayment(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("IN helper");

		String employee = request.getParameter("employee");

		String empPay = request.getParameter("empPay");
		System.out.println(empPay);

		String personName = request.getParameter("personName");

		String reason = request.getParameter("reason");

		String paymentMode = request.getParameter("paymentMode");

		String chequeNum = request.getParameter("chequeNum");

		String cardNum = request.getParameter("cardNum");

		String accNum = request.getParameter("accNum");

		String bankName = request.getParameter("bankName");

		String nameOnCheck = request.getParameter("nameOnCheck");

		String paymentType = request.getParameter("paymentType");
		
		String empPayDate = request.getParameter("empPayDate");

		EmployeePaymentBean bean = new EmployeePaymentBean();

		bean.setFk_employee_id(Long.parseLong(employee));
		bean.setPaymentType(paymentType);
		bean.setCredit(Double.parseDouble(empPay));

		if (!"".equals(personName)) {
			bean.setPersonName(personName);
		} else {
			bean.setPersonName("N/A");
		}
		bean.setReason(reason);

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		bean.setInsertDate(dateFormat1.parse(empPayDate));

		// payment details
		if (paymentMode == null) {
			bean.setPaymentMode("N/A");
		} else {
			bean.setPaymentMode(paymentMode);
		}

		if (paymentMode.equals("cheque")) {

			if (chequeNum == null) {
				bean.setChequeNum("N/A");
			} else {
				bean.setChequeNum(chequeNum);
			}

			if (nameOnCheck == null) {
				bean.setNameOnCheck("N/A");
			} else {
				bean.setNameOnCheck(nameOnCheck);
			}
		} else if (paymentMode.equals("card")) {

			int cardNumLength = cardNum.length();
			if (cardNumLength > 0) {

				bean.setCardNum(Long.parseLong(cardNum));
			} else {
				bean.setCardNum(null);
			}
		}

		else if (paymentMode.equals("neft")) {
			if (bankName == null) {
				bean.setBankName("N/A");
			} else {
				bean.setBankName(bankName);
			}

			int accNumLength = accNum.length();
			if (accNumLength > 0) {
				bean.setAccNum(Long.parseLong(accNum));

			} else {
				bean.setAccNum(null);
			}
		}

		EmployeePaymentDao dao = new EmployeePaymentDao();
		dao.regEmpPayment(bean);

	}

	public List getEmployeePaymentDetailsForSingleDate(HttpServletRequest request, HttpServletResponse response)
	{
		String fDate = request.getParameter("fDate");
		System.out.println(fDate + "Single Date");

		Map<Long, EmployeePaymentDetail> map = new HashMap<Long, EmployeePaymentDetail>();

		EmployeePaymentDao dao = new EmployeePaymentDao();
		List<EmployeePaymentDetail> empList = dao.getempPaymentDetailsForSingleDate(fDate);

		return empList;
	}

	public List getEmpPaymentByTwoDate(HttpServletRequest request, HttpServletResponse response) {

		String fDate = request.getParameter("fisDate");
		String tDate = request.getParameter("endDate");
		String fkRootempId = request.getParameter("fkRootempId");

		Map<Long, EmployeePaymentDetail> map = new HashMap<Long, EmployeePaymentDetail>();

		EmployeePaymentDao dao = new EmployeePaymentDao();
		List<EmployeePaymentDetail> emp1List = dao.getEmployeePaymentDetailsDateWise(fDate, tDate, fkRootempId);

		return emp1List;

	}

}
