package com.example.jwtspring.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.jwtspring.entities.Task;
//@RepositoryRestResource
public interface TaskRepository extends JpaRepository<Task, Long> {

}
