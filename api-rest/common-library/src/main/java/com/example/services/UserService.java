package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.dto.UserDTO;

@Service
@ComponentScan("com.example.config") // Reemplaza con el paquete base de tu aplicación
public class UserService {
    
    private final RestTemplate restTemplate;

    @Autowired
    public UserService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public UserDTO getUserById(Long userId) {
        // Realiza una solicitud GET para obtener un usuario por su ID
        ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity("http://users-api:8080/users/{id}", UserDTO.class, userId);
        return responseEntity.getBody();
    }
    
    public UserDTO updateUser(Long userId, UserDTO user) {
        // Realiza una solicitud PUT para actualizar un usuario por su ID
        ResponseEntity<UserDTO> responseEntity = restTemplate.exchange(
            "http://users-api:8080/users/{id}",
            HttpMethod.PUT,
            new HttpEntity<>(user),
            UserDTO.class,
            userId // Pasa el valor de userId para reemplazar {id} en la URL
        );
    
        return responseEntity.getBody();
    }

    // Otros métodos relacionados con el servicio de usuarios...
}
