package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@ComponentScan("com.example.config") // Reemplaza con el paquete base de tu aplicación
public class RechargeService {

     private final RestTemplate restTemplate;

    @Autowired
    public RechargeService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void deleteRechargesByUserId(Long userId) {
        restTemplate.delete("http://recharge-api:8080/recharge/user/{userId}", userId);
       
    }
    
}
