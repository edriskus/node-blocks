import { createStyles, Theme } from '@material-ui/core';

export const headerStyle = (theme: Theme) =>
  createStyles({
    logo: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center'
    },
    logoIcon: {
      marginRight: '.5rem',
      opacity: .5
    },
    logoLink: {
      color: 'white',
      textDecoration: 'none',
      display: 'flex'
    },
    logoText: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    link: {
      color: 'white'
    }
  });