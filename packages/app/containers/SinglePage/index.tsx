/**
 *
 * SinglePage
 *
 */
import 'react-native-get-random-values';

import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

// import { graphql, Query } from 'react-apollo';
// import { SinglePageGraphQl } from './graphql';

// import { Appbar } from 'react-native-paper';
// import { DrawerContext } from '../../hooks/useDrawerContext';
import Helmet from '../../components/Helmet';

// application
// import PageHeader from '../../components/PageHeader';

import styles from './styles';
import { SinglePageProps } from './types';
import { push } from 'connected-react-router';
import LoadingIndicator from '../../components/LoadingIndicator';
import NotFound from '../NotFoundPage';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { SITE_NAME } from '../../utils/constants';
import { getTranslator } from '../../components/Translator';
import makeGrid from '../../components/Grid';
import AppbarTitle from '../../components/AppbarTitle';
import { Platform } from '../../components/Platform';
import { WebView } from 'react-native-webview';
import SafeAreaView from 'react-native-safe-area-view';
import { getMenuRoute } from '../../utils/helper';

const Grid = makeGrid(16); // gutter size

export const QuerySinglePage = gql`
  query QuerySinglePage($where: PageWhereInput) {
    pages(where: $where) {
      id
      title
      title_ar
      content
      content_ar
      slug
    }
  }
`;

const SinglePage: React.SFC<SinglePageProps> = props => {
  const { data, loading, error } = useQuery(QuerySinglePage, {
    variables: {
      // where: props.match.params.slug
      where: {
        OR: [
          { slug: props.match.params.slug },
          { slug_ar: props.match.params.slug }
        ]
      }
    }
  });
  // const openDrawer = React.useContext(DrawerContext);

  if (loading) return <LoadingIndicator />;
  // if (error)
  //   return `${<FormattedMessage {...messages.error} />}
  // ${error}`;
  // console.log('data', data);
  if (data == undefined || data.pages.length === null) return <NotFound />;

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={SITE_NAME}
        title={getTranslator('title', data.pages[0], '_ar')}
      />
      <AppbarTitle
        title={getTranslator('title', data.pages[0], '_ar')}
        goBack={() => props.push(getMenuRoute())}
      />
      <Grid.Container>
        <Grid.Row style={{ margin: 0, padding: 0 }}>
          <Grid.Col style={{ padding: 0 }}>
            {Platform.OS === 'web' ? (
              <View style={{ padding: 5 }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getTranslator('content', data.pages[0], '_ar')
                  }}
                />
              </View>
            ) : (
              <SafeAreaView
                style={{ flex: 1 }}
                forceInset={{ bottom: 'always' }}
              >
                <WebView
                  originWhitelist={['*']}
                  source={{
                    html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${getTranslator(
                      'content',
                      data.pages[0],
                      '_ar'
                    )}</body></html>`
                  }}
                />
              </SafeAreaView>
            )}
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </View>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    push: (page: string) => dispatch(push(page))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(SinglePage);
