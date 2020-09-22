import React, { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import lockIcon from "../img/icons8-security-lock-50.png";
import mailIcon from "../img/icons8-new-post-50.png";
import nameIcon from "../img/icons8-contact-50.png";
import userIcon from "../img/icons8-user-50.png";

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

const TextField = styled.input.attrs((props) => ({
  icon: props.icon || "",
}))`
  border: none;
  border-bottom: 2px solid #b3b3b3;
  background-image: url("${(props) => props.icon}");
  background-size: 4%;
  background-position: 2px 10px;
  background-repeat: no-repeat;
  padding-top: 10px;
  padding-right: 2px;
  padding-bottom: 10px;
  padding-left: 25px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 0.9em;
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
  const [signedUp, setsignedUp] = useState(false);

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
              setsignedUp(true);
            }}
          >
            {signedUp ? (
              <>
                <Title>Thank you for signing up</Title>
                <StyledLink to="/login">Go to log in</StyledLink>
              </>
            ) : (
              <>
                <Title>Create an account</Title>
                <Label>E-mail</Label>
                <TextField
                  type="text"
                  value={email}
                  name="email"
                  placeholder="Type your e-mail address"
                  onChange={(event) => setEmail(event.target.value)}
                  icon={mailIcon}
                />
                <Label>First name</Label>
                <TextField
                  type="text"
                  value={firstName}
                  name="firstName"
                  placeholder="Type your first name"
                  onChange={(event) => setFirstName(event.target.value)}
                  icon={nameIcon}
                />
                <Label>Last name</Label>
                <TextField
                  type="text"
                  value={lastName}
                  name="lastName"
                  placeholder="Type your last Name"
                  onChange={(event) => setLastName(event.target.value)}
                  icon={nameIcon}
                />
                <Label>Username</Label>
                <TextField
                  type="text"
                  value={username}
                  name="username"
                  placeholder="Type your username"
                  onChange={(event) => setUsername(event.target.value)}
                  icon={userIcon}
                />
                <Label>Password</Label>
                <TextField
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Enter a password"
                  onChange={(event) => setPassword(event.target.value)}
                  icon={lockIcon}
                />
                <Button type="submit">Sign up</Button>
                <StyledLink to="/login">
                  Already have an account ? Please log in
                </StyledLink>
              </>
            )}
          </Form>
        </div>
      )}
    </Mutation>
  );
}
