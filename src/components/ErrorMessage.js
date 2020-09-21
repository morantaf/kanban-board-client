import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.form`
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

const Message = styled.h2`
  align-self: center;
`;

export default function ErrorMessage({ message }) {
  const login = message.split(" ").filter((word) => word === "login");

  return (
    <Container>
      <Message>{message}</Message>
      {login.length === 1 ? (
        <Link to="/login">Go to the login page</Link>
      ) : null}
    </Container>
  );
}
