package com.smt.bean;

public class CustomerFeedbackBean {

	private Long cust_id;
	private String customer_name;
	private Long mobile_no;
	private String email;
	private String occupation;
	private Long rating;
	private String feedback;

	public CustomerFeedbackBean() {
		// TODO Auto-generated constructor stub
	}

	CustomerFeedbackBean(Long cust_id, String customer_name, Long mobile_no, String email, String occupation, Long rating, String feedback) {

		this.cust_id = cust_id;
		this.customer_name = customer_name;
		this.mobile_no = mobile_no;
		this.email = email;
		this.occupation = occupation;
		this.rating = rating;
		this.feedback = feedback;
	}

	public Long getCust_id() {
		return cust_id;
	}

	public void setCust_id(Long cust_id) {
		this.cust_id = cust_id;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public Long getMobile_no() {
		return mobile_no;
	}

	public void setMobile_no(Long mobile_no) {
		this.mobile_no = mobile_no;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public Long getRating() {
		return rating;
	}

	public void setRating(Long rating) {
		this.rating = rating;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

}
