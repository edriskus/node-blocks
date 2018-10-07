import { CircularProgress, Divider, Grid, IconButton, LinearProgress, Paper, Typography, withStyles, WithStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { Link, RouteComponentProps } from 'react-router-dom';
import { ComputeEngine, EngineStatus } from '../../helpers/computeEngine';
import { GpuComputeEngine } from '../../helpers/gpuEngine'; 
import { apiJob } from '../../state/actions';
import { IApiError } from '../../types/api';
import { IAppReduxState } from '../../types/global';
import { IJob, IJobType } from '../../types/job';
import { jobStyle } from './job.tss';

interface IJobState {
  engineStatusText: string;
  engineStatus: EngineStatus;
}

interface IJobStateProps {
  job?: IJob,
  loading?: boolean,
  error?: IApiError
}

interface IJobDispatchProps {
  getJob: (id: string) => void
}

type IJobStyleProps = WithStyles<typeof jobStyle>;

export type IJobProps =
  IJobStateProps &
  IJobDispatchProps &
  RouteComponentProps<{
    id: string;
  }> &
  InjectedTranslateProps &
  IJobStyleProps;

class Job extends React.Component<IJobProps, IJobState> {

  engine: ComputeEngine;

  constructor(props: IJobProps) {
    super(props);
    this.state = {
      engineStatusText: this.props.t('engine.idle'),
      engineStatus: EngineStatus.IDLE
    }
  }
  
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getJob(params.id);
  }

  startEngine = () => {
    if (!this.engine) {
      if (!!this.props.job && (this.props.job.type as IJobType).gpu) {
        this.engine = new GpuComputeEngine();
      } else {
        this.engine = new ComputeEngine();
      }
    }
    if (this.state.engineStatus !== EngineStatus.RUNNING) {
      this.engine.run();
      this.setState({
        engineStatusText: this.props.t('engine.running'),
        engineStatus: EngineStatus.RUNNING
      })
    }
  }

  pauseEngine = () => {
    if (!!this.engine && (this.state.engineStatus === EngineStatus.RUNNING)) {
      this.engine.stop();
      this.setState({
        engineStatusText: this.props.t('engine.paused'),
        engineStatus: EngineStatus.PAUSED
      })
    }
  }

  stopEngine = () => {
    if (!!this.engine) {
      this.engine.stop();
      delete this.engine;
      this.setState({
        engineStatusText: this.props.t('engine.idle'),
        engineStatus: EngineStatus.IDLE
      })
    }
  }

  render() {
    const { classes, job, loading, error, t } = this.props;
    return (
      <Grid container={true}>
        <Grid item={true} sm={12} md={6}>
          <Typography variant="display3" align="left" gutterBottom={true}>
            <Link to="/jobs"><IconButton><ArrowBackIcon /></IconButton></Link>
            {!!job ? job.title : t('jobs.job')}
          </Typography>
          {error && (
            <Typography color="error">{ error.message }</Typography>
          )}
          {!!job ? (
            <Paper>
              <div className={classes.cardSection}>
                <Grid container={true}>
                  <Grid item={true} sm={4}><Typography variant="caption">{t('jobs.description')}</Typography></Grid>
                  <Grid item={true} sm={8}><Typography>{job.description || '-'}</Typography></Grid>
                </Grid>
                <Grid container={true}>
                  <Grid item={true} sm={4}><Typography variant="caption">{t('jobs.use_gpu')}</Typography></Grid>
                  <Grid item={true} sm={8}><Typography>{(job.type as IJobType).gpu ? t('common.yes') : t('common.no')}</Typography></Grid>
                </Grid>
                <Grid container={true}>
                  <Grid item={true} sm={4}><Typography variant="caption">{t('jobs.algorithm')}</Typography></Grid>
                  <Grid item={true} sm={8}><Typography>{(job.type as IJobType).title}</Typography></Grid>
                </Grid>
                <Grid container={true}>
                  <Grid item={true} sm={4}><Typography variant="caption">{t('jobs.blocks')}</Typography></Grid>
                  <Grid item={true} sm={8}><Typography>{job.blocks}</Typography></Grid>
                </Grid>
                <Grid container={true}>
                  <Grid item={true} sm={4}><Typography variant="caption">{t('jobs.running_blocks')}</Typography></Grid>
                  <Grid item={true} sm={8}><Typography>{job.running_blocks}</Typography></Grid>
                </Grid>
                <Grid container={true}>
                  <Grid item={true} sm={4}><Typography variant="caption">{t('jobs.idle_blocks')}</Typography></Grid>
                  <Grid item={true} sm={8}><Typography>{job.idle_blocks}</Typography></Grid>
                </Grid>
              </div>
              <Divider/>
              <Grid container={true} justify="center" alignItems="baseline" className={classes.cardSection}>
                <Typography variant="caption">{t('jobs.status')}:&nbsp;</Typography>
                <Typography>{this.state.engineStatusText}</Typography>
              </Grid>
              {(this.state.engineStatus === EngineStatus.RUNNING) ? (
                <LinearProgress color="secondary" />
              ) : (
                <Divider/>
              )}
              <Grid container={true} justify="center" className={classes.cardSection}>
                <IconButton disabled={this.state.engineStatus === EngineStatus.RUNNING} onClick={this.startEngine}><PlayArrowIcon /></IconButton>
                <IconButton disabled={!this.engine || (this.state.engineStatus !== EngineStatus.RUNNING)} onClick={this.pauseEngine}><PauseIcon /></IconButton>
                <IconButton disabled={!this.engine} onClick={this.stopEngine}><StopIcon /></IconButton>
              </Grid>
              { (job.type as IJobType).gpu && (
                <>
                  <Divider/>
                  <Grid container={true} justify="center" alignItems="center" className={classes.gpuSection}>
                    <Typography color="secondary">{ t('jobs.gpu') }&nbsp;</Typography>
                    <OfflineBoltIcon color="secondary" /> 
                  </Grid>
                </>
              )}
            </Paper>
          ) : loading && (
            <CircularProgress/>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IAppReduxState): IJobStateProps => ({
  job: state.job.data,
  loading: state.job.loading,
  error: state.job.apiError
});

const mapDispatchToProps = (dispatch: Dispatch): IJobDispatchProps => ({
  getJob: (id: string) => dispatch(apiJob(id))
});

export default compose(
  connect<IJobStateProps, IJobDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate('translations'),
  withStyles(jobStyle),
)(Job);
