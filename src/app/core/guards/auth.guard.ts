import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.services';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.currentUser$).pipe(
    take(1),
    map((user) => {
      if (user) {
        return true; // Accès autorisé
      } else {
        router.navigate(['/auth/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false; // Accès refusé
      }
    }),
  );
};
