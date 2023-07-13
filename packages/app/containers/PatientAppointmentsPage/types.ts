
import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
} from "./ducks";

export interface MyAppointmentsPageProps {
  onSubmit: typeof updateMyAppointmentsPage;
  intl: any;
  push: typeof push;
}


export interface initialStateMyAppointmentsPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}


export type MyAppointmentsPageActionTypes =
  | defaultAction
  
