import React, { Component } from 'react';
import './index.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';

import FreezerView from './views/freezer';
import MealView from './views/meal';

import HomeView from './views/Home';
import ProfileView from './views/Profile';

import AuthenticationJoinUsView from './views/Authentication/joinus';
import AuthenticationLogInView from './views/Authentication/login';

import { loadAuthenticatedUser } from './services/authentication';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    loadAuthenticatedUser()
      .then((user) => {
        this.updateUser(user);
      })
      .catch((error) => console.log(error));
  }

  updateUser = (user) => {
    this.setState({
      user
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar user={this.state.user} />
          <Switch>
            <Route path="/" exact component={HomeView} />
            {/* <Route path="/profile" component={ProfileView}/> */}
            <Route
              path="/profile"
              render={(props) => (
                <ProfileView {...props} user={this.state.user} updateUser={this.updateUser} />
              )}
            />

            <Route
              path="/join-us"
              exact
              render={(props) => (
                <AuthenticationJoinUsView {...props} updateUser={this.updateUser} />
              )}
            />
            <Route
              path="/login"
              exact
              render={(props) => (
                <AuthenticationLogInView {...props} updateUser={this.updateUser} />
              )}
            />
            <Route path="/freezer" exact component={FreezerView} />
            <Route path="/meal/:id" exact component={MealView} />
            <Route path="/meal/:id" render={(props) => <MealView {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
