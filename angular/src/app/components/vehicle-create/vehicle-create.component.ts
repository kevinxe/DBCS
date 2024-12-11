// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { PlugType } from '../../models/plugtype.model';
import { Location } from '@angular/common'; 
import { NotificationService } from '../../services/notification.service'; // Importa el servicio de notificación

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.css']
})
export class VehicleCreateComponent implements OnInit {
  vehicleForm: FormGroup;
  userId: number | undefined; // Cambia a 'number | undefined'
  PlugType = PlugType;
  plugTypes = Object.values(PlugType);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private location: Location,
    private notificationService: NotificationService
  ) {
    // Creamos el formulario con validaciones
    this.vehicleForm = this.fb.group({
      carRegistration: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]], // Validamos que la capacidad sea mayor a 0
      plugType: [PlugType.CSS] 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userIdStr = params.get('id');
      if (userIdStr) {
        this.userId = +userIdStr;
      }
    });
  }

  // Método para agregar un vehículo
  addVehicle(): void {
    if (this.vehicleForm.valid) {
      const newVehicle: Vehicle = this.vehicleForm.value;
      if (typeof this.userId === 'number') {
        newVehicle.userId = this.userId; // Cambia a 'newVehicle.userId = this.userId'
      }

      this.vehicleService.addVehicle(newVehicle).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Vehículo creado exitosamente');
          this.location.back(); // Regresamos a la página anterior
        },
        error: (error) => {
          // Manejo de error
          console.error('Error al agregar el vehículo:', error);
        }
      });
    }
  }
}
