package com.dbcs.entrega;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.example.services")
public class VehicleAPI {

	public static void main(String[] args) {
		SpringApplication.run(VehicleAPI.class, args);
	}

}
