import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";
import List from "./List";

const GET_LISTS = gql`
  query ListsByBoard($boardId: Int!) {
    listsByBoard(boardId: $boardId) {
      name
      id
    }
  }
`;

// const List = styled.div`
//   background-color: #ebecf0;
//   border-radius: 3px;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   max-height: 100%;
//   position: relative;
//   white-space: normal;
// `;

const Wrapper = styled.div`
  margin: 10px 4px;
  width: 272px;
  height: 100%;
`;

const Div = styled.div`
  display: flex;
  height: 100%;
`;

const Page = styled.div`
  background-color: #9933ff;
  height: 94.7vh;
`;

export default function Board() {
  // const { data } = useQuery(GET_LISTS, { variables: { boardId: 1 } });

  const params = useParams();
  const boardId = parseInt(params.id);

  return (
    <Page>
      <Div>
        <Query query={GET_LISTS} variables={{ boardId }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);
              return <p>{error.message}</p>;
            }
            return data.listsByBoard.map((list) => (
              <Wrapper>
                <List name={list.name} id={list.id} />
              </Wrapper>
            ));
          }}
        </Query>
      </Div>
    </Page>
  );
}
