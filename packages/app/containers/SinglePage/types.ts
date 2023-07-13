import { match } from 'react-router';
import { push } from 'connected-react-router';

interface RequestParams {
  //   q?: string;
  //   id: string;
  slug: string;
  //   page?: string;
}

export interface SinglePageProps {
  match: match<RequestParams>;
  push: typeof push;
}
