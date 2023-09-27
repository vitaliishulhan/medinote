import { createReducer, on } from "@ngrx/store";
import { User } from "@angular/fire/auth";
import * as UserActions from "../actions/user.actions";

export interface IUserState {
  user: User | null | undefined
}

const initialState: IUserState = { user: undefined };

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state, { user }) => ({ user }))
);

export default userReducer;