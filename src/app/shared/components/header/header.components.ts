import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.services';
import { TranslateService } from '../../services/translate.services';
import { PanierService } from '../../../features/panier/services/panier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
        <nav class="w-full sm:w-auto flex items-center gap-4">
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
                <li class="relative">
                  <a routerLink="/panier" class="hover:text-green-600 relative inline-block">
                    <img src="assets/icon/panier.png" alt="Panier" class="h-6 w-6 sm:h-8 sm:w-8" />

                    @if (panierService.count > 0) {
                      <span
                        class="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {{ panierService.count }}
                      </span>
                    }
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

          <!-- Switch langue -->
          <div class="flex space-x-2 ml-4">
            <button (click)="setLang('fr')" class="px-2 py-1 text-sm rounded hover:bg-gray-200">
              FR
            </button>
            <button (click)="setLang('en')" class="px-2 py-1 text-sm rounded hover:bg-gray-200">
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  panierService = inject(PanierService);

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

  setLang(lang: 'fr' | 'en') {
    this.translateService.setLang(lang);
  }
}
