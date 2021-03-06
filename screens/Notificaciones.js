import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform  } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


class Notificaciones {
  
    getPushNotificationPermissions = async () => {
        console.log("1")
        //const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
    
        console.log("2")
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
    
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
        console.log(finalStatus)
        console.log("NOTIFICATION", Notifications )
    
        // Get the token that uniquely identifies this device
        console.log("Notification Token: ", (await Notifications.getExpoPushTokenAsync()).data);

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        
        return (await Notifications.getExpoPushTokenAsync()).data
    }

    sendPushNotification = async(cause) => {
      console.log("AWAIT TOKEN")
      var expoPushToken = await this.getPushNotificationPermissions();
      console.log("Sending..." + cause)
      console.log("token: " + expoPushToken)
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'ARGUS',
        body: cause,
        data: { },
      };
    
      let re = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      console.log("Notification sended: " + re.status)
    }
    
}


export const notificaciones = new Notificaciones();