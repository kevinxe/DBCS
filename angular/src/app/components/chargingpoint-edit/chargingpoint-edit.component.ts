import { ChargerPoint } from 'src/app/models/charger-point.model';
import { ChargerStatus } from 'src/app/models/chargerstatus.model';
import { ChargingPointService } from '../../services/charger-point.service';
import { Location } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Añade el import para formularios

@Component({
  selector: 'app-chargingpoint-edit',
  templateUrl: './chargingpoint-edit.component.html',
  styleUrls: ['./chargingpoint-edit.component.css']
})
export class ChargingpointEditComponent {
  chpId: number | undefined;
  updatedCHP: ChargerPoint = {} as ChargerPoint;
  statusValues = Object.values(ChargerStatus);
  chargerPointForm: FormGroup; // Crea un FormGroup para el formulario

  constructor(
    private chargerservice: ChargingPointService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder, 
    private ns : NotificationService,
    private location : Location
  ) {
    this.chargerPointForm = this.formBuilder.group({
      status: [null, Validators.required], // Agrega el estado al FormGroup con validación requerida
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chpId = params['id'];
    });
  }

  saveChargerPoint() {
    if (this.chargerPointForm.valid) {
      this.updatedCHP = this.chargerPointForm.value; // Validamos los datos
      const newStatus = this.chargerPointForm.value.status;
      this.chargerservice.editChargerPoint(this.chpId!,this.updatedCHP).subscribe({
        next: (response) => {
          this.ns.showSuccess('Punto de carga editado exitosamente');
          this.location.back(); // Regresamos a la página anterior
        },
        error: (error) => {
          // Manejo de error
          console.error('Error al editar el usuario:', error);
        }
      });
    }
  }
}
