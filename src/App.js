import React from "react";
import LoginForm from "./components/LoginForm";
import AppBar from "./components/AppBar";
import SignupForm from "./components/SignupForm";
import { Route } from "react-router";
import ProfilePage from "./components/ProfilePage";
import { Redirect } from "react-router-dom";
import { getTokens } from "./manage-tokens";
import Board from "./components/Board";
import Homepage from "./components/Homepage";

function App() {
  const tokens = getTokens();
  const userId = tokens ? tokens.userId : null;
  return (
    <div>
      <AppBar />
      <Route exact path="/homepage" component={Homepage} />
      <Route exact path="/">
        {userId ? <Redirect to={`/b/${userId}`} /> : <Redirect to="/login" />}
      </Route>
      <Route path="/board/:id" component={Board} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route path="/b/:id" component={ProfilePage} />
    </div>
  );
}

export default App;
