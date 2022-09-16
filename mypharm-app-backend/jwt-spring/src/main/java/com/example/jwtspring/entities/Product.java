package com.example.jwtspring.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.bytebuddy.utility.dispatcher.JavaDispatcher.Instance;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor

public class Product extends Auditable implements Serializable{
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@Column(unique = true)
	Long pid;
	String name;
	String description;
	double currentprice;
	@Transient
	int quantity=1;
	boolean promotion;
	boolean selected;
	boolean available;
	String photoName;
	/*
	 * @CreatedDate Date created_at;
	 */
	@ManyToOne 
	Category category;
	
	@JsonIgnore 
	public Category getCategory() {
		return this.category;
	}
	
	@JsonSetter
	public void setCategory(Category category)
	{
		this.category=category;
	}

}
