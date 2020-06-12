import React, { Component } from 'react';
import './index.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';

import FreezerView from './views/freezer';
import MealView from './views/meal';
import MealEditView from './views/meal/edit';
import MealCreateView from './views/meal/create';
import Footer from './views/Footer';

import HomeView from './views/Home';
import ProfileView from './views/Profile';
import ProfileEditView from './views/Profile/edit';
import PastOrdersView from './views/Profile/pastorders';
import SubscriptionView from './views/Profile/subscription';

import ShoppingCartView from './views/ShoppingCart';

import AuthenticationJoinUsView from './views/Authentication/joinus';
import AuthenticationLogInView from './views/Authentication/login';

import ErrorView from './views/Errors';

import { loadAuthenticatedUser } from './services/authentication';
import { checkSubscription } from './services/orders';
import ProtectedRoute from './components/ProtectedRoute';
import CheckoutView from './views/Checkout';

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
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(user);
        }
      })
      .then((user) => {
        this.updateUser(user);
        this.setState({
          loaded: true,
        });
      })
      .catch((error) => console.log(error));
  }

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  addToCart = (meal, quantity) => {
    if (this.state.shoppingCart.find((item) => item.meal._id === meal._id)) {
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

  emptyCart = () => {
    this.setState({
      shoppingCart: [],
    });
  };

  render() {
    return (
      <div className='App'>
        {this.state.loaded && (
          <BrowserRouter>
            <NavBar user={this.state.user} cart={this.state.shoppingCart} />
            <Switch>
              <Route
                path='/'
                exact
                render={(props) => (
                  <HomeView {...props} user={this.state.user} />
                )}
              />
              <ProtectedRoute
                path='/profile'
                authorized={this.state.user}
                redirect={'/login'}
                exact
                render={(props) => (
                  <ProfileView
                    {...props}
                    user={this.state.user}
                    updateUser={this.updateUser}
                    emptyCart={this.emptyCart}
                  />
                )}
              />
              <ProtectedRoute
                path='/profile/edit'
                authorized={this.state.user}
                redirect={'/login'}
                exact
                render={(props) => (
                  <ProfileEditView
                    {...props}
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <ProtectedRoute
                path='/profile/subscription'
                authorized={this.state.user}
                redirect={'/login'}
                exact
                render={(props) => (
                  <SubscriptionView
                    {...props}
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <ProtectedRoute
                path='/profile/past-orders'
                authorized={this.state.user}
                redirect={'/login'}
                exact
                render={(props) => <PastOrdersView />}
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
              <ProtectedRoute
                path='/shopping-cart'
                authorized={this.state.user}
                redirect={'/login'}
                exact
                render={(props) => (
                  <ShoppingCartView
                    {...props}
                    user={this.state.user}
                    cart={this.state.shoppingCart}
                    add={this.addToCart}
                  />
                )}
              />
              <ProtectedRoute
                path='/checkout'
                authorized={this.state.user && this.state.shoppingCart.length}
                redirect={'/'}
                exact
                render={(props) => (
                  <CheckoutView
                    {...props}
                    user={this.state.user}
                    cart={this.state.shoppingCart}
                    emptyCart={this.emptyCart}
                  />
                )}
              />
              <Route
                path='/freezer'
                exact
                render={(props) => (
                  <FreezerView {...props} user={this.state.user} />
                )}
              />
              <ProtectedRoute
                path='/meal/create'
                authorized={
                  this.state.user && this.state.user.userType === 'admin'
                }
                redirect={'/freezer'}
                exact
                component={MealCreateView}
              />
              <Route
                path='/meal/:id'
                exact
                render={(props) => (
                  <MealView
                    {...props}
                    user={this.state.user}
                    add={this.addToCart}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <ProtectedRoute
                path='/meal/:id/edit'
                authorized={
                  this.state.user && this.state.user.userType === 'admin'
                }
                redirect={'/freezer'}
                exact
                render={(props) => <MealEditView {...props} />}
              />
              <Route path='/error/:code' component={ErrorView} />
              <Redirect to='/error/404' />
            </Switch>
            <Footer />
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
