import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl: string = 'http://localhost:8000/api/users';
  private baseUrl1: string = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios, con opción de filtrar por habilitación
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Método para obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un usuario
  createUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  // Método para actualizar un usuario por ID
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user)
    .pipe(
      catchError(error => {
        console.error('Error al actualizar el usuario:', error);
        return throwError(error);
      }),
      tap(response => {
        console.log('Respuesta de updateUser:', response);
      })
    );
}

  // Método para eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Método para obtener los vehículos de un usuario por ID
  getVehiclesByUserId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/vehicles`);
  }
}
