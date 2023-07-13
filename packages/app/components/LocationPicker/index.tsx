import React, { useState } from 'react';
import { View, TextInput as NativeTextInput, ScrollView } from 'react-native';
import _ from 'lodash';

import styles from './styles';
import { TextInput, TouchableRipple, Button } from 'react-native-paper';
import H2 from '../H2';
import Modal from '../../components/Modal';
import Location from '../../components/Location';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

export interface LocationPickerOptions {
  value: string;
  label: string;
  description?: string;
}

export interface LocationPickerProps {
  label: string;
  placeholder: string;
  onSetLocation: (latLng: string, location: string) => {};
  selected: string;
  showFilter?: boolean;
  showAdd?: boolean;
  showAddPress?: () => void;
}

const LocationPicker: React.SFC<LocationPickerProps> = props => {
  const [state, setState] = useState({
    visible: false,
    latLng: '',
    location: ''
  });

  const onShow = () => {
    setState({ ...state, visible: true });
  };

  const onSetLocation = (latLng: string, location: string): void => {
    setState({
      latLng: latLng,
      location: location,
      visible: false
    });
    props.onSetLocation(latLng, location);
  };

  const onCancel = (): void => {
    setState({
      ...state,
      visible: false
    });
  };

  const { visible, latLng } = state;
  let displayLabel = _.find(props.options, function(o) {
    return (
      parseFloat(o.value) === parseFloat(latLng) ||
      parseFloat(o.value) === parseFloat(props.selected) ||
      o.value === props.selected
    );
  });

  return (
    <View>
      {/* {props.children} */}
      <Button
        mode='outlined'
        style={{ height: 60, borderColor: 'gray' }}
        color='gray'
        icon='map-plus'
        onPress={() => {
          onShow();
        }}
        contentStyle={{
          height: 60,
          justifyContent: 'flex-start'
        }}
      >
        {state.location ? (
          state.location
        ) : (
          <FormattedMessage {...messages.location} />
        )}
      </Button>
      <Modal
        onRequestClose={onCancel}
        // {...modal}
        visible={visible}
        transparent={false}
        avoidKeyboard={true}
        presentationStyle='fullScreen'
        style={{ margin: 0, justifyContent: 'flex-start' }}
        supportedOrientations={['portrait', 'landscape']}
      >
        <Location onBack={onCancel} onSetLocation={onSetLocation} />
      </Modal>
    </View>
  );
};

export default LocationPicker;
