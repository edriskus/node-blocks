import { 
  Grid, 
  MuiThemeProvider,
  withStyles, 
  WithStyles 
} from '@material-ui/core';
import * as React from 'react';

import Header from '../../components/Header/Header';
import theme from '../../styles/theme';
import Routes from '../Routes';
import { appStyle } from './app.tss';

export type IAppProps = WithStyles<typeof appStyle>;

class App extends React.Component<IAppProps, {}> {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
          <Header/>
          <Grid container={true} justify="center" className={classes.content}>
            <Grid item={true} xs={12} md={10}>
              <Routes />
            </Grid>
          </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(appStyle)(App);
