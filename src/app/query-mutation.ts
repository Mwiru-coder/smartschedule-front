import { gql } from 'apollo-angular';

// Login Mutation
export const LOGIN_USER = gql`
  mutation TokenAuth($registrationNo: String!, $password: String!) {
    tokenAuth(registrationNo: $registrationNo, password: $password) {
      token
    }
  }
`;

// Registration Mutation
export const REGISTER_USER = gql`
  mutation RegisterUser(
    $registrationNo: String!,
    $email: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!
  ) {
    registerUser(
      registrationNo: $registrationNo,
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName
    ) {
      instructor {
        registrationNo
        email
      }
    }
  }
`;
