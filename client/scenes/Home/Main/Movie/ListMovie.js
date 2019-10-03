import React, { useState, useEffect } from 'react';
import {Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from 'app/graphql/Query';

import styles from './Style';
import { Ionicons } from '@expo/vector-icons';

const ListMovie = ({ navigation }) => {

  const [inputFocus, setInputFocus] = useState(false);
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(GET_MOVIES);
  const [page, setPage] = useState(1);
  
  const handleLoadMore = _ => {
    console.log('load more');
  };
  
  const renderItem = ({ item, index }) => {
    return (
      <View
      style={styles.card}
      >
        <View
          style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}
        >
          <TouchableOpacity
          style={styles.image}
          activeOpacity={0.8}
          onPress={_ => navigation.navigate('Detail', { id: item._id })}
          >
            <Image
            style={{ flex: 1 }}
            source={{ uri: item.poster_path.image_url }}
            />
          </TouchableOpacity>
          <View style={styles.boxInfo}>
            <View style={styles.info}>
              <Ionicons name="md-tv"
              style={styles.icon} size={20} />
              <Text style={{ color: 'rgba(128, 128, 128, .8)', fontWeight: 'bold', flexShrink: 1 }}>
                {item.title}
              </Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="ios-star-outline"
              style={styles.icon} size={20} />
              <Text style={{ color: 'rgba(128, 128, 128, .8)' }}>
                {item.popularity}/10
              </Text>
            </View>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}>
              <Ionicons name="md-bookmark"
              style={{ color: 'white', marginRight: 10 }} size={20} />
              <Text style={{ color: 'white', fontSize: 13 }}
              >
                Add To Favorite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please wait</Text>
        <AnimatedEllipsis
        numberOfDots={4}
        style={{
          color: 'rgb(54, 90, 209)',
          fontSize: 72,
        }}
        animationDelay={150}/>
      </View>
    )
  };

  if (error) return <Text>Error :(</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        {!inputFocus ? 
        <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={_ => navigation.navigate('AddMovie')}>
          <Text style={{ color: 'white' }}>ADD</Text>
        </TouchableOpacity> : null}
        <TextInput
        onFocus={_ => setInputFocus(true)}
        onBlur={_ => setInputFocus(false)}
        editable
        onChangeText={val => setSearch(val)}
        placeholder='Search ...'
        style={!inputFocus ? styles.search : [styles.search, styles.searchFocus]}
        placeholderTextColor='rgba(0, 0, 0, .5)'
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={data.movies.filter(el => new RegExp(search, "i").test(el.title))}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        onEndReachedThreshold={0.1}
        onEndReached={() => handleLoadMore()}
      />
    </View>
  )
}

export default ListMovie;
