import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width / 9;

export default StyleSheet.create({
  logo: {
    // borderWidth: 1,
    // borderColor: "red",
    width: 130,
    height: 130,
    // height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20
  }
});
