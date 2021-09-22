import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Menu, Divider, Provider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Variables from './variables.js';
import { userStorage } from './LocalStorage';

export default function AjustesMenu(){
    const [showMenu, setShowMenu] = useState(false);
    const navigation = useNavigation();

    async function deleteToken() {
        await userStorage.remove();
    }

    return(
        <View style={{}}>
            <Menu
                visible={showMenu}
                onDismiss={() => setShowMenu(false)}
                anchor={
                <TouchableOpacity onPress={() => setShowMenu(true)}>
                    <MaterialCommunityIcons
                    name="more-vertical"
                    size={25}
                    style={{ color: 'black', marginRight: 10 }}
                    />
                </TouchableOpacity>
                }>
                <Menu.Item onPress={() => {navigation.navigate('Configuration')}} title="Configurar módulo" />
                <Menu.Item onPress={() => {
                    setShowMenu(false);
                    navigation.navigate('ContraseniaNueva')}} title="Cambiar contraseña" />
                <Menu.Item onPress={() => {
                    setShowMenu(false);
                    navigation.navigate('Ayuda')}} title="Ayuda" />
                <Divider />
                <Menu.Item onPress={() => {
                        deleteToken();
                        navigation.navigate('Inicio');
                    }} 
                    title="Cerrar sesión"
                    icon="logout"
                />
            </Menu>
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
      }
  });