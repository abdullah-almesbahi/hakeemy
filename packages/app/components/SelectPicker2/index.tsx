import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput as NativeTextInput,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import _ from 'lodash';
import styles from './styles';
import {
  TextInput,
  TouchableRipple,
  Appbar,
  Searchbar,
  List,
  FAB
} from 'react-native-paper';
import { Icon, Text } from '..';
import { SelectPickerProps, ModalPickerProps } from './types';
import H2 from '../H2';
import Modal from '../Modal';
import LoadingIndicator from '../LoadingIndicator';
// import GPSState from 'react-native-gps-state';
import GPSState from '../../components/Gps';
import { Platform } from '../../components/Platform';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

const SelectPicker2 = (props: SelectPickerProps) => {
  const [state, setState] = useState({
    visible: false,
    labelPicked: '',
    valuePicked: '',
    visibleSearch: false,
    filter: '',
    ds: props.options,
    visibleShowAdd: false,
    loading: false
  });
  // console.log('options', props.options);

  useEffect(() => {
    if (props.options != state.ds) {
      setState({ ...state, ds: props.options });
    }
  }, [props.options]);

  const renderOptionList = () => {
    return (
      <View>
        <FlatList
          data={state.ds}
          renderItem={rowData => renderOptionFunc(rowData)}
        />
      </View>
    );
  };

  const renderOptionFunc = rowData => {
    const { value, label, description, disabled, gpsValue } = rowData.item;
    return (
      <List.Item
        key={value}
        style={{ borderBottomWidth: 1, borderBottomColor: '#dbdbdb' }}
        // onPress={() => onSelect(value)}
        onPress={
          disabled
            ? gpsValue
              ? () => {
                  GPSState.getStatus().then(status => {
                    switch (status) {
                      case GPSState.NOT_DETERMINED:
                        break;

                      case GPSState.RESTRICTED:
                        if (Platform.OS == 'android') {
                          Alert.alert(
                            props.intl.formatMessage(messages.gpsRequired),
                            props.intl.formatMessage(messages.allowLocation),
                            [
                              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                              {
                                text: props.intl.formatMessage(messages.cancel),
                                onPress: () => {},
                                style: 'cancel'
                              },
                              {
                                text: props.intl.formatMessage(
                                  messages.goToSettings
                                ),
                                onPress: () => {
                                  GPSState.openLocationSettings();
                                }
                              }
                            ],
                            { cancelable: true }
                          );
                        } else {
                          Alert.alert(
                            props.intl.formatMessage(messages.gpsRequired),
                            props.intl.formatMessage(messages.allowLocation),
                            [
                              {
                                text: props.intl.formatMessage(messages.ok),
                                onPress: () => {
                                  GPSState.openLocationSettings();
                                }
                              }
                            ],
                            { cancelable: true }
                          );
                        }

                        //
                        break;

                      case GPSState.DENIED:
                        console.log(
                          'It`s a shame that you do not allowed us to use location :('
                        );
                        // alert('It`s a shame that you do not allowed us to use location :(')
                        break;

                      case GPSState.AUTHORIZED_ALWAYS:
                        console.log('AUTHORIZED_ALWAYS');
                        //TODO do something amazing with you app
                        break;

                      case GPSState.AUTHORIZED_WHENINUSE:
                        console.log('AUTHORIZED_WHENINUSE');
                        //TODO do something amazing with you app
                        break;
                    }
                  });
                  // onPress();
                }
              : null
            : () => {
                onSelect(value, label);
              }
        }
        title={label}
        description={description}
      />
    );
  };

  const onFilterChange = text => {
    // const filter = text;
    const filtered = !text.length
      ? props.options
      : props.options.filter(({ label, value }) => {
          return 0 <= label.toLowerCase().indexOf(text);
        });
    setState({
      ...state,
      filter: text.toLowerCase(),
      ds: filtered
    });
  };

  const onSelect = (value, label): void => {
    setState({
      ...state,
      valuePicked: value,
      labelPicked: label,
      visible: false
    });
    props.onSelect(value, label);
  };

  const onCancel = (): void => {
    setState({
      ...state,
      visible: false,
      filter: ''
    });
  };

  let displayLabel = _.find(props.options, function(o) {
    return (
      parseFloat(o.value) === parseFloat(state.valuePicked) ||
      parseFloat(o.value) === parseFloat(props.selected) ||
      o.value === props.selected
    );
  });
  return (
    <View>
      <TextInput
        mode={props.mode}
        disabled={props.disabled}
        value={props.value ? props.value : displayLabel && displayLabel.label}
        label={props.label}
        placeholder={props.placeholder}
        theme={props.theme ? props.theme : { colors: { background: 'white' } }}
        onBlur={props.onBlur}
        editable={props.editable}
        render={p => {
          return (
            <TouchableRipple
              style={styles.searchSection}
              onPress={() =>
                setState({
                  ...state,
                  visible: true
                })
              }
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <>
                {p.value != '' ? (
                  <View
                    style={{
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
                  // color={props.iconColor}
                />
              </>
            </TouchableRipple>
          );
        }}
      />
      <Modal
        onRequestClose={onCancel}
        visible={state.visible}
        transparent={false}
        avoidKeyboard={true}
        presentationStyle="fullScreen"
        style={{ margin: 0, justifyContent: 'flex-start' }}
        supportedOrientations={['portrait', 'landscape']}
      >
        <Appbar.Header>
          {props.showFilter && state.visibleSearch ? (
            <>
              <View style={{ flex: 1 }}>
                <Searchbar
                  placeholder={props.placeholderText}
                  onChangeText={onFilterChange}
                  icon={p => <Icon {...p} name="close" />}
                  onIconPress={() =>
                    setState({
                      ...state,
                      visibleSearch: false,
                      filter: '',
                      ds: props.options
                    })
                  }
                />
              </View>
            </>
          ) : (
            <>
              <Appbar.BackAction onPress={onCancel} />
              <Appbar.Content title={props.title} color="black" />
              {props.showFilter ? (
                <Appbar.Action
                  // color="white"
                  icon="magnify"
                  onPress={() => setState({ ...state, visibleSearch: true })}
                />
              ) : null}
            </>
          )}
        </Appbar.Header>
        {state.loading ? (
          <View style={styles.noData}>
            <LoadingIndicator />
          </View>
        ) : state.ds && state.ds.length == 0 ? (
          <View>
            <Text style={styles.noResultsText}>
              {props.noResultsText ? props.noResultsText : 'No results fount'}
            </Text>
          </View>
        ) : state.ds && state.ds.length > 0 ? (
          <ScrollView
            style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}
          >
            <View style={styles.listContainer}>{renderOptionList()}</View>
          </ScrollView>
        ) : null}
      </Modal>
    </View>
  );
};

export default compose(injectIntl)(SelectPicker2);
