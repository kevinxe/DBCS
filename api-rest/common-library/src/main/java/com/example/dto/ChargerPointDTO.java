package com.example.dto;

import com.example.enums.ChargerStatus;
import com.example.enums.ChargerType;
import com.example.enums.PlugType;

public class ChargerPointDTO {
    public Long id;
    public String address;
    public Double latitude;
    public Double longitude;
    public PlugType plugType;
    public ChargerType power;
    public ChargerStatus status;
}
