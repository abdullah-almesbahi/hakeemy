import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { SUGGEST_LOCATION, suggestLocationSuccess } from './ducks';
import API from '../../utils/api';

/**
 * Suggest locations saga
 */
export function* suggestLocationSaga(action: any) {
  // while (true) {
  // console.log('run');
  //   const { text } = yield take(SUGGEST_LOCATION);
  const { text } = action;
  if (text.length <= 4) {
    return;
  }
  //try {

  // $client = new Client(['base_uri' => 'https://maps.googleapis.com/maps/api/place/autocomplete/json']);
  // $response = $client->request('GET', "?input=" . $params['text'] . "&types=geocode"
  //     // . "&language=" . $lang . "&key=" . Yii::$app->params['googleMap_key']);
  //     . "&language=" . $lang . "&key=AIzaSyC0GVIt3YsDM5u6uZudr18rSulVLYFEnzA");
  const response = yield API.getSuggestLocations(text);
  // const response = yield call(API.getSuggestLocations, text);
  // console.log('ress', response.data.predictions);
  if (response && response.status === 'OK') {
    // yield put(showSnackbar(response.message));
    yield put(suggestLocationSuccess(response.predictions));
  }
  //} catch (error) {
  // yield put(showSnackbar(error.message));
  // yield put(updateLocationError(error.message));
  //}
  // console.log('done');
  // }
}

// Individual exports for testing
export default function* LocationPageSaga() {
  // TODO : only take latest is not working as expected
  yield takeLatest(SUGGEST_LOCATION, suggestLocationSaga);
}
