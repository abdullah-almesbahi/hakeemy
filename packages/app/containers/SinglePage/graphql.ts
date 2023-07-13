import gql from 'graphql-tag';

export const SinglePageGraphQl = gql`
  query SinglePageGraphQl($where: PageWhereUniqueInput!) {
    page(where: $where) {
      id
      title
      content
      slug
    }
  }
`;
