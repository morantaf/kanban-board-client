import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_CARD = gql`
  mutation addCard($title: String!, $listId: Int!) {
    addCard(title: $title, listId: $listId) {
      title
    }
  }
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
      <p onClick={() => setShowForm(!showForm)}> Add a card</p>
      {showForm ? (
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a title to the list"
          />
          <Mutation
            mutation={ADD_CARD}
            variables={{ title, listId }}
            onCompleted={(data) => _confirm(data)}
          >
            {(mutation) => <button onClick={mutation}>Add the card</button>}
          </Mutation>
        </div>
      ) : null}
    </div>
  );
}
