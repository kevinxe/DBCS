import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const currentmenu = route.url[0].path;
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isLoggedIn()) {
    if (service.isTokenExpired()) {
      // Si el token ha expirado, redirige a la página de error 403
      router.navigate(['/403']);
      return false;
    }
    return true;
  
  } else {
    router.navigate(['/403']);
    return false;
  }
};