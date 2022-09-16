package com.example.jwtspring.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwtspring.entities.AppRole;

public interface RoleRepository extends JpaRepository<AppRole, Long>{
	AppRole findByRoleName(String rolename);
}
