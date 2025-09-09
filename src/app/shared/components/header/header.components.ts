import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="bg-white border-b-4 border-green-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <img src="assets/icon/logojss.png" alt="JSS" class="h-16 w-18" />

        <!-- Navigation -->
        <nav>
          <ul class="flex space-x-4">
            @if (currentUser()) {
              <li>
                <a routerLink="/jersey" class="hover:text-green-600">
                  <img src="assets/icon/iconjersey.png" alt="Jersey" class="h-8 w-8" />
                </a>
              </li>
              @if (currentUser()?.role === 'admin') {
                <li>
                  <a routerLink="/admin" class="hover:text-green-600">
                    <img src="assets/icon/iconadmin.png" alt="Admin" class="h-8 w-8" />
                  </a>
                </li>
              }
              @if (currentUser()?.role === 'user') {
                <li>
                  <a routerLink="/panier" class="hover:text-green-600">
                    <img src="assets/icon/panier.png" alt="Panier" class="h-8 w-8" />
                  </a>
                </li>
              }
              <li>
                <button (click)="logout()" class="hover:text-green-600">
                  <img src="assets/icon/logout.png" alt="Logout" class="h-8 w-8" />
                </button>
              </li>
            } @else {
              <li>
                <a routerLink="/auth/login" class="hover:text-green-600">
                  <img src="assets/icon/login.png" alt="Login" class="h-8 w-8" />
                </a>
              </li>
              <li>
                <a routerLink="/auth/register" class="hover:text-green-600">
                  <img src="assets/icon/register.svg" alt="Register" class="h-8 w-8" />
                </a>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser$;

  constructor() {
    // Utiliser directement le signal du service
    this.currentUser = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
