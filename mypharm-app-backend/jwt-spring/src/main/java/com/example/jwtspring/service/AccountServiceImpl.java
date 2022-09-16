package com.example.jwtspring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.jwtspring.dao.RoleRepository;
import com.example.jwtspring.dao.UserRepository;
import com.example.jwtspring.entities.AppRole;
import com.example.jwtspring.entities.AppUser;
@Service
@Transactional
public class AccountServiceImpl implements AccountService {
	//@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder();
	/*
	 * @Bean public BCryptPasswordEncoder getBCPE() { return new
	 * BCryptPasswordEncoder();
	 * 
	 * }
	 */
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Override
	public AppUser saveUser(AppUser user) {
		String hashPW=bCryptPasswordEncoder.encode(user.getPassword());
		user.setPassword(hashPW);
		return userRepository.save(user);
	}

	@Override
	public AppRole saveRole(AppRole role) {
		return roleRepository.save(role);
	}

	@Override
	public void addRoleToUser(String email, String rolename) {
		AppUser user=userRepository.findByEmail(email);
		AppRole role=roleRepository.findByRoleName(rolename);
		user.getRoles().add(role);
		
		
	}

	@Override
	public AppUser findUserByEmail(String email) {
		
		return userRepository.findByEmail(email);
	}

}
