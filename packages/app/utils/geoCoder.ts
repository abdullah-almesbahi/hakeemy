import GoogleApi from './googleApi';
import { GOOGLE_MAP_KEY } from './constants';

export default {
  apiKey: GOOGLE_MAP_KEY,

  fallbackToGoogle(key: any) {
    this.apiKey = key;
  },

  geocodePosition(position: any, language: any) {
    if (!position || !position.latitude || !position.longitude) {
      return Promise.reject(
        new Error('invalid position: {latitude, longitude} required')
      );
    }

    return GoogleApi.geocodePosition(this.apiKey, position, language);
  },

  geocodeAddress(address: any, language: any) {
    if (!address) {
      return Promise.reject(new Error('address is null'));
    }
    return GoogleApi.geocodeAddress(this.apiKey, address, language);
  }
};
