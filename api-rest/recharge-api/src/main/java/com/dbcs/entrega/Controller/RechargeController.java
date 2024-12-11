package com.dbcs.entrega.Controller;

import org.springframework.web.bind.annotation.*;

import com.dbcs.entrega.Model.Recharge;
import com.dbcs.entrega.Repository.RechargeRepository;
import com.example.dto.ChargerPointDTO;
import com.example.dto.VehicleDTO;
import com.example.enums.ChargerType;
import com.example.enums.RechargePayment;
import com.example.enums.RechargeStatus;
import com.example.services.ChargerPointService;
import com.example.services.VehicleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/recharge")
public class RechargeController {

    
    @Autowired
    private ChargerPointService chargerPointService;

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private RechargeRepository rechargeRepository;

    @Value("${CHARGER_LENTO}")
    private Double priceLenta;

    @Value("${CHARGER_MEDIA}")
    private Double priceMedia;

    @Value("${CHARGER_RAPIDA}")
    private Double priceRapida;

    @Value("${CHARGER_ULTRARAPIDA}")
    private Double priceUltrarapida;

    // GET /recharge?userId={id}
    @GetMapping
    public List<Recharge> getRechargesByUserId(@RequestParam Long userId) {
        return rechargeRepository.findByUserIdOrderByDateStartDesc(userId);
    }

    // GET /recharge/{id}
    @GetMapping("/{id}")
    public Optional<Recharge> getRechargeById(@PathVariable Long id) {
        return rechargeRepository.findById(id);
    }

    // POST /recharge
    @PostMapping
    public Recharge createRecharge(@RequestBody Recharge newRecharge) {
        newRecharge.setStatus(RechargeStatus.NOT_STARTED);
        newRecharge.setPayment(RechargePayment.NOT_PROCESSED);
        newRecharge.setPrice(getPricePerKw(newRecharge.getChargerpointId()));
        return rechargeRepository.save(newRecharge);
    }

    // PUT /recharge/{rechargeId}
    @PutMapping("/{rechargeId}")
    public Recharge updateRecharge(@PathVariable Long rechargeId, @RequestBody String action) {

        Recharge recharge = rechargeRepository.findById(rechargeId).orElseThrow();
        switch (action.trim().toLowerCase()) {
            case "start":
                if (recharge.getStatus() == RechargeStatus.NOT_STARTED) {
                    recharge.setStatus(RechargeStatus.CHARGING);
                    recharge.setPayment(RechargePayment.PENDING);
                    recharge.setDateStart(LocalDateTime.now());
                }
                break;

            case "end":
                if (recharge.getStatus() == RechargeStatus.CHARGING) {
                    recharge.setStatus(RechargeStatus.COMPLETED);
                    recharge.setPayment(RechargePayment.COMPLETED);
                    recharge.setDateEnd(LocalDateTime.now());
                    updateKw(recharge);
                }
                break;

            case "cancel":
                if (recharge.getStatus() == RechargeStatus.NOT_STARTED) {
                    recharge.setPayment(RechargePayment.CANCELLED);
                }
                break;

            default:
                throw new IllegalArgumentException("Invalid action");
        }

        return rechargeRepository.save(recharge);
    }

    // DELETE /vehicles/user/{userId}    NUEVO MEETODO PARA ELIMINAR TODOS LOS VEHICULOS DE UN USUARIO
        @DeleteMapping("/user/{userId}")
        @Transactional
        public ResponseEntity<?> deleteVehiclesByUserId(@PathVariable Long userId) {
           
            rechargeRepository.deleteByUserId(userId);

            return ResponseEntity.ok().build();
        }


    private void updateKw(Recharge recharge) {
        double kw = generateRandomKw(recharge.getVehicleId()); 
        recharge.setKw(kw);
    }

    private Double generateRandomKw(Long vhId) {
        // Simular el cálculo de kW. Con capacidad del vehiculo como maximo
        Random random = new Random();
        VehicleDTO vh = vehicleService.getVehicleById(vhId);

        int maxKw = vh.capacity.intValue();
        return 1.0 + (maxKw - 1) * random.nextDouble();
    }

    private Double getPricePerKw(Long chId) {
    try {
        // Obtener la información del punto de carga utilizando ChargingPointService
        ChargerPointDTO chargingPoint = chargerPointService.getChargingPointById(chId);

        // Asumiendo que tienes un campo chargerType en tu clase ChargingPoint
        ChargerType chargerType = chargingPoint.power;

        // Lógica para determinar el precio en función del ChargerType
        switch (chargerType) {
            case lenta:
                return priceLenta;
            case media:
                return priceMedia;
            case rapida:
                return priceRapida;
            case ultrarapida:
                return priceUltrarapida;
            default:
                // Manejo del caso por defecto
                break;
        }
    } catch (Exception e) {
        // Manejo de la excepción (puedes ser más específico)
        throw new RuntimeException("No se pudo obtener información del ChargerPoint", e);
    }

    return 0.0; // Valor por defecto o lanzar una excepción.
}
}
    
