import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
  updateHospitalDoctorsPage
} from './ducks';
import { push } from 'connected-react-router';
import { FormikActions } from 'formik';
import { showSnackbar } from '../Snackbar/ducks';

export interface HospitalDoctorsPageProps {
  onSubmit: typeof updateHospitalDoctorsPage;
  intl: any;
  push: typeof push;
  showSnackbar: typeof showSnackbar;
}

export interface FormHospitalDoctorsPageProps {
  onSubmit: typeof updateHospitalDoctorsPage;
  intl: any;
  push: typeof push;
}

export interface initialStateHospitalDoctorsPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}

export interface updateAction {
  type: typeof UPDATE_ACTION;
  data: any;
  action: FormikActions<any>;
}

export type HospitalDoctorsPageActionTypes = defaultAction | updateAction;
