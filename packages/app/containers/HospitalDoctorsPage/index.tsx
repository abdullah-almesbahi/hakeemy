/**
 *
 * HospitalDoctorsPage
 *
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

// import { useInjectReducer } from '../../utils/injectReducer';
import { HospitalDoctorsPageProps } from './types';

import { injectIntl } from 'react-intl';
import messages from './messages';
// import FormHospitalDoctorsPage from './formik';
import {
  FAB,
  Surface,
  List,
  IconButton,
  Avatar,
  Portal,
  Dialog,
  Paragraph,
  Button
} from 'react-native-paper';
// import { DrawerContext } from '../../hooks/useDrawerContext';
// import  Helmet  from '../../components/Helmet';
import styles from './styles';
// import { MaterialCommunityIcons } from '../../components';
import { ROUTE_ADD_DOCTOR } from '../../utils/constants';
import { loadDoctorsList, makeSelectHospitalDoctorsPage } from './ducks';
import { makeSelectUser } from '../User/ducks';
import SafeAreaView from 'react-native-safe-area-view';
import { themeHospital } from '../App/themes';
import LoadingIndicator from '../../components/LoadingIndicator';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { makeSelectLocale } from '../LanguagePage/ducks';

// Components
import AppbarTitle from '../../components/AppbarTitle';
import makeGrid from '../../components/Grid';
import { Helmet } from '../../components';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';
import HospitalBottomNavigation from '../../components/HospitalBottomNavigation';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { showSnackbar } from '../Snackbar/ducks';

const Grid = makeGrid(16); // gutter size

const DeleteDoctor = gql`
  mutation DeleteDoctor($where: DoctorWhereUniqueInput!) {
    deleteDoctor(where: $where) {
      id
    }
  }
`;

const HospitalDoctorsPage: React.SFC<HospitalDoctorsPageProps> = props => {
  // useInjectReducer({ key: 'hospitalDoctorsPage', reducer });
  useInjectSaga({ key: 'hospitalDoctorsPage', saga });
  const [deleteDoctor] = useMutation(DeleteDoctor);
  const [state, setState] = useState({
    deleteId: 0
  });
  const [dialog, setDialog] = useState(false);
  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);

  useEffect(() => {
    props.loadDoctorsList(props.user.api_key);
  }, []);

  const openURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  const content = () => (
    // <SafeAreaView style={styles.container}>
    <>
      {props.doctor.loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <AppbarTitle title={props.intl.formatMessage(messages.doctors)} />
          <Helmet
            titleTemplate={getSiteName()}
            title={props.intl.formatMessage(messages.doctors)}
          />
          <Grid.Container
            style={{
              flex: 1
            }}
          >
            <Grid.Row style={{ flex: 1 }}>
              <Grid.Col
                style={{
                  flex: 1,
                  position: 'relative'
                }}
              >
                {props.doctor.doctorsData &&
                props.doctor.doctorsData.length > 0 ? (
                  <ScrollView>
                    <Grid.Container>
                      <Grid.Row>
                        <Grid.Col>
                          <View style={styles.bodyContainer}>
                            {props.doctor.doctorsData.map(d => (
                              <Surface
                                key={d.id}
                                style={{
                                  elevation: 1,
                                  marginTop: 1
                                  // borderRadius: 3
                                }}
                              >
                                <List.Item
                                  title={
                                    <Text style={{ fontSize: 20 }}>
                                      {props.lang == 'en'
                                        ? d.name
                                        : d.name_arabic}
                                    </Text>
                                  }
                                  description={p => (
                                    <View
                                      style={{
                                        alignItems: 'flex-start'
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: 'gray',
                                          marginTop: 5
                                        }}
                                      >
                                        {props.lang == 'en'
                                          ? d.designation
                                          : d.designation == 'استشاري'
                                          ? ''
                                          : 'اخصائي'}
                                      </Text>
                                    </View>
                                  )}
                                  left={props => (
                                    <View>
                                      {d.picture ? (
                                        <Avatar.Image
                                          source={{ uri: d.picture }}
                                        />
                                      ) : null}
                                      {!d.picture && d.gender == 'male' ? (
                                        <Avatar.Image
                                          source={require('../../images/male_dr.jpg')}
                                        />
                                      ) : null}
                                      {!d.picture && d.gender == 'female' ? (
                                        <Avatar.Image
                                          source={require('../../images/female_dr.jpg')}
                                        />
                                      ) : null}

                                      <View
                                        style={{
                                          backgroundColor: '#4fa5d6',
                                          borderRadius: 50
                                        }}
                                      />
                                    </View>
                                  )}
                                  right={props => (
                                    <IconButton
                                      icon='trash-can-outline'
                                      color='red'
                                      size={23}
                                      // onPress={() => console.log('Pressed')}
                                      onPress={() => {
                                        // openURL('tel:' + d.phone)
                                        setState({ ...state, deleteId: d.id });
                                        _showDialog();
                                      }}
                                    />
                                  )}
                                />
                              </Surface>
                            ))}
                          </View>
                        </Grid.Col>
                      </Grid.Row>
                    </Grid.Container>
                  </ScrollView>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text>
                      {props.intl.formatMessage(messages.noDoctorsExist)}
                    </Text>
                    {/* <LoadingIndicator /> */}
                  </View>
                )}

                <FAB
                  style={[
                    { backgroundColor: themeHospital.colors.primary },
                    styles.fab
                  ]}
                  icon='plus'
                  // onPress={() => console.log("Pressed")}
                  onPress={() => {
                    props.push(getLocalizeRoute(ROUTE_ADD_DOCTOR));
                  }}
                  // color='white'
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
          <Portal>
            <Dialog
              visible={dialog}
              onDismiss={_hideDialog}
              style={{ maxWidth: 500, marginHorizontal: 'auto' }}
            >
              <Dialog.Title>
                {props.intl.formatMessage(messages.confirmDeleteTitle)}
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  {props.intl.formatMessage(messages.confirmDelete)}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={_hideDialog}>
                  {props.intl.formatMessage(messages.cancel)}
                </Button>
                <Button
                  onPress={async () => {
                    await deleteDoctor({
                      variables: {
                        where: {
                          id: state.deleteId
                        }
                      }
                    });

                    _hideDialog();
                    props.showSnackbar(
                      props.intl.formatMessage(
                        messages.successfullyDeletedDoctor
                      )
                    );
                    props.loadDoctorsList(props.user.api_key);
                    // props.push(ROUTE_LAUNCHER);
                  }}
                  mode='contained'
                >
                  {props.intl.formatMessage(messages.delete)}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
    </>
    // </SafeAreaView>
  );

  return (
    <HospitalBottomNavigation tab='doctors'>
      {content()}
    </HospitalBottomNavigation>
  );
};

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectHospitalDoctorsPage(),
  lang: makeSelectLocale(),
  // doctor: makeSelectHospitalDoctorsPage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    // onSubmit: (data, action) =>
    //   dispatch(updateHospitalDoctorsPage(data, action)),
    loadDoctorsList: api_key => dispatch(loadDoctorsList(api_key)),
    showSnackbar: (message: string) => dispatch(showSnackbar(message))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(HospitalDoctorsPage);
