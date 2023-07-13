import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput as NativeTextInput,
  ScrollView,
  FlatList
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
import { Text, Icon } from '../';
import { SelectPickerProps, ModalPickerProps } from './types';
import H2 from '../H2';
import Modal from '../Modal';
import LoadingIndicator from '../LoadingIndicator';

const SelectPickerWithoutTextInput = (props: SelectPickerProps) => {
  const [state, setState] = useState({
    visible: true,
    labelPicked: '',
    valuePicked: '',
    visibleSearch: false,
    filter: '',
    ds: props.options,
    visibleShowAdd: false
  });

  const renderOptionList = () => {
    return (
      <View>
        <FlatList
          data={props.options}
          renderItem={rowData => renderOptionFunc(rowData)}
        />
      </View>
    );
  };

  const renderOptionFunc = rowData => {
    const { value, label, description } = rowData.item;
    return (
      <List.Item
        key={value}
        style={{ borderBottomWidth: 1, borderBottomColor: '#dbdbdb' }}
        // onPress={() => onSelect(value)}
        onPress={() => {
          onSelect(value, label);
        }}
        title={label}
        description={description}
      />
    );
  };

  // const onFilterChange = text => {
  //   // const filter = text;
  //   const filtered = !text.length
  //     ? props.options
  //     : props.options.filter(({ label, value }) => {
  //         return 0 <= label.toLowerCase().indexOf(text);
  //       });
  //   setState({
  //     ...state,
  //     filter: text.toLowerCase(),
  //     ds: filtered
  //   });
  // };

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
      // visible: false,
      filter: ''
    });
    props.onCancel();
  };
  return (
    <View>
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
          {/* {props.showFilter && state.visibleSearch ? (
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
          <> */}
          <Appbar.Action icon="close" onPress={onCancel} />
          <Appbar.Content title={props.title} color="black" />
          {/* {props.showFilter ? (
            <Appbar.Action
              // color="white"
              icon="magnify"
              onPress={() => setState({ ...state, visibleSearch: true })}
            />
          ) : null}
          </>
          )} */}
        </Appbar.Header>
        {props.loading ? (
          <View style={styles.noData}>
            <LoadingIndicator />
          </View>
        ) : props.options && props.options.length == 0 ? (
          <View>
            <Text style={styles.noResultsText}>
              {props.noResultsText ? props.noResultsText : 'No results fount'}
            </Text>
          </View>
        ) : props.options && props.options.length > 0 ? (
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

export default SelectPickerWithoutTextInput;
