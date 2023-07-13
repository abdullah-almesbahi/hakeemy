import * as React from 'react';
import { Platform } from '../../components/Platform';
import {
  View,
  Linking,
  Image,
  Text as _Text,
  TouchableOpacity
} from 'react-native';
import { Text } from '../../components';
import styles from './styles';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Button,
  IconButton,
  TextInput,
  TouchableRipple
} from 'react-native-paper';
import FormFooter from './Formik';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
// import saga from './saga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectUserType } from '../../containers/User/ducks';
import { themeHospital, themePatient } from '../../containers/App/themes';
import { isRtl, getLocalizeRoute } from '../../utils/helper';
import makeGrid from '../../components/Grid';
import { push } from 'connected-react-router';
import {
  ROUTE_ABOUT_HAKEEMY,
  ROUTE_PAGE,
  ROUTE_CONTACTUS
} from '../../utils/constants';
import { Link } from '../../components/Router';
const Grid = makeGrid(16); // gutter size

interface FooterProps {
  push: typeof push;
}

const openURL = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URI: ${url}`);
    }
  });
};

const Footer: React.SFC<FooterProps> = props => {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <View
      style={{
        borderTopColor: '#e0e0e0',
        borderTopWidth: 1,
        backgroundColor: 'rgb(70, 70, 70)'
      }}
    >
      <View style={styles.footerLight}>
        {/* <FormFooter
          color={
            props.userType == 1
              ? themeHospital.colors.primary
              : themePatient.colors.primary
          }
          intl={props.intl}
        /> */}
        {/* <View style={{ paddingVertical: 20, flexDirection: 'row' }}>
          <TextInput
            // mode="outlined"
            theme={{
              colors: {
                text: 'black',
                // disabled: 'black',
                background: 'rgb(0, 0, 0,0)',
                placeholder: 'gray',
                primary: 'black'
              }
            }}
            label="Email"
            // value={'ggg'}
            onChangeText={text => setState({ text })}
            style={{ background: 'white' }}
          />
          <View style={{ paddingHorizontal: 5 }} />
          <View
            style={{
              justifyContent: 'center'
            }}
          >
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              SUBSCRIBE
            </Button>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 50,
            justifyContent: 'center'
          }}
        >
          <Link
            to={getLocalizeRoute(ROUTE_ABOUT_HAKEEMY)}
            className='footerLink'
          >
            عن حكيمي
          </Link>
          <Text light>-</Text>
          <Link to={getLocalizeRoute(ROUTE_CONTACTUS)} className='footerLink'>
            اتصل بنا
          </Link>

          <Text light>-</Text>
          <Link
            to={
              isRtl()
                ? getLocalizeRoute(ROUTE_PAGE + '/الشروط-والأحكام')
                : getLocalizeRoute(ROUTE_PAGE + '/terms-and-conditions')
            }
            className='footerLink'
          >
            الشروط والأحكام
          </Link>

          <Text light>-</Text>
          <Link
            to={
              isRtl()
                ? getLocalizeRoute(ROUTE_PAGE + '/سياسة-الخصوصية')
                : getLocalizeRoute(ROUTE_PAGE + '/privacy-policy')
            }
            className='footerLink'
          >
            سياسية الخصوصية
          </Link>

          {/* <Text light>-</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://old.hakeemy.com/home/job')}
          >
            <Text light style={styles.space}>
              تقدم لوظيفة
            </Text>
          </TouchableOpacity> */}

          <View style={{ width: 10 }} />
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableRipple
            onPress={() =>
              openURL(
                'https://apps.apple.com/sa/app/aika-hakeemy-%D8%AD%D9%83%D9%8A%D9%85%D9%8A/id1391930785'
              )
            }
            rippleColor='rgba(0, 0, 0, .32)'
            style={{ borderRadius: 7 }}
          >
            <Image
              style={{ width: 130, height: 38 }}
              source={require('../../images/app-store-badge.png')}
            />
          </TouchableRipple>
          <View style={{ paddingHorizontal: 5 }} />
          <TouchableRipple
            onPress={() =>
              openURL(
                'https://play.google.com/store/apps/details?id=com.hakeemy'
              )
            }
            rippleColor='rgba(0, 0, 0, .32)'
            style={{ borderRadius: 7 }}
          >
            <Image
              style={{ width: 130, height: 39 }}
              source={require('../../images/google-play-badge.png')}
            />
          </TouchableRipple>
        </View>
      </View>
      <View style={styles.footerBar}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>حقوق النشر © حکیمي. جميع الحقوق محفوظة</Text>
            </Grid.Col>
            <Grid.Col
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <IconButton
                icon='youtube'
                color='#888'
                size={18}
                onPress={() =>
                  openURL(
                    'https://www.youtube.com/channel/UC93ioC1waiLjUnL6F-4BwQA'
                  )
                }
              />
              <IconButton
                icon={require('../../images/instagram.svg')}
                color='#888'
                size={15}
                onPress={() =>
                  openURL('https://www.instagram.com/hakeemy_info/')
                }
              />
              <IconButton
                icon='twitter'
                color='#888'
                size={18}
                onPress={() => openURL('https://twitter.com/hakeemyinfo')}
              />
              <IconButton
                icon='facebook'
                color='#888'
                size={18}
                onPress={() => openURL('https://www.facebook.com/hakeemyinfo/')}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
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
  injectIntl
)(Footer);
