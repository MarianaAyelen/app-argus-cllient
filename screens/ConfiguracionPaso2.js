import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import HeaderApp from './HeaderApp';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SMS from 'expo-sms';
import { Icon } from 'react-native-elements'
import { userStorage } from './LocalStorage';

export default function configuracionPaso2({ route, navigation }){

    const getToken = async() => {
      var localStorageResult = await userStorage.get();
      let token = await localStorageResult["token"];
      return token;
    }

    const { serialNumber, moduleNumber, phoneNumber } = route.params;

    async function sendConfiguration() {
      let token = await getToken();
        try{
          let response = await fetch(`https://app-argus-server.herokuapp.com/config/${serialNumber}/${moduleNumber}/${phoneNumber}`, { 
            method: 'get', 
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Authorization': token
            }
          });
          let json = await response.json();
          if(response.ok){
            navigation.navigate('Menu')
          }else{
            alert(json.message)
            return null
          }
        } catch (error) {
          alert(error);
        };
      }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />

            <KeyboardAwareScrollView>
                <View style={styles.borderStyle}>
                    <Icon name='report'
                        color='#C0392B'
                        size={60}
                        marginTop= {10}/>
                    <Text style={styles.text}>Presiona el botón cuando se encienda el led.</Text>
                </View>
          
                <View style={styles.row, {alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => sendConfiguration()} style={styles.buttonOk}>
                    <Icon
                        name='check'
                        color='#FDFEFE'
                        size={60}/>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
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
    buttonOk: {
      backgroundColor: "#52BE80",
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
    input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
      },
      inputLabel: {
        fontFamily: 'serif',
        color: '#2E86C1',
        fontSize: 15,
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 100,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: "#C0392B",
        borderRadius: 15,
        width: '80%',
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 15,
        color: "#C0392B",
      },
      text:{
          marginTop: 20,
          marginRight: 35,
          marginLeft: 35,
          marginBottom: 50,
          fontSize: 20,
          textAlign: "center",
          color: "#C0392B"

      },
      borderStyle:{
        marginTop: 40,
        marginRight: 35,
        marginLeft: 35,
        marginBottom: 100,
        borderWidth: 1,
        borderColor: "#C0392B",
        borderRadius: 50,
      }
  });
  