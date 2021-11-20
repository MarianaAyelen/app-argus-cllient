import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import HeaderApp from './HeaderApp';
import { StatusBar } from 'expo-status-bar';

export default function Ayuda(){
    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />
            <Text style={styles.nosotros}>Nosotros</Text>
            <Text style={styles.basicText}>Argus es una aplicación que permite cuidar a tus seres queridos, objetos de valor o lo que desees</Text>
            <Text style={styles.nosotros}>Configuración</Text>
            <Text style={styles.basicText}>Para configurar el módulo debes seguir los siguientes pasos:</Text>
            <Text style={styles.enums}>1-   Entrar a la sección "Configurar módulo" y cargar todos los datos. Tené a mano el número de serie! </Text>
            <Text style={styles.enums}>2-   Cuando el módulo encienda la luz, precionar el botón verde. Listo! Ya podés monitorear lo que desees! </Text>
            <Text style={styles.nosotros}>Funcionalidades:</Text>
            <Text style={styles.enums}>1-  Ver la ubicación en tiempo real en la sección "Ver mapa"</Text>
            <Text style={styles.enums}>2-  Configurar zona segura y zona peligrosa en la sección "Zona segura/peligrosa". Recibirás una alerta si no se cumplen!</Text>
            <Text style={styles.enums}>3-  Ver las últimas actividades del módulo en la sección "Ver actividad"</Text>
            <Text style={styles.enums}>4-  Comunicarte con el módulo en la sección "Llamar"</Text>
            <Text style={styles.names}>By Jazmin Ferreyra & Mariana Romero</Text>
            
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
        marginRight: 5
      },
      enums: {
        fontFamily: 'serif',
        color: 'black',
        fontSize: 15,
        marginTop: 1,
        marginLeft: 40,
        marginRight: 5
      },
      nosotros: {
        fontFamily: 'serif',
        color: '#2E86C1',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15,
      },
      names: {
        fontFamily: 'serif',
        color: '#2E86C1',
        fontSize: 12,
        marginTop: 50,
        marginLeft: 150,
      }
});