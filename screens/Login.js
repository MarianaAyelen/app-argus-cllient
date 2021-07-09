import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import HeaderApp from './HeaderApp';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />
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
                <Text style={styles.inputLabel}>Contraseña: </Text>
                <TextInput
                secureTextEntry={true}
                value={password}
                maxLength = {8}
                onChangeText={(password) => setPassword(password)}
                placeholder={'Password'}
                style={styles.input}
                />
            </View>

            <View style={styles.row, {alignItems: 'center'}}>
                <TouchableOpacity onPress={() => loginRequest(username, password)} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}


async function loginRequest(userName, password) {
  try{
    let response = await fetch(`https://app-argus-server.herokuapp.com/sign-in?username=${userName}&password=${password}`);
    let json = await response.json();
    if(response.ok){
      alert(json.response);
    }else{
      alert(json.message);
    }

    
    return json;
  } catch (error) {
    alert(error);
  };
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
  });
  