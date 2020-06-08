import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';

import FreezerView from './views/freezer';
import MealView from './views/meal';

import HomeView from './views/Home';
import Profile from './views/Profile';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path='/' exact component={HomeView} />
            <Route path='/profile' component={Profile} />
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
