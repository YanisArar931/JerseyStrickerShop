import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="bg-white border-b-4 border-green-600 p-4 sticky top-0 z-50">
      <div class="container mx-auto flex flex-wrap justify-between items-center">
        <!-- Logo cliquable -->
        <img
          src="assets/icon/logojss.png"
          alt="JSS"
          class="h-12 w-auto sm:h-16 cursor-pointer"
          tabindex="0"
          (click)="goToJersey()"
          (keyup.enter)="goToJersey()"
        />

        <!-- Navigation -->
        <nav class="w-full sm:w-auto">
          <ul class="flex justify-center sm:justify-end flex-wrap gap-4">
            @if (currentUser()) {
              <li>
                <a routerLink="/jersey" class="hover:text-green-600">
                  <img
                    src="assets/icon/iconjersey.png"
                    alt="Jersey"
                    class="h-6 w-6 sm:h-8 sm:w-8"
                  />
                </a>
              </li>
              @if (currentUser()?.role === 'admin') {
                <li>
                  <a routerLink="/admin" class="hover:text-green-600">
                    <img
                      src="assets/icon/iconadmin.png"
                      alt="Admin"
                      class="h-6 w-6 sm:h-8 sm:w-8"
                    />
                  </a>
                </li>
              }
              @if (currentUser()?.role === 'user') {
                <li>
                  <a routerLink="/panier" class="hover:text-green-600">
                    <img src="assets/icon/panier.png" alt="Panier" class="h-6 w-6 sm:h-8 sm:w-8" />
                  </a>
                </li>
              }
              <li>
                <button (click)="logout()" class="hover:text-green-600">
                  <img src="assets/icon/logout.png" alt="Logout" class="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
              </li>
            } @else {
              <li>
                <a routerLink="/auth/login" class="hover:text-green-600">
                  <img src="assets/icon/login.png" alt="Login" class="h-6 w-6 sm:h-8 sm:w-8" />
                </a>
              </li>
              <li>
                <a routerLink="/auth/register" class="hover:text-green-600">
                  <img
                    src="assets/icon/register.svg"
                    alt="Register"
                    class="h-6 w-6 sm:h-8 sm:w-8"
                  />
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  goToJersey() {
    if (this.router.url === '/jersey') {
      window.location.reload();
    } else {
      this.router.navigate(['/jersey']);
    }
  }
}
