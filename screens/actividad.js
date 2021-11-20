import React, { useState, useEffect } from "react";
import {FlatList, View, StyleSheet, Text } from "react-native";
import HeaderApp from './HeaderApp';
import { StatusBar } from 'expo-status-bar';
import { userStorage } from './LocalStorage';


export default function actividad(){


  const [activities, setActivities] = useState([])
  const [isActivity, setIsActivity] = useState(true)

  useEffect(() => {
    getActions();
  });

  const getActions = async() => {
    var token = await getToken();
    console.log("ACTIVIDAD REQUEST NOW")
    try{
      let response = await fetch('https://app-argus-server.herokuapp.com/actions', { 
        method: 'get', 
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      });

      let json = await response.json();
      var newArray = [];

      if(json.length == 0){
        setIsActivity(false);
        return;
      }

      setIsActivity(true)

      for (let index = 0; index < json.length; index++) {
        let cause = getCause(json[index].causa);
        newArray[index] = {id : index.toString(), text: "" + json[index].fecha + " - " + cause};
        console.log(json[index].fecha + " - " + json[index].causa)
      }

      setActivities(newArray)
    return initialElements;
    } catch (error) {
      console.log(error); 
    };
  };

  function getCause(cause) {
    switch(cause){
      case "CALL":
        return "LLAMADA"
      case "LOW_BATTERY":
        return "BATERIA BAJA"
      case "INSUFFICIENT_CREDIT":
        return "CREDITO INSUFICIENTE"
      default:
        return "CAUSA DESCONOCIDA"
    }
  } 
    
  const getToken = async() => {
    var localStorageResult = await userStorage.get();
    let token = await localStorageResult["token"];
    return token;
}

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <HeaderApp />
            {
              !isActivity ? 
                <Text style={styles.basicText}>El módulo no posee actividades</Text>
              : null
            }
            <FlatList
              keyExtractor = {item => item.id}  
              data={activities}
              renderItem = {item => (<Text style={styles.listAction} >{item.item.text}</Text>)} />
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
    basicText: {
      fontFamily: 'serif',
      color: 'black',
      fontSize: 15,
      marginTop: 1,
      marginLeft: 15,
    },
    enums: {
      fontFamily: 'serif',
      color: 'black',
      fontSize: 15,
      marginTop: 1,
      marginLeft: 40,
    },
    nosotros: {
      fontFamily: 'serif',
      color: '#2E86C1',
      fontSize: 20,
      marginTop: 20,
      marginLeft: 15,
    },
    listAction:{
      fontFamily: 'serif',
      color: '#2E86C1',
      fontSize: 20,
      marginTop: 35,
      marginLeft: 15,
      borderBottomColor: '#2E86C1',
      borderBottomWidth: 1,
      marginRight: 15
    },
    basicText: {
      fontFamily: 'serif',
      color: '#2E86C1',
      fontSize: 20,
      marginTop: 20,
      marginLeft: 15,
    },
});