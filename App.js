import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './assets/argusIcon.png'; 
import { useFonts } from 'expo-font';


export default function App() {

  const [serverResponse, setServerResponse] = useState();

  const [loaded] = useFonts({
    titleFont: require('./assets/fonts/bigote.ttf'),
    font4: require('./assets/fonts/font1.ttf'),
  });


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
      <View style={styles.column}>
        <View style={styles.row}>
        <Image source={logo} style={styles.logoStyle} /> 
          <Text style={styles.argusStyle}>Argus</Text>
        </View>
          <Text style={styles.locationStyle}>Location Traker</Text>
        <View style={styles.row}>
        </View>

      </View>
      


      <Text>{`El servidor te dice: ${serverResponse}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    marginTop: 40,
    marginLeft: 20
  },  
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  logoStyle: {
    width: 60,
    height: 60,
  },
  argusStyle: {
    fontFamily: 'titleFont',
    color: '#2E86C1',
    fontSize: 20,
    marginTop: 20
  },
  locationStyle: {
    fontFamily: 'font4',
    color: '#2E86C1',
  }
});
