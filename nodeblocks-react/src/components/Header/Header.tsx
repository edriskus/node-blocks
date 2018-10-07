import { 
  AppBar, 
  Button,
  Toolbar,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { apiReset } from '../../state/actions';
import { IAppReduxState } from '../../types/global';
import { UserReduxState } from '../../types/user';
import { headerStyle } from './header.tss';

interface IHeaderStateProps {
  user: UserReduxState;
}

interface IHeaderDispatchProps {
  logout: () => void;
}

type IHeaderStyleProps = WithStyles<typeof headerStyle>;

export type IHeaderProps = 
  IHeaderStateProps &
  IHeaderDispatchProps &
  InjectedTranslateProps &
  IHeaderStyleProps;

class Header extends React.Component<IHeaderProps, {}> {

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { classes, user, t } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.logo}>
            <Link to="/" className={classes.logoLink}>
              <DeveloperBoardIcon className={classes.logoIcon}/> 
              <span className={classes.logoText}>{t('common.title1')}<br/>{t('common.title2')}</span>
            </Link>
          </Typography>
          {!!user.token && (<>
            <Link className={classes.link} to="/jobs"><Button color="inherit">{t('common.jobs')}</Button></Link>
            <Button color="inherit" onClick={this.handleLogout}>{t('auth.logout')}&nbsp;<PowerSettingsNewIcon/></Button>
          </>)}
          {!user.token && (
            <Link className={classes.link} to="/enter"><Button color="inherit">{t('auth.enter')}&nbsp;<ExitToAppIcon/></Button></Link>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: IAppReduxState): IHeaderStateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch): IHeaderDispatchProps => ({
  logout: () => dispatch(apiReset())
});

export default compose(
  connect<IHeaderStateProps, IHeaderDispatchProps, {}>(
    mapStateToProps, 
    mapDispatchToProps
  ),
  translate('translations'),
  withStyles(headerStyle)
)(Header);
