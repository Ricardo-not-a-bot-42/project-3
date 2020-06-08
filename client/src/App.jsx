import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

import HomeView from './views/Home';
import Profile from './views/Profile';

function App() {
  return (
    <div className="App">
      <header>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
