package com.smt.bean;

public class ClientDetails
{
	static String email = "";
	static String shopName = "";
	static String embelEmail = "";
	static String embelEmailPassword = "";

	public static String getEmail()
	{
		//email = "pehenavabaramati@gmail.com";
		email = "sagarembel@gmail.com";
		//email = "cr7rohanchhajed7@gmail.com";
		//email = "embel12@mailinator.com";
		//email = "embelbackup@gmail.com";
		//email = "vivekghantalwar@gmail.com";
		return email;
	}	
	public static String getShopName()
	{
		shopName = "PEHENAVA BARAMATI";
		return shopName;
	}	
	
	public static String getEmbelEmail()
	{
		embelEmail = "embelmessanger@gmail.com";
		return embelEmail;
	}	
	
	public static String getEmbelEmailPassword()
	{
		embelEmailPassword = "embel@123";
		return embelEmailPassword;
	}	
}