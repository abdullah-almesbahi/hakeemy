/**
 *
 * AddDoctorSchedulePage
 *
 */

import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import {
  makeSelectAddDoctorSchedulePage,
  loadDoctorsList,
  selectCheckbox,
  unselectCheckbox,
  createDoctorSchedule
} from './ducks';
import { AddDoctorSchedulePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { injectIntl } from 'react-intl';
import FormAddDoctorSchedulePage from './formik';
import styles from './styles';
import { makeSelectUser } from '../User/ducks';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Platform } from '../../components/Platform';
import moment from 'moment';
import { Helmet } from '../../components';
import messages from './messages';
import { getSiteName } from '../../utils/helper';

const AddDoctorSchedulePage = (props: AddDoctorSchedulePageProps) => {
  // useInjectReducer({ key: 'addDoctorSchedulePage', reducer });
  useInjectSaga({ key: 'addDoctorSchedulePage', saga });
  // const openDrawer = React.useContext(DrawerContext);

  useEffect(() => {
    props.loadDoctorsList(props.user.api_key);
  }, []);
  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.addScheduleTitle)}
      />
      {props.addDoctorSchedulePage.loading ? (
        <View style={styles.loadingIndicatorContainer}>
          <LoadingIndicator />
        </View>
      ) : (
        <FormAddDoctorSchedulePage
          api_key={props.user.api_key}
          intl={props.intl}
          onSubmit={(data, action) => {
            if (Platform.OS == 'web') {
              const d = data.time.map(t => moment(t).format('hh:mm A'));
              data.time = d;
            }
            props.onSubmit(data, action);
          }}
          push={props.push}
          selectedCheckedbox={props.addDoctorSchedulePage.selectedCheckedbox}
          doctors={props.addDoctorSchedulePage.doctorsData}
          selectCheckbox={props.selectCheckbox}
          unselectCheckbox={props.unselectCheckbox}
        />
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  addDoctorSchedulePage: makeSelectAddDoctorSchedulePage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    onSubmit: (data, action) => dispatch(createDoctorSchedule(data, action)),
    loadDoctorsList: api_key => dispatch(loadDoctorsList(api_key)),
    selectCheckbox: values => dispatch(selectCheckbox(values)),
    unselectCheckbox: values => dispatch(unselectCheckbox(values))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(AddDoctorSchedulePage);
