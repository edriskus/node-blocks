import { createStyles, Theme } from '@material-ui/core';

export const landingStyle = (theme: Theme) =>
  createStyles({
    wrap: {
      minHeight: 'calc(100vh - 7rem)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    description: {
      marginTop: '1rem',
      marginBottom: '.5rem',
      maxWidth: '500px'
    }
  });