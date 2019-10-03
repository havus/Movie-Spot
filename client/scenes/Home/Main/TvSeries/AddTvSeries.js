import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useMutation } from '@apollo/react-hooks';

import { ADD_TVSERIES } from 'app/graphql/Mutation';
import { GET_TVSERIES } from 'app/graphql/Query';

const AddTvSeries = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [popularity, setPopularity] = useState(0);
  const [overview, setOverview] = useState('');
  const [tag, setTag] = useState('');
  const [status, setStatus] = useState(null);
  const [poster_path, setPoster_path] = useState('null');
  const [uriPrev, setUriPrev] = useState(null);
  const [addSuccess, setAddSuccess] = useState(false);

  getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    
    if (!result.cancelled) {
      setPoster_path(result.base64);
      setUriPrev(result.uri);
    }
  };

  const [addTvSeries, { loading, error }] = useMutation(ADD_TVSERIES, {
    onCompleted() {
      setAddSuccess(true);
      setTimeout(() => {
        setAddSuccess(false);
        navigation.navigate('List');
      }, 1000);
    },
    onError() {
      setTimeout(() => {
        navigation.navigate('List');
      }, 1000);
    },
    update(cache, { data: { addTvSeries } } ) {
      const { tvSeries } = cache.readQuery({ query: GET_TVSERIES });
      cache.writeQuery({
        query: GET_TVSERIES,
        data: { tvSeries: tvSeries.concat([addTvSeries]) },
      });
    }
  });

  const submitData = _ => {
    addTvSeries({
      variables: {
        title,
        popularity,
        tag: tag.split(','),
        overview,
        status,
        poster_path
      }
    })
    .catch(console.log);
  }
  
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
  }

  if (error) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: 'red'}}>Something wrong!</Text>
      </View>
    )
  }

  if (addSuccess) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: 'rgb(97, 236, 97)'}}>Success!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Title</Text>
        <TextInput
        onChangeText={val => setTitle(val)}
        style={styles.input}
        placeholder="Required"/>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Popularity</Text>
        <TextInput
        keyboardType="number-pad"
        onChangeText={val => setPopularity(+val)}
        style={styles.input}
        placeholder="Required"/>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Overview</Text>
        <TextInput
        onChangeText={val => setOverview(val)}
        style={styles.input}
        placeholder="Required"/>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Tag</Text>
        <TextInput
        onChangeText={val => setTag(val)}
        style={styles.input}
        placeholder="Optional"/>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Status</Text>
        <TextInput
        onChangeText={val => setStatus(val)}
        style={styles.input}
        placeholder="Optional"/>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Poster</Text>
        <TouchableOpacity
        style={styles.buttonUpload}
        activeOpacity={0.8}
        onPress={_ => {getPermissionAsync(); _pickImage()}}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>Upload an image</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={_ => submitData()}>
        <Text style={{ color: 'white', alignSelf: 'center' }}>ADD TV SERIES</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  inputBox: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    marginVertical: 2,
  },
  text: {
    width: 100,
    letterSpacing: 1,
    color: 'rgb(10,10,10)'
  },
  input: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    flexGrow: 1,
  },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: 'rgb(54, 90, 209)',
    borderRadius: 25,
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  buttonUpload: {
    backgroundColor: 'rgba(165, 165, 165, .7)',
    justifyContent: 'center',
    height: '100%',
    flexGrow: 1,
    borderRadius: 25,
  },
  poster_path: {
    width: 100,
    height: 80,
  }
})

export default AddTvSeries;