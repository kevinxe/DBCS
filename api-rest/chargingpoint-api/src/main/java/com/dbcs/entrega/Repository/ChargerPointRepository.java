package com.dbcs.entrega.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dbcs.entrega.Model.ChargerPoint;
import com.example.enums.PlugType;

public interface ChargerPointRepository extends JpaRepository<ChargerPoint, Long> {

    List<ChargerPoint> findByPlugType(PlugType plugType);
    
    
}