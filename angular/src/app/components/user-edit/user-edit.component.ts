import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { Location } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';


function creditCardValidator(control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> {
  console.log("no es vacio");
  return new Promise((resolve) => {
    const creditCardRegex = /^(?:\d{4}-){3}\d{4}$/;
    if (control.value && !creditCardRegex.test(control.value)) {
      resolve({ 'invalidCreditCardFormat': true });
    } else {
      resolve(null);
    }
  });
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: number | undefined;
  updatedUser: User = {} as User;
  initialLoadComplete = false; // Variable para rastrear la carga inicial


  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      paymentCard: ['',[this.optionalCreditCardValidator]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUserById(this.userId!).subscribe(
      (userData) => {
        this.userForm.patchValue({
          email: userData.email,
          password: '',
          paymentCard: userData.paymentCard
        });
        this.initialLoadComplete = true; // Marcamos la carga inicial como completa
      },
      (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    );
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

   

  // Método para enviar el formulario
  onSubmit() {
    if (this.userForm.valid) {
      // Obtener el valor actual del campo paymentCard del formulario
      const paymentCardValue = this.userForm.get('paymentCard')?.value;

      // Comprobar si paymentCardValue es null o está en blanco
      if (paymentCardValue === null || paymentCardValue.trim() === '') {
        // Establecer paymentCard en null si está vacío
        this.userForm.get('paymentCard')?.setValue(null);
      }

      this.updatedUser = this.userForm.value;
      this.updatedUser.updatedAt = new Date();
    

      this.userService.updateUser(this.userId!, this.updatedUser).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Usuario editado exitosamente');
          this.location.back();
        },
        error: (error) => {
          console.error('Error al editar el usuario:', error);
          this.notificationService.showError("Error al editar el usuario")
        }
      });
    }
  }
}
