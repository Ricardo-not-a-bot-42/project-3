import React, { Component } from 'react';
import { listSingleMeal, deleteMeal } from './../../services/meals';
import { Link } from 'react-router-dom';
import formatPrice from './../../helpers/format-price';
import './style.scss';

class MealView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: null,
      loaded: false
    };
    this.id = this.props.match.params.id;
  }
  componentDidMount() {
    listSingleMeal(this.id).then((meal) => {
      this.setState({
        meal,
        quantity: 1,
        loaded: true
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
      quantity: Math.max(quantity, 0)
    });
  };

  render() {
    const meal = { ...this.state.meal };
    return (
      <div>
        {(this.state.loaded && (
          <div className="single-meal-container">
            <img src={meal.photoUrl} alt="" />
            <div className="name-rating">
              <h3>{meal.name}</h3>
              <small> ★ {meal.ratings} </small>
            </div>
            <div className="meal-body">
              <p>{meal.description}</p>
              <span>Ingredients</span>
              <ul>
                {meal.ingredients.map((ingredient) => {
                  return <li>{ingredient}</li>;
                })}
              </ul>
            </div>
            {(this.props.user.userType === 'admin' && (
              <div className="admin-functions">
                <button onClick={this.delete}>Delete</button>
                <Link to={`/meal/${this.id}/edit`}>Edit</Link>
              </div>
            )) || (
              <div className="cart-functions">
                <div className="cart-qtd linkAsButton">
                  <button onClick={() => this.addQuantity(-1)}>-</button>
                  <span className="qtd ">{this.state.quantity}</span>
                  <button onClick={() => this.addQuantity(1)}>+</button>
                </div>
                <div className="cart-update">
                  {(this.state.quantity && (
                    <button onClick={() => this.props.add(meal, this.state.quantity)}>
                      <span>Add </span>
                      <span>
                        {formatPrice({
                          amount: meal.price.amount * this.state.quantity,
                          currency: meal.price.currency
                        })}
                      </span>
                    </button>
                  )) || <button disabled>Add {meal.price.amount * this.state.quantity}</button>}
                </div>
              </div>
            )}
          </div>
        )) || <div>Loading</div>}
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
