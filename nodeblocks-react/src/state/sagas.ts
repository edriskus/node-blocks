import { call } from 'redux-saga/effects';

function* rootSaga() {
  yield call(() => console.log('Hello Sagas'));
}

export { rootSaga };
