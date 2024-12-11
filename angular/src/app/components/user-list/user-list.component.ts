// Importamos las dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { NotificationService } from '../../services/notification.service'; // Importa el servicio de notificación
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
//Mencionar que respecto al filtro, hemos decidido hacerlo en esta clase debido a que nos ha parecido mas sencillo que hacer peticiones diferentes
//con objetivo de no sobrecargar el servidor innecesariamente.

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('slideDown', [
      state('false', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('true', style({
        height: '*',
        opacity: '1'
      })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filterEnabled: boolean | null = null; 
  isConfirmationPopupOpen = false;
  userIdToDelete: number | null = null;
  emailToDelete:  string | null = null;
  isVehicleDropdownOpen: {[key: number]: boolean} = {};
  isRechargeDropdownOpen: {[key: number]: boolean} = {};


  constructor(private userService: UserService, private router: Router, private location: Location,
    private notificationService: NotificationService, private authService: AuthService) { }

    showFullPaymentCard: { [userId: number]: boolean } = {};

  ngOnInit(): void {
    // Cargamos todos los usuarios al inicializar
    this.getAllUsers();
  }

  // Método para obtener todos los usuarios
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.applyFilter();
      this.users.forEach(user => {
        this.isVehicleDropdownOpen[user.id] = false;
        this.isRechargeDropdownOpen[user.id] = false;
      });
      this.applyFilter();
      error: (error: any) => {
          // Aquí manejas el caso de error
          console.error('Error al actualizar el usuario:', error);
        }
    
    });
  }

  togglePaymentCardVisibility(userId: number): void {
    if (this.showFullPaymentCard[userId]) {
      this.showFullPaymentCard[userId] = false;
    } else {
      this.showFullPaymentCard[userId] = true;
    }
  }

  // Método para aplicar el filtro de usuarios
  applyFilter(): void {
    if (this.filterEnabled === null) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user => user.enabled === this.filterEnabled);
    }
  }
  //Oculta informacion privada
  hideSensitiveInfo(value: string | undefined | null): string {
    if (value) {
      if (/\b\d{4}-\d{4}-\d{4}-\d{4}\b/.test(value)) {
        // Si es una tarjeta de crédito con el formato "XXXX-XXXX-XXXX-XXXX",
        // muestra los últimos 4 caracteres y oculta el resto
        const lastFourDigits = value.slice(-4);
        const hiddenPart = '*'.repeat(value.length - 4);
        return hiddenPart + lastFourDigits;
      } else {
        // Oculta todos los caracteres para otros casos
        return '*'.repeat(value.length);
      }
    } else {
      return '';
    }
  }

 

openConfirmationPopup(userId : number, email : string) {
  this.isConfirmationPopupOpen = true;
  this.userIdToDelete = userId;
  this.emailToDelete = email;
}

closeConfirmationPopup() {
  this.isConfirmationPopupOpen = false;
}

  

  // Método para alternar el filtro
  toggleFilter(): void {
    if (this.filterEnabled === null) {
      this.filterEnabled = true;
    } else if (this.filterEnabled === true) {
      this.filterEnabled = false;
    } else {
      this.filterEnabled = null;
    }
    this.applyFilter();
  }

  toggleVehicleDropdown(userId: number): void {
    this.isVehicleDropdownOpen[userId] = !this.isVehicleDropdownOpen[userId];
  }
  
  toggleRechargeDropdown(userId: number): void {
    this.isRechargeDropdownOpen[userId] = !this.isRechargeDropdownOpen[userId];
  }


  // Método para navegar a la página de agregar vehículo
  navigateToAddVehicle(userId: number): void {
    this.router.navigate(['/users', userId, 'addVehicle']);
  }

  // Método para navegar a la página de ver vehículos
  navigateToViewVehicles(userId: number): void {
    this.router.navigate(['/users', userId, 'listVehicle']);
  }

  // Método para navegar a la página de editar usuario
  navigateToEditUser(userId: number) {
    this.router.navigate(['/editUser', userId]);
  }

  navigateToAddRecharge(userId: number): void {
    
    this.router.navigate(['/addRecharge', userId]);
  }

  navigateToListRecharges(userId: number): void {
   
    this.router.navigate(['/listRecharges', userId]);
  }

  confirmDeleteUser() {
    this.userService.deleteUser(this.userIdToDelete!).subscribe({
      next: (response) => {
        if(this.emailToDelete == this.authService.getEmailFromLocalStorage()){
          this.authService.logout();
          this.notificationService.showSuccess('Se ha cerrado la sesión.');
          this.router.navigate(['/login']);
          this.closeConfirmationPopup();
        } else {
          this.notificationService.showSuccess('Usuario eliminado exitosamente');
          this.getAllUsers();
          this.closeConfirmationPopup();
        }
        
      },
      error: (error) => {
        // Manejo de error
        console.error('Error al eliminar el usuario:', error);
        // Asegúrate de cerrar el popup incluso en caso de error
        this.closeConfirmationPopup();
      }
    });
  }
  
  
}
