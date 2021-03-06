import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import HeaderApp from './HeaderApp';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { userStorage } from './LocalStorage';

export default function CambiarContrasenia() {


    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');

    const getToken = async() => {
      var localStorageResult = await userStorage.get();

      let token = await localStorageResult["token"];
      return token;
  }

    async function updatePassword(password, newPassword, newPasswordAgain) {
        if(newPassword != newPasswordAgain){
            setModalText('Las contraseñas no coinciden');
            setModalVisible(true);
            return;
        }
      
        let token = await getToken();
        try{
            let response = await fetch(`https://app-argus-server.herokuapp.com/update-password`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': token
                },         
                body: JSON.stringify({
                  oldPassword: password,
                  newPassword: newPassword,
                })});
            let json = await response.json();
            if(response.ok){
              navigation.navigate('Menu', {
                userToken: global.token
              });
            }else{
              var textError = "";
              if(json.oldPassword != null)
                textError += json.oldPassword + " - ";
              if(json.newPassword != null)
                textError += json.newPassword + " - ";
              if(json.message != null)
                textError += json.message;

              setModalText(textError)
                setModalVisible(true);
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
            
            <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                <Text style={styles.inputLabel}>Contraseña: </Text>
                <TextInput
                secureTextEntry={true}
                value={password}
                maxLength = {12}
                onChangeText={(password) => setPassword(password)}
                placeholder={'Password'}
                style={styles.input}
                />
            </View>

            <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                <Text style={styles.inputLabel}>Contraseña nueva: </Text>
                <TextInput
                secureTextEntry={true}
                value={newPassword}
                maxLength = {15}
                onChangeText={(newPassword) => setNewPassword(newPassword)}
                placeholder={'New Password'}
                style={styles.input}
                />
            </View>

            <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                <Text style={styles.inputLabel}>Repetir contraseña: </Text>
                <TextInput
                secureTextEntry={true}
                value={newPasswordAgain}
                maxLength = {15}
                onChangeText={(newPasswordAgain) => setNewPasswordAgain(newPasswordAgain)}
                placeholder={'New Password'}
                style={styles.input}
                />
            </View>

            <View style={styles.row, {alignItems: 'center'}}>
                <TouchableOpacity onPress={() => updatePassword(password, newPassword, newPasswordAgain)} style={styles.buttonSignIn}>
                <Text style={styles.buttonText}>Cambiar Contraseña</Text>
                </TouchableOpacity>
            </View>
            

            <View style={styles.centeredView}>
            <Modal animationType="fade" transparent={true} visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>

              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{modalText}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          </KeyboardAwareScrollView>
      </View>

    );
}

const styles = StyleSheet.create({
    container1: {
      flex: 1
    },
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
  