import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I18nextProvider } from "react-i18next";

import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App/App';
import i18n from './i18n';
import { configStore } from './state/store';
import './styles/index.css';
import { IStoreConfig } from './types/global';

const appState: IStoreConfig = configStore();

const Application: JSX.Element = (
  <I18nextProvider i18n={i18n}>
    <Provider store={appState.store}>
      <ConnectedRouter history={appState.history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </I18nextProvider>  
);

ReactDOM.render(
  Application,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();