import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/jersey',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'jersey',
    canActivate: [authGuard],
    loadChildren: () => import('./features/jersey/jersey.routes').then((m) => m.JERSEY_ROUTES),
  },
  {
    path: 'panier',
    canActivate: [authGuard],
    loadChildren: () => import('./features/panier/panier.routes').then((m) => m.PANIER_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
];
