import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';

export default function App() {

var markers = [
    {
        latitude: 45.65,
        longitude: -78.90,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
    }
    ];
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
          initialRegion={{
              latitude: -34.580383,
              longitude: -58.454008,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121
          }}
        >
        <MapView.Marker
            coordinate={{latitude: -34.580383,
            longitude: -58.454008}}
            pinColor = {"blue"}
            title={"Modulo"}
            description={"ubicación"}
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