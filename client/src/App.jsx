import React, { Component } from 'react';
import './index.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';

import FreezerView from './views/freezer';
import MealView from './views/meal';
import MealEditView from './views/meal/edit';
import MealCreateView from './views/meal/create';

import HomeView from './views/Home';
import ProfileView from './views/Profile';
import ProfileEditView from './views/Profile/edit';

import AuthenticationJoinUsView from './views/Authentication/joinus';
import AuthenticationLogInView from './views/Authentication/login';

import { loadAuthenticatedUser } from './services/authentication';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loaded: false
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
      user,
      loaded: true
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loaded && (
          <BrowserRouter>
            <NavBar user={this.state.user} />
            <Switch>
              <Route path="/" exact component={HomeView} />
              <Route
                path="/profile"
                render={(props) => (
                  <ProfileView {...props} user={this.state.user} updateUser={this.updateUser} />
                )}
              />
              <Route
                path="/profile/edit"
                render={(props) => (
                  <ProfileEditView {...props} user={this.state.user} updateUser={this.updateUser} />
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
              <Route
                path="/freezer"
                exact
                render={(props) => <FreezerView {...props} user={this.state.user} />}
              />
              <Route path="/meal/create" exact component={MealCreateView} />
              <Route path="/meal/:id" exact render={(props) => <MealView {...props} />} />
              <Route path="/meal/:id/edit" exact render={(props) => <MealEditView {...props} />} />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
