import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';

import { IAppReduxState } from '../types/global';
import { apiReducers } from './sagas';
import { userReducer } from './user/UserReducer';

export const getAppReducers = (history: History): Reducer<IAppReduxState> => {
  const appReducers = combineReducers<Partial<IAppReduxState>>({
    user: userReducer,
    ...apiReducers
  });

  return connectRouter(history)<any>(appReducers);
};
