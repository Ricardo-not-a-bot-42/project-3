import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import FreezerView from "./views/freezer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/freezer" exact component={FreezerView} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
