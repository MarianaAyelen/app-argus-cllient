import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Registro from './screens/Registro';
import React from 'react';
import AjustesMenu from './screens/AjustesMenu';

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
            headerRight: () => <AjustesMenu />}}
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
    <Provider>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </Provider>
  );
}

