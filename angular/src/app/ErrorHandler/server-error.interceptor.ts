import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//Cabria importar el servicio de autenticacion necesario para el error 403, lo preparamos para futuras entregas
import { Router } from '@angular/router';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar la apiKey de JWT al encabezado
    const keyID = "UfCUGEYBV44PilE5NlimI85LkFaC5nxy";
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${keyID}`
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 404:
            // Redireccion a not found
            this.router.navigate(['/not-found']);
            break;
          case 403:
            // Manejar el error de acceso denegado
            this.router.navigate(['/access-denied']);
            break;
          default:
            // Lo dejamos para futuras entregas, en caso de ser necesario
            break;
        }
        return throwError(error);
      })
    );
  }
}
