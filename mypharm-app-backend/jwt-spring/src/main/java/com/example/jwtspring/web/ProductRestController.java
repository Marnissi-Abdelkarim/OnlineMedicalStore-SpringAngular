package com.example.jwtspring.web;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwtspring.dao.CategoryRepository;
import com.example.jwtspring.dao.ProductRepository;
import com.example.jwtspring.entities.Category;
import com.example.jwtspring.entities.Product;


@RestController
public class ProductRestController {
	@Autowired
	private ProductRepository productRepository;
	private CategoryRepository categoryRepository;
	
	
	
	@GetMapping(path="/photoProduct/{id}",produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getPhotoP(@PathVariable("id") Long id) throws Exception{
        Product p=productRepository.findById(id).get();
					//put ur current path instead of /Documents/APPLICATION
       return Files.readAllBytes(Paths.get(System.getProperty("user.home")+"/Documents/APPLICATION/mypharm-app-front/src/assets/images/imgP/"+p.getPhotoName()));
    }
	
	@GetMapping(path="/products/{id}")
	public Optional<Product> productbyid(@PathVariable("id") Long id) {
		return productRepository.findById(id);
	}
	
	@GetMapping("/products")
	public List<Product> listProduct(){
		return productRepository.findAll();
	}
	
	@GetMapping("/productsbyname")
	public List<Product> listProductByName( @RequestParam("mc") String mc){
		return productRepository.findByNameContains(mc);
	}
	
	@PostMapping("/products")
	public Product save(@RequestBody Product p) {
		return productRepository.save(p);
	}

	@GetMapping("/NewProducts")
	public List<Product> listTasksS(){
		return productRepository.findAll(Sort.by("createdat").descending());
	}

	
	@GetMapping(path="/productcategory/{id}")
	public String productcategory(@PathVariable("id") Long id) {
		return productRepository.findById(id).get().getCategory().getName();
	}
	@GetMapping(path="/productcategoryid/{id}")
	public Long productcategoryid(@PathVariable("id") Long id) {
		return productRepository.findById(id).get().getCategory().getId();
	}
	
	
}
