package com.example.jwtspring.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwtspring.entities.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long>{
	AppUser findByEmail(String email);

}
