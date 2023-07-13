import { fork, all, put, select } from 'redux-saga/effects';
import sagaLoginPage from '../containers/LoginPage/saga';
import _map from 'lodash/map';
// import SearchDoctorPageSaga from '../containers/SearchDoctorPage/saga';

const combinedSagas = {
  sagaLoginPage

  // SearchDoctorPageSaga
};

export default function* rootSaga() {
  yield all(_map(Object.keys(combinedSagas), key => fork(combinedSagas[key])));
  //   yield all(_map(combinedSagas, fork));
}
