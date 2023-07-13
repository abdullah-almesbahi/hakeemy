module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel']
    }
  },
  plugins: [
    // 'transform-inline-environment-variables'
    // [
    //   'module-resolver',
    //   {
    //     root: ['../app'],
    //     alias: {
    //       app: ['./packages/app'],
    //       containers: ['./packages/app/containers'],
    //       components: ['./packages/app/components'],
    //       images: ['./packages/app/images'],
    //       utils: ['./packages/app/utils']
    //     }
    //   }
    // ]
  ]
};
