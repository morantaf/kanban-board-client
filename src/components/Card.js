import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useDrag, useDrop } from "react-dnd";

const Wrapper = styled.div`
  background-color: #ffff99;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  // cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 40px;
  position: relative;
  text-decoration: none;
  z-index: 0;
`;

const Title = styled.p`
  padding: 5%;
`;

const StyledIcon = styled(MdDelete)`
  position: absolute;
  right: 1px;
  bottom: 1px;
  cursor: pointer;
  color: #a6a6a6;
`;

const DELETE_CARD = gql`
  mutation deleteCard($id: Int!) {
    deleteCard(id: $id) {
      deleted
    }
  }
`;

export default function Card({
  id,
  refetch,
  title,
  index,
  moveCard,
  updateCard,
}) {
  const type = "Card";

  const [{ isOver }, drop] = useDrop({
    // Accept will make sure only these element type can be droppable on this element
    accept: type,
    hover(item) {
      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop() {
      updateCard();
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [, drag] = useDrag({
    item: { type: type, id, index },
  });

  const _deleted = () => {
    refetch();
  };
  return (
    <div ref={drop}>
      <Wrapper ref={drag}>
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
              backgroundColor: "#ebecf0",
            }}
          />
        )}
        <Title>{title}</Title>
        <Mutation
          mutation={DELETE_CARD}
          variables={{ id }}
          ignoreResults={true}
          onCompleted={() => _deleted()}
        >
          {(mutation) => <StyledIcon onClick={mutation} />}
        </Mutation>
      </Wrapper>
    </div>
  );
}
