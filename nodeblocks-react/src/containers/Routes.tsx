import { RouterState } from 'connected-react-router';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { IAppReduxState } from '../types/global';
import { UserReduxState } from '../types/user';
import Enter from './Enter/Enter';
import Error from './Error/Error';
import Job from './Job/Job';
import Jobs from './Jobs/Jobs';
import Landing from './Landing/Landing';

interface IAuthRouteStateProps {
  user: UserReduxState;
}
type IAuthRouteProps =
  IAuthRouteStateProps &
  RouteProps;

const AuthRoute = connect<IAuthRouteStateProps, {}, {}>(
  (state: IAppReduxState): IAuthRouteStateProps => ({
    user: state.user
  })
)((props: IAuthRouteProps) => {
  const { user, ...rest } = props;
  return user.token ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/enter" />
  )
});

interface IConnectedProps extends Partial<RouterState>, DispatchProp<any> {}

const Routes = (props: IConnectedProps) => (
  <Switch location={props.location}>
    <Route exact={true} path="/" component={Landing} />
    <Route path="/enter" component={Enter} />
    <AuthRoute path="/jobs/:id" component={Job} />
    <AuthRoute path="/jobs" component={Jobs} />
    <Route component={Error} />
  </Switch>
);

const mapStateToProps = (state: IAppReduxState): Partial<RouterState> => ({
  location: state.router.location
});

export default connect(mapStateToProps)(Routes);
