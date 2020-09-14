import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Bar = styled.div`
  background-color: #375b65;
  height: 50px;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
`;

const Nav = styled.div``;

const TitleWrapper = styled.div`
  flex-grow: 2;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  color: #fff;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 10px;
  font-weight: bold;
  &:hover {
    background-color: #2d4a52;
  }
`;

export default function AppBar() {
  return (
    <Bar>
      <TitleWrapper>
        <Title>OrgaFlow</Title>
      </TitleWrapper>
      <Nav>
        <StyledLink to="/login">LOGIN</StyledLink>
        <StyledLink to="/signup">SIGNUP</StyledLink>
      </Nav>
    </Bar>
  );
}
