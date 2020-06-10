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

import ShoppingCartView from './views/ShoppingCart';

import AuthenticationJoinUsView from './views/Authentication/joinus';
import AuthenticationLogInView from './views/Authentication/login';

import { loadAuthenticatedUser } from './services/authentication';

const deepCloneObject = (object) => JSON.parse(JSON.stringify(object));

class App extends Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      user: null,
      loaded: false,
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
      loaded: true,
    });
  };

  addToCart = (meal, quantity) => {
    if (this.state.shoppingCart.find((item) => item.meal._id === meal._id)) {
      // const updatedShoppingBasket = [...this.state.shoppingBasket];
      // If I did a shallow clone as I had in the line above,
      // when changing the quantity I would be mutating the original shoppingBasket child objects
      const updatedShoppingCart = deepCloneObject(this.state.shoppingCart);
      const cartMealIndex = this.state.shoppingCart.findIndex(
        (item) => item.meal._id === meal._id
      );
      if (quantity) {
        updatedShoppingCart[cartMealIndex].quantity = Math.max(quantity, 0);
      } else {
        updatedShoppingCart.splice(cartMealIndex, 1);
      }
      this.setState({
        shoppingCart: updatedShoppingCart,
      });
    } else {
      this.setState({
        shoppingCart: [
          ...this.state.shoppingCart,
          {
            meal: meal,
            quantity: Math.max(quantity, 0),
          },
        ],
      });
    }
    console.log(this.state.shoppingCart);
  };

  emptyCart = () => {};

  render() {
    return (
      <div className='App'>
        {this.state.loaded && (
          <BrowserRouter>
            <NavBar user={this.state.user} cart={this.state.shoppingCart} />
            <Switch>
              <Route path='/' exact component={HomeView} />
              <Route
                path='/profile'
                exact
                render={(props) => (
                  <ProfileView
                    {...props}
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <Route
                path='/profile/edit'
                exact
                render={(props) => (
                  <ProfileEditView
                    {...props}
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />

              <Route
                path='/join-us'
                exact
                render={(props) => (
                  <AuthenticationJoinUsView
                    {...props}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <Route
                path='/login'
                exact
                render={(props) => (
                  <AuthenticationLogInView
                    {...props}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <Route
                path='/shopping-cart'
                exact
                render={(props) => (
                  <ShoppingCartView {...props} user={this.state.user} />
                )}
              />
              <Route
                path='/freezer'
                exact
                render={(props) => (
                  <FreezerView {...props} user={this.state.user} />
                )}
              />
              <Route path='/meal/create' exact component={MealCreateView} />
              <Route
                path='/meal/:id'
                exact
                render={(props) => (
                  <MealView
                    {...props}
                    user={this.state.user}
                    add={this.addToCart}
                  />
                )}
              />
              <Route
                path='/meal/:id/edit'
                exact
                render={(props) => <MealEditView {...props} />}
              />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
