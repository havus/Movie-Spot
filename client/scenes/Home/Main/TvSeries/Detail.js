import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { getTvSeries } from 'app/graphql/Query';

const Detail = ({ navigation }) => {
  const { loading, error, data } = useQuery(getTvSeries(navigation.state.params.id));

  const renderInfo = _ => {
    const divider = <Text style={{ marginVertical: 3 }}>: </Text>;

    return (
      <View style={styles.boxInfo}>
        <View style={styles.oneInfo}>
          <Text style={styles.infoLeft}>Title</Text>
          {divider}
          <Text style={styles.info}>{data.tvSeriesDetail.title}</Text>
        </View>
        <View style={styles.oneInfo}>
          <Text style={styles.infoLeft}>Rating</Text>
          {divider}
          <Text style={styles.info}>{data.tvSeriesDetail.popularity}</Text>
        </View>
        <View style={styles.oneInfo}>
          <Text style={styles.infoLeft}>Overview</Text>
          {divider}
          <Text style={styles.info}>{data.tvSeriesDetail.overview}</Text>
        </View>
        <View style={styles.oneInfo}>
          <Text style={styles.infoLeft}>Tag</Text>
          {divider}
          <Text style={styles.info}>{(data.tvSeriesDetail.tag).join(', ')}</Text>
        </View>
        <View style={styles.oneInfo}>
          <Text style={styles.infoLeft}>Status</Text>
          {divider}
          <Text style={styles.info}>{data.tvSeriesDetail.status}</Text>
        </View>
      </View>
    )
  }

  if (loading) return <Text>Loading... :)</Text>;
  if (error) return <Text>Error :(</Text>;
    
  return (
    <ScrollView style={styles.container}>
      <Image
        style={{ height: 200 }}
        source={{ uri: data.tvSeriesDetail.poster_path.image_url }}
      />
      {renderInfo()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxInfo: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  oneInfo: {
    flexDirection: 'row',
  },
  infoLeft: {
    flexBasis: 100,
  },
  info: {
    flexShrink: 1,
    marginVertical: 3,
  }
})

export default Detail;