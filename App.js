import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './assets/argusIcon.png'; 


export default function App() {

  const [serverResponse, setServerResponse] = useState();

  const callSomeApi = async() => {
    try{
      let response = await fetch('https://app-argus-server.herokuapp.com/hello');
      let json = await response.json();
      setServerResponse(json.response);
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
      <Image source={logo} style={styles.logoStyle} /> 
      <Text>Argus</Text>


      <Text>{`El servidor te dice: ${serverResponse}`}</Text>
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
  logoStyle: {
    width: 100,
    height: 100,
  },
});
