/**
 *
 * SearchDoctorPage
 *
 */

import React, { useEffect } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import {
  makeSelectSearchDoctorPage,
  loadCountryList,
  loadCitiesList,
  loadInsurancesList,
  pushSelectedCity,
  pushSelectedInsurance,
  setSearchWord,
  suggestSearch,
  loadSpecialities,
  pushSelectedLocation
} from './ducks';
import { SearchDoctorPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import FormSearchDoctorPage from './formik';

import styles from './styles';
import LoadingIndicator from '../../components/LoadingIndicator';
import { makeSelectLocale, changeLocale } from '../LanguagePage/ducks';
import makeGrid from '../../components/Grid';
import Responsive from '../../components/Responsive';
import { Text, H2, H1, MaterialCommunityIcons, Helmet } from '../../components';
import LauncherBottomNavigation from '../../components/LauncherBottomNavigation';
import withLauncherBottomNavigation from '../../components/LauncherBottomNavigation/withLauncherBottomNavigation';
import { makeSelectUserId } from '../User/ducks';
import {
  isPatient,
  isHospital,
  getLocalizeRoute,
  metaDescription
} from '../../utils/helper';
import PatientBottomNavigation from '../../components/PatientBottomNavigation';
import { ROUTE_PATIENT_HOME, ROUTE_HOSPITAL_HOME } from '../../utils/constants';
import AdSense from 'react-adsense';

const Grid = makeGrid(16); // gutter size

const SearchDoctorPage = (props: SearchDoctorPageProps) => {
  // useInjectReducer({ key: 'searchDoctorPage', reducer });
  useInjectSaga({ key: 'searchDoctorPage', saga });

  useEffect(() => {
    props.loadCountryList();
    props.loadSpecialities();
  }, []);

  const getSearchForm = () => {
    return (
      <Grid.Container style={{ maxWidth: 500 }}>
        <Grid.Row>
          <Grid.Col>
            <FormSearchDoctorPage
              intl={props.intl}
              onSubmit={props.onSubmit}
              countries={props.searchDoctor.countryData}
              cities={props.searchDoctor.citiesData}
              insurances={props.searchDoctor.insurancesData}
              push={props.push}
              loadCitiesList={props.loadCitiesList}
              loadInsurancesList={props.loadInsurancesList}
              pushSelectedCity={props.pushSelectedCity}
              pushSelectedInsurance={props.pushSelectedInsurance}
              pushSelectedLocation={props.pushSelectedLocation}
              language={props.language}
              changeLocale={props.changeLocale}
              setSearchWord={props.setSearchWord}
              suggestSearch={props.suggestSearch}
              searchDoctor={props.searchDoctor}
              userId={props.userId}
              loading={props.searchDoctor.loading}
            />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    );
  };

  const getContent = () => {
    return props.searchDoctor.countryData &&
      props.searchDoctor.countryData.length === 0 ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LoadingIndicator />
      </View>
    ) : (
      <Responsive
        small={
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='always'
          >
            {getSearchForm()}
          </ScrollView>
        }
        large={getSearchForm()}
      />
    );
  };

  const getSiteNameHome = () => {
    const language = props.language;
    if (language === 'ar') {
      return '%s | حكيمي';
    }
    return '%s | Hakeemy';
  };
  const schema = {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@content': 'http://schema.org',
      '@type': 'WebPage',
      headline: getSiteNameHome().replace(
        '%s',
        props.intl.formatMessage(messages.metaDescription)
      )
    })
  };

  const content = () => (
    <>
      <Helmet
        titleTemplate={getSiteNameHome()}
        title={props.intl.formatMessage(messages.title)}
        meta={metaDescription(
          props.intl.formatMessage(messages.metaDescription)
        )}
        script={[schema]}
      />
      <Responsive
        small={
          getContent()

          // <ImageBackground
          //   style={styles.containerBackground}
          //   source={require('../../images/SearchDoctorBg2.jpg')}
          // >
          //   {getContent()}
          // </ImageBackground>
        }
        large={
          <>
            <ImageBackground
              style={styles.containerBackground}
              source={require('../../images/16_banner.jpg')}
            >
              <Grid.Container style={{ paddingVertical: 40 }}>
                <Grid.Row style={{ marginBottom: 30 }}>
                  <Grid.Col style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'space-between',
                        justifyContent: 'space-between',
                        // maxWidth: 1365,
                        // marginRight: 'auto',
                        // marginLeft: 'auto',
                        width: '100%',
                        paddingVertical: 30
                        // borderWidth: 1,
                        // borderColor: 'green'
                      }}
                    >
                      <View
                        style={{
                          flex: 1
                          //  borderWidth: 1, borderColor: 'red'
                        }}
                      />

                      <View
                        style={{
                          flex: 9
                          // borderWidth: 1, borderColor: 'blue'
                        }}
                      >
                        {getContent()}
                      </View>
                      <View
                        style={{
                          flex: 1
                          //  borderWidth: 1, borderColor: 'red'
                        }}
                      >
                        <AdSense.Google
                          client='ca-pub-5739403267171591'
                          slot='7401978806'
                          style={{ display: 'block', width: 150, height: 400 }}
                          format='auto'
                          responsive='true'

                          // format=''
                        />
                      </View>
                    </View>
                  </Grid.Col>
                </Grid.Row>
              </Grid.Container>
            </ImageBackground>
            <Grid.Container style={{ paddingVertical: 40 }}>
              <Grid.Row style={{ marginBottom: 30 }}>
                <Grid.Col style={{ alignItems: 'center' }}>
                  <H1>كيف تحجز في حكيمي؟</H1>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    size={70}
                    name='account-search-outline'
                  />
                  <H1>ابحث عن دكتور</H1>
                  <Text>بالتخصص و الحي والتأمين وسعر الكشف</Text>
                </Grid.Col>
                <Grid.Col style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    size={70}
                    name='account-group-outline'
                  />
                  <H1>قارن واختار</H1>
                  <Text>بالتخصص و الحي والتأمين وسعر الكشف</Text>
                </Grid.Col>
                <Grid.Col style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons size={70} name='calendar-range' />
                  <H1>احجز موعدك</H1>
                  <Text>بالتخصص و الحي والتأمين وسعر الكشف</Text>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
          </>
        }
      />
    </>
  );

  if (props.userId > 0 && isPatient()) {
    // console.log('xxx', props.match.path);
    if (
      props.match.path === '/' ||
      props.match.path === '/ar/' ||
      props.match.path === '/en/'
    ) {
      props.push(getLocalizeRoute(ROUTE_PATIENT_HOME));
    }
    return (
      <PatientBottomNavigation tab='search'>
        {content()}
      </PatientBottomNavigation>
    );
  } else if (props.userId > 0 && isHospital()) {
    if (
      props.match.path === '/' ||
      props.match.path === '/ar/' ||
      props.match.path === '/en/'
    ) {
      props.push(getLocalizeRoute(ROUTE_HOSPITAL_HOME));
    }
  }
  // console.log('render');
  // return content();
  return (
    <>
      <LauncherBottomNavigation tab='search'>
        {content()}
      </LauncherBottomNavigation>
      <Responsive
        small={
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              width: 200,
              height: 350,
              marginRight: 'auto',
              marginLeft: 'auto'
            }}
          >
            <AdSense.Google
              client='ca-pub-5739403267171591'
              slot='7401978806'
              style={{ display: 'block', width: 200, height: 350 }}
              format='auto'
              responsive='true'

              // format=''
            />
          </View>
        }
        large={null}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
  searchDoctor: makeSelectSearchDoctorPage(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    loadCountryList: () => dispatch(loadCountryList()),
    loadCitiesList: country => dispatch(loadCitiesList(country)),
    loadInsurancesList: country => dispatch(loadInsurancesList(country)),
    pushSelectedCity: city_id => dispatch(pushSelectedCity(city_id)),
    pushSelectedLocation: (latitude, longitude) =>
      dispatch(pushSelectedLocation(latitude, longitude)),
    setSearchWord: (word: string) => dispatch(setSearchWord(word)),
    pushSelectedInsurance: insurance_id =>
      dispatch(pushSelectedInsurance(insurance_id)),
    suggestSearch: text => dispatch(suggestSearch(text)),
    changeLocale: language => dispatch(changeLocale(language)),
    loadSpecialities: () => dispatch(loadSpecialities())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

// const x = withLauncherBottomNavigation(SearchDoctorPage);
// console.log('x', x);

export default compose(
  withConnect,
  injectIntl
)(SearchDoctorPage);
// )(withLauncherBottomNavigation(SearchDoctorPage, 'search'));
