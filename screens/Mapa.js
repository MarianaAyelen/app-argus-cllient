import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import logo from '.././assets/argusIcon.png'; 

export default function App() {

  const [latitude, setLatitude] = useState(45);
  const [longitude, setLongitude] = useState(-78);

  var markers = [
      {
          latitude: latitude,
          longitude: longitude,
          title: 'Tracker',
          subtitle: 'Location'
      }  
    ];

  const callGetLocation = async() => {
    try{
      setInterval(async () => {        
        let response = await fetch('https://app-argus-server.herokuapp.com/module/information/00000');
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

  /*componentDidMount(){
    this.timer = 
   } */

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
            description={"ubicación"}
            //image={{uri: logo}}
         />
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