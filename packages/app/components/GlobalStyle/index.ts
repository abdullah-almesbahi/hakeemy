import { StyleSheet, Dimensions } from 'react-native';
const DEVICE = Dimensions.get('screen');

export const getResponsiveStyle = () => {
  if (DEVICE.height < 1000) {
    return StyleSheet.create({
      container: {
        flex: 1
      }
    });
  } else {
    return StyleSheet.create({
      container: {}
    });
  }
};

export default StyleSheet.create({
  fixContainerSmall: {
    flex: 1
  },
  fixContainerLarge: {},
  marginBottom10: {
    marginBottom: 10
  },
  marginBottom0: {
    marginBottom: 0
  },
  alignCenter: {
    alignItems: 'center'
  },
  marginHorizontal5: {
    marginHorizontal: 5
  },
  textAlignCenter: {
    textAlign: 'center'
  }
});
