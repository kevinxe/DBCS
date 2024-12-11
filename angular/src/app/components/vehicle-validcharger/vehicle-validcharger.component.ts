import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'app-vehicle-validcharger',
  templateUrl: './vehicle-validcharger.component.html',
  styleUrls: ['./vehicle-validcharger.component.css']
})
export class VehicleValidchargerComponent {

  vehicleId: number | undefined;
  vehicle: any;
  chargerPoints: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    
  ){
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'];
    });

    this.loadCompatibleCharger(this.vehicleId);
  }

  loadCompatibleCharger(vehicleId : number | undefined) : void{

    this.vehicleService.getVehicleById(this.vehicleId!).subscribe(
      (data) => {
        this.vehicle = data;
        // Obtener los puntos de carga compatibles para el vehículo
        this.vehicleService.getChargerPointsForVehicle(this.vehicleId!).subscribe(
          (chargerPointsData) => {
            this.chargerPoints = chargerPointsData;
          },
          (error) => {
            console.error('Error al obtener los puntos de carga compatibles:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener la información del vehículo:', error);
      }
    );
  };



  }

