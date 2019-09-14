package com.smt.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.smt.dao.CarEntryDao;
import com.smt.hibernate.CarEntry;

public class CarEntryHelper {

	public void userCreate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub

		String carNo = request.getParameter("carNo");
		String contactNo = request.getParameter("contactNo");
		String ownerName = request.getParameter("ownerName");

		CarEntry car = new CarEntry();

		car.setCarNo(carNo);
		car.setContactNo(Long.parseLong(contactNo));
		car.setOwnerName(ownerName);
		car.setActiveYN('Y');

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date newDate = new Date();
		Date formatedDate = null;
		try {
			formatedDate = format.parse(String.valueOf(newDate));
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		car.setDateid(newDate);

		CarEntryDao dao = new CarEntryDao();
		dao.registerCarEntry(car);

	}

	public List getAllCarNo() {
		CarEntryDao dao1 = new CarEntryDao();
		return dao1.getAllCarNo();
	}

	public void CustomerBillCopy(HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("billNo");
		System.out.println("----------------Bill No before session create::" + billNo);
		HttpSession session3 = request.getSession();
		Long billNo2 = Long.parseLong(billNo);
		session3.setAttribute("CustomerBillNo", billNo2);
		System.out.println("----------------Bill No After session create::" + session3.getAttribute("CustomerBillNo"));

	}
}
