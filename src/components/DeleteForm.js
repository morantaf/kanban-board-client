import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
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
  background: #9933ff;
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
    color: #9933ff;
  }
`;

const DELETE_BOARD = gql`
  mutation deleteList($id: Int!) {
    deleteBoard(id: $id) {
      deleted
    }
  }
`;

export default function DeleteForm({ setShowForm, boardId }) {
  const [validate, setvalidate] = useState(false);

  const _deleted = () => {
    setvalidate(true);
  };
  return (
    <Popup>
      <Container>
        <h4 style={{ marginLeft: "3%" }}>
          Are you sure you want to delete this board ?
        </h4>
        <Mutation
          mutation={DELETE_BOARD}
          variables={{ id: boardId }}
          ignoreResults={true}
          onCompleted={() => _deleted()}
        >
          {(mutation) => <StyledButton onClick={mutation}>Delete</StyledButton>}
        </Mutation>
        <StyledButton onClick={() => setShowForm(false)}>Cancel</StyledButton>
      </Container>
      {validate ? <Redirect to="/" /> : null}
    </Popup>
  );
}
