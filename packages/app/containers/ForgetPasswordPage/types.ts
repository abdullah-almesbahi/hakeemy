import { push } from "connected-react-router";
import { FormikActions } from "formik";
import {
  patientForgotPassword,
  patientForgotPasswordSuccess,
  patientForgotPasswordError,
  hospitalForgotPassword,
  hospitalForgotPasswordSuccess,
  hospitalForgotPasswordError,
  PATIENT_FORGOT_PASSWORD,
  PATIENT_FORGOT_PASSWORD_ERROR,
  PATIENT_FORGOT_PASSWORD_SUCCESS,
  HOSPITAL_FORGOT_PASSWORD_ERROR,
  HOSPITAL_FORGOT_PASSWORD_SUCCESS,
  HOSPITAL_FORGOT_PASSWORD
} from "./ducks";

export interface ForgetPasswordPageProps {
  patientForgotPassword: typeof patientForgotPassword;
  patientForgotPasswordSuccess: typeof patientForgotPasswordSuccess;
  patientForgotPasswordError: typeof patientForgotPasswordError;
  hospitalForgotPassword: typeof hospitalForgotPassword;
  hospitalForgotPasswordSuccess: typeof hospitalForgotPasswordSuccess;
  hospitalForgotPasswordError: typeof hospitalForgotPasswordError;
  forgetPassword: initialStateForgetPasswordPageType;
  push: typeof push;
  intl: any;
}

// export interface FormForgetPasswordPageProps {
//   onSubmit: typeof updateForgetPasswordPage;
//   intl: any;
//   push: typeof push;
// }

export interface initialStateForgetPasswordPageType {
  email: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface patientForgotPassword {
  type: typeof PATIENT_FORGOT_PASSWORD;
  email: string;
}
export interface patientForgotPasswordSuccess {
  type: typeof PATIENT_FORGOT_PASSWORD_SUCCESS;
  email: string;
}
export interface patientForgotPasswordError {
  type: typeof PATIENT_FORGOT_PASSWORD_ERROR;
  error: string;
}

export interface hospitalForgotPassword {
  type: typeof HOSPITAL_FORGOT_PASSWORD;
  email: string;
}
export interface hospitalForgotPasswordSuccess {
  type: typeof HOSPITAL_FORGOT_PASSWORD_SUCCESS;
  email: string;
}
export interface hospitalForgotPasswordError {
  type: typeof HOSPITAL_FORGOT_PASSWORD_ERROR;
  error: string;
}

export type ForgetPasswordPageActionTypes =
  | patientForgotPassword
  | patientForgotPasswordSuccess
  | patientForgotPasswordError
  | hospitalForgotPassword
  | hospitalForgotPasswordSuccess
  | hospitalForgotPasswordError;
