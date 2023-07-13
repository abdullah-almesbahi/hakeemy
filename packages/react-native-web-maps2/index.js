import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { withGoogleMap, GoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import Marker from './Marker';
import Polyline from './Polyline';
// import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
// import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap {...props} ref={props.handleMapMounted} />
));

class MapView extends Component {
  state = {
    center: null
  };

  handleMapMounted = map => {
    this.map = map;
    this.props.onMapReady && this.props.onMapReady();
  };

  animateToRegion(coordinates) {
    this.setState({
      center: { lat: coordinates.latitude, lng: coordinates.longitude }
    });
  }

  onDragEnd = () => {
    const { onRegionChangeComplete } = this.props;
    if (this.map && onRegionChangeComplete) {
      const center = this.map.getCenter();
      onRegionChangeComplete({
        latitude: center.lat(),
        longitude: center.lng()
      });
    }
  };

  render() {
    const {
      region,
      initialRegion,
      onRegionChange,
      onPress,
      options
    } = this.props;
    const { center } = this.state;
    const style = this.props.style || styles.container;

    const centerProps = region
      ? {
          center: {
            lat: region.latitude,
            lng: region.longitude
          }
        }
      : center
      ? { center }
      : {
          defaultCenter: {
            lat: initialRegion.latitude,
            lng: initialRegion.longitude
          }
        };

    return (
      <View style={style}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          {...centerProps}
          onDragStart={onRegionChange}
          onIdle={this.onDragEnd}
          defaultZoom={15}
          onClick={onPress}
          options={options}
        >
          {this.props.children}
          {/* <InfoBox
            defaultPosition={
              new google.maps.LatLng(
                centerProps.defaultCenter.lat,
                centerProps.defaultCenter.lng
              )
            }
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <View
              style={{
                backgroundColor: 'yellow',
                opacity: 0.75,
                padding: 12
              }}
            >
              <View style={{ fontSize: 16, fontColor: `#08233B` }}>
                <Text>Hello, Taipei!</Text>
              </View>
            </View>
          </InfoBox> */}
        </GoogleMapContainer>
      </View>
    );
  }
}
export { Marker, Polyline };

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC0GVIt3YsDM5u6uZudr18rSulVLYFEnzA',
    loadingElement: <View style={{ height: '100%' }} />,
    containerElement: <View style={{ height: 400 }} />,
    mapElement: <View style={{ height: '100%' }} />
  }),
  withScriptjs
  // withGoogleMap
)(MapView);
