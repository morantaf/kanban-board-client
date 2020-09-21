import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { getTokens } from "./manage-tokens";
import "./index.css";

// const BASE_URL = "https://evening-garden-55376.herokuapp.com/graphql";
const BASE_URL = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: BASE_URL,
  request: (operation) => {
    const tokens = getTokens();
    if (tokens && tokens.jwt) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${tokens.jwt}`,
        },
      });
    }
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
