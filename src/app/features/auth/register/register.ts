import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

// Validateur personnalisé pour la confirmation de mot de passe
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">Créer un compte</h2>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Nom -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"> Nom </label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              [class.border-red-500]="isFieldInvalid('name')"
            />
            @if (isFieldInvalid('name')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('name') }}</p>
            }
          </div>

          <!-- Prénom -->
          <div>
            <label for="firstname" class="block text-sm font-medium text-gray-700"> Prénom </label>
            <input
              id="firstname"
              type="text"
              formControlName="firstname"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              [class.border-red-500]="isFieldInvalid('firstname')"
            />
            @if (isFieldInvalid('firstname')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('firstname') }}</p>
            }
          </div>

          <!-- Pseudo -->
          <div>
            <label for="pseudo" class="block text-sm font-medium text-gray-700"> Pseudo </label>
            <input
              id="pseudo"
              type="text"
              formControlName="pseudo"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              [class.border-red-500]="isFieldInvalid('pseudo')"
            />
            @if (isFieldInvalid('pseudo')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('pseudo') }}</p>
            }
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              [class.border-red-500]="isFieldInvalid('email')"
            />
            @if (isFieldInvalid('email')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('email') }}</p>
            }
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              formControlName="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              [class.border-red-500]="isFieldInvalid('password')"
            />
            @if (isFieldInvalid('password')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('password') }}</p>
            }
          </div>

          <!-- Confirmation mot de passe -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirmer
            </label>
            <input
              id="confirmPassword"
              type="password"
              formControlName="confirmPassword"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              [class.border-red-500]="isFieldInvalid('confirmPassword')"
            />
            @if (isFieldInvalid('confirmPassword')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('confirmPassword') }}</p>
            }
          </div>

          <!-- Bouton submit -->
          <div>
            <button
              type="submit"
              [disabled]="registerForm.invalid || loading()"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              @if (loading()) {
                <span
                  class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                ></span>
                Création en cours...
              } @else {
                Créer le compte
              }
            </button>
          </div>

          <!-- Message erreur -->
          @if (error()) {
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <p class="text-sm text-red-600">{{ error() }}</p>
            </div>
          }
        </form>
      </div>
    </div>
  `,
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  loading = signal(false);
  error = signal<string>('');

  constructor() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.error.set('');

      // const { confirmPasswor, ...userData } = this.registerForm.value;
      const userData = { ...this.registerForm.value };
      delete userData.confirmPassword;

      this.authService.register(userData).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message || 'Erreur lors de la création du compte');
        },
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Ce champ est requis';
      if (field.errors['email']) return "Format d'email invalide";
      if (field.errors['minlength'])
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      if (field.errors['passwordMismatch']) return 'Les mots de passe ne correspondent pas';
    }
    return '';
  }
}
