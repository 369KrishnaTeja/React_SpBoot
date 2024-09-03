package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository3 extends JpaRepository<Job,Integer>{

	public List<Job> findByCompanyname(String user1);

	public List<Job> findByJobdesc(String abc);

}
