package com.smt.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.GetItemDetails;
import com.smt.hibernate.TempItemDetail;
import com.smt.utility.HibernateUtility;

public class TempItemDetailDao {

	public void regTempData(TempItemDetail tid) {

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			session.save(tid);
			transaction.commit();

		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {

			}
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
	}

	public List getAllItemEntry() {
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			Query query = session.createQuery("from TempItemDetail where activeYN='y' and current_date=:dateobj");
			query.setParameter("dateobj", dateobj);
			list = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}

	public List getItemDetailsByTable(String carNo) {

		HibernateUtility hbu = null;
		Session session = null;
		List<GetItemDetails> saleReports = null;
		List<Object[]> list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			Date dateobj = new Date();
			System.out.println(dateobj);
			String status = "Y";
			Query query = session.createQuery("select item_id, cat_id, itemName, salePrice, quantity ,pk_temp_id, barcodeNo, categoryName, hsnSacNo, vat, igst from TempItemDetail where activeYN=:status AND current_date=:dateobj AND carNo=:carNo");
			query.setParameter("dateobj", dateobj);
			query.setParameter("status", status);
			query.setParameter("carNo", carNo);
			list = query.list();
			saleReports = new ArrayList<GetItemDetails>(0);
			for (Object[] object : list) {
				System.out.println("Result" + Arrays.toString(object));
				GetItemDetails reports = new GetItemDetails();
				reports.setItem_id((Long) object[0]);

				reports.setItemName((String) object[2]);
				reports.setSalePrice((Double) object[3]);
				reports.setQuantity((Long) object[4]);
				reports.setPk_temp_id((Long) object[5]);
				reports.setBarcodeNo((Long) object[6]);
				reports.setCategoryName((String) object[7]);
				reports.setHsnSacNo((String) object[8]);
				reports.setVat((Double) object[9]);
				reports.setIgst((Double) object[10]);
				reports.setTaxAmount(0d);
				saleReports.add(reports);

			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.flush();
			hbu.closeSession(session);
		}
		return saleReports;

	}

	public void updateTabaleStatus(Long pk_temp_id) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			TempItemDetail itemDetail = (TempItemDetail) session.get(TempItemDetail.class, new Long(pk_temp_id));
			itemDetail.setActiveYN('N');
			session.saveOrUpdate(itemDetail);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}
}
