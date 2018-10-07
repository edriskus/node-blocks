import { createStyles, Theme } from '@material-ui/core';
import { padding } from '../../styles/global.tss';

export const jobStyle = (theme: Theme) =>
  createStyles({
    cardSection: {
      padding: padding.s1
    },
    gpuSection: {
      padding: padding.s1
    }
  });