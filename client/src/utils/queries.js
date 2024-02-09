import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
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