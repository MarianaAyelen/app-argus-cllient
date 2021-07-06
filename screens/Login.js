import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import { useNavigation } from '@react-navigation/native';

export default function Login() {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.row}>
                <View style={styles.column}>
                <View style={styles.row}>
                    <Image source={logo} style={styles.logoStyle} /> 
                </View>
                <View style={styles.row}>
                    <Text style={styles.argusStyle}>Argus</Text>
                </View>
                </View>
                <View>
                <Text style={styles.locationStyle}>Location Traker</Text>  
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
  