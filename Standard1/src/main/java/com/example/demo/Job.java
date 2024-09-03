package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name="Job1")
public class Job {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	@Column(length = 100)
	String jobname;
	String jobdesc;
	String companyname;
	public String getCompanyname() {
		return companyname;
	}
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}
	String jobloc;
	String jobsal;
	String jobtype;
	
	public String getJobname() {
		return jobname;
	}
	public void setJobname(String jobname) {
		this.jobname = jobname;
	}
	public String getJobdesc() {
		return jobdesc;
	}
	public void setJobdesc(String jobdesc) {
		this.jobdesc = jobdesc;
	}
	public String getJobloc() {
		return jobloc;
	}
	public void setJobloc(String jobloc) {
		this.jobloc = jobloc;
	}
	public String getJobsal() {
		return jobsal;
	}
	public void setJobsal(String jobsal) {
		this.jobsal = jobsal;
	}
	public String getJobtype() {
		return jobtype;
	}
	public void setJobtype(String jobtype) {
		this.jobtype = jobtype;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
}
