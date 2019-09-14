package com.smt.helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.GetItemDetails;
import com.smt.dao.TempItemDetailDao;

public class TempItemDetailHelper {

	public List getItemDetailByCarNo(HttpServletRequest request, HttpServletResponse response) {

		String carNo = request.getParameter("carNo");

		Map<Long, GetItemDetails> map = new HashMap<Long, GetItemDetails>();

		TempItemDetailDao dao = new TempItemDetailDao();
		List<GetItemDetails> saleList = dao.getItemDetailsByTable(carNo);

		return saleList;

	}

	public void deleteItem(HttpServletRequest request, HttpServletResponse response) {

		TempItemDetailDao dao1 = new TempItemDetailDao();
		Long pk_temp_id = Long.parseLong(request.getParameter("pk_temp_id"));
		System.out.println("pk_temp_id" + pk_temp_id);
		dao1.updateTabaleStatus(pk_temp_id);
	}
}