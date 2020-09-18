import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: 4px;
  height: 34px;
  width: 272px;
`;

const Content = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  white-space: normal;
`;

const TextField = styled.input`
  padding-top: 10px;
  padding-right: 2px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-bottom: 15px;
  width: 94%;
`;

const Text = styled.p`
  margin-left: 4%;
`;

const StyledButton = styled.button`
  background-color: #5aac44;
  box-shadow: none;
  border: none;
  color: #fff;
  padding: 6px 10px 6px 10px;
  border-radius: 5px;
  margin-left: 2%;
  margin-bottom: 2%;
`;

const ADD_LIST = gql`
  mutation addList($name: String!, $boardId: Int!) {
    addList(name: $name, boardId: $boardId) {
      name
    }
  }
`;

export default function ListForm(props) {
  const [name, setName] = useState("");
  const boardId = parseInt(props.boardId);
  const [showForm, setShowForm] = useState(false);

  const _confirm = (data) => {
    console.log(data);
    props.refetch();
    setName("");
    setShowForm(!showForm);
  };
  return (
    <Wrapper>
      <Content>
        <Text onClick={() => setShowForm(!showForm)}>Add a list</Text>
        {showForm ? (
          <div>
            <TextField
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Title"
            />
            <Mutation
              mutation={ADD_LIST}
              variables={{ name, boardId }}
              onCompleted={(data) => _confirm(data)}
            >
              {(mutation) => (
                <StyledButton onClick={mutation}>Add the list</StyledButton>
              )}
            </Mutation>
          </div>
        ) : null}
      </Content>
    </Wrapper>
  );
}
