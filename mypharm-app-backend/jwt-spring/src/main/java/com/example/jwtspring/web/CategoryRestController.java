package com.example.jwtspring.web;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwtspring.dao.CategoryRepository;
import com.example.jwtspring.entities.Category;
import com.example.jwtspring.entities.Product;

@RestController
public class CategoryRestController {
	@Autowired
	CategoryRepository categoryRepository;
	
	@GetMapping("/categories")
	public List<Category> listCategories(){
		return categoryRepository.findAll();
	}
	
	@PostMapping("/categories")
	public Category save(@RequestBody Category c) {
		return categoryRepository.save(c);
	}
	
	@GetMapping(path="/photoCategory/{id}",produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getPhotoC(@PathVariable("id") Long id) throws Exception{
        Category c=categoryRepository.findById(id).get();
       return Files.readAllBytes(Paths.get(System.getProperty("user.home")+"/Documents/APPLICATION/mypharm-app-front/src/assets/images/imgC/"+c.getPhotoName()));
    }
	
	@GetMapping(path="categories/{id}")
	public Category categorybyid(@PathVariable("id") Long id)
	{
		return  categoryRepository.findById(id).get();
	}
	
	@GetMapping(path="categories/{id}/products")
	public Collection<Product> categorybyidproducts(@PathVariable("id") Long id)
	{
		return  categoryRepository.findById(id).get().getProducts();
	}

}
