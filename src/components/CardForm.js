import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FaPlus } from "react-icons/fa";

const ADD_CARD = gql`
  mutation addCard($title: String!, $listId: Int!) {
    addCard(title: $title, listId: $listId) {
      title
    }
  }
`;

const TitleForm = styled.p`
  margin-left: 4%;
  color: #8c8c8c;
  cursor: pointer;
`;

const Form = styled.div`
  margin-left: 4%;
  margin-bottom: 4%;
`;

const TextField = styled.input`
  padding-top: 10px;
  padding-right: 2px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-bottom: 15px;
  width: 90%;
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

export default function CardForm(props) {
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  const listId = props.listId;
  const _confirm = (data) => {
    setTitle("");
    setShowForm(!showForm);
    props.refetch();
  };

  return (
    <div>
      <TitleForm onClick={() => setShowForm(!showForm)}>
        {" "}
        <FaPlus /> Add a card
      </TitleForm>
      {showForm ? (
        <Form>
          <TextField
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a title to the card"
          />
          <Mutation
            mutation={ADD_CARD}
            variables={{ title, listId }}
            onCompleted={(data) => _confirm(data)}
          >
            {(mutation) => (
              <StyledButton onClick={mutation}>Add the card</StyledButton>
            )}
          </Mutation>
        </Form>
      ) : null}
    </div>
  );
}
