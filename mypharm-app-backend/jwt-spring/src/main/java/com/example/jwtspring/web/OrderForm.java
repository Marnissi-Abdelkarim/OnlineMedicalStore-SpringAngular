package com.example.jwtspring.web;


import lombok.Data;
import java.util.ArrayList;
import java.util.List;

import com.example.jwtspring.entities.Client;
@Data
public class OrderForm {
    private Client client=new Client();
    private List<OrderProduct> products=new ArrayList<>();
}
@Data
class OrderProduct{
    private Long id;
    private int quantity;

}
