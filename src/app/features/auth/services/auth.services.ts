import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  public currentUser$ = this.currentUser.asReadonly();

  private users = signal<User[]>([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'YanisTest',
      email: 'yanistest@example.com',
      password: 'motdepasse',
      role: 'user',
      createdAt: new Date(),
    },
  ]);

  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';

  constructor() {
    if (typeof localStorage !== 'undefined') {
      try {
        const savedUsers = localStorage.getItem(this.USERS_KEY);
        if (savedUsers) {
          const parsed: User[] = JSON.parse(savedUsers);
          const usersWithDates: User[] = parsed.map((u) => ({
            ...u,
            createdAt: u?.createdAt ? new Date(u.createdAt) : new Date(),
          }));
          this.users.set(usersWithDates);
        }

        const savedCurrent = localStorage.getItem(this.CURRENT_USER_KEY);
        if (savedCurrent) {
          const parsed = JSON.parse(savedCurrent);
          parsed.createdAt = parsed?.createdAt ? new Date(parsed.createdAt) : new Date();
          this.currentUser.set(parsed as User);
        }
      } catch (e) {
        console.error('Erreur lors du chargement depuis localStorage', e);
        localStorage.removeItem(this.USERS_KEY);
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    }
  }

  private persistUsers(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users()));
    } catch (e) {
      console.error('Impossible de sauvegarder users dans localStorage', e);
    }
  }

  private setCurrentUserInternal(user: User | null): void {
    this.currentUser.set(user);
    if (typeof localStorage === 'undefined') return;
    try {
      if (user) {
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Impossible de sauvegarder currentUser dans localStorage', e);
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    const user = this.users().find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    );

    if (user) {
      this.setCurrentUserInternal(user);
      return of(user).pipe(delay(500));
    } else {
      return throwError(() => new Error('Email ou mot de passe incorrect'));
    }
  }

  register(userData: RegisterRequest): Observable<User> {
    const existingUser = this.users().find((u) => u.email === userData.email);
    if (existingUser) {
      return throwError(() => new Error('Cet email est déjà utilisé'));
    }

    const newUser: User = {
      id: this.generateNextId(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user',
      createdAt: new Date(),
    };

    this.users.set([...this.users(), newUser]);
    this.persistUsers();

    this.setCurrentUserInternal(newUser);

    return of(newUser).pipe(delay(500));
  }

  logout(): void {
    this.setCurrentUserInternal(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users()).pipe(delay(300));
  }

  deleteUser(userId: number): Observable<void> {
    const exists = this.users().some((u) => u.id === userId);
    if (!exists) {
      return throwError(() => new Error('Utilisateur non trouvé'));
    }

    this.users.set(this.users().filter((u) => u.id !== userId));
    this.persistUsers();

    if (this.currentUser()?.id === userId) {
      this.logout();
    }

    return of(void 0).pipe(delay(300));
  }

  getToken(): string | null {
    const user = this.currentUser();
    return user ? `mock-token-${user.id}` : null;
  }

  private generateNextId(): number {
    const list = this.users();
    if (list.length === 0) return 1;
    return Math.max(...list.map((u) => u.id)) + 1;
  }
}
