import { 
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography, 
  withStyles, 
  WithStyles 
} from '@material-ui/core';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { Redirect } from 'react-router';
import { apiLogin, apiReset } from '../../state/actions';
import { IAppReduxState } from '../../types/global';
import { UserReduxState } from '../../types/user';
import { enterStyle } from './enter.tss';

interface IEnterStateProps {
  user: UserReduxState;
}

interface IEnterDispatchProps {
  login: (email: string, password: string) => void;
  reset: () => void;
}

type IEnterStyleProps = WithStyles<typeof enterStyle>;

export type IEnterProps = 
  IEnterStateProps &
  IEnterDispatchProps &
  InjectedTranslateProps &
  IEnterStyleProps;

interface IEnterState {
  form: {
    username: string,
    password: string
  }
}

class Enter extends React.Component<IEnterProps, IEnterState> {

  state = {
    form: {
      username: '',
      password: ''
    }
  }

  handleFormChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    if (!!this.props.user.apiError) {
      this.props.reset();
    }
    const key = ev.target.name as string;    
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: ev.target.value
      }
    })
  }

  handleSubmit = (ev: React.ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.login(
      this.state.form.username,
      this.state.form.password
    )
  }

  render() {
    const { classes, user, t } = this.props;    
    return (
      <Grid container={true} justify="center">
        <Grid item={true}>
          {!!user.token && (
            <Redirect to="/jobs"/>
          )}
          <Typography variant="display3" align="center" gutterBottom={false}>
            {t('auth.enter')}
          </Typography>
          {!!user.apiError && (
            <Typography color="error">{user.apiError.message}</Typography>
          )}
          <form noValidate={true} autoComplete="off" onSubmit={this.handleSubmit}>
            <FormControl fullWidth={true} margin="dense" error={!!user.apiError}>
              <InputLabel htmlFor="username">{t('auth.email')}</InputLabel>
              <Input
                id="username"
                name="username"
                value={this.state.form.username}
                onChange={this.handleFormChange}/>
            </FormControl>
            <FormControl fullWidth={true} margin="dense" error={!!user.apiError}>
              <InputLabel htmlFor="username">{t('auth.password')}</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={this.state.form.password}
                onChange={this.handleFormChange}/>
            </FormControl>
            <div className={classes.buttonWrap}>
              {!!user.loading ? (
                <CircularProgress/>
              ) : (
                <Button color="primary" type="submit">
                  {t('common.submit')}
                </Button>
              )}
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IAppReduxState): IEnterStateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch): IEnterDispatchProps => ({
  login: (email: string, password: string) => dispatch(apiLogin(email, password)),
  reset: () => dispatch(apiReset())
});

export default compose(
  connect<IEnterStateProps, IEnterDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate('translations'),
  withStyles(enterStyle),
)(Enter);