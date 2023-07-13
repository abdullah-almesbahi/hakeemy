/**
 *
 * AddDoctorPage
 *
 */

import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectAddDoctorPage,
  loadSpecialities,
  createDoctor
} from './ducks';
import { AddDoctorPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { Platform } from '../../components/Platform';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import FormAddDoctorPage from './formik';
import { Appbar } from 'react-native-paper';
import Helmet from '../../components/Helmet';
import styles from './styles';
import LoadingIndicator from '../../components/LoadingIndicator';
import { makeSelectUser } from '../User/ducks';
import SafeAreaView from 'react-native-safe-area-view';
import { getSiteName } from '../../utils/helper';

const AddDoctorPage = (props: AddDoctorPageProps) => {
  // useInjectReducer({ key: 'addDoctorPage', reducer });
  useInjectSaga({ key: 'addDoctorPage', saga });
  // const openDrawer = React.useContext(DrawerContext);

  useEffect(() => {
    props.loadSpecialities();
  }, []);

  return props.addDoctorPage.specialitiesData.length === 0 ? (
    <View style={styles.loadingContainer}>
      <LoadingIndicator />
    </View>
  ) : (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <FormAddDoctorPage
        specialities={props.addDoctorPage.specialitiesData}
        isLoading={props.addDoctorPage.loading}
        intl={props.intl}
        onSubmit={(values: any, action: any) => {
          // console.log('valuesaaa', values);
          if (Platform.OS == 'web') {
            // if (Platform.OS == 'web' || Platform.OS == 'android') {
            let formdata = new FormData();

            for (var k in values) {
              if (values.hasOwnProperty(k)) {
                // if (
                //   k == ('doctor_image' || 'moh_card') &&
                //   // Platform.OS == 'android'
                // ) {
                //   formdata.append(k, values[k]['data']);
                // } else if (k == 'moh_card' && Platform.OS == 'android') {
                //   formdata.append(k, values[k]);
                // } else
                if (k == 'speciality') {
                  formdata.append(`${k}[]`, values[k]);
                } else {
                  formdata.append(k, values[k]);
                }
              }
            }

            props.onSubmit(formdata, action);
          } else if (Platform.OS == 'android') {
            let newData = [];
            for (var k in values) {
              if (values.hasOwnProperty(k)) {
                // console.log('xxxxxxxxxxxx', values[k]);
                if (k == 'speciality') {
                  newData.push({
                    name: `${k}[]`,
                    data: `${values[k]}`
                  });
                } else if (k == 'doctor_image' || k == 'moh_card') {
                  newData.push({
                    ...values[k]
                  });
                } else if (k == 'email') {
                  newData.push({
                    name: k,
                    data: values[k].toLowerCase()
                  });
                } else {
                  newData.push({
                    name: k,
                    data: values[k]
                  });
                }
              }
            }
            props.onSubmit(newData, action);
            // console.log('newData', newData);
          } else {
            let newData = [];
            for (var k in values) {
              if (values.hasOwnProperty(k)) {
                if (k == 'doctor_image' || k == 'moh_card') {
                  newData.push({
                    ...values[k]
                  });
                } else if (k == 'speciality') {
                  newData.push({
                    name: `${k}[]`,
                    data: values[k]
                  });
                } else if (k == 'email') {
                  newData.push({
                    name: k,
                    data: values[k].toLowerCase()
                  });
                } else {
                  newData.push({
                    name: k,
                    data: values[k]
                  });
                }
              }
            }
            props.onSubmit(newData, action);
          }
        }}
        api_key={props.user.api_key}
        push={props.push}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  addDoctorPage: makeSelectAddDoctorPage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    onSubmit: (values, action) => dispatch(createDoctor(values, action)),
    loadSpecialities: () => dispatch(loadSpecialities())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(AddDoctorPage);
