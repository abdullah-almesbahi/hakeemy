import { push } from 'connected-react-router';
import { showSnackbar } from '../Snackbar/ducks';

export interface ChangePasswordPageProps {
  intl: any;
  onSubmit: any;
  push: typeof push;
  showSnackbar: typeof showSnackbar;
}

export interface FormChangePasswordPageProps {
  onSubmit: (data: any, action: any) => void;
  intl: any;
  push: typeof push;
}
