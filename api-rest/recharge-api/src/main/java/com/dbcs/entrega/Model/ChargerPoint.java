package com.dbcs.entrega.Model;



import com.example.enums.ChargerStatus;
import com.example.enums.ChargerType;
import com.example.enums.PlugType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ChargerPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    private Double latitude;
    private Double longitude;
    private PlugType plugType;
    private ChargerType power;
    private ChargerStatus status;

    
    public Long getId() {
        return id;
    }

    
    public void setId(Long id) {
        this.id = id;
    }

    
    public String getAddress() {
        return address;
    }

    
    public void setAddress(String address) {
        this.address = address;
    }

    
    public Double getLatitude() {
        return latitude;
    }

    
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    
    public Double getLongitude() {
        return longitude;
    }

    
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    
    public PlugType getPlugType() {
        return plugType;
    }

    
    public void setPlugType(PlugType plugType) {
        this.plugType = plugType;
    }

    
    public ChargerType getPower() {
        return power;
    }

    
    public void setPower(ChargerType power) {
        this.power = power;
    }

    
    public ChargerStatus getStatus() {
        return status;
    }

    
    public void setStatus(ChargerStatus status) {
        this.status = status;
    }
}
