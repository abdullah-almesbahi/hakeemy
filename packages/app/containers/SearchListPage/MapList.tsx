import * as React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Platform } from '../../components/Platform';
import Marker from '../../components/Marker';
import Callout from '../../components/Callout';
import styles from './styles';
import _has from 'lodash/has';
import { DEFAULT_MAP_PADDING } from '../../utils/constants';
import Doctor from './Doctor';
import { Text } from '../../components';
import { ROUTE_DOCTOR_PROFILE } from '../../utils/constants';
import { getLocalizeRoute } from '../../utils/helper';

interface MapListProps {
  data: any;
  push: any;
}

const MapList: React.SFC<MapListProps> = props => {
  const mapRef: any = React.useRef(null);

  return (
    <View style={styles.mapMainContainer}>
      <MapView
        provider='google'
        style={{ flex: 1 }}
        onMapReady={() => {
          if (Platform.OS === 'web') {
            // mapRef.current.fitBounds(circleRef.current.getBounds());
          } else {
            const markers = props.data.map((doctor, i) => `Marker${i}`);
            // console.log('markers', markers);
            mapRef.current.fitToSuppliedMarkers(markers, {
              edgePadding: DEFAULT_MAP_PADDING,
              animated: true
            });
          }
        }}
        ref={mapRef}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsIndoors={true}
      >
        {props.data.map((doctor, i) => {
          _has(doctor, 'hospital[0].latitude') ? (
            <Marker
              identifier={`Marker${i}`}
              coordinate={{
                latitude: parseFloat(doctor.hospital[0].latitude),
                longitude: parseFloat(doctor.hospital[0].longitude)
              }}
              image={require('../../images/marker.png')}
            >
              {/* {console.log('latitude', doctor.hospital[0].latitude)} */}
              <Callout
                onPress={(e: any) => {
                  if (
                    e.nativeEvent.action === 'marker-inside-overlay-press' ||
                    e.nativeEvent.action === 'callout-inside-press'
                  ) {
                    return;
                  }
                  props.push(
                    getLocalizeRoute(
                      ROUTE_DOCTOR_PROFILE + '/' + doctor.id + '/1'
                    )
                  );
                }}
              >
                <Doctor
                  data={doctor}
                  push={props.push}
                  intl={props.intl}
                  currentLocation={props.currentLocation}
                  mapList={true}
                />
              </Callout>
            </Marker>
          ) : null;
        })}
      </MapView>
    </View>
  );
};

export default MapList;
