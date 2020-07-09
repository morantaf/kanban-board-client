import React, { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

//Creation of Styled components

const Form = styled.form`
  padding: 4em;
  max-width: 400px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.2);
`;

const TextField = styled.input`
  padding-top: 10px;
  padding-right: 2px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background: #9933ff;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.7em 1em;
  border: 2px solid;
  border-radius: 7px;
  width: 30%;
  align-self: center;
  &:hover {
    background: white;
    color: #9933ff;
  }
`;

const Title = styled.h2`
  align-self: center;
`;

const StyledLink = styled(Link)`
  align-self: center;
`;

const SIGNUP_USER = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $username: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      username: $username
    ) {
      firstName
      lastName
    }
  }
`;

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  return (
    <Mutation
      mutation={SIGNUP_USER}
      variables={{ email, password, firstName, lastName, username }}
    >
      {(signup) => (
        <div>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              signup();
            }}
          >
            <Title>Create an account</Title>
            <TextField
              type="text"
              value={email}
              name="email"
              placeholder="E-mail address"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              type="text"
              value={firstName}
              name="firstName"
              placeholder="First name"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              type="text"
              value={lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={(event) => setLastName(event.target.value)}
            />
            <TextField
              type="text"
              value={username}
              name="username"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              type="password"
              value={password}
              name="password"
              placeholder="Enter a password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit">Sign up</Button>
            <StyledLink to="/login">
              Already have an account ? Please log in
            </StyledLink>
          </Form>
        </div>
      )}
    </Mutation>
  );
}
