import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { ApiReduxState } from './api';
import { IJob } from './job';
import { UserReduxState } from './user';

declare global {
  // tslint:disable:interface-name
  interface Window {
    location: Location;
    devToolsExtension: object;
  }
  // tslint:enable:interface-name
}

export type IEnv = 'development' | 'production' | 'staging' | '';
export type IColors =
  | 'info'
  | 'rose'
  | 'white'
  | 'danger'
  | 'primary'
  | 'success'
  | 'warning'
  | 'transparent';

export interface IConfig {
  ENV: IEnv;
}

export interface IStoreConfig {
  history: History;
  store: Store<any>;
  persistor: Persistor;
}

export interface IAppReduxState {
  router: RouterState;
  user: UserReduxState;
  jobs: ApiReduxState<IJob[]>;
  job: ApiReduxState<IJob>;
}
