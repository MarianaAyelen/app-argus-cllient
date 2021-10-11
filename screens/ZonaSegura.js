import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import HeaderApp from './HeaderApp';
import { StatusBar } from 'expo-status-bar';

export default function ZonaSegura(){
    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />

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
        color: 'black',
        fontSize: 15,
        marginTop: 1,
        marginLeft: 15,
      },
      enums: {
        fontFamily: 'serif',
        color: 'black',
        fontSize: 15,
        marginTop: 1,
        marginLeft: 40,
      },
      nosotros: {
        fontFamily: 'serif',
        color: '#2E86C1',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15,
      }
});