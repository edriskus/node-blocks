import { Action } from 'redux';
import { IApiAction } from '../types/api';

export const apiLogin = (email: string, password: string): IApiAction => ({
  type: "API/LOGIN",
  payload: {
    body: {
      email,
      password
    }
  }
})

export const apiJobs = (): Action => ({
  type: "API/JOBS"
})

export const apiJob = (id: string): IApiAction => ({
  type: "API/JOB",
  payload: {
    params: {
      id
    }
  }
})

export const apiReset = (): Action => ({
  type: "API/LOGIN/RESET"
})