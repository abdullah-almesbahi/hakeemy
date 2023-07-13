import OriginalMapView from 'react-native-maps';

import * as React from 'react';

interface MapViewProps {
  location: any;
  currentLocation: any;
}

const MapView: React.SFC<MapViewProps> = props => {
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
      showsUserLocation={true}
      showsPointsOfInterest={false}
      // options={{
      //   clickableIcons: false,
      //   mapTypeControl: false,
      //   //   disableDefaultUI: true,
      //   fullscreenControl: false,
      //   streetViewControl: false
      // }}
    >
      {props.children}
    </OriginalMapView>
  );
};

export default MapView;
