import { gql } from "@apollo/client";

export const getCardsQuery = gql`
  {
    cards {
      id
      imageUrl
      text
      likes
      favs
      shares
      user {
        username
        fullName
      }
      createdAt
    }
  }
`;

export const addUserMutation = gql`
  mutation($username: String!, $password: String!, $fullName: String!) {
    addUser(username: $username, password: $password, fullName: $fullName) {
      id
    }
  }
`;

export const loginUserMutation = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      fullName
      username
    }
  }
`;

export const addCardMutation = gql`
  mutation($imageUrl: String, $text: String, $userId: ID!) {
    addCard(imageUrl: $imageUrl, text: $text, userId: $userId) {
      id
    }
  }
`;
