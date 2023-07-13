/**
 *
 * ViewPostsPage
 *
 */

import React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ViewPostPageProps } from './types';
import { push } from 'connected-react-router';

// QraphQl
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// Components
import { Appbar, Surface, List } from 'react-native-paper';
import NotFoundPage from '../NotFoundPage';
import makeGrid from '../../components/Grid';
import { View, Text, ScrollView } from 'react-native';
import Helmet from '../../components/Helmet';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppbarTitle from '../../components/AppbarTitle';

import styles from './styles';
import { SITE_NAME } from '../../utils/constants';
import { ROUTE_BLOG_POST } from '../../utils/constants';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';
import { Image } from 'react-native';
import { indigo } from '@material-ui/core/colors';
import { Platform } from '../../components/Platform';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const Grid = makeGrid(16); // gutter size

export const QueryViewPost = gql`
  query QueryViewPost($where: BlogPostWhereUniqueInput!) {
    blogPost(where: $where) {
      id
      postTitle
      status
      postContent
      images {
        id
        isDefault
        pic
      }
      blogId {
        id
      }
    }
  }
`;

const ViewPostPage: React.SFC<ViewPostPageProps> = props => {
  const { data, loading, error } = useQuery(QueryViewPost, {
    variables: {
      where: {
        id: parseFloat(props.match.params.id)
      }
    }
  });

  const header = title => (
    <AppbarTitle
      title={title}
      goBack={() =>
        props.push(getLocalizeRoute(ROUTE_BLOG_POST + data.blogPost.blogId.id))
      }
    />
  );

  if (loading)
    return (
      <>
        {header(props.intl.formatMessage(messages.loading))}
        <LoadingIndicator />
      </>
    );
  if (data == undefined || data.blogPost === null) return <NotFoundPage />;

  // data.images..filter(img => img.isDefault == 1)
  // console.log('xxx', data);

  return (
    <View style={styles.container}>
      <Helmet titleTemplate={getSiteName()} title={data.blogPost.postTitle} />
      {header(data.blogPost.postTitle)}
      {/* <ScrollView> */}
      <Grid.Container>
        <Grid.Row style={{ margin: 0, padding: 0 }}>
          <Grid.Col style={{ padding: 0, borderWidth: 1, borderColor: 'blue' }}>
            {data.blogPost.images
              .filter(img => img.isDefault == '1')
              .map(img => (
                <Image
                  key={img.id}
                  style={{
                    width: '100%',
                    minHeight: 200
                  }}
                  source={{
                    uri: `https://old.hakeemy.com/uploads/post_images/${
                      img.pic
                    }`
                  }}
                />
              ))}
            <View style={{ flexDirection: 'row' }}>
              {data.blogPost.images
                .filter(img => img.isDefault != '1')
                .map(img => (
                  <Image
                    key={img.id}
                    style={{
                      width: 150,
                      minHeight: 150
                    }}
                    source={{
                      uri: `https://old.hakeemy.com/uploads/post_images/${
                        img.pic
                      }`
                    }}
                  />
                ))}
            </View>

            {Platform.OS === 'web' ? (
              <View style={{ padding: 5, marginTop: 20 }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.blogPost.postContent
                  }}
                />
              </View>
            ) : (
              // <SafeAreaView
              //   style={{ flex: 1, marginTop: 20 }}
              //   forceInset={{ bottom: 'always' }}
              // >
              // <View
              //   style={{
              //     borderWidth: 1,
              //     borderColor: 'red',
              //     flex: 1,
              //     paddingBottom: 20
              //     // minHeight: 200
              //   }}
              // >
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${
                    data.blogPost.postContent
                  }</body></html>`
                }}
              />
              // </View>

              // </SafeAreaView>
            )}
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
      {/* </ScrollView> */}
    </View>
  );
};

function mapDispatchToProps(dispatch) {
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
  injectIntl
)(ViewPostPage);
