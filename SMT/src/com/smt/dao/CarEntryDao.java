package com.smt.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillCopy;
import com.smt.hibernate.CarEntry;
import com.smt.utility.HibernateUtility;

public class CarEntryDao {

	public void registerCarEntry(CarEntry car) {
		// TODO Auto-generated method stub

		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = com.smt.utility.HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			session.save(car);
			transaction.commit();

		} finally {
			hbu.closeSession(session);
		}

	}

	public List getAllCarNo()

	{
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = com.smt.utility.HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			Query query = session.createQuery("from CarEntry where activeYN='y' and dateid=:dateobj");
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

	public void updateCarStatus(Long carID) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			CarEntry car = (CarEntry) session.get(CarEntry.class, new Long(carID));
			car.setActiveYN('N');
			session.saveOrUpdate(car);
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
	}

	// get bill nos and customer name to get Bill copy

	public List getBillNoAndNames() {
		HibernateUtility hbu = null;
		Session session = null;

		List<BillCopy> billList = null;
		List<Object[]> list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select BillNo, OwnerName from customerbill group by BillNo order by BillNo desc;");
			list = query.list();
			billList = new ArrayList<BillCopy>(0);

			for (Object[] objects : list) {
				BillCopy bean = new BillCopy();

				bean.setBillNo(Long.parseLong(objects[0].toString()));
				bean.setCustName((String) objects[1]);

				billList.add(bean);
			}
		} catch (RuntimeException e) {

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return billList;
	}

}
