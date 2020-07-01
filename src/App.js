import React from "react";
import "./App.css";

import { Home, Cart, UploadItems } from "./components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          {/*<Route exact path="/upload" component={UploadItems} />*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
