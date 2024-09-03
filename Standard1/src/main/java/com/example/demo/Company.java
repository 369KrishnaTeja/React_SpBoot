package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name="ABCD")
public class Company {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	String username;
	String password;
	String email;
	String companyname;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCompanyname() {
		return companyname;
	}
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
