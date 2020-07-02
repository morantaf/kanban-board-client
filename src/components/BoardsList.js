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

const Board = styled.div`
  height: 80px;
  padding: 0;
  transform: translate(0);
  color: white;
  font-weight: bold;
`;

const Boards = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  &:link {
    background-color: #9966ff;
    color: white;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 0 2% 2% 0;
    border-radius: 5px;
    max-width: 150px;
  }

  &:hover {
    background-color: black;
  }
`;

const Container = styled.div`
  margin-left: 100px;
  margin-top: 100px;
`;

const StyledButton = styled.button`
  background-color: rgba(9, 30, 66, 0.04);
  color: black;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0 2% 2% 0;
  border-radius: 5px;
  border: none;
  width: 175px;
`;

function BoardsList() {
  return (
    <Container>
      <h2>Personal Boards</h2>
      <Boards>
        <Query query={BOARDS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);
              return <p>Must authenticate</p>;
            }
            return data.boards.map((board) => (
              <StyledLink to={`/board/${board.id}`}>
                <Board>{board.title}</Board>
              </StyledLink>
            ));
          }}
        </Query>
        <StyledButton>Create a board</StyledButton>
      </Boards>
    </Container>
  );
}

export default BoardsList;
