import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export default function* rootSaga() {
  yield all([
    fork(loginError)
  ]);
}
