package com.dbcs.entrega.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dbcs.entrega.Model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByUserId(Long id);
    void deleteByUserId(Long userId);
}
