package com.example.jwtspring.dao;

import com.example.jwtspring.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.jwtspring.entities.Category;



@CrossOrigin("*")
public interface CategoryRepository extends JpaRepository<Category, Long> {
  

}
