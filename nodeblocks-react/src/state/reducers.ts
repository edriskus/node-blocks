import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';

import { IAppReduxState } from '../types/global';
import { userReducer } from './user/UserReducer';

export const getAppReducers = (history: History): Reducer<IAppReduxState> => {
  const appReducers = combineReducers<Partial<IAppReduxState>>({
    userState: userReducer
  });

  return connectRouter(history)<any>(appReducers);
};
