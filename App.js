import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Registro from './screens/Registro';
import React from 'react';
import AjustesMenu from './screens/AjustesMenu';
import ContraseniaNueva from './screens/CambiarContrasenia';
import Ayuda from './screens/Ayuda';
import Mapa from './screens/Mapa';

const Stack = createStackNavigator();

function NavStack() {
  return (
      <Stack.Navigator>
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
          options={{ 
            title: 'Menú' ,
            headerRight: () => <AjustesMenu />,
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
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </Provider>
  );
}

