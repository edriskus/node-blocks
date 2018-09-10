import { createStyles, Theme } from '@material-ui/core';

export const enterStyle = (theme: Theme) =>
  createStyles({
    buttonWrap: {
      display: 'flex',
      justifyContent: 'end',
      marginTop: '1rem'
    }
  });