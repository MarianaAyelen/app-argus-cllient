import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import HeaderApp from './HeaderApp';
import call from 'react-native-phone-call';
import { useNavigation } from '@react-navigation/native';
import AjustesMenu from './AjustesMenu';
import { userStorage } from './LocalStorage';

export default function Menu({ navigation }){


  async function callModule() {
    let number = await getModuleNumber();
    const args = {
      number: number, 
      prompt: false 
    }
    if(number != null)
      call(args).catch(console.log("ERROR AL LLAMAR"));
  }

  const getToken = async() => {
    var localStorageResult = await userStorage.get();
    let token = await localStorageResult["token"];
    return token;
}

  async function getModuleNumber(userName, password) {
    var token = await getToken();
    try{
      let response = await fetch(`https://app-argus-server.herokuapp.com/get-number`, { 
        method: 'get', 
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      });
      let json = await response.json();
      if(response.ok){
        return json.number
      }else{
        alert(json.message)
        return null
      }
    } catch (error) {
      alert(error);
    };
  }

  return(
      <View style={styles.container}>
          <StatusBar style="auto" />
          <HeaderApp />
          <View style={styles.row, {alignItems:'center', marginTop: 40}}>
              <TouchableOpacity onPress={() => callModule()} style={styles.button}>
              <Text style={styles.buttonText}>Llamar</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.row, {alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Mapa')} style={styles.button}>
              <Text style={styles.buttonText}>Ver mapa</Text>
              </TouchableOpacity>
          </View>

          
          <View style={styles.row, {alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Actividad')} style={styles.button}>
              <Text style={styles.buttonText}>Ver actividad</Text>
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
