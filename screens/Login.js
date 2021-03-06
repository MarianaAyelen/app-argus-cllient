import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import HeaderApp from './HeaderApp';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { userStorage } from './LocalStorage';
import { notificaciones } from './Notificaciones';

export default function Login() {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');

    async function saveToken(token) {
      await userStorage.save(token);
    }

    async function getToken() {
      let tokenUserStorage = await userStorage.get();
      if(tokenUserStorage != null){
        let token = (tokenUserStorage["token"]);
        console.log("TOKEN: " + token)
        return token;
      }else{
        console.log("token null")
        return null;
      }
    }


    async function loginRequest(userName, password) {
      try{
        let expoToken = await 
        notificaciones.getPushNotificationPermissions();
        let response = await fetch(`https://app-argus-server.herokuapp.com/login`, {
          method: 'POST',       
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },         
          body: JSON.stringify({
            username: userName,
            password: password,
            expoToken: expoToken
          
          })
        });
        let json = await response.json();
        console.log(json)
        if(response.ok){
          let token = json.token;
          saveToken(token);
          navigation.navigate('Menu');
        }else{
          var textError = "";
          if(json.response != null)
            textError += json.response + " - ";
          if(json.message != null)
            textError += json.message + " - ";
          setModalText(textError);
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
                  <Text style={styles.inputLabel}>Usuario: </Text>
                  <TextInput
                  value={username}
                  maxLength = {12}
                  onChangeText={(username) => setUsername(username)}
                  placeholder={'Username'}
                  style={styles.input}
                  />
              </View>

              <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                  <Text style={styles.inputLabel}>Contrase??a: </Text>
                  <TextInput
                  secureTextEntry={true}
                  value={password}
                  maxLength = {15}
                  onChangeText={(password) => setPassword(password)}
                  placeholder={'Password'}
                  style={styles.input}
                  />
              </View>

              <View style={styles.row, {alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => loginRequest(username, password)} style={styles.buttonSignIn}>
                  <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
              </View>
              

              <View style={styles.centeredView}>
              <Modal animationType="fadegit " transparent={true} visible={modalVisible}
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
  