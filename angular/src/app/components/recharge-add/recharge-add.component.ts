import { Component } from '@angular/core';
import { ChargerPoint } from 'src/app/models/charger-point.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ChargingPointService } from 'src/app/services/charger-point.service';
import { RechargeService } from 'src/app/services/recharge.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { Recharge } from 'src/app/models/recharge.model';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common'; // Importamos la ubicación

@Component({
  selector: 'app-recharge-add',
  templateUrl: './recharge-add.component.html',
  styleUrls: ['./recharge-add.component.css']
})
export class RechargeAddComponent {
  
  vehicles: Vehicle[] | undefined; // Reemplazar con el tipo de datos correcto
  chargerPoints: ChargerPoint[] | undefined; // Reemplazar con el tipo de datos correcto
  selectedVehicle: Vehicle | null = null;
  selectedChargerPoint: ChargerPoint | null = null;
  userId : number | undefined;
  show : boolean;

  constructor(private rechargeService: RechargeService,private chargingpointservice: ChargingPointService, private vehicleService : VehicleService
    , private route: ActivatedRoute, private notificationService : NotificationService, private location : Location) { this.show=false;}


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


  loadCompatibleCharger(vehicleId : number | undefined) : void{
        // Obtener los puntos de carga compatibles para el vehículo
        this.vehicleService.getChargerPointsForVehicle(vehicleId!).subscribe(
          (chargerPointsData) => {
            this.chargerPoints = chargerPointsData;
          },
          (error) => {
            console.error('Error al obtener los puntos de carga compatibles:', error);
          }
        );
      
  };

  selectVehicle(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.loadCompatibleCharger(this.selectedVehicle.id);
  }

  selectChargerPoint(chargerPoint: ChargerPoint): void {
    this.selectedChargerPoint = chargerPoint;
    this.show=true;
    console.log("He entrado en seleccionar chargerPoint con id: " +chargerPoint.address);
  }

  confirmRecharge(): void {
    if (this.selectedVehicle && this.selectedChargerPoint) {
      const newRecharge: Recharge = {
        userId: this.userId!,
        vehicleId: this.selectedVehicle.id!,
        chargerpointId: this.selectedChargerPoint.id!
      };
      this.rechargeService.createRecharge(newRecharge).subscribe({
        next: (response) => {
          this.show=false;
          this.notificationService.showSuccess("Recarga creada con exito");
          this.location.back();
          console.log('Recarga creada con éxito', response);
        },
        error: (error) => {
          // Manejar el error
          console.error('Error al crear la recarga', error);
        }
      });
     
    }
  }

  resetSelection(): void {
    this.selectedVehicle = null;
    this.selectedChargerPoint = null;
  }
}
