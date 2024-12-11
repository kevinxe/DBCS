package com.dbcs.entrega.Controller;


import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dbcs.entrega.Model.Vehicle;
import com.dbcs.entrega.Repository.VehicleRepository;
import com.example.dto.ChargerPointDTO;
import com.example.services.ChargerPointService;
import com.example.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;


    @Autowired
    private UserService userService;


    @Autowired
    private ChargerPointService chargerPointService;

    // GET /vehicles
    @GetMapping
    @ResponseBody
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // GET /vehicles/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .map(vehicle -> ResponseEntity.ok().body(vehicle))
                .orElse(ResponseEntity.notFound().build());
    }

        // POST /vehicles //MODIFICADO PARA DESACOPLAR
        @PostMapping
        public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
            try {
                // Intenta guardar el vehículo
                Vehicle savedVehicle = vehicleRepository.save(vehicle);
                // Llama al servicio para actualizar el estado del usuario
                userService.updateUser(savedVehicle.getUserId(), userService.getUserById(savedVehicle.getUserId()));
    
                return ResponseEntity.ok(savedVehicle);
            } catch (Exception e) {
                
                return ResponseEntity.notFound().build();
            }
        }


     // DELETE /vehicles/{id} //MODIFICADO PARA DESACOPLAR
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
	    return vehicleRepository.findById(id).map(vehicle -> {
		// Elimina el vehículo
		vehicleRepository.deleteById(id);

		// Llama al servicio de usuarios para actualizar el estado del usuario
		userService.updateUser(vehicle.getUserId(), userService.getUserById(vehicle.getUserId()));

		return ResponseEntity.ok().build();
	    }).orElse(ResponseEntity.notFound().build());
	}

    // GET /vehicles/{id}/chargerpoints
    @GetMapping("/{id}/chargerpoints")
    public List<ChargerPointDTO> getChargerPointsForVehicle(@PathVariable Long id) {
        Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
        if (vehicleOptional.isPresent()) {
            try {
                // Obtener la información del vehículo
                Vehicle vehicle = vehicleOptional.get();
                
                // Llamada al servicio ChargingPointService para obtener puntos de carga
                ChargerPointDTO[] chargerPoints = chargerPointService.getChargingPointsByPlugType(vehicle.getPlugType());
                
                return Arrays.asList(chargerPoints);
            } catch (Exception e) {
                // Manejo de la excepción (puedes ser más específico)
                return Collections.emptyList();
            }
        } else {
            return Collections.emptyList();
        }
    }

      // GET /vehicles?userId={id}
        @GetMapping(params = "userId")
        public List<Vehicle> getVehiclesByUserId2(@RequestParam Long userId) {
            
            return vehicleRepository.findByUserId(userId);
        }

        // DELETE /vehicles/user/{userId}    NUEVO MEETODO PARA ELIMINAR TODOS LOS VEHICULOS DE UN USUARIO
        @DeleteMapping("/user/{userId}")
        @Transactional
        public ResponseEntity<?> deleteVehiclesByUserId(@PathVariable Long userId) {
           
            vehicleRepository.deleteByUserId(userId);

            return ResponseEntity.ok().build();
        }
  

    

   
}

