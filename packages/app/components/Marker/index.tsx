import * as React from 'react';
import MapView, { Marker as Markerx } from 'react-native-maps';
import { ImageRequireSource, ImageURISource } from 'react-native';

interface MarkerProps {
  coordinate?: any;
  image?: ImageURISource | ImageRequireSource;
  label?: any;
  identifier?: any;
}

const Marker: React.SFC<MarkerProps> = props => {
  return (
    <Markerx
      coordinate={props.coordinate}
      // @ts-ignore
      image={props.image ? { url: props.image } : { url: '' }}
      // label={_toString(props.homeStudent.teachers.length)}
    />
  );
};

export default Marker;
