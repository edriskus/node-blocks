import { 
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography, 
  withStyles, 
  WithStyles 
} from '@material-ui/core';
import * as React from 'react';
import { translate } from 'react-i18next';
import { compose } from 'redux';

import { enterStyle } from './enter.tss';

interface IEnterProps extends WithStyles<typeof enterStyle> {
  t: any;
}

class Enter extends React.Component<IEnterProps, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: ''
      }
    }
  }

  public handleChange(key: string): any {
    return (ev: React.SyntheticEvent) => {
      const target: any = ev.target;
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [key]: target.value
        }
      })
    }
  }

  public handleSubmit = (ev: React.SyntheticEvent<HTMLFormElement>) => {
    console.log(this.state.form);
    ev.preventDefault();
  }

  public render() {
    const { classes, t } = this.props;
    return (
      <Grid container={true} justify="center">
        <Grid item={true}>
          <Typography variant="display3" align="center" gutterBottom={false}>
            {t('auth.enter')}
          </Typography>
          <form noValidate={true} autoComplete="off" onSubmit={this.handleSubmit}>
            <FormControl fullWidth={true} margin="dense">
              <InputLabel htmlFor="username">{t('auth.email')}</InputLabel>
              <Input
                id="username"
                name="username"
                value={this.state.form.username}
                onChange={this.handleChange('username')}/>
            </FormControl>
            <FormControl fullWidth={true} margin="dense">
              <InputLabel htmlFor="username">{t('auth.password')}</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={this.state.form.password}
                onChange={this.handleChange('password')}/>
            </FormControl>
            <div className={classes.buttonWrap}>
              <Button color="primary" type="submit">
                {t('common.submit')}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  translate('translations'),
  withStyles(enterStyle),
)(Enter);