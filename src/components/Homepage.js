import React from "react";
import image from "../img/3594607.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTokens } from "../manage-tokens";

const StyledImage = styled.img`
  height: 450px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8%;
  padding: 0 5%;
`;

const Body = styled.div`
  margin: 2%;
  color: #375b65;
`;

const Title = styled.h1`
  font-size: 5em;
  margin: 0;
`;

const StyledLink = styled(Link)`
  margin-top: 50px;
  text-decoration: none;
  font-size: 1em;
  font-weight: bold;
  background: #ff0854;
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Homepage() {
  return (
    <div>
      <Container>
        <Body>
          <Title>Organize your tasks, work faster</Title>
          <h2>The agile solution to improve your productivity</h2>
          <StyledLink to="/login">Go to your board</StyledLink>
        </Body>
        <Body>
          <StyledImage src={image} />
        </Body>
      </Container>
    </div>
  );
}
