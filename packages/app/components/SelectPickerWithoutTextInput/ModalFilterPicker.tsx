import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native';
// import ListView from 'deprecated-react-native-listview';
import SafeAreaView from 'react-native-safe-area-view';

import Modal from '../Modal';

import styles from './styles';
import { Appbar, Searchbar, List, FAB } from 'react-native-paper';
import { ModalPickerProps } from './types';
import { Icon } from '..';
import { ScrollView } from 'react-native';

const ModalPicker = ({
  title,
  titleTextStyle,
  overlayStyle,
  cancelContainerStyle,
  showFilter,
  placeholderText,
  // renderCancelButton,
  visible,
  options,
  modal,
  onCancel,
  onSelect,
  renderOption,
  autoFocus,
  listContainerStyle,
  androidUnderlineColor,
  placeholderTextColor,
  filterTextInputContainerStyle,
  filterTextInputStyle,
  noResultsText,
  listViewProps,
  keyboardShouldPersistTaps,
  selectedOption,
  optionTextStyle,
  renderList,
  selectedOptionTextStyle,
  showAdd,
  showAddPress,
  showAddContent
}: ModalPickerProps) => {
  const [state, setState] = useState({
    visibleSearch: false,
    filter: '',
    ds: options,
    visibleShowAdd: false
  });
  useEffect(() => {
    setState({
      ...state,
      filter: '',
      ds: options
      // ds: state.ds
    });
  }, [visible, options]);
  const renderListFun = () => {
    return (
      <View style={listContainerStyle || styles.listContainer}>
        {renderOptionList()}
      </View>
    );
  };

  const renderOptionList = () => {
    const { ds } = state;

    if (ds.length == 0) {
      return (
        <FlatList
          data={ds}
          renderItem={() => (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>{noResultsText}</Text>
            </View>
          )}
        />
      );
    } else {
      return (
        <View>
          <FlatList
            data={ds}
            renderItem={rowData => renderOptionFunc(rowData)}
          />
        </View>
      );
    }
  };

  const renderOptionFunc = rowData => {
    const { value, label, description } = rowData.item;

    let style = styles.optionStyle;
    let textStyle = optionTextStyle || styles.optionTextStyle;

    if (value === selectedOption) {
      style = styles.selectedOptionStyle;
      textStyle = selectedOptionTextStyle || styles.selectedOptionTextStyle;
    }

    if (renderOption) {
      return renderOption(rowData, value === selectedOption);
    } else {
      return (
        <List.Item
          key={value}
          style={{ borderBottomWidth: 1, borderBottomColor: '#dbdbdb' }}
          onPress={() => onSelect(value)}
          title={label}
          description={description}
        />
      );
    }
  };

  const onFilterChange = text => {
    const filter = text.toLowerCase();

    // apply filter to incoming data
    const filtered = !filter.length
      ? options
      : options.filter(({ label, value }) => {
          return 0 <= label.toLowerCase().indexOf(filter);
        });

    setState({
      ...state,
      filter: text.toLowerCase(),
      ds: filtered
    });
  };

  return (
    <Modal
      onRequestClose={onCancel}
      {...modal}
      visible={visible}
      transparent={false}
      avoidKeyboard={true}
      presentationStyle="fullScreen"
      style={{ margin: 0, justifyContent: 'flex-start' }}
      supportedOrientations={['portrait', 'landscape']}
    >
      <Appbar.Header>
        {showFilter && state.visibleSearch ? (
          <>
            {/* <Appbar.Action
              icon="close"
              onPress={() => setState({ ...state, visibleSearch: false })}
            /> */}
            <View style={{ flex: 1 }}>
              <Searchbar
                placeholder={placeholderText}
                onChangeText={onFilterChange}
                // icon="check"
                icon={p => <Icon {...p} name="check" />}
                onIconPress={() =>
                  setState({
                    ...state,
                    visibleSearch: false,
                    filter: '',
                    ds: options
                  })
                }
              />
            </View>
          </>
        ) : (
          <>
            <Appbar.BackAction onPress={onCancel} />
            <Appbar.Content title={title} color="black" />
            {showFilter ? (
              <Appbar.Action
                // color="white"
                icon="magnify"
                onPress={() => setState({ ...state, visibleSearch: true })}
              />
            ) : null}
          </>
        )}
      </Appbar.Header>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}
      >
        {/* <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}> */}
        {state.visibleShowAdd && showAdd ? showAddContent() : renderListFun()}
        {/* </View> */}
      </ScrollView>
      {showAdd ? (
        <FAB
          style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
          small={false}
          icon="add"
          onPress={() => setState({ ...state, visibleShowAdd: true })}
        />
      ) : null}
    </Modal>
  );
};

ModalPicker.defaultProps = {
  placeholderText: 'Filter...',
  placeholderTextColor: '#ccc',
  androidUnderlineColor: 'rgba(0,0,0,0)',
  cancelButtonText: 'Cancel',
  noResultsText: 'No matches',
  visible: true,
  showFilter: true,
  keyboardShouldPersistTaps: 'never'
};

export default ModalPicker;
