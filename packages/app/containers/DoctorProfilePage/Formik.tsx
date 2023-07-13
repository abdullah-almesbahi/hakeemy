import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { TextInput, HelperText, Surface, Button } from 'react-native-paper';
import styles from './styles';
import { View, Text } from 'react-native';
import Modal from '../../components/Modal';
import PhoneInput from 'react-native-phone-input';
import { Platform } from '../../components/Platform';

const FormConfirmSmsPage: React.SFC<FormDoctorProfilePageProps> = ({
  intl,
  onSubmit,
  push,
  visible,
  ...props
}) => {
  const DefaultFields = {
    name: '',
    mobile: props.mobile ? props.mobile : '+966'
  };
  let Schema;
  if (props.isSignedIn < 1) {
    Schema = yup.object().shape({
      name: yup.string().required(intl.formatMessage(messages.nameRequired)),
      mobile: yup.number().required(intl.formatMessage(messages.mobileRequired))
    });
  } else {
    Schema = yup.object().shape({
      mobile: yup.number().required(intl.formatMessage(messages.mobileRequired))
    });
  }

  const phone = React.useRef(null);

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
        setFieldValue
      }) => {
        return (
          <Modal
            visible={visible}
            transparent={true}
            animationType='fade'
            style={styles.modal}
          >
            {props.visible}
            <View style={styles.surfaceSection}>
              <Surface style={styles.surface}>
                {props.isSignedIn && props.isSignedIn > 0 ? (
                  <View style={styles.surfaceBody}>
                    <Text style={styles.surfaceText}>
                      <FormattedMessage {...messages.confirmNumber} />
                    </Text>
                  </View>
                ) : null}
                {props.isSignedIn && props.isSignedIn > 0 ? null : (
                  <View>
                    <TextInput
                      mode='outlined'
                      label={<FormattedMessage {...messages.name} />}
                      value={values.name}
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                      onChangeText={handleChange('name')}
                    />
                    <HelperText
                      type='error'
                      visible={errors.name && touched.name ? true : false}
                    >
                      {errors.name}
                    </HelperText>
                  </View>
                )}
                {/******************************/}
                {/******************************/}
                {/******************************/}
                {Platform.OS == 'web' ? (
                  <>
                    <TextInput
                      mode='outlined'
                      label={<FormattedMessage {...messages.phoneNumber} />}
                      value={values.mobile}
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                      onChangeText={handleChange('mobile')}
                    />
                    <HelperText
                      type='error'
                      visible={errors.mobile && touched.mobile ? true : false}
                      // visible={errors.mobile && touched.mobile ? true : false}
                    >
                      {errors.mobile}
                    </HelperText>
                  </>
                ) : (
                  <View>
                    <View
                      style={{
                        position: 'absolute',
                        flex: 1,
                        width: 306,
                        alignSelf: 'center'
                      }}
                    >
                      <TextInput
                        mode='outlined'
                        label={<FormattedMessage {...messages.phoneNumber} />}
                        value={values.mobile}
                        theme={{
                          colors: {
                            background: 'white'
                          }
                        }}
                        onChangeText={handleChange('mobile')}
                      />
                      <HelperText
                        type='error'
                        visible={errors.mobile && touched.mobile ? true : false}
                        // visible={errors.mobile && touched.mobile ? true : false}
                      >
                        {errors.mobile}
                      </HelperText>
                    </View>
                    <View
                      style={{
                        position: 'relative',
                        alignSelf: 'flex-end',
                        marginTop: 25,
                        marginHorizontal: 10
                      }}
                    >
                      <PhoneInput
                        ref={phone}
                        initialCountry='sa'
                        onSelectCountry={a =>
                          setFieldValue(
                            'mobile',
                            `+${phone.current.getCountryCode(a)}`
                          )
                        }
                        confirmText={intl.formatMessage(messages.confirm)}
                        cancelText={intl.formatMessage(messages.cancel)}
                      />
                    </View>
                  </View>
                )}

                {/******************************/}
                {/******************************/}
                {/******************************/}
                <View style={styles.buttonSection}>
                  <Button
                    mode='text'
                    color='black'
                    style={styles.button}
                    onPress={() => props.hide()}
                  >
                    <FormattedMessage {...messages.cancel} />
                  </Button>
                  <Button
                    mode='text'
                    color='black'
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                      props.isSignedIn > 0 ? (
                        values.mobile !== '' ? (
                          <>
                            {props.hide()};{props.show()};
                          </>
                        ) : null
                      ) : values.mobile !== '' && values.name !== '' ? (
                        <>
                          {props.hide()};{props.show()};
                        </>
                      ) : null;
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
      onSubmit={onSubmit}
    />
  );
};

export default FormConfirmSmsPage;
