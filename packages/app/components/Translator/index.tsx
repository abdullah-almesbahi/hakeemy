// react
import React from 'react';
import { connect } from 'react-redux';
import { LanguageOption } from '../../containers/LanguagePage/types';
import { I18nManager } from 'react-native';

interface TranslatorProps {
  data: any;
  _key: string;
  language: LanguageOption;
}

// const getTranslator : React.SFC<TranslatorProps> = props => {
//   const { _key, data, language } = props;

//   let finalValue =
//     language === 'ar' && data[_key + '_ar'] != '' && data[_key + '_ar'] != null
//       ? data[_key + '_ar']
//       : data[_key];

//   return <React.Fragment>{finalValue}</React.Fragment>;
// };

export const getTranslator = (_key: string, data: any, arabic_key) => {
  return I18nManager.isRTL &&
    data[_key + arabic_key] != '' &&
    data[_key + arabic_key] != null
    ? data[_key + arabic_key]
    : data[_key];
};

const Translator: React.SFC<TranslatorProps> = props => {
  const { _key, data, language } = props;

  let finalValue = getTranslator(_key, data, language);

  // return <React.Fragment>{finalValue}</React.Fragment>;
  return finalValue;
};

const mapStateToProps = (state: any) => ({
  language: state.language.locale
});

export default connect(mapStateToProps)(Translator);
