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
import * as React from 'react';
import { Link } from 'react-router-dom';

import { headerStyle } from './header.tss';

class Header extends React.Component<WithStyles<typeof headerStyle>, any> {
  public render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.logo}>
            <Link to="/" className={classes.logoLink}>
              <DeveloperBoardIcon className={classes.logoIcon}/> 
              <span className={classes.logoText}>Node<br/>Blocks</span>
            </Link>
          </Typography>
          <Link className={classes.link} to="/jobs"><Button color="inherit">Jobs</Button></Link>
          <Link className={classes.link} to="/enter"><Button color="inherit">Enter&nbsp;<ExitToAppIcon/></Button></Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(headerStyle)(Header);
