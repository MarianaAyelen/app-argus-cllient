import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import HeaderApp from './HeaderApp';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SMS from 'expo-sms';


export default function configuracion(){
    const navigation = useNavigation();
    const [serialNumber, setSerialNumber] = useState('');
    const [moduleNumber, setModuleNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    async function sendSMS(serialNumber, moduleNumber, phoneNumber) {
        let isAvailable = await SMS.isAvailableAsync();
        phoneNumber = "0054911" + phoneNumber;
        let msjText = "A9Gmodule" + serialNumber + "-" + phoneNumber + "-";
        if (await isAvailable) {
            const { result } = await SMS.sendSMSAsync([moduleNumber], msjText);
        }

        navigation.navigate("ConfigurationStep2", {
          serialNumber: serialNumber,
          moduleNumber: moduleNumber,
          phoneNumber: phoneNumber
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />

            <KeyboardAwareScrollView>

                <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                    <Text style={styles.inputLabel}>Número de serie: </Text>
                    <TextInput
                    value={serialNumber}
                    maxLength = {20}
                    onChangeText={(serialNumber) => setSerialNumber(serialNumber)}
                    placeholder={'Número de serie'}
                    style={styles.input}
                    />
                </View>
         
                <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                    <Text style={styles.inputLabel}>Número del módulo: </Text>
                    <TextInput
                    value={moduleNumber}
                    maxLength = {20}
                    onChangeText={(moduleNumber) => setModuleNumber(moduleNumber)}
                    placeholder={'Número del módulo'}
                    style={styles.input}
                    />
                </View>

                <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                    <Text style={styles.inputLabel}>Número del teléfono: </Text>
                    <TextInput
                    value={phoneNumber}
                    maxLength = {20}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    placeholder={'Número del teléfono'}
                    style={styles.input}
                    />
                </View>
          
                <View style={styles.row, {alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => sendSMS(serialNumber, moduleNumber, phoneNumber)} style={styles.buttonSignIn}>
                    <Text style={styles.buttonText}>Enviar</Text>
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
    buttonSignIn: {
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
        borderRadius: 20,
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
      }
  });
  