package com.smt.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.EmployeePaymentDetail;
import com.smt.hibernate.EmployeePaymentBean;
import com.smt.utility.HibernateUtility;

public class EmployeePaymentDao {

	public void regEmpPayment(EmployeePaymentBean bean) {

		System.out.println("IN DAO");
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(bean);
			transaction.commit();
			System.out.println("Successful");
		} catch (RuntimeException e) {

			try {
				transaction.rollback();
			} catch (RuntimeException e2) {

				Log.error("Error in regEmpPayment", e2);
			}
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

	// Employee Payment for single Date
	public List<EmployeePaymentDetail> getempPaymentDetailsForSingleDate(String fDate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<EmployeePaymentDetail> empPaymentList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select first_name, last_name, payment, payment_mode, insert_date, person_name,paymentType, reason, cheque_num FROM employee_details RIGHT JOIN employee_payment ON employee_details.pk_empoyee_id = employee_payment.fk_employee_id WHERE DATE(insert_date)=:isInsertDate");
			query.setParameter("isInsertDate", fDate);
			List<Object[]> list = query.list();

			empPaymentList = new ArrayList<EmployeePaymentDetail>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));

				EmployeePaymentDetail empreports = new EmployeePaymentDetail();
				empreports.setFirstName(object[0].toString());
				empreports.setLastName(object[1].toString());
				empreports.setPaymentAmount(Double.parseDouble(object[2].toString()));
				empreports.setPaymentMode(object[3].toString());
				empreports.setInsertDate((object[4].toString()));
				empreports.setAccountantName(object[5].toString());
				empreports.setPaymentType(object[6].toString());
				empreports.setReason((object[7].toString()));
				empreports.setChequeNo(object[8].toString());
				empPaymentList.add(empreports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return empPaymentList;

	}

	// employee payment details for two dates
	public List<EmployeePaymentDetail> getEmployeePaymentDetailsDateWise(String fDate, String tDate, String fkRootempId) {

		System.out.println(fDate + "first Date In dao");
		System.out.println(tDate + "Second Date In dao");
		HibernateUtility hbu = null;
		Session session = null;
		List<EmployeePaymentDetail> emp1List = null;
		try {
			Long empId = Long.parseLong(fkRootempId);

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select first_name, last_name, payment, payment_mode, insert_date, person_name, paymentType, reason, cheque_num FROM employee_details RIGHT JOIN employee_payment ON employee_details.pk_empoyee_id = employee_payment.fk_employee_id WHERE fk_employee_id =:empId AND insert_date BETWEEN '" + fDate + "' AND '" + tDate + "'");
			query2.setParameter("empId", empId);
			List<Object[]> list = query2.list();
			emp1List = new ArrayList<EmployeePaymentDetail>(0);

			for (Object[] object : list) {

				EmployeePaymentDetail empreports = new EmployeePaymentDetail();

				empreports.setFirstName(object[0].toString());
				empreports.setLastName(object[1].toString());
				empreports.setPaymentAmount(Double.parseDouble(object[2].toString()));
				empreports.setPaymentMode(object[3].toString());
				empreports.setInsertDate((object[4].toString()));
				empreports.setAccountantName(object[5].toString());
				empreports.setPaymentType((object[6].toString()));
				empreports.setReason((object[7].toString()));
				empreports.setChequeNo(object[8].toString());
				emp1List.add(empreports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return emp1List;

	}

}
