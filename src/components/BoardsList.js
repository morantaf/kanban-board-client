import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
const BOARDS_QUERY = gql`
  {
    boards {
      id
      title
      description
    }
  }
`;

const Board = styled.a`
  height: 80px;
  width: 167px;
  background-color: cornflowerblue;
`;

const Boards = styled.div`
  display: flex;
`;

function BoardsList() {
  return (
    <div>
      <Query query={BOARDS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error);
            return <p>Must authenticate</p>;
          }
          return data.boards.map((board) => (
            <Board href={`/board/${board.id}`}>
              <h2>{board.title}</h2>
            </Board>
          ));
        }}
      </Query>
    </div>
  );
}

export default BoardsList;
