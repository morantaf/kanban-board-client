import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query, useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import List from "./List";
import ListForm from "./ListForm";

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
  background-color: #9933ff;
  height: 94.7vh;
`;

export default function Board() {
  const params = useParams();
  const boardId = parseInt(params.id);

  const { refetch } = useQuery(GET_LISTS, { variables: { boardId } });
  const { data, loading } = useQuery(GET_BOARD_NAME, {
    variables: { boardId },
  });

  const boardName = data ? data.board.title : null;

  return (
    <Page>
      <Header>
        <Title>{boardName}</Title>
      </Header>
      <Div>
        <Query query={GET_LISTS} variables={{ boardId }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);
              return <p>{error.message}</p>;
            }
            return data.listsByBoard.map((list) => (
              <List name={list.name} id={list.id} />
            ));
          }}
        </Query>
        <ListForm refetch={refetch} boardId={boardId} />
      </Div>
    </Page>
  );
}
