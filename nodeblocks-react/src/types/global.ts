import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { Store } from 'redux';
import { IUserReduxState } from './user';

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
}

export interface IAppReduxState {
  router: RouterState;
  userState: IUserReduxState;
}
