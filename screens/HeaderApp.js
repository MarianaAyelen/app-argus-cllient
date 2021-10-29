import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import logo from '.././assets/argusIcon.png'; 
import { notificaciones } from './Notificaciones';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

export default function HeaderApp() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    notificaciones.getPushNotificationPermissions().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("response");
      navigation.navigate('Ayuda')
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

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
              <Button
                title="Press to Send Notification"
                onPress={async () => {await notificaciones.sendPushNotification(expoPushToken);}}
              />
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