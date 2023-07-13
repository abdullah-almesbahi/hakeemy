import { DefaultTheme } from 'react-native-paper';
import { FONT } from '../../utils/constants';

const fontConfig: any = {
  medium: { fontFamily: FONT, fontWeight: '400' as '400' },
  regular: { fontFamily: FONT, fontWeight: '400' as '400' },
  light: { fontFamily: FONT, fontWeight: '300' as '300' },
  thin: { fontFamily: FONT, fontWeight: '100' as '100' }
};

const themeHospital = {
  ...DefaultTheme,
  dark: false,
  // roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6fda44',
    accent: '#6fda44',
    placeholder: 'gray'
  },
  fonts: fontConfig
};
const themePatient = {
  ...DefaultTheme,
  // roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4ba4d8',
    accent: '#4ba4d8',
    placeholder: 'gray'
  },
  fonts: fontConfig
};

export { themePatient, themeHospital };
