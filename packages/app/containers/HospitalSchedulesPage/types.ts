import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
  updateHospitalDoctorsSchedulePage,
  loadDoctorsSchedules,
  deleteSchedule
} from './ducks';
import { push } from 'connected-react-router';
import { FormikActions } from 'formik';

export interface HospitalDoctorsSchedulePageProps {
  onSubmit: typeof updateHospitalDoctorsSchedulePage;
  intl: any;
  push: typeof push;
  loadDoctorsSchedules: typeof loadDoctorsSchedules;
  deleteSchedule: typeof deleteSchedule;
}

export interface FormHospitalDoctorsSchedulePageProps {
  onSubmit: typeof updateHospitalDoctorsSchedulePage;
  intl: any;
  push: typeof push;
}

export interface initialStateHospitalDoctorsSchedulePageType {
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

export type HospitalDoctorsSchedulePageActionTypes =
  | defaultAction
  | updateAction;
