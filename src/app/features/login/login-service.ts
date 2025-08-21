import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginValidationService {
  isFormValid(username: string, password: string): boolean {
    return !!username && !!password;
  }
}