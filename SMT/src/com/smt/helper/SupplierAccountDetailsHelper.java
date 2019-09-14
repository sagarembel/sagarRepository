package com.smt.helper;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.GetSupplierDetails;
import com.smt.dao.SupplierAccountDetailsDao;
import com.smt.hibernate.CashBankBookDataDateWise;
import com.smt.hibernate.SupplierAccountDetailsBean;
import com.smt.utility.HibernateUtility;

public class SupplierAccountDetailsHelper {

	public void suppAccDetails(HttpServletRequest request, HttpServletResponse response) {

		String fk_supplier_id = request.getParameter("fk_supplier_id");
		String billNo = request.getParameter("billNo");
		String totalAmt = request.getParameter("totalAmt");

		SupplierAccountDetailsBean sadb = new SupplierAccountDetailsBean();

		sadb.setFk_supplier_id(Long.parseLong(fk_supplier_id));
		sadb.setBillNo(Long.parseLong(billNo));
		sadb.setTotalAmt(Double.parseDouble(totalAmt));

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date dateobj = new Date();
		System.out.println(dateFormat1.format(dateobj));

		sadb.setInsertDate(dateobj);

		SupplierAccountDetailsDao sadd = new SupplierAccountDetailsDao();
		sadd.supplierAccount(sadb);

	}

	public Map getAllBillBySuppliers(String supplierId) {

		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getAllBillBySuppliers(supplierId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetSupplierDetails bean = new GetSupplierDetails();
			System.out.println(Arrays.toString(o));
			bean.setBillNo(o[0].toString());
			bean.setInsertDate(o[1].toString());
			System.out.println("11111***************" + o[0]);
			map.put(bean.getBillNo(), bean);

		}
		return map;
	}

