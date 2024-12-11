// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  private tokenKey = 'jwtToken';
  private logged = false;
  decodedToken: any;
  private emailKey = 'userEmail';

  constructor(private http: HttpClient) {}


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true 
  };

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const body = {
      email: email,
      password: password,
    };
  
    const options = { headers, withCredentials: true };
  
    console.log("Lanzo petición a", `${this.apiUrl}/login`);
    
    return this.http.post(`${this.apiUrl}/login`, body, options).pipe(
      tap((response: any) => {
        console.log('Respuesta recibida:', response);
        if (response && response.token) {
          this.saveToken(response.token);
          localStorage.setItem(this.emailKey, email);
        }
      }),
      catchError((error: HttpErrorResponse) => {  
        console.error('Error en el servicio de autenticación:', error);
        return throwError(error);
      })
    );
  }

  getEmailFromLocalStorage(): string | null {
    return localStorage.getItem(this.emailKey);
  }
  
  saveToken(token : string) : void {
    localStorage.setItem("TuSecretoJWT", token);
    this.decodedToken = jwtDecode(token);
  }
  
  loadToken(): string | null{
    const token = localStorage.getItem("TuSecretoJWT");
    this.tokenKey = token!;
    if (token) {
      this.decodedToken = jwtDecode(token);
      return token;
    }

    return null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("TuSecretoJWT");
    return !!token && !this.isTokenExpired(); 
  }

  logout(): void {
    localStorage.removeItem("TuSecretoJWT");
    this.decodedToken = null;
    localStorage.removeItem("userEmail");
  }

  getExpiryTime() {
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime();
    console.log("el expiry time es: " +expiryTime);
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    }
    if(expiryTime==null){
        return false;
    }
    return false;
  }

  getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }
}
