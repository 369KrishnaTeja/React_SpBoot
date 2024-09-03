package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name="Applied2")
public class Appliedjobs {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	String username;
	@Column(length = 100)
	String jobname;
	String companyname;
	String jobdesc;
	String status;
	
	public String getJobname() {
		return jobname;
	}
	public void setJobname(String jobname) {
		this.jobname = jobname;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCompanyname() {
		return companyname;
	}
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}
	public String getJobdesc() {
		return jobdesc;
	}
	public void setJobdesc(String jobdesc) {
		this.jobdesc = jobdesc;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
}
