package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.dto.VehicleDTO;


@Service
@ComponentScan("com.example.config") // Reemplaza con el paquete base de tu aplicación
public class VehicleService {
    
    private final RestTemplate restTemplate;

    @Autowired
    public VehicleService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public VehicleDTO[] getVehiclesByUserId(Long userId) {
        ResponseEntity<VehicleDTO[]> responseEntity = restTemplate.getForEntity("http://vehicles-api:8080/vehicles?userId={id}", VehicleDTO[].class, userId);
        return responseEntity.getBody();
    }

    public void deleteVehiclesByUserId(Long userId) {
        restTemplate.delete("http://vehicles-api:8080/vehicles/user/{userId}", userId);
       
    }

    public VehicleDTO getVehicleById(Long vhId) {
        System.out.println("El id que llega es: " +vhId);
         ResponseEntity<VehicleDTO> responseEntity = restTemplate.getForEntity("http://vehicles-api:8080/vehicles/{id}", 
         VehicleDTO.class, vhId);
         return responseEntity.getBody();
       
    }

    // Otros métodos relacionados con el servicio de vehículos...
}
