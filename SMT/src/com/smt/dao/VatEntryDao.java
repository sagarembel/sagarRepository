package com.smt.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.GetCreditCustomerDetails;
import com.smt.bean.TaxDetailsList;
import com.smt.hibernate.VatEntry;
import com.smt.utility.HibernateUtility;

public class VatEntryDao
{
	public void registerVatEntry(VatEntry vat)
	{
		// TODO Auto-generated method stub

		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try
		{
			hbu = com.smt.utility.HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			session.save(vat);
			transaction.commit();
		}
		finally
		{
			hbu.closeSession(session);
		}
	}
	
	public List getTaxDetailsList()
	{
		// TODO Auto-generated method stub
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		try {
			hbu = com.smt.utility.HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createQuery("from VatEntry");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getTaxDetailsList()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getTaxList()
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<TaxDetailsList> taxList = null;
		long k=0;
		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("SELECT ve.pk_vat_id, ve.vat_name, ve.vat_percentage, ve.start_Price, ve.end_Price FROM vat_entry ve;");
			List<Object[]> list = query.list();

			taxList = new ArrayList<TaxDetailsList>(0);

			for (Object[] object : list)
			{
				TaxDetailsList reports = new TaxDetailsList();
				k++;
				reports.setSrNo(String.valueOf(k));
				reports.setTaxPkId(object[0].toString());
				reports.setTaxName(object[1].toString());
				reports.setTaxPercentage(object[2].toString());
				reports.setStartPrice(object[3].toString());
				reports.setEndPrice(object[4].toString());
				taxList.add(reports);

			}
		} catch (RuntimeException e) {

		} finally {

			hbu.closeSession(session);
		}
		return taxList;
	}	
	
	
}
