import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VehicleCreateComponent } from './components/vehicle-create/vehicle-create.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ChargingpointCreateComponent } from './components/chargingpoint-create/chargingpoint-create.component';
import { ChargingpointEditComponent } from './components/chargingpoint-edit/chargingpoint-edit.component';
import { ChargingpointListComponent } from './components/chargingpoint-list/chargingpoint-list.component';
import { VehicleValidchargerComponent } from './components/vehicle-validcharger/vehicle-validcharger.component';
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import { AccesDeniedComponentComponent } from './components/acces-denied-component/acces-denied-component.component';
import {authGuard} from './guard/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { VehicleListAllComponent } from './components/vehicle-list-all/vehicle-list-all.component';
import { RechargeAddComponent } from './components/recharge-add/recharge-add.component';
import { RechargesListComponent } from './components/recharges-list/recharges-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent, canActivate:[authGuard] },
  { path: 'editUser/:id', component: UserEditComponent, canActivate:[authGuard] },
  { path: 'users/create', component: UserCreateComponent, canActivate:[authGuard]},
  { path: 'users/:id/addVehicle', component: VehicleCreateComponent, canActivate:[authGuard] },
  { path: 'users/:id/listVehicle', component: VehicleListComponent, canActivate:[authGuard] },
  { path: 'addchargingpoint', component: ChargingpointCreateComponent, canActivate:[authGuard] },
  { path: 'chargingpoint', component: ChargingpointListComponent, canActivate:[authGuard] },
  { path: 'chargingpoint/:id/edit', component: ChargingpointEditComponent, canActivate:[authGuard] },
  { path: 'vehicles', component: VehicleListAllComponent, canActivate:[authGuard] },
  { path: 'vehicles/:id/validCharger', component: VehicleValidchargerComponent, canActivate:[authGuard] },
  { path: 'addRecharge/:id', component: RechargeAddComponent, canActivate:[authGuard] },
  { path: 'listRecharges/:id', component: RechargesListComponent, canActivate:[authGuard] },
  { path: 'login', component: LoginComponent},
  //Paths de errores
  { path: '404', component: NotFoundComponentComponent },
  { path: '403', component: AccesDeniedComponentComponent },
  // wildcard para redigir si no existe error definido
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

