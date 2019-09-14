package com.smt.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class UserDetailDao {

	public void registerUser(UserDetail userDetail) {
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(userDetail);
			transaction.commit();
		} catch (RuntimeException e) {

			try {
				transaction.rollback();

			} catch (RuntimeException rbe) {

				Log.error("Couldn't roll back transaction", rbe);
			}

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
	}

	public List getAlluserName() {
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from UserDetail");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAlluserName()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}
	
	public List getAllUsersToEditDao(String typeId) {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT pk_user_id, userName from user_details WHERE typeId = '"+typeId+"'");
			list = query.list();
			System.out.println("In Dao List is" + list);
		} catch (RuntimeException e) {
			Log.error("Error in getSubCategoriesByRootcategory(String mainCatId)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;

	}
	
	

}
