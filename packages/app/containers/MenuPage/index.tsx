/**
 *
 * MenuPage
 *
 */

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from 'utils/injectReducer';
import reducer, { makeSelectMenuPage } from './ducks';
import { MenuPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import styles from './styles';
import {
  Appbar,
  Surface,
  List,
  Portal,
  Dialog,
  Paragraph,
  Button
} from 'react-native-paper';
import Responsive from '../../components/Responsive';
import { MaterialCommunityIcons, Helmet } from '../../components';
import { HOSPITAL_TYPE } from '../../utils/constants';
import {
  ROUTE_HOSPITAL_REGISTRATION,
  ROUTE_REGISTER,
  ROUTE_LAUNCHER,
  ROUTE_HOSPITAL_CHANGE_PASSWORD,
  ROUTE_PATIENT_CHANGE_PASSWORD,
  ROUTE_ABOUT_HAKEEMY,
  ROUTE_PAGE,
  ROUTE_CONTACTUS,
  ROUTE_BLOG,
  ROUTE_LANGUAGE
} from '../../utils/constants';
import {
  logoutUser,
  setUserType,
  makeSelectUserType,
  makeSelectUser
} from '../User/ducks';
import { showSnackbar } from '../Snackbar/ducks';
import makeGrid from '../../components/Grid';
import AppbarTitle from '../../components/AppbarTitle';
import {
  isHospital,
  getSiteName,
  isRtl,
  isPatient,
  openURL,
  getLocalizeRoute
} from '../../utils/helper';
import HospitalBottomNavigation from '../../components/HospitalBottomNavigation';
import LauncherBottomNavigation from '../../components/LauncherBottomNavigation';
import PatientBottomNavigation from '../../components/PatientBottomNavigation';

const Grid = makeGrid(16); // gutter size

const MenuPage: React.SFC<MenuPageProps> = props => {
  // useInjectReducer({ key: 'menuPage', reducer });
  useInjectSaga({ key: 'menuPage', saga });
  const [dialog, setDialog] = useState(false);
  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);

  const content = () => (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.menu)}
      />
      <AppbarTitle title={props.intl.formatMessage(messages.menu)} />
      <ScrollView style={styles.bodyContainer}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col>
              {props.user.id > 0 ? (
                <Surface style={styles.surfaceContainer}>
                  <List.Item
                    title={<FormattedMessage {...messages.myInformation} />}
                    onPress={() => {
                      if (isHospital()) {
                        props.push(
                          getLocalizeRoute(ROUTE_HOSPITAL_REGISTRATION)
                        );
                      } else {
                        props.push(getLocalizeRoute(ROUTE_REGISTER));
                      }
                    }}
                    // right={p =>
                    //   !props.validation.personalInfo ? (
                    //     <List.Icon
                    //       {...p}
                    //       icon={iconProps => (
                    //         <MaterialCommunityIcons
                    //           {...iconProps}
                    //           color='red'
                    //           name='alert-circle-outline'
                    //         />
                    //       )}
                    //     />
                    //   ) : null
                    // }
                    // style={{ padding: 0 }}
                    left={props => (
                      <List.Icon
                        {...props}
                        icon={iconProps => (
                          <MaterialCommunityIcons
                            {...iconProps}
                            name='account-edit'
                          />
                        )}
                      />
                    )}
                  />
                </Surface>
              ) : null}

              {/* {Platform.OS !== "web" ? (
		<> */}

              {/* </>
	  ) : null} */}

              {/* <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.changeMobile} />}
            onPress={() => {
              props.navigation.push('ChangeMobile');
            }}
            // style={{ padding: 0 }}
            left={props => <List.Icon {...props} icon='cellphone' />}
          />
        </Surface> */}
              <Surface style={styles.surfaceContainer}>
                <List.Item
                  title={<FormattedMessage {...messages.language} />}
                  onPress={() => {
                    // props.navigation.push('Language');
                    props.push(getLocalizeRoute(ROUTE_LANGUAGE));
                  }}
                  // style={{ padding: 0 }}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={iconProps => (
                        <MaterialCommunityIcons
                          {...iconProps}
                          name='translate'
                        />
                      )}
                    />
                  )}
                />
              </Surface>

              {props.user.id > 0 ? (
                <Surface style={styles.surfaceContainer}>
                  <List.Item
                    title={<FormattedMessage {...messages.changePassword} />}
                    onPress={() => {
                      if (isHospital()) {
                        props.push(
                          getLocalizeRoute(ROUTE_HOSPITAL_CHANGE_PASSWORD)
                        );
                      } else {
                        props.push(
                          getLocalizeRoute(ROUTE_PATIENT_CHANGE_PASSWORD)
                        );
                      }
                    }}
                    // style={{ padding: 0 }}
                    left={props => <List.Icon {...props} icon='lock-reset' />}
                  />
                </Surface>
              ) : null}
              {/* <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.language} />}
            onPress={() => {
              props.navigation.push('Language');
            }}
            // style={{ padding: 0 }}
            left={props => (
              <List.Icon
                {...props}
                icon={iconProps => (
                  <MaterialCommunityIcons {...iconProps} name='translate' />
                )}
              />
            )}
          />
        </Surface> */}

              <Surface style={styles.surfaceContainer}>
                <List.Item
                  title={<FormattedMessage {...messages.aboutHakeemy} />}
                  onPress={() => {
                    props.push(getLocalizeRoute(ROUTE_ABOUT_HAKEEMY));
                  }}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={iconProps => (
                        <MaterialCommunityIcons
                          {...iconProps}
                          name='information-outline'
                        />
                      )}
                    />
                  )}
                />
              </Surface>
              <Surface style={styles.surfaceContainer}>
                <List.Item
                  title={<FormattedMessage {...messages.blog} />}
                  onPress={() => {
                    openURL('https://blog.hakeemy.com');
                    // props.push(ROUTE_BLOG);
                  }}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={iconProps => (
                        <MaterialCommunityIcons {...iconProps} name='blogger' />
                      )}
                    />
                  )}
                />
              </Surface>

              <Surface style={styles.surfaceContainer}>
                <List.Item
                  title={<FormattedMessage {...messages.termOfUse} />}
                  onPress={() => {
                    if (isRtl()) {
                      props.push(
                        getLocalizeRoute(ROUTE_PAGE + '/الشروط-والأحكام')
                      );
                    } else {
                      props.push(
                        getLocalizeRoute(ROUTE_PAGE + '/terms-and-conditions')
                      );
                    }
                  }}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={iconProps => (
                        <MaterialCommunityIcons
                          {...iconProps}
                          name='file-document-edit-outline'
                        />
                      )}
                    />
                  )}
                />
              </Surface>
              <Surface style={styles.surfaceContainer}>
                <List.Item
                  title={<FormattedMessage {...messages.privacyPolicy} />}
                  onPress={() => {
                    if (isRtl()) {
                      props.push(
                        getLocalizeRoute(ROUTE_PAGE + '/سياسة-الخصوصية')
                      );
                    } else {
                      props.push(
                        getLocalizeRoute(ROUTE_PAGE + '/privacy-policy')
                      );
                    }
                  }}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={iconProps => (
                        <MaterialCommunityIcons {...iconProps} name='lock' />
                      )}
                    />
                  )}
                />
              </Surface>
              <Surface style={styles.surfaceContainer}>
                <List.Item
                  title={<FormattedMessage {...messages.contactUs} />}
                  onPress={() => {
                    props.push(getLocalizeRoute(ROUTE_CONTACTUS));
                  }}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={iconProps => (
                        <MaterialCommunityIcons {...iconProps} name='phone' />
                      )}
                    />
                  )}
                />
              </Surface>
              {props.user.id > 0 ? (
                <Surface style={styles.surfaceContainer}>
                  <List.Item
                    title={<FormattedMessage {...messages.signOut} />}
                    onPress={() => {
                      //   props.logout();
                      //   props.navigation.navigate('Login');
                      _showDialog();
                    }}
                    // style={{ padding: 0 }}
                    left={props => (
                      <List.Icon
                        {...props}
                        icon={iconProps => (
                          <MaterialCommunityIcons
                            {...iconProps}
                            name='power-standby'
                          />
                        )}
                      />
                    )}
                  />
                </Surface>
              ) : null}
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </ScrollView>
      <Portal>
        <Dialog
          visible={dialog}
          onDismiss={_hideDialog}
          style={{ maxWidth: 500, marginHorizontal: 'auto' }}
        >
          <Dialog.Title>
            {props.intl.formatMessage(messages.confirmLogout)}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {props.intl.formatMessage(messages.sureToLogout)}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={_hideDialog}>
              {props.intl.formatMessage(messages.cancel)}
            </Button>
            <Button
              onPress={() => {
                props.logoutUser();
                props.showSnackbar(
                  props.intl.formatMessage(messages.successfullySignedOut)
                );
                props.push(getLocalizeRoute(ROUTE_LAUNCHER));
                _hideDialog();
              }}
              mode='contained'
            >
              {props.intl.formatMessage(messages.logout)}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );

  if (props.user.id > 0) {
    if (isHospital()) {
      return (
        <HospitalBottomNavigation tab='menu'>
          {content()}
        </HospitalBottomNavigation>
      );
    } else if (isPatient()) {
      return (
        <PatientBottomNavigation tab='menu'>
          {content()}
        </PatientBottomNavigation>
      );
    }
  } else {
    return (
      <LauncherBottomNavigation tab='menu'>
        {content()}
      </LauncherBottomNavigation>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  menuPage: makeSelectMenuPage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: (page: string) => dispatch(push(page)),
    logoutUser: () => dispatch(logoutUser()),
    showSnackbar: (a: string) => dispatch(showSnackbar(a)),
    setUserType: (type: string) => dispatch(setUserType(type))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(MenuPage);
