package com.dbcs.entrega.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.dbcs.entrega.Model.User;
import com.dbcs.entrega.Model.Vehicle;
import com.dbcs.entrega.Repository.UserRepository;
import com.example.dto.VehicleDTO;
import com.example.services.RechargeService;
import com.example.services.VehicleService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleService vehicleService;
    
    @Autowired
    private RechargeService rechargeService;

   
    // GET /users
    @GetMapping
    public List<User> getAllUsers(@RequestParam(required = false) Boolean enable) {
        if (enable == null) {
            return userRepository.findAll();
        } else {
            return userRepository.findByEnabled(enable);
        }
    }

    // GET /users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        user.setEnabled(false);
        user.encryptPassword(user.getPassword());

        // Verifica si el email ya está registrado
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            // El email ya está registrado, devuelve una respuesta de error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El email ya está registrado");
        }

        // El email no está registrado, guarda el nuevo usuario
        User newUser = userRepository.save(user);
        return ResponseEntity.ok(newUser);
    }

  
    // PUT /users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userUpdate) {

        
       Optional<User> userOptional = userRepository.findById(id);
       User user = userOptional.get();
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        else{

        user.setEmail(userUpdate.getEmail());
        user.encryptPassword(userUpdate.getPassword());
        user.setPaymentCard(userUpdate.getPaymentCard());
        user.setUpdatedAt(userUpdate.getUpdatedAt()); // Actualizar fecha de actualización

        // Llama al servicio de vehículos para obtener la lista de vehículos del usuario
        VehicleDTO[] vehicles = vehicleService.getVehiclesByUserId(user.getId());

        //Comprueba si el usuario tiene tarjeta de pago y vehículos
        if (user.getPaymentCard() != null && vehicles != null && vehicles.length != 0) {
            user.setEnabled(true);
        } else {
            user.setEnabled(false);
        }

        // Actualiza el usuario
        user = userRepository.save(user);
    }
        return ResponseEntity.ok(user);
    }

        
        // DELETE /users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.deleteById(id); 
            try {
                vehicleService.deleteVehiclesByUserId(id);
                rechargeService.deleteRechargesByUserId(id);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // Si todo va bien, retorna un estado de éxito
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }


     // GET /users?email=email_a_consultar
     @GetMapping(params = "email")
     public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
       
         User user = userRepository.findByEmail(email);
         if (user != null) {
             return ResponseEntity.ok().body(user);
         } else {
             return ResponseEntity.notFound().build();
         }
     }

     
}
