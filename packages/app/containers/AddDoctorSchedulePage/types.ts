
import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
  updateAddDoctorSchedulePage,
} from "./ducks";
import { push } from "connected-react-router";
import { FormikActions } from "formik";

export interface AddDoctorSchedulePageProps {
  onSubmit: typeof updateAddDoctorSchedulePage;
  intl: any;
  push: typeof push;
}

export interface FormAddDoctorSchedulePageProps {
  onSubmit: typeof updateAddDoctorSchedulePage;
  intl: any;
  push: typeof push;
}

export interface initialStateAddDoctorSchedulePageType {
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

export type AddDoctorSchedulePageActionTypes =
  | defaultAction
  | updateAction;
