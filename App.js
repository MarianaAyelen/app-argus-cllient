import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Registro from './screens/Registro';
import React from 'react';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator>
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ title: 'Bienvenido' }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ title: 'Menú' }}
        />
        <Stack.Screen 
          name="Registro" 
          component={Registro} 
          options={{ title: 'Registarte' }}
        />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}

