import React, { useState } from 'react';
import { View, TextInput as NativeTextInput, ScrollView } from 'react-native';
import _ from 'lodash';

import styles from './styles';
import { TextInput, TouchableRipple } from 'react-native-paper';
import { Icon, Text } from '..';
import ModalFilterPicker from './ModalFilterPicker';
import { SelectPickerProps } from './types';
import H2 from '../H2';

const SelectPicker = (props: SelectPickerProps) => {
  const [state, setState] = useState({
    visible: false,
    picked: ''
  });

  const onShow = () => {
    setState({ ...state, visible: true });
  };

  const onSelect = (picked: string): void => {
    setState({
      picked: picked,
      visible: false
    });
    props.onSelect(picked);
  };

  const onCancel = (): void => {
    setState({
      ...state,
      visible: false
    });
  };

  const { visible, picked } = state;
  let displayLabel = _.find(props.options, function(o) {
    return (
      parseFloat(o.value) === parseFloat(picked) ||
      parseFloat(o.value) === parseFloat(props.selected) ||
      o.value === props.selected
    );
  });
  return (
    <View>
      <TextInput
        mode={props.mode}
        disabled={props.disabled}
        onPress={() => {
          // console.log('ggooo');
        }}
        onFocus={() => {
          onShow();
        }}
        value={props.value ? props.value : displayLabel && displayLabel.label}
        label={props.label}
        placeholder={props.placeholder}
        theme={props.theme ? props.theme : { colors: { background: 'white' } }}
        // onBlur={props.onBlur}
        render={p => {
          return (
            <TouchableRipple
              style={styles.searchSection}
              onPress={() => (!props.disabled ? onShow() : null)}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <>
                {p.value != '' ? (
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      marginTop: props.mode === 'outlined' ? 20 : 30,
                      marginLeft: 10
                    }}
                  >
                    <H2 style={{ color: 'black', textAlign: 'left' }}>
                      {p.value}
                    </H2>
                  </View>
                ) : null}
                <Icon
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 8,
                    padding: 10
                  }}
                  name="keyboard-arrow-down"
                  size={30}
                  color={props.iconColor}
                />
              </>
            </TouchableRipple>
            // <View style={styles.searchSection}>
            //   <NativeTextInput {...p} style={[p.style, { zIndex: 0 }]} />
            //   <Icon
            //     style={{
            //       position: 'absolute',
            //       right: 0,
            //       top: 8,
            //       padding: 10
            //     }}
            //     name='keyboard-arrow-down'
            //     size={30}
            //     color={props.iconColor}
            //   />
            // </View>
          );
        }}
        // editable={props.editable}
      />

      <ModalFilterPicker
        title={props.label}
        visible={visible}
        onSelect={onSelect}
        onCancel={onCancel}
        showFilter={props.showFilter}
        showAddPress={props.showAddPress}
        showAdd={props.showAdd}
        showAddContent={props.showAddContent}
        options={props.options}
      />
    </View>
  );
};

export default SelectPicker;
