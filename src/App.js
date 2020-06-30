import React from "react";
import "./App.css";

import { Home, Cart } from "./components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
