package com.dbcs.entrega.Model;


import com.example.dto.VehicleDTO;
import com.example.enums.PlugType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity
public class Vehicle  extends VehicleDTO{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String carRegistration;
    private String brand;
    private String model;
    private Double capacity;
    private PlugType plugType;
    private Long userId;

    
    public Long getId() {
        return id;
    }

    
    public void setId(Long id) {
        this.id = id;
    }

    
    public String getCarRegistration() {
        return carRegistration;
    }

    
    public void setCarRegistration(String carRegistration) {
        this.carRegistration = carRegistration;
    }

    
    public String getBrand() {
        return brand;
    }

    
    public void setBrand(String brand) {
        this.brand = brand;
    }

    
    public String getModel() {
        return model;
    }

    
    public void setModel(String model) {
        this.model = model;
    }

    
    public Double getCapacity() {
        return capacity;
    }

    
    public void setCapacity(Double capacity) {
        this.capacity = capacity;
    }

    
    public PlugType getPlugType() {
        return plugType;
    }

    
    public void setPlugType(PlugType plugType) {
        this.plugType = plugType;
    }


    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long user) {
        this.userId = user;
    }
}
