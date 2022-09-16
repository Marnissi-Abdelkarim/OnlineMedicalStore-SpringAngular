package com.example.jwtspring.service;

import com.example.jwtspring.entities.AppRole;
import com.example.jwtspring.entities.AppUser;

public interface AccountService {
public AppUser saveUser(AppUser user);
public AppRole saveRole(AppRole role);
public void addRoleToUser(String email,String rolename);
public AppUser findUserByEmail(String email);

}
