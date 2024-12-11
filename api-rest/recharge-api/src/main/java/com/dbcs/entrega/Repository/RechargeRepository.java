package com.dbcs.entrega.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dbcs.entrega.Model.Recharge;

import java.util.List;

@Repository
public interface RechargeRepository extends JpaRepository<Recharge, Long> {
    List<Recharge> findByUserIdOrderByDateStartDesc(Long userId);
    void deleteByUserId(Long userId);
}

