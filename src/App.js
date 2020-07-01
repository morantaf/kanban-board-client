import React from "react";
import LoginForm from "./components/LoginForm";
import AppBar from "./components/AppBar";
import SignupForm from "./components/SignupForm";
import { Route } from "react-router";
import ProfilePage from "./components/ProfilePage";
import { getTokens } from "./manage-tokens";

function App() {
  const { username } = getTokens();
  return (
    <div>
      <AppBar />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      {username ? <Route path="/b/:username" component={ProfilePage} /> : null}
    </div>
  );
}

export default App;
