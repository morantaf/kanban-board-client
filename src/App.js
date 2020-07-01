import React from "react";
import LoginForm from "./components/LoginForm";
import AppBar from "./components/AppBar";
import SignupForm from "./components/SignupForm";
import { Route } from "react-router";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <div>
      <AppBar />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route path="/b/:id" component={ProfilePage} />
    </div>
  );
}

export default App;
