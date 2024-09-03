package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository1 extends JpaRepository<Upload,Integer>{
	
	public Upload findByUsername(String user);	
}