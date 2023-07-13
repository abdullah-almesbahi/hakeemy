
import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
  updateHospitalAppointmentsPage,
} from "./ducks";
import { push } from "connected-react-router";
import { FormikActions } from "formik";

export interface HospitalAppointmentsPageProps {
  onSubmit: typeof updateHospitalAppointmentsPage;
  intl: any;
  push: typeof push;
}

export interface FormHospitalAppointmentsPageProps {
  onSubmit: typeof updateHospitalAppointmentsPage;
  intl: any;
  push: typeof push;
}

export interface initialStateHospitalAppointmentsPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}

export interface updateAction {
  type: typeof UPDATE_ACTION,
  data: any;
  action: FormikActions<any>;
}

export type HospitalAppointmentsPageActionTypes =
  | defaultAction
  | updateAction;
