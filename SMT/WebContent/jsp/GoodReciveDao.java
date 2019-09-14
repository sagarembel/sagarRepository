package com.smt.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.bean.CustomerBean;
import com.smt.bean.ItemList;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.TempItemDetail;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class GoodReciveDao
{
	public void regGoodReceive(GoodReceive gd)
	{
		// TODO Auto-generated method stub
		
		
		HibernateUtility hbu = null ;
		Session session  = null;
		Transaction transaction = null;
		
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			session.save(gd);
			transaction.commit();
			
		
		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {
			     
			//	Log.error("Error in transaction", ede);
			}
		}
		
		finally
		{
			if (session!=null) {
				hbu.closeSession(session);
				
			}
		}
		
	}
	

	
	public List getLastBarcodeNo()
	{	
		HibernateUtility hbu=null;
		Session session=null;
		List<BillBean> saleList=null;
		try
		{
			hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createSQLQuery("SELECT BillNo , BarcodeNo FROM goodreceive ORDER BY BarcodeNo DESC LIMIT 1");
			
			List<Object[]> list = query.list();
			 saleList= new ArrayList<BillBean>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				BillBean reports = new BillBean();
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				saleList.add(reports);	 
		}}
		catch(Exception e)
		{
			e.printStackTrace();	
		}finally
		{if(session!=null){
			session.close();	
		}
		}
		return saleList;	
		
		
	}

	public void updateQuantity(Long item_id,String quantity)
	{
		// TODO Auto-generated method stub
		
		HibernateUtility hbu=null;
		Session session=null;
		Transaction transaction =null;

		try
		{
			hbu = HibernateUtility.getInstance();
		    session = hbu.getHibernateSession();
		    transaction = session.beginTransaction();
		    
		    org.hibernate.Query query = session.createQuery("from GoodReceive where PkGoodRecId = :item_id ");
		    query.setParameter("item_id", item_id);
		    
		    GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
		    Long quant = uniqueResult.getQuantity();
		    
		    Long updatequnty = (long) (quant - Long.parseLong(quantity));
		    

		    GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(item_id));	 
   		
   		    updateStock.setQuantity(updatequnty);
   		 
   		    session.saveOrUpdate(updateStock);
   		    transaction.commit();
		 
		}
		catch(Exception e)
		{
			e.printStackTrace();	
		}finally
		{if(session!=null){
			session.close();	
		}
		}
	}
}
