import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../ngrx/usuario/usuario.actions';
import { selectUserError, selectUserLoading } from '../../ngrx/usuario/usuario.selectors';
import { Observable } from 'rxjs';
import { Auth } from '../../core/auth/auth';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoginValidationService } from './login-service';
import { Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  providers: [LoginValidationService]
})
export class Login {
  username = '';
  password = '';

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private auth: Auth,
    @Inject(LoginValidationService) private validation: LoginValidationService
  ) {
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }

  login() {
    if (!this.canSubmit()) return;

    this.store.dispatch(UserActions.loginUser({ username: this.username, password: this.password }));

    const user = this.auth.login(this.username, this.password);

    if (user) {
      this.store.dispatch(UserActions.loginUserSuccess({ user }));
    } else {
      this.store.dispatch(UserActions.loginUserError({ error: 'Usuario o contraseña incorrectos' }));
    }
  }

  canSubmit(): boolean {
    return this.validation.isFormValid(this.username, this.password);
  }
}