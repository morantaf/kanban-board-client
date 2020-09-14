import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Link } from "react-router-dom";
import BoardForm from "./BoardForm";
import { useParams } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

const BOARDS_QUERY = gql`
  query Boards($userId: Int!) {
    boards(userId: $userId) {
      id
      title
      description
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

const StyledTitle = styled.div`
  height: 80px;
  padding: 0;
  transform: translate(0);
  color: white;
  font-weight: bold;
  width: 150px;
`;

const Boards = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  &:link {
    background-color: #ff0854;
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
  cursor: pointer;
`;

function BoardsList() {
  const params = useParams();
  const userId = parseInt(params.id);
  const [showForm, setShowForm] = useState(false);

  const { data, error, loading, refetch } = useQuery(BOARDS_QUERY, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    const message = error.message.split(":");
    const authentication = message[1]
      .split(" ")
      .filter((word) => word.toLowerCase() === "authentication");

    return authentication.length === 1 ? (
      <ErrorBox>
        <ErrorMessage>
          You must login in order to access to your boards
        </ErrorMessage>
        <Link to="/login">Go to the login page</Link>{" "}
      </ErrorBox>
    ) : (
      <ErrorBox>
        <ErrorMessage>{message[1]}</ErrorMessage>
      </ErrorBox>
    );
  }
  return (
    <Container>
      <div>
        <h2>
          <BsPerson /> Personal Boards
        </h2>
      </div>
      <Boards>
        {data.boards.map((board) => (
          <StyledLink key={board.id} to={`/board/${board.id}`}>
            <StyledTitle>{board.title}</StyledTitle>
          </StyledLink>
        ))}
        <StyledButton
          onClick={() => {
            setShowForm(true);
          }}
        >
          Create a board
        </StyledButton>
      </Boards>
      {showForm ? (
        <BoardForm
          setShowForm={setShowForm}
          showForm={showForm}
          refetch={refetch}
        />
      ) : null}
    </Container>
  );
}

export default BoardsList;
