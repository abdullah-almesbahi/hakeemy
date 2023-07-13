import * as React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { View, Image } from 'react-native';
import Text from '../../components/Text';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from 'react-native-fbsdk';

interface LoginWithFacebookProps {
  intl: any;
  onLogin: (data: any) => void;
}

const LoginWithFacebook: React.SFC<LoginWithFacebookProps> = props => {
  // Facebook login

  const FBGraphRequest = async (fields, callback) => {
    const accessData = await AccessToken.getCurrentAccessToken();
    // Create a graph request asking for user information
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessData.accessToken,
        parameters: {
          fields: {
            string: fields
          }
        }
      },
      callback.bind(this)
    );
    // Execute the graph request created above
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  const FBLoginCallback = async (error, result) => {
    if (error) {
      // console.log('error', error);
    } else {
      props.onLogin(result);
      // console.log('fine');

      // applyChanges(data);
    }
  };
  const facebookLogin = async () => {
    let result;
    try {
      // LoginManager.setLoginBehavior('NATIVE_ONLY');
      result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email'
      ]);
    } catch (nativeError) {
      try {
        // LoginManager.setLoginBehavior('WEB_ONLY');
        result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email'
        ]);
      } catch (webError) {}
    }

    if (result.isCancelled) {
    } else {
      FBGraphRequest('name, email', FBLoginCallback);
      // name,picture.type(large), id, first_name, last_name, gender, birthday
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#227aee',
        borderRadius: 2,
        marginTop: 25
      }}
    >
      <TouchableRipple
        // mode='contained'
        onPress={facebookLogin}
        style={{ width: 304, height: 40 }}
        theme={{ colors: { background: '#227aee' } }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={require('../../images/facebook.png')}
              style={{ width: 18, height: 18 }}
              // source={{ url: '../../images/search.png' }}
            />
          </View>
          <View
            style={{
              flex: 6,
              justifyContent: 'center',
              paddingHorizontal: 8,
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {props.intl.formatMessage(messages.SignInFacebook)}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default compose(injectIntl)(LoginWithFacebook);
