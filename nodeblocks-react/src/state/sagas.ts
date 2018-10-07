import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { buildApiReducer } from '../state/api/ApiReducer';
import { IApiAction } from '../types/api';
import { IAppReduxState } from '../types/global';
import { IJob } from '../types/job';

export const BASE_URL: string = 'http://localhost:1337';

/**
 * Default API reducers
 */

export const apiReducers = {
  jobs: buildApiReducer<IJob[]>('JOBS'),
  job: buildApiReducer<IJob>('JOB'),
}

/**
 * Data endpoints
 */

function* postLogin(): SagaIterator {
  yield takeEvery('API/LOGIN', buildApiSaga('LOGIN', 'POST', '/login'));
}

function* getJob(): SagaIterator {
  yield takeEvery('API/JOB', buildApiSaga('JOB', 'GET', '/job/:id'));
}

function* getJobs(): SagaIterator {
  yield takeEvery('API/JOBS', buildApiSaga('JOBS', 'GET', '/job'));
}

/**
 * Worker sagas
 */

function* rootSaga() {
  yield all([
    postLogin(),
    getJobs(),
    getJob()
  ]);
}

function buildApiSaga(
  prefix: string,
  method: string,
  path: string
) {  
  return function* apiSaga(action: IApiAction) {
    try {
      const token: string = yield select((state: IAppReduxState) => state.user.token);
      yield put({type: `API/${prefix}/LOADING`})
      const response: Response = yield call(
        fetchApi, 
        path,
        method,
        action.payload && action.payload.body, 
        action.payload && action.payload.params,
        action.payload && action.payload.query,
        token
      );
      if (response.status === 401) {
        throw { message: yield response.text()};
      } 
      if (response.status === 403) {
        throw yield response.json();
      }
      if(!response.ok) {
        throw yield response.json();
      }
      const data = yield response.json();
      yield put({type: `API/${prefix}/SUCCESS`, data})
    } catch (error) {
      yield put({type: `API/${prefix}/ERROR`, error})
    }
  }
}

function fetchApi(
  path: string,
  method: string,
  body: {[key: string]: any}, 
  params: {[key: string]: any},
  query: {[key: string]: any},
  token: string
): Promise<any> {
  const config: RequestInit = {
    method,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": token ? `Bearer ${token}` : ''
    }
  }
  if(!!body && (method !== "GET") && (method !== "HEAD")) {
    config.body = JSON.stringify(body);
  }
  const resolvedPath = addPathParams(path, params);
  return fetch(`${BASE_URL}${resolvedPath}`, config)
}

function addPathParams(
  path: string,
  params: {[key: string]: any},
): string {
  if (!!params) {
    for (const key in params) {
      if (!!params[key]) {
        path = path.replace(`:${key}`, params[key] + "");
      }
    }
  }
  return path;
}

export { rootSaga };
