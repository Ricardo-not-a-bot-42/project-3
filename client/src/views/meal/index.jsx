import React, { Component } from 'react';
import { listSingleMeal, deleteMeal } from './../../services/meals';
import { updateSubscription } from './../../services/authentication';
import { Link } from 'react-router-dom';
import formatPrice from './../../helpers/format-price';
import generateKey from './../../helpers/randomKeyGen';
import './style.scss';

class MealView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: null,
      loaded: false,
    };
    this.id = this.props.match.params.id;
  }
  componentDidMount() {
    listSingleMeal(this.id).then((meal) => {
      this.setState({
        meal,
        quantity: 1,
        loaded: true,
      });
    });
  }

  delete = () => {
    deleteMeal(this.id)
      .then(() => {
        this.props.history.push('/freezer');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  addQuantity = (value) => {
    let quantity = this.state.quantity;
    quantity += value;
    this.setState({
      quantity: Math.max(quantity, 0),
    });
  };

  render() {
    const meal = { ...this.state.meal };
    return (
      <div>
        {(this.state.loaded && (
          <div className='single-meal-container'>
            <img src={meal.photoUrl} alt='' />
            <div className='name-rating'>
              <h2>{meal.name}</h2>
              <div> ★ {meal.ratings} </div>
              <div className='cart-qtd'>
                <button
                  className='add-rem '
                  onClick={() => this.addQuantity(-1)}
                >
                  -
                </button>
                <span>{this.state.quantity}</span>
                <button className='add-rem' onClick={() => this.addQuantity(1)}>
                  +
                </button>
              </div>
              <div>
                {formatPrice({
                  amount: meal.price.amount * this.state.quantity,
                  currency: meal.price.currency,
                })}
              </div>
            </div>
            <div className='meal-body'>
              <p>{meal.description}</p>
              <span>Ingredients</span>
              <ul>
                {meal.ingredients.map((ingredient) => {
                  return <li key={generateKey()}>{ingredient}</li>;
                })}
              </ul>
            </div>
            {(this.props.user.userType === 'admin' && (
              <div className='admin-functions'>
                <button onClick={this.delete}>Delete</button>
                <Link to={`/meal/${this.id}/edit`}>Edit</Link>
              </div>
            )) || (
              <div className='cart-functions'>
                <div className='cart-update'>
                  {(this.state.quantity && (
                    <button
                      onClick={() => this.props.add(meal, this.state.quantity)}
                    >
                      <span>Add to Cart</span>
                    </button>
                  )) || (
                    <button disabled>
                      <span>Add to Cart</span>
                    </button>
                  )}
                  {this.props.user.subscribed &&
                    this.props.user.subscriptionMeals.length < 10 && (
                      <div>
                        <button
                          onClick={() =>
                            updateSubscription(this.state.meal).then((user) => {
                              this.props.updateUser(user);
                            })
                          }
                        >
                          Add to subscription
                        </button>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        )) || <div>Loading</div>}
        <div className='bottom-linkAsButton'>
          <Link to='/freezer'>Return to Freezer</Link>
        </div>
      </div>
    );
  }
}

export default MealView;

{
  /* <div>{meal.price.amount * this.state.quantity}</div> */
}
{
  /* {formatPrice(meal.price)} */
}
