import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  //Devolvemos error del cliente a String
  getClientErrorMessage(error: Error): string {    
    return error.message ? 
           error.message : 
           error.toString();
  }
//Devolvemos error del server a String
  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?    
           error.message :
           'No Internet Connection';
  }    
}