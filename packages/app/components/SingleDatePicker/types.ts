import { DEFAULT_ACTION, UPDATE_ACTION } from "./ducks";

export interface SingleDatePickerProps {
  onSubmit: typeof updateSingleDatePicker;
  intl: any;
  push: typeof push;
}

export interface initialStateSingleDatePickerType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}

export type SingleDatePickerActionTypes = defaultAction;
