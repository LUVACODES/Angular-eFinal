import { Injectable } from '@angular/core';
import { User, USERS } from '../../ngrx/usuario/entities';

@Injectable({ providedIn: 'root' })
export class Auth {
  private loggedUser: User | null = null;

  login(username: string, password: string): User | null {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedUser = user;
      return user;
    }
    return null;
  }

  getLoggedUser(): User | null {
    return this.loggedUser;
  }

  logout() {
    this.loggedUser = null;
  }

  isAdmin(): boolean {
    return this.loggedUser?.role === 'admin';
  }
}