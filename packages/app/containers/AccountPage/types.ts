
import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
} from "./ducks";

export interface AccountPageProps {
  onSubmit: typeof updateAccountPage;
  intl: any;
  push: typeof push;
}


export interface initialStateAccountPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}


export type AccountPageActionTypes =
  | defaultAction
  
