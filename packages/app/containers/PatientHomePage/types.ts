import { DEFAULT_ACTION, UPDATE_ACTION, updateLauncherPage } from "./ducks";
import { push } from "connected-react-router";
import { FormikActions } from "formik";

export interface LauncherPageProps {
  onSubmit: typeof updateLauncherPage;
  intl: any;
  push: typeof push;
}

export interface FormLauncherPageProps {
  onSubmit: typeof updateLauncherPage;
  intl: any;
  push: typeof push;
}

export interface initialStateLauncherPageType {
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

export type LauncherPageActionTypes = defaultAction | updateAction;
