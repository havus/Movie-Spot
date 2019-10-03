import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, TextInput, ImageBackground, View, Image, StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';

const Auth = ({ navigation }) => {
  const [fontLoaded, setfontLoaded] = useState(false);
  const fontLoader = async _ => {
    await Font.loadAsync({
      'dancing-script-bold': require('app/assets/fonts/DancingScript-Bold.ttf'),
      'livvic-regular': require('app/assets/fonts/Livvic-Regular.ttf'),
    });
    setfontLoaded(true);
  }
  
  useEffect(_ => {
    fontLoader();
  }, []);

  if (!fontLoaded) return null;

  return (
    <ImageBackground
    style={styles.container}
    source={require('app/assets/bg1.jpg')}
    >
      <Text style={styles.titleText}>Our App</Text>
      <View style={styles.box}>
        <TextInput
        editable
        placeholder='Username'
        style={styles.input}
        placeholderTextColor='rgba(255, 255, 255, .8)'
        />
        <TextInput
        editable
        placeholder='Password'
        style={styles.input}
        placeholderTextColor='rgba(255, 255, 255, .8)'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={_ => navigation.navigate('Home')}
          >
          <Text style={styles.textButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
  },
  titleText: {
    fontFamily: 'dancing-script-bold',
    fontSize: 33,
    color: 'white',
    marginTop: '30%',
    marginBottom: 90,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    borderBottomColor: 'rgba(255, 255, 255, .9)',
    borderBottomWidth: 1.5,
    paddingVertical: 0,
    paddingHorizontal: 7,
    width: '100%',
    borderRadius: 3,
    height: 30,
    color: 'white',
    marginVertical: 10,
  },
  button: {
    marginTop: 35,
    backgroundColor: '#424BEE',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
  },
  textButton: {
    color: 'white',
    letterSpacing: 2,
    fontFamily: 'livvic-regular',
    fontSize: 15,
  }
});


export default Auth;