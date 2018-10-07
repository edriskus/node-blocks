import { Action } from "redux";

export interface IApiAction extends Action {
  payload: {
    body?: {[key: string]: any},
    params?: {[key: string]: any},
    query?: {[key: string]: any}
  }
}

export interface ILoginResponse {
  email: string,
  password: string
}

export interface IApiError {
  message: string
}

export class ApiReduxState<T> {
  data?: T;
  loading?: boolean;
  apiError?: IApiError;
}