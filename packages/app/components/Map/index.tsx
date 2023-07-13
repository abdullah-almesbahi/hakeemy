import React, { useState, useEffect } from 'react';
import { View, Dimensions, Alert, ActivityIndicator, Text } from 'react-native';
import _debounce from 'lodash/debounce';
import _map from 'lodash/map';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import BackgroundGeolocation from 'react-native-background-geolocation';
// import GoogleEarth from './_googleearth';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface MapProps {
  drivers?: object;
  onGeoLocationComplete?: (region) => void;
  onGeoLocationUpdate?: (region) => void;
  onRegionChangeComplete?: (region) => void;
  onRegionChange?: (region) => void;
  latitude: number;
  longitude: number;
  showGoogleEarth?: boolean;
}

const Map: React.SFC<MapProps> = props => {
  const [state, setState] = useState({
    initialPosition: 'unknown',
    mapType: 'standard'
  });

  let watchID;
  let _isMounted = false;
  let lastPosition = 'unknown';
  let initialRegion = 'unknown';
  let loadTime = Math.floor(Date.now() / 1000) + 3; // expire after 3 seconds
  let _runGeoLocationUpdate = null;

  // fixing Draging Over issue
  let draggingTime = 0; // expire after 2 seconds
  let draggingTriggered = false;
  let draggingRegion = {};

  // zooming feature
  let latitudeDelta = LATITUDE_DELTA;
  let longitudeDelta = LONGITUDE_DELTA;

  useEffect(() => {
    // WillMount

    // register run limit for updating location
    _runGeoLocationUpdate = _debounce(data => {
      onGeoLocationUpdate(data);
    }, 3000);

    // DidMount

    let _isMounted = true;
    // This handler fires whenever bgGeo receives a location update.
    if (
      typeof global.geo !== 'undefined' &&
      state.initialPosition == 'unknown'
    ) {
      props.onGeoLocationComplete({
        latitude: floorFigure(global.geo.coords.latitude),
        longitude: floorFigure(global.geo.coords.longitude)
      });
      setState({ ...state, initialPosition: global.geo });
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          //  //console.log('initialPosition',position.coords);

          // update client request initial location
          if (state.initialPosition == 'unknown') {
            props.onGeoLocationComplete({
              latitude: floorFigure(position.coords.latitude),
              longitude: floorFigure(position.coords.longitude)
            });

            setState({ ...state, initialPosition: position });
          }
        },
        error => {
          if (lastPosition == 'unknown') {
            Alert.alert(
              'No GPS',
              'Seems like you have not started your location service. Please enable GPS'
            );
          }
          console.warn('No GPS', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );

      watchID = navigator.geolocation.watchPosition(position => {
        //  console.log('watch',position.coords);
        lastPosition = position;

        // update client request initial location
        if (state.initialPosition == 'unknown') {
          props.onGeoLocationComplete({
            latitude: floorFigure(position.coords.latitude),
            longitude: floorFigure(position.coords.longitude)
          });
          setState({ ...state, initialPosition: position });
        } else {
          _runGeoLocationUpdate(position);
        }
      });
    }
    // BackgroundGeolocation.on('location', location => {
    //   if (state.initialPosition == 'unknown') {
    //     props.onGeoLocationComplete({
    //       latitude: floorFigure(location.coords.latitude),
    //       longitude: floorFigure(location.coords.longitude)
    //     });
    //     setState({ ...state, initialPosition: location });
    //   } else {
    //     _runGeoLocationUpdate(location);
    //   }
    // });

    setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      if (now < draggingTime) {
        // do nothing ,
      } else if (draggingTriggered) {
        console.warn('runned');
        (draggingTime = Math.floor(Date.now() / 1000) + 1), // expire after 2 seconds
          onDragingOver(draggingRegion);
        draggingTriggered = false;
      }
    }, 1000);

    //  _.delay(() => {
    //   //  map.fitToSuppliedMarkers(['start_location','end_location'], true);
    //    map.fitToCoordinates([{
    //         latitude: 37.394232,
    //         longitude: -122.143908,
    //       },{
    //         latitude:37.399628,
    //         longitude: -122.182708,
    //       }
    //     ], {
    //       edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
    //       animated: true,
    //     });
    //  },10000);

    // componentWillUnmount
    return () => {
      _isMounted = false;
      navigator.geolocation.clearWatch(watchID);
    };
  }, []);

  const onRegionChange = region => {
    const now = Math.floor(Date.now() / 1000);
    if (state.initialPosition == 'unknown') {
      return false;
    }
    // if we get user location but map keep sending fake location , we ignore it , and this usually within the loading
    else if (now < loadTime) {
      const left = loadTime - now;
      //  console.warn("LOADTIME: You need to wait "+left+" seconds before next try");
      return false;
    }

    // console.log('draging');
    global.draging = true;
    if (isFloat(region.latitude) && isFloat(region.longitude)) {
      props.onRegionChange({
        latitude: floorFigure(region.latitude),
        longitude: floorFigure(region.longitude)
      });
    }

    // trigger draging Over
    //  if ( now < draggingTime ) {
    //    var left = loadTime - now;
    //    console.warn("DRAGGING_OVER: You need to wait "+left+" seconds before next try");
    //  } else{
    //    console.warn("runned");
    (draggingTime = Math.floor(Date.now() / 1000) + 1), // expire after 2 seconds
      (draggingTriggered = true);
    draggingRegion = region;
    //  }
  };

  const onRegionChangeComplete = region => {
    //  if(state.initialPosition == 'unknown'){
    //    return false;
    //  }
    //
    // //  //console.log('Draging Over');
    //  global.draging = false;
    //
    //  //we need to ignore update the locations for the first region , cause it was taken MANUALY
    //  if(initialRegion == 'unknown' && state.initialPosition != 'unknown'){
    //    //Hello World
    //    initialRegion = true;
    //
    // }else{
    //    props.onRegionChangeComplete({
    //      latitude:floorFigure(region.latitude),
    //      longitude:floorFigure(region.longitude),
    //    });
    // }
  };

  const onGeoLocationUpdate = position => {
    props.onGeoLocationUpdate({
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      bearing: position.coords.bearing,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      speed: position.coords.speed,
      timestamp: position.timestamp
    });
  };

  const onDragingOver = region => {
    global.draging = false;
    latitudeDelta = region.latitudeDelta;
    longitudeDelta = region.longitudeDelta;
    props.onRegionChangeComplete({
      latitude: floorFigure(region.latitude),
      longitude: floorFigure(region.longitude)
    });
  };

  const isFloat = n => {
    return Number(n) === n && n % 1 !== 0;
  };

  const floorFigure = (figure, decimals = 6) => {
    const d = Math.pow(10, decimals);
    const _number = Number((parseInt(figure * d) / d).toFixed(decimals));
    if (isFloat(_number)) {
      return _number;
    }
    return -40.0;
    return parseFloat(_number).toFixed(6);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const toggleMapType = () => {
    setState({
      ...state,
      mapType: state.mapType == 'standard' ? 'hybrid' : 'standard'
    });
  };

  if (state.initialPosition == 'unknown') {
    return (
      <View
        style={[
          styles.container,
          {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
      >
        <Text style={{ fontSize: 20 }}>Loading your GPS</Text>
        <ActivityIndicator color={'black'} size={'large'} />
      </View>
    );
  }
  //  //console.log('render '+props.latitude+','+props.longitude);
  return (
    <View style={styles.mainContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={ref => {
          map = ref;
        }}
        style={styles.container}
        mapType={state.mapType}
        region={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        }}
        onRegionChange={onRegionChange}
        // onRegionChangeComplete={onRegionChangeComplete}
        scrollEnabled
        showsMyLocationButton={false}
        showsUserLocation
        showsPointsOfInterest={false}
      >
        {props.children}
        {_map(props.drivers, (marker, id) => (
          <MapView.Marker
            key={id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            image={require('images/pin_driver.png')}
            style={{ transform: [{ rotate: `${marker.bearing}deg` }] }}
          />
        ))}
      </MapView>
      {/* {props.showGoogleEarth ? <GoogleEarth onPress={toggleMapType} /> : null} */}
    </View>
  );
};

export default Map;
