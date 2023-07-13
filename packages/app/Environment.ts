import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { OperationDefinitionNode } from 'graphql';
import Sentry from './components/Sentry';

let httpLink: any;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      if (__DEV__) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        );
      } else {
        Sentry.captureException(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        );
      }
    });
  }
  if (networkError) {
    if (__DEV__) {
      console.log(`[Network error]: ${networkError}`);
    } else {
      Sentry.captureException(`[Network error]: ${networkError}`);
    }
  }
});

httpLink = (token: string) => {
  return new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
      ? process.env.REACT_APP_GRAPHQL_ENDPOINT
      : 'https://prisma.hakeemy.com/hakeemy/default',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      authorization: token ? `Bearer ${token}` : ''
    },
    fetchOptions: {
      method: 'POST'
    }
    // defaultOptions: {
    //   watchQuery: {
    //     errorPolicy: 'all'
    //   },
    //   query: {
    //     errorPolicy: 'all'
    //   },
    //   mutate: {
    //     errorPolicy: 'all'
    //   }
    // }
  });
};

const headerLink = (token: string) => {
  return new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }: any) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }));
    return forward(operation);
  });
};

// const wsLink = new WebSocketLink({
//   //   uri: `${window.location.protocol === "https:" ? "wss" : "ws"}://${
//   //     window.location.host
//   //   }/ws/`,
//   uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_WS
//     ? process.env.REACT_APP_GRAPHQL_ENDPOINT_WS
//     : 'http://localhost:4000',
//   options: {
//     reconnect: true
//   }
// });

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData
// });

const cache = new InMemoryCache();

export const client = (token: string) => {
  return new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      headerLink(token),
      httpLink(token)
      // split(
      //   ({ query }) => {
      //     const definition = getMainDefinition(query);
      //     return (
      //       definition.kind === 'OperationDefinition' &&
      //       definition.operation === 'subscription'
      //     );
      //   },
      //   wsLink,
      //   httpLink(token)
      // )
    ]),
    cache
    // cache: new InMemoryCache({
    //   dataIdFromObject: object => object.id,
    //   fragmentMatcher
    // })
  });
};
