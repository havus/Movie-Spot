import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.1.15:4000',
  }),
  cache: new InMemoryCache(),
});