import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import HeaderApp from './HeaderApp';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SMS from 'expo-sms';
import { userStorage } from './LocalStorage';

export default function disconnect(){
    const navigation = useNavigation();

    
  
  const getToken = async() => {
    var localStorageResult = await userStorage.get();
    let token = await localStorageResult["token"];
    return token;
    }   

    const getDisconnectData = async() => {
        var token = await getToken();
        console.log("ACTIVIDAD REQUEST NOW")
        try{
            let response = await fetch('https://app-argus-server.herokuapp.com/data-disconnect', { 
            method: 'get', 
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            }
            });
    
            return await response.json();
        } catch (error) {
            console.log(error); 
            };
        };

    async function disconnect() {
        let data = await getDisconnectData();
        console.log(data)
        let moduleNumber = data.moduleNumber;
        let serialNumber = data.serialNumber;
        let userId = data.userId;

        let isAvailable = await SMS.isAvailableAsync();
        moduleNumber = "0054911" + moduleNumber;
        let msjText = "A9Gmodule-" + serialNumber + "-desvincular-" + userId + "-";
        if (await isAvailable) {
            const { result } = await SMS.sendSMSAsync([moduleNumber], msjText);
        }

        await userStorage.save("");
        console.log("DESCONECTADO")
        navigation.navigate("Inicio")
    }

    useEffect(() => {
        disconnect();
      }, []);

      return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />
            <Text style={styles.basicText}>Desvinculando....</Text>
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
      basicText: {
        fontFamily: 'serif',
        color: '#2E86C1',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15,
      },
  });