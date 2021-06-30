import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{getMoviesFromApi()}</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const getMoviesFromApi = () => {
  return fetch('https://app-argus-server.herokuapp.com/ping')
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
