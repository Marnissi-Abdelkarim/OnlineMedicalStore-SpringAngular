package com.example.jwtspring.web;

import lombok.Data;

@Data
public class RegisterForm {
	String email;
	String username;
	String password;
	String repassword;

}
