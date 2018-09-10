import { 
  Button,
  Typography,
  withStyles, 
  WithStyles
} from '@material-ui/core';
import * as React from 'react';
import { translate } from 'react-i18next';
import { compose } from 'redux';

import { landingStyle } from './landing.tss';

interface ILandingProps extends WithStyles<typeof landingStyle> {
  t: any;
}

class Landing extends React.Component<ILandingProps, any> {
  public render() {
    const { classes, t } = this.props;
    return (
      <div className={classes.wrap}>
        <Typography variant="display3" align="center" gutterBottom={false}>
          {t('home.title')}
        </Typography>
        <Typography variant="subheading" align="center" gutterBottom={true}>
          {t('home.tagline')}
        </Typography>
        <Typography align="center" className={classes.description} gutterBottom={true}>
          {t('home.description')}
        </Typography>
        <Button variant="contained" color="primary">
          {t('common.learn_more')}
        </Button>
      </div>
    );
  }
}

export default compose(
  translate('translations'),
  withStyles(landingStyle),
)(Landing);
