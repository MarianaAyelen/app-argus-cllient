import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Menu, Divider, Provider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function AjustesMenu(){
    const [showMenu, setShowMenu] = useState(false);


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
                <Menu.Item onPress={() => {}} title="Configurar módulo" />
                <Menu.Item onPress={() => {}} title="Cambiar contraseña" />
                <Divider />
                <Menu.Item onPress={() => {}} 
                    title="Cerrar sesión"
                    icon="logout"
                    style={styles.logOutStyle}
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
      },
      logOutStyle: {
          color: 'red'
      }
  });