const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// our packages that will now be included in the CRA build step
const appIncludes = [resolveApp('src'), resolveApp('../app')];

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  );
  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[1].include = appIncludes;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web')
  ].concat(config.module.rules[2].oneOf[1].options.plugins);
  config.module.rules = config.module.rules.filter(Boolean);
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  );

  config.module.rules.push({
    test: /\.js$/,
    include: /node_modules/,

    exclude: /node_modules[/\\](?!react-native-paper|react-native-vector-icons|react-native-safe-area-view|react-native-swiper|react-native-segmented-control-tab|react-native-gesture-handler|react-native-modal-datetime-picker|react-native-modal|react-native-animatable|react-native-tab-view|react-native-calendars|react-native-firebase|react-native-wheel-picker-android|react-native-star-rating|react-native-button|deprecated-react-native-listview|react-native-bootstrap-styles|@react-native-community\/google-signin|@react-navigation|react-native-fbsdk|react-native-phone-input|react-native-screens|react-native-share|react-native-gps-state|react-native-keyboard-aware-scroll-view)/,
    use: {
      loader: 'babel-loader',
      options: {
        // Disable reading babel configuration
        babelrc: false,
        configFile: false,

        // The configration for compilation
        presets: [
          // ["@babel/preset-env", { useBuiltIns: "usage" }],
          ['@babel/preset-env'],
          '@babel/preset-react',
          '@babel/preset-flow'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread'
        ]
      }
    }
  });
  config.module.rules.push({
    test: /\.js$/,
    include: /packages/,
    exclude: /packages[/\\](?!react-native-web-maps2)/,
    use: {
      loader: 'babel-loader',
      options: {
        // Disable reading babel configuration
        babelrc: false,
        configFile: false,

        // The configration for compilation
        presets: [
          // ["@babel/preset-env", { useBuiltIns: "usage" }],
          ['@babel/preset-env'],
          '@babel/preset-react',
          '@babel/preset-flow'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread'
        ]
      }
    }
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    // Alias internal react-native modules to react-native-web
    'react-native/Libraries/Components/View/ViewStylePropTypes$':
      'react-native-web/dist/exports/View/ViewStylePropTypes',
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    'react-native/Libraries/vendor/emitter/EventEmitter$':
      'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
    'react-native/Libraries/vendor/emitter/EventSubscriptionVendor$':
      'react-native-web/dist/vendor/react-native/emitter/EventSubscriptionVendor',
    'react-native/Libraries/EventEmitter/NativeEventEmitter$':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter',

    'react-native-linear-gradient': 'react-native-web-linear-gradient',
    'react-native-maps': 'react-native-web-maps2'
    // app: path.resolve(__dirname, '../app'),
    // containers: path.resolve(__dirname, '../app/containers'),
    // components: path.resolve(__dirname, '../app/components'),
    // images: path.resolve(__dirname, '../app/images'),
    // utils: path.resolve(__dirname, '../app/utils')
  };

  return config;
};
