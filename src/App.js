import React from "react";
import LoginPage from "./components/LoginPage";
import { Router } from "react-router";

function App() {
  return (
    <div>
      <Router exact path="/login" component={LoginPage} />
    </div>
  );
}

export default App;
