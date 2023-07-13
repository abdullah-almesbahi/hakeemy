/**
 * Create the store with dynamic reducers
 */
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import { createLogger } from 'redux-logger';
import sagaLoginPage from './containers/LoginPage/saga';
// import sagaSchedulePage from './containers/SchedulePage/saga';
import sagas from './utils/sagas';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/hardSet';

export function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (__DEV__) {
    if (typeof window === 'object') {
      /* eslint-disable no-underscore-dangle */
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

      // NOTE: Uncomment the code below to restore support for Redux Saga
      // Dev Tools once it supports redux-saga version 1.x.x
      // if (window.__SAGA_MONITOR_EXTENSION__)
      //   reduxSagaMonitorOptions = {
      //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__
      //   };
      /* eslint-enable */
    }
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const logger = createLogger({
    collapsed: true
  });

  const persistConfig = {
    key: 'v1Hakeemy',
    storage: AsyncStorage,
    // debug: true,
    // stateReconciler: autoMergeLevel2
    // whitelist: ["loginPage"]
    blacklist: [
      'router',
      // 'rateApp',
      'searchDoctor',
      'loginPage',
      // 'location',
      'notifications',
      'createSchedulePage',
      'searchList',
      'forgetPassword',
      'hospitalRegistration',
      'hospitalDoctorsSchedulePage',
      'doctorProfile',
      'hospitalDoctorPage',
      // 'user',
      'register',
      'hospitalAppointments'
    ]
  };
  const persistedReducer = persistReducer(
    persistConfig,
    createReducer({}, history)
  );

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  let middlewares;
  if (__DEV__) {
    const logger = createLogger({
      collapsed: true
    });
    middlewares = [sagaMiddleware, routerMiddleware(history), logger];
  } else {
    middlewares = [sagaMiddleware, routerMiddleware(history)];
  }

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store, null, () => {
    // Get persisted state
    Object.keys(store.getState())
      // We always have static reducers loaded
      .filter(
        reducerKey =>
          !Object.keys(createReducer({}, history)).includes(reducerKey)
      )
      .forEach(reducerKey => {
        // ignore router
        if (reducerKey !== 'router') {
          // Create empty reducers for keys that don't have loaded dynamic reducer yet
          // They will be replaced by a real ones.
          store.injectedReducers[reducerKey] = (state = null) => state;
        }
      });
  });
  const rootSagas = [sagaLoginPage];
  // const rootSagas = [sagaLoginPage, sagaSchedulePage];
  // Extensions
  sagaMiddleware.run(sagas);
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  store.persistor = persistor;
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers, history));
    });
  }

  return { store, persistor };
}
