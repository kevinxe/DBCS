// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common'; 
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private location: Location,
    private notificationService: NotificationService,
    private router: Router  // Inyecta el servicio Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      // Llama al servicio de autenticación para iniciar sesión
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Has iniciado sesión correctamente');
          this.router.navigate(['/']);
        },
        error: (error) => {
          // Manejo de error
          console.error('Error al iniciar sesión:', error);
          this.notificationService.showError("La sesion es incorrecta");
        }
      });
    }
  }
}
