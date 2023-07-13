/**
 *
 * BlogPage
 *
 */

import React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BlogPageProps } from './types';
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

import styles from './styles';
import AppbarTitle from '../../components/AppbarTitle';
import { SITE_NAME } from '../../utils/constants';
import {
  getMenuRoute,
  getSiteName,
  getLocalizeRoute
} from '../../utils/helper';
import { ROUTE_BLOG_POST } from '../../utils/constants';

const Grid = makeGrid(16); // gutter size

export const QueryBlog = gql`
  query QueryBlog($where: BlogWhereInput) {
    blogs(where: $where) {
      id
      bannerImage
      name
      hospitalId {
        id
        hospital
        hospitalArabic
      }
      status
    }
  }
`;

const BlogPage: React.SFC<BlogPageProps> = props => {
  const { data, loading, error } = useQuery(QueryBlog, {
    variables: {
      where: {
        status: 1
      }
    }
  });

  const header = () => (
    <AppbarTitle
      title={props.intl.formatMessage(messages.blog)}
      goBack={() => props.push(getMenuRoute())}
    />
  );

  if (loading)
    return (
      <>
        {header()}
        <LoadingIndicator />
      </>
    );
  if (data == undefined || data.blogs.length === null) return <NotFoundPage />;
  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.blog)}
      />
      {header()}
      <ScrollView>
        <Grid.Container>
          <Grid.Row style={{ margin: 0, padding: 0 }}>
            <Grid.Col style={{ padding: 0 }}>
              {data.blogs.map(blog => (
                <Surface key={blog.id} style={styles.surfaceContainer}>
                  <List.Item
                    title={blog.name}
                    description={() => (
                      <View>
                        <Text>
                          {props.intl.formatMessage(messages.author)} :
                          {blog.hospitalId != null
                            ? blog.hospitalId.hospital
                            : props.intl.formatMessage(messages.hakeemy)}
                        </Text>
                      </View>
                    )}
                    onPress={() => {
                      props.push(getLocalizeRoute(ROUTE_BLOG_POST + blog.id));
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
)(BlogPage);
