import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServerErrorInterceptor } from './ErrorHandler/server-error.interceptor';
import { GlobalErrorHandler } from './ErrorHandler/global-error-hadler';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VehicleCreateComponent } from './components/vehicle-create/vehicle-create.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ChargingpointListComponent } from './components/chargingpoint-list/chargingpoint-list.component';
import { ChargingpointCreateComponent } from './components/chargingpoint-create/chargingpoint-create.component';
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import { AccesDeniedComponentComponent } from './components/acces-denied-component/acces-denied-component.component';
import { ChargingpointEditComponent } from './components/chargingpoint-edit/chargingpoint-edit.component';
import { LoginComponent } from './components/login/login.component';
import { jwtDecode } from 'jwt-decode';
import { VehicleListAllComponent } from './components/vehicle-list-all/vehicle-list-all.component';
import { CommonModule } from '@angular/common';
import { VehicleValidchargerComponent } from './components/vehicle-validcharger/vehicle-validcharger.component';
import { JwtInterceptor } from './ErrorHandler/JwtInterceptor';
import { RechargeAddComponent } from './components/recharge-add/recharge-add.component';
import { RechargesListComponent } from './components/recharges-list/recharges-list.component';
import { CreditCardMaskDirective } from './components/user-create/CreditCardMaskDirective';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    VehicleCreateComponent,
    VehicleListComponent,
    ChargingpointListComponent,
    ChargingpointCreateComponent,
    UserEditComponent,
    NotFoundComponentComponent,
    AccesDeniedComponentComponent,
    ChargingpointEditComponent,
    LoginComponent,
    CreditCardMaskDirective,
    VehicleListAllComponent,
    VehicleValidchargerComponent,
    RechargeAddComponent,
    RechargesListComponent

  ],
  imports: [
    BrowserModule,
    CommonModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
     //{ provide: ErrorHandler, useClass: GlobalErrorHandler }, // Utilizo GlobalErrorHandler como manejador de errores global suplantando al default
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi : true  } // Utilizo ServerErrorInterceptor para interceptar errores HTTP
  ],
  bootstrap: [AppComponent]  //Empleamos BootStrap como libreria
})
export class AppModule { }
