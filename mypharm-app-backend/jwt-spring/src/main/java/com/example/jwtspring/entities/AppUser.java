package com.example.jwtspring.entities;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class AppUser {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@Column(unique = true)
	String email;
	String username;
	
	String password;
	@ManyToMany(fetch = FetchType.EAGER )
	Collection<AppRole> roles =new ArrayList<>();
	@JsonSetter
	public void setPassword(String password) {
		this.password=password;
	

	}
	@JsonIgnore //pour ne pas retourner la password hash lors de registre
	public String getPassword() {
		return this.password;
	}
	
}
