import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { IStoreConfig } from '../types/global';
import { getAppReducers } from './reducers';
import { rootSaga } from './sagas';

export function configStore(): IStoreConfig {
  let enhancers: any;
  let store: Store<any>;
  let sagaMiddleware: SagaMiddleware<any>;

  const middleware: any[] = [];
  const history: History = createBrowserHistory();
  const appReducers = getAppReducers(history);

  middleware.push(routerMiddleware(history));

  sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  enhancers = compose(applyMiddleware(...middleware));
  store = createStore(appReducers, enhancers);

  sagaMiddleware.run(rootSaga);
  return { history, store };
}
