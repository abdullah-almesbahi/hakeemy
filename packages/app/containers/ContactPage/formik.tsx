import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormContactPageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';
import { DrawerContext } from '../../hooks/useDrawerContext';
import Dropdown from '../../components/SelectPicker';
import { compose } from 'redux';
// import { DrawerActions } from 'react-navigation-drawer';
import Responsive from '../../components/Responsive';
import makeGrid from '../../components/Grid';
import { getMenuRoute } from '../../utils/helper';

const Grid = makeGrid(16); // gutter size

const FormContactPage: React.SFC<FormContactPageProps> = ({
  intl,
  onSubmit,
  navigation,
  push
}) => {
  const DefaultFields = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  const Schema = yup.object().shape({
    name: yup.string().required(intl.formatMessage(messages.nameRequired)),
    email: yup.string().required(intl.formatMessage(messages.emailRequired)),
    phone: yup.string().required(intl.formatMessage(messages.phoneRequired)),
    message: yup.string().required(intl.formatMessage(messages.messageRequired))
  });

  // const openDrawer: any = React.useContext(DrawerContext);

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
        console.log('err', errors);
        return (
          <>
            <Header
              // navigation={navigation}
              title={intl.formatMessage(messages.contactUs)}
              left={
                <Responsive
                  small={
                    <Appbar.BackAction
                      onPress={() => {
                        push(getMenuRoute());
                      }}
                    />
                  }
                  large={null}
                />
              }
            >
              <Buttonx
                theme={{ colors: { primary: 'black' } }}
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                <FormattedMessage {...messages.submit} />
              </Buttonx>
            </Header>
            <Grid.Container>
              <Grid.Row style={{ margin: 0, padding: 0 }}>
                <Grid.Col style={{ padding: 0 }}>
                  <ScrollView style={styles.bodyContainer}>
                    {/* <Dropdown
                      label={intl.formatMessage(messages.subject)}
                      placeholder='Select Subject'
                      selected={values.contact_type}
                      onSelect={(value: string | number) => {
                        setFieldValue('contact_type', value);
                        // props.loadChildItems(value);
                      }}
                      options={[
                        {
                          label: intl.formatMessage(messages.suggestion),
                          value: 'Suggestion'
                        },
                        {
                          label: intl.formatMessage(messages.complaints),
                          value: 'Complaints'
                        }
                      ]}
                    /> */}
                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      multiline
                      error={errors.name && touched.name ? true : false}
                      value={values.name}
                      label={intl.formatMessage(messages.name)}
                    />
                    <HelperText
                      type='error'
                      visible={errors.name && touched.name ? true : false}
                    >
                      {errors.name}
                    </HelperText>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      multiline
                      error={errors.email && touched.email ? true : false}
                      value={values.email}
                      label={intl.formatMessage(messages.email)}
                    />
                    <HelperText
                      type='error'
                      visible={errors.email && touched.email ? true : false}
                    >
                      {errors.email}
                    </HelperText>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      multiline
                      error={errors.phone && touched.phone ? true : false}
                      value={values.phone}
                      label={intl.formatMessage(messages.phone)}
                    />
                    <HelperText
                      type='error'
                      visible={errors.phone && touched.phone ? true : false}
                    >
                      {errors.phone}
                    </HelperText>

                    <TextInput
                      // id='username'
                      style={styles.textInput}
                      onChangeText={handleChange('message')}
                      onBlur={handleBlur('message')}
                      multiline
                      numberOfLines={5}
                      error={errors.message && touched.message ? true : false}
                      value={values.message}
                      label={intl.formatMessage(messages.writeHere)}
                    />
                    <HelperText
                      type='error'
                      visible={errors.message && touched.message ? true : false}
                    >
                      {errors.message}
                    </HelperText>

                    <HelperText type='error' visible={error}>
                      {error}
                    </HelperText>
                  </ScrollView>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
          </>
        );
      }}
      onSubmit={onSubmit}
    />
  );
};

export default compose(injectIntl)(FormContactPage);
