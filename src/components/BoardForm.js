import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";

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
`;

const Button = styled.button`
  background: #9933ff;
  color: white;
  font-size: 1em;
  margin-bottom: 1em;
  padding: 0.7em 1em;
  border: 2px solid;
  border-radius: 7px;
  width: 30%;
  &:hover {
    background: white;
    color: #9933ff;
  }
`;

const Form = styled.div`
  margin: 2% 0 0 10%;
  display: flex;
  flex-direction: column;
`;

const TextField = styled.input`
  width: 60%;
  margin-bottom: 2%;
  padding: 1%;
`;

export default function BoardForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const CREATE_BOARD = gql`
    mutation addBoard($title: String!, $description: String) {
      addBoard(title: $title, description: $description) {
        title
        description
      }
    }
  `;

  const _confirm = (data) => {
    console.log(data);
    props.setShowForm(!props.setShowForm);
    props.refetch();
  };

  return (
    <Popup>
      <Container>
        <Form>
          <h4>Create your board</h4>
          <TextField
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a title to the board"
          />
          <TextField
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a short description"
          />
          <Mutation
            mutation={CREATE_BOARD}
            variables={{ title, description }}
            onCompleted={(data) => _confirm(data)}
          >
            {(mutation) => (
              <Button onClick={mutation} style={{ width: "30%" }}>
                Submit
              </Button>
            )}
          </Mutation>
        </Form>
      </Container>
    </Popup>
  );
}
