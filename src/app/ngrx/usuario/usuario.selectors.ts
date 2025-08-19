import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./usuario.model";



export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
    selectUserState,
    (state) => state.user

);

export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role
);

export const selectUserLoading = createSelector(
    selectUserState,
    (state) => state.loading
);

export const selectUserError = createSelector(
    selectUserState,
    (state) => state.error
);