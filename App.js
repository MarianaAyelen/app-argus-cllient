import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Registro from './screens/Registro';
import React, { useEffect, useState, useRef  } from 'react';
import AjustesMenu from './screens/AjustesMenu';
import ContraseniaNueva from './screens/CambiarContrasenia';
import Ayuda from './screens/Ayuda';
import Mapa from './screens/Mapa';
import configuracion from './screens/Configuracion';
import configuracionPaso2 from './screens/ConfiguracionPaso2';
import FirstStep from './screens/FirstStep';
import actividad from './screens/actividad';
import { notificaciones } from './screens/Notificaciones';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function NavStack() {
  return (
      <Stack.Navigator initialRouteName="FirstStep">
        <Stack.Screen 
          name="FirstStep" 
          component={FirstStep} 
          options={{
            title: 'Bienvenido'
          }}
        />
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{
            title: 'Bienvenido'
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options= {{
            headerRight: () => <AjustesMenu />,
              title: 'Menú' ,
            }}
        />
        <Stack.Screen 
          name="Registro" 
          component={Registro} 
          options={{ title: 'Registarte' }}
        />
        <Stack.Screen 
          name="ContraseniaNueva" 
          component={ContraseniaNueva} 
          options={{ title: 'Cambiar contraseña',
          headerRight: () => <AjustesMenu /> }}
        />
        <Stack.Screen 
          name="Ayuda" 
          component={Ayuda} 
          options={{ title: 'Ayuda',
          headerRight: () => <AjustesMenu /> }}
        />
        <Stack.Screen 
          name="Mapa" 
          component={Mapa} 
          options={{ title: 'Mapa' }}
        />
        <Stack.Screen 
          name="Configuration" 
          component={configuracion} 
          options={{ title: 'Configuración' }}
        />

        <Stack.Screen 
          name="ConfigurationStep2" 
          component={configuracionPaso2} 
          options={{ title: 'Configuración paso 2',
          headerRight: () => <AjustesMenu /> }}
        />

        <Stack.Screen 
          name="Actividad" 
          component={actividad} 
          options={{ title: 'Actividad',
          headerRight: () => <AjustesMenu /> }}
        />
    </Stack.Navigator>
  );
}

export default function App() {
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
      const navigation = useNavigation();
      console.log("response");
      navigation.navigate('Ayuda')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider>
      <NavigationContainer>
        <NavStack />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
          <Text>Your expo push token: {expoPushToken}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Title: {notification && notification.request.content.title} </Text>
            <Text>Body: {notification && notification.request.content.body}</Text>
            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
          </View>
          <Button
            title="Press to Send Notification"
            onPress={async () => {await notificaciones.sendPushNotification(expoPushToken);}}
          />
    </View>
      </NavigationContainer>
    </Provider>
  );
}

