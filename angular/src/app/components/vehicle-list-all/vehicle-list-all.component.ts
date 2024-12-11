
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service'; // Importa el servicio de notificación

@Component({
  selector: 'app-vehicle-list-all',
  templateUrl: './vehicle-list-all.component.html',
  styleUrls: ['./vehicle-list-all.component.css']
})
export class VehicleListAllComponent {
  vehicles: Vehicle[] = [];
  isConfirmationPopupOpen = false;
  vehicleIdToDelete: number | null = null;

  ngOnInit(): void {
    // Cargamos todos los usuarios al inicializar
    this.getAllVehicles();
  }

  constructor(private vehicleService : VehicleService, private notificationService : NotificationService,
    private router: Router){}


    // Método para obtener todos los usuarios
    getAllVehicles(): void {
      this.vehicleService.getAllVehicles().subscribe(data => {
        this.vehicles = data;
        
        
        error: (error: any) => {
            // Aquí manejas el caso de error
            console.error('Error al obtener Vehicles:', error);
          }
      
      });
    }

  openConfirmationPopup(vehicleId : number) {
    this.isConfirmationPopupOpen = true;
    this.vehicleIdToDelete = vehicleId;
  }
  
  closeConfirmationPopup() {
    this.isConfirmationPopupOpen = false;
  }

  confirmDeleteVehicle(){
    console.log(this.vehicleIdToDelete);
    this.vehicleService.deleteVehicle(this.vehicleIdToDelete!).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Vehicle eliminado exitosamente');
        this.getAllVehicles(); // Llamar a getAllVehicles para actualizar la lista
        this.closeConfirmationPopup()
        
      },
      error: (error) => {
        // Manejo de error
        console.error('Error al eliminar el vehículo:', error);
        this.closeConfirmationPopup()
      }
    });
   
}

navigateToValidCharger(vehicleId: number) : void{

  this.router.navigate(['/vehicles',vehicleId, 'validCharger']);

}
  

}
