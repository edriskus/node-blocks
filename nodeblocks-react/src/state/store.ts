import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { PersistConfig, Persistor, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { IStoreConfig } from '../types/global';
import { getAppReducers } from './reducers';
import { rootSaga } from './sagas';
 
export function configStore(): IStoreConfig {
  let enhancers: any;
  let store: Store<any>;
  let persistor: Persistor;
  let sagaMiddleware: SagaMiddleware<any>;

  const middleware: any[] = [];
  const history: History = createBrowserHistory();
  const appReducers = getAppReducers(history);
  const persistConfig: PersistConfig = {
    key: 'nb-react-user',
    storage,
    whitelist: ['user'],
  }
  const persistedReducer = persistReducer(persistConfig, appReducers)

  middleware.push(routerMiddleware(history));

  sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  enhancers = compose(applyMiddleware(...middleware));
  store = createStore(persistedReducer, enhancers);
  persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);
  return { history, store, persistor };
}
