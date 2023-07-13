import {
  SET_USER,
  SET_USER_TYPE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER,
  LOGOUT_USER,
  LOAD_USER
} from "./ducks";
import { drawerLoadedAction } from "containers/DrawerPage/types";

export enum UserType {
  Teacher = 1,
  Student = 2,
  Admin = 3
}

export interface initialStateUserType {
  user_type: number;

  age: number | null;
  api_key: string;
  created_date: string;
  dob: string;
  email: string;
  gender: string;
  id: number;
  mail_subs: number;
  mobile: string;
  name: string;
}

export interface setUserAction {
  type: typeof SET_USER;
  user: initialStateUserType;
}

export interface setUserTypeAction {
  type: typeof SET_USER_TYPE;
  user_type: UserType;
}

export interface loginUserSuccessAction {
  type: typeof LOGIN_USER_SUCCESS;
  user: initialStateUserType;
}
export interface loginUserErrorAction {
  type: typeof LOGIN_USER_ERROR;
}
export interface logoutUserAction {
  type: typeof LOGOUT_USER;
}
export interface updateUserAction {
  type: typeof UPDATE_USER;
}
export interface loadUserAction {
  type: typeof LOAD_USER;
}

export type UserActionTypes =
  | setUserAction
  | setUserTypeAction
  | loginUserSuccessAction
  | loginUserErrorAction
  | logoutUserAction
  | updateUserAction
  | drawerLoadedAction
  | loadUserAction;
