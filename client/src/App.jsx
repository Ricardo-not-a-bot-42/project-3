import React, { Component } from 'react';
import './index.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import FreezerView from './views/freezer';
import NavBar from './components/NavBar';

import HomeView from './views/Home';
import ProfileView from './views/Profile';

import AuthenticationJoinUsView from './views/Authentication/joinus';
import AuthenticationLogInView from './views/Authentication/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/freezer" exact component={FreezerView} />
            <Route path="/join-us" exact component={AuthenticationJoinUsView} />
            <Route path="/login" exact component={AuthenticationLogInView} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
