import { 
  Typography,
  withStyles, 
  WithStyles
} from '@material-ui/core';
import * as React from 'react';
import { translate } from 'react-i18next';
import { compose } from 'redux';

import { errorStyle } from './error.tss';

interface IErrorProps extends WithStyles<typeof errorStyle> {
  t: any;
}

class Error extends React.Component<IErrorProps, any> {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Typography variant="display4" align="center" gutterBottom={false}>
          404
        </Typography>
        <Typography variant="subheading" align="center" gutterBottom={true}>
          {t('common.page_not_found')}
        </Typography>
      </div>
    );
  }
}

export default compose(
  translate('translations'),
  withStyles(errorStyle),
)(Error);