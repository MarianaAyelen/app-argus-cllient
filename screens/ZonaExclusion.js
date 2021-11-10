import React, { useState, useEffect } from "react";
import HeaderApp from './HeaderApp';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker }  from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { userStorage } from './LocalStorage';


export default function ZonaExclusion(){
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(0);

  const [initialLatitude, setInitialLatitude] = useState(0);
  const [initialLongitude, setInitialLongitude] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const [isUnsafeZone, setIsUnsafeZone] = useState(false);
  

  async function saveUnsafeZone() {
    await callSaveUnsafeZone();
      console.log("SAVE UNSAFE ZONE", latitude, longitude);
  }
    
const getToken = async() => {
  var localStorageResult = await userStorage.get();
  let token = await localStorageResult["token"];
  return token;
}

const callSaveUnsafeZone = async() => {
  token = await getToken();
  try{
    let response = await fetch(`https://app-argus-server.herokuapp.com/save-unsafe-zone`, {
        method: 'POST',       
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },         
        body: JSON.stringify({
          latitude: latitude != 0 ? latitude : initialLatitude,
          longitude: longitude != 0 ? longitude : initialLongitude,
          radius: radius
        })
      });
    let json = await response.json();
    if(response.ok){
        navigation.navigate('Menu');
    }else{
        setModalText(json.message)
        setModalVisible(true);
    }
} catch (error) {
    alert(error);
};
}

const deleteUnsafeZone = async() => {
  var token = await getToken();
  try{    
      let response = await fetch('https://app-argus-server.herokuapp.com/delete-unsafe-zone', { 
          method: 'delete', 
          mode: 'cors',
          headers: {
          'Accept': 'application/json',
          'Authorization': token
          }
      });
      navigation.navigate('Menu');
  } catch (error) {
    console.log(error); 
  };
};

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

const callIsUnsafeZone = async()=> {
  var token = await getToken();
  try{    
      let response = await fetch('https://app-argus-server.herokuapp.com/unsafe-zone', { 
          method: 'get', 
          mode: 'cors',
          headers: {
          'Accept': 'application/json',
          'Authorization': token
          }
      });

      let json = await response.json();
      let latitude = json.latitude;
      let longitude = json.longitude;
      console.log("GET UNSAFE ZONE" + longitude + latitude)
      if(latitude != null && longitude != null){
        console.log("SET UNSAFE ZONE: ", true)
        setLatitude(latitude)
        setInitialLatitude(latitude)
        setLongitude(longitude)
        setInitialLongitude(longitude)
        setIsUnsafeZone(true)
      }
      return await json;
  } catch (error) {
    console.log(error); 
  };
}

useEffect(() => {
  callGetLocation();
}, []);


useEffect(() => {
  callIsUnsafeZone();
});


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
          {
                !isUnsafeZone ? 
                <View style={styles.row}>
                    <Text style={styles.inputLabel}>Radio [m]: </Text>
                    <TextInput value={radius}
                              maxLength = {12} onChangeText={(radius) => setRadius(radius)}
                              placeholder={'Radio'} style={styles.input} keyboardType="numeric"
                        />
                </View>
                : null
            } 
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
                  title="Zona peligrosa"
                  onDragEnd={(e) => movementMarker(e)}>
                  <Image source={require('.././assets/marker-32.png')} style={{height: 40, width:40 }} />
              </MapView.Marker>
          </MapView>

          {
                !isUnsafeZone ?
                  <View style={styles.row, {alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => saveUnsafeZone()} style={styles.buttonGuardar} >
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={styles.row, {alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => deleteUnsafeZone()} style={styles.buttonGuardar} >
                        <Text style={styles.buttonText}>Borrar</Text>
                    </TouchableOpacity>
                  </View>
              }

            <Modal animationType="fade" transparent={true} visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>

              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{modalText}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

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
      marginTop: 20,
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
    inputLabel: {
      fontFamily: 'serif',
      color: '#2E86C1',
      fontSize: 25,
      marginLeft: 80,
      marginTop: 12
    },
    input: {
      width: 100,
      height: 44,
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#e8e8e8',
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: "#C0392B",
      borderRadius: 15,
      width: '80%',
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 15,
      color: "#C0392B",
    }
});