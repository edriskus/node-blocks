import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState = 0;

export class AuthState {
  public id: string;
  public email: string;
  public username: string;
  public roles?: Array<string>;

  constructor(
    public user: any = {},
    public token?: string
  ) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.roles = user.roles || [];
  }
}

export function authReducer(state: AuthState = new AuthState(), action: AuthActions) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...(<LoginAuthAction>action).payload
      };

    case LOGOUT:
      return new AuthState();

    default:
      return state;
  }
}

export class LoginAuthAction implements Action {
  public type = LOGIN;
  constructor(
    public payload: AuthState
  ) {

  }
}

export class LogoutAuthAction implements Action {
  public type = LOGOUT;
  constructor() {}
}


export type AuthActions = (LoginAuthAction | LogoutAuthAction)
