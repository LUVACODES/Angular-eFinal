import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './usuario.model';
import * as UserActions from './usuario.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loginUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loginUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(UserActions.loginUserError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.logout, () => initialUserState)
);