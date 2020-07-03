import React from "react";
import styled from "styled-components";
import { Query, useQuery } from "react-apollo";
import gql from "graphql-tag";
import Card from "./Card";

const Wrapper = styled.div`
  margin: 10px 4px;
  width: 272px;
  height: 100%;
`;

const Content = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`;

const CardWrapper = styled.div`
  flex: 1 1 auto;
  margin-bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
`;

const BoldText = styled.p`
  font-weight: bold;
  margin-left: 4%;
`;

const GET_CARDS = gql`
  query cardsByList($listId: Int!) {
    cardsByList(listId: $listId) {
      title
      description
      status
    }
  }
`;

function List(props) {
  const { data, loading, error } = useQuery(GET_CARDS, {
    variables: { listId: props.id },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const cards = data.cardsByList;

  console.log(cards);
  return (
    <Wrapper>
      <Content>
        <BoldText>{props.name}</BoldText>
        <CardWrapper>
          {cards.map((card) => {
            return <Card title={card.title} />;
          })}
        </CardWrapper>
      </Content>
    </Wrapper>
  );
}

export default List;
