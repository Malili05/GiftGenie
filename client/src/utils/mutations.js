import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_GIFT = gql`
  mutation saveGift($giftId: ID!) {
    saveGift(giftId: $giftId) {
      _id
      username
      email
      savedGifts {
        _id
        gift {
          _id
          name
        }
        priority
      }
    }
  }
`;

export const DELETE_GIFT = gql`
  mutation deleteGift($giftId: ID!) {
    deleteGift(giftId: $giftId) {
      _id
      username
      email
      savedGifts {
        _id
        gift {
          _id
          name
        }
        priority
      }
    }
  }
`;


export const UPDATE_GIFT_PRIORITY = gql`
  mutation updateGiftPriority($giftId: ID!, $priority: Boolean!) {
    updateGiftPriority(giftId: $giftId, priority: $priority) {
      _id
      savedGifts {
        _id
        gift {
          _id
          name
        }
        priority
      }
    }
  }
`;
