import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../ngrx/usuario/usuario.actions';

import { Observable } from 'rxjs';
import { UserState } from '../../ngrx/usuario/usuario.model';
import { selectUserError, selectUserLoading } from '../../ngrx/usuario/usuario.selectors';
import { AsyncPipe } from '@angular/common';
import { Auth } from '../../core/auth/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<UserState>,
    private auth: Auth
  ) {
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }

  login() {
    this.store.dispatch(UserActions.loginUser({ username: this.username, password: this.password }));

    const success = this.auth.login(this.username, this.password);

    if (success) {
      const user = this.auth.getLoggedUser()!;

      this.store.dispatch(UserActions.loginUserSuccess({ user }));

    } else {
      const errorMsg = 'Usuario o contraseña incorrectos';
      this.store.dispatch(UserActions.loginUserError({ error: errorMsg }));
    }
  }
}