import OriginalMapView from 'react-native-web-maps2';

import * as React from 'react';

interface MapViewProps {
  location: any;
  currentLocation: any;
}

const MapView: React.SFC<MapViewProps> = props => {
  // console.log('longitude', props.currentLocation);
  return (
    <OriginalMapView
      // style={styles.mapContainer}
      style={{ flex: 1 }}
      onPress={() => {}}
      region={{
        latitude: !props.location.data.latitude
          ? props.currentLocation.latitude
          : props.location.data.latitude,
        longitude: !props.location.data.longitude
          ? props.currentLocation.longitude
          : props.location.data.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      showsMyLocationButton={true}
      showsUserLocation={false}
      showsPointsOfInterest={false}
      options={{
        clickableIcons: false,
        mapTypeControl: false,
        //   disableDefaultUI: true,
        fullscreenControl: false,
        streetViewControl: false
      }}
    >
      {props.children}
    </OriginalMapView>
  );
};

export default MapView;
