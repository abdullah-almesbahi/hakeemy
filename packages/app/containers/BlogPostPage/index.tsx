/**
 *
 * BlogPostPage
 *
 */

import React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BlogPostPageProps } from './types';
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
import { ROUTE_BLOG, ROUTE_VIEW_POST } from '../../utils/constants';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';

const Grid = makeGrid(16); // gutter size

export const QueryBlogPost = gql`
  query QueryBlogPost($where: BlogPostWhereInput) {
    blogPosts(where: $where) {
      id
      postTitle
      status
    }
  }
`;

const BlogPostPage: React.SFC<BlogPostPageProps> = props => {
  const { data, loading, error } = useQuery(QueryBlogPost, {
    variables: {
      where: {
        status: 1,
        blogId: {
          id: parseFloat(props.match.params.id)
        }
      }
    }
  });

  const header = () => (
    <AppbarTitle
      title={props.intl.formatMessage(messages.posts)}
      goBack={() => props.push(getLocalizeRoute(ROUTE_BLOG))}
    />
  );

  if (loading)
    return (
      <>
        {header()}
        <LoadingIndicator />
      </>
    );
  if (data == undefined || data.blogPosts.length === null)
    return <NotFoundPage />;

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.posts)}
      />
      {header()}
      <ScrollView>
        <Grid.Container>
          <Grid.Row style={{ margin: 0, padding: 0 }}>
            <Grid.Col style={{ padding: 0 }}>
              {data.blogPosts.map(post => (
                <Surface key={post.id} style={styles.surfaceContainer}>
                  <List.Item
                    title={post.postTitle}
                    onPress={() => {
                      props.push(getLocalizeRoute(ROUTE_VIEW_POST + post.id));
                    }}
                  />
                </Surface>
              ))}
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </ScrollView>
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
)(BlogPostPage);
