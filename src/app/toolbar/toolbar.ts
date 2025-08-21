import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigTitle } from '../../shared/directives/big-title';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../ngrx/usuario/entities';
import { selectUser } from '../ngrx/usuario/usuario.selectors';
import * as UserActions from '../ngrx/usuario/usuario.actions';

@Component({
  selector: 'app-toolbar',
  imports: [BigTitle, CommonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.store.dispatch(UserActions.logout());
  }
}
