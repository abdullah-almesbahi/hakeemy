
import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
  updateHospitalRegistrationPage,
} from "./ducks";
import { push } from "connected-react-router";
import { FormikActions } from "formik";

export interface HospitalRegistrationPageProps {
  onSubmit: typeof updateHospitalRegistrationPage;
  intl: any;
  push: typeof push;
}

export interface FormHospitalRegistrationPageProps {
  onSubmit: typeof updateHospitalRegistrationPage;
  intl: any;
  push: typeof push;
}

export interface initialStateHospitalRegistrationPageType {
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

export type HospitalRegistrationPageActionTypes =
  | defaultAction
  | updateAction;
