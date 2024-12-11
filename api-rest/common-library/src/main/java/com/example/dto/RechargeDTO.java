package com.example.dto;

import java.time.LocalDateTime;

import com.example.enums.RechargePayment;
import com.example.enums.RechargeStatus;

public class RechargeDTO {
    public Long id;
    public Long userId;
    public Long vehicleId;
    public Long chargerpointId;
    public Double price;
    public Double kw;
    public RechargeStatus status;
    public RechargePayment payment;
    public LocalDateTime dateStart;
    public LocalDateTime dateEnd;
}

