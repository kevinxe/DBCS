import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '../services/logging.service';
import { ErrorService } from '../services/error.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { } 
  
  handleError(error: Error | HttpErrorResponse) {
    // Inyectamos los servicios necesarios para manejar el error
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    if (error instanceof HttpErrorResponse) {
      // Si es un error del servidor, obtenemos y mostramos el mensaje de error
      message = errorService.getServerErrorMessage(error);
      notifier.showError(message);
     
    } else {
      // Si es un error del cliente, obtenemos y mostramos el mensaje de error
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
      // También registramos el error y la traza en el servicio de registro
      logger.logError(message, error.stack || 'No se encontró una traza de error');
    }

    // Registramos el error en la consola
    console.error(error);
  }
}
