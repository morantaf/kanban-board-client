import React, { useState } from "react";
import gql from "graphql-tag";
import styled, { keyframes } from "styled-components";
import { saveTokens } from "../manage-tokens";
import { Mutation } from "react-apollo";
import { Redirect, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import lockIcon from "../img/icons8-security-lock-50.png";
import mailIcon from "../img/icons8-new-post-50.png";

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

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  height: 5em;
  width: 5em;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
`;

const TextField = styled.input.attrs((props) => ({
  icon: props.icon || "",
}))`
  border: none;
  border-bottom: 1px solid;
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
  font-weight: bold;
  cursor: pointer;
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

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      userId
    }
  }
`;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);

  const _confirm = async (data) => {
    if (data && data.login) {
      saveTokens(data.login);
      setloggedIn(true);
    }
  };

  return (
    <Mutation
      mutation={LOGIN_USER}
      variables={{ email, password }}
      onCompleted={(data) => _confirm(data)}
    >
      {(login, { data, loading }) => (
        <div>
          {loading ? (
            <Rotate>
              <LoadingIcon />
            </Rotate>
          ) : loggedIn ? (
            <Redirect to={`b/${data.login.userId}`} />
          ) : (
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                login();
                return <h1>blabla</h1>;
              }}
            >
              <Title>SIGN IN</Title>
              <Label>E-mail</Label>
              <TextField
                type="text"
                value={email}
                name="email"
                placeholder="Type your e-mail address"
                onChange={(event) => setEmail(event.target.value)}
                icon={mailIcon}
              />
              <Label>Password</Label>
              <TextField
                type="password"
                value={password}
                name="password"
                placeholder="Type your password"
                onChange={(event) => setPassword(event.target.value)}
                icon={lockIcon}
              />
              <Button type="submit">Log in</Button>
              <StyledLink to="/signup">
                Don't have an account ? Please sign up
              </StyledLink>
            </Form>
          )}
        </div>
      )}
    </Mutation>
  );
}
