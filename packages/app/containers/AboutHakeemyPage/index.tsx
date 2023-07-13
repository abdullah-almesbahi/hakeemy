/**
 *
 * AboutHakeemyPage
 *
 */

import React from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from 'utils/injectReducer';
import reducer, { makeSelectAboutHakeemyPage } from './ducks';
import { AboutHakeemyPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
// import Text from '../../components/Text';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import styles from './styles';

import makeGrid from '../../components/Grid';
import AppbarTitle from '../../components/AppbarTitle';
import { Helmet } from '../../components';
import { getSiteName, getMenuRoute } from '../../utils/helper';

const Grid = makeGrid(16); // gutter size

const AboutHakeemyPage = (props: AboutHakeemyPageProps) => {
  // useInjectReducer({ key: 'aboutHakeemyPage', reducer });
  useInjectSaga({ key: 'aboutHakeemyPage', saga });

  return (
    // <SafeAreaView style={styles.container}>
    <>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <AppbarTitle
        title={props.intl.formatMessage(messages.title)}
        goBack={() => props.push(getMenuRoute())}
      />
      <ScrollView style={styles.bodyContainer}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col>
              <View
                style={{
                  minHeight: 300,
                  paddingTop: 30,
                  alignItems: 'flex-start'
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 30,
                    textAlign: 'left'
                  }}
                >
                  <FormattedMessage {...messages.aboutHakeemy} />
                </Text>
              </View>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </ScrollView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  aboutHakeemyPage: makeSelectAboutHakeemyPage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(AboutHakeemyPage);
