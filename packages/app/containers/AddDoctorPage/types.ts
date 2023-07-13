
import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
  updateAddDoctorPage,
} from "./ducks";
import { push } from "connected-react-router";
import { FormikActions } from "formik";

export interface AddDoctorPageProps {
  onSubmit: typeof updateAddDoctorPage;
  intl: any;
  push: typeof push;
}

export interface FormAddDoctorPageProps {
  onSubmit: typeof updateAddDoctorPage;
  intl: any;
  push: typeof push;
}

export interface initialStateAddDoctorPageType {
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

export type AddDoctorPageActionTypes =
  | defaultAction
  | updateAction;
