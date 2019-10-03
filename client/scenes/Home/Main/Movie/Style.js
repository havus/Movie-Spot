import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  boxHeader: {
    width: '90%',
    height: 35,
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchFocus: {
    width: '100%'
  },
  addButton: {
    width: '',
    height: '100%',
    backgroundColor: 'rgb(54, 90, 209)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  search: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    width: '65%',
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
    backgroundColor: 'rgb(54, 90, 209)',
    borderTopLeftRadius: 20,
    width: '100%',
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
