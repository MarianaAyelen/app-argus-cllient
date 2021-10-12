import React, { useState, useEffect } from "react";
import HeaderApp from './HeaderApp';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker }  from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { userStorage } from './LocalStorage';


export default function ZonaExclusion(){
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [initialLatitude, setInitialLatitude] = useState(0);
  const [initialLongitude, setInitialLongitude] = useState(0);

  async function saveUnsafeZone() {
      console.log("SAVE UNSAFE ZONE", latitude, longitude);
  }
    
const getToken = async() => {
  var localStorageResult = await userStorage.get();
  let token = await localStorageResult["token"];
  return token;
}


const callGetLocation = async() => {

  var token = await getToken();
  try{    
      let response = await fetch('https://app-argus-server.herokuapp.com/location', { 
          method: 'get', 
          mode: 'cors',
          headers: {
          'Accept': 'application/json',
          'Authorization': token
          }
      });

      let json = await response.json();
      let newLatitude = json.latitude;
      let newLongitude = json.longitude;
      if(newLatitude != latitude || newLongitude != longitude){
          console.log("API LOCATION", newLatitude, newLongitude)
          setInitialLongitude(newLongitude);
          setInitialLatitude(newLatitude);
      }
      return await json;
  } catch (error) {
    console.log(error); 
  };
};

useEffect(() => {
  callGetLocation();
}, [callGetLocation]);

function movementMarker(e){
  const latitude  = e.nativeEvent.coordinate.latitude
  const longitude = e.nativeEvent.coordinate.longitude
  console.log("MOVEMENT MARKER", latitude, longitude)
  setLatitude(latitude);
  setLongitude(longitude);
}

function onClickMap(e){
  const {latitude,longitude} = e.coordinate
  console.log("ON CLICK MAP", latitude, longitude)
  setLatitude(latitude);
  setLongitude(longitude);
} 
  return(
      <View style={styles.container}>
          <StatusBar style="auto" />
          <HeaderApp />
          <MapView style={styles.map}
              region={{
              latitude: latitude || initialLatitude,
              longitude: longitude || initialLongitude,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121
              }}
              onPress={(e) => onClickMap(e.nativeEvent)}
          >
              <MapView.Marker draggable
                  coordinate={{
                  latitude: initialLatitude,
                  longitude: initialLongitude
                  }}
                  title="Zona de exclusión"
                  onDragEnd={(e) => movementMarker(e)}>
                  <Image source={require('.././assets/marker-32.png')} style={{height: 40, width:40 }} />
              </MapView.Marker>
          </MapView>

          <View style={styles.row, {alignItems: 'center'}}>
                <TouchableOpacity onPress={() => saveUnsafeZone()} style={styles.buttonGuardar} >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
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
    buttonGuardar: {
      backgroundColor: "#2E86C1",
      padding: 20,
      borderRadius: 15,
      marginTop: 50,
      width: 250,
      height: 100,
      justifyContent: 'center',
  
    },
    map: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height * 0.5,
    },
    row: {
      flexDirection: 'row'
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
      textAlign: 'center'
    },
});