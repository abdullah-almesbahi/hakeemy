import * as React from 'react';
import { View } from 'react-native';
import { getTheme } from '../../utils/helper';
import { TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '../Icon';
import color from 'color';
import { Text } from '..';

export interface BottomNavigationProps {
  routes: any;
  tab: string;
}

const BottomNavigation: React.SFC<BottomNavigationProps> = props => {
  const textColor = '#000000';
  const activeTintColor = textColor;
  const inactiveTintColor = color(textColor)
    .alpha(0.5)
    .rgb()
    .string();

  return (
    <View
      style={{
        backgroundColor: getTheme().colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: 50
      }}
    >
      {props.routes.map(route => {
        return (
          <TouchableRipple
            key={route.key}
            borderless
            centered
            // rippleColor={touchColor}
            onPress={() => {
              route.onPress();
              //   console.log('xxx');
            }}
            // testID={getTestID({ route })}
            // accessibilityLabel={getAccessibilityLabel({ route })}
            accessibilityTraits={
              // focused ? ['button', 'selected'] : 'button'
              route.key == 'search' ? ['button', 'selected'] : 'button'
            }
            accessibilityComponentType='button'
            accessibilityRole='button'
            accessibilityStates={['selected']}
            style={{ flex: 1, paddingVertical: 6 }}
          >
            <View
              style={{
                alignItems: 'center'
              }}
            >
              <MaterialCommunityIcons
                name={route.icon}
                color={
                  props.tab === route.key ? activeTintColor : inactiveTintColor
                }
                size={24}
              />
              <Text
                style={{
                  color:
                    props.tab === route.key
                      ? activeTintColor
                      : inactiveTintColor
                }}
              >
                {route.title}
              </Text>
            </View>
          </TouchableRipple>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
