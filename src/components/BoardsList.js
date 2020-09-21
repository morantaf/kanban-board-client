import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Link } from "react-router-dom";
import BoardForm from "./BoardForm";
import { useParams } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ErrorMessage from "./ErrorMessage";

const BOARDS_QUERY = gql`
  query Boards($userId: Int!) {
    boards(userId: $userId) {
      id
      title
      description
    }
  }
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

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  height: 5em;
  width: 5em;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
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

  if (loading)
    return (
      <Rotate>
        <LoadingIcon />
      </Rotate>
    );
  if (error) {
    const message = error.message.split(": ")[1];

    return <ErrorMessage message={message} />;
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
