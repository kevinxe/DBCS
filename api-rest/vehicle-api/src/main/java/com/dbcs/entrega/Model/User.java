package com.dbcs.entrega.Model;

import java.time.LocalDateTime;
import java.util.List;

import com.example.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties
public class User extends UserDTO{
     private List<Vehicle> vehicles;
     private Long id;
     private Boolean enabled;
     private String paymentCard;

    
     public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Boolean getEnabled() {
        return enabled;
    }
    
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    
    public String getPaymentCard() {
        return paymentCard;
    }
    
    public void setPaymentCard(String paymentCard) {
        this.paymentCard = paymentCard;
    }



    
    @JsonIgnore
    public String getName() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getName'");
    }

    
   @JsonIgnore
    public void setName(String name) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setName'");
    }

    
    @JsonIgnore
    public String getFirstName() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFirstName'");
    }

    
    @JsonIgnore
    public void setFirstName(String firstName) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFirstName'");
    }

    
    @JsonIgnore
    public String getLastName() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getLastName'");
    }

    
   @JsonIgnore
    public void setLastName(String lastName) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setLastName'");
    }

    
    @JsonIgnore
    public String getEmail() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEmail'");
    }

    
    @JsonIgnore
    public void setEmail(String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setEmail'");
    }

    
    @JsonIgnore
    public String getPassword() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPassword'");
    }

    
    @JsonIgnore
    public void setPassword(String password) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setPassword'");
    }


    
    @JsonIgnore
    public LocalDateTime getCreatedAt() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCreatedAt'");
    }

    
    @JsonIgnore
    public void setCreatedAt(LocalDateTime createdAt) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCreatedAt'");
    }

    
    @JsonIgnore
    public LocalDateTime getUpdatedAt() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUpdatedAt'");
    }

    
    @JsonIgnore
    public void setUpdatedAt(LocalDateTime updatedAt) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setUpdatedAt'");
    }

    public void setVehiculos(List<Vehicle> l){
        this.vehicles=l;

    }

    public List<Vehicle> getVehicles(){
        return this.vehicles;
    }
    
}
