// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { ChargingPointService } from '../../services/charger-point.service';
import { ChargerPoint } from '../../models/charger-point.model'; // Asumimos que ChargerPoint se encuentra en 'charger-point.model.ts' dentro de la carpeta 'models'
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service'; // Importa el servicio de notificación
import { ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';



@Component({
  selector: 'app-chargingpoint-list',
  templateUrl: './chargingpoint-list.component.html',
  styleUrls: ['./chargingpoint-list.component.css']
})
export class ChargingpointListComponent implements OnInit {

  chargerPoints: ChargerPoint[] = [];
  isConfirmationPopupOpen = false;
  chargingIdToDelete: number | null = null;
  isMapPopupOpen = false;
  currentChargerPoint: any = null;
  map: L.Map | undefined;
  private mapInitialized = false;

  constructor(private chargingPointService: ChargingPointService, private router: Router,private notificationService : NotificationService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Cargamos los puntos de carga al inicializar
    this.loadChargerPoints();
  }

  // Método para cargar los puntos de carga
  loadChargerPoints(): void {
    this.chargingPointService.getChargerPoints().subscribe(
      data => {
        this.chargerPoints = data;
      },
      error => {
        console.error("Error al cargar los puntos de carga:", error);
      }
    );
  }
  ngAfterViewChecked(): void {
    if (this.isMapPopupOpen && !this.mapInitialized) {
      this.initializeMap();
    }
  }


  private initializeMap(): void {
    const icon = L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    });
    this.map = L.map('mapId').setView([this.currentChargerPoint.latitude, this.currentChargerPoint.longitude], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.marker([this.currentChargerPoint.latitude, this.currentChargerPoint.longitude], { icon: icon }).addTo(this.map);

    this.mapInitialized = true;
  }

  openMapPopup(chargerPoint: any) {
    this.currentChargerPoint = chargerPoint;
    this.isMapPopupOpen = true;
    // Ya no necesitas setTimeout aquí
  }


  openConfirmationPopup(vehicleId : number) {
    this.isConfirmationPopupOpen = true;
    this.chargingIdToDelete = vehicleId;
  }
  
  closeConfirmationPopup() {
    this.isConfirmationPopupOpen = false;
  }

  confirmDeleteChargerPoint(){
    console.log(this.chargingIdToDelete);
    this.chargingPointService.deleteChargerPoint(this.chargingIdToDelete!).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Punto de carga eliminado exitosamente');
        this.loadChargerPoints; // Llamar a getAllVehicles para actualizar la lista
        this.cdr.detectChanges();
        this.closeConfirmationPopup();
        
      },
      error: (error) => {
        // Manejo de error
        console.error('Error al eliminar el punto:', error);
        this.closeConfirmationPopup()
      }
    });
   
}
closeMapPopup() {
  this.isMapPopupOpen = false;
  if (this.map) {
    this.map.remove();
  }
}

  navigateToEditChargerPoint(id : number | undefined) {
    this.router.navigate(['/chargingpoint', id, 'edit']);
    }
}
