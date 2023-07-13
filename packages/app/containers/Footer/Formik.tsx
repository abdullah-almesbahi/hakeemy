import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormRegisterPageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar,
  Checkbox,
  FAB,
  Button,
  Colors,
  ActivityIndicator,
  TouchableRipple,
  IconButton
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Text, Small } from '../../components';
import { Linking, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import color from '@material-ui/core/colors/amber';

// import ModalPickerImage from './ModalPickerImage';

const FormFooter: React.SFC<FormFooterProps> = ({
  intl,
  onSubmit,
  push,
  user,
  disabledStatus,
  makeDisabled,
  logoutUser,
  showSnackbar,
  makeEnable,
  color,
  ...props
}) => {
  let DefaultFields, Schema;
  DefaultFields = {
    email: ''
  };
  Schema = yup.object().shape({
    email: yup.string().email()
  });

  const [state, setState] = useState({ checked: true });
  return (
    <Formik
      initialValues={DefaultFields}
      validationSchema={Schema}
      render={({
        values,
        errors,
        error,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        ...props
      }) => {
        return (
          <View
            style={{
              width: window.innerWidth * 0.4,
              paddingVertical: 20,
              flexDirection: 'row',
              minWidth: 420,
              maxWidth: 2000,
              alignSelf: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                // mode="outlined"
                // style={{ manWidth: 900 }}
                theme={{
                  colors: {
                    text: 'black',
                    background: 'rgb(0, 0, 0,0)',
                    placeholder: 'gray',
                    primary: 'black'
                  }
                }}
                label={intl.formatMessage(messages.subscribe)}
                value={values.Email}
                onChangeText={handleChange('email')}
                style={{ background: 'white' }}
              />
            </View>
            <View style={{ paddingHorizontal: 15 }} />
            <View
              style={{
                justifyContent: 'center'
              }}
            >
              <IconButton
                // mode="contained"
                icon='check'
                // color={color}
                style={{
                  backgroundColor: color,
                  padding: 25,
                  borderRadius: '50%'
                }}
                onPress={() => console.log('sssssss')}
              />
              {/* SUBSCRIBE
              </Button> */}
            </View>
          </View>
        );
      }}
      onSubmit={onSubmit}
    />
  );
};

export default FormFooter;
