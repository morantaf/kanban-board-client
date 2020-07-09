import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation, useQuery, useMutation } from "react-apollo";
import gql from "graphql-tag";
import Card from "./Card";
import CardForm from "./CardForm";
import { MdDelete } from "react-icons/md";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";

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

const CardsWrapper = styled.div`
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

const UPDATE_CARDS_POSITION = gql`
  mutation updateCardsPositions($updatedCards: [CardInput]) {
    updateCardsPositions(updatedCards: $updatedCards) {
      id
    }
  }
`;

function List({ id, index, listRefetch, name, moveList, updateList }) {
  const type = "List";
  const [cards, setCards] = useState([]);

  const [updateCardPosition] = useMutation(UPDATE_CARDS_POSITION);

  const [{ isOver }, drop] = useDrop({
    // Accept will make sure only these element type can be droppable on this element
    accept: type,
    hover(item) {
      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveList(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop() {
      updateList();
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [, drag] = useDrag({
    item: { type: type, id, index },
  });

  const { data, loading, error, refetch } = useQuery(GET_CARDS, {
    variables: { listId: id },
  });

  useEffect(() => {
    if (data) {
      setCards(data.cardsByList);
    }
  }, [data]);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = cards[dragIndex];

    const updatedCards = update(cards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedCard],
      ],
    });

    setCards(updatedCards);
  };

  const updateCard = async () => {
    const updatedPositionsCard = cards.map((object, index) => ({
      id: object.id,
      position: index,
    }));

    updateCardPosition({
      variables: { updatedCards: updatedPositionsCard },
    });
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const _deleted = () => {
    listRefetch();
  };

  return (
    <Wrapper ref={drop}>
      <Content ref={drag}>
        <div>
          <BoldText>
            {name}
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

        <CardsWrapper>
          {isOver && (
            <div
              style={{
                position: "absolute",
                borderStyle: "dashed",
                borderWidth: "1px",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: 1,
                opacity: 1,
                backgroundColor: "#8600b3",
              }}
            />
          )}
          {cards.map((card, index) => {
            return (
              <Card
                title={card.title}
                id={card.id}
                GET_CARDS={GET_CARDS}
                refetch={refetch}
                index={index}
                moveCard={moveCard}
                updateCard={updateCard}
              />
            );
          })}
        </CardsWrapper>
        <CardForm listId={id} refetch={refetch} />
      </Content>
    </Wrapper>
  );
}

export default List;
