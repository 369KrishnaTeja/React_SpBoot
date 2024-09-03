package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository2 extends JpaRepository<Company,Integer>{
	
	public Company findByUsername(String username);

}