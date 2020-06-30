import React from "react";
import LoginPage from "./components/LoginPage";
import AppBar from "./components/AppBar";
import { Route } from "react-router";

function App() {
  return (
    <div>
      <AppBar />
      <Route exact path="/login" component={LoginPage} />
    </div>
  );
}

export default App;
