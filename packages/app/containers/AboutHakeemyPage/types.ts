
import {
  DEFAULT_ACTION,
  UPDATE_ACTION,
} from "./ducks";

export interface AboutHakeemyPageProps {
  onSubmit: typeof updateAboutHakeemyPage;
  intl: any;
  push: typeof push;
}


export interface initialStateAboutHakeemyPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}


export type AboutHakeemyPageActionTypes =
  | defaultAction
  
