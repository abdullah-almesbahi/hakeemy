import { DEFAULT_ACTION, UPDATE_ACTION } from "./ducks";

export interface MultiSelectProps {
  onSubmit: typeof updateMultiSelect;
  intl: any;
  push: typeof push;
}

export interface initialStateMultiSelectType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}

export type MultiSelectActionTypes = defaultAction;
