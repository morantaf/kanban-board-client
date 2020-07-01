import React from "react";
import LoginForm from "./components/LoginForm";
import AppBar from "./components/AppBar";
import { Route } from "react-router";

function App() {
  return (
    <div>
      <AppBar />
      <Route exact path="/login" component={LoginForm} />
    </div>
  );
}

export default App;
