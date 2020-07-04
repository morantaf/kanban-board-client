import React from "react";
import styled from "styled-components";
import { Mutation, useQuery } from "react-apollo";
import gql from "graphql-tag";
import Card from "./Card";
import CardForm from "./CardForm";
import { MdDelete } from "react-icons/md";

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

const StyledIcon = styled(MdDelete)`
  position: absolute;
  right: 5px;
  cursor: pointer;
`;

const GET_CARDS = gql`
  query cardsByList($listId: Int!) {
    cardsByList(listId: $listId) {
      id
      title
      description
      status
    }
  }
`;

const DELETE_LIST = gql`
  mutation deleteList($id: Int!) {
    deleteList(id: $id) {
      deleted
    }
  }
`;

function List(props) {
  const id = props.id;
  const { data, loading, error, refetch } = useQuery(GET_CARDS, {
    variables: { listId: id },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const cards = data.cardsByList;

  const _deleted = () => {
    props.refetch();
  };

  return (
    <Wrapper>
      <Content>
        <div>
          <BoldText>
            {props.name}
            <Mutation
              mutation={DELETE_LIST}
              variables={{ id }}
              ignoreResults={true}
              onCompleted={() => _deleted()}
            >
              {(mutation) => <StyledIcon onClick={mutation} />}
            </Mutation>
          </BoldText>
        </div>

        <CardWrapper>
          {cards.map((card) => {
            return (
              <Card
                title={card.title}
                id={card.id}
                GET_CARDS={GET_CARDS}
                refetch={refetch}
              />
            );
          })}
        </CardWrapper>
        <CardForm listId={props.id} refetch={refetch} />
      </Content>
    </Wrapper>
  );
}

export default List;
