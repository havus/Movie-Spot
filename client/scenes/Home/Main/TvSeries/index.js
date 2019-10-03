import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListTvSeries from './ListTvSeries';
import Detail from './Detail';
import AddTvSeries from './AddTvSeries';

const TvSeriesNavigator = createStackNavigator({
  List: {
    screen: ListTvSeries,
  },
  Detail: {
    screen: Detail,
    path: 'tvSeries/:id',
  },
  AddTvSeries: {
    screen: AddTvSeries,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

const TvSeriesContainer = createAppContainer(TvSeriesNavigator);

export default _ => (
  <TvSeriesContainer></TvSeriesContainer>
);