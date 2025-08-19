import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./usuario.model";
import * as UserActions from "./usuario.actions";

export interface AuthState {
  user: { username: string; role: 'admin' | 'user' } | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null
};



export const userReducer = createReducer(
    initialUserState,
    on(UserActions.loginUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loginUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        user
    })),
    on(UserActions.loginUserError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);