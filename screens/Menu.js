import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import HeaderApp from './HeaderApp';
import call from 'react-native-phone-call';
import { useNavigation } from '@react-navigation/native';

export default function Menu({ route, navigation }){
 
  const args = {
    number: '5491125620754', 
    prompt: false 
  }

  const { userToken } = route.params;

  function callModule() {
    call(args).catch(console.error);
  }

  return(
      <View style={styles.container}>
          <StatusBar style="auto" />
          <HeaderApp />
          <Text>token: {JSON.stringify(userToken)}</Text>
          <View style={styles.row, {alignItems:'center', marginTop: 40}}>
              <TouchableOpacity onPress={() => callModule()} style={styles.button}>
              <Text style={styles.buttonText}>Llamar</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.row, {alignItems: 'center'}}>
              <TouchableOpacity onPress={() => alert('Ver mapa')} style={styles.button}>
              <Text style={styles.buttonText}>Ver mapa</Text>
              </TouchableOpacity>
          </View>

          
          <View style={styles.row, {alignItems: 'center'}}>
              <TouchableOpacity onPress={() => alert('Ver alarmas')} style={styles.button}>
              <Text style={styles.buttonText}>Ver alarmas</Text>
              </TouchableOpacity>
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