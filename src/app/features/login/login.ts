import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../ngrx/usuario/usuario.actions';
import { selectUserError, selectUserLoading } from '../../ngrx/usuario/usuario.selectors';
import { Observable } from 'rxjs';
import { Auth } from '../../core/auth/auth';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoginValidationService } from './login-service';
import { Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  providers: [LoginValidationService]
})
export class Login {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private auth: Auth,
    private fb: FormBuilder,
    @Inject(LoginValidationService) private validation: LoginValidationService
  ) {
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9_]+$/) 
        ]
      ],
      password: [
        '',
        [
          Validators.required, Validators.minLength(4), Validators.pattern(/^[^.,]+$/)
        ]
      ]
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    if (!this.validation.isFormValid(username, password)){
      return;
    };
    this.store.dispatch(UserActions.loginUser({ username, password }));
    const user = this.auth.login(username, password);
    this.store.dispatch(
      user
        ? UserActions.loginUserSuccess({ user })
        : UserActions.loginUserError({ error: 'Usuario o contraseña incorrectos' })
    );
  }

  canSubmit(): boolean {
    return this.loginForm.valid;
  }
}