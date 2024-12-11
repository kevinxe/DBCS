package com.dbcs.entrega.Model;

import java.time.LocalDateTime;

import com.example.dto.RechargeDTO;
import com.example.enums.RechargePayment;
import com.example.enums.RechargeStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Recharge extends RechargeDTO{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long vehicleId;
    private Long chargerpointId;
    private Double price;
    private Double kw;
    private RechargeStatus status;
    private RechargePayment payment;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;


    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
   
    public Long getUserId() {
        return userId;
    }
   
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getVehicleId() {
        return vehicleId;
    }
    
    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }
    
    public Long getChargerpointId() {
        return chargerpointId;
    }
    
    public void setChargerpointId(Long chargerpointId) {
        this.chargerpointId = chargerpointId;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Double getKw() {
        return kw;
    }
    
    public void setKw(Double kw) {
        this.kw = kw;
    }
    
    public RechargeStatus getStatus() {
        return status;
    }
    
    public void setStatus(RechargeStatus status) {
        this.status = status;
    }   
    
    public RechargePayment getPayment() {
        return payment;
    }
    
    public void setPayment(RechargePayment payment){
        this.payment=payment;
    }


    
    public LocalDateTime getDateStart() {
        return dateStart;
    }
    
    public void setDateStart(LocalDateTime dateStart) {
        this.dateStart = dateStart;
    }
    
    public LocalDateTime getDateEnd() {
        return dateEnd;
    }
    
    public void setDateEnd(LocalDateTime dateEnd) {
        this.dateEnd = dateEnd;
    }


    
}


