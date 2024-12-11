package com.dbcs.entrega.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.dbcs.entrega.Model.ChargerPoint;
import com.example.enums.PlugType;
import com.dbcs.entrega.Repository.ChargerPointRepository;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/chargerpoints")
public class ChargerPointController {

    @Autowired
    private ChargerPointRepository chargerPointRepository;

    // GET /chargerpoints
    @GetMapping
    public List<ChargerPoint> getAllChargerPoints() {
        return chargerPointRepository.findAll();
    }
    
     // GET /chargerpoints/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ChargerPoint> getChargerPointById(@PathVariable Long id) {
        return chargerPointRepository.findById(id)
            .map(point -> ResponseEntity.ok().body(point))
            .orElse(ResponseEntity.notFound().build());
    }

    // POST /chargerpoints
    @PostMapping
    public ChargerPoint createChargerPoint(@RequestBody ChargerPoint chargerPoint) {
        return chargerPointRepository.save(chargerPoint);
    }
    

    // PUT /chargerpoints/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ChargerPoint> updateChargerPoint(@PathVariable Long id, @RequestBody ChargerPoint chargerPointUpdate) {
        return chargerPointRepository.findById(id).map(chargerPoint -> {
            chargerPoint.setStatus(chargerPointUpdate.getStatus()); // Asumiendo que status es el único campo modificable.
            return ResponseEntity.ok(chargerPointRepository.save(chargerPoint));
        }).orElse(ResponseEntity.notFound().build());
    }

    // GET /chargerpoints?plugType={Schuko, CSS, Mennekes, CHAdeMO}
        @GetMapping(params = "plugType")
        public List<ChargerPoint> getChargerPointsByPlugType(@RequestParam PlugType plugType) {
            return chargerPointRepository.findByPlugType(plugType);
        }

     //DELETE /chargerpoints/id
      @DeleteMapping("/{id}")
	public ResponseEntity<?> deleteChargerPoint(@PathVariable Long id) {
	    return chargerPointRepository.findById(id).map(vehicle -> {
		// Elimina el vehículo
		chargerPointRepository.deleteById(id);

		return ResponseEntity.ok().build();
	    }).orElse(ResponseEntity.notFound().build());
	}
    
}
