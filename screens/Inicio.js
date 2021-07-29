import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderApp from './HeaderApp';

export default function Inicio() {
  const [serverResponse, setServerResponse] = useState();

  const navigation = useNavigation();

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
      <HeaderApp />

      <View style={styles.row, {alignItems:'center', marginTop: 110}}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row, {alignItems: 'center'}}>
        <TouchableOpacity onPress={() =>  navigation.navigate('Registro')} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row, {marginTop:200, marginLeft:210}}>
        <Text>{`El servidor te dice: ${serverResponse}`}</Text>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
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
    marginLeft: 10,
    marginTop: 20,
  },
  argusStyle: {
    fontFamily: 'Roboto',
    color: '#2E86C1',
    fontSize: 20,
    marginLeft: 10,
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
