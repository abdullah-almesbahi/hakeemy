import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { TextInput, HelperText, Surface, Button } from 'react-native-paper';
import styles from './styles';
import { View, Text } from 'react-native';
import Modal from '../../components/Modal';

const FormSmsVisibility: React.SFC<FormDoctorProfilePageProps> = ({
  intl,
  onSubmit2,
  push,
  visible,
  ...props
}) => {
  const DefaultFields = {
    verification_code: ''
  };
  const Schema = yup.object().shape({
    verification_code: yup.number()
  });
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
        isSubmitting
      }) => {
        return (
          // <>

          <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            style={styles.modal}
          >
            {props.visible}
            <View style={styles.surfaceSection}>
              <Surface style={styles.surface}>
                <View style={styles.surfaceBody2}>
                  <Text style={styles.surfaceText}>
                    <FormattedMessage {...messages.willReciveSMS} />
                  </Text>
                  <Text style={styles.surfaceText}>
                    <FormattedMessage {...messages.enterCode} />
                  </Text>
                </View>
                <TextInput
                  mode="outlined"
                  label="Enter Verification Code"
                  value={values.verification_code}
                  theme={{
                    colors: {
                      background: 'white'
                    }
                  }}
                  onChangeText={handleChange('verification_code')}
                />
                <HelperText
                  type="error"
                  visible={
                    errors.verification_code && touched.verification_code
                      ? true
                      : false
                  }
                >
                  {errors.verification_code}
                </HelperText>
                <View style={styles.buttonSection}>
                  <Button
                    mode="text"
                    color="black"
                    style={styles.button}
                    onPress={() => props.hideconfirmSms()}
                  >
                    <FormattedMessage {...messages.cancel} />
                  </Button>
                  <Button
                    mode="text"
                    color="black"
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <FormattedMessage {...messages.confirm} />
                  </Button>
                </View>
              </Surface>
            </View>
          </Modal>
        );
      }}
      onSubmit={onSubmit2}
    />
  );
};

export default FormSmsVisibility;
