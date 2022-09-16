package com.example.jwtspring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.jwtspring.entities.Client;

@CrossOrigin("*")
public interface ClientRepository extends JpaRepository<Client, Long> {

}