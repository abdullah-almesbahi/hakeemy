import { push } from 'connected-react-router';

interface Params {
  params: any;
}
export interface ViewPostPageProps {
  push: typeof push;
  intl: any;
  match: Params;
}
