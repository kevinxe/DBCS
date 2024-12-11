package com.dbcs.entrega.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dbcs.entrega.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByEnabled(Boolean enable); User findByEmail(String email);}
        