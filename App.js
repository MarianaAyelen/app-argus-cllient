import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Registro from './screens/Registro';
import React, { useEffect } from 'react';
import AjustesMenu from './screens/AjustesMenu';
import ContraseniaNueva from './screens/CambiarContrasenia';
import Ayuda from './screens/Ayuda';
import Mapa from './screens/Mapa';
import configuracion from './screens/Configuracion';
import configuracionPaso2 from './screens/ConfiguracionPaso2';
import FirstStep from './screens/FirstStep';
import actividad from './screens/actividad';
import { notificaciones } from './screens/Notificaciones';


const Stack = createStackNavigator();

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
  useEffect(() => {
    notificaciones.getPushNotificationPermissions();
  });

  return (
    <Provider>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </Provider>
  );
}

