module.exports = {
  project: {
    android: {
      sourceDir: './packages/mobile/android'
    }
  },
  dependencies: {
    'rn-fetch-blob': {
      platforms: {
        android: null
      }
    },
    'react-native-restart': {
      platforms: {
        android: null
      }
    }
  }
};
