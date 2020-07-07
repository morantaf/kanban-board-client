import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query, useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import List from "./List";
import ListForm from "./ListForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const GET_LISTS = gql`
  query ListsByBoard($boardId: Int!) {
    listsByBoard(boardId: $boardId) {
      name
      id
    }
  }
`;

const GET_BOARD_NAME = gql`
  query boardName($boardId: Int!) {
    board(id: $boardId) {
      title
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

  const { data, loading, error, refetch } = useQuery(GET_LISTS, {
    variables: { boardId },
  });

  useEffect(() => {
    if (data) {
      setLists(data.listsByBoard);
    }
  }, [data]);

  const moveList = (dragIndex, hoverIndex) => {
    const draggedImage = lists[dragIndex];

    const updatedLists = update(lists, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedImage],
      ],
    });

    setLists(updatedLists);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>{error.message}</p>;
  }

  return (
    <Page>
      <Header>
        <Query query={GET_BOARD_NAME} variables={{ boardId }}>
          {({ data }) => {
            return <Title>{data ? data.board.title : null}</Title>;
          }}
        </Query>
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
            />
          ))}
          <ListForm refetch={refetch} boardId={boardId} />
        </Div>
      </DndProvider>
    </Page>
  );
}
