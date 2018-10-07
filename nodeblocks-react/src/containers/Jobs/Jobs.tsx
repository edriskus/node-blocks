import {
  CircularProgress,
  Grid, 
  IconButton, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Typography, 
  withStyles, 
  WithStyles 
} from '@material-ui/core';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { Link } from 'react-router-dom';
import { apiJobs } from '../../state/actions';
import { IApiError } from '../../types/api';
import { IAppReduxState } from '../../types/global';
import { IJob } from '../../types/job';
import { jobsStyle } from './jobs.tss';

interface IJobsStateProps {
  jobs?: IJob[],
  loading?: boolean,
  error?: IApiError
}

interface IJobsDispatchProps {
  getJobs: () => void
}

type IJobsStyleProps = WithStyles<typeof jobsStyle>;

export type IJobsProps =
  IJobsStateProps &
  IJobsDispatchProps &
  InjectedTranslateProps &
  IJobsStyleProps;

class Jobs extends React.Component<IJobsProps, {}> {
  
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    const { classes, jobs, loading, error, t } = this.props;
    return (
      <Grid container={true}>
        <Grid item={true} sm={12}>
          <Typography variant="display3" align="left" gutterBottom={true}>
            {t('common.jobs')}
          </Typography>
          {error && (
            <Typography color="error">{ error.message }</Typography>
          )}
          {Array.isArray(jobs) ? (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Icon</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job: IJob) => {
                    return (
                      <TableRow key={job.id}>
                        <TableCell/>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>
                          <Link to={`/jobs/${job.id}`}>
                            <IconButton>
                              <DeveloperBoardIcon />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          ) : loading && (
            <CircularProgress/>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IAppReduxState): IJobsStateProps => ({
  jobs: state.jobs.data,
  loading: state.jobs.loading,
  error: state.jobs.apiError
});

const mapDispatchToProps = (dispatch: Dispatch): IJobsDispatchProps => ({
  getJobs: () => dispatch(apiJobs())
});

export default compose(
  connect<IJobsStateProps, IJobsDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate('translations'),
  withStyles(jobsStyle),
)(Jobs);
