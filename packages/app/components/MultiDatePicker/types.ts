import { DEFAULT_ACTION, UPDATE_ACTION } from "./ducks";

export interface MultiDatePickerProps {
  onSubmit: typeof updateMultiDatePicker;
  intl: any;
  push: typeof push;
}

export interface initialStateMultiDatePickerType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}

export type MultiDatePickerActionTypes = defaultAction;
