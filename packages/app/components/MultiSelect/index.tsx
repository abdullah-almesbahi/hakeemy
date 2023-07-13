/**
 *
 * MultiSelect
 *
 */

import React, { memo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput as NativeTextInput
} from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectMultiSelect } from './ducks';
import { MultiSelectProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import {
  Appbar,
  Checkbox,
  Searchbar,
  TextInput,
  TouchableRipple
} from 'react-native-paper';
// import { DrawerContext } from '../../hooks/useDrawerContext';

import styles from './styles';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { makeSelectUserType } from '../../containers/User/ducks';
import { HOSPITAL_TYPE } from '../../utils/constants';
import { themeHospital, themePatient } from '../../containers/App/themes';

const MultiSelect = (props: MultiSelectProps) => {
  useInjectSaga({ key: 'multiSelect', saga });
  // const openDrawer = React.useContext(DrawerContext);

  // Searchbar
  const [query, setQuery] = useState({ firstQuery: '' });

  const textInputInsuance = React.useRef(null);

  const { firstQuery } = query;

  // Show & Hide MultiSelectPage
  const [show, setShow] = useState(false);
  const _showMultiSelect = () => setShow(true);
  const _hideMultiSelect = () => setShow(false);
  return (
    <View style={styles.container}>
      {!show ? (
        // <TouchableOpacity
        //   onPress={() => {
        //     textInputInsuance.current.focus();
        //   }}
        // >
        //   <View pointerEvents="none">
        <TextInput
          multiline={true}
          blurOnSubmit={true}
          maxLength={43}
          // ref={textInputInsuance}
          disabled={props.disabled}
          mode={props.mode}
          label={props.label}
          onFocus={() => _showMultiSelect()}
          value={
            props.selectedCheckedbox.map(c => ' ' + c.label) == ''
              ? ''
              : props.selectedCheckedbox.map(c => ' ' + c.label).join(', ')
                  .length > 40
              ? props.selectedCheckedbox
                  .map(c => ' ' + c.label)
                  .join(', ')
                  .substring(0, 40) + `...`
              : props.selectedCheckedbox.map(c => ' ' + c.label).join(', ')
          }
          theme={props.theme}
        />
      ) : (
        //   </View>
        // </TouchableOpacity>
        <Modal
          visible={show}
          transparent={false}
          avoidKeyboard={true}
          presentationStyle="fullScreen"
          style={{ margin: 0, justifyContent: 'flex-start' }}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={{ flex: 1 }}>
            <Header
              title={props.title}
              right={
                <Appbar.Action
                  icon="check"
                  // color="white"
                  onPress={() => {
                    props.onSubmit(
                      `${props.value}`,
                      props.selectedCheckedbox.map(d => d.value)
                    );

                    _hideMultiSelect();
                  }}
                />
              }
              style={props.style}
            />
            {/* <View
              // style={{
              //   backgroundColor:
              //     props.userType === HOSPITAL_TYPE
              //       ? themeHospital.colors.primary
              //       : themePatient.colors.primary
              // }}
              style={props.style}
            >
              <Searchbar
                style={styles.search}
                placeholder="Search"
                onChangeText={query => {
                  setQuery({ firstQuery: query });
                }}
                value={firstQuery}
              />
            </View> */}
            <ScrollView style={styles.bodyContainer}>
              {props.options.map(d => (
                <TouchableRipple
                  onPress={() => {
                    props.selectedCheckedbox.findIndex(
                      c => c.value == d.value
                    ) >= 0
                      ? props.unselectCheckbox(d)
                      : props.selectCheckbox(d);
                  }}
                >
                  <>
                    <View style={styles.checkBoxLine} key={d.label}>
                      <Checkbox.Android
                        status={
                          props.selectedCheckedbox.findIndex(
                            c => c.value == d.value
                          ) >= 0
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          props.selectedCheckedbox.findIndex(
                            c => c.value == d.value
                          ) >= 0
                            ? props.unselectCheckbox(d)
                            : props.selectCheckbox(d);
                        }}
                      />

                      <Text style={styles.listOptions}>{d.label}</Text>
                    </View>
                  </>
                </TouchableRipple>
              ))}
              <View style={{ marginBottom: 50 }} />
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  multiSelect: makeSelectMultiSelect(),
  userType: makeSelectUserType()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(MultiSelect);
