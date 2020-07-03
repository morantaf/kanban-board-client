import React from "react";
import LoginForm from "./components/LoginForm";
import AppBar from "./components/AppBar";
import SignupForm from "./components/SignupForm";
import { Route } from "react-router";
import ProfilePage from "./components/ProfilePage";
import { getTokens } from "./manage-tokens";
import { Redirect } from "react-router-dom";
import Board from "./components/Board";

function App() {
  return (
    <div>
      <AppBar />
      <Redirect from="/" to="/b/personal-board" />
      <Route path="/board/:id" component={Board} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route path={`/b/personal-board`} component={ProfilePage} />
    </div>
  );
}

export default App;
