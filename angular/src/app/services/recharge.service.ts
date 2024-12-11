// recharge-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {
  private apiUrl = 'http://localhost:8000/api/recharges'; // Ajusta esto a la URL base de tu API

  constructor(private http: HttpClient) { }

  getRechargesByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { params: { userId } });
  }

  getRechargeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createRecharge(newRecharge: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, newRecharge);
  }

  updateRecharge(rechargeId: number, action: string): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/${rechargeId}`, action);
  }
}