import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/';

import Home from './scenes/Home/';
import Auth from './scenes/Auth/';

const AppNavigator = createSwitchNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: {
      title: 'Auth',
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

const App = _ => {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  )
}

export default App;