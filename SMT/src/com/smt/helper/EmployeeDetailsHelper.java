package com.smt.helper;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.Transaction;
import com.smt.bean.GetEmployeeDetails;
import com.smt.bean.userDetaile;
import com.smt.dao.CategoryDao;
import com.smt.dao.EmployeeDetailsDao;
import com.smt.dao.SupplierDetailDao;
import com.smt.hibernate.EmployeeDetailsBean;
import com.smt.utility.HibernateUtility;

public class EmployeeDetailsHelper {
	Date newDate = null;

	public boolean employeeDetails(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("EMPLOYEEDETAILS HELPER");

		System.out.println("In helper");

		String address = request.getParameter("address");

		String contactNo = request.getParameter("contactNo");

		String emailId = request.getParameter("emailId");

		String firstName = request.getParameter("firstName");

		String joiningDate = request.getParameter("joiningDate");

		String lastName = request.getParameter("lastName");

		String middleName = request.getParameter("middleName");

		String salary = request.getParameter("salary");

		String zipCode = request.getParameter("zipCode");

		EmployeeDetailsBean edb = new EmployeeDetailsBean();

		if (!"".equals(joiningDate)) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date newDate = null;
			try {
				newDate = format.parse(joiningDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			edb.setJoiningDate(newDate);
		} else {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date adate = null;
			try {
				adate = format.parse("2016-09-20");
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			edb.setJoiningDate(adate);
		}

		if (!"".equals(contactNo)) {
			edb.setContactNo(Long.parseLong(contactNo));
		} else {
			edb.setContactNo(Long.parseLong("00"));
		}

		if (!"".equals(zipCode)) {
			edb.setZipCode(Long.parseLong(zipCode));

			System.out.println("zip == =  =" + zipCode);
		} else {
			edb.setZipCode(Long.parseLong("00"));
			System.out.println("zip == =  = in else " + zipCode);
		}

		if (!"".equals(emailId)) {
			edb.setEmailId(emailId);
		} else {
			edb.setEmailId("N/A");
		}

		if (!"".equals(salary)) {
			edb.setSalary(Double.parseDouble(salary));
		} else {
			edb.setSalary(Double.parseDouble("00"));
		}

		edb.setFirstName(firstName.trim());
		edb.setMiddleName(middleName.trim());
		edb.setLastName(lastName.trim());
		edb.setAddress(address);
		edb.setResignDate(null);
		
		EmployeeDetailsDao edo = new EmployeeDetailsDao();
		edo.valEmployeeDetails(edb);

		return true;
	}

	public Map getEmployeeDetailsForEdit(Long empId)
	{
		System.out.println("into helper class");
		EmployeeDetailsDao dao1 = new EmployeeDetailsDao();
		List catList = dao1.getAllEmployeeDetailsForEdit(empId);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);

			GetEmployeeDetails bean = new GetEmployeeDetails();

			bean.setFirstName(o[0].toString());
			bean.setMiddleName(o[1].toString());
			bean.setLastName(o[2].toString());
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			try {
				Date newDate = format.parse(o[3].toString());
				bean.setJoiningDate(newDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			;

			bean.setEmail(o[4].toString());
			bean.setSalary(Double.parseDouble(o[5].toString()));
			bean.setContactNo((BigInteger) o[6]);
			bean.setAddresst(o[7].toString());
			bean.setZipCode((BigInteger) o[8]);
			map.put(bean.getFirstName(), bean);
		}
		System.out.println("out of helper return map : " + map);
		return map;

	}

	public void editEmployeeDetail(HttpServletRequest request, HttpServletResponse response)
	{
		String EmployeeId = request.getParameter("EmployeeId");
		String firstName = request.getParameter("firstName");
		String middleName = request.getParameter("middleName");
		String lastName = request.getParameter("lastName");
		String joiningDate = request.getParameter("joiningDate");
		String emailId = request.getParameter("emailId");
		String salary = request.getParameter("salary");
		String contactNo = request.getParameter("contactNo");
		String address = request.getParameter("address");
		String zipCode = request.getParameter("zipCode");		
		String oldJoiningDate = request.getParameter("oldJoiningDate");
		System.out.println("JOINING DATE :::::::::::::::: "+joiningDate);
		String resignDate = request.getParameter("resignDate");
		System.out.println("RESIGNATION DATE :::::::::::::::: "+resignDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");		
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();
		long EmployeeID = Long.parseLong(EmployeeId);
		EmployeeDetailsBean det = (EmployeeDetailsBean) session.get(EmployeeDetailsBean.class, EmployeeID);

		det.setAddress(address);
		det.setFirstName(firstName.trim());
		det.setLastName(lastName.trim());
		det.setMiddleName(middleName.trim());
		det.setContactNo(Long.parseLong(contactNo));
		if (emailId != "")
		{
			det.setEmailId(emailId);
		}
		else
		{
			det.setEmailId("N/A");
		}

		det.setSalary(Double.parseDouble(salary));
		det.setZipcode(Long.parseLong(zipCode));

		if (!"".equals(joiningDate))
		{	
			Date newDate = null;
			try
			{
				newDate = format.parse(joiningDate);
			} catch (ParseException e1)
			{
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			det.setJoiningDate(newDate);
			System.out.println("Date in helper=  = =" + newDate);
		}
		
		if (!"".equals(resignDate))
		{
			Date newDate = null;
			try
			{
				newDate = format.parse(resignDate);
			}
			catch (ParseException e1)
			{
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			det.setResignDate(newDate);
			System.out.println("Date in helper=  = =" + newDate);
		}		

		session.saveOrUpdate(det);
		transaction.commit();

		System.out.println("Record updated successfully.");

	}
	// get All User Category
		public List getUserTypes() {

			EmployeeDetailsDao dao = new EmployeeDetailsDao();
			return dao.getAllUserType();

		}
		
	// get all user name on user type
		
		public Map getAllUserName(String uType) {
			// TODO Auto-generated method stub
			EmployeeDetailsDao dao = new EmployeeDetailsDao();
			List list = dao.getAllUserName(uType);
			Map map = new HashMap();
			
			for (int i = 0; i < list.size(); i++) {
				Object[] object = (Object[]) list.get(i);
				userDetaile bean = new userDetaile();
				System.out.println(Arrays.toString(object));

				/*String pendingBal = o[2].toString();
				if (pendingBal.equals("0")) {
					continue;

				} else {
					bean.setBillNo(o[0].toString());
				}
				// bean.setTotalAmount((Double)o[1]);
*/				
				bean.setPkUserId(Long.parseLong(object[0].toString()));
				bean.setUserName(object[1].toString());
				
				System.out.println("***************" + object[0]);
				map.put(bean.getPkUserId(), bean);

			}
			return map;
		}
}
