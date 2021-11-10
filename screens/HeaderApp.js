import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import { notificaciones } from './Notificaciones';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { userStorage } from './LocalStorage';

export default function HeaderApp() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [changeInterval, setChangeInterval] = useState(true);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  const getToken = async() => {
    var localStorageResult = await userStorage.get();
    let token = await localStorageResult["token"];
    return token;
}

  const callIsAlert = async() => {
    var token = await getToken();
    try{
        //console.log("CALL IS ALERT INTERVAL")
        let response = await fetch('https://app-argus-server.herokuapp.com/is-alert', { 
          method: 'get', 
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Authorization': token
          }
        });
        
        let json = await response.json();
        
        if(json.isAlert == 'true'){
          console.log("IS ALERT = " + json.isAlert)
          console.log("%%%% NOTIFICACIONES %%%%%%%")
          json.causes.forEach(function(elemento, indice, array) {
            console.log(elemento, indice);
            notificaciones.sendPushNotification(expoPushToken, elemento)
          });
          console.log("%%%% END NOTIFICACIONES %%%%%%%");
          
        }

    } catch (error) {
      console.log(error); 
    };
  };

  useEffect(() => {
    callIsAlert()
      .then(() => {
        setInterval(() => { }, 60000);
        setChangeInterval(!changeInterval)
      });
  }, [changeInterval]);

  useEffect(() => {
    console.log("HERE 2")
    notificaciones.getPushNotificationPermissions().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("response");
      navigation.navigate('Mapa')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    return (
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
                <Text style={styles.locationStyle}>Location Tracker</Text>  
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
  });