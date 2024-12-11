// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importamos FormBuilder, FormGroup y Validators
import { ChargingPointService } from '../../services/charger-point.service';
import { ChargerPoint } from '../../models/charger-point.model';
import { PlugType } from 'src/app/models/plugtype.model';
import { ChargerType} from 'src/app/models/chargertype.model';
import { ChargerStatus } from 'src/app/models/chargerstatus.model';
import { Location } from '@angular/common'; 
import { NotificationService } from '../../services/notification.service'; // Importamos el servicio de notificación
import * as L from 'leaflet';

@Component({
  selector: 'app-chargingpoint-create',
  templateUrl: './chargingpoint-create.component.html',
  styleUrls: ['./chargingpoint-create.component.css']
})
export class ChargingpointCreateComponent implements OnInit {
  chargerPointForm: FormGroup; // Definimos el formulario
  plugTypeValues = Object.values(PlugType);
  powerValues = Object.values(ChargerType);
  statusValues = Object.values(ChargerStatus);
  isMapPopupOpen = false;
  map: L.Map | undefined;
  marker: L.Marker | undefined;

  constructor(
    private formBuilder: FormBuilder, // Inyectamos FormBuilder
    private chargingPointService: ChargingPointService,
    private location: Location,
    private notificationService: NotificationService
  ) {
     // Creamos el formulario con validaciones
     this.chargerPointForm = this.formBuilder.group({
      address: ['', Validators.required],
      latitude: [0, [Validators.required]],
      longitude: [0, [Validators.required]],
      plugType: [PlugType.CHAdeMO, Validators.required],
      power: [ChargerType.LENTA, Validators.required],
      status: [ChargerStatus.DISPONIBLE, Validators.required]
    });
  }

  ngOnInit(): void {
    // No requerimos ninguna acción en ngOnInit en este momento
  }

  // Método para guardar el punto de carga
  saveChargerPoint(): void {
    if (this.chargerPointForm.valid) {
      // Si el formulario es válido, guardamos el punto de carga
      const chargerPoint: ChargerPoint = this.chargerPointForm.value;
      this.chargingPointService.addChargerPoint(chargerPoint).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Punto de carga creado exitosamente');
          this.location.back(); // Regresamos a la página anterior
        },
        error: (error)  => {
          console.error("Error al crear el punto de carga:", error);
        }
    });
    }
  }

  openMap() {
    this.isMapPopupOpen = true;
    setTimeout(() => {
    
      this.map = L.map('mapId').setView([40.416775, -3.703790], 6); // Coordenadas iniciales
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      this.map.on('click', (e) => {
        if (this.marker) {
          this.marker.setLatLng(e.latlng);
          this.marker.setIcon(L.icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 0 ],
            // specify the path here
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
         }));
        } else {
          this.marker = L.marker(e.latlng).addTo(this.map!);
        }
      });
    }, 0);
  }

  closeMapPopup() {
    this.isMapPopupOpen = false;
    if (this.marker) {
      const latLng = this.marker.getLatLng();
      this.chargerPointForm.controls['latitude'].setValue(latLng.lat);
      this.chargerPointForm.controls['longitude'].setValue(latLng.lng);
    }
    if (this.map) {
      this.map.remove();
    }
  }

}
