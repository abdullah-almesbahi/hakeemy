import { POINT_INCREASE, RATED } from './ducks';
import { push } from 'connected-react-router';
import { FormikActions } from 'formik';

export interface RateAppProps {
  onSubmit;
  intl: any;
  push: typeof push;
}

export interface initialStateRateAppType {
  points: integer;
  rated: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface pointIncrease {
  type: typeof POINT_INCREASE;
}

export interface RateTypes {
  type: typeof RATED;
}

export type RateAppActionTypes = pointIncrease | RateTypes;
