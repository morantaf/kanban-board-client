import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const Wrapper = styled.div`
  background-color: #fff;
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

export default function Card(props) {
  const id = props.id;

  const _deleted = () => {
    props.refetch();
  };
  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <Mutation
        mutation={DELETE_CARD}
        variables={{ id }}
        ignoreResults={true}
        onCompleted={() => _deleted()}
      >
        {(mutation) => <StyledIcon onClick={mutation} />}
      </Mutation>
    </Wrapper>
  );
}
