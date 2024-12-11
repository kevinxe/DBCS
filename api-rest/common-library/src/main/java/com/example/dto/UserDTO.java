package com.example.dto;

import java.time.LocalDateTime;
import java.util.List;

public class UserDTO {
    public Long id;
    public String name;
    public String firstName;
    public String lastName;
    public String email;
    public String password;
    public String paymentCard;
    public Boolean enabled;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
    public List<VehicleDTO> vehicles;
}
