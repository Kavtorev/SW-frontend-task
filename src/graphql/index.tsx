import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  DefaultOptions,
} from '@apollo/client';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  defaultOptions,
});

// not neccessary tbh
export class Apollo extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}

export * from './queries';
