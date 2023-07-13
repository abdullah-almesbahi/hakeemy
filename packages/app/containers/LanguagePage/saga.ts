import { fork, take, call, put } from 'redux-saga/effects';
import {
  UPDATE_LANGUAGE,
  languageUpdated,
  languageUpdatingError
} from './ducks';
import API from '../../utils/api';

/**
 * Update language saga
 */
export function* updateLanguageSaga() {
  while (true) {
    const { lang } = yield take(UPDATE_LANGUAGE);
    yield put(languageUpdated(lang));
    // try {
    //   const response = yield call(API.changeLanguage, lang);
    //   if (response && response.status === true) {
    //     yield put(languageUpdated(lang));
    //   }
    // } catch (error) {
    //   yield put(languageUpdatingError(error.message));
    // }
  }
}

export default function* languageSaga() {
  yield fork(updateLanguageSaga);
}
