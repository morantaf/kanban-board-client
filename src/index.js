import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { getTokens } from "./manage-tokens";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
