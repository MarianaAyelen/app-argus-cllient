import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import HeaderApp from './HeaderApp';

export default function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />
            <View style={styles.row, {alignItems: 'center', marginTop: 40}}>
                <Text style={styles.inputLabel}>Usuario: </Text>
                <TextInput
                value={userName}
                maxLength = {12}
                onChangeText={(userName) => setUserName(userName)}
                placeholder={'UserName'}
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
                <TouchableOpacity onPress={() => alert('Bienvenido: ' + userName)} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
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
  