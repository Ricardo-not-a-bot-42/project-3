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

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path='/' exact component={HomeView} />
            <Route path='/profile' component={ProfileView} />
            <Route path='/join-us' exact component={AuthenticationJoinUsView} />
            <Route path='/login' exact component={AuthenticationLogInView} />
            <Route path='/freezer' exact component={FreezerView} />
            <Route path='/meal/:id' exact component={MealView} />
            <Route
              path='/meal/:id'
              render={(props) => <MealView {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
