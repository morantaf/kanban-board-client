import React from "react";
import LoginForm from "./components/LoginForm";
import AppBar from "./components/AppBar";
import SignupForm from "./components/SignupForm";
import { Route } from "react-router";
import ProfilePage from "./components/ProfilePage";
import { getTokens } from "./manage-tokens";

function App() {
  return (
    <div>
      <AppBar />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route path={`/b/personal-board`} component={ProfilePage} />
    </div>
  );
}

export default App;
