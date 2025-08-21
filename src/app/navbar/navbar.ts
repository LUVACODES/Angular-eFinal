import { Component } from '@angular/core';
import { BigTitle } from '../../shared/directives/big-title';
import { RouterModule } from '@angular/router';
import { RoutePaths } from '../../shared/routes';
import { Observable } from 'rxjs';
import { User } from '../ngrx/usuario/entities';
import { selectUser } from '../ngrx/usuario/usuario.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [ RouterModule,BigTitle, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  routePaths = RoutePaths
  user$: Observable<User | null>;


  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
  
}
