package com.example.jwtspring.web;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.jwtspring.dao.ClientRepository;
import com.example.jwtspring.dao.OrderItemRepository;
import com.example.jwtspring.dao.OrderRepository;
import com.example.jwtspring.dao.ProductRepository;
import com.example.jwtspring.entities.Client;
import com.example.jwtspring.entities.Order;
import com.example.jwtspring.entities.OrderItem;
import com.example.jwtspring.entities.Product;

import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
public class OrderController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    
    
    @PostMapping("/orders")
    public Order saveOrder(@RequestBody OrderForm orderForm){
        Client client=new Client();
        client.setFirstname(orderForm.getClient().getFirstname());
        client.setLastname(orderForm.getClient().getLastname());

        client.setEmail(orderForm.getClient().getEmail());
        client.setAddress(orderForm.getClient().getAddress());
        client.setPhoneNumber(orderForm.getClient().getPhoneNumber());
        client.setUsername(orderForm.getClient().getUsername());
        client=clientRepository.save(client);
        System.out.println(client.getId());

        Order order=new Order();
        order.setClient(client);
        order.setDate(new Date());
        order=orderRepository.save(order);
        double total=0;
        for(OrderProduct p:orderForm.getProducts()){
            OrderItem orderItem=new OrderItem();
            orderItem.setOrder(order);
            Product product=productRepository.findById(p.getId()).get();
            orderItem.setProduct(product);
            orderItem.setPrice(product.getCurrentprice());
            orderItem.setQuantity(p.getQuantity());
            orderItemRepository.save(orderItem);
            total+=p.getQuantity()*product.getCurrentprice();
        }
        order.setTotalAmount(total);
        return orderRepository.save(order);
    }
    
    
    @GetMapping(path="/order/{id}")
    public Order confirmPayment(@PathVariable(value = "id") Long id )
    {
		Order or=orderRepository.findById(id).get();
		or.setPayementConfirmed(true);
		return orderRepository.save(or);
    	
    }
    @GetMapping(path="/bestProducts")
    public List<Product> bestP(){
    	List<Product> l=new ArrayList<Product>();
    	for (Object id : this.orderItemRepository.bestProducts()) {
    		l.add(this.productRepository.findById(((BigInteger) id).longValue() ).get());
			
		}
    	return l;
    	
    	
    }
    @GetMapping(path = "/nbusers")
    public Long nbusers() {
    	return ((BigInteger)this.productRepository.countuser()).longValue();
    }
    @GetMapping(path = "/nbproducts")
    public Long nbproducts() {
    	return ((BigInteger)this.productRepository.countproduct()).longValue();
    }
    @GetMapping(path = "/nbcategories")
    public Long nbcategories() {
    	return ((BigInteger)this.productRepository.countcat()).longValue();
    }
    @GetMapping(path = "/nborders")
    public Long nborders() {
    	return ((BigInteger)this.productRepository.countorder()).longValue();
    }

}
