import React, { Component } from 'react';
import { listSingleMeal, deleteMeal } from './../../services/meals';
import { Link } from 'react-router-dom';

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
            <div>
              <h1>{meal.name}</h1>
              <h2>{meal.ratings}</h2>
            </div>
            <h3>{meal.description}</h3>
            <h2>Ingredients</h2>
            <ul>
              {meal.ingredients.map((ingredient) => {
                return <li>{ingredient}</li>;
              })}
            </ul>
            {(this.props.user.userType === 'admin' && (
              <div className='admin-functions'>
                <button onClick={this.delete}>Delete</button>
                <Link to={`/meal/${this.id}/edit`}>Edit</Link>
              </div>
            )) || (
              <div className='cart-functions'>
                <div>
                  <button onClick={() => this.addQuantity(-1)}>-</button>
                  <h3>Qty: {this.state.quantity}</h3>
                  <button onClick={() => this.addQuantity(1)}>+</button>
                </div>
                {(this.state.quantity && (
                  <button
                    onClick={() => this.props.add(meal, this.state.quantity)}
                  >
                    Add {meal.price.amount * this.state.quantity}
                  </button>
                )) || (
                  <button disabled>
                    Add {meal.price.amount * this.state.quantity}
                  </button>
                )}
              </div>
            )}
          </div>
        )) || <div>Loading</div>}
      </div>
    );
  }
}

export default MealView;
