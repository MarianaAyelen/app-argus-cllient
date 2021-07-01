import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [nameOfMovie, setNameOfMovie] = useState();

  const callSomeApi = async() => {
    try{
      let response = await fetch('https://app-argus-server.herokuapp.com/hello');
      let json = await response.json();
      setNameOfMovie(json.response);
      return json;
    } catch (error) {
      console.log(error); 
    };
  };

  useEffect(() => {
    callSomeApi();
  });


  return (
    <View style={styles.container}>
      <Text>{`El servidor te dice: ${nameOfMovie}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
