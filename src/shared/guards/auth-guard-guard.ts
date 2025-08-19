import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectUserRole } from '../../app/ngrx/usuario/usuario.selectors';


export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);

  return store.select(selectUserRole).pipe(
    take(1),
    map(role => {
      if (role === 'admin') return true; 
      return false; 
    })
  );
};