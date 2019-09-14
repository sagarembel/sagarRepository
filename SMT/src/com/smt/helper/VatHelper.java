package com.smt.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.dao.CarEntryDao;
import com.smt.dao.VatEntryDao;
import com.smt.hibernate.CarEntry;
import com.smt.hibernate.VatEntry;

public class VatHelper {

	public void createVat(HttpServletRequest request, HttpServletResponse response) {
		String vatName = request.getParameter("vatName");
		String vatPer = request.getParameter("vatPer");
		String fromPrice = request.getParameter("fromPrice");
		String toPrice = request.getParameter("toPrice");

		VatEntry vat = new VatEntry();

		if (vatName != null) {
			vat.setVatName(vatName);
		} else {
			vat.setVatName(vatName);
		}

		if (vatPer != null) {
			vat.setVatPercentage(Double.parseDouble(vatPer));
		} else {
			vat.setVatPercentage(0d);
		}
		
		if (fromPrice != null) {
			vat.setStartPrice(Double.parseDouble(fromPrice));
		} else {
			vat.setEndPrice(0d);
		}
		
		if (toPrice != null) {
			vat.setEndPrice(Double.parseDouble(toPrice));
		} else {
			vat.setEndPrice(0d);
		}

		VatEntryDao dao = new VatEntryDao();
		dao.registerVatEntry(vat);

	}

}
