import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../ngrx/usuario/usuario.model';


interface UserWithPassword extends User {
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private usersData: UserWithPassword[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  private loggedUser: User | null = null;

  login(username: string, password: string): boolean {
    const user = this.usersData.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedUser = { username: user.username, role: user.role };
      return true;
    }
    return false;
  }

  getLoggedUser(): User | null {
    return this.loggedUser;
  }

  isAdmin(): boolean {
    return this.loggedUser?.role === 'admin';
  }

  redirectToLogin() {
    inject(Router).navigate(['/login']);
  }

}
