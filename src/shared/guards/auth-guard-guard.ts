import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../app/ngrx/usuario/usuario.selectors';
import { Observable, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      take(1),
      map(user => !!user && user.role === 'admin')
    );
  }
}