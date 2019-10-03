import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListMovie from './ListMovie';
import Detail from './Detail';
import AddMovie from './AddMovie';

const MovieNavigator = createStackNavigator({
  List: {
    screen: ListMovie,
  },
  Detail: {
    screen: Detail,
    path: 'movie/:id',
  },
  AddMovie: {
    screen: AddMovie,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

const MovieContainer = createAppContainer(MovieNavigator);

export default _ => (
  <MovieContainer></MovieContainer>
);