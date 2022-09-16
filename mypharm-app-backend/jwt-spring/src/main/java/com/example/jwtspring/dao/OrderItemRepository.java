package com.example.jwtspring.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.jwtspring.entities.OrderItem;
import com.example.jwtspring.entities.Product;

@CrossOrigin("*")
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
	
	@Query(value = "SELECT product_id\r\n"
			+ "FROM order_item\r\n"
			+ "GROUP BY  product_id\r\n"
			+ "ORDER BY COUNT(id) DESC ;", nativeQuery = true)
	public List<Object> bestProducts();


}
