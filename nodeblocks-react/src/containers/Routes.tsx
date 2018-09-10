import { RouterState } from 'connected-react-router';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { IAppReduxState } from '../types/global';
import Enter from './Enter/Enter';
import Error from './Error/Error';
import Landing from './Landing/Landing';

interface IConnectedProps extends Partial<RouterState>, DispatchProp<any> {}

const Routes = (props: IConnectedProps) => (
  <Switch location={props.location}>
    <Route exact={true} path="/" component={Landing} />
    <Route path="/enter" component={Enter} />
    <Route component={Error} />
  </Switch>
);

const mapStateToProps = (state: IAppReduxState): Partial<RouterState> => ({
  location: state.router.location,
});

export default connect(mapStateToProps)(Routes);
