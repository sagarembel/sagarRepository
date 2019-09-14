package com.smt.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.jfree.util.Log;

import com.smt.utility.HibernateUtility;

public class LoginDetailsDao
{
	public List getAllExpenseNames()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from UserDetail");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllExpenseNames", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;

	}
}
