import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
      <StatusBar style="auto" />
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Image source={logo} style={styles.logoStyle} /> 
          </View>
          <View style={styles.row}>
            <Text style={styles.argusStyle}>Argus</Text>
          </View>
        </View>
        <View>
          <Text style={styles.locationStyle}>Location Traker</Text>  
        </View>
      </View>

      <View style={styles.row, {alignItems:'center', marginTop: 110}}>
        <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row, {alignItems: 'center'}}>
        <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row, {marginTop:300, marginLeft:210}}>
        <Text>{`El servidor te dice: ${serverResponse}`}</Text>
      </View>
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
    fontFamily: 'Roboto',
    color: '#2E86C1',
    fontSize: 20,
  },
  locationStyle: {
    fontFamily: 'serif',
    color: '#2E86C1',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 30,
  },
  button: {
    backgroundColor: "#2E86C1",
    padding: 20,
    borderRadius: 15,
    marginTop: 50,
    width: 250,
    height: 100,
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }, 
});
