// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Location } from '@angular/common'; // Importamos la ubicación
import { NotificationService } from '../../services/notification.service'; // Importamos el servicio de notificación
import { Observable } from 'rxjs';




@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  // Inicializamos las propiedades
  newUser: User = {} as User;
  userForm: FormGroup;
  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(private userService: UserService, private fb: FormBuilder, private location: Location,
    private notificationService: NotificationService) {
    // Inicializamos el formulario del usuario
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      paymentCard: ['',[this.optionalCreditCardValidator]],
      enabled: [false]
    });
  }

  ngOnInit() {
    // No es necesario realizar ninguna acción en ngOnInit relacionada con la inicialización del formulario
  }

  optionalCreditCardValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === null || value.trim() === '') {
      // Si el valor es nulo o está en blanco, se considera válido
      return null;
    } else {
      // Valida el formato de la tarjeta de crédito
      const creditCardRegex = /^(?:\d{4}-){3}\d{4}$/;
      const isValidCreditCard = creditCardRegex.test(value);

      if (!isValidCreditCard) {
        // Si el formato es inválido, devuelve un error
        return { invalidCreditCardFormat: true };
      } else {
        // Si el formato es válido, se considera válido
        return null;
      }
    }
  }

  // Método para crear un usuario
  createUser(): void {
    if (this.userForm?.valid) {
      // Obtener el valor actual del campo paymentCard del formulario
      const paymentCardValue = this.userForm.get('paymentCard')?.value;
  
      // Comprobar si paymentCardValue es null o está en blanco
      if (paymentCardValue === null || paymentCardValue.trim() === '') {
        // Establecer paymentCard en null si está vacío
        this.userForm.get('paymentCard')?.setValue(null);
      }
  
      this.newUser = this.userForm.value;
      this.newUser.createdAt = new Date(); // Establecemos la fecha actual
  
      this.userService.createUser(this.newUser).subscribe({
        next: (user) => {
          this.notificationService.showSuccess('Usuarios creados exitosamente');
          // En caso de éxito, navegamos hacia atrás
          this.location.back();
        },
        error: (err) => {
          this.notificationService.showError("Creación no válida");
          console.error(err);
        }
      });
    }
  }
}
