import { SEND_CONTACT_US, sendContactUs } from './ducks';
import { FormikActions } from 'formik';
import { NavigationStackProp } from 'react-navigation-stack';

export interface ContactPageProps {
  onSubmit: typeof sendContactUs;
  intl: any;
  navigation: NavigationStackProp;
}

export interface FormContactPageProps {
  onSubmit: typeof sendContactUs;
  intl: any;
  navigation: NavigationStackProp;
}

export interface initialStateContactPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface sendContactUsAction {
  type: typeof SEND_CONTACT_US;
  data: any;
  action: FormikActions<any>;
}

export type ContactPageActionTypes = sendContactUsAction;
