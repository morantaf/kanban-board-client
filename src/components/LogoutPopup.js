import React from "react";
import styled from "styled-components";
import { deleteTokens } from "../manage-tokens";
import { Redirect } from "react-router";

const Popup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  border: solid 1px;
  border-radius: 5px;
  width: 300px;
  position: absolute;
  left: 25%;
  right: 25%;
  top: 8%;
  margin: auto;
  background-color: white;
  text-align-last: center;
`;

const StyledButton = styled.button`
  background: #ff0854;
  color: white;
  font-size: 1em;
  margin-bottom: 1em;
  padding: 0.7em 1em;
  border: 2px solid;
  border-radius: 7px;
  cursor: pointer;
  width: 30%;
  &:hover {
    background: white;
    color: #ff0854;
  }
`;

function LogoutPopup({ setShowPopup }) {
  const logout = () => {
    deleteTokens();
    setShowPopup(false);
    return <Redirect to="/" />;
  };
  return (
    <Popup>
      <Container>
        <h4>Do you want to logout ?</h4>
        <StyledButton onClick={logout}>YES</StyledButton>
        <StyledButton onClick={() => setShowPopup(false)}>NO</StyledButton>
      </Container>
    </Popup>
  );
}

export default LogoutPopup;
