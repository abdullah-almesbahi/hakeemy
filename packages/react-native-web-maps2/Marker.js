import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import { Text } from 'react-native';

class MapViewMarker extends Component {
  render() {
    const {
      description,
      title,
      coordinate,
      image,
      label,
      ...rest
    } = this.props;

    // console.log('image', image);

    return (
      <Marker
        {...rest}
        icon={{
          scaledSize: new google.maps.Size(51, 60),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(51 / 2, 60),
          labelOrigin: new google.maps.Point(51 / 2, 24),
          url: image
        }}
        optimized={false}
        label={label}
        title={description ? `${title}\n${description}` : title}
        position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
      >
        {this.props.children}
      </Marker>
    );
  }
}

export default MapViewMarker;
