// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'] 
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  userId: number | undefined;  // Definimos userId aquí para que sea accesible en toda la clase.

  constructor(private vehicleService: VehicleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userIdStr = params.get('id');
      
      if (userIdStr) {
        this.userId = +userIdStr; 
        this.loadUserVehicles(this.userId);  // Llamamos a loadUserVehicles aquí, después de obtener el userId.
      }
    });
  }

  // Método para cargar los vehículos del usuario
  loadUserVehicles(userId: number): void {  // Añadimos el argumento userId al método.
    this.vehicleService.getUserVehicles(userId).subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data;
      },
      (error: any) => {
        console.error('Error al cargar vehículos:', error);
      }
    );
  }
}
