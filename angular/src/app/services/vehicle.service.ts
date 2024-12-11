import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  private baseUrl = 'http://localhost:8000/api/vehicles';
  

    constructor(private http: HttpClient) { }

    //Metodo para agregar vehiculo
    addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(`${this.baseUrl}`, vehicle);
    }

     // Método modificado para obtener vehículos de un usuario
  getUserVehicles(userId: number): Observable<Vehicle[]> {
    console.log("He entrado en ver vehiculos de usuario");
    const params = { userId: userId.toString() };
    return this.http.get<Vehicle[]>(`${this.baseUrl}`, { params });
  }
    // Método para eliminar un vehículo por su ID
  deleteVehicle(vehicleId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${vehicleId}`);
  }

  // Método para obtener todos los vehículos
  getAllVehicles(): Observable<any> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}`);
  }

  getVehicleById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getChargerPointsForVehicle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/chargerpoints`);
  }




}
