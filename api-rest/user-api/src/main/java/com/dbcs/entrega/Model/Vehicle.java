package com.dbcs.entrega.Model;



import com.example.enums.PlugType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Vehicle {

    @Id 
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

    
    public Long getId() {
        return id;
    }

    
    public void setId(Long id) {
        this.id = id;
    }

    
    @JsonIgnore
    public String getCarRegistration() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCarRegistration'");
    }

    
    @JsonIgnore
    public void setCarRegistration(String carRegistration) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCarRegistration'");
    }

    
    @JsonIgnore
    public String getBrand() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBrand'");
    }

    
    @JsonIgnore
    public void setBrand(String brand) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setBrand'");
    }

    
    @JsonIgnore
    public String getModel() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getModel'");
    }

    
    @JsonIgnore
    public void setModel(String model) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setModel'");
    }

    
    @JsonIgnore
    public Double getCapacity() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCapacity'");
    }

    
    @JsonIgnore
    public void setCapacity(Double capacity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCapacity'");
    }

    
    @JsonIgnore
    public PlugType getPlugType() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPlugType'");
    }

    
    @JsonIgnore
    public void setPlugType(PlugType plugType) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setPlugType'");
    }

    @JsonIgnore
    public User getUser() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUser'");
    }

    @JsonIgnore
    public void setUser(User user) {
        this.user=user;
    }

    
}
