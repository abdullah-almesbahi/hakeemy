import React from 'react';
import { Text, View } from 'react-native';

import { Route, Redirect } from 'react-router-dom';

import { PATIENT_TYPE, HOSPITAL_TYPE } from '../../utils/constants';
import {
  ROUTE_HOSPITAL_HOME,
  ROUTE_HOME_PATIENT,
  ROUTE_LAUNCHER
} from '../../utils/constants';

const RouteCheckAuth = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.requiredSignedIn === true) {
          if (rest.user.id > 0 && rest.user.api_key !== null) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location }
                }}
              />
            );
          }
        } else if (rest.requiredSignedIn === false) {
          if (rest.user.id > 0 && rest.user.api_key !== null) {
            if (
              rest.user.user_type === HOSPITAL_TYPE &&
              props.location.pathname === ROUTE_LAUNCHER
            ) {
              return (
                <Redirect
                  to={{
                    pathname:
                      rest.user.user_type === HOSPITAL_TYPE
                        ? ROUTE_HOSPITAL_HOME
                        : ROUTE_LAUNCHER,
                    state: { from: props.location }
                  }}
                />
              );
            }
            return <Component {...props} />;
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
  );
};

export default RouteCheckAuth;
