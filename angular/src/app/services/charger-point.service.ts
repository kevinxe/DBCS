import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargerPoint} from '../models/charger-point.model';

@Injectable({
  providedIn: 'root'
})
export class ChargingPointService {

  private apiUrl = 'http://localhost:8000/api/chargingpoints'; 

  constructor(private http: HttpClient) {}

  // Método para obtener el listado de puntos de carga de vehículos eléctricos
  getChargerPoints(): Observable<ChargerPoint[]> {
    return this.http.get<ChargerPoint[]>(`${this.apiUrl}`);
  }

  // Método para añadir un nuevo punto de carga
  addChargerPoint(chargerPoint: ChargerPoint): Observable<ChargerPoint> {
    return this.http.post<ChargerPoint>(`${this.apiUrl}`, chargerPoint);
  }

  // Método para editar un punto de carga
  editChargerPoint(id : number,chargerPoint: ChargerPoint): Observable<ChargerPoint> {
    return this.http.put<ChargerPoint>(`${this.apiUrl}/${id}`, chargerPoint);
  }

  deleteChargerPoint(id : number) : Observable<ChargerPoint> {
    
    console.log("El id es: " + id);
    return this.http.delete<ChargerPoint>(`${this.apiUrl}/${id}`);
  }
}

