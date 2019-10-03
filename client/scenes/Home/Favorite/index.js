import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fakeData = [
  {
    title: 'Favorite 1',
    overview: 'Ini daftar favorite',
    popularity: 8,
    tag: [],
    status: 'released',
    poster_path: {
      image_url: 'https://i.ibb.co/jh9nRxC/4ea5abbdcf62.jpg'
    }
  }
]

const Favorite = _ => {
  const [search, setSearch] = useState('');

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
              <Ionicons name="md-trash"
              style={{ color: 'white', marginRight: 10 }} size={20} />
              <Text style={{ color: 'white', fontSize: 13 }}
              >Delete from Favorite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: 'white', fontSize: 17, letterSpacing: 1, }}>MY FAVORITE</Text>
      </View>
      <TextInput
      editable
      onChangeText={val => setSearch(val)}
      placeholder='Search ...'
      style={styles.search}
      placeholderTextColor='rgba(0, 0, 0, .5)'
      />
      <FlatList
        style={styles.flatList}
        data={fakeData.filter(el => new RegExp(search, "i").test(el.title))}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#4470AD',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  search: {
    marginTop: 13,
    width: '90%',
    height: 35,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
  },
  flatList: {
    marginTop: 11,
    paddingHorizontal: 13,
  },
  card: {
    flex: 1,
    margin: 3,
    borderRadius: 5,
    height: 100,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '40%',
  },
  boxInfo: {
    width: '60%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingTop: 3,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(128, 128, 128, .7)',
    marginRight: 5,
  },
  button: {
    backgroundColor: 'rgb(221, 74, 88)',
    borderTopLeftRadius: 20,
    width: '100%',
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

export default Favorite;