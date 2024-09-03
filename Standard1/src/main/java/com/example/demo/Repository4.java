package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository4 extends JpaRepository<Appliedjobs,Integer>{
	public List<Appliedjobs> getByUsername(String user);
	public List<Appliedjobs> getByCompanyname(String user);
}
