import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import logo from '.././assets/argusIcon.png'; 

export default function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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


  return (
    <View style={styles.container}>
      
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