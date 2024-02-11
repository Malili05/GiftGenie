// queries.js

import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query GetUser {
    user {
      _id
      username
      savedGifts {
        _id
        name
        description
        image
        price
        buyUrl
      }
    }
  }
`;

export const GET_GIFTS_QUERY = gql`
  query GetGifts($keywords: [String]) {
    gifts(keywords: $keywords) {
      _id
      name
      description
      image
      price
      buyUrl
    }
  }
`;
