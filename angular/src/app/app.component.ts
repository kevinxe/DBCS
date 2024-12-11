import { Component, AfterViewInit } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';  // Importa el Router de Angular
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('dropdownAnimation', [
      state('closed', style({
        opacity: 0,
        display: 'none'
      })),
      state('open', style({
        opacity: 1,
        display: 'block'
      })),
      transition('closed => open', animate('300ms ease-in')),
      transition('open => closed', animate('300ms ease-out'))
    ])
  ]
})
export class AppComponent implements AfterViewInit {

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router  // Inyecta el Router en el constructor
  ) {}
  isOpen1 = false;
  isOpen2 = false;
  isOpen3 = false;

  toggleDropdown1() {
    this.isOpen1 = !this.isOpen1;
  }

  toggleDropdown2() {
    this.isOpen2 = !this.isOpen2;
  }

  toggleDropdown3() {
    this.isOpen3 = !this.isOpen3;
  }



  ngAfterViewInit() {
    var dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      new Dropdown(dropdown);
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.showSuccess("Has cerrado sesion correctamente");

    // Navega a la ruta "/login" después de hacer logout
    this.router.navigate(['/login']);
  }
}
