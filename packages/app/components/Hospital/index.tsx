import * as React from 'react';
import { Surface, List, IconButton, Avatar } from 'react-native-paper';
import { View, Linking } from 'react-native';
import { Text, MaterialCommunityIcons, H2 } from '../../components';
import StarRating from '../../components/StartRating';
import { push } from 'connected-react-router';
import { ROUTE_HOSPITAL_PROFILE } from '../../utils/constants';
import _has from 'lodash/has';
import messages from './messages';
import { getTranslator } from '../../components/Translator';
import { getLocalizeRoute } from '../../utils/helper';

interface HospitalProps {
  data: any;
  push: typeof push;
  mapList: boolean;
  intl: any;
}

const Hospital: React.SFC<HospitalProps> = ({ data, ...props }) => {
  const [rate, setRate] = React.useState({ starCount: 5 });

  const openURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  const onStarRatingPress = rating => {
    setRate({
      starCount: rating
    });
  };
  return (
    <Surface
      key={data.id}
      style={{
        elevation: 0,
        marginTop: 7,
        borderBottomColor: '#e2e0e0',
        borderBottomWidth: 1

        // borderRadius: 3
      }}
    >
      <List.Item
        title={
          <Text>
            {getTranslator('hospital', data, '_arabic')} (
            {Math.round(data.distance * 100) / 100} km)
          </Text>
        }
        description={p => (
          <View>
            {_has(data, 'hospital[0].hospital') ? (
              <Text
                dark
                style={{
                  marginTop: 5,
                  textAlign: 'left'
                }}
              >
                {getTranslator('hospital', data.hospital[0], 'Arabic')}
              </Text>
            ) : null}
            {_has(data, 'specialities.speciality') ? (
              <Text
                style={{
                  color: 'gray',
                  marginTop: 5,
                  textAlign: 'left'
                }}
              >
                {getTranslator('speciality', data.specialities, 'Arabic')}
              </Text>
            ) : null}

            {/* <View>
              <StarRating
                disabled={true}
                maxStars={5}
                halfStar='star-half'
                emptyStar='star-outline'
                // rating={rate.starCount}
                rating={data.rating == 0 ? rate.starCount : data.rating}
                selectedStar={rating => onStarRatingPress(rating)}
                starSize={18}
                starStyle={{
                  // color: 'gray',
                  marginTop: 5,
                  justifyContent: 'flex-end'
                }}
              />
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5
              }}
            >
              <MaterialCommunityIcons
                name='map-marker-outline'
                color='gray'
                size={15}
              />

              <Text
                style={{
                  color: 'gray',
                  marginLeft: 5,
                  fontSize: 12,
                  textAlign: 'left'
                }}
              >
                {getTranslator('address', data, '_arabic')}
              </Text>
            </View>
            {/* {console.log('prooooops', props)} */}
          </View>
        )}
        onPress={() => {
          props.push(getLocalizeRoute(ROUTE_HOSPITAL_PROFILE + '/' + data.id));
        }}
        left={() => (
          <View>
            {data.logo != '' && data.logo != null ? (
              <Avatar.Image
                style={{ backgroundColor: '#f9f9f9' }}
                source={{
                  uri: `${data.logo}`
                }}
              />
            ) : null}

            <View
              style={{
                backgroundColor: '#4fa5d6',
                borderRadius: 50,
                marginTop: 7
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  color: 'white',
                  marginVertical: 2,
                  marginHorizontal: 5
                }}
              >
                {getTranslator('type', data, '_arabic')}
              </Text>
            </View>
          </View>
        )}
        right={() =>
          props.mapList ? null : (
            <IconButton
              icon='phone'
              color='#4fa5d6'
              size={23}
              onPress={() => openURL('tel:' + data.phone)}
            />
          )
        }
      />
    </Surface>
  );
};

export default Hospital;