	// total amount on cash
	public Map getTotalAmtByBillNo(String billNo, String supplierId)
	{
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTotalAmtByBillNoForCustomer(billNo, supplierId);
		Map map = new HashMap();
		String newTotal = "";
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			GetSupplierDetails bean = new GetSupplierDetails();
			if(o[0] == null)
			{
				newTotal = "0";
			}
			else
			{
				newTotal = (o[0].toString());
			}
			Double newTotal1 = Double.valueOf(newTotal);
			
			if(i == (list.size()-1))
			{
				if(o[0] == null)
				{
					bean.setTotalAmt(0.0);
				}
				else
				{
					bean.setTotalAmt(Double.parseDouble(o[0].toString()));
				}
			}
			else
			{
				continue;
			}
			System.out.println("222222***************" + o[0]);
			map.put(bean.getTotalAmt(), bean);
		}
		return map;
	}

	public Map getRemainingAmtByBillNo(String billNo, String supplier, String totalAmount)
	{
		DecimalFormat df = new DecimalFormat("#.##");
		Double total = 0.0;
		Double diffrenceTotal = 0.0;
		String lastTotalAmt = null;
		String lastBalance = null;
		System.out.println("bill no = " + billNo);
		System.out.println("supplier = " + supplier);
		Double totalAmt1 = 0.0;
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getbalanceAmtByBillNo(billNo, supplier);
		Map map = new HashMap();
		int sic = list.size();
		if (sic == 0)
		{
			GetSupplierDetails bean = new GetSupplierDetails();
			Double totalAmt = dao.getTotalAmt(billNo, supplier);
			bean.setBalance(totalAmt);
			map.put(bean.getBalance(), bean);
		}
		else
		{
			for (int i = 0; i < list.size(); i++)
			{
				Object[] o = (Object[]) list.get(i);
				GetSupplierDetails bean = new GetSupplierDetails();
				String payment = o[0].toString();
				String grossTotal = o[1].toString();
				
				if( i == (list.size()-1))
				{
					lastTotalAmt = (o[2].toString());
					lastBalance = (o[3].toString());
				}
				else
				{
					continue;
				}
				Double lastAmt = Double.valueOf(lastTotalAmt);
				Double totalAmt = Double.valueOf(totalAmount);
				Double latestbalanceAmt = Double.valueOf(lastBalance);
				
				if(totalAmount != lastTotalAmt)
				{
					diffrenceTotal = lastAmt - totalAmt;
					System.out.println("Difference Total"+diffrenceTotal);
				}
				
				Double newBal = Double.valueOf(payment);
				Double newGrossTotal = Double.valueOf(grossTotal);
				total = total + newBal;
				totalAmt1 = latestbalanceAmt - diffrenceTotal;

				System.out.println(totalAmt1 + "NEW BALANCE");
				if(i == (list.size()-1))
				{
					bean.setBalance(Double.parseDouble(df.format(totalAmt1)));
				}
				else
				{
					continue;
				}
				System.out.println("3333333***************" + totalAmt1);
				System.out.println("4444444***************Payment Done" + o[0]);
				map.put(bean.getBalance(), bean);
			}
		}

		return map;
	}

	public Map getYesterdarTotalAmount() {
		// TODO Auto-generated method stub
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getYesterdarTotalAmount();
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
			System.out.println(Arrays.toString(o));
			bean.setTotalAmount(Double.parseDouble(o[1].toString()));
			map.put(bean.getTotalAmount(), bean);

		}

		SupplierAccountDetailsHelper h = new SupplierAccountDetailsHelper();
		h.creditDebitAmount();
		return map;

	}

	public void creditDebitAmount() {

		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getYesterdarTotalAmount();

		if (list.size() == 0) {

			String yesterday = null;
			final Calendar cal = Calendar.getInstance();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			cal.add(Calendar.DATE, -1);
			yesterday = dateFormat.format(cal.getTime());
			System.out.println("Yesterday Date ===+++ " + yesterday);

			CashBankBookDataDateWise cs = new CashBankBookDataDateWise();

			cs.setDate(yesterday);
			cs.setTotalAmount(0.0d);

			SupplierAccountDetailsDao doa = new SupplierAccountDetailsDao();
			doa.registeryesterdayTotal(cs);

		} else {
			for (int i = 0; i < list.size(); i++) {
				Object[] o = (Object[]) list.get(i);

				String yesDate = o[0].toString();
				Double yesTotal = Double.parseDouble(o[1].toString());

				String yesterday = null;
				final Calendar cal = Calendar.getInstance();
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				cal.add(Calendar.DATE, -1);

				yesterday = dateFormat.format(cal.getTime());

				System.out.println("Yesterday Datjhgjhe ===+++ " + yesterday);

				if (yesDate.equals(yesterday)) {

					System.out.println("hello shreemant");
					break;

				} else {
					String credit = "credit";
					String debit = "debit";
					SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
					Date dateobj = new Date();
					String todayDate = dateFormat1.format(dateobj);
					System.out.println("Today Date :::: " + todayDate);
					HibernateUtility hbu = HibernateUtility.getInstance();
					Session session = hbu.getHibernateSession();

					Query query = session.createSQLQuery("select onDate , DATEDIFF(:todayDate,:yesDate) from cashbankbooktable");

					query.setParameter("yesDate", yesDate);
					query.setParameter("todayDate", todayDate);
					List<Object[]> list1 = query.list();
					String diff = null;
					for (Object[] objects : list1) {

						diff = (objects[1].toString());
						System.out.println("date Difference is ==++ " + diff);

					}
					Integer datediff = Integer.parseInt(diff);

					for (int j = 1; j < datediff; j++) {

						String diffDate = null;
						int abc = datediff - j;
						System.out.println("shree == ++" + abc);
						final Calendar calc = Calendar.getInstance();
						SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
						calc.add(Calendar.DATE, -abc);
						diffDate = dateFormat2.format(calc.getTime());
						System.out.println("diff Dates ::::  " + diffDate);

						//Query query1 = session.createSQLQuery("select bill_no, sum(payment) from supplier_payment where paymentType=:credit and insert_date=:diffDate");
						Query query1 = session.createSQLQuery("select pk_supplier_payment_id, sum(payment) from supplier_payment where paymentType=:credit and insert_date=:diffDate");

						query1.setParameter("credit", credit);
						query1.setParameter("diffDate", diffDate);
						Double suppTotal = 0d;
						List<Object[]> list2 = query1.list();
						for (Object[] objects : list2) {
							System.out.println("objects  ==  " + Arrays.toString(objects));
							System.out.println("Size  ==  " + list2.size());
							if (objects[1] == null) {
								suppTotal = 0.0d;
							} else {
								suppTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("Supplier Credit Amount ==++ " + suppTotal);
						}
						//Query query2 = session.createSQLQuery("select bill_no, sum(payment) from employee_payment where paymentType=:credit and insert_date=:diffDate");
						Query query2 = session.createSQLQuery("select fk_employee_id, sum(payment) from employee_payment where paymentType=:credit and insert_date=:diffDate");

						query2.setParameter("credit", credit);
						query2.setParameter("diffDate", diffDate);
						Double empTotal = 0d;
						List<Object[]> list3 = query2.list();
						for (Object[] objects : list3) {

							if (objects[1] == null) {
								empTotal = 0.0d;
							} else {
								empTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("Employee Credit Amount ==++ " + empTotal);
						}
						//Query query3 = session.createSQLQuery("select bill_no, sum(payment) from credit_customer_payment where paymentType=:credit and insert_date=:diffDate");
						Query query3 = session.createSQLQuery("select pk_credit_customer_id, sum(payment) from credit_customer_payment where paymentType=:credit and insert_date=:diffDate");

						query3.setParameter("credit", credit);
						query3.setParameter("diffDate", diffDate);
						Double custTotal = 0d;
						List<Object[]> list4 = query3.list();
						for (Object[] objects : list4) {

							if (objects[1] == null) {
								custTotal = 0.0d;
							} else {
								custTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("Customer Credit Amount ==++ " + custTotal);
						}

						Query query4 = session.createSQLQuery("select fk_expense_detail_id, sum(payment) from expenditure_payment where insert_date=:diffDate AND paymentType='credit'");

						query4.setParameter("diffDate", diffDate);
						Double expanTotal = 0.0d;
						List<Object[]> list5 = query4.list();
						for (Object[] objects : list5) {

							if (objects[1] == null) {
								expanTotal = 0.0d;
							} else {
								expanTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("expandecture Credit Amount ==++ " + expanTotal);
						}
						
						String qty = "0";
						/*Query query6 = session.createSQLQuery("select DISTINCT COUNT(DISTINCT BillNo), sum(DISTINCT  GrossTotal) from otherbill where Date=:diffDate");*/
						Query query6 = session.createSQLQuery("select DISTINCT COUNT(DISTINCT BillNo), sum(DISTINCT  GrossTotal),SUM(SalePrice),SUM(Discount)from otherbill where Date =:diffDate AND Quantity !=:qty");

						query6.setParameter("diffDate", diffDate);
						query6.setParameter("qty", qty);
						
						Double saleTotal1 = 0.0d;
						// by vikas
						Double saleP = 0.0d;
						Double saleD = 0.0d;
						List<Object[]> list7 = query6.list();
						// String diff = null;
						for (Object[] objects : list7) {

							if (objects[1] == null) {
								saleTotal1 = 0.0d;
							} else {
								//saleTotal1 = Double.parseDouble(objects[1].toString());
								/*by vikas*/
								saleP = Double.parseDouble(objects[2].toString());
								saleD = Double.parseDouble(objects[3].toString());
								
								saleTotal1 = saleP - saleD;
								
								
							}
							System.out.println("seed Pestiside Amount ==++ " + saleTotal1);
						}

						//Query query10 = session.createSQLQuery("select bill_no, sum(payment) from supplier_payment where paymentType=:debit and insert_date=:diffDate");
						Query query10 = session.createSQLQuery("select pk_supplier_payment_id, sum(payment) from supplier_payment where paymentType=:debit and insert_date=:diffDate");

						query10.setParameter("debit", debit);
						query10.setParameter("diffDate", diffDate);
						Double suppdebitTotal = 0.0d;
						List<Object[]> list10 = query10.list();
						for (Object[] objects : list10) {

							if (objects[1] == null) {
								suppdebitTotal = 0.0d;
							} else {
								suppdebitTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("Supplier debit Amount ==++ " + suppdebitTotal);
						}

						Query query11 = session.createSQLQuery("select fk_employee_id, sum(payment) from employee_payment where paymentType=:debit and insert_date=:diffDate");

						query11.setParameter("debit", debit);
						query11.setParameter("diffDate", diffDate);
						Double empdebitTotal = 0.0d;
						List<Object[]> list11 = query11.list();
						// String diff = null;
						for (Object[] objects : list11) {

							if (objects[1] == null) {
								empdebitTotal = 0.0d;
							} else {
								empdebitTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("Employee debit Amount ==++ " + empdebitTotal);
						}

						//Query query12 = session.createSQLQuery("select bill_no, sum(payment) from credit_customer_payment where paymentType=:debit and insert_date=:diffDate");
						Query query12 = session.createSQLQuery("select pk_credit_customer_id, sum(payment) from credit_customer_payment where paymentType=:debit and insert_date=:diffDate");
						query12.setParameter("debit", debit);
						query12.setParameter("diffDate", diffDate);
						Double custdebitTotal = 0.0d;
						List<Object[]> list12 = query12.list();
						for (Object[] objects : list12) {

							if (objects[1] == null) {
								custdebitTotal = 0.0d;
							} else {
								custdebitTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("Customer debit Amount ==++ " + custdebitTotal);
						}

						Query query13 = session.createSQLQuery("select fk_expense_detail_id, sum(payment) from expenditure_payment where insert_date=:diffDate  AND paymentType='debit'");

						query13.setParameter("diffDate", diffDate);
						Double expandebitTotal = 0d;
						List<Object[]> list13 = query13.list();
						for (Object[] objects : list13) {

							if (objects[1] == null) {
								expandebitTotal = 0.0d;
							} else {
								expandebitTotal = Double.parseDouble(objects[1].toString());
							}
							System.out.println("expandecture debit Amount ==++ " + expandebitTotal);
						}

						Query query7 = session.createSQLQuery("SELECT onDate , totalAmount FROM cashbankbooktable ORDER BY pkLastCashId DESC LIMIT 1");

						Double previousTotal = 0.0d;
						List<Object[]> list8 = query7.list();
						for (Object[] objects : list8) {

							previousTotal = Double.parseDouble(objects[1].toString());

							System.out.println("cloth Amount ==++ " + saleTotal1);
						}

						Double finalTotal = (previousTotal + saleTotal1 + suppTotal + empTotal + custTotal + expanTotal) - (suppdebitTotal + empdebitTotal + custdebitTotal + expandebitTotal);

						CashBankBookDataDateWise cs1 = new CashBankBookDataDateWise();

						cs1.setDate(diffDate);
						cs1.setTotalAmount(finalTotal);

						SupplierAccountDetailsDao doa = new SupplierAccountDetailsDao();
						doa.registeryesterdayTotal(cs1);
					}

				}

			}
		}
	}

	public Map getTodaySaleTotalAmount() {

		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodaySaleTotalAmount();
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
			System.out.println(Arrays.toString(o));

			if (o[1] == null) {
				bean.setTotalAmount(0.0d);
			} else {
				bean.setTotalAmount(Double.parseDouble(o[1].toString()));
			}

			map.put(bean.getTotalAmount(), bean);

		}
		return map;
	}

	public Map getTodaySaleTotalAmount1(String userType, String userName)
	{
		DecimalFormat df = new DecimalFormat("#.##");
		// TODO Auto-generated method stub
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodaySaleTotalAmount1(userType, userName);
		List list2 = dao.getTodaySaleReturnTotalAmount(userType, userName);
		Double totAmt1 = 0.0;
		Map map = new HashMap();
		CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			
			System.out.println(Arrays.toString(o));
			Double totAmt = Double.parseDouble(df.format(Double.parseDouble(o[1].toString())));
			System.out.println("Today sale Amount  "+totAmt);
			totAmt1 = totAmt1 + totAmt;
			System.out.println("Today total sale"+totAmt1);
		}
		
		double totAmstR=0.0;
		for (int i = 0; i < list2.size(); i++)
		{
			Object[] o = (Object[]) list2.get(i);
			
			System.out.println(Arrays.toString(o));
			Double totAmt = Double.parseDouble(o[1].toString());
			totAmstR = totAmstR + totAmt;
			System.out.println("Today return sale"+totAmstR);
		}
		
		//totAmt1 = totAmt1 - totAmstR;
		
		//System.out.println("Today total Amount - today return amount ==> "+totAmstR);
		if(totAmt1 > 0 && totAmt1 != null)
		{
			bean.setTotalAmount(Double.parseDouble(df.format(totAmt1)));
		}
		else
		{
			bean.setTotalAmount(0.0);
		}

		map.put(bean.getTotalAmount(), bean);
		return map;
	}

	public Map getTodaySaleReturnTotalAmount(String userType, String userName) {
		// TODO Auto-generated method stub
		DecimalFormat df = new DecimalFormat("#.##");
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodaySaleReturnTotalAmount(userType, userName);
		Double totAmt1 = 0d;
		Map map = new HashMap();
		CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			
			Double totAmt = Double.parseDouble(o[1].toString());
			totAmt1 = totAmt1 + totAmt;
			System.out.println("TOTAL SALE RETURN AMOUNT ===========> "+totAmt1);
		}
		
		if(totAmt1 == null || totAmt1 == 0.0)
		{
			bean.setSaleReturnAmount("0");
		}
		else
		{
			bean.setSaleReturnAmount(df.format(totAmt1));
		}
		map.put(bean.getTotalAmount(), bean);
		
		return map;
	}
	
	public Map getTodayCreditTotalAmountHelper()
	{
		/*
		 DecimalFormat df = new DecimalFormat("#.##");
		// TODO Auto-generated method stub
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodaySaleTotalAmount1();
		List list2 = dao.getTodaySaleReturnTotalAmount();
		Double totAmt1 = 0.0;
		Map map = new HashMap();
		CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			
			System.out.println(Arrays.toString(o));
			Double totAmt = Double.parseDouble(df.format(Double.parseDouble(o[1].toString())));
			totAmt1 = totAmt1 + totAmt;
			System.out.println("Today total sale"+totAmt1);
		}
		
		double totAmstR=0.0;
		for (int i = 0; i < list2.size(); i++)
		{
			Object[] o = (Object[]) list2.get(i);
			
			System.out.println(Arrays.toString(o));
			Double totAmt = Double.parseDouble(o[1].toString());
			totAmstR = totAmstR + totAmt;
			System.out.println("Today return sale"+totAmstR);
		}
		
		totAmt1 = totAmt1 - totAmstR;
		
		System.out.println("Today total Amount - today return amount ==> "+totAmstR);
		
		bean.setTotalAmount(Double.parseDouble(df.format(totAmt1)));
		map.put(bean.getTotalAmount(), bean);
		return map;
		 */
		
		// TODO Auto-generated method stub
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodayCreditTotalAmountDao();
		List list2 = dao.getTodayCreditReturnTotalAmountDao();
		DecimalFormat df = new DecimalFormat("#.##");
		Double totAmt1 = 0.0;
		Map map = new HashMap();
		CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			
			Double totAmt = Double.parseDouble(o[1].toString());
			totAmt1 = totAmt1 + totAmt;
		}
		
		double totAmstR=0.0;
		for (int i = 0; i < list2.size(); i++)
		{
			Object[] o = (Object[]) list2.get(i);
			
			System.out.println(Arrays.toString(o));
			Double totAmt = Double.parseDouble(o[1].toString());
			totAmstR = totAmstR + totAmt;
			System.out.println("Today return sale"+totAmstR);
		}
		
		//totAmt1 = totAmt1 - totAmstR;
		
		if(totAmt1 > 0)
		{
			bean.setCreditSaleAmount(df.format(totAmt1));
		}
		else
		{
			bean.setCreditSaleAmount("0");
		}
		
		map.put(bean.getTotalAmount(), bean);

		
		return map;
	}
	
	public Map getTodayCreditReturnTotalAmountHelper()
	{
		// TODO Auto-generated method stub
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodayCreditReturnTotalAmountDao();
		Double totAmt1 = 0.0;
		DecimalFormat df = new DecimalFormat("#.##");
		Map map = new HashMap();
		CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			
			Double totAmt = Double.parseDouble(o[1].toString());
			totAmt1 = totAmt1 + totAmt;
			}
		if(totAmt1 == null || totAmt1 == 0)
		{
			bean.setCreditRerturnAmount("0");
		}
		else if(totAmt1 > 0)
		{
			bean.setCreditRerturnAmount(df.format(totAmt1));
		}
			map.put(bean.getTotalAmount(), bean);

		
		return map;
	}
	
	
	
	public Map getTodayPurchaseReturnTotalAmount() {
		// TODO Auto-generated method stub
		DecimalFormat df =  new DecimalFormat("#.##");
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodayPurchaseReturnTotalAmount();
		Double totAmt1 = 0.0;
		Map map = new HashMap();
		CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			
			Double totAmt = Double.parseDouble(o[1].toString());
			totAmt1 = totAmt1 + totAmt;
			System.out.println(Arrays.toString(o));
		}
		
		if(totAmt1 == null || totAmt1 == 0)
		{
			bean.setPurchaseReturnAmount("0");
		}
		else if(totAmt1 > 0)
		{
			bean.setPurchaseReturnAmount(df.format(totAmt1));
		}
		
		map.put(bean.getTotalAmount(), bean);
		return map;
	}
	
	public Map getTodayPurchaseTotalAmount()
	{
		// TODO Auto-generated method stub
		SupplierAccountDetailsDao dao = new SupplierAccountDetailsDao();
		List list = dao.getTodayPurchaseTotalAmount();
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			CashBankBookDataDateWise bean = new CashBankBookDataDateWise();
			System.out.println(Arrays.toString(o));
			if (o[1] == null) {
				bean.setTotalAmount(0.0d);
			} else {
				bean.setTotalAmount(Double.parseDouble(o[1].toString()));
			}
			map.put(bean.getTotalAmount(), bean);

		}
		return map;
	}

}
