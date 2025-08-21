import { createAction, props } from '@ngrx/store';
import { User } from './entities';

export const loginUser = createAction(
  '[Auth] Login User',
  props<{ username: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ user: User }>()
);

export const loginUserError = createAction(
  '[Auth] Login User Error',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');