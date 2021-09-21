import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderApp from './HeaderApp';
import * as Progress from 'react-native-progress';

export default function Inicio() {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeaderApp />
      <View style={styles.column}>
          <View style={styles.column, {marginTop: 160}}>

          </View>
          <View style={styles.row}>
              <Progress.Circle size={130} indeterminate={true} />
          </View>
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
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
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
  spinnerTextStyle: {
    color: '#2E86C1',
  },
});
