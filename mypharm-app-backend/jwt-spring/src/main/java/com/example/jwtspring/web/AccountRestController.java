package com.example.jwtspring.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwtspring.entities.AppUser;
import com.example.jwtspring.service.AccountService;
@RestController
public class AccountRestController {
	@Autowired
	AccountService accountService;
	@PostMapping("/register")
	public AppUser register(@RequestBody RegisterForm userForm) {
		if(!userForm.getPassword().equals(userForm.getRepassword()))
			throw new RuntimeException("you must confirm your password");
		AppUser user=accountService.findUserByEmail(userForm.getEmail());
		if(user!=null)
			throw new RuntimeException("this user already exists");
		AppUser appUser=new AppUser();
		appUser.setEmail(userForm.getEmail());
		appUser.setUsername(userForm.getUsername());
		appUser.setPassword(userForm.getPassword());
		 accountService.saveUser(appUser);
		 accountService.addRoleToUser(userForm.getEmail(), "USER");
		 return appUser;
	}
	
	@GetMapping("/getusers/{email}")
	public AppUser getuserbyemail(@PathVariable("email") String email) {
		
	return accountService.findUserByEmail(email);
		 
		
	}
}
