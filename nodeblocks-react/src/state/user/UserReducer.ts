import { IApiError } from '../../types/api';
import { UserReduxState } from '../../types/user';

export enum UserActionTypes {
  'API/LOGIN/LOADING' = 'API/LOGIN/LOADING',
  'API/LOGIN/SUCCESS' = 'API/LOGIN/SUCCESS',
  'API/LOGIN/ERROR' = 'API/LOGIN/ERROR',
  'API/LOGIN/RESET' = 'API/LOGIN/RESET'
}

interface IUserAction {
  type: UserActionTypes;
  data?: UserReduxState; 
  error?: IApiError;
};

export const userReducer = (
  state: UserReduxState = new UserReduxState(),
  action: IUserAction,
): UserReduxState => {
  switch (action.type) {
    case 'API/LOGIN/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'API/LOGIN/SUCCESS': 
      return {
        ...action.data
      }
    case 'API/LOGIN/ERROR':
      return {
        apiError: {
          ...(action.error as IApiError)
        }
      }
    case 'API/LOGIN/RESET':
      return new UserReduxState();
    default:
      return state;
  }
};
