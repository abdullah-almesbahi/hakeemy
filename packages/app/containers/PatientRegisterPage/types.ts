import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
  updateRegisterPage,
  CREATE_NEW_PATIENT
} from './ducks';
import { push } from 'connected-react-router';
import { FormikActions } from 'formik';

export interface RegisterPageProps {
  onSubmit: typeof updateRegisterPage;
  intl: any;
  push: typeof push;
}

export interface FormRegisterPageProps {
  onSubmit: typeof updateRegisterPage;
  intl: any;
  push: typeof push;
}

export interface initialStateRegisterPageType {
  disabledStatus: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface createNewPatient {
  type: typeof CREATE_NEW_PATIENT;
}

export interface updateAction {
  type: typeof UPDATE_ACTION;
  data: any;
  action: FormikActions<any>;
}

export type RegisterPageActionTypes = defaultAction | updateAction;
