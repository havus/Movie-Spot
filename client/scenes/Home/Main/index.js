import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Movie from './Movie/';
import TvSeries from './TvSeries/';

const MainNavigator = createMaterialTopTabNavigator({
  Movie: {
    screen: Movie,
    navigationOptions: {
      title: 'Movie'
    },
  },
  TvSeries: {
    screen: TvSeries,
    navigationOptions: {
      title: 'TvSeries'
    },
  }
}, {
  tabBarOptions: {
    activeTintColor: '#FFF',
    inactiveTintColor: '#233C67',
    style: {
      backgroundColor: '#4470AD',
      marginTop: StatusBar.currentHeight,
    },
    labelStyle: {
      letterSpacing: 2,
    },
  }
});

const MainContainer = createAppContainer(MainNavigator);

const Main = _ => {
  return (
    <MainContainer />
  )
}

export default Main;