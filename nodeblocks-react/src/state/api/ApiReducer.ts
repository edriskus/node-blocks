import { Reducer } from 'redux';
import { ApiReduxState, IApiError } from '../../types/api';

interface IApiAction<T> {
  type: string;
  data?: T; 
  error?: IApiError;
};

export function buildApiReducer<T>(prefix: string): Reducer {
  return (
    state: ApiReduxState<T> = new ApiReduxState<T>(),
    action: IApiAction<T>,
  ): ApiReduxState<T> => {
    switch (action.type) {
      case `API/${prefix}/LOADING`:
        return {
          ...state,
          loading: true
        }
      case `API/${prefix}/SUCCESS`: 
        return {
          ...state,
          data: action.data
        }
      case `API/${prefix}/ERROR`:
        return {
          apiError: {
            ...(action.error as IApiError)
          }
        }
      case `API/${prefix}/RESET`:
        return new ApiReduxState<T>();
      default:
        return state;
    }
  };
}
