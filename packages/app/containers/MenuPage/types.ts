import { DEFAULT_ACTION } from './ducks';
import { push } from 'connected-react-router';
import { setUserType, logoutUser } from '../User/ducks';
import { showSnackbar } from '../Snackbar/ducks';

export interface MenuPageProps {
  // onSubmit: typeof updateMenuPage;
  intl: any;
  push: typeof push;
  setUserType: typeof setUserType;
  showSnackbar: typeof showSnackbar;
  logoutUser: typeof logoutUser;
}

export interface initialStateMenuPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}

export type MenuPageActionTypes = defaultAction;
