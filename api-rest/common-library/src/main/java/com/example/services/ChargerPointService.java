package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.dto.*;
import com.example.enums.PlugType;

@Service
public class ChargerPointService {
    
    private final RestTemplate restTemplate;
    private final String chargingPointsBaseUrl = "http://chargingpoints-api:8080/chargerpoints";

    @Autowired
    public ChargerPointService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ChargerPointDTO[] getChargingPointsByPlugType(PlugType plugType) {
        // Realiza una solicitud GET para obtener puntos de carga por tipo de enchufe
        ResponseEntity<ChargerPointDTO[]> responseEntity = restTemplate.getForEntity(
            chargingPointsBaseUrl + "?plugType=" + plugType,
            ChargerPointDTO[].class
        );
        return responseEntity.getBody();
    }

    public ChargerPointDTO getChargingPointById(Long chargingPointId) {
        // Realiza una solicitud GET para obtener un punto de carga por su ID
        ResponseEntity<ChargerPointDTO> responseEntity = restTemplate.getForEntity(
            chargingPointsBaseUrl + "/{id}",
            ChargerPointDTO.class,
            chargingPointId
        );
        return responseEntity.getBody();
    }



    // Otros métodos relacionados con el servicio de puntos de carga...
}
