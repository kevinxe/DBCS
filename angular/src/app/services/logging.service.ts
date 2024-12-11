import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    //Simplemente muestra por consola
    logError(message: string, stack: string) {
        //Mandamos errores al servidor
        console.log('LoggingService: ' + message);
    }
}