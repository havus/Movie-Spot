import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Main from './Main/';
import Favorite from './Favorite/';

export default createBottomTabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-list"
        color={tintColor} size={25} />
      )
    },
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-heart-empty"
        color={tintColor} size={25} />
      )
    }
  }
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#FFF',
    inactiveTintColor: '#233C67',
    style: {
      backgroundColor: '#4470AD'
    }
  }
});