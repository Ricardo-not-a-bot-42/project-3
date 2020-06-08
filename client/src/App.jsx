import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import FreezerView from './views/freezer';
import NavBar from './components/NavBar';

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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
