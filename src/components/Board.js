import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query, useQuery, useMutation } from "react-apollo";
import { useParams } from "react-router-dom";
import List from "./List";
import ListForm from "./ListForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { FaTimes } from "react-icons/fa";
import DeleteForm from "./DeleteForm";

const GET_LISTS = gql`
  query ListsByBoard($boardId: Int!) {
    listsByBoard(boardId: $boardId) {
      name
      id
    }
  }
`;

const Delete = styled.button`
  background-color: hsla(0, 0%, 100%, 0.24);
  display: flex;
  position: absolute;
  top: 50px;
  right: 50px;
  white-space: normal;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  margin-top: 10px;
  height: 34px;
  width: 150px;
  align-items: center;
  place-content: center;
  border: 0px;
`;

const GET_BOARD_NAME = gql`
  query boardName($boardId: Int!) {
    board(id: $boardId) {
      title
    }
  }
`;

const ErrorBox = styled.form`
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

const ErrorMessage = styled.h2`
  align-self: center;
`;

const UPDATE_LISTS_POSITION = gql`
  mutation updateListsPositions($updatedLists: [ListInput]) {
    updateListsPositions(updatedLists: $updatedLists) {
      id
    }
  }
`;

const Div = styled.div`
  display: flex;
  height: 90%;
`;

const Header = styled.div``;

const Title = styled.h3`
  margin: 0;
  padding: 15px 0 15px 0;
  color: white;
  margin-left: 3%;
`;

const Page = styled.div`
  background-color: #9900cc;
  height: 94.7vh;
`;

export default function Board() {
  const params = useParams();
  const boardId = parseInt(params.id);
  const [lists, setLists] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_LISTS, {
    variables: { boardId },
  });

  const [updateListPosition] = useMutation(UPDATE_LISTS_POSITION);

  useEffect(() => {
    if (data) {
      setLists(data.listsByBoard);
    }
  }, [data]);

  const moveList = async (dragIndex, hoverIndex) => {
    try {
      const draggedImage = lists[dragIndex];

      const updatedLists = update(lists, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      });

      setLists(updatedLists);
    } catch (e) {
      console.error(e);
    }
  };

  const updateList = async () => {
    const updatedPositionsList = lists.map((object, index) => ({
      id: object.id,
      name: object.name,
      position: index,
    }));

    updateListPosition({
      variables: { updatedLists: updatedPositionsList },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    const message = error.message.split(":");
    console.log(error);
    return (
      <ErrorBox>
        <ErrorMessage>{message[1]}</ErrorMessage>
      </ErrorBox>
    );
  }

  return (
    <Page>
      <Header>
        <Query query={GET_BOARD_NAME} variables={{ boardId }}>
          {({ data }) => {
            return <Title>{data ? data.board.title : null}</Title>;
          }}
        </Query>
        <Delete onClick={() => setShowForm(true)}>
          <FaTimes />
          <p>Delete board</p>
        </Delete>
      </Header>
      <DndProvider backend={HTML5Backend}>
        <Div>
          {lists.map((list, index) => (
            <List
              name={list.name}
              id={list.id}
              listRefetch={refetch}
              index={index}
              moveList={moveList}
              updateList={updateList}
            />
          ))}
          <ListForm refetch={refetch} boardId={boardId} />
        </Div>
      </DndProvider>
      {showForm ? (
        <DeleteForm setShowForm={setShowForm} boardId={boardId} />
      ) : null}
    </Page>
  );
}
