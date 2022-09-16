package com.example.jwtspring.dao;

import com.example.jwtspring.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
public interface ProductRepository extends JpaRepository<Product, Long> {
	public List<Product> findBySelectedIsTrue();
	public List<Product> findByNameContains(@Param("mc") String mc);
	/*public List<Product> findByCreated_atOrderByCreated_atDesc();*/
	
	@Query(value = "SELECT COUNT(*) from app_user", nativeQuery = true)
	public Object countuser();
	
	@Query(value = "SELECT COUNT(*) from category", nativeQuery = true)
	public Object countcat();
	
	@Query(value = "SELECT COUNT(*) from product", nativeQuery = true)
	public Object countproduct();
	
	@Query(value = "SELECT COUNT(*) from orders", nativeQuery = true)
	public Object countorder();


}
