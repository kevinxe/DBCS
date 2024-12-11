import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; //Implementado con SnackBar

@Injectable({
    providedIn: 'root'
})

//Clase para mostrar pop-ups al usuario ya sea de exitos o errores
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone,
    ) {  }

  //Mostrar exito con propiedades de CSS de exito
  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', {
        duration: 3000,
        panelClass: ['success'], 
        
      });
    });
  }

//Mostrar error con propiedades de CSS de error
  showError(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', {
        duration: 3000,
        panelClass: ['error'], 
        
      });
    });
  }
}