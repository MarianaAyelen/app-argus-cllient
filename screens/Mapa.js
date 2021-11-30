import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { userStorage } from './LocalStorage';

export default function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  
  const getToken = async() => {
    var localStorageResult = await userStorage.get();
    let token = await localStorageResult["token"];
    return token;
}


  const callGetLocation = async() => {
    var token = await getToken();
    try{
      setInterval(async () => {        
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
          setLatitude(newLatitude);
          setLongitude(newLongitude);
        }
        return json;
      }, 1000);
    } catch (error) {
      console.log(error); 
    };
  };

  useEffect(() => {
    callGetLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121
      }}>
        <MapView.Marker
            coordinate={{latitude: latitude,
            longitude: longitude}}
            pinColor = {"blue"}
            title={"Modulo"}
            description={"ubicación"}>
            <Image source={require('.././assets/argusIconMapa.png')} style={{height: 52, width:40 }} />
        </MapView.Marker>
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});